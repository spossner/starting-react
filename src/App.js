import { useEffect, useMemo, useState } from "react";
import PokemonRow from "./components/pokemon-row";
import PokemonInfo from "./components/pokemon-info";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState();

  const filteredPokemon = useMemo(
    () =>
      pokemon
        .filter((p) =>
          p.name.english.toLowerCase().includes(filter.toLowerCase())
        )
        .slice(0, 20),
    [filter, pokemon]
  );

  useEffect(() => {
    fetch("/starting-react/pokemon.json")
      .then((res) => res.json())
      .then(setPokemon);
  }, []);

  useEffect(() => {
    if (selected && !filteredPokemon.some((p) => p.id === selected.id)) {
      setSelected(undefined);
    }
  }, [filteredPokemon, selected]);

  return (
    <div className="container mx-auto max-w-lg">
      <h1 className="text-xl font-semibold text-center">Pokemon search</h1>
      <input
        value={filter}
        placeholder="Search pokemon"
        onChange={(e) => setFilter(e.target.value)}
        className="mt-3 mb-1 w-full p-1 rounded border border-gray-300"
      />
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredPokemon.map((p) => (
                <PokemonRow
                  pokemon={p}
                  key={p.id}
                  onClick={() => setSelected(p)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div>{selected && <PokemonInfo pokemon={selected} />}</div>
      </div>
    </div>
  );
}

export default App;
