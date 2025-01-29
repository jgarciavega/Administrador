// Función de login
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === '1234') {
    // Si las credenciales son correctas, ocultamos el login y mostramos la interfaz
    document.getElementById('login-container').style.display = 'none';  // Ocultar login
    document.getElementById('header').style.display = 'block';  // Mostrar cabecera
    document.getElementById('app-container').style.display = 'block';  // Mostrar contenido principal
  } else {
    alert('Credenciales incorrectas');  // Mostrar mensaje de error
  }
}

// Función para la recuperación de contraseña
function forgotPassword() {
  alert('Te enviaremos un correo para recuperar tu contraseña.');
}

// Función para minimizar la ventana (IPC)
function minimizeWindow() {
  const { ipcRenderer } = require('electron');
  ipcRenderer.send('minimize-window');  // Enviamos la solicitud de minimizar la ventana
}

// Función para maximizar la ventana (IPC)
function maximizeWindow() {
  const { ipcRenderer } = require('electron');
  ipcRenderer.send('maximize-window');  // Enviamos la solicitud de maximizar la ventana
}

// Función para cerrar la ventana (IPC)
function closeWindow() {
  const { ipcRenderer } = require('electron');
  ipcRenderer.send('close-window');  // Enviamos la solicitud de cerrar la ventana
}

// Funcionalidad para abrir y cerrar los submenús
document.querySelectorAll('.menu > li').forEach(item => {
  item.addEventListener('click', function(event) {
    // Solo desplegar submenús si el item tiene un submenú
    if (item.querySelector('.submenu')) {
      event.stopPropagation();  // Evitar que el click se propague hacia el sidebar
      const submenu = item.querySelector('.submenu');
      submenu.classList.toggle('show');  // Alternar la visibilidad del submenú
    }
  });
});

// Función para alternar el sidebar
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('collapsed');  // Alternar entre colapsar y expandir el sidebar

  // Asegurarse de que el texto también se ajuste al colapsar el sidebar
  const menuItems = document.querySelectorAll('.menu > li > a');
  menuItems.forEach(item => {
    if (sidebar.classList.contains('collapsed')) {
      item.style.display = 'none';  // Ocultar texto cuando el sidebar está colapsado
    } else {
      item.style.display = 'block';  // Mostrar texto cuando el sidebar está expandido
    }
  });
}
