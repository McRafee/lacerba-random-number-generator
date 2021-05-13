function RNG(min: number, max: number){
    const rng = Math.random();
    return Math.trunc(rng * (max - min) + min);
} 

function RNGdec(min: number, max: number, precision: number){
    if (precision < 0) {
        throw new Error(`precision must be a positive number`);
    }
    if (!Number.isInteger(precision)) {
        throw new Error(`precision must be an integer number`);
    }
    const multFactor = Math.pow(10, precision);
    return RNG(min * multFactor, max * multFactor) / multFactor;
} 

//console.log(RNGdec(5,10,2))

function RNGSequence(len: number, min: number, max: number){
    if (len > max - min) {
        throw new Error(`cannot find ${len} numbers between ${min} and ${max}`);
    }
    const res:number[] = [];
    while (res.length < len) {
        const rn = RNG(min,max);
        if (res.includes(rn)) {
            continue;
        }
        res.push(rn);
    }
    return res;
}

const ruote = ['Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia','Nazionale'];

const estrazioni : {[ruota : string]: number[] } = {};

for (const ruota of ruote) {
    const estrazione = RNGSequence(5,1,90);
    
    estrazioni[ruota] = estrazione;
}
console.log(JSON.stringify(estrazioni, null, 2));

function createRuotaBox(ruotaName: string, estrazioni: number[]) {
    const ruotaDiv = document.createElement('div');
    ruotaDiv.className = `ruota ${ruotaName.toLowerCase()}`;
    const nameH2 = document.createElement('h2');
    nameH2.innerText = ruotaName;
    nameH2.className = 'ruota-title';
    ruotaDiv.appendChild(nameH2);

    for(const num of estrazioni){
        const numP = document.createElement('p');
        numP.innerText = '' + num;
        const numDiv = document.createElement('div');
        numDiv.className = 'ruota-estrazione';
        numDiv.appendChild(numP);
        ruotaDiv.appendChild(numDiv);
    }

    return ruotaDiv
}

const container = document.getElementById('box');
if (container) {
    const pre = document.createElement('pre');

    for(const ruota of ruote){
        const ruotaEstrazioni = estrazioni[ruota]
        const ruotaDiv = createRuotaBox(ruota, ruotaEstrazioni);
        container?.appendChild(ruotaDiv);
    }

}

