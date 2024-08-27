/**
 * Logic required
 * 
 * 1. Make sure a new item is created and added to the planning section when the button is clicked.
 * 2. User can move the task to in-progress or completed as per their preference.
 */

// Default message for a new task card
const defultTaskCardMsg = "Write Your Task Here"; 
// Empty text used to clear the default message
const blankText = "";

// Get the Add New Task button
let AddNewTaskButton = document.getElementById("addTask");
// Get the Planned column div
let planningDiv = document.getElementById("planned");

// Add event listener for adding a new task card on button click
AddNewTaskButton.addEventListener("click", () => {
    // Create a new task card
    let taskCard = document.createElement("div");
    taskCard.setAttribute("class", "taskCard");
    taskCard.setAttribute("contenteditable", true);

    //Create a paragraph element for the default message
    let default_msg = document.createElement("p");
    default_msg.innerText = defultTaskCardMsg;
    taskCard.append(default_msg);
    // Add the task card to the Planned column
    planningDiv.appendChild(taskCard);

    // Clear the default text when the task card is clicked
    taskCard.addEventListener("click", (event) => {
        let selectCard = event.target;
        if (selectCard.innerText == defultTaskCardMsg) {
            selectCard.innerHTML = blankText;
        }
    });

    // Remove the task card if it is left blank
    taskCard.addEventListener("blur", (event) => {
        let blurCard = event.target;
        if (blurCard.innerText.startsWith("Planned")) {
            blurCard.remove();
        }
    });

    // Create a dropdown for selecting task status
    let dropDown = document.createElement("select");
    dropDown.innerHTML = `
        <option value="planned">Planned</option>
        <option value="inprogress">In-Progress</option>
        <option value="completed">Completed</option>
    `;
    taskCard.append(dropDown);

    // Move the task card to the selected status column
    dropDown.addEventListener("change", (event) => {
        let selectedValue = event.target.value;
        let moveToColumn = document.getElementById(selectedValue);
        moveToColumn.append(taskCard);
    });
});
