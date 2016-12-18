const {app} = require('electron');
const {BrowserWindow} = require('electron');
var fs = require('fs');  
var path = require('path');  

// Report crashes to our server.
//require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin'){
    app.quit();
  }
});

app.setAppUserModelId('<sulu>');
// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ 
    width: 800, height: 600, title : "sulu",
    icon: __dirname + '/icon.png',
    transparent: false,
    frame: true
  });
  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //  mainWindow.openDevTools({detach : false});

  mainWindow.maximize();

  mainWindow.setMenu(null);  
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});