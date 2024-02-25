// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value; //getting user entry value
  if (userEnteredValue.trim() != 0) { //if user values aren't only spaces
    addBtn.classList.add("active"); //activate add button
  } else {
    addBtn.classList.remove("active"); //unactivate add button
  }
}

showTasks(); // calling showTasks function

// iuf user click on the add button
addBtn.onclick = () => {
  let userEnteredValue = inputBox.value; //getting user entry value
  let getLocalStorage = localStorage.getItem("New Todo"); // getting localstorage 
  if (getLocalStorage == null) { // if localStorage is null
    listArr = []; // creating blank array
  } else {
    listArr = JSON.parse(getLocalStorage); // json string to json object
  }
  listArr.push(userEnteredValue); // pushin or adding userData
  localStorage.setItem("New Todo", JSON.stringify(listArr)); // json object to json string
  showTasks(); // calling showTasks function
  addBtn.classList.remove("active");
}

// function to add task list inside ul
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo"); // getting localstorage 
  if (getLocalStorage == null) { // if localStorage is null
    listArr = []; // creating blank array
  } else {
    listArr = JSON.parse(getLocalStorage); // json string to json object
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length; //passing the length value in pending 
  if (listArr.length > 0) {
    deleteAllBtn.classList.add("active"); // activate clearall button
  } else {
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside u1 tag
  inputBox.value = "";
}

//delete task function
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete or remove the particular indexed li
  //after removing the li update the local storage again
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

//delete all task function 
deleteAllBtn.onclick = () => {
  listArr = []; //empty an array 
  // after deleting all task again update the local storage 
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks(); //calling showTasks function 
}