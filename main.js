const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({'menu': false});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', ()=> app.quit());
})