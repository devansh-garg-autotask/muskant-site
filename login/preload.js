// public/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  downloadSampleExcel: () => ipcRenderer.send('download-sample-excel')
});
