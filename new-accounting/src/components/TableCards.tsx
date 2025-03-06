import TableCard from "./TableCard";
import Employees from "./Employees";
import Salary from "./Salaries";


const accountHeaders = ["ID", "ПІБ", "Посада", "Зарплата"];
const salaryHeaders = ["ID", "Employee ID", "Місяць", "Відгули", "Лікарняні", "Фінальна ЗП"];

export default function TableCards() {
    return (
        <>
            <TableCard bg="bg-amber-500" componentHeader={accountHeaders} children={<Employees/>} />
            <TableCard bg="bg-blue-500 border border-cyan-500" componentHeader={salaryHeaders} children={<Salary/>} />
        </>
    );
}