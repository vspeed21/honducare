-- Active: 1732246804144@@localhost@5432@honducare@public
-- Active: 1732246804144@@localhost@5432@honducare

-- Si da error sobre foreign keys al ejecutar usuarios o citas, ejecutar estas lineas.
ALTER TABLE public.tbl_usuarios
DROP CONSTRAINT tbl_usuarios_id_rol_fkey;

ALTER TABLE public.tbl_citas
DROP CONSTRAINT tbl_citas_id_estado_cita_fkey;

-- Agregar funcionalidad de especialidades
  --1.
CREATE TABLE IF NOT EXISTS tbl_especialidades (
  id_especialidad SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);
  -- 2.
ALTER TABLE public.tbl_usuarios
ADD COLUMN id_especialidad INT;

  -- 3.
ALTER TABLE public.tbl_usuarios
ADD CONSTRAINT fk_especialidad_usuario
FOREIGN KEY (id_especialidad)
REFERENCES public.tbl_especialidades (id_especialidad)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Agregar funcionalidad de guardar la glucometria
  -- 1.
ALTER TABLE public.tbl_preclinicas ADD COLUMN glucometria INT;

-- Guardar informacion del diagnostico
  -- 1. Agregar columnas nuevas a la tabla `tbl_diagnosticos`.
ALTER TABLE public.tbl_diagnosticos ADD COLUMN examen_fisico TEXT;

  -- 2.
ALTER TABLE public.tbl_diagnosticos ADD COLUMN indicaciones TEXT;


-- Estadisticas
  -- 1.Establecer fechas diferentes para los pacientes ya creados.
ALTER TABLE public.tbl_paciente ADD COLUMN fecha_registro DATE;

  -- Las fechas se recomienda ser de diferentes meses para que se muestre informacion en las estadisticas
UPDATE public.tbl_paciente SET fecha_registro='2024-12-12' WHERE fecha_registro IS NULL;

-- Editar el campo fecha para que no timestamp
ALTER TABLE public.tbl_diagnosticos
ALTER COLUMN fecha TYPE DATE USING fecha::DATE;
ALTER TABLE public.tbl_paciente ADD COLUMN como_se_entero TEXT;

