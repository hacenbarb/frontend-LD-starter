function table({ data }) {
  if (data.length === 0) {
    return <div className="text-center">No data available.</div>;
  }
  const tableHeaders = Object.keys(data[0]);
  return (
    <table className="w-full text-center text-gray-700 shadow-lg rounded-2xl overflow-hidden">
      <thead>
        <tr className="bg-gray-100">
          {tableHeaders.map((el) => (
            <th key={el} className="py-4 text-gray-500">
              {el}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((el, index) => (
          <tr key={index}>
            {tableHeaders.map((header) => (
              <td key={header} className="py-3 border-b">
                {Array.isArray(el[header]) ? el[header].join(", ") : el[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default table;
