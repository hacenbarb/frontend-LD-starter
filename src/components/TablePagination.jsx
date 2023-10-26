import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function TablePagination({ data, paginationOptions, handlePageData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(
    paginationOptions.rowsPerPage[0]
  );
  const [paginationToggler, setPaginationToggler] = useState(false);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  function paginate(currentPage, rowsPerPage) {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    handlePageData(paginatedData);
  }
  function nextPage() {
    if (currentPage < totalPages) {
      paginate(currentPage + 1, rowsPerPage);
      setCurrentPage((prev) => prev + 1);
    }
  }
  function prevPage() {
    if (currentPage > 1) {
      paginate(currentPage - 1, rowsPerPage);
      setCurrentPage((prev) => prev - 1);
    }
  }
  function handleRowsPerPage(rowsPerPage) {
    setRowsPerPage(rowsPerPage);
    paginate(currentPage, rowsPerPage);
    setPaginationToggler(false);
  }
  useEffect(() => {
    paginate(currentPage, rowsPerPage);
  }, []);

  return (
    <div className="flex items-center justify-end gap-4 mt-4 ">
      <div className="relative">
        <span className="flex items-center">
          Rows per page : {rowsPerPage}
          <button
            onClick={() => setPaginationToggler((prev) => !prev)}
            className="text-gray-500 hover:text-black transition-colors p-1"
          >
            <AiOutlineDown className="w-full h-full" />
          </button>
        </span>
        {paginationToggler && (
          <div className="absolute top-6 right-0 w-fit h-fit flex flex-col rounded-lg shadow-md overflow-hidden">
            {paginationOptions.rowsPerPage
              .filter((el) => el !== rowsPerPage)
              .map((el) => (
                <button
                  className="w-full text-center text-black hover:bg-gray-300 transition-colors px-6 py-2"
                  onClick={() => {
                    handleRowsPerPage(el);
                  }}
                >
                  {el}
                </button>
              ))}
          </div>
        )}
      </div>
      <span className="ml-2 text-gray-600">
        {currentPage} of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="text-gray-500 hover:text-black disabled:hover:text-gray-500 disabled:cursor-default transition-colors p-1"
        >
          <AiOutlineLeft className="w-full h-full" />
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="text-gray-500 hover:text-black disabled:hover:text-gray-500 disabled:cursor-default transition-colors p-1"
        >
          <AiOutlineRight className="w-full h-full" />
        </button>
      </div>
    </div>
  );
}

export default TablePagination;
