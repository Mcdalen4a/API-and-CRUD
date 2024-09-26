document.getElementById('loadCharacters').addEventListener('click', fetchCharacters);

async function fetchCharacters() {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const characters = await response.json();

        displayCharacters(characters);
    } catch (error) {
        console.error('Error al obtener los personajes:', error);
    }
}

function displayCharacters(characters) {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = ''; // Limpiar la lista antes de mostrar nuevos personajes

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');

        // Verificar si hay imagen, si no, usar la imagen de la carpeta 'img'
        const imageUrl = character.image ? character.image : 'img/imagen.png';

        characterDiv.innerHTML = `
            <img src="${imageUrl}" alt="${character.name}" class="character-image">
            <h2>${character.name}</h2>
            <p><strong>Especie:</strong> ${character.species}</p>
            <p><strong>Casa:</strong> ${character.house || 'No asignada'}</p>
            <p><strong>Género:</strong> ${character.gender}</p>
            <p><strong>Patronus:</strong> ${character.patronus || 'No tiene'}</p>
        `;

        characterList.appendChild(characterDiv);
    });
}
