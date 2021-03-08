const firebase = require("firebase-admin");

async function cadastra(email, nome, sobrenome, uid) {
    let db = firebase.firestore();

    let docRef = db.collection('users').doc();

    await docRef.set({
        nome: nome,
        email: email,
        sobrenome: sobrenome,
        uid: uid,
        login: false,
        validade: ""
    })
}

module.exports = {
    cadastra,
}
