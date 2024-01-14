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

    //add task info into existing task list
    taskList.push(task);

    //add boxes
    addBox(task);

    //reset input values
    input.value = "";
    dateInput.value = "";

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
    let percentage = 1/calculateDays();
    //box.style.grid-template-columns = 

    //add task name
    let taskName = document.createElement("h2");
    taskName.innerText = input;
    box.appendChild(taskName);
    taskName.setAttribute('class', 'title');

    //add deadline
    let deadline = document.createElement("h3");
    deadline.innerText = calculateDays() + ' days remaining'; //change to remaining days
    box.appendChild(deadline);
    deadline.setAttribute('class', 'date');

    //set color
    console.log(colorhex);
    box.style.backgroundColor = colorhex;

    save();

    let boxWidth, boxHeight;

    if(calculateDays()>=7){
        boxWidth = 150; 
        boxHeight = 150;
    }
    else{
        boxWidth = 500-calculateDays()*50; 
        boxHeight = 150;
    } 

    box.style.width = boxWidth + 'px';
    box.style.height = boxHeight + 'px';

    taskName.style.fontSize = 30 + 'px';
    let fontFamily = 'dm mono'; // Set the desired font family
    taskName.style.fontFamily = fontFamily;
    taskName.style.paddingLeft=20+'px';

    deadline.style.paddingLeft = 20+'px';
    deadline.style.paddingTop = 20+'px';

}

//color picker
function selectColor(colour) {
    colorhex=colour;
}

function calculateDays() {
    var dateString = dateInput.value;
    console.log(dateString);
    let dueDate = new Date(dateString);
    let currentDate = new Date();

    const diff = dueDate - currentDate;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return diffDays + 1;
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