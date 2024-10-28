//IsSquare

class Retangulo {
    l1: number = 0;
    l2: number = 0;

    calcularArea(): number {
        return this.l1 * this.l2;
    }

    calcularPerimetro(): number {
        return (this.l1 * 2) + (this.l2 * 2);
    }

    IsSquare(): boolean {
        return this.l1 === this.l2;
    }
}

console.clear()

let retangulo : Retangulo;
retangulo = new Retangulo();
retangulo.l1 = 30;
retangulo.l2 = 30;
console.log(retangulo.IsSquare());
