const electron = require('electron');
const os = require('os')
const fs = require('fs')

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    require('vue-devtools').install()

    if (!fs.existsSync(`d:/${os.userInfo().username}-taskmanager`)) {
        fs.mkdirSync(`d:/${os.userInfo().username}-taskmanager`)
    }

    mainWindow = new BrowserWindow({'menu': false, height: 600, width: 400});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', ()=> app.quit());
})