document.addEventListener('DOMContentLoaded', () => {
    // Fetch inventory data on page load
    fetchInventoryData();

    // Handle form submission
    const form = document.getElementById('add-item-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('php/add_item.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Item added successfully!');
                form.reset();
                fetchInventoryData(); // Refresh table
            } else {
                alert('Error adding item: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

function fetchInventoryData() {
    fetch('php/fetch_data.php')
        .then(response => response.json())
        .then(data => {
            // Update cards
            document.getElementById('total-items').textContent = data.totalItems;
            document.getElementById('low-stock').textContent = data.lowStock;
            document.getElementById('categories').textContent = data.categories;

            // Update table
            const tbody = document.getElementById('inventory-body');
            tbody.innerHTML = '';
            data.items.forEach(item => {
                const row = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.category}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.created_at}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error:', error));
}