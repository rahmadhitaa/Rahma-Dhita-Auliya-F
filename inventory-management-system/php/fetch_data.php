<?php
header('Content-Type: application/json');
include 'config.php';

try {
    // Fetch all items
    $stmt = $pdo->query("SELECT * FROM items");
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calculate statistics
    $totalItems = count($items);
    $lowStock = 0;
    $categories = [];

    foreach ($items as $item) {
        if ($item['quantity'] < 10) {
            $lowStock++;
        }
        if (!in_array($item['category'], $categories)) {
            $categories[] = $item['category'];
        }
    }

    $response = [
        'items' => $items,
        'totalItems' => $totalItems,
        'lowStock' => $lowStock,
        'categories' => count($categories)
    ];

    echo json_encode($response);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>