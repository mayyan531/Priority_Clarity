let input = document.getElementById("new-todo");
let dateInput = document.getElementById("deadline");
const addButton = document.getElementById("add-button");
let taskList = [];
load();

//events
addButton.addEventListener("click", add);

function add(event) {
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

    //add task name
    let taskName = document.createElement("h2");
    taskName.innerText = input;
    box.appendChild(taskName);

    //add deadline
    let deadline = document.createElement("h3");
    deadline.innerText = date; //change to remaining days
    box.appendChild(deadline);
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