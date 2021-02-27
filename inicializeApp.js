function inicializeApp() {
    const admin = require("firebase-admin");
    const serviceAccount = require("./candles-bot-a6b2d-2b52fa8d01df.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://candles-bot-a6b2d.firebaseio.com",
    });

    console.log("Firebase Iniciado!");
}

module.exports = inicializeApp;
