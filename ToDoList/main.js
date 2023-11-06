// Select elements
const inputTask = document.querySelector('.input');
const addTaskButton = document.querySelector('.add');
const tasksContainer = document.querySelector('.tasks');

// Get tasks from local storage and display them
function displayTasks() {
    /*
    *displayTasks is a function that:
    *Clears the previous tasks displayed in the tasksContainer by setting its innerHTML to an empty string.
    *Retrieves the tasks from local storage using localStorage.getItem('tasks'). 
    *It uses JSON.parse to convert the stored JSON data into a JavaScript array. If there are no tasks in local storage,
    *it defaults to an empty array.
    */
    tasksContainer.innerHTML = ''; // *Clear previous tasks
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];


    /*
    *This part of displayTasks iterates through each task in the tasks array, creating a new task element for each one:
    *It creates a new div element for the task and adds the "task" class to it.
    *It sets the inner HTML of the task element to include the task text and a "Remove" button. 
    *The "Remove" button is given a data-index attribute to store the index of the task in the array.
    *It appends the task element to the tasksContainer.
    */
    tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
        <span class="task-text">${task}</span>
        <button class="delete-task" data-index="${index}">Remove</button>
    `;
    tasksContainer.appendChild(taskElement);
  });
}

// Add a new task to local storage and update the display
function addTask() {
  const newTask = inputTask.value.trim();
  if (newTask !== '') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(newTask);
    // *JSON.stringify(tasks): The JSON.stringify() function is used to convert the JavaScript array tasks into a JSON string
    //*This is necessary because localStorage can only store string data.By converting the array to a string, you can later retrieve and parse it back into a JavaScript object when needed.
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inputTask.value = '';
    displayTasks();
  }
}

// Remove a task from local storage and update the display
function removeTask(index) {
    /*
    *removeTask is a function that removes a task from local storage and updates the display when the "Remove" button is clicked:
    It takes the index of the task to remove as an argument.
    It retrieves the existing tasks from local storage, removes the task at the specified index using splice, updates local storage, and then calls displayTasks() to update the displayed list of tasks.
     */
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Event listeners
addTaskButton.addEventListener('click', addTask);

/*
These event listeners are set up to handle user interactions:
The first listener triggers the addTask function when the "Add Task" button is clicked.
The second listener is attached to the tasksContainer and listens for clicks on any element within it. It checks if the clicked element has the "delete-task" class, and if so, it extracts the task's index from the data-index attribute and calls removeTask(index).
*/
tasksContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-task')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    removeTask(index);
  }
});

// Initial display of tasks
displayTasks();
