const list = document.querySelector('#listofitem');
const clearButton = document.querySelector('.clear');

// clear function
clearButton.addEventListener('click', (e) => {
    e.preventDefault(); // ensures the button doesn't reload page
    document.querySelector('#listofitem').innerHTML = ""; // Clear UI
});

// delete each item function
function deleteFunction(taskItem) {
    const deleteButton = taskItem.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        console.log('delete button clicked');
        const taskList = taskItem.querySelector('label').textContent;

        // remove from DOM
        taskItem.remove();

        //remove from local storage
        removeTask(taskList); 
    });
}

// remove task from local storage
const removeTask = (task) => {
    let storedTask = JSON.parse(localStorage.getItem("task")) || [];
    storedTask = storedTask.filter(item => item.text !== task);
    localStorage.setItem("task", JSON.stringify(storedTask));
}


// Attach delete functionality to existing tasks (if any)
document.querySelectorAll('#listofitem li').forEach(deleteFunction);

// add function
// function addTask(){
    const addButton = document.querySelector('.add');

    // create input field to add new task
    const inputItem = document.createElement('input');
    inputItem.type = 'text';
    inputItem.placeholder = 'Enter new task'
    
    // track if input is shown
    let isVisible = false
    
    addButton.addEventListener('click', (e) => {
        e.preventDefault(); // ensures the button doesn't reload page
    
        if (isVisible) {
            const newValue = inputItem.value.trim();
            // get input value and trim space
    
            if (newValue != '') {
                const newItemList = document.createElement('li');
                newItemList.innerHTML = 
                `<input type="checkbox" name="todo">
                    <label>${newValue}</label>
                    <button type="button" class="edit">
                        <i data-feather="edit-2"></i>
                    </button>
                    <button type="button" class="delete">
                        <i data-feather="trash-2"></i>
                    </button>`;
                list.appendChild(newItemList);
                deleteFunction(newItemList);
                editFunction(newItemList);
                
                feather.replace();
            }
    
            // reset and hide input field
            inputItem.value = '';
            inputItem.remove();
            addButton.textContent = 'add';
            isVisible = false;
        } else {
            addButton.before(inputItem);
            addButton.textContent ='save';
            isVisible = true;
        }
    });   
// }


function editFunction(taskItem) {
    const editButton = taskItem.querySelector('.edit');
    editButton.addEventListener('click', function () {
        const item = this.parentElement;
        const listItem = item.querySelector('label');

        if (listItem) {
            const currentText = listItem.textContent;

            // Create input field
            const inputItem = document.createElement('input');
            inputItem.type = 'text';
            inputItem.value = currentText;

            // Replace label with input field
            item.replaceChild(inputItem, listItem);

            // Change button text to "Save"
            this.textContent = 'Save';

            // Remove previous event listener to prevent duplication
            this.removeEventListener('click', arguments.callee);

            // Add save functionality
            this.addEventListener('click', function saveTask() {
                const newText = inputItem.value;
                const newLabel = document.createElement('label');
                newLabel.textContent = newText;

                // Replace input field with updated label
                item.replaceChild(newLabel, inputItem);

                // Change button text back to "Edit"
                this.textContent = 'Edit';

                // Restore edit event
                this.removeEventListener('click', saveTask);
                editFunction(taskItem);
                
            }, { once: true });
        }
    });
}

// Attach edit functionality to existing tasks
document.querySelectorAll('#listofitem li').forEach(editFunction);

// save tasks in local storage
function Save(){
    console.log('save button clicked');
    const todos = [];
    const listOfItem = document.querySelectorAll('#listofitem li');
    
    listOfItem.forEach(item => {
        const todoText = item.querySelector('label').innerText;
        const isChecked = item.querySelector('input[type="checkbox"]').checked;
        todos.push({ text: todoText, completed: isChecked });
    });

    localStorage.setItem('task', JSON.stringify(todos));
}
// load tasks from local storage
function Load(){
    console.log('load button clicked');
    const savedItem = JSON.parse(localStorage.getItem('task')) || [];
    const list = document.getElementById('listofitem');
    list.innerHTML = ''; // Clear existing items

    savedItem.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" name="todo" ${todo.completed ? 'checked' : ''}>
            <label>${todo.text}</label>
            <button type="button" class="edit"><i data-feather="edit-2"></i></button>
            <button type="button" class="delete"><i data-feather="trash-2"></i></button>
        `;
        list.appendChild(li);

        // call delete funtion for each to-do item
        deleteFunction(li);
    });

    // Re-initialize Feather icons
    feather.replace();
}

document.querySelector('.save').addEventListener('click', (e) => {
    e.preventDefault(); // ensure the button doesn't reload the web page
    Save();
});
document.querySelector('.load').addEventListener('click', (e) => {
    e.preventDefault(); // ensure the button doesn't reload the web page
    Load();
});