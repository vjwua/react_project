import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, type MetaArgs } from "react-router";

import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";

export function meta({}: MetaArgs) {
  return [
	{ title: "Employee Accounting" },
	{ name: "description", content: "Project for the Industrial Practice, done by Vasyl Ivasiuk" },
  ];
}

const isBrowser = typeof window !== "undefined";

const router = isBrowser ? createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<MainLayout />}>f
			<Route index element={<MainPage />} />
			{/* <Route path='/employee' element={<EmployeePage />} />
			<Route path='/salary' element={<SalaryPage />} />
			<Route path='*' element={<NonExistingPage />} /> */}
		</Route>
	)
) : null;

export default function Home() {	
	return router ? <RouterProvider router={router} /> : <div>Loading...</div>;
}
