const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    show: false, // Esconde até estar pronta
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true, // Esconde a barra de menu
  });

  mainWindow.maximize(); // Abre maximizada
  mainWindow.loadFile("renderer/index.html");

  mainWindow.once("ready-to-show", () => {
    mainWindow.show(); // Mostra a janela depois de carregada
  });
});
