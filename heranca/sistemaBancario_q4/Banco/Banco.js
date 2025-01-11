"use strict";
exports.__esModule = true;
exports.Banco = void 0;
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
        if (this.contaJaExiste(conta.id_conta, conta.numero)) {
            console.error("J\u00E1 existe uma conta com o id ".concat(conta.id_conta, " ou um numero de conta ").concat(conta.numero, " cadastrado. N\u00E3o \u00E9 poss\u00EDvel adicionar."));
        }
        else {
            this.contas.push(conta);
            console.log("Conta ".concat(conta.numero, " cadastrado com sucesso"));
        }
    };
    Banco.prototype.inserirCliente = function (cliente) {
        if (this.clienteJaExiste(cliente.id_cliente, cliente.cpf)) {
            console.error("J\u00E1 existe uma conta com o id ".concat(cliente.id_cliente, " ou um cpf ").concat(cliente.cpf, " cadastrado. N\u00E3o \u00E9 poss\u00EDvel adicionar."));
        }
        else {
            this.clientes.push(cliente);
            console.log("Cliente ".concat(cliente.nome, " cadastrado com sucesso"));
        }
    };
    Banco.prototype.clienteJaExiste = function (id, cpf) {
        return this.clientes.some(function (cli) { return cli.cpf === cpf || cli.id_cliente === id; });
    };
    Banco.prototype.contaJaExiste = function (id, numeroConta) {
        return this.contas.some(function (conta) { return conta.numero === numeroConta || conta.id_conta === id; });
    };
    Banco.prototype.consultar = function (numero) {
        var contaProcurada = this.contas.filter(function (conta) { return conta.numero === numero; });
        if (!contaProcurada) {
            console.error("Conta com n\u00FAmero ".concat(numero, " n\u00E3o encontrada."));
            return null;
        }
        return contaProcurada[0];
    };
    Banco.prototype.consultaPorCpf = function (cpf) {
        var result = this.clientes.filter(function (key) { return key.cpf === cpf; });
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
        if (conta.st_assosciada) {
            console.error("A conta ".concat(conta.numero, " j\u00E1 est\u00E1 associada a outro cliente."));
            return;
        }
        cliente.contas.push(conta);
        this.mudarStatusConta(conta);
        console.log("Conta ".concat(numeroConta, " associada com sucesso ao cliente ").concat(cliente.nome, "."));
    };
    Banco.prototype.mudarStatusConta = function (conta) {
        conta.st_assosciada = true;
    };
    Banco.prototype.listarContasDeUmCliente = function (cpfCliente) {
        var cliente = this.consultaPorCpf(cpfCliente);
        return cliente === null || cliente === void 0 ? void 0 : cliente.contas;
    };
    Banco.prototype.totalizadorSaldoCliente = function (cpf) {
        var contasDeCliente = this.listarContasDeUmCliente(cpf);
        var totalizador = 0;
        contasDeCliente === null || contasDeCliente === void 0 ? void 0 : contasDeCliente.forEach(function (element) {
            totalizador += element.saldo;
        });
        return totalizador;
    };
    Banco.prototype.removerContaVinculada = function (cpf, numeroConta) {
        var clientesIndex = this.retornarContaCliente(cpf, numeroConta);
        if (!clientesIndex)
            return;
        var cliente = clientesIndex[0], contaIndex = clientesIndex[1];
        cliente.contas.splice(contaIndex, 1);
        console.log("Conta ".concat(numeroConta, " removida com sucesso do cliente ").concat(cliente.nome, "."));
    };
    Banco.prototype.sacar = function (cpf, numeroConta, valSacado, ie_trans) {
        var clientesIndex = this.retornarContaCliente(cpf, numeroConta);
        if (!clientesIndex)
            return false;
        var cliente = clientesIndex[0], contaIndex = clientesIndex[1];
        var saldoCliente = cliente.contas[contaIndex].saldo;
        if (saldoCliente < valSacado) {
            console.log("Você não tem saldo o suficiente");
            return false;
        }
        cliente.contas[contaIndex].saldo -= valSacado;
        if (!ie_trans)
            console.log("Valor de R$".concat(valSacado, " sacado com sucesso"));
        return true;
    };
    Banco.prototype.depositar = function (cpf, numeroConta, valDeposito, ie_trans) {
        var clientesIndex = this.retornarContaCliente(cpf, numeroConta);
        if (!clientesIndex)
            return false;
        var cliente = clientesIndex[0], contaIndex = clientesIndex[1];
        cliente.contas[contaIndex].saldo += valDeposito;
        this.totDepositado(valDeposito);
        if (!ie_trans)
            console.log("Deposito realizado com sucesso!");
        return true;
    };
    Banco.prototype.trasnferir = function (cpfRemetente, numeroContaRemetente, cpfDestino, numeroContaDestino, valTransferido) {
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
        var contaIndex = cliente.contas.findIndex(function (conta) { return conta.numero === numeroConta; });
        if (contaIndex === -1) {
            console.log('Conta não encontrada!');
            return;
        }
        return [cliente, contaIndex];
    };
    Banco.prototype.transferirParaVarios = function (cpfRemetente, numeroContaRemetente, contasDestinatarios, valTransferido) {
        var _this = this;
        // Encontra a conta do remetente
        var clientesIndexRemetente = this.retornarContaCliente(cpfRemetente, numeroContaRemetente);
        if (!clientesIndexRemetente) {
            console.log('Remetente não encontrado ou conta inválida.');
            return;
        }
        var clienteRemetente = clientesIndexRemetente[0], contaIndexRemetente = clientesIndexRemetente[1];
        // Verifica se o saldo do remetente é suficiente para realizar todas as transferências
        var saldoRemetente = clienteRemetente.contas[contaIndexRemetente].saldo;
        if (saldoRemetente < valTransferido * contasDestinatarios.length) {
            console.log('Saldo insuficiente para transferir para todas as contas.');
            return;
        }
        // Itera sobre as contas destinatárias e realiza a transferência
        contasDestinatarios.forEach(function (_a) {
            var cpfDestino = _a.cpfDestino, numeroContaDestino = _a.numeroContaDestino;
            var clientesIndexDestino = _this.retornarContaCliente(cpfDestino, numeroContaDestino);
            if (!clientesIndexDestino) {
                console.log("Conta destino n\u00E3o encontrada para CPF: ".concat(cpfDestino, " e n\u00FAmero de conta: ").concat(numeroContaDestino));
                return;
            }
            var clienteDestino = clientesIndexDestino[0], contaIndexDestino = clientesIndexDestino[1];
            // Realiza o saque da conta remetente e o depósito na conta destino
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
        var clienteIndex = this.clientes.findIndex(function (cliente) { return cliente.cpf === cpf; });
        if (clienteIndex === -1) {
            console.log("Cliente n\u00E3o encontrado.");
            return;
        }
        var cliente = this.clientes[clienteIndex];
        cliente.contas.forEach(function (conta) {
            conta.st_assosciada = false;
        });
        this.clientes.splice(clienteIndex, 1);
        console.log("Cliente ".concat(cliente.nome, " exclu\u00EDdo com sucesso."));
    };
    Banco.prototype.excluirConta = function (numeroConta) {
        var conta = this.consultar(numeroConta);
        if (!conta) {
            console.log("Conta ".concat(numeroConta, " n\u00E3o encontrada."));
            return;
        }
        var cliente = this.clientes.find(function (cliente) { return cliente.contas.includes(conta); });
        if (cliente) {
            cliente.contas = cliente.contas.filter(function (conta) { return conta.numero !== numeroConta; });
            if (cliente.contas.length === 0) {
                this.excluirCliente(cliente.cpf);
            }
        }
        var index = this.contas.findIndex(function (c) { return c.numero === numeroConta; });
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
        if (conta.st_assosciada) {
            var clienteAtual = this.clientes.find(function (cliente) { return cliente.contas.includes(conta); });
            clienteAtual === null || clienteAtual === void 0 ? void 0 : clienteAtual.contas.splice(clienteAtual.contas.indexOf(conta), 1);
        }
        novoCliente.contas.push(conta);
        conta.st_assosciada = true;
        console.log("Titularidade da conta ".concat(numeroConta, " alterada para o cliente ").concat(novoCliente.nome, "."));
    };
    Banco.prototype.listarContasSemCliente = function () {
        return this.contas.filter(function (conta) { return !conta.st_assosciada; });
    };
    Banco.prototype.associarContaSemCliente = function (numeroConta, cpfCliente) {
        var conta = this.consultar(numeroConta);
        var cliente = this.consultaPorCpf(cpfCliente);
        if (!conta || !cliente) {
            console.log("Conta ou cliente não encontrado.");
            return;
        }
        if (conta.st_assosciada) {
            console.log("Essa conta já está associada a um cliente.");
            return;
        }
        cliente.contas.push(conta);
        conta.st_assosciada = true;
        console.log("Conta ".concat(numeroConta, " associada com sucesso ao cliente ").concat(cliente.nome, "."));
    };
    Banco.prototype.totalDeContas = function () {
        this.contas = this.contas.filter(function (value, index, self) {
            return index === self.findIndex(function (t) { return t.id_conta === value.id_conta; });
        });
        return this.contas.length;
    };
    Banco.prototype.totDepositado = function (valDeposito) {
        this.data.totDepositado += valDeposito;
    };
    Banco.prototype.saldoMedioContas = function () {
        var _this = this;
        this.contas.forEach(function (conta) { _this.data.saldoMedioContas += conta.saldo; });
        this.data.saldoMedioContas = this.data.saldoMedioContas / this.totalDeContas();
        return this.data.saldoMedioContas;
    };
    return Banco;
}());
exports.Banco = Banco;
