"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var Chart = require('cli-chart');
var chart = new Chart({
    // xlabel: 'snausages/hr','
    xlabel: 'Argentina',
    ylabel: 'covid-19',
    direction: 'y',
    width: 20,
    height: 25,
    lmargin: 10,
    step: 4
});
var Chart2 = require('cli-chart');
var chart2 = new Chart({
    xlabel: 'brasil',
    ylabel: 'covid-19',
    direction: 'y',
    width: 20,
    height: 25,
    lmargin: 10,
    step: 4
});
var Chart3 = require('cli-chart');
var chart3 = new Chart({
    xlabel: 'Chilel',
    ylabel: 'covid-19',
    direction: 'y',
    width: 20,
    height: 25,
    lmargin: 10,
    step: 4
});
var Pandemia = /** @class */ (function () {
    function Pandemia(pais, habitantes, cantInfectados, cantFallecidos) {
        this.pais = pais;
        this.habitantes = habitantes;
        this.cantInfectados = cantInfectados;
        this.cantFallecidos = cantFallecidos;
    }
    Pandemia.prototype.getPais = function () {
        return this.pais;
    };
    Pandemia.prototype.getCantFallecidos = function () {
        return this.cantFallecidos;
    };
    Pandemia.prototype.getInfectados = function () {
        return this.cantInfectados;
    };
    return Pandemia;
}());
var Controlpandemia = /** @class */ (function () {
    function Controlpandemia(pandemia) {
        this.pandemia = pandemia;
    }
    Controlpandemia.prototype.buscarFalllecidos = function (pais) {
        var cantidadFallecidos = 0;
        for (var i = 0; i < this.pandemia.length; i++) {
            if (this.pandemia[i].getPais() == pais) {
                cantidadFallecidos = this.pandemia[i].getCantFallecidos();
            }
        }
        return cantidadFallecidos;
    };
    Controlpandemia.prototype.buscarInfectados = function (pais) {
        var cantidadInfectados = 0;
        for (var i = 0; i < this.pandemia.length; i++) {
            if (this.pandemia[i].getPais() == pais) {
                cantidadInfectados = this.pandemia[i].getInfectados();
            }
        }
        return cantidadInfectados;
    };
    return Controlpandemia;
}());
var pandemia = fs.readFileSync('pandemia.txt', 'utf-8');
var arraypandemia = pandemia.split("\r\n");
console.log(arraypandemia);
function cargarPandemia(array) {
    var arregloPandemia = [];
    for (var i = 0; i < array.length; i++) {
        var texto = array[i].split(",");
        var pais = texto[0];
        var habitantes = parseInt(texto[1]);
        var cantInfectados = parseInt(texto[2]);
        var cantFallecidos = parseInt(texto[3]);
        arregloPandemia.push(new Pandemia(pais, habitantes, cantInfectados, cantFallecidos));
    }
    return arregloPandemia;
}
var control = new Controlpandemia(cargarPandemia(arraypandemia));
console.log(control);
chart.addBar(control.buscarFalllecidos("Argentina"), 'red').addBar(control.buscarInfectados("Argentina"));
chart2.addBar(control.buscarFalllecidos("Brasil"), 'red').addBar(control.buscarInfectados("Brasil"));
chart3.addBar(control.buscarFalllecidos("Chile"), 'red').addBar(control.buscarInfectados("Chile"));
chart.draw();
chart2.draw();
chart3.draw();
