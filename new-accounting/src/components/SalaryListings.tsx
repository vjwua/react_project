import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Employee } from "./EmployeeListings";

export interface Salary {
    id: number;
    employee_id: number;
    month_year: string;
    time_off: number;
    sick_leave: number;
    employee_name?: string;
    final_salary?: number;
}

export default function SalaryListings({isHome = false}: {isHome: boolean}) {
    const salaryHeaders = ["ID", "ПІБ", "Місяць", "Відгули", "Лікарняні", "Фінальна ЗП"];

    const [salaries, setSalaries] = useState<Salary[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [salariesRes, employeesRes] = await Promise.all([
                    fetch("/api/db.php?endpoint=salaries").then(res => res.json()),
                    fetch("/api/db.php?endpoint=employees").then(res => res.json()),
                ]);

                setEmployees(employeesRes);

                const updatedSalaries = salariesRes.map((salary: Salary) => {
                    const employee = employeesRes.find((emp: Employee) => emp.id === salary.employee_id);
                    const baseSalary = employee ? employee.salary : 0;
                    return {
                        ...salary,
                        employee_name: employee ? employee.fullname : "Невідомий",
                        final_salary: baseSalary - (salary.time_off * 500),
                    };
                });

                setSalaries(updatedSalaries);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container m-auto max-w-4xl py-6">
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full">
                <thead>
                    <tr className="bg-cyan-500 border border-cyan-500">
                    {salaryHeaders.map((header, index) => (
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
                    {salaries.map(salary =>
                        <>
                            <tr
                                key={salary.id}
                                className="even:bg-cyan-100 odd:bg-white hover:bg-cyan-200 transition-colors"
                            >
                            <td className="px-4 py-4 text-sm text-gray-700 border-b border-cyan-500">
                                {salary.id}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 border-b border-cyan-500">
                                {salary.employee_name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 border-b border-cyan-500">
                                {salary.month_year}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 border-b border-cyan-500">
                                {salary.time_off}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 border-b border-cyan-500">
                                {salary.sick_leave}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 border-b border-cyan-500 font-bold">
                                    {salary.final_salary} ₴
                                </td>
                            {!isHome && <td className="px-4 py-4 text-sm text-gray-700 border-b border-cyan-500">
                                <Link
                                    to={`/edit-salary/${salary.id}`}
                                    className='bg-yellow-500 hover:bg-yellow-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mb-4 block'
                                >
                                Редагувати
                                </Link>
                                <Link
                                    to={`/delete-salary/${salary.id}`}
                                    className='bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline block'
                                >
                                Видалити
                                </Link>
                            </td>}
                            </tr>
                        </>
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );
}