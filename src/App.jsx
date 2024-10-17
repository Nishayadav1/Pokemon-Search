import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(response => {
        const fetchDetails = response.data.results.map(async (pokemon) => {
          const pokemonDetail = await axios.get(pokemon.url);
          return pokemonDetail.data;
        });
        Promise.all(fetchDetails).then(data => setPokemons(data));
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPokemons = pokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="app">
      <h1>Pokemon Search</h1>
      <input 
        type="text"
        placeholder="Search Pokémon"
        onChange={handleSearch}
        value={searchTerm}
      />
      <div className="card-container">
        {filteredPokemons.slice(0, 9).map(pokemon => (
          <div key={pokemon.id} className="card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <p>ID: {pokemon.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
