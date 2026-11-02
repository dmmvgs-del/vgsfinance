<?php
// =========================================================================
// VGS Finance & Loans Management System - Automated Database Auto-Sync Engine
// Executes on Hostinger to create all 10 tables, columns & seed records automatically
// =========================================================================
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

$host = '127.0.0.1';
$dbname = 'u218019073_Vgsfinance';
$user = 'u218019073_Vgsfinance';
$pass = 'Vgsfinance@123';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    $sqlFile = __DIR__ . '/vgsfinance_full.sql';
    if (!file_exists($sqlFile)) {
        throw new Exception("vgsfinance_full.sql file was not found in the root directory.");
    }

    $sql = file_get_contents($sqlFile);
    $pdo->exec($sql);

    // Verify all created tables
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode([
        'success' => true,
        'message' => '🎉 SUCCESS! All tables, columns, and records have been automatically created and seeded in MySQL!',
        'database' => $dbname,
        'tablesCreated' => $tables,
        'totalTables' => count($tables),
        'timestamp' => date('c')
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'database' => $dbname
    ], JSON_PRETTY_PRINT);
}

