console.log("🔌 preload.js carregado em", __dirname);
const { contextBridge } = require("electron");
const Handlebars = require("handlebars");
const Inputmask = require("inputmask");

// Expondo Handlebars e Inputmask ao contexto do renderer
contextBridge.exposeInMainWorld("Handlebars", Handlebars);
contextBridge.exposeInMainWorld("Inputmask", Inputmask);

console.log("🔌 preload.js carregado em", __dirname);
