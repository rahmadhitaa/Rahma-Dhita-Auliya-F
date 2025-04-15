<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_anggota = $_POST['id_anggota'];
    $tanggal_pinjam = date('Y-m-d');
    $tanggal_kembali = date('Y-m-d', strtotime('+7 days'));

    mysqli_query($conn, "INSERT INTO peminjaman (id_anggota, tanggal_pinjam, tanggal_kembali)
                         VALUES ('$id_anggota', '$tanggal_pinjam', '$tanggal_kembali')");
    $id_peminjaman = mysqli_insert_id($conn);

    foreach ($_POST['buku'] as $id_buku => $jumlah) {
        if ($jumlah > 0) {
            mysqli_query($conn, "INSERT INTO detail_peminjaman (id_peminjaman, id_buku, jumlah)
                                 VALUES ('$id_peminjaman', '$id_buku', '$jumlah')");
        }
    }

    echo "Peminjaman berhasil!";
}
?>

<form method="POST">
    Pilih Anggota:
    <select name="id_anggota">
        <?php
        $anggota = mysqli_query($conn, "SELECT * FROM anggota");
        while ($row = mysqli_fetch_assoc($anggota)) {
            echo "<option value='{$row['id_anggota']}'>{$row['nama']}</option>";
        }
        ?>
    </select><br>

    Pilih Buku:<br>
    <?php
    $buku = mysqli_query($conn, "SELECT * FROM buku");
    while ($row = mysqli_fetch_assoc($buku)) {
        echo "{$row['judul']} (Stok: {$row['stok']}) Jumlah: 
        <input type='number' name='buku[{$row['id_buku']}]' min='0' max='{$row['stok']}'><br>";
    }
    ?>

    <button type="submit">Pinjam</button>
</form>
