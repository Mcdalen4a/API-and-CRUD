// Seleccionar el cuerpo de la tabla donde se pintarán los posts
const postTableBody = document.getElementById('postTableBody');

// Función para obtener los posts de la API
function obtenerPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(posts => pintarPosts(posts)) // Llamar a la función para pintar los posts
        .catch(error => console.error('Error al obtener los posts:', error));
}

// Función para pintar los posts en la tabla utilizando for...of
function pintarPosts(posts) {
    for (const post of posts) {
        // Crear una fila para cada post
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
        `;
        // Agregar la fila al cuerpo de la tabla
        postTableBody.appendChild(row);
    }
}

// Llamar a la función para obtener y pintar los posts
obtenerPosts();
