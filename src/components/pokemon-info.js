import PropTypes from "prop-types";

function PokemonInfo({ pokemon }) {
    return (
      <div className="border p-2 rounded-lg border-gray-300">
        <h1 className="text-xl font-semibold">{pokemon.name.english}</h1>
        <table>
          <tbody>
            {Object.keys(pokemon.base).map((k) => (
              <tr key={k}>
                <td className="px-2">{k}</td>
                <td className="px-2">{pokemon.base[k]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  PokemonInfo.propTypes = {
    pokemon: PropTypes.shape({
      name: PropTypes.shape({
        english: PropTypes.string.isRequired,
      }),
      base: PropTypes.shape({
        HP: PropTypes.number.isRequired,
        Attack: PropTypes.number.isRequired,
        Defense: PropTypes.number.isRequired,
        "Sp. Attack": PropTypes.number.isRequired,
        "Sp. Defense": PropTypes.number.isRequired,
        Speed: PropTypes.number.isRequired,
      }),
    }),
  };
  
  export default PokemonInfo;