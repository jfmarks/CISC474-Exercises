var admin = require("firebase-admin");

//var serviceAccount = require("./serviceKey.json");
var serviceAccount = require("/etc/secrets/<your file>.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cisc474-exercise-5-default-rtdb.firebaseio.com"
});

const { getDatabase } = require('firebase-admin/database');
const db = getDatabase();
const ref = db.ref('server/saving-data/');
const usersRef = ref.child('users');
usersRef.set({
alanisawesome: {
date_of_birth: 'June 23, 1912',
full_name: 'Alan Turing'
},
gracehop: {
date_of_birth: 'December 9, 1906',
full_name: 'Grace Hopper'
}
});

const http = require('http')
const port = 8080
// Create a server object:
const server = http.createServer(function (req, res) {
// Write a response to the client
res.write('Hello World')
// End the response
res.end()
})
// Set up our server so it will listen on the port
server.listen(port, function (error) {
// Checking any error occur while listening on port
if (error) {
console.log('Something went wrong', error);
}
// Else sent message of listening
else {
console.log('Server is listening on port' + port);
}
})