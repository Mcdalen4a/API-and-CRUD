
const resultDiv = document.getElementById('result');
const searchInput = document.getElementById('searchInput');
const detailsDiv = document.getElementById('characterDetails');

let allCharacters = [];


async function fetchCharacters() {

    const response = await fetch('simspons.json');
    allCharacters = await response.json(); 
    displayData(allCharacters); 
}


function displayData(characters) {
  
    resultDiv.innerHTML = '';

    characters.forEach(character => {
      
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h4>${character.name}</h4>
        `;
        
     
        card.addEventListener('click', () => {
            showCharacterDetails(character);
        });

    
        resultDiv.appendChild(card);
    });
}

function showCharacterDetails(character) {

    detailsDiv.innerHTML = '';

 
    detailsDiv.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p><strong>Ocupación:</strong> ${character.occupation || 'No disponible'}</p>
        <p><strong>Edad:</strong> ${character.age || 'No disponible'}</p>
    `;
 
    detailsDiv.style.display = 'block';
}


searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    const filteredCharacters = allCharacters.filter(character => {
        return character.name.toLowerCase().includes(query);
    });
    displayData(filteredCharacters); 
});

fetchCharacters();
