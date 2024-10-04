//Se obtienen elementos del DOM con el getElementById(). ResultDiv almacenará lo del
//html con el ID result, donde se mostraran los personajes. searchInput almacenará
//el elemento HTML con el ID searchInput, este es el campo de entrada para que
//el usuario pueda buscar personajes.

const resultDiv = document.getElementById('result');
const searchInput = document.getElementById('searchInput');

//La URL de la API con los datos
const apiUrl = 'https://api.sampleapis.com/rickandmorty/characters';

//Se almacenarán los datos de la API
let allCharacters = [];

//Función asincronica para hacer la solicitud de la API. 
async function fetchCharacters() {
    //Se espera una respuesta await y se almacena en response.
    const response = await fetch(apiUrl);
    //La respuesta se convierte a formato JSON con response.json() y se asigna a
    //allcharacters.
    allCharacters = await response.json();
    //displayData se encarga de mostrar los personajes en el DOM, y pasa a argumento
    //el arreglo allCharacters.
    displayData(allCharacters);
}

//Recibe un arreglo de personajes
function displayData(characters) {
    //se vacía resultDiv para evitar que se repitan los personajes al actualizar el HTML
    resultDiv.innerHTML = ''; 
    //S itera sobre cada personaje usando forEach
    characters.forEach(character => {
        //se crea un nuevo div llamado card
        const card = document.createElement('div');
        //se le añade la clase card al div
        card.classList.add('card');
        //se define el contenido HTML con los datos de los personajes
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h4>${character.name}</h4>
        `;
        //se añade la tarjeta card al resultDiv mostrando todo en el html
        resultDiv.appendChild(card);
    });
}

//se le añade un input al searchInput que hará que se active cada vez que se escriba
//algo en el campo de busqueda
searchInput.addEventListener('input', function() {
//se obtiene el valor actual del campo de entrada, lo convierte a minusculas y 
//lo almacena en query
    const query = searchInput.value.toLowerCase();
    //se filtran los personajes de allCharacters usando filter. Se crea filteredCharacters
    // que incluye los personajes de la query
    const filteredCharacters = allCharacters.filter(character => {
        return character.name.toLowerCase().includes(query);
    });
    //se llama displayData para mostrar los personajes diltrados en el DOM
    displayData(filteredCharacters);
});

//inicia la obtención de datos de la API y muestra los personajes en la página
fetchCharacters();
