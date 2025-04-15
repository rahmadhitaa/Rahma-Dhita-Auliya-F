document.addEventListener('DOMContentLoaded', () => {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    // Elemen DOM
    const addItemForm = document.getElementById('addItemForm');
    const sellItemForm = document.getElementById('sellItemForm');
    const inventoryBody = document.getElementById('inventoryBody');
    const searchInput = document.getElementById('searchInput');
    const notification = document.getElementById('notification');
    const themeToggle = document.getElementById('themeToggle');

    // Simpan ke localStorage
    const saveInventory = () => {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    };

    // Tampilkan notifikasi
    const showNotification = (message, type) => {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    };

    // Perbarui tabel
    const updateTable = (filter = '') => {
        inventoryBody.innerHTML = '';
        const filteredInventory = inventory.filter(item =>
            item.name.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredInventory.length === 0) {
            inventoryBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Tidak ada barang</td></tr>';
            return;
        }

        filteredInventory.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rp ${item.price.toLocaleString('id-ID')}</td>
                <td><button class="btn btn-danger" onclick="deleteItem(${index})">Hapus</button></td>
            `;
            inventoryBody.appendChild(row);
        });
    };

    // Tambah barang
    addItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('itemName').value.trim();
        const quantity = parseInt(document.getElementById('itemQuantity').value);
        const price = parseInt(document.getElementById('itemPrice').value);

        if (inventory.some(item => item.name.toLowerCase() === name.toLowerCase())) {
            showNotification('Barang sudah ada!', 'error');
            return;
        }

        inventory.push({ name, quantity, price });
        saveInventory();
        updateTable();
        showNotification('Barang berhasil ditambahkan!', 'success');
        addItemForm.reset();
    });

    // Jual barang
    sellItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sellItemName').value.trim();
        const quantity = parseInt(document.getElementById('sellQuantity').value);

        const item = inventory.find(item => item.name.toLowerCase() === name.toLowerCase());
        if (!item) {
            showNotification('Barang tidak ditemukan!', 'error');
            return;
        }
        if (item.quantity < quantity) {
            showNotification('Stok tidak cukup!', 'error');
            return;
        }

        item.quantity -= quantity;
        if (item.quantity === 0) {
            inventory = inventory.filter(i => i.name.toLowerCase() !== name.toLowerCase());
        }
        saveInventory();
        updateTable();
        showNotification('Penjualan berhasil!', 'success');
        sellItemForm.reset();
    });

    // Hapus barang
    window.deleteItem = (index) => {
        inventory.splice(index, 1);
        saveInventory();
        updateTable();
        showNotification('Barang dihapus!', 'success');
    };

    // Pencarian
    searchInput.addEventListener('input', () => {
        updateTable(searchInput.value);
    });

    // Toggle tema
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i>`;
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Inisialisasi tema
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Inisialisasi tabel
    updateTable();
});