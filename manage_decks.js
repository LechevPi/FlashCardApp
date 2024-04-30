import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://secondbrain-3273f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const availableDecks = ref(database, "decks")
const mainDoc = document.getElementsByTagName("main")[0]


/* Handling click on add buttons */

const addButton = document.getElementById("add-new-deck-button")

addButton.addEventListener("click", function() {

    addDeckSubwindow.style.display = "block"
})

/* Adding the available decks live */

const availableDeckContainer = document.getElementById("available-decks-container")

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

    let newDiv = document.createElement("div");
    newDiv.classList.add("deck");

    let deckName = document.createElement("p");
    deckName.textContent = name;

    let manageButton = document.createElement("button");
    manageButton.textContent = "manage";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";

    deleteButton.addEventListener("click", function() {
        confirmDeckDeletion(id, name);
    });

    newDiv.appendChild(deckName);
    newDiv.appendChild(manageButton);
    newDiv.appendChild(deleteButton);

    mainDoc.appendChild(newDiv);
}

function confirmDeckDeletion(deckId, deckName) {

    let newDiv = document.createElement("div");
    newDiv.style.display = "block";
    newDiv.style.position = "absolute";
    newDiv.style.border = "1px solid black";
    newDiv.style.top = "1rem";
    newDiv.style.backgroundColor = "aqua";

    let newDivText = document.createElement("p");
    newDivText.textContent = `Confirm the deletion of the deck ${deckName}`;

    let deleteButon = document.createElement("button");
    deleteButon.textContent = "delete";

    let exitButon = document.createElement("button");
    exitButon.textContent = "keep";

    deleteButon.addEventListener("click", function() {
        deleteDeckFromDatabase(deckId)
        newDiv.style.display = "none";
    })
    exitButon.addEventListener("click", function() {
        newDiv.style.display = "none";
    })

    newDiv.appendChild(newDivText)
    newDiv.appendChild(deleteButon)
    newDiv.appendChild(exitButon)

    availableDeckContainer.appendChild(newDiv)
}

function resetAvailableDeckContainer() {
    availableDeckContainer.innerHTML = ""
}

function deleteDeckFromDatabase(elementId) {
    remove(ref(database, `decks/${elementId}`))
}

/* Adding a new deck */

const addDeckSubwindow = document.getElementById("add-deck-subwindow")
const leaveAddDeckSubwindow = document.getElementById("leave-add-deck-subwindow")
const inputFieldElement = document.getElementById("input-field")
const createNewDeckButton = document.getElementById("create-new-deck-button")

leaveAddDeckSubwindow.addEventListener("click", function () {
    hideAddDeckSubwindow()
})

createNewDeckButton.addEventListener("click", function() {
    let deckName = inputFieldElement.value

    if (deckName != "") {
        push(availableDecks, deckName)
    }
    
    clearInputField()
    hideAddDeckSubwindow()

})

function hideAddDeckSubwindow() {
    addDeckSubwindow.style.display = "none"
}

function clearInputField() {
    inputFieldElement.value = ""
}