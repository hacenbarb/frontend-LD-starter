import { useState, useEffect } from "react";
import { Table, SearchInput } from "./components";
function App() {
  const [pokemon, setPokemon] = useState([]);
  const [searchResult, setSearchResult] = useState(pokemon);
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
  return (
    <div className="container my-12">
      <div className="w-full h-12"> </div>
      <div className="flex items-center justify-between gap-8 shadow-lg rounded-2xl overflow-hidden p-6 mb-20">
        <SearchInput
          data={pokemon}
          field="name"
          handleSearchData={(res) => setSearchResult(res)}
        />
        <div className="flex-1 flex items-center gap-4 border rounded-md px-4 py-2">
          test
        </div>
      </div>
      <Table
        data={searchResult}
        pagination={true}
        paginationOptions={{ rowsPerPage: [5, 10, 20] }}
      />
    </div>
  );
}

export default App;
