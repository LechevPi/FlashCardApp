import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://secondbrain-3273f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const availableDecks = ref(database, "decks")

/* Handling click on add buttons */

const addButton = document.getElementById("add-new-deck-button")

addButton.addEventListener("click", function() {
    console.log("we are here")
    let deckName = prompt("Enter the deck name: ", "")

    if (deckName != "") {
        push(availableDecks, deckName)
    }

})