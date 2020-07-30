const { app, BrowserWindow } = require('electron')
const config = require('./config')

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(config.url)
}

function toggleDevTools() {
  win.webContents.toggleDevTools();
}

function createShortCuts() {
  globalShortcut.register('Ctrl+J', toggleDevTools)
}

app.whenReady()
  .then(createWindow)
  .then(createShortCuts)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
