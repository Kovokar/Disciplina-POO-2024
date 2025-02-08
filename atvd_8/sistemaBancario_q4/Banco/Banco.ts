import { Conta } from '../Conta/Conta'
import { Cliente } from '../Cliente/Cliente'
import { Poupanca } from '../ContaPoupança/Poupanca'
import { ContaInexistenteError, ClienteNaoEncontradoError, PoupancaInvalidaError } from "../AplicacaoError"

export class Banco {
    private contas: Conta[] // Tornando o array de contas privado
    clientes: Cliente[]

    constructor() {
        this.contas = []
        this.clientes = []
    }

    data = {
        totDepositado: 0,
        saldoMedioContas: 0
    }

    inserirConta(conta: Conta): void {
        if (this.contaJaExiste(conta.getIdConta(), conta.getNumero())) {
            console.error(`Já existe uma conta com o id ${conta.getIdConta()} ou um numero de conta ${conta.getNumero()} cadastrado. Não é possível adicionar.`)
        } else {
            this.contas.push(conta);
            console.log(`Conta ${conta.getNumero()} cadastrada com sucesso`);
        }
    }

    inserirCliente(cliente: Cliente): void {
        if (this.clienteJaExiste(cliente.getIdCliente(), cliente.getCpf())) {
            console.error(`Já existe uma conta com o id ${cliente.getIdCliente()} ou um cpf ${cliente.getCpf()} cadastrado. Não é possível adicionar.`);
        } else {
            this.clientes.push(cliente);
            console.log(`Cliente ${cliente.getNome()} cadastrado com sucesso`);
        }
    }

    private clienteJaExiste(id: number, cpf: string): boolean {
        return this.clientes.some(cli => cli.getCpf() === cpf || cli.getIdCliente() === id);
    }

    private contaJaExiste(id: number, numeroConta: string): boolean {
        return this.contas.some(conta => conta.getNumero() === numeroConta || conta.getIdConta() === id);
    }

    private consultarPorIndice(numero: string): Conta | null {
        const contaProcurada = this.contas.filter(conta => conta.getNumero() === numero);
        
        if (!contaProcurada) {
            console.error(`Conta com número ${numero} não encontrada.`);
            return null;
        }
        
        return contaProcurada[0];
    }

    consultar(numero: string): Conta {
        const conta = this.consultarPorIndice(numero)
        if (!conta) {
            throw new ContaInexistenteError(numero)
        }
        return conta
    }

    consultaPorCpf(cpf: string): Cliente {
        const cliente = this.clientes.find(c => c.getCpf() === cpf)
        if (!cliente) {
            throw new ClienteNaoEncontradoError(cpf)
        }
        return cliente
    }

    associarContaCliente(numeroConta: string, cpfCliente: string): void {
        const cliente = this.consultaPorCpf(cpfCliente);
        const conta = this.consultar(numeroConta);

        if (!cliente || !conta) return;
        if (conta.isAssociada()) {
            console.error(`A conta ${conta.getNumero()} já está associada a outro cliente.`);
            return;
        }
        cliente.adicionarConta(conta);
        console.log(`Conta ${numeroConta} associada com sucesso ao cliente ${cliente.getNome()}.`);
    }

    // private mudarStatusConta(conta: Conta): void {
    //     conta.st_assosciada = true
    // }

    listarContasDeUmCliente(cpfCliente: string): Conta[] | undefined {
        const cliente = this.consultaPorCpf(cpfCliente);
        return cliente?.getContas();
    }

    totalizadorSaldoCliente(cpf: string): number {
        const contasDeCliente = this.listarContasDeUmCliente(cpf);
        let totalizador: number = 0;
        contasDeCliente?.forEach(element => {
            totalizador += element.getSaldo();
        });
        return totalizador;
    }

    removerContaVinculada(cpf: string, numeroConta: string): void {
        const clientesIndex = this.retornarContaCliente(cpf, numeroConta);
        if (!clientesIndex) return;
        const [cliente, contaIndex] = clientesIndex;

        cliente.removerConta(cliente.getContas()[contaIndex]);
        console.log(`Conta ${numeroConta} removida com sucesso do cliente ${cliente.getNome()}.`);
    }

    sacar(cpf: string, numeroConta: string, valSacado: number, ie_trans?: boolean): boolean {
        const [cliente, contaIndex] = this.retornarContaCliente(cpf, numeroConta);
        cliente.getContas()[contaIndex].sacar(valSacado);
        
        if (!ie_trans) {
            console.log(`Valor de R$${valSacado} sacado com sucesso`);
        }
        return true;
    }

    depositar(cpf: string, numeroConta: string, valDeposito: number, ie_trans?: boolean): boolean {
        const [cliente, contaIndex] = this.retornarContaCliente(cpf, numeroConta);
        cliente.getContas()[contaIndex].depositar(valDeposito);
        this.totDepositado(valDeposito);
        
        if (!ie_trans) {
            console.log("Deposito realizado com sucesso!");
        }
        return true;
    }

    transferir(cpfRemetente: string, numeroContaRemetente: string, cpfDestino: string, numeroContaDestino: string, valTransferido: number): void {
        const [clienteRemetente, contaIndexRemetente] = this.retornarContaCliente(cpfRemetente, numeroContaRemetente);
        const [clienteDestino, contaIndexDestino] = this.retornarContaCliente(cpfDestino, numeroContaDestino);
        
        const contaRemetente = clienteRemetente.getContas()[contaIndexRemetente];
        const contaDestino = clienteDestino.getContas()[contaIndexDestino];
        
        contaRemetente.sacar(valTransferido);
        contaDestino.depositar(valTransferido);
        
        console.log("Valor Transferido com Sucesso");
    }

