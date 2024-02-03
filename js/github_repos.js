// add to tasks to the local storage

let taskContainer = document.querySelector(".todo-container"),
  taskContent = document.querySelector(".task-content"),
  inputValue = document.querySelector(".add-task input"),
  addButton = document.querySelector(".plus"),
  taskCount = document.querySelector(".tasks-count span"),
  tasksCompleted = document.querySelector(".tasks-completed span"),
  deleteAllButton = document.querySelector(".all-tasks .delete-all"),
  completeAllButton = document.querySelector(".all-tasks .marked-all"),
  time = document.querySelector(".time");

window.onload = () => inputValue.focus();

addButton.addEventListener("click", isInputEmpty);

inputValue.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    isInputEmpty();
  }
});

function isInputEmpty() {
  if (inputValue.value === "") {
    createSwalBox("Kindly Enter Task Name!!!!");
  } else {
    deleteEmptyMsg();
    createTask();

    inputValue.focus();
  }
}

function createSwalBox(message) {
  swal.fire({
    text: message,
    customClass: {
      confirmButton: "sweet-warning",
    },
    width: "300px",
    color: "#607274",
    confirmButtonColor: "#607274",
  });
}

function deleteEmptyMsg() {
  let noTaskMsg = document.querySelector(".msg");

  if (noTaskMsg) {
    noTaskMsg.remove();
  }
}

function isTaskExist(taskName) {
  return (
    document.querySelector(`.task-box[data-task-name="${taskName}"]`) !== null
  );
}

isTaskExist(inputValue.value);

function createTask() {
  if (isTaskExist(inputValue.value)) {
    createSwalBox("Task already exists!");
  } else {
    let mainSpan = document.createElement("span");
    mainSpan.className = "task-box";
    mainSpan.setAttribute("data-task-name", inputValue.value.trim());

    let mainSpanText = document.createTextNode(inputValue.value);
    mainSpan.appendChild(mainSpanText);

    let deleteButton = document.createElement("span");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
      deleteTask(mainSpan);
    });

    mainSpan.addEventListener("click", function () {
      completedTask(mainSpan);
    });

    mainSpan.appendChild(deleteButton);
    taskContent.appendChild(mainSpan);

    inputValue.value = "";
    calculateTasks();
  }
}

function deleteTask(taskBox) {
  taskBox.remove();

  calculateTasks();

  if (document.querySelectorAll(".task-content .task-box").length === 0) {
    createNoTaskMsg();
  }
}

function completedTask(completedTask) {
  completedTask.classList.add("completed");
  calculateTasks();
}

function calculateTasks() {
  taskCount.innerHTML = document.querySelectorAll(
    ".task-content .task-box"
  ).length;

  tasksCompleted.innerHTML = document.querySelectorAll(
    ".task-content .completed"
  ).length;
}

function createNoTaskMsg() {
  let msgSpan = document.createElement("span");
  let mesText = document.createTextNode("No Tasks To Show");
  msgSpan.className = "no-tasks-message";
  msgSpan.appendChild(mesText);
  taskContent.appendChild(msgSpan);
}

completeAllButton.addEventListener("click", completeAllTasks);
deleteAllButton.addEventListener("click", deleteAllTasks);

function deleteAllTasks() {
  document.querySelectorAll(".task-box").forEach((task) => task.remove());
  createNoTaskMsg();
  resetTaskCount();
}

function completeAllTasks() {
  document
    .querySelectorAll(".task-box")
    .forEach((task) => task.classList.add("completed"));
  tasksCompleted.innerHTML = taskCount.innerHTML;
}

function resetTaskCount() {
  taskCount.innerHTML = 0;
  tasksCompleted.innerHTML = 0;
}

function digitalClock() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date();

  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let flag = "PM";

  if (hours === 12) hours = 1;
  else hours = hours - 12;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) hours = "0" + hours;
  if (seconds < 10) hours = "0" + hours;

  let fullTime = `${day} ${hours}: ${minutes}: ${seconds} ${flag}`;

  time.innerHTML = fullTime;
}

setInterval(digitalClock, 1000);
