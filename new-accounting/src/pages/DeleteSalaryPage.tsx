import { useNavigate, useParams } from "react-router-dom";

const DeleteSalaryPage = ({
  deleteSalarySubmit: deleteSalarySubmit,
}: {
  deleteSalarySubmit: (salaryId: number) => Promise<void>;
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onDeleteClick = async () => {
    if (id) {
      await deleteSalarySubmit(Number(id));
      navigate("/salaries");
    } else {
      alert("Invalid salary ID.");
    }
  };

  return (
    <section className="bg-amber-400 h-screen">
      <div className="container m-auto max-w-2xl py-6">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 text-center">
          <h1 className="text-lg font-semibold mb-4">Delete Salary</h1>
          <p className="mb-6">Are you sure you want to delete this salary?</p>
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

export default DeleteSalaryPage;
