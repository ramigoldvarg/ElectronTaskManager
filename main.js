const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({'menu': false, height: 600, width: 400});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', ()=> app.quit());
})