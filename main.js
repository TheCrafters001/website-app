// Import Constants
const { app, BrowserWindow } = require('electron')
const path = require('path')

// Create the window
function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "assets/js/preload.js")
      }
    })
  
    win.loadFile('index.html')
}

// Display the Window (Also handels code for MacOS X)
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

// Close all if on MacOS.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})