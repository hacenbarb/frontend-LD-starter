import { useState } from "react";
import { TablePagination } from "./";

function table({ data, pagination, paginationOptions }) {
  if (data.length === 0) {
    return <div className="text-center">No data available.</div>;
  }
  const tableHeaders = Object.keys(data[0]);
  const [pageData, setPageData] = useState(data);
  
  return (
    <>
      <table className="w-full text-center text-gray-700 shadow-lg rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            {tableHeaders.map((el) => (
              <th
                key={el}
                className="px-2 py-4 text-gray-500 max-w-[5rem] truncate"
              >
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.map((el, index) => (
            <tr key={index}>
              {tableHeaders.map((header) => (
                <td
                  key={header}
                  className="py-3 border-b max-w-[5rem] truncate"
                >
                  {Array.isArray(el[header])
                    ? el[header].join(", ")
                    : el[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <TablePagination
          data={data}
          paginationOptions={paginationOptions}
          handlePageData={(pageData) => setPageData(pageData)}
        />
      )}
    </>
  );
}
export default table;
