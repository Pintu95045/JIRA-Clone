/**
 * Logic required
 * 
 * 1. Make sure an new item is created and added to the planning section when the button clicked.
 * 2. user can able to move it to inprogress or planning as per their prefrences
 * 
 */



//every time new card creation while cling on button

const defultTaskCardMsg="Write Your Task Here"; 
const blankText="";

let AddNewTaskButton = document.getElementById("addTask");
let planningDiv = document.getElementById("planning");

AddNewTaskButton.addEventListener("click", () => {
    let taskCard = document.createElement("div");
    taskCard.setAttribute("class", "taskCard");
    taskCard.setAttribute("contenteditable", true);
    taskCard.innerHTML = defultTaskCardMsg;
    // Append the new task card to the planningDiv
    planningDiv.appendChild(taskCard);


    //existing text should be clear when click on the text field

    taskCard.addEventListener("click",(event) => {
        let selectCard=event.target;
        if(selectCard.innerText==defultTaskCardMsg){
            selectCard.innerHTML=blankText;
        }
    });

    //blank card should be removed
    taskCard.addEventListener("blur",(event) =>{
        let blurCard=event.target;
        if(blurCard.innerHTML===blankText){
            blurCard.remove();
        }
    });
 
});
