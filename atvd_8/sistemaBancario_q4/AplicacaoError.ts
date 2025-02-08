export class AplicacaoError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'AplicacaoError'
    }
}

export class ValorInvalidoError extends AplicacaoError {
    constructor(valor: number, operacao: string) {
        super(`Valor inválido para ${operacao}. Valor recebido: R$${valor.toFixed(2)}. O valor deve ser positivo.`)
        this.name = 'ValorInvalidoError'
    }
}

export class ContaInexistenteError extends AplicacaoError {
    constructor(numeroConta: string) {
        super(`Conta ${numeroConta} não encontrada no banco.`)
        this.name = 'ContaInexistenteError'
    }
}

export class ClienteNaoEncontradoError extends AplicacaoError {
    constructor(cpf: string) {
        super(`Cliente com CPF ${cpf} não encontrado.`)
        this.name = 'ClienteNaoEncontradoError'
    }
}

export class SaldoInsuficienteError extends AplicacaoError {
    constructor(saldoAtual: number, valorSaque: number) {
        super(`Saldo insuficiente. Saldo atual: R$${saldoAtual.toFixed(2)}, Valor do saque: R$${valorSaque.toFixed(2)}`)
        this.name = 'SaldoInsuficienteError'
    }
}

export class PoupancaInvalidaError extends AplicacaoError {
    constructor(numeroConta: string) {
        super(`Conta ${numeroConta} não é uma Conta Poupança válida.`)
        this.name = 'PoupancaInvalidaError'
    }
}

export class CPFInvalidoError extends AplicacaoError {
    constructor(cpf: string) {
        super(`CPF inválido: ${cpf}. O CPF deve conter 11 dígitos numéricos.`)
        this.name = 'CPFInvalidoError'
    }
}

export class DataNascimentoInvalidaError extends AplicacaoError {
    constructor(dataNascimento: Date) {
        super(`Data de nascimento inválida: ${dataNascimento.toLocaleDateString()}. A data não pode ser futura ou muito antiga.`)
        this.name = 'DataNascimentoInvalidaError'
    }
}

export class ContaJaAssociadaError extends AplicacaoError {
    constructor(numeroConta: string, cpfAtual: string, cpfNovo: string) {
        super(`Conta ${numeroConta} já está associada ao cliente com CPF ${cpfAtual}. Não é permitido associar a outro cliente (CPF ${cpfNovo}).`)
        this.name = 'ContaJaAssociadaError'
    }
}

export class EntradaVaziaError extends AplicacaoError {
    constructor(campo: string) {
        super(`O campo ${campo} não pode estar vazio.`)
        this.name = 'EntradaVaziaError'
    }
}

export class EntradaInvalidaError extends AplicacaoError {
    constructor(campo: string, mensagemAdicional?: string) {
        super(`Entrada inválida para o campo ${campo}.` + 
              (mensagemAdicional ? ` ${mensagemAdicional}` : ''))
        this.name = 'EntradaInvalidaError'
    }
}

export class NumeroContaInvalidoError extends AplicacaoError {
    constructor(numeroConta: string) {
        super(`Número de conta inválido: ${numeroConta}. Deve seguir o formato XXX-X.`)
        this.name = 'NumeroContaInvalidoError'
    }
} 