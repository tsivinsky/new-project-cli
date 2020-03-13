// Require dependencies
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

// Global variables
let win;
let menu;

// Menu template
const menuTemplate = [
  {
    label: "App",
    submenu: [
      {
        label: "Minimize",
        accelerator: process.platform === "darwin" ? "Command+M" : "Ctrl+M",
        click(item, focusedWindow) {
          focusedWindow.minimize();
        }
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

// Add developer tools in development mode
if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Toggle Dev Tools",
        accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}

// Add empty object into menu template on Mac OS
if (process.platform === "darwin") {
  menuTemplate.unshift({});
}

// Create app window
app.on("ready", function() {
  win = new BrowserWindow({});

  // Load html file
  win.loadFile(path.join(__dirname, "index.html"));

  // Append menu to application
  menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
