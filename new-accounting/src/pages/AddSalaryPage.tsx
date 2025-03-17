import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface SalaryWithoutID {
  employee_id: string;
  month_year: string;
  time_off: string;
  sick_leave: string;
}

export default function AddSalaryPage(
  {addSalarySubmit}: 
  {addSalarySubmit: (newEmployee: SalaryWithoutID) => Promise<void> }
) 
  {
  const [employee, setEmployee] = useState('');
  const [month, setMonth] = useState('');
  const [timeOffs, setTimeOffs] = useState('');
  const [sickLeaves, setSickLeaves] = useState('');

  const navigate = useNavigate();

  const submitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSalary = {
      employee_id: employee,
      month_year: month,
      time_off: timeOffs,
      sick_leave: sickLeaves
    }

    addSalarySubmit(newSalary)

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