# ADP — Associação Desportiva do Piquiri

Bem-vindo ao repositório oficial da **Associação Desportiva do Piquiri (ADP)**. Este é um portal moderno e dinâmico desenvolvido para conectar torcedores, atletas e a comunidade ao coração do clube paranaense.

"Das águas nasce a força" — Inspirada no Rio Piquiri, a ADP leva a energia do interior para os campos e quadras.

## 🚀 Sobre o Projeto

Este site foi construído utilizando as tecnologias mais modernas do ecossistema web para garantir performance, SEO de alta qualidade e uma experiência de usuário impecável. O sistema conta com um portal público informativo e um painel administrativo completo para gestão de conteúdo.

### Principais Funcionalidades

*   **Portal de Notícias:** Cobertura completa de todas as modalidades com sistema de destaques.
*   **Gestão de Modalidades:** Espaço dedicado ao Futebol (Masculino), Vôlei (Feminino), Basquete e Categorias de Base.
*   **Match Ticker:** Acompanhamento de próximos jogos e resultados recentes.
*   **Painel Administrativo Discreto:** Interface protegida para gerenciamento de:
    *   **Jogadores:** Cadastro, estatísticas (gols, assistências, partidas) e fotos.
    *   **Notícias:** Publicação e edição de matérias com suporte a categorias.
    *   **Jogos:** Agendamento de partidas, definição de placares e status (em breve, encerrado, etc).
*   **Design Responsivo & Dark Mode:** Totalmente adaptado para dispositivos móveis e com suporte a temas claro e escuro.

## 🛠️ Tecnologias Utilizadas

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
*   **Banco de Dados:** SQLite com [Prisma ORM](https://www.prisma.io/)
*   **Animações:** [Framer Motion](https://www.framer.com/motion/)
*   **Autenticação:** Sistema customizado via API Routes

## 📁 Estrutura de Pastas

```text
src/
├── app/            # Rotas e Páginas (Next.js App Router)
│   ├── admin/      # Rotas do painel administrativo
│   ├── api/        # Endpoints da API (Auth, Jogadores, Notícias, etc)
│   └── (público)/  # Notícias, Clube, Modalidades, Contato
├── components/     # Componentes React reutilizáveis
│   ├── admin/      # Componentes exclusivos do painel administrativo
│   ├── adp/        # Componentes principais do site (Navbar, Hero, etc)
│   └── ui/         # Componentes base da interface (Shadcn)
├── lib/            # Configurações de banco de dados e utilitários
└── prisma/         # Esquema do banco de dados e migrações
```

## ⚙️ Como Executar o Projeto

### Pré-requisitos
*   Node.js instalado
*   NPM ou Yarn

### Passo a Passo

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Configure as variáveis de ambiente:**
    O projeto já vem com um `.env` base. Certifique-se de que a `DATABASE_URL` aponta para o local correto.

3.  **Prepare o Banco de Dados:**
    ```bash
    npx prisma db push
    ```

4.  **Popule o banco com dados iniciais (Seed):**
    Com o servidor rodando, acesse a rota de seed ou use o comando:
    ```bash
    # Se estiver usando PowerShell
    Invoke-RestMethod -Uri http://localhost:3000/api/seed -Method Post
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

6.  **Acesse o site:**
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🔐 Acesso Administrativo

Para gerenciar o conteúdo do site:
1.  Acesse `http://localhost:3000/admin`.
2.  **Login:** `admin@adp.com.br`
3.  **Senha:** `adp2026`

---
*Desenvolvido para a Associação Desportiva do Piquiri — 2026.* adp2026%100
