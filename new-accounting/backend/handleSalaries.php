<?php
function handleSalaries($method, $db_server) {
    switch ($method) {
        case "GET":  // Fetch all salaries
            if (isset($_GET['id'])) {
                $id = intval($_GET['id']);  // Sanitize the ID
                $stmt = $db_server->prepare("SELECT * FROM salaries WHERE id = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                $result = $stmt->get_result();
                echo json_encode($result->fetch_assoc());
            } else {
                $result = $db_server->query("SELECT * FROM salaries");
                echo json_encode($result->fetch_all(MYSQLI_ASSOC));
            }
            break;

        case "POST":  // Add a salary record
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $db_server->prepare("INSERT INTO salaries (employee_id, month_year, time_off, sick_leave) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("isii", $data["employee_id"], $data["month_year"], $data["time_off"], $data["sick_leave"]);
            echo json_encode(["success" => $stmt->execute()]);
            break;

        case "PUT":  // Update a salary record
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $db_server->prepare("UPDATE salaries SET month_year=?, time_off=?, sick_leave=? WHERE id=?");
            $stmt->bind_param("siii", $data["month_year"], $data["time_off"], $data["sick_leave"], $data["id"]);
            echo json_encode(["success" => $stmt->execute()]);
            break;

        case "DELETE":  // Delete a salary record
            parse_str(file_get_contents("php://input"), $data);
            $stmt = $db_server->prepare("DELETE FROM salaries WHERE id=?");
            $stmt->bind_param("i", $data["id"]);
            echo json_encode(["success" => $stmt->execute()]);
            break;
    }
}
?>