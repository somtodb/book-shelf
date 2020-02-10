const cors = require("cors")({ origin: true });
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.request = functions.https.onRequest((request, response) => {
  // Automatically allow cross-origin requests
  cors(request, response, () => {
    response.status(200).send("Hello from Firebase!");
  });
});
