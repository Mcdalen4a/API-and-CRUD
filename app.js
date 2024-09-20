document.getElementById('showDataBtn').addEventListener('click', fetchPokemonData); //Boton para mostrar los datos

let container = document.getElementById('container');

function fetchPokemonData() {
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((res) => res.json())
    .then((data) => {
      console.log('Datos de la API:', data.results);
      let pokemonUrls = data.results.map(pokemon => pokemon.url);
      return Promise.all(pokemonUrls.map(url => fetch(url).then(res => res.json())));
    })
    .then(pokemonDetails => {
      console.log('Detalles de los Pokémon:', pokemonDetails);
      crearCard(pokemonDetails);
    })
    .catch(error => console.error('Error al traer los datos:', error));
}

function crearCard(data) {
  container.innerHTML = ''; 
  for (let i = 0; i < data.length; i++) {
    const pokemon = data[i];
    const cardHTML = `
      <div class="card">
        <p class="nombre">${pokemon.name}</p>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-img">
        <p class="link">${pokemon.url}</p>
      </div>`;
    console.log('Tarjeta HTML:', cardHTML);
    container.innerHTML += cardHTML;
  }
}
