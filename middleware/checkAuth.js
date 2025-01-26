import jwt from 'jsonwebtoken';

async function checkAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    const error = new Error('No esta el token en los headers de la petición');
    return res.status(404).json({ message: error.message });
  }

  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);

      return next();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

export default checkAuth;
