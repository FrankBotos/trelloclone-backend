/*note about environment vars: 
the project uses the "dotenv" npm package
therefore to plug in custom firebase config values the following steps must be taken

1. have a firebase project, with config details, and "firestore database" enabled
2. create a file called ".env"
3. re-create the env variables as seen in the firsebaseConfig JSON object below, plugging in values from your firebase config
   eg. API_KEY="somevalue"

Alternatively, the values can be pasted directly!

*/

const firebase = require("firebase");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const KanbanBoard = db.collection("KanbanBoards");
module.exports = KanbanBoard;

//note: in package.json file, app is using firebase version 8.10.0 as it allows for web version 8 approach
