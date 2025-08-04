
// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const url = require('url');

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       contextIsolation: true,
//     },
//   });

//   // ✅ Load from local React build
//   win.loadURL(
//     url.format({
//       pathname: path.join(__dirname, '../build/index.html'),
//       protocol: 'file:',
//       slashes: true,
//     })
//   );
// }

// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // ✅ This is important
    },
  });

  win.loadURL(
    require('url').format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
}

// ✅ Handle sample download
ipcMain.on('download-sample-excel', async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Save Sample Excel',
    defaultPath: 'sample-pr.xlsx',
    filters: [{ name: 'Excel Files', extensions: ['xlsx'] }]
  });

  if (!canceled && filePath) {
    const sourcePath = path.join(__dirname, 'sample-pr.xlsx'); // In build folder
    fs.copyFile(sourcePath, filePath, (err) => {
      if (err) console.error('Error copying sample Excel:', err);
    });
  }
});

app.whenReady().then(() => {
  createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
