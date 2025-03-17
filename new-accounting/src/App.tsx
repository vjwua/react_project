import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, type MetaArgs } from "react-router";

import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";
import NonExistingPage from "./pages/NonExistingPage";

import EmployeePage from "./pages/EmployeePage";
import AddEmployeePage from "./pages/AddEmployeePage";
import UpdateEmployeePage, { employeeLoader } from "./pages/UpdateEmployeePage";

import SalaryPage from "./pages/SalaryPage";
import AddSalaryPage from "./pages/AddSalaryPage";

import { EmployeeWithoutID } from "./pages/AddEmployeePage";
import { SalaryWithoutID } from "./pages/AddSalaryPage";
import { Employee } from "./components/EmployeeListings";
import { Salary } from "./components/SalaryListings";
import DeleteEmployeePage from "./pages/DeleteEmployeePage";
import UpdateSalaryPage, { salaryLoader } from "./pages/UpdateSalaryPage";
import DeleteSalaryPage from "./pages/DeleteSalaryPage";

export default function Home() {	
	function meta({}: MetaArgs) {
	  return [
		{ title: "Employee Accounting" },
		{ name: "description", content: "Project for the Industrial Practice, done by Vasyl Ivasiuk" },
	  ];
	}

	//Employees CRUD
	const addEmployee = async(newEmployee: EmployeeWithoutID) => {
		await fetch("/api/db.php?endpoint=employees", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newEmployee),
		});
	}
	const updateEmployee = async (updatedEmployee: Employee) => {
		await fetch(`/api/db.php?endpoint=employees&id=${updatedEmployee.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedEmployee),
		});
	}
	const deleteEmployee = async (employeeId: number) => {
		await fetch(`/api/db.php?endpoint=employees&id=${employeeId}`, {
		  method: "DELETE",
		  headers: { "Content-Type": "application/json" },
		  body: `id=${employeeId}`,
		});
	};

	//Salaries CRUD
	const addSalary = async(newSalary: SalaryWithoutID) => {
		await fetch("/api/db.php?endpoint=salaries", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newSalary),
		});
	}
	const updateSalary = async(updatedSalary: Salary) => {
		await fetch(`/api/db.php?endpoint=salaries&id=${updatedSalary.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedSalary),
		});
	}
	const deleteSalary = async(salaryId: number) => {
		await fetch(`/api/db.php?endpoint=salaries&id=${salaryId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: `id=${salaryId}`,
		});
	}
	
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index element={<MainPage />} />
				<Route path='/employees' element={<EmployeePage />} />
				<Route 
					path='/add-employee' 
					element={<AddEmployeePage addEmployeeSubmit={addEmployee} />}
				/>
				<Route 
					path='/edit-employee/:id' 
					element={<UpdateEmployeePage updateEmployeeSubmit={updateEmployee} />}
					loader={employeeLoader}
				/>
				<Route 
					path='/delete-employee/:id' 
					element={<DeleteEmployeePage deleteEmployeeSubmit={deleteEmployee} />}
				/>
				<Route path='/salaries' element={<SalaryPage />} />
				<Route 
					path='/add-salary' 
					element={<AddSalaryPage addSalarySubmit={addSalary} />} 
				/>
				<Route 
					path='/edit-salary/:id' 
					element={<UpdateSalaryPage updateSalarySubmit={updateSalary} />}
					loader={salaryLoader}
				/>
				<Route 
					path='/delete-salary/:id' 
					element={<DeleteSalaryPage deleteSalarySubmit={deleteSalary} />}
				/>
				<Route path='*' element={<NonExistingPage />} />
			</Route>
		)
	)
	
	return ( <RouterProvider router={router} /> );
}
