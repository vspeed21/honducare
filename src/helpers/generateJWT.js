import jwt from 'jsonwebtoken';

function generateJWT(usuario) {
  return jwt.sign({ usuario }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}

export default generateJWT;
