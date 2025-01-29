const { app, BrowserWindow, Menu, ipcMain } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1024, 
    height: 768, 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, 
    },
    frame: true, // Barra de título habilitada
    resizable: true, // Permitimos redimensionar la ventana
  });

  win.loadFile('index.html');  // Cargar la interfaz

  const menuTemplate = [
    {
      label: 'Archivo',
      submenu: [
        { label: 'Salir', role: 'quit' }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        { label: 'Recargar', role: 'reload' },
        { label: 'Pantalla Completa', role: 'togglefullscreen' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Recepción de los eventos desde el frontend
  ipcMain.on('minimize-window', () => {
    win.minimize(); // Minimizar ventana
  });

  ipcMain.on('maximize-window', () => {
    if (win.isMaximized()) {
      win.restore(); // Restaurar ventana
    } else {
      win.maximize(); // Maximizar ventana
    }
  });

  ipcMain.on('close-window', () => {
    win.close(); // Cerrar la ventana
  });
}

// Crear la ventana cuando la app esté lista
app.whenReady().then(createWindow);

// Cerrar la app cuando se cierre la ventana (excepto en macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
