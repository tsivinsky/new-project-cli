const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow } = electron;

let AppWindow;

// Create app window
app.on("ready", function() {
  AppWindow = new BrowserWindow({});

  // Load html file
  AppWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
});
