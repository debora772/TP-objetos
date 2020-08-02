import * as fs from 'fs';
import { parse } from 'path';

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
class Pandemia {
    private pais: string;
    private habitantes: number;
    private cantInfectados: number;
    private cantFallecidos: number;

    public constructor(pais: string, habitantes: number, cantInfectados: number, cantFallecidos: number) {
        this.pais = pais;
        this.habitantes = habitantes;
        this.cantInfectados = cantInfectados;
        this.cantFallecidos = cantFallecidos;
    }
    public getPais():string {
        return this.pais;
    }
    public getCantFallecidos():number {
        return this.cantFallecidos;
    }
    public getInfectados(): number{
        return this.cantInfectados;
    }
}
class Controlpandemia {
    private pandemia: Pandemia[];
    public constructor(pandemia: Pandemia[]) {
        this.pandemia = pandemia;
    }
    public buscarFalllecidos(pais: string): number {
        let cantidadFallecidos: number = 0;
        for (let i: number = 0; i < this.pandemia.length; i++) {
            if (this.pandemia[i].getPais() == pais) {
                cantidadFallecidos = this.pandemia[i].getCantFallecidos();
            }
        }
        return cantidadFallecidos;
    }
    public buscarInfectados(pais: string): number {
        let cantidadInfectados: number = 0;
        for (let i: number = 0; i < this.pandemia.length; i++) {
            if (this.pandemia[i].getPais() == pais) {
                cantidadInfectados = this.pandemia[i].getInfectados();
            }
        }
        return cantidadInfectados;
    }
}
let pandemia: string = fs.readFileSync('pandemia.txt', 'utf-8');
let arraypandemia: string[] = pandemia.split("\r\n")
console.log(arraypandemia)

function cargarPandemia(array: string[]): Pandemia[] {
    let arregloPandemia: Pandemia[] = []
    for (let i: number = 0; i < array.length; i++) {
        let texto: string[] = array[i].split(",");
        let pais: string = texto[0];
        let habitantes: number = parseInt(texto[1]);
        let cantInfectados: number = parseInt(texto[2]);
        let cantFallecidos: number = parseInt(texto[3]);
        arregloPandemia.push(new Pandemia(pais, habitantes, cantInfectados, cantFallecidos))
    }
    return arregloPandemia;
}

let control: Controlpandemia = new Controlpandemia(cargarPandemia(arraypandemia))
console.log(control);
chart.addBar(control.buscarFalllecidos("Argentina"),'red').addBar(control.buscarInfectados("Argentina"));

chart2.addBar(control.buscarFalllecidos("Brasil"),'red').addBar(control.buscarInfectados("Brasil"));
chart3.addBar(control.buscarFalllecidos("Chile"),'red').addBar(control.buscarInfectados("Chile"));
chart.draw();
chart2.draw();
chart3.draw();