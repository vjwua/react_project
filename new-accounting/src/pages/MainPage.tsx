import TableCards from "../components/TableCards";
import EmployeeForm from "../components/EmployeeForm"
import SalaryForm from "../components/SalaryForm"

export default function MainPage() {
    return(
        <>
            <TableCards />
            <EmployeeForm />
            <SalaryForm />
        </>
    );
}