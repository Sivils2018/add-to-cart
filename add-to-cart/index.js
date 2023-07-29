import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; //imports the app for database
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; //this is all the import methods for the database

const appSettings = {
    databaseURL: "https://grocery-47424-default-rtdb.firebaseio.com/" //this is our Databases URL
}

const app = initializeApp(appSettings) //Initializes the app
const database = getDatabase(app)
const shoppingListInDb = ref(database, "shoppingList") //makes a new reference to the shoppinglist



const addBtn = document.getElementById("add-button");
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")


addBtn.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    if (inputValue === " "){
        alert("No Item was entered")
        clearInputField()
    } else {
        push(shoppingListInDb, inputValue)
        clearInputField()
        }
   // appendItemToShopping(inputValue)
})


onValue(shoppingListInDb, function(snapshot){

    if (snapshot.exists()){
    let shoppingData = Object.entries(snapshot.val())
    clearShoppingList()
    for (let i = 0; i < shoppingData.length; i++){
        let currentItem = shoppingData[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShopping(currentItem);
    }
} else {
    shoppingListEl.innerHTML = "No items here...yet"
}


})

function clearShoppingList(){
    shoppingListEl.innerHTML = ""
}

function clearInputField(){
    inputFieldEl.value = ""
}

function appendItemToShopping(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li") //creating an element
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)

    newEl.addEventListener("click", function(){
        let exactLocation = ref(database, `shoppingList/${itemID}`)
        remove(exactLocation)


    })

}
