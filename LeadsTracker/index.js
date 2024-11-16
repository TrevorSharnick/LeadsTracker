let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
// Get the leads from the localStorage
// Store it in a variable, leadsFromLocalStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


// Check if leadsFromLocalStorage is truthy. Otherwise, don't do anything.
if (leadsFromLocalStorage) {
// if so, set myLeads to its value and call renderLeads()
    myLeads = leadsFromLocalStorage;
    render()
}


tabBtn.addEventListener("click", function() {
// when the user has clicked on the tab button, 
// grab the URL of the current active tab!
/* grabs the active tab in the front-most browser window. */
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // when chrome has found the tab and window, push to myLeads array
        myLeads.push(tabs[0].url)
        // save               key                     value
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        // re-render to show the updated view
        render(myLeads)
   })
})


/* Refector the function so that it takes a parameter, leads, 
that it uses instead of the global myLeads variable. 
Remember to update all invocations of the function as well.*/
function render(leads) {
    // 1. Create a variable, listItems, to hold all the HTML for the list items
    let listItems = ""

    for (let i = 0; i < leads.length; i++) {
        /* 2. Add the item to the listItems variable instead of the ulEl.innerHTML.
        Using a template string and anchor href tags to create links instead of
        plain text. */
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    // 3. Render the listItems inside the unordered list using ulEl.innerHTML
    ulEl.innerHTML = listItems
}




/* ADDING LEADS: 
When the user adds something to the input field and clicks the button,
append the newest input value to the end of the myLeads array. */
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    // clear the input inside of the input box:
    inputEl.value = ""
    // save the myLeads array to localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    /* perform the renderLeads() function to update the myLeads array. */
    render(myLeads)
    
})

/* DELETE ALL LEADS:
Listens for double clicks on the delete button.
When clicked, clear localStorage, myLeads, and the DOM. */
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads);
})

