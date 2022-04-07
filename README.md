# CRUD com NodeJs e MongoDB

<p>A sigla <strong>CRUD</strong> é um acrônimo, de quatro operações básicas: Create, Read, Update e Delete. </p> 
<p>Este repositório não só apenas serve de estudo mas também para ajudar aqueles que possuem dificuldade na criação das 4 operações!</p>

# Desenvolvido com
 <ul>
  <li><img align="center" alt="Gabriel-Node" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"><a href="https://nodejs.org/en/">NodeJs</a></li>
  <li><img align="center" alt="Gabriel-Mongodb" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"><a href="https://www.mongodb.com/pt-br">MongoDB</a></li>
  <li><img align="center" alt="Gabriel-docker" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg"><a href="https://www.docker.com/">Docker</a></li>
 </ul>
 
 # Rodando o projeto localmente
 
 
<p>Segue abaixo um pequeno tutorial de como rodar o projeto na sua máquina:</p>

<p>1 - Clone o repositório e instale as dependencias:</p>
<code>git clone https://github.com/GabrielCordeiro2412/CRUD_NodeJS.git</code><br/><br/>
<code>yarn install ou npm install </code>
<hr>

<p>2 - Crie uma instância do MongoDB e mapeie sua porta 27017:</p>
<code>docker run --name mongodb -d -p 27017:27017 mongo</code><br/><br/>
<p>Quando quiser parar este container digite no terminal</p>
<code>docker container stop mongodb </code>
<hr>

<p>3 - Agora que temos instalas as dependencias do projeto e nosso container no docker, vamos inicar a aplicação</p>
<code>yarn dev</code>
