"use strict";
exports.__esModule = true;
exports.Banco = void 0;
var Poupanca_1 = require("../ContaPoupan\u00E7a/Poupanca");
var Banco = /** @class */ (function () {
    function Banco() {
        this.data = {
            totDepositado: 0,
            saldoMedioContas: 0
        };
        this.contas = [];
        this.clientes = [];
    }
    Banco.prototype.inserirConta = function (conta) {
        if (this.contaJaExiste(conta.getIdConta(), conta.getNumero())) {
            console.error("J\u00E1 existe uma conta com o id ".concat(conta.getIdConta(), " ou um numero de conta ").concat(conta.getNumero(), " cadastrado. N\u00E3o \u00E9 poss\u00EDvel adicionar."));
        }
        else {
            this.contas.push(conta);
            console.log("Conta ".concat(conta.getNumero(), " cadastrada com sucesso"));
        }
    };
    Banco.prototype.inserirCliente = function (cliente) {
        if (this.clienteJaExiste(cliente.getIdCliente(), cliente.getCpf())) {
            console.error("J\u00E1 existe uma conta com o id ".concat(cliente.getIdCliente(), " ou um cpf ").concat(cliente.getCpf(), " cadastrado. N\u00E3o \u00E9 poss\u00EDvel adicionar."));
        }
        else {
            this.clientes.push(cliente);
            console.log("Cliente ".concat(cliente.getNome(), " cadastrado com sucesso"));
        }
    };
    Banco.prototype.clienteJaExiste = function (id, cpf) {
        return this.clientes.some(function (cli) { return cli.getCpf() === cpf || cli.getIdCliente() === id; });
    };
    Banco.prototype.contaJaExiste = function (id, numeroConta) {
        return this.contas.some(function (conta) { return conta.getNumero() === numeroConta || conta.getIdConta() === id; });
    };
    Banco.prototype.consultarPorIndice = function (numero) {
        var contaProcurada = this.contas.filter(function (conta) { return conta.getNumero() === numero; });
        if (!contaProcurada) {
            console.error("Conta com n\u00FAmero ".concat(numero, " n\u00E3o encontrada."));
            return null;
        }
        return contaProcurada[0];
    };
    Banco.prototype.consultar = function (numero) {
        return this.consultarPorIndice(numero);
    };
    Banco.prototype.consultaPorCpf = function (cpf) {
        var result = this.clientes.filter(function (key) { return key.getCpf() === cpf; });
        if (!result) {
            console.error("Cliente com CPF ".concat(cpf, " n\u00E3o encontrado."));
            return null;
        }
        return result[0];
    };
    Banco.prototype.associarContaCliente = function (numeroConta, cpfCliente) {
        var cliente = this.consultaPorCpf(cpfCliente);
        var conta = this.consultar(numeroConta);
        if (!cliente || !conta)
            return;
        if (conta.isAssociada()) {
            console.error("A conta ".concat(conta.getNumero(), " j\u00E1 est\u00E1 associada a outro cliente."));
            return;
        }
        cliente.adicionarConta(conta);
        conta.setAssociada(true);
        console.log("Conta ".concat(numeroConta, " associada com sucesso ao cliente ").concat(cliente.getNome(), "."));
    };
    // private mudarStatusConta(conta: Conta): void {
    //     conta.st_assosciada = true
    // }
    Banco.prototype.listarContasDeUmCliente = function (cpfCliente) {
        var cliente = this.consultaPorCpf(cpfCliente);
        return cliente === null || cliente === void 0 ? void 0 : cliente.getContas();
    };
    Banco.prototype.totalizadorSaldoCliente = function (cpf) {
        var contasDeCliente = this.listarContasDeUmCliente(cpf);
        var totalizador = 0;
        contasDeCliente === null || contasDeCliente === void 0 ? void 0 : contasDeCliente.forEach(function (element) {
            totalizador += element.getSaldo();
        });
        return totalizador;
    };
    Banco.prototype.removerContaVinculada = function (cpf, numeroConta) {
        var clientesIndex = this.retornarContaCliente(cpf, numeroConta);
        if (!clientesIndex)
            return;
        var cliente = clientesIndex[0], contaIndex = clientesIndex[1];
        cliente.removerConta(cliente.getContas()[contaIndex]);
        console.log("Conta ".concat(numeroConta, " removida com sucesso do cliente ").concat(cliente.getNome(), "."));
    };
    Banco.prototype.sacar = function (cpf, numeroConta, valSacado, ie_trans) {
        var clientesIndex = this.retornarContaCliente(cpf, numeroConta);
        if (!clientesIndex)
            return false;
        var cliente = clientesIndex[0], contaIndex = clientesIndex[1];
        var saldoCliente = cliente.getContas()[contaIndex].getSaldo();
        if (saldoCliente < valSacado) {
            console.log("Você não tem saldo o suficiente");
            return false;
        }
        cliente.getContas()[contaIndex].sacar(valSacado);
        if (!ie_trans)
            console.log("Valor de R$".concat(valSacado, " sacado com sucesso"));
        return true;
    };
    Banco.prototype.depositar = function (cpf, numeroConta, valDeposito, ie_trans) {
        var clientesIndex = this.retornarContaCliente(cpf, numeroConta);
        if (!clientesIndex)
            return false;
        var cliente = clientesIndex[0], contaIndex = clientesIndex[1];
        cliente.getContas()[contaIndex].depositar(valDeposito);
        this.totDepositado(valDeposito);
        if (!ie_trans)
            console.log("Deposito realizado com sucesso!");
        return true;
    };
    Banco.prototype.transferir = function (cpfRemetente, numeroContaRemetente, cpfDestino, numeroContaDestino, valTransferido) {
        var clientesIndexRemetente = this.retornarContaCliente(cpfRemetente, numeroContaRemetente);
        var clientesIndexDestino = this.retornarContaCliente(cpfDestino, numeroContaDestino);
        if (!clientesIndexRemetente || !clientesIndexDestino)
            return;
        if (this.sacar(cpfRemetente, numeroContaRemetente, valTransferido, true)) {
            this.depositar(cpfDestino, numeroContaDestino, valTransferido, true);
            console.log("Valor Transferido com Sucesso");
        }
    };
    Banco.prototype.retornarContaCliente = function (cpf, numeroConta) {
        var cliente = this.consultaPorCpf(cpf);
        if (!cliente) {
            console.log('Cliente não encontrado!');
            return;
        }
        var contaIndex = cliente.getContas().findIndex(function (conta) { return conta.getNumero() === numeroConta; });
        if (contaIndex === -1) {
            console.log('Conta não encontrada!');
            return;
        }
        return [cliente, contaIndex];
    };
    Banco.prototype.transferirParaVarios = function (cpfRemetente, numeroContaRemetente, contasDestinatarios, valTransferido) {
        var _this = this;
        var clientesIndexRemetente = this.retornarContaCliente(cpfRemetente, numeroContaRemetente);
        if (!clientesIndexRemetente) {
            console.log('Remetente não encontrado ou conta inválida.');
            return;
        }
        var clienteRemetente = clientesIndexRemetente[0], contaIndexRemetente = clientesIndexRemetente[1];
        var saldoRemetente = clienteRemetente.getContas()[contaIndexRemetente].getSaldo();
        if (saldoRemetente < valTransferido * contasDestinatarios.length) {
            console.log('Saldo insuficiente para transferir para todas as contas.');
            return;
        }
        contasDestinatarios.forEach(function (_a) {
            var cpfDestino = _a.cpfDestino, numeroContaDestino = _a.numeroContaDestino;
            var clientesIndexDestino = _this.retornarContaCliente(cpfDestino, numeroContaDestino);
            if (!clientesIndexDestino) {
                console.log("Conta destino n\u00E3o encontrada para CPF: ".concat(cpfDestino, " e n\u00FAmero de conta: ").concat(numeroContaDestino));
                return;
            }
            var clienteDestino = clientesIndexDestino[0], contaIndexDestino = clientesIndexDestino[1];
            if (_this.sacar(cpfRemetente, numeroContaRemetente, valTransferido)) {
                _this.depositar(cpfDestino, numeroContaDestino, valTransferido);
                console.log("Transfer\u00EAncia de R$".concat(valTransferido, " realizada para a conta de ").concat(cpfDestino));
            }
            else {
                console.log("Falha ao realizar a transfer\u00EAncia para a conta de ".concat(cpfDestino));
            }
        });
    };
    Banco.prototype.excluirCliente = function (cpf) {
        var clienteIndex = this.clientes.findIndex(function (cliente) { return cliente.getCpf() === cpf; });
        if (clienteIndex === -1) {
            console.log("Cliente n\u00E3o encontrado.");
            return;
        }
        var cliente = this.clientes[clienteIndex];
        cliente.getContas().forEach(function (conta) {
            conta.setAssociada(false);
        });
        this.clientes.splice(clienteIndex, 1);
        console.log("Cliente ".concat(cliente.getNome(), " exclu\u00EDdo com sucesso."));
    };
    Banco.prototype.excluirConta = function (numeroConta) {
        var conta = this.consultar(numeroConta);
        if (!conta) {
            console.log("Conta ".concat(numeroConta, " n\u00E3o encontrada."));
            return;
        }
        var cliente = this.clientes.find(function (cliente) { return cliente.getContas().includes(conta); });
        if (cliente) {
            cliente.getContas().splice(cliente.getContas().indexOf(conta), 1);
            if (cliente.getContas().length === 0) {
                this.excluirCliente(cliente.getCpf());
            }
        }
        var index = this.contas.findIndex(function (c) { return c.getNumero() === numeroConta; });
        this.contas.splice(index, 1);
        console.log("Conta ".concat(numeroConta, " exclu\u00EDda com sucesso."));
    };
    Banco.prototype.mudarTitularidadeConta = function (numeroConta, novoCpfCliente) {
        var conta = this.consultar(numeroConta);
        var novoCliente = this.consultaPorCpf(novoCpfCliente);
        if (!conta || !novoCliente) {
            console.log("Conta ou cliente não encontrado.");
            return;
        }
        if (conta.isAssociada()) {
            var clienteAtual = this.clientes.find(function (cliente) { return cliente.getContas().includes(conta); });
            clienteAtual === null || clienteAtual === void 0 ? void 0 : clienteAtual.getContas().splice(clienteAtual.getContas().indexOf(conta), 1);
        }
        novoCliente.adicionarConta(conta);
        conta.setAssociada(true);
        console.log("Titularidade da conta ".concat(numeroConta, " alterada para o cliente ").concat(novoCliente.getNome(), "."));
    };
    Banco.prototype.listarContasSemCliente = function () {
        return this.contas.filter(function (conta) { return !conta.isAssociada(); });
    };
    Banco.prototype.associarContaSemCliente = function (numeroConta, cpfCliente) {
        var conta = this.consultar(numeroConta);
        var cliente = this.consultaPorCpf(cpfCliente);
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
        console.log("Conta ".concat(numeroConta, " associada com sucesso ao cliente ").concat(cliente.getNome(), "."));
    };
    Banco.prototype.totalDeContas = function () {
        this.contas = this.contas.filter(function (value, index, self) {
            return index === self.findIndex(function (t) { return t.getIdConta() === value.getIdConta(); });
        });
        return this.contas.length;
    };
    Banco.prototype.totDepositado = function (valDeposito) {
        this.data.totDepositado += valDeposito;
    };
    Banco.prototype.saldoMedioContas = function () {
        var _this = this;
        this.contas.forEach(function (conta) { _this.data.saldoMedioContas += conta.getSaldo(); });
        this.data.saldoMedioContas = this.data.saldoMedioContas / this.totalDeContas();
        return this.data.saldoMedioContas;
    };
    Banco.prototype.renderJuros = function (num_conta) {
        try {
            var conta = this.consultar(num_conta);
            if (!(conta instanceof Poupanca_1.Poupanca)) {
                throw new Error("Conta não é do tipo Poupanca");
            }
            conta.renderJuros();
        }
        catch (error) {
            console.log(error.message);
        }
    };
    return Banco;
}());
exports.Banco = Banco;