    retornarContaCliente(cpf: string, numeroConta: string): [Cliente, number] {
        const cliente = this.consultaPorCpf(cpf);
        const contaIndex = cliente.getContas().findIndex(conta => conta.getNumero() === numeroConta);
        
        if (contaIndex === -1) {
            throw new ContaInexistenteError(numeroConta);
        }

        return [cliente, contaIndex];
    }

    transferirParaVarios(cpfRemetente: string, numeroContaRemetente: string, contasDestinatarios: { cpfDestino: string, numeroContaDestino: string }[], valTransferido: number): void {
        const clientesIndexRemetente = this.retornarContaCliente(cpfRemetente, numeroContaRemetente);
        
        if (!clientesIndexRemetente) {
            console.log('Remetente não encontrado ou conta inválida.');
            return;
        }
        
        const [clienteRemetente, contaIndexRemetente] = clientesIndexRemetente;
    
        const saldoRemetente = clienteRemetente.getContas()[contaIndexRemetente].getSaldo();
        if (saldoRemetente < valTransferido * contasDestinatarios.length) {
            console.log('Saldo insuficiente para transferir para todas as contas.');
            return;
        }
        
        contasDestinatarios.forEach(({ cpfDestino, numeroContaDestino }) => {
            const clientesIndexDestino = this.retornarContaCliente(cpfDestino, numeroContaDestino);
            
            if (!clientesIndexDestino) {
                console.log(`Conta destino não encontrada para CPF: ${cpfDestino} e número de conta: ${numeroContaDestino}`);
                return;
            }
            
            const [clienteDestino, contaIndexDestino] = clientesIndexDestino;
    
            if (this.sacar(cpfRemetente, numeroContaRemetente, valTransferido)) {
                this.depositar(cpfDestino, numeroContaDestino, valTransferido);
                console.log(`Transferência de R$${valTransferido} realizada para a conta de ${cpfDestino}`);
            } else {
                console.log(`Falha ao realizar a transferência para a conta de ${cpfDestino}`);
            }
        });
    }

    excluirCliente(cpf: string): void {
        const clienteIndex = this.clientes.findIndex(cliente => cliente.getCpf() === cpf);
        
        if (clienteIndex === -1) {
            console.log(`Cliente não encontrado.`);
            return;
        }
        
        const cliente = this.clientes[clienteIndex];
        cliente.getContas().forEach(conta => {
            conta.setAssociada(false);
        });
        
        this.clientes.splice(clienteIndex, 1);
        console.log(`Cliente ${cliente.getNome()} excluído com sucesso.`);
    }

    excluirConta(numeroConta: string): void {
        const conta = this.consultar(numeroConta);

        if (!conta) {
            console.log(`Conta ${numeroConta} não encontrada.`);
            return;
        }

        const cliente = this.clientes.find(cliente => cliente.getContas().includes(conta));
        
        if (cliente) {
            cliente.getContas().splice(cliente.getContas().indexOf(conta), 1);
            if (cliente.getContas().length === 0) {
                this.excluirCliente(cliente.getCpf()); 
            }
        }

        const index = this.contas.findIndex(c => c.getNumero() === numeroConta);
        this.contas.splice(index, 1);
        console.log(`Conta ${numeroConta} excluída com sucesso.`);
    }

    mudarTitularidadeConta(numeroConta: string, novoCpfCliente: string): void {
        const conta = this.consultar(numeroConta);
        const novoCliente = this.consultaPorCpf(novoCpfCliente);

        if (!conta || !novoCliente) {
            console.log("Conta ou cliente não encontrado.");
            return;
        }

        if (conta.isAssociada()) {
            const clienteAtual = this.clientes.find(cliente => cliente.getContas().includes(conta));
            clienteAtual?.getContas().splice(clienteAtual.getContas().indexOf(conta), 1);
        }

        novoCliente.adicionarConta(conta);
        conta.setAssociada(true);
        console.log(`Titularidade da conta ${numeroConta} alterada para o cliente ${novoCliente.getNome()}.`);
    }

    listarContasSemCliente(): Conta[] {
        return this.contas.filter(conta => !conta.isAssociada());
    }

    associarContaSemCliente(numeroConta: string, cpfCliente: string): void {
        const conta = this.consultar(numeroConta);
        const cliente = this.consultaPorCpf(cpfCliente);

        if (!conta || !cliente) {
            console.log("Conta ou cliente não encontrado.");
            return;
        }

        if (conta.isAssociada()) {
            console.log("Essa conta já está associada a um cliente.");
            return;
        }

        cliente.adicionarConta(conta);
        conta.setAssociada(true);
        console.log(`Conta ${numeroConta} associada com sucesso ao cliente ${cliente.getNome()}.`);
    }

    totalDeContas(): number {
        this.contas = this.contas.filter((value, index, self) =>
            index === self.findIndex((t) => t.getIdConta() === value.getIdConta())
        );
        return this.contas.length;
    }

    totDepositado(valDeposito: number): void {
        this.data.totDepositado += valDeposito;
    }

    saldoMedioContas(): number {
        this.contas.forEach(conta => { this.data.saldoMedioContas += conta.getSaldo() });
        this.data.saldoMedioContas = this.data.saldoMedioContas / this.totalDeContas();
        return this.data.saldoMedioContas;
    }

    renderJuros(num_conta: string): void {
        let conta = this.consultar(num_conta)
        
        if (!(conta instanceof Poupanca)) {
            throw new PoupancaInvalidaError(num_conta)
        }
        
        conta.renderJuros()
    }
}
