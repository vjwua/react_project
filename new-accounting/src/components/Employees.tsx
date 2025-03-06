import { employees } from "../data_employees"

export default function Employees() {
    const peopleData = employees.map(employee =>
        <tr key={employee.id} className="bg-orange-100">
            {/* Iterating each employee value */}
            {Object.values(employee).map((value, index) =>
                <td key={index} className="px-4 py-2 border border-orange-500">{value}</td>
            )}
        </tr>
    )
    return peopleData;
}