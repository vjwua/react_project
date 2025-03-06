import { salary_records } from "../data_salaries"

export default function Salary() {
    const peopleData = salary_records.map(employee =>
        <tr key={employee.id} className="bg-cyan-100">
            {/* Iterating each salary record value */}
            {Object.values(employee).map((value, index) =>
                <td key={index} className="px-8 py-2 border border-cyan-500">{value}</td>
            )}
        </tr>
    )
    return peopleData;
}