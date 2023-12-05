# TODO-LIST API

Bem-vindo à documentação da API TODO-LIST. Esta API permite gerenciar usuários, tarefas e listas de tarefas. Abaixo, você encontrará detalhes sobre como usar a API, incluindo endpoints, formatos de requisição e resposta, e outras informações relevantes.

## Como Começar

Para usar esta API, siga as etapas abaixo:

1. Clone o repositório.
2. Instale as dependências usando `npm install`.
3. Crie um arquivo `.env` com o seguinte conteúdo:
   ```plaintext
   POSTGRES_URL=sua_url_de_conexao_postgres
   PORT=3000


## Endpoints da API <br>
### Endpoints de Usuário <br>
#### Criar Usuário <br>
- Endpoint: POST /usuarios <br>
- Corpo da Requisição:
```JSON
{
  "nome": "John Doe"
}
``` 
Response
- Status: 201 Created
- Corpo:
```JSON
{
  "id": 1,
  "nome": "John Doe",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
#### Obter Todos os Usuários
- Endpoint: GET /usuarios
Resposta:
