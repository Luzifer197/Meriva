document.addEventListener('DOMContentLoaded', () => {
    // Your existing code...

    function addItemToList(item, amount) {
        const listItem = document.createElement('li');
        const editableSpan = document.createElement('span');
        editableSpan.textContent = `${item} - `;
        editableSpan.contentEditable = true;
        editableSpan.classList.add('editable');
        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = amount;
        listItem.appendChild(editableSpan);
        listItem.appendChild(quantitySpan);
        inventoryList.appendChild(listItem);
    }

    inventoryList.addEventListener('input', (event) => {
        const listItem = event.target.closest('li');
        const item = listItem.querySelector('.editable').textContent.trim();
        const amount = parseInt(listItem.querySelector('span:not(.editable)').textContent.trim(), 10);
        // Hier können Sie die Änderungen an Ihren Daten senden oder eine andere Aktion ausführen
        console.log('Item:', item);
        console.log('Amount:', amount);
    });
});
