var admin = require("firebase-admin");
var serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://boomtowndemo.firebaseio.com"
});

export default admin;