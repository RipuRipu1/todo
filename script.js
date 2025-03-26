const deleteButton = document.querySelectorAll('.delete');
const clearButton = document.querySelector('.clear');

deleteButton.forEach(button => {
    button.addEventListener('click', function() {
        const items = this.parentElement;
        items.remove();
    });
});

clearButton.addEventListener('click', () => {
    const list = document.querySelector('#listofitem');
    list.innerHTML = '';
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