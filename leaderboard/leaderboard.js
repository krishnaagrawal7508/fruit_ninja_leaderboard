
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_Ni04g09uMOYa8aezXwkFmtbdtnoRfeI",
    authDomain: "leaderboard-7a0fa.firebaseapp.com",
    projectId: "leaderboard-7a0fa",
    storageBucket: "leaderboard-7a0fa.appspot.com",
    messagingSenderId: "839690063202",
    appId: "1:839690063202:web:6728cdfe21622c89a4303b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set, child, update, remove, onValue }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const db = getDatabase();

var sol_address = document.getElementById("solAddress");
var score = document.getElementById("score");

var subBtn = document.getElementById("submit");

function InsertData() {
    set(ref(db, "leaderboardFile/" + sol_address.value), {
        SOL_ADDRESS: sol_address.value,
        SCORE: score.value
    })
        .then(() => {
            alert("data stored success");
        })
        .catch((error) => {
            alert("unsuccess, error " + error);
        });
}

var stdNo = 0;
var tbody = document.getElementById("tbody1");

function addItemToTable(address_, points_) {
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    td1.innerHTML = ++stdNo;
    td2.innerHTML = address_;
    td3.innerHTML = points_;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    tbody.appendChild(trow);
}

function AddAllItemsToTable(list_score) {
    stdNo = 0;
    tbody.innerHTML = "";
    list_score.forEach(element => {
        addItemToTable(element.SOL_ADDRESS, element.SCORE);
    });
}

subBtn.addEventListener('click', InsertData);

function GetAllDataOnce() {
    const dbRef = ref(db, "leaderboardFile");
    onValue(dbRef, (snapshot) => {
        var user = [];
        snapshot.forEach(childSnapshot => {
            user.push(childSnapshot.val());
        });
        AddAllItemsToTable(user);
        console.log(user);
    })
}

window.onload = GetAllDataOnce;
