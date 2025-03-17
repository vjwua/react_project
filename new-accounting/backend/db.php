<?php
    require __DIR__ . '/../vendor/autoload.php';
    include_once 'handleEmployees.php';
    include_once 'handleSalaries.php';

    Dotenv\Dotenv::createUnsafeImmutable(__DIR__)->load();

    header("Access-Control-Allow-Origin: http://localhost:9600");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    $db_server = new mysqli(
        getenv('DB_HOST'), 
        getenv('DB_USER'), 
        getenv('DB_PASS'), 
        getenv('DB_NAME')
    );

    mysqli_set_charset($db_server, 'utf8');

    if ($db_server->connect_error) {
        die(json_encode(["error" => "Connection failed: " . $db_server->connect_error]));
    }

    $method = $_SERVER["REQUEST_METHOD"];
    $endpoint = $_GET["endpoint"] ?? "";
    
    switch ($endpoint) {
        case "employees":
            handleEmployees($method, $db_server);
            break;
        
        case "salaries":
            handleSalaries($method, $db_server);
            break;
    
        default:
            echo json_encode(["error" => "Invalid endpoint"]);
            break;
    }
    
    $db_server->close();
?>