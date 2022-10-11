import pokemon from "./pokemon.json";
import PropTypes from "prop-types";
import { shape } from "prop-types";
import { useEffect, useMemo, useState } from "react";
function PokemonRow({ pokemon, onClick }) {
  return (
    <tr onClick={onClick}>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
    </tr>
  );
}
PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    type: PropTypes.arrayOf(PropTypes.string),
    name: shape({
      english: PropTypes.string,
    }),
  }),
};

function App() {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState();

  const filteredPokemon = useMemo(
    () =>
      pokemon
        .filter((p) =>
          p.name.english.toLowerCase().includes(filter.toLowerCase())
        )
        .slice(0, 20),
    [filter]
  );

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
        <div>
          {selected && (
            <div className="border p-2 rounded-lg border-gray-300">
              <h1 className="text-xl font-semibold">{selected.name.english}</h1>
              <ul>
                {Object.keys(selected.base).map((k) => (
                  <li key={k}>
                    {k}: {selected.base[k]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
