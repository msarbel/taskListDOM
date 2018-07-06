


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
    // add task event 
    form.addEventListener('submit', addTask);
    // remove task 
    taskList.addEventListener('click', removeTask);
    // clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks
    filter.addEventListener('keyup', filterTasks);
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

    // clear input
    taskInput.value = '';


    e.preventDefault();
}


// Remove task

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// clear all tasks
function clearTasks() {
    // clear all
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
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