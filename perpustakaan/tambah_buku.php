<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $judul = $_POST['judul'];
    $pengarang = $_POST['pengarang'];
    $penerbit = $_POST['penerbit'];
    $tahun = $_POST['tahun'];
    $stok = $_POST['stok'];

    $sql = "INSERT INTO buku (judul, pengarang, penerbit, tahun_terbit, stok) VALUES 
    ('$judul', '$pengarang', '$penerbit', '$tahun', '$stok')";
    mysqli_query($conn, $sql);
    echo "Buku berhasil ditambahkan!";
}
?>

<form method="POST">
    Judul: <input type="text" name="judul"><br>
    Pengarang: <input type="text" name="pengarang"><br>
    Penerbit: <input type="text" name="penerbit"><br>
    Tahun Terbit: <input type="number" name="tahun"><br>
    Stok: <input type="number" name="stok"><br>
    <button type="submit">Simpan</button>
</form>
