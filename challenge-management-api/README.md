# Management API

Aqui está implementada a API responsável pelo gerenciamento dos desafios e submissões.

Esta API tem o [GraphQL](https://graphql.org/) como especificação para comunicação
cliente-servidor.

## Instruções para execução

Esta aplicação utiliza o [yarn](https://yarnpkg.org) como gerenciador de pacotes.

Com os containeres do banco de dados e kafka em execução, siga, em ordem, os passos para a aplicação ser executada:

- Execute no terminal o comando `yarn` para instalar os pacotes necessários
- Crie uma tabela no banco de dados (nome sugerido: `rocketseat_challenge`)
- Crie um arquivo `.env` na raiz do projeto e copie o conteúdo do arquivo `.env.example` para dentro dele
- Execute o comando `yarn prisma migrate deploy` para executar as migrations e criar as tabelas/tipos necessários.
- Execute o comando `yarn start:dev` para executar a aplicação localmente

Esta aplicação estará disponível no endereço `localhost:3000`, e há a possibilidade de explorar as queries e mutations do GraphQL em ambiente de desenvolvimento no [playground](http://localhost:3000/graphql).

## Recursos disponíveis

```graphql
Query {
  answers(challengeId: String, endDate: DateTime, limit: Float, page: Float, startDate: DateTime, status: AnswerStatus): AnswerPaginatedResponse!
  challenge(id: String!): Challenge!
  challenges(description: String, limit: Float, page: Float, title: String): ChallengePaginatedResponse!
}

Mutation {
  answerChallenge(createAnswerInput: CreateAnswerInput!): Answer!
  createChallenge(createChallengeInput: CreateChallengeInput!): Challenge!
  deleteChallenge(id: String!): Challenge!
  updateChallenge(updateChallengeInput: UpdateChallengeInput!): Challenge!
}

### Tipos
Answer {
  challenge: Challenge
  challengeId: String
  createdAt: DateTime!
  errorMessage: String
  id: String!
  repositoryUrl: String!
  score: Float
  status: AnswerStatus!
}

AnswerPaginatedResponse {
  data: [Answer!]
  total: Int!
}

AnswerStatus (Pending, Error, Done)

Challenge {
  createdAt: DateTime!
  description: String!
  id: String!
  title: String!
  updatedAt: DateTime!
}

ChallengePaginatedResponse {
  data: [Challenge!]
  total: Int!
}

CreateAnswerInput {
  challengeId: String!
  repositoryUrl: String!
}

CreateChallengeInput {
  description: String!
  title: String!
}

UpdateChallengeInput {
  description: String
  id: String!
  title: String
}
```

Obs: Este projeto utiliza o modelo `code-first` na geração do schema GraphQL.
Aconselha-se não alterar o arquivo `src/schema.gql` manualmente.
