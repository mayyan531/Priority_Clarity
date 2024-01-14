let input = document.getElementById("new-todo");
let dateInput = document.getElementById("deadline");

function add(event) {
    //define object with task and deadline attributes
    let task = {
        todo: input.value,
        date: dateInput.value
    }

    //reset input values
    input.value = "";
    dateInput.value = "";

    //add boxes

    //save
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
    deadline.innerText = date;
    box.appendChild(deadline);
}