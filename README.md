
# Teste tecnico node - frete rapido

Este projeo é uma API para fazer cotações de frete e analise de metricas. Permite que você busque cotações e busque as metricas.

- Quantidade de resultados por transportadora;
- Total de “preco_frete” por transportadora;
- Média de “preco_frete” por transportadora;
- O frete mais barato geral;
- O frete mais caro geral;





## Instalação

Com Docker.

```bash
  docker compose up --build
```

Local

```bash
  npm i
  npm run start:dev
```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MONGODB_URI`

`MONGO_INITDB_ROOT_USERNAME`

`MONGO_INITDB_ROOT_PASSWORD`

`FR_TOKEN`

`FR_PLATAFORM_CODE`

`FR_REGISTERED_NUMBER`

`FR_BASE_URL`


## Documentação da API

#### Retorna as metricas

```http
  GET /api/v1/quote?last_quotes={10}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `last_quotes` | `string` | **Opcional**. A chave da sua API |

#### Solicita a cotação

```http
  POST /api/v1/quote
```

#### Body

```http
  {
   "recipient":{
      "address":{
         "zipcode":"01311000"
      }
   },
   "volumes":[
      {
         "category":7,
         "amount":1,
         "unitary_weight":5,
         "price":349,
         "sku":"abc-teste-123",
         "height":0.2,
         "width":0.2,
         "length":0.2
      },
      {
         "category":7,
         "amount":2,
         "unitary_weight":4,
         "price":556,
         "sku":"abc-teste-527",
         "height":0.4,
         "width":0.6,
         "length":0.15
      }
   ]
}
```

#### Response

```http
 {
   "carrier":[
      {
         "name":"EXPRESSO FR",
         "service":"Rodoviário",
         "deadline":"3",
         "price":17
      },
      {
         "name":"Correios",
         "service":"SEDEX",
         "deadline":1,
         "price":20.99
      }
   ]
}
```



## Para acessar a documentaçao Swagger

 - http://localhost:3000/api-docs

