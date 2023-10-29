import { useState, useEffect } from "react";
import { Table, SearchInput } from "./components";
import { BsSearch, BsHeart } from "react-icons/bs";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [searchResult, setSearchResult] = useState(pokemon);
  const [pageData, setPageData] = useState(pokemon);
  const [maxPower, setMaxPower] = useState(0);
  const [minPower, setMinPower] = useState(0);
  async function getPokemon() {
    const res = await fetch("/pokemon.json");
    const data = await res.json();
    const populatedData = data.map((el) => {
      const power =
        el.hp +
        el.attack +
        el.defense +
        el.special_attack +
        el.special_defense +
        el.speed;
      return { ...el, power };
    });
    setPokemon(populatedData);
  }
  useEffect(() => {
    getPokemon();
  }, []);
  useEffect(() => {
    if (pageData.length !== 0) {
      const powerArray = pageData
        .map((el) => el["power"])
        .filter((value) => value !== undefined);
      setMinPower(Math.min(...powerArray));
      setMaxPower(Math.max(...powerArray));
    } else {
      setMinPower(0);
      setMaxPower(0);
    }
  }, [pageData]);
  return (
    <div className="container my-12">
      <div className="shadow-lg rounded-2xl overflow-hidden p-6 mb-12">
        <div className="flex items-center justify-between gap-8 mb-6">
          <SearchInput
            type="text"
            data={pokemon}
            field="name"
            searchAlgo="isStringFound"
            handleSearchData={(res) => setSearchResult(res)}
            placeholder="Search"
            icon={<BsSearch className="w-full h-full"/>}
          />
          <SearchInput
            type="number"
            data={pokemon}
            field="power"
            searchAlgo="isNumberGTE"
            handleSearchData={(res) => setSearchResult(res)}
            placeholder="Power threshold"
            icon={<BsHeart className="w-full h-full"/>}
          />
        </div>
        <p className="mb-2">Min power: {minPower}</p>
        <p>Max power: {maxPower}</p>
      </div>
      <Table
        data={searchResult}
        hidedProperty={["power"]}
        pagination={true}
        paginationOptions={{ rowsPerPage: [5, 10, 20] }}
        handlePageData={(res) => setPageData(res)}
      />
    </div>
  );
}

export default App;
