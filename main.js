// Modules to control application life and create native browser window
// Start logger first
const log = require('electron-log');
log.info("Log started.")

// isDev
const isDev = require('electron-is-dev');
log.info("isDev Loaded.")
log.info("Dev Mode:", isDev)

// Change Format
log.transports.console.format = '[{h}:{i}:{s}.{ms}] [{level}] {text}';
log.info("Log Formatting Changed");

// Electron
const { app, BrowserWindow } = require('electron');
log.info("Electron Started");

// Path
const path = require('path');
log.info("Path Set");

// Update
require('update-electron-app')({
  repo: 'TheCrafters001/website-app',
  updateInterval: '1 hour',
  logger: require('electron-log')
})
log.info("Auto Update Service Started");

// Require Console
const { Console } = require('console');

// Create the browser window.
function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, "assets/js/preload.js")
      }
    });

    log.info("Window Width:", win.width);
    log.info("Window Height:", win.height);
    log.info("Menubar:", win.autoHideMenuBar);
    log.info("Preload:", path.join(__dirname, "assets/js/preload.js"));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    win.loadFile('index.html');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
    log.info("Window Created");

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
        log.info("Window Created (macOS)")
    });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
    log.info("App Closed");
});