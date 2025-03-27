const clearButton = document.querySelector('.clear');
const addButton = document.querySelector('.add');
const list = document.querySelector('#listofitem');

// delete each item function
function deleteFunction(taskItem) {
    const deleteButton = taskItem.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
    });
}

// Attach delete functionality to existing tasks (if any)
document.querySelectorAll('#listofitem li').forEach(deleteFunction);

clearButton.addEventListener('click', (e) => {
    e.preventDefault(); // ensures the button doesn't reload page
    list.innerHTML = '';
})

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

document.querySelectorAll('#listofitem li').forEach(editFunction);