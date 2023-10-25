import { useState, useEffect } from "react";
import { Table } from "./components";
function App() {
  const [pokemon, setPokemon] = useState([])
  async function getPokemon() {
    const res = await fetch("/pokemon.json");
    const data = await res.json();
    setPokemon(data);
  }
  useEffect(() => {
    getPokemon()
  }, [])
  return (
    <div className="container my-12">
      <div className="w-full h-12"> </div>
      <Table data={pokemon}/>
    </div>
  );
}

export default App;
