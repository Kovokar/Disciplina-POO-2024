# Questionamentos

## a. Você concorda que o banco faz o cadastro de duas entidades e ainda faz regras de negócios?

Não, ao meu ver essas responsabilidades deveriam ser separadas de modo a ter uma entidade para cada responsabilidade. O banco deve ser uma estrutura que orquestra as interações entre as entidades, mas não deve assumir o papel de validar ou gerenciar regras de negócios complexas para cada uma delas.

## b. Não seria adequado o banco ter uma classe `CadastroDeClientes` e `CadastroDeContas` e algumas regras de validação serem feitas no banco e deixar os métodos de consulta e inclusão os mais simples possíveis?

Sim, é adequado separar as validações nas classes `CadastroDeClientes` e `CadastroDeContas`, simplificando as operações de consulta e inclusão no banco. Isso centraliza as regras de negócio e mantém a interface simples.

## c. O método associar cliente a uma conta deveria estar em que classe? Banco, `CadastroDeContas` ou `CadastroDeClientes`?

O método de associar um cliente a uma conta deve estar na classe `Banco`, pois é a classe que gerencia tanto os clientes quanto as contas, realizando a associação entre eles.


## [Código completo:] ([github](https://github.com/Kovokar/Disciplina-POO/tree/main/atvd5))
