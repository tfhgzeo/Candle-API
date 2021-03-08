const firebase = require("firebase-admin");
const db = firebase.firestore();

async function update(email, nome, sobrenome, uid) {
    docRef = db.collection("users").where("uid", "==", uid);

    let resultado = await docRef.get().then(async (snapshot) => {
        let teste = await snapshot.forEach(async (d) => {
            id = d.id;
            console.log(id);
            doc = db.collection("users").doc(id);
            let res = await doc
                .update({
                    email: email,
                    nome: nome,
                    sobrenome: sobrenome,
                })
                .catch((err) => {
                    return err;
                });
            return res;
        });
        return teste;
    });
    return resultado;
}

module.exports = {
    update,
};
