<?php
function handleEmployees($method, $db_server) {
    switch ($method) {
        case "GET":  // Fetch all employees or a single employee
            if (isset($_GET['id'])) {
                $id = intval($_GET['id']);  // Sanitize the ID
                $stmt = $db_server->prepare("SELECT * FROM employees WHERE id = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $result = $stmt->get_result();
                echo json_encode($result->fetch_assoc());
            } else {
                $result = $db_server->query("SELECT * FROM employees");
                echo json_encode($result->fetch_all(MYSQLI_ASSOC));
            }
            break;

        case "POST":  // Add an employee
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $db_server->prepare("INSERT INTO employees (fullname, occupation, salary) VALUES (?, ?, ?)");
            $stmt->bind_param("ssd", $data["fullname"], $data["occupation"], $data["salary"]);
            echo json_encode(["success" => $stmt->execute()]);
            break;

        case "PUT":  // Update an employee
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $db_server->prepare("UPDATE employees SET fullname=?, occupation=?, salary=? WHERE id=?");
            $stmt->bind_param("ssdi", $data["fullname"], $data["occupation"], $data["salary"], $data["id"]);
            echo json_encode(["success" => $stmt->execute()]);
            break;

        case "DELETE":  // Delete an employee
            parse_str(file_get_contents("php://input"), $data);
            $stmt = $db_server->prepare("DELETE FROM employees WHERE id=?");
            $stmt->bind_param("i", $data["id"]);
            echo json_encode(["success" => $stmt->execute()]);
            break;
    }
}
?>
