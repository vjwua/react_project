//import TableCard from "../components/TableCard";
import EmployeeListings from "../components/EmployeeListings";
import SalaryListings from "../components/SalaryListings";

export default function MainPage() {
    return (
        <>
            <EmployeeListings isHome={true} />
            <SalaryListings isHome={true} />
        </>
    );
}