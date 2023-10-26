import { useState, useEffect } from "react";
import { Table } from "./components";
function App() {
  const [pokemon, setPokemon] = useState([]);
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
      <Table
        data={pokemon}
        pagination={true}
        paginationOptions={{ rowsPerPage: [5, 10, 20] }}
      />
    </div>
  );
}

export default App;
