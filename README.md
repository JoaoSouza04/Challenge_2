# **Challenge_2**

2° Desafio do estágio da Compass UOL na trilha de Node.js!

**Linguagem Usada:** Node.js

# **Passos para a utilização da API:**

Primeiramente, utlizando o terminal você deverá utilizar alguns comandos, o primeiro deles é: `git clone https://github.com/JoaoSouza04/Challenge_2.git` para clonar este repositório em sua máquina! Após isso, se direcione para esse repositório utilizando o comando `cd caminhoParaRepositório` e substitua o campo "caminhoParaRepositório" pelo caminho até a pasta da API. Quando ja estiver na pasta do repositório, Também será necessário rodar o seguinte comando: `npm install`.

**Comandos para executar a API:** Nesta API, você poderá utilizar o comando `npm start` para rodar o arquivo principal, e se caso desejar fazer alguma alteração no código e testar, poderá utilizar o comando `npm run dev` para rodar a aplicação após salvar qualquer alteração!

# **Regras para o bom funcionamento da API:**

## **Events Routes:**

_POST_

createEvent: Nesta rota, o padrão esperado do usuário é que seja inserido um texto de descrição com no mínimo 3 caracteres e no máximo 300, um texto para id de usuário com no mínimo 8 caracteres que também deve ser único. Para as datas, é necessário inserir a data do evento, que deve ser "maior ou igual" a data do dia atual.

**IMPORTANTE:**
A data deve ser passada com um formato específico, caso contrário, o sistema não funcionará de forma correta. o formato deve ser 'yyyy-MM-ddTHH:mm:ss' sendo yyyyy o ano, MM o mês, dd o dia, T um separador para o início da inserção das horas, HH as horas, mm minutos, ss segundos e por fim o Z para sinalizar o UTC, este caractere é obrigatório!. Vale ressaltar que é possível inserir apenas a data ou somente a data com as horas e etc, porém se faz necessário sempre ao fim da declaração da data, digitar o Z. Ex: 'yyyy-MM-ddZ' ou 'yyyy-MM-ddTHHZ'.

**URL e Exemplo de parâmetros para request de criação de eventos:**

`localhost:3000/api/v1/events`

```
{
    "description": "descrição aqui",
    "userId": "idDoUsuário",
    "dateTime": "2023-02-08T12:30Z"
}
```

_GET_

getAllEvents: Nesta rota, existe a posiibilidade de passar uma query chamada "dayOfTheWeek" que recebe o número do dia de um evento, com ela, você receberá o retorno (se caso exista) de um evento que ocorrerá no dia correspondente. Se caso a query não for passada ou o número recebido não for correspondente a nenhum dia de evento, deve ser retornado para o usuário todos os eventos encontrados no Banco de Dados.

**URL e parâmetros para a query:**

`localhost:3000/api/v1/events?dayOfTheWeek=25`

_GET_

getEventById: Aqui o resultado retornado será o evento correspondente ao id passado na URL. Se caso nenhum id for passado ou se o id provido for inválido, o usuário receberá uma mensagem de aviso.

**URL e parâmetros para a inserção do id:**

`localhost:3000/api/v1/events/idDoEventoAqui`
O id deve ser passado no campo após a '/'.

_PUT_

updateEvent: Para esta rota, é esperado os parâmetros 'userId', 'description' e 'dateTime' para que seja realizada uma alteração dos campos e uma atualização no Banco de Dados. Como nas outras rotas, se caso não for disponibilizado os campos, o usuário receberá mensagens de aviso. O campo dateTime deve respeitar o formato apresentado na explicação da rota 'createEvent'!

**URL e exemplo de campos para a rota PUT:**

`localhost:3000/api/v1/events/idDoEventoAqui`
O id deve ser passado no campo após a '/'.

```
{
    "userId": "idDoUsuário",
    "description": "descrição aqui",
    "dateTime": "2023-02-10T12:30Z"
}
```

_DELETE_

deleteEvent: Por último, nesta rota deve ser passado um id como parâmetro para que o respectivo evento seja apagado do Banco de Dados, recebendo então uma resposta com os dados do evento apagado!

**URL para a rota DELETE:**

`localhost:3000/api/v1/events/idDoEventoAqui`
O id deve ser passado no campo após a '/'.

## **User Routes:**

_POST_

signUp: Nesta rota, deve ser passados os parâmetros: texto 'firstName' para a inserção de um texto com o nome, texto 'lastName' para a inserção de um sobrenome, um campo de data 'birthDate' para passar a sua data de nascimento, sem a necessidade de inserir as horas, porém **(respeitando as regras e formatações citadas na rota createEvent das Event Routes)**. Logo em seguida, deve ser passado um campo de texto 'city' para passar a cidade, outro campo de texto 'country' para a inserção do país, um texto 'email' para a inserção de um email, que deve ser único e válido, e os campos de 'password' e 'passwordConfirm' para a inserção de uma senha que deve ser numérica!

**URL e parâmetros para a inserção dos campos:**

`localhost:3000/api/v1/users/signUp`

```
{
    "firstName": "primeiroNome",
    "lastName": "sobrenome",
    "birthDate": "2000-01-03Z",
    "city": "São Paulo",
    "country": "Brasil",
    "email": "email@domínio.extensão",
    "password": "12345678",
    "passwordConfirm": "12345678"
}
```

_POST_

signIn: Aqui deverá ser passado o email e a senha do usuário, para que seja retornado os dados do mesmo. **Importante:** A senha deve ser passada sem as aspas duplas, para que seja aceita e verificada devidamente pelo sistema!.

**URL e parâmetros para o acesso aos dados do respectivo usuário:**

`localhost:3000/api/v1/users/signIn`

```
{
    "email": "email@domínio.extensão",
    "password": 12345678
}
```

_PUT_

updateUser: Nesta rota, é esperado todos os parâmetros que também são passados no momento da criação, são eles: 'firstName', 'lastName', 'birthDate', 'city', 'country', 'email', 'password', 'passwordConfirm'. **Todos os campos devem respeitar as mesmas regras encontradas na rota de 'signUp'**, para que não ocorra erros no sistema!

**URL e parâmetros de campos para a rota PUT:**

`localhost:3000/api/v1/users/idDoUsuárioAqui`
O id deve ser passado no campo após a '/'.

```
{
    "firstName": "primeiroNome",
    "lastName": "sobrenome",
    "birthDate": "2000-01-03Z",
    "city": "Minas Gerais",
    "country": "Brasil",
    "email": "email@domínio.extensão",
    "password": "12345678",
    "passwordConfirm": "12345678"
}
```

##### **OBS:**

Por ter tido alguns imprevistos com erros e tempo insuficiente para finalizar as etapas de implementação/teste, infelizmente não foi possível entregar a funcionalidade da query de delete com dias da semana. Também adaptei a query de retorno de eventos a partir do dia, acrescentando mais um campo ao modelo de eventos, responsável por resgatar a data inserida e ajudar na procura e retorno dos dados correpondentes. Dessarte, peço perdão pela falta desses elementos na entrega do projeto, e a consideração de vocês em relação as adaptações para conseguir entregar a funcionalidade desejada!
