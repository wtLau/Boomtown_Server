import admin from '../config/firebase';

function firebaseAuthMiddleware(req, res, next) {
  if(process.env.NODE_ENV === 'development' && req.headers.origin === "http://localhost:4000") { return next()}
  const authorization = req.header('Authorization');
  if (authorization) {
      let token = authorization.split(' ');
      admin.auth().verifyIdToken(token[1])
      .then((decodedToken) => {
          res.locals.user = decodedToken;
          next();
      })
      .catch(err => {
          res.sendStatus(401);
      });
  } else {
      res.sendStatus(401);
  }
}

export default firebaseAuthMiddleware;