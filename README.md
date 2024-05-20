# Iniciando o app de gerenciamento de livros

Este app faz parte do processo seletivo para a vaga de analista de desenvolvimento no FIT

## Instalando as dependências do backend

No diretório livraria/src/backend execute nesta ordem:

### `npm init -y`
### `npm i nodemon -D`
### `npm install sqlite3`
### `npm start`

Essa sequência habilita o servidor backend no seguinte endereço:
[http://localhost:3001](http://localhost:3001).

## Instalando as dependências do frontend

Retorne ao diretório livraria e execute os seguintes comandos:

 diretório src/backend execute nesta ordem:
### `npm init -y`
### `npm start`

Você pode acessar o app de gerenciamento de livros utilizando qualquer navegador pelo endereço:
[http://localhost:3000](http://localhost:3000).

## Adicionando um livro ao banco de dados

Ao iniciar a aplicação pela primeira vez, o banco de dados estará vazio. Para cadastrar um livro siga os passos:

1- Clique em Novo (botão à direita da barra de busca)
2- Você precisará informar qual o nome (título do livro), seguido do nome do autor(a), da data de publicação, seu resumo ou a descrição do livro e por fim escolher o arquivo de capa.
3- Clique em Salvar (botão verde) para finalizar o cadastro.

Você pode editar um livro no aplicativo seguindo os passos:

1- Na tela principal, clique sobre o livro que deseja editar.
2- Serão apresentados os detalhes do livro. Acima da capa do livro há um botão Editar.
3- Altere os campos que forem necessários e clique em Salvar. Caso desista da alteração, clique em cancelar.

Para excluir um livro do aplicativo, você deve seguir os passos:

1- Na tela principal, clique sobre o livro que deseja editar.
2- Acima da imagem de capa do livro há o botão Excluir (cor vermelha)
3- Clique sobre o botão Excluir e confirme a operação clicando em Sim na próxima tela (Tem certeza que deseja excluir este livro?)

Para realizar uma busca a partir do título do livro, basta digitar as primeiras letras na barra de busca da tela principal.
Os resultados correspondentes serão apresentados logo abaixo da barra de busca. Caso o título não seja encontrado, ele retornará uma página em branco (sem resultados para a busca).

Aproveite o aplicativo!
