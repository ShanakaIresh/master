import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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
let docArray = []

const table = document.querySelector('.t1')
const form = document.querySelector('form')
const delForm = document.querySelector('.delform')


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


onSnapshot(collRef, (snapshot) => {
    docArray = []
    snapshot.docs.forEach((doc) => {
        docArray.push({ ...doc.data(), id: doc.id })
    });
    addData(docArray)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const detArray = {
        gameName: form.GameName.value,
        developTeam: form.DeveloperName.value,
        releaseYear: form.ReleaseYear.value
    }
    addDoc(collRef, detArray).then(() => {
        form.reset()
    })
})


delForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const delName = delForm.ID.value
    docArray.forEach((element, index) => {
        if (element.gameName === delName) {
            const delID = element.id
            const delRef = doc(db, 'Games', delID)

            deleteDoc(delRef).then(() => {
                form.reset()
            })
        }
    })
})

