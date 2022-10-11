import PropTypes from 'prop-types';

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
      type: PropTypes.arrayOf(PropTypes.string.isRequired),
      name: PropTypes.shape({
        english: PropTypes.string.isRequired,
      }),
    }),
    onClick: PropTypes.func.isRequired,
  };

  export default PokemonRow;