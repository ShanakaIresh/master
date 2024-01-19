import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAM9mqVysr3OaXjRcbpnhFBrlvwOPIR2w",
    authDomain: "games-demo-7ede0.firebaseapp.com",
    projectId: "games-demo-7ede0",
    storageBucket: "games-demo-7ede0.appspot.com",
    messagingSenderId: "145951063729",
    appId: "1:145951063729:web:09f3940086fd96fca62c90",
    measurementId: "G-4K7Q4KNNSX"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore()

const collRef = collection(db, 'Games')
const docArray = []

const table = document.querySelector('.t1')


const addData = (docArray) => {

    const head = `<thead class="table-dark">
                    <th>Name</th>
                    <th>Developer Team</th>
                    <th>Year of release</th>
                </thead>`
    table.innerHTML = head
    docArray.forEach((doc) => {
        const query = `
                    <tbody>
                        <td>${doc.gameName}</td>
                        <td>${doc.developTeam}</td>
                        <td>${doc.releaseYear}</td>
                    </tbody>
    `
        table.innerHTML += query

    })


}


getDocs(collRef).then((snapshot) => {
    // console.log(snapshot.docs[0].data())
    snapshot.docs.forEach((doc) => {
        docArray.push({ ...doc.data(), id: doc.id })
    });
    // console.log(docArray)
    return docArray
}).then((docArray) => {
    addData(docArray)
})

