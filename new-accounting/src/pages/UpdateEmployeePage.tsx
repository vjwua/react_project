import { useState } from "react";
import { useLoaderData, useNavigate, useParams, LoaderFunction } from "react-router-dom";
import { Employee } from "../components/EmployeeListings";

const UpdateEmployeePage = (
  { updateEmployeeSubmit }: 
  { updateEmployeeSubmit: (updatedEmployee: Employee) => Promise<void> }
) => {
  const employee = useLoaderData();
  console.log(employee);
  
  const navigate = useNavigate();
  const { id } = useParams();

  const [fullname, setFullname] = useState(employee.fullname);
  const [occupation, setOccupation] = useState(employee.occupation);
  const [salary, setSalary] = useState(employee.salary);
  
  const submitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedEmployee = {
      id: Number(id),
      fullname,
      occupation,
      salary: Number(salary),
    }

    updateEmployeeSubmit(updatedEmployee)

    return navigate('/employees')
  };

    return (
        <section className="bg-amber-400 h-screen">
          <div className='container m-auto max-w-2xl py-6'>
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
              <form onSubmit={submitForm} className="max-w-sm mx-auto">
                <div className="mb-4">
                  <label className="block text-gray-500 font-bold mb-3 text-center">
                    ПІБ
                  </label>
                  <input 
                    type="text"
                    id="fullname"
                    name="fullname" 
                    className="bg-gray-50 border rounded border-gray-300 w-full py-2 px-3 mb-2"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />      
                </div>
                <div className="mb-4">
                  <label className="block text-gray-500 font-bold mb-3 text-center">
                    Посада
                  </label>
                  <input 
                    type="text"
                    id="occupation"
                    name="occupation" 
                    className="bg-gray-50 border rounded border-gray-300 w-full py-2 px-3 mb-2"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />      
                </div>
                <div className="mb-4">
                  <label className="block text-gray-500 font-bold mb-3 text-center">
                    Місячна зарплата (в грн)
                  </label>
                  <input 
                    type="text" 
                    id="occuption"
                    name="salary" 
                    className="bg-gray-50 border rounded border-gray-300 w-full py-2 px-3 mb-2"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />      
                </div>
                <div className="flex items-center">
                  <input type="submit" value="Submit" className="text-white bg-amber-800 px-5 py-2.5 rounded w-60 m-auto" />
                </div>
              </form>
            </div>
          </div>
        </section>
    );
};

const employeeLoader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`/api/db.php?endpoint=employees&id=${params.id}`);
  const data = await res.json();
  return data;
};

export { UpdateEmployeePage as default, employeeLoader };