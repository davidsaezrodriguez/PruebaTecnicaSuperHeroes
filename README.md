Para disponer de todas las funcionalidades del proyecto deberemos ejecutar tanto el proyecto como el servidor mock de json.
Para ello deberemos ejecutar los siguientes comandos en dos consolas diferentes:
1 - npm start
2 - npm run apimock

# PruebaTecnicaSuperHeroes

Proyecto realizado para una prueba tecnica.
El proyecto es en angular 14 y trata sobre una gestion de super heroes.

## Pasos a seguir para ejecutarlo

Dado que para la prueba no teniamos un backend, decidi crear un servidor con jsonserver con el que podemos emitir un JSON como si fuera una pequeña API dandonos posibilidad de hacer get, post, patch o delete y asi poder hacer la prueba algo mas realista.
Para ejecutar el proyecto primero arrancaremos el servidor con `npm start`.
Y posteriormente tendremos que arrancar el servidor de jsonserver para el cual utilizaremos el comando `npm run apimock`.
