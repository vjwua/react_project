import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export interface Employee {
    id: number;
    fullname: string;
    occupation: string;
    salary: number
}

export default function EmployeeListings({isHome = false}: {isHome: boolean}) {
    const accountHeaders = ["ID", "ПІБ", "Посада", "Зарплата"];

    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        //wished to utilise use(), but then the server comp will conflict with client one
        const fetchEmployees = async () => {
            fetch("/api/db.php?endpoint=employees")
            .then((res) => res.json())
            .then((data) => setEmployees(data))
            .catch((err) => console.error("Error fetching employees:", err));
        }
        fetchEmployees();
    }, []);

    return (
        <div className="container m-auto max-w-4xl py-6">
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full">
                <thead>
                    <tr className="bg-amber-500">
                    {accountHeaders.map((header, index) => (
                        <th key={index} className="px-4 py-4 text-sm text-center font-semibold">
                        {header}
                        </th>
                    ))}
                    {!isHome && (
                        <th className="px-4 py-4 text-sm text-center font-semibold w-60">Дії</th>
                    )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                        <>
                            <tr
                                key={employee.id}
                                className="even:bg-amber-100 odd:bg-white hover:bg-amber-200 transition-colors"
                            >
                            <td className="px-4 py-4 text-sm text-gray-700 border-b border-amber-500">
                                {employee.id}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 border-b border-amber-500">
                                {employee.fullname}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 border-b border-amber-500">
                                {employee.occupation}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 border-b border-amber-500 font-bold">
                                {employee.salary} ₴
                            </td>
                            {!isHome && <td className="px-4 py-4 text-sm text-gray-700 border-b border-amber-500">
                                <Link
                                    to={`/edit-employee/${employee.id}`}
                                    className='bg-yellow-500 hover:bg-yellow-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mb-4 block'
                                >
                                Редагувати
                                </Link>
                                <Link
                                    to={`/delete-employee/${employee.id}`}
                                    className='bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline block'
                                >
                                Видалити
                                </Link>
                            </td>}
                            </tr>
                        </>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}