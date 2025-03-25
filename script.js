const deleteButton = document.querySelectorAll('.delete');
const editButton = document.querySelectorAll('.edit');

deleteButton.forEach(button => {
    button.addEventListener('click', function() {
        const items = this.parentElement;
        items.remove();
    });
});