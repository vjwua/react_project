export default function EmployeeForm() {
  return (
    <div className="flex justify-center m-4">
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label>Name:</label>
          <input type="text" className="m-2 bg-gray-50 border border-gray-300" name="name" />      
        </div>
        <div className="mb-5">
          <label>Occupation:</label>
          <input type="text" className="m-2 bg-gray-50 border border-gray-300" name="occupation" />      
        </div>
        <div className="mb-5">
          <label>Salary:</label>
          <input type="text" className="m-2 bg-gray-50 border border-gray-300" name="salary" />      
        </div>
        <input type="submit" value="Submit" className="text-white bg-blue-700 px-5 py-2.5" />
      </form>
    </div>
  );
}