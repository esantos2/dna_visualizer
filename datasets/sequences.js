import * as Citations from './citations';
import {cannabisSeq} from './cannabis';
import {covidSeq} from './covid';
import {drosophilaSeq} from './drosophila';
import {sacchSeq} from './saccharomyces';
import {salmonellaSeq} from './salmonella';
import {zikaSeq} from './zika';

export const cannabis = {
    name: "Cannabis sativa (hemp)",
    cite: Citations.cannabisCite,
    seq: cannabisSeq,
    baseTotals: {
        "A": 536890,
        "T": 544044,
        "C": 284002,
        "G": 285858
    }
}

export const covid = {
    name: "Coronavirus (COVID-19 / SARS-CoV-2)",
    cite: Citations.covidCite,
    seq: covidSeq,
    baseTotals: {
        "A": 8887,
        "T": 9565,
        "C": 5469,
        "G": 5838
    }
}

export const drosophila = {
    name: "Drosophila melanogaster (fruit fly)",
    cite: Citations.drosophilaCite,
    seq: drosophilaSeq,
    baseTotals: {
        "A": 444502,
        "T": 433880,
        "C": 230489,
        "G": 227047
    }
}

export const saccharomyces = {
    name: "Saccharomyces cerevisiae (baker's yeast)",
    cite: Citations.saccharomycesCite,
    seq: sacchSeq,
    baseTotals: {
        "A": 3766349,
        "T": 3753080,
        "C": 2320576,
        "G": 2317100
    }
}

export const salmonella = {
    name: "Salmonella",
    cite: Citations.salmonellaCite,
    seq: salmonellaSeq,
    baseTotals: {
        "A": 1146820,
        "T": 1150839,
        "C": 1243619,
        "G": 1250672
    }
}

export const zika = {
    name: "Zika virus",
    cite: Citations.zikaCite,
    seq: zikaSeq,
    baseTotals: {
        "A": 2958,
        "T": 2313,
        "C": 2383,
        "G": 3152
    }
}