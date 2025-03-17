import { useState } from "react";
import { useLoaderData, useNavigate, useParams, LoaderFunction } from "react-router-dom";
import { Salary } from "../components/SalaryListings";

const UpdateSalaryPage = (
  { updateSalarySubmit }: 
  { updateSalarySubmit: (updatedSalary: Salary) => Promise<void> }
) => {
  const salary = useLoaderData();
  console.log(salary);

  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(salary.employee_id);
  const [month, setMonth] = useState(salary.month_year);
  const [timeOffs, setTimeOffs] = useState(salary.time_off);
  const [sickLeaves, setSickLeaves] = useState(salary.sick_leave);

  const submitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSalary = {
      id: Number(id),
      employee_id: Number(employee),
      month_year: String(month),
      time_off: Number(timeOffs),
      sick_leave: Number(sickLeaves)
    }

    updateSalarySubmit(newSalary)

    return navigate('/salaries')
  }

    return (
        <section className="bg-cyan-400 h-screen">
        <div className='container m-auto max-w-2xl py-6'>
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm} className="max-w-sm mx-auto">
            <div className="mb-4">
              <label className="block text-gray-500 font-bold mb-3 text-center">
                Працівник
              </label>
              <input 
                  type="text" 
                  id="employee"
                  name="employee" 
                  className="bg-gray-50 border rounded border-gray-300 w-full py-2 px-3 mb-2"
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                />     
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 font-bold mb-3 text-center">
                Місяць
              </label>
              <input 
                  type="text" 
                  id="month"
                  name="month" 
                  className="bg-gray-50 border rounded border-gray-300 w-full py-2 px-3 mb-2"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />       
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 font-bold mb-3 text-center">
                Відгули
              </label>
              <input 
                  type="text" 
                  id="timeoff"
                  name="timeoff" 
                  className="bg-gray-50 border rounded border-gray-300 w-full py-2 px-3 mb-2"
                  value={timeOffs}
                  onChange={(e) => setTimeOffs(e.target.value)}
                />        
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 font-bold mb-3 text-center">
                Лікарняні
              </label>
              <input 
                  type="text" 
                  id="sickleave"
                  name="sickleave" 
                  className="bg-gray-50 border rounded border-gray-300 w-full py-2 px-3 mb-2"
                  value={sickLeaves}
                  onChange={(e) => setSickLeaves(e.target.value)}
                />        
            </div>
            <div className="flex items-center">
                <input type="submit" value="Submit" className="text-white bg-cyan-800 px-5 py-2.5 rounded w-60 m-auto" />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
}

const salaryLoader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`/api/db.php?endpoint=salaries&id=${params.id}`);
  const data = await res.json();
  return data;
};

export { UpdateSalaryPage as default, salaryLoader };