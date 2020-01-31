const electron = require('electron');
const fs = require('fs');
const ini = require('ini');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1200, height: 680 });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
  try {
    console.log(__dirname+'\\eva.ini')
    const config = ini.parse(fs.readFileSync(__dirname+'//eva.ini', 'utf-8'));
    const degreeType = config.degreeType;
    console.log(degreeType);


  } catch (error) {
    console.log(error);
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});