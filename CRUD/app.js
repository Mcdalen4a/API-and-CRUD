document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.querySelector('#userTable tbody');
    const showDataButton = document.getElementById('showData');
    const addDataButton = document.getElementById('addData');
    const formContainer = document.getElementById('formContainer');
    const saveUserButton = document.getElementById('saveUser');
    const cancelButton = document.getElementById('cancel');
  
    let users = [];
    let editingUserId = null;
  
    // Función para crear una fila de usuario en la tabla
    function createRow(user) {
      return `
        <tr>
          <td>${user.name}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.address.street}, ${user.address.city}</td>
          <td>${user.phone}</td>
          <td><a href="${user.website}" target="_blank">${user.website}</a></td>
          <td>${user.company.name}</td>
         
        </tr>
      `;
    }
  

    function showData() {
      userTableBody.innerHTML = users.map(user => createRow(user)).join('');
    }
  


  

  

    function saveUser() {
      const name = document.getElementById('name').value;
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
  
      if (editingUserId !== null) {
        const userIndex = users.findIndex(user => user.id === editingUserId);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], name, username, email };
          showData();
          formContainer.style.display = 'none';
          editingUserId = null;
        }
      } else {
        const newUser = {
          id: users.length + 1,
          name,
          username,
          email,
          address: { street: '', city: '' },
          phone: '',
          website: '',
          company: { name: '' }
        };
        addUser(newUser);
        formContainer.style.display = 'none';
      }
    }

    cancelButton.onclick = () => {
      formContainer.style.display = 'none';
      editingUserId = null;
    };

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
        users = data;
        showData();
      });
  

    showDataButton.onclick = showData;
    addDataButton.onclick = () => {
      formContainer.style.display = 'block';
      saveUserButton.onclick = saveUser;
    };
  });
  