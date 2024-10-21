/*
Crie uma classe Circulo que possua um atributo raio. Crie dois métodos que
calculam a área e o perímetro. Instancie um objeto dessa classe, atribua um valor
ao raio e exiba a área e o perímetro chamando os dois métodos definidos.
*/

class Circulo{
    raio: number = 0;
    private pi: number = 3.141592;

    calcularArea(): number {
        return this.pi*(this.raio**2)
    }

    calcularPerimetro(): number {
        return 2*this.pi*this.raio
    }

}
console.clear()

let circulo : Circulo;
circulo = new Circulo();
circulo.raio = 10;
console.log(circulo.calcularArea());
console.log(circulo.calcularPerimetro());




