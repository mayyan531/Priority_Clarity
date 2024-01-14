let input = document.getElementById("taskName");
let dateInput = document.getElementById("Deadline");
const addButton = document.getElementById("add-button");
let boxes = document.querySelectorAll("box");
selectColor;
let colorhex;
let taskList = [];
load();

//events
addButton.addEventListener("click", add);

function add() {
    //define object with task and deadline attributes
    let task = {
        todo: input.value,
        date: dateInput.value
    }

    //reset input values
    input.value = "";
    dateInput.value = "";

    //add task info into existing task list
    taskList.push(task);

    //add boxes
    addBox(task);

    //save
    save();

}

function addBox({todo: input, category: date}) {
    //add new box
    let boxContainer = document.getElementById("box-container");
    let box = document.createElement("div");
    boxContainer.appendChild(box);
    box.setAttribute('class', 'box');
    let newBox = 'box' + taskList.length;
    box.setAttribute('id', newBox);

    //add css property everytime a new box is made
    //document.getElementById(newBox). [either colour(colour taken from function) or fit-content(% from due date difference)]

    //add task name
    let taskName = document.createElement("h2");
    taskName.innerText = input;
    box.appendChild(taskName);
    taskName.setAttribute('class', 'title');

    //add deadline
    let deadline = document.createElement("h3");
    deadline.innerText = calculateDaysDifference(dateInput.value); //change to remaining days
    box.appendChild(deadline);
    deadline.setAttribute('class', 'date');

    //set color
    console.log(colorhex);
    box.style.backgroundColor = colorhex;
}

//color picker
function selectColor(colour) {
    console.log("this function has been processed");
    colorhex=colour;
}

function calculateDaysDifference(dateString) {
    function parseDate(dateString) {
        const parts = dateString.split('-');
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const today = new Date();
        const year = today.getFullYear();
        const dateObject = new Date(year, month - 1, day);
        return dateObject;
    }

    const today = new Date();
    const userDate = parseDate(dateString);
    const timeDifference = userDate - today;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
}

function save() {
    let stringed = JSON.stringify(taskList);
    localStorage.setItem("taskList", stringed);
}

function load() {
    let got = localStorage.getItem("taskList");
    taskList = JSON.parse(got);
    if (taskList == null) {
        taskList = [];
    }
}