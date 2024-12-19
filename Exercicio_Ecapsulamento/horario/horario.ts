class Hora {
    private hora: number
    private minutos: number
    private segundos: number

    constructor(hora: number, minutos: number, segundos: number) {
        this.hora = hora
        this.minutos = minutos
        this.segundos = segundos
    }

    lerHora(): number {
        return this.hora
    }

    lerMinutos(): number {
        return this.minutos
    }

    lerSegundos(): number {
        return this.segundos
    }

    mostrarHora(): string {
        const horaFormatada = this.hora.toString().padStart(2, '0')
        const minutosFormatados = this.minutos.toString().padStart(2, '0')
        const segundosFormatados = this.segundos.toString().padStart(2, '0')

        return `${horaFormatada}:${minutosFormatados}:${segundosFormatados}`
    }
}

const minhaHora = new Hora(9, 5, 30)

// console.log(minhaHora.lerHora())       
// console.log(minhaHora.lerMinutos())     
// console.log(minhaHora.lerSegundos())
console.log(minhaHora.mostrarHora()) 
