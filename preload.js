const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const dataPath = path.join(app.getPath('userData'), 'peos-data.json');

contextBridge.exposeInMainWorld('peosAPI', {
  get: (key) => { 
    if(!fs.existsSync(dataPath)) return []; 
    const data = JSON.parse(fs.readFileSync(dataPath)); 
    return data[key] || []; 
  },
  set: (key, value) => { 
    let data = {}; 
    if(fs.existsSync(dataPath)) data = JSON.parse(fs.readFileSync(dataPath)); 
    data[key] = value; 
    fs.writeFileSync(dataPath, JSON.stringify(data)); 
  }
});