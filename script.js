// Get the main heading element and set its inner HTML
const appHeading = document.getElementById("app");
appHeading.innerHTML = `<h1>!Jira Board!</h1>`;
appHeading.setAttribute("contenteditable", true); // Makes the heading editable

// Constants for default task card message and empty text
const DEFAULT_TASK_CARD_MESSAGE = "Write Your Task Here";
const BLANK_TEXT = "";

// Get the button element to add a new task and the planned column element
let addTaskButton = document.getElementById("addTaskButton");
let plannedColumn = document.getElementById("plannedColumn");

// Counter to assign unique IDs to each task card
let taskCounter = 0;

/**
 * Adds a new task card when the "Add New Task" button is clicked.
 * The new task card is added to the "Planned" column and is editable and draggable.
 */
addTaskButton.addEventListener("click", () => {
  // Create a new task card element
  let taskCard = document.createElement("div");
  taskCard.setAttribute("class", "taskCard"); // Adds CSS class for styling
  taskCard.setAttribute("id", `taskCard-${++taskCounter}`); // Sets a unique ID
  taskCard.setAttribute("contenteditable", true); // Makes the card editable
  taskCard.setAttribute("draggable", true); // Enables drag functionality
  taskCard.innerHTML = DEFAULT_TASK_CARD_MESSAGE; // Default message in task card

  // Append the new task card to the "Planned" column
  plannedColumn.appendChild(taskCard);

  /**
   * Clear the default text when the task card is clicked for the first time.
   */
  taskCard.addEventListener("click", () => {
    if (taskCard.innerText === DEFAULT_TASK_CARD_MESSAGE) {
      taskCard.innerHTML = BLANK_TEXT; // Clears the content
    }
  });

  /**
   * Remove the card if it is empty when it loses focus (blur event).
   */
  taskCard.addEventListener("blur", () => {
    if (taskCard.innerHTML === BLANK_TEXT) {
      taskCard.remove(); // Removes the task card
    }
  });

  /**
   * Drag and drop functionality: starts dragging the task card.
   */
  taskCard.addEventListener("dragstart", (dragEvent) => {
    let selectedCardId = dragEvent.target.id; // Gets the ID of the dragged element
    dragEvent.dataTransfer.setData("text", selectedCardId); // Sets the data to be transferred
    taskCard.style.opacity = 0.8; // Changes opacity to indicate dragging
  });

  /**
   * Resets the task card's appearance after the dragging ends.
   */
  taskCard.addEventListener("dragend", () => {
    taskCard.style.opacity = 1; // Resets opacity
  });

  /**
   * Allows columns to handle dragging and dropping of task cards.
   * Attaches the dragged task card to the column where it is dropped.
   */
  const dragEvents = ["dragover", "dragenter", "drop"]; // Events for drag and drop
  dragEvents.forEach((eventType) => {
    let columns = document.getElementsByClassName("column"); // Gets all column elements
    for (let column of columns) {
      column.addEventListener(eventType, (event) => {
        event.preventDefault(); // Prevents default behavior for each event
        if (eventType === "drop") {
          let selectedCardId = event.dataTransfer.getData("text"); // Gets the dragged card ID
          let selectedCard = document.getElementById(selectedCardId); // Gets the dragged card element
          column.append(selectedCard); // Appends the card to the new column
        }
      });
    }
  });
});

/**
 * Please read through the code
 * Replicate the functionality in your workspace
 *
 **/

// Below is an alternative method to move tasks using a dropdown menu (not needed for drag-and-drop).
// User should be able to move Task/Item from Planned Column to In-Progress or Completed Column


// let dropDown = document.createElement("select");

// dropDown.innerHTML = `
//   <option value="plannedColumn"> Planned </option>
//   <option value="inProgressColumn"> In-Progress </option>
//   <option value="completedColumn"> Completed </option>
// `;

// taskCard.append(dropDown);

// dropDown.addEventListener("change", (event) => {
//   let selectedValue = event.target.value; // inProgressColumn
//   let moveToColumn = document.getElementById(selectedValue); // inProgressColumn Column
//   moveToColumn.append(taskCard);
// });

// This New Item must be created under the Planned Column
