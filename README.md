# Sistema de Pedidos Simplificado

Sistema de gerenciamento de pedidos com autenticação de usuários, catálogo de produtos e acompanhamento de pedidos.

## Arquitetura

O projeto é dividido em duas partes principais:

### Backend (.NET 8)
- **OrderAPI**: API REST com endpoints para autenticação, produtos e pedidos
- **Application**: Camada de aplicação com DTOs e contratos
- **Domain**: Entidades e regras de negócio
- **Infrastructure**: Implementação dos repositórios e configurações do banco de dados

### Frontend (Next.js 14)
- **Páginas Públicas**: Login e Registro
- **Páginas Autenticadas**: Produtos e Pedidos
- **Componentes**: Navbar e Cards
- **Serviços**: Integração com a API
- **Hooks**: Gerenciamento de autenticação

## Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [SQLite](https://www.sqlite.org/download.html)

## Configuração e Execução

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Restaure as dependências:
```bash
dotnet restore
```

3. Execute as migrações do banco de dados:
```bash
dotnet ef database update
```

4. Inicie a API:
```bash
dotnet run --project OrderAPI
```

A API estará disponível em `https://localhost:7049`

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a variável de ambiente:
Crie um arquivo `.env.local` na raiz do frontend com:
```
NEXT_PUBLIC_API_URL=https://localhost:7049
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## Funcionalidades

### Autenticação
- Registro de novos usuários
- Login com email e senha
- Proteção de rotas autenticadas
- Gerenciamento de token JWT

### Produtos
- Listagem de produtos disponíveis
- Visualização de detalhes (nome, descrição, preço, estoque)
- Criação de pedidos a partir dos produtos

### Pedidos
- Criação de pedidos com múltiplos produtos
- Acompanhamento do status do pedido
- Listagem de pedidos realizados
- Status possíveis:
  - Recebido
  - Aguardando Pagamento
  - Pagamento Aprovado
  - Pagamento Rejeitado
  - Estoque Reservado
  - Reserva Cancelada

## Tecnologias Utilizadas

### Backend
- .NET 8
- Entity Framework Core
- SQLite
- JWT Authentication
- Swagger/OpenAPI

### Frontend
- Next.js 14
- TypeScript
- Material-UI
- React Hot Toast
- Axios

## Estrutura do Projeto

```
├── backend/
│   ├── OrderAPI/           # API REST
│   ├── Application/        # DTOs e Contratos
│   ├── Domain/            # Entidades
│   └── Infrastructure/    # Repositórios e DB
└── frontend/
    ├── src/
    │   ├── app/           # Páginas
    │   ├── components/    # Componentes React
    │   ├── services/      # Serviços da API
    │   ├── hooks/         # Hooks Customizados
    │   └── types/         # Definições TypeScript
    └── public/            # Arquivos Estáticos
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request 