


// Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners

loadEventListeners();

//Load all even listeners creation

function loadEventListeners() {
    // load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event 
    form.addEventListener('submit', addTask);
    // remove task 
    taskList.addEventListener('click', removeTask);
    // clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node & append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);
    });
}

// Add task

function addTask(e) {
    if(taskInput.value == '') {
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node & append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';


    e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove task

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear all tasks

function clearTasks() {
    // clear all
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from local storage

    clearTaskFromLocalStorage();
}

// clear tasks from local storage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// filter tasks

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

