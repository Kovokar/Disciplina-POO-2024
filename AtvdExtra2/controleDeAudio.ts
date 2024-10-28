// typeScript

class ControleDeAudio {
    volume: number = 5;

    aumentarVolume(): number {
        return this.volume < 10 ? this.volume++ : this.volume
    }
    diminuirVolume(): number {
        return this.volume > 0 ? this.volume-- : this.volume
    }
    lerVolume(): number {
        return this.volume
    }
}


let controle : ControleDeAudio;
controle = new ControleDeAudio();

for (let i=1; i<10; i++){
    controle.diminuirVolume()
}

console.log(controle.lerVolume())