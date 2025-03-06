export default function SalaryForm() {
  return (
    // dropdown, list
    <div className="flex justify-center m-4">
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label>Employee:</label>
          <input type="text" className="m-2 bg-gray-50 border border-gray-300" name="employee" />      
        </div>
        <div className="mb-5">
          <label>Month:</label>
          <input type="text" className="m-2 bg-gray-50 border border-gray-300" name="month" />      
        </div>
        <div className="mb-5">
          <label>Time Offs:</label>
          <input type="text" className="m-2 bg-gray-50 border border-gray-300" name="timeoff" />      
        </div>
        <div className="mb-5">
          <label>Sick Leave:</label>
          <input type="text" className="m-2 bg-gray-50 border border-gray-300" name="sickleave" />      
        </div>
        <input type="submit" value="Submit" className="text-white bg-blue-700 px-5 py-2.5" />
      </form>
    </div>
  );
}