import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

function SearchInput({
  data,
  field,
  handleSearchData,
  searchAlgo,
  icon,
  ...otherProps
}) {
  const [search, setSearch] = useState("");
  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
    switch (searchAlgo) {
      case "isStringFound": {
        if (value.length > 2) {
          const searchResult = searchByField(data, field, value);
          handleSearchData(searchResult);
        } else {
          handleSearchData(data);
        }
        break;
      }
      case "isNumberGTE": {
        const searchResult = searchByNumber(data, field, value, "GTE");
        handleSearchData(searchResult);
        break;
      }
    }
  }
  function searchByField(data, field, input) {
    const searchValue = input.trim().toLowerCase();
    return data.filter((el) => el[field].toLowerCase().includes(searchValue));
  }
  function searchByNumber(data, field, input, method) {
    // methods GTE, LSE, GT, LT
    switch (method) {
      case "GTE": {
        return data.filter((el) => el[field] >= input);
      }
    }
  }
  useEffect(() => {
    handleSearchData(data);
  }, [data]);
  return (
    <div className="flex-1 flex items-center gap-4 border rounded-md px-4 py-2">
      <div className="text-gray-400 w-4 h-4">{icon}</div>
      <input
        className="w-full text-gray-700"
        value={search}
        onChange={handleSearch}
        {...otherProps}
      />
    </div>
  );
}

export default SearchInput;
