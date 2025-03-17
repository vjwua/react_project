import { useNavigate, useParams } from "react-router-dom";

const DeleteEmployeePage = ({
  deleteEmployeeSubmit,
}: {
  deleteEmployeeSubmit: (employeeId: number) => Promise<void>;
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onDeleteClick = async () => {
    if (id) {
      await deleteEmployeeSubmit(Number(id));
      navigate("/employees");
    } else {
      alert("Invalid employee ID.");
    }
  };

  return (
    <section className="bg-amber-400 h-screen">
      <div className="container m-auto max-w-2xl py-6">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 text-center">
          <h1 className="text-lg font-semibold mb-4">Delete Employee</h1>
          <p className="mb-6">Are you sure you want to delete this employee?</p>
          <button
            onClick={onDeleteClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteEmployeePage;
