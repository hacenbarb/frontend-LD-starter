import { useState } from "react";
import { BsSearch } from "react-icons/bs";

function SearchInput({ data, field, handleSearchData }) {
  const [search, setSearch] = useState("");
  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 2) {
      const searchResult = searchByField(data, field, value);
      handleSearchData(searchResult);
    } else {
      handleSearchData(data);
    }
  }
  function searchByField(data, field, input) {
    const searchValue = input.trim().toLowerCase();
    return data.filter((el) => el[field].toLowerCase().includes(searchValue));
  }
  return (
    <div className="flex-1 flex items-center gap-4 border rounded-md px-4 py-2">
      <div className="text-gray-400 w-4 h-4">
        <BsSearch className="w-full h-full" />
      </div>
      <input
        type="text"
        placeholder="Search.."
        className="w-full text-gray-700"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchInput;
