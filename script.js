const deleteButton = document.querySelectorAll('.delete');
const clearButton = document.querySelector('.clear');
const addButton = document.querySelector('.add');
const list = document.querySelector('#listofitem');

deleteButton.forEach(button => {
    button.addEventListener('click', function() {
        const items = this.parentElement;
        items.remove();
    });
});
clearButton.addEventListener('click', () => {
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
})

document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.querySelectorAll('.edit');
    editButton.forEach(button => {
        button.addEventListener('click', function(){
            const item = this.parentElement;
            const list_item = item.querySelector('label');
            
            if (list_item) {
                const currentList = list_item.textContent;
                console.log(currentList);

                // input field
                const input_item = document.createElement('input');
                input_item.type = 'text';
                input_item.value = currentList;
        
                // replace item
                item.replaceChild(input_item, list_item);
        
                // add save button
                this.textContent = 'Save';
        
                // saving changes
                this.addEventListener('click', function () {
                    const newList = input_item.value;
                    const newListItem = document.createElement('label');
                    newListItem.textContent = newList;
                    item.replaceChild(newListItem, input_item);
                    this.textContent = 'Edit';
                }, {once: true});
            } else {
                console.error('Element label not found!');
            }
        });
    });
})