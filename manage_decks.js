import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://secondbrain-3273f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const availableDecks = ref(database, "decks")

const availableDeckContainer = document.getElementById("available-decks-container")

/* Handling click on add buttons */

const addButton = document.getElementById("add-new-deck-button")

addButton.addEventListener("click", function() {
    let deckName = prompt("Enter the deck name: ", "")

    if (deckName != "") {
        push(availableDecks, deckName)
    }

    resetAvailableDeckContainer()

})

onValue(availableDecks, function(snapshot) {

    if (snapshot.exists()) {

        let deckArray = Object.entries(snapshot.val())

        resetAvailableDeckContainer()

        for (let i=0; i<deckArray.length; i++) {
            let deckId = deckArray[i][0]
            let deckName = deckArray[i][1]
            appendDeckToAvailableDeckContainer(deckId, deckName)
        
        }

    } else {
        availableDeckContainer.innerHTML = "<p>Nothing in the list ...</p>"
    }
})

function appendDeckToAvailableDeckContainer(id, name) {

    let newEl = document.createElement("p")
    newEl.textContent = name

    newEl.addEventListener("click", function() {
        deleteDeckFromDatabase(id)
    })

    availableDeckContainer.append(newEl)
}

function resetAvailableDeckContainer() {
    availableDeckContainer.innerHTML = ""
}

function deleteDeckFromDatabase(elementId) {
    remove(ref(database, `decks/${elementId}`))
}