CREATE TABLE IF NOT EXISTS tbl_bitacora (
  id_bitacora SERIAL NOT NULL PRIMARY KEY,
  id_usuario INTEGER NOT NULL,
  fecha DATE,
  operacion TEXT,
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios(id_usuario)
  ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE public.tbl_citas ADD COLUMN motivo_cancelacion TEXT;

-- Ejecutar solamente si el campo id_preclinica se cambio de nombre a id.
ALTER TABLE public.tbl_preclinicas
RENAME COLUMN id TO id_preclinica;

-- Insert into de los estados de cita
INSERT INTO public.tbl_estado_cita("id_estado_cita","descripcion") VALUES(1,'agendada');
INSERT INTO public.tbl_estado_cita("id_estado_cita","descripcion") VALUES(2,'enpreclinica');
INSERT INTO public.tbl_estado_cita("id_estado_cita","descripcion") VALUES(3,'finpreclinica');
INSERT INTO public.tbl_estado_cita("id_estado_cita","descripcion") VALUES(4,'finconsulta');
INSERT INTO public.tbl_estado_cita("id_estado_cita","descripcion") VALUES(5,'cancelada');

--
DO $$
BEGIN

CREATE TABLE IF NOT EXISTS tbl_especialidades (
  id_especialidad INTEGER PRIMARY KEY
  nombre VARCHAR(100) NOT NULL
)

CREATE TABLE IF NOT EXISTS tbl_diagnosticos (
    id_diagnostico INTEGER PRIMARY KEY,
    id_cita INTEGER NOT NULL,
    id_paciente INTEGER NOT NULL,
    historia_enfermedad TEXT NOT NULL,
    id_doctor INTEGER NOT NULL,
    receta TEXT NOT NULL,
    fecha DATE NOT NULL,
    diagnostico TEXT NOT NULL,
    FOREIGN KEY (id_cita) REFERENCES tbl_citas(id_cita)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_paciente) REFERENCES tbl_paciente(id_paciente)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_doctor) REFERENCES tbl_usuarios(id_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS public.tbl_antecedentes_paciente (
    id_antecedente_paciente SERIAL PRIMARY KEY NOT NULL,
    id_paciente INTEGER NOT NULL,
    id_descripcion_antecedente INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS public.tbl_citas (
    id_cita SERIAL PRIMARY KEY NOT NULL,
    id_paciente INTEGER,
    id_estado_cita INTEGER,
    id_usuario INTEGER,
    fecha DATE NOT NULL,
    hora TIME  NOT NULL,
    motivo_cita CHARACTER VARYING(255)
);


CREATE TABLE IF NOT EXISTS public.tbl_descripcion_antecedente (
    id_descripcion_antecedente SERIAL PRIMARY KEY NOT NULL,
    descripcion CHARACTER VARYING(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS public.tbl_descripcion_ginecoobstetrica (
    id_descripcion_ginecoobstetrica SERIAL PRIMARY KEY NOT NULL,
    descripcion CHARACTER VARYING(100) NOT NULL,
    fecha TIMESTAMP
);


CREATE TABLE IF NOT EXISTS public.tbl_descripcion_habitos (
    id_descripcion_habitos SERIAL PRIMARY KEY NOT NULL,
    descripcion CHARACTER VARYING(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.tbl_estado_cita (
    id_estado_cita SERIAL PRIMARY KEY NOT NULL,
    descripcion CHARACTER VARYING(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS public.tbl_estado_civil (
    id_estado_civil SERIAL PRIMARY KEY NOT NULL,
    descripcion CHARACTER VARYING(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS public.tbl_habito_toxico_paciente (
    id_habito_toxico_paciente SERIAL PRIMARY KEY NOT NULL,
    id_paciente INTEGER NOT NULL,
    id_descripcion_habitos INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS public.tbl_historia_ginecoobstetrica_paciente (
    id_historia_ginecobstretica_paciente SERIAL PRIMARY KEY NOT NULL,
    id_descripcion_ginecoobstetrica INTEGER NOT NULL,
    id_paciente INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS public.tbl_historia_patologica (
    id SERIAL PRIMARY KEY NOT NULL,
    id_paciente INTEGER NOT NULL,
    id_patologia INTEGER NOT NULL,
    tipo_historia VARCHAR(20) NOT NULL CHECK (tipo_historia IN ('familiar', 'personal')),
    parentesco VARCHAR(20),
    medicamentos VARCHAR(50),
    dosis VARCHAR(20),
    horario TIME 
);


CREATE TABLE IF NOT EXISTS public.tbl_ocupacion (
    id_ocupacion SERIAL PRIMARY KEY NOT NULL,
    descripcion CHARACTER VARYING(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS public.tbl_paciente (
    id_paciente SERIAL PRIMARY KEY NOT NULL,
    nombre_completo CHARACTER VARYING(100) NOT NULL,
    numero_identidad CHARACTER VARYING(100) UNIQUE NOT NULL,
    telefono CHARACTER VARYING(15) NOT NULL,
    correo_electronico CHARACTER VARYING(255),
    direccion CHARACTER VARYING(255),
    id_estado_civil INTEGER,
    id_sexo INTEGER,
    id_ocupacion INTEGER,
    edad INTEGER 
);


CREATE TABLE IF NOT EXISTS public.tbl_patologias (
    id_patologia SERIAL PRIMARY KEY NOT NULL,
    descripcion CHARACTER VARYING(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS public.tbl_preclinica (
    id_preclinica SERIAL PRIMARY KEY NOT NULL,
    id_cita INTEGER NOT NULL,
    id_paciente INTEGER NOT NULL,
    presion_arterial NUMERIC,
    frecuencia_cardiaca NUMERIC,
    frecuencia_respiratoria NUMERIC,
    temperatura NUMERIC,
    peso_actual NUMERIC,
    talla NUMERIC
);


CREATE TABLE IF NOT EXISTS public.tbl_sexo (
    id_sexo SERIAL PRIMARY KEY NOT NULL,
    descripcion CHARACTER VARYING(10) NOT NULL
);


CREATE TABLE IF NOT EXISTS public.tbl_usuarios (
    id_usuario SERIAL PRIMARY KEY NOT NULL,
    numero_identidad CHARACTER VARYING(20) NOT NULL,
    direccion1 CHARACTER VARYING(100),
    nombre_de_usuario CHARACTER VARYING(50) NOT NULL,
    contrasena CHARACTER VARYING(100) NOT NULL,
    id_rol INTEGER NOT NULL,
    estado CHARACTER VARYING(20) NOT NULL,
    correo_electronico CHARACTER VARYING(100),
    fecha_ultima_conexion TIMESTAMP,
    fecha_vencimiento TIMESTAMP,
    firebase_uid CHARACTER VARYING(100)
);


CREATE TABLE IF NOT EXISTS public.tbl_bitacora (
    id_bitacora SERIAL PRIMARY KEY NOT NULL,
    id_usuario INTEGER NOT NULL,
    accion VARCHAR(50) NOT NULL,
    modulo VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL, -- Detalle de la acción realizada
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Roles disponibles en el sitio web
  -- DOCTOR
  -- RECEPCIONISTA
  -- Adminsitrador
  -- Gerente
  -- Paciente
CREATE TABLE IF NOT EXISTS public.tbl_roles (
    id_rol SERIAL PRIMARY KEY NOT NULL,
    rol VARCHAR(50) NOT NULL UNIQUE;
    descripcion TEXT
);

-- Foreign Key Constraints

--TABLA ANTECEDENTES PACIENTE tbl_antecedentes_paciente

ALTER TABLE public.tbl_antecedentes_paciente
    ADD CONSTRAINT fk_antecedentes_paciente_paciente FOREIGN KEY (id_paciente) REFERENCES public.tbl_paciente(id_paciente) ON DELETE CASCADE;

ALTER TABLE public.tbl_antecedentes_paciente
    ADD CONSTRAINT fk_antecedentes_paciente_descripcion FOREIGN KEY (id_descripcion_antecedente) REFERENCES public.tbl_descripcion_antecedente(id_descripcion_antecedente) ON DELETE CASCADE;

--TABLA CITAS tbl_citas

ALTER TABLE public.tbl_citas
    ADD CONSTRAINT fk_citas_paciente FOREIGN KEY (id_paciente) REFERENCES public.tbl_paciente(id_paciente);

ALTER TABLE public.tbl_citas
    ADD CONSTRAINT fk_citas_estado FOREIGN KEY (id_estado_cita) REFERENCES public.tbl_estado_cita(id_estado_cita);

ALTER TABLE public.tbl_citas
    ADD CONSTRAINT fk_citas_usuario FOREIGN KEY (id_usuario) REFERENCES public.tbl_usuarios(id_usuario);

--TABLA HABITO TOXICO PACIENTE tbl_habito_toxico_paciente

ALTER TABLE public.tbl_habito_toxico_paciente
    ADD CONSTRAINT fk_habito_paciente FOREIGN KEY (id_paciente) REFERENCES public.tbl_paciente(id_paciente) ON DELETE CASCADE;

ALTER TABLE public.tbl_habito_toxico_paciente
    ADD CONSTRAINT fk_habito_descripcion FOREIGN KEY (id_descripcion_habitos) REFERENCES public.tbl_descripcion_habitos(id_descripcion_habitos);

--TABLA HISTORIA GINECOOBTETRICA tbl_historia_ginecoobstetrica_paciente

ALTER TABLE public.tbl_historia_ginecoobstetrica_paciente
    ADD CONSTRAINT fk_gineco_paciente FOREIGN KEY (id_paciente) REFERENCES public.tbl_paciente(id_paciente) ON DELETE CASCADE;

ALTER TABLE public.tbl_historia_ginecoobstetrica_paciente
    ADD CONSTRAINT fk_gineco_descripcion FOREIGN KEY (id_descripcion_ginecoobstetrica) REFERENCES public.tbl_descripcion_ginecoobstetrica(id_descripcion_ginecoobstetrica);

--TABLA HISTORIA PATOLOGICA tbl_historia_patologica

ALTER TABLE public.tbl_historia_patologica
    ADD CONSTRAINT fk_historia_paciente FOREIGN KEY (id_paciente) REFERENCES public.tbl_paciente(id_paciente) ON DELETE CASCADE;

ALTER TABLE public.tbl_historia_patologica
    ADD CONSTRAINT fk_historia_patologia FOREIGN KEY (id_patologia) REFERENCES public.tbl_patologias(id_patologia);

--TABLA PACIENTE tbl_paciente

ALTER TABLE public.tbl_paciente
    ADD CONSTRAINT fk_paciente_estado_civil FOREIGN KEY (id_estado_civil) REFERENCES public.tbl_estado_civil(id_estado_civil);

ALTER TABLE public.tbl_paciente
    ADD CONSTRAINT fk_paciente_sexo FOREIGN KEY (id_sexo) REFERENCES public.tbl_sexo(id_sexo);

ALTER TABLE public.tbl_paciente
    ADD CONSTRAINT fk_paciente_ocupacion FOREIGN KEY (id_ocupacion) REFERENCES public.tbl_ocupacion(id_ocupacion);


-- TABLA PRECLINICA tbl_preclinica

ALTER TABLE public.tbl_preclinica
    ADD CONSTRAINT fk_preclinica_paciente FOREIGN KEY (id_paciente) REFERENCES public.tbl_paciente(id_paciente) ON DELETE CASCADE;

ALTER TABLE public.tbl_preclinica
    ADD CONSTRAINT fk_preclinica_cita FOREIGN KEY (id_cita) REFERENCES public.tbl_citas(id_cita);


ALTER TABLE public.tbl_bitacora
    ADD CONSTRAINT fk_bitacora_usuario FOREIGN KEY (id_usuario) REFERENCES public.tbl_usuarios(id_usuario) ON DELETE CASCADE;

--TABLA USUARIO tbl_usuarios
ALTER TABLE public.tbl_usuarios
    ADD CONSTRAINT fk_usuario_rol FOREIGN KEY (id_usuario) REFERENCES public.tbl_roles(id_rol) ON DELETE CASCADE;

--INSERTAR DATOS

-- Poblar tbl_roles 
INSERT INTO public.tbl_roles("id_rol","rol","descripcion") VALUES(1,'Doctor','Rol de Doctor con acceso a CONSULTA Y PRECLINICA');
INSERT INTO public.tbl_roles("id_rol","rol","descripcion") VALUES(2,'Recepcionista','Rol de recepcionista con acceso a CITA Y PRECLINICA');
INSERT INTO public.tbl_roles("id_rol","rol","descripcion") VALUES(3,'Administrador','Rol de Administrador con acceso a TODOS LOS MODULOS');
INSERT INTO public.tbl_roles("id_rol","rol","descripcion") VALUES(4,'Gerencia','Rol de Gerencia con acceso a TODOS LOS MODULOS MENOS ADMINISTRACIÓN');
INSERT INTO public.tbl_roles("id_rol","rol","descripcion") VALUES(5,'Paciente','Rol de Paciente con acceso a PACIENTES');

-- Poblar tbl_descripcion_antecedente
INSERT INTO public.tbl_descripcion_antecedente (descripcion) VALUES
('Diabetes Mellitus'),
('Hipertensión Arterial'),
('Asma'),
('Enfermedad Renal Crónica');

-- Poblar tbl_descripcion_ginecoobstetrica
INSERT INTO public.tbl_descripcion_ginecoobstetrica (descripcion) VALUES
('Gestaciones'),
('Abortos'),
('Cesáreas'),
('Partos Vaginales');

-- Poblar tbl_descripcion_habitos
INSERT INTO public.tbl_descripcion_habitos (descripcion) VALUES
('Fumador'),
('Alcoholismo'),
('Uso de Drogas Recreativas'),
('Sedentarismo');

-- Poblar tbl_estado_civil
INSERT INTO public.tbl_estado_civil (descripcion) VALUES
('Soltero'),
('Casado'),
('Divorciado'),
('Viudo');

-- Poblar tbl_ocupacion
INSERT INTO public.tbl_ocupacion (descripcion) VALUES
('Doctor'),
('Ingeniero'),
('Maestro'),
('Estudiante');

-- Poblar tbl_patologias
INSERT INTO public.tbl_patologias (descripcion) VALUES
('Enfermedad Cardiaca'),
('Enfermedad Pulmonar'),
('Cáncer'),
('Enfermedad Digestiva');

-- Poblar tbl_sexo
INSERT INTO public.tbl_sexo (descripcion) VALUES
('Masculino'),
('Femenino'),
('No Binario');

-- Crear usuario de acceso
Insert into tbl_usuarios values(1,23456,'Honduras','Prueba','prueba12345',3,'activo','prueba@1.com','2024-11-20','2025-11-20','hClPK6mcCXMoUQcWxsvTTlGDNqP2');

END
$$