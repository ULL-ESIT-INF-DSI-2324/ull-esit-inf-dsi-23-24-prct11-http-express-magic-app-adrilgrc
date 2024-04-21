[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/sNC2m9MU)

# Práctica 10: Sistema Gestor de Cartas Magic con Sockets

En ésta práctica se propone entre otras cosas adaptar el sistema gestor de cartas Magic implementado en la práctica 9 para que pueda ser utilizado en una estructura cliente-servidor. Para ello se utilizarán sockets y se implementará un servidor que permita a los clientes conectarse y realizar operaciones sobre la base de datos de ficheros de cartas.


## Introducción

En ésta práctica se plantean una serie de ejercicios que ayudan a profundizar y entender los conceptos del trato de ficheros con la API síncrona FS que proporciona Node. Además de las herramientas utilizadas en las prácticas individuales, se en ésta el manejo de la herramienta relativa a la calidad de código SonarCloud.

## Desarrollo

### Ejercicio 1: Implementación de los sockets

Para la implementación de los sockets se ha creado una clase `ManagerServer` que hereda de `EventEmiiter` y que se encarga de gestionar las conexiones de los clientes. En el constructor de la clase se crea un servidor que escucha en el puerto 60300 y se añade un listener para el evento 'data' que se encarga de gestionar las peticiones de los clientes.

Es importante destacar que, como el enunciado nos pedía no hacer uso del evento 'end' para conocer cuándo se ha terminado de enviar la información segmentada, se ha optado por incluir un separador de salto de línea, para que así el servidor pudiera mandar su request.

Tenemos un fichero `server.ts` que se encarga de crear una instancia de la clase ManagerServer y de iniciar el servidor. A su vez, éste fichero se encarga de gestionar las peticiones de los clientes (haciendo de intermediario entre el cliente y la App desarrollada en la práctica anterior).

Para gestionarlo, desglosa el contenido de la descripción y, en base al comando `command` recibido, ejecuta la acción correspondiente. Para ello, se ha hecho uso de un switch que evalúa el comando recibido y ejecuta la acción correspondiente.

También cabe mencionar que métodos de la clase `App` han sido modificados para que sean utilizados por la API asíncrona basada en callbacks de `fs`. Para ello, se ha seguido el patrón de diseño Callback.

### Modificación 1: Uso del patrón Callback con la API asíncrona de fs

Para la modificación 1 se ha modificado la clase `App` para que haga uso de la API asíncrona de fs. Para ello, se han modificado los métodos `readFile` y `writeFile` para que hagan uso de la API asíncrona de fs y se les ha añadido un callback que se ejecuta una vez se ha terminado de leer o escribir el fichero. Además, hay casos como el del método para revisar el contenido de un fichero, que se ha tenido que modificar para que haga uso de la API asíncrona de fs al método `access`.

En éste caso, sí que se han podido utilizar los test, ya que no se quedan colgados y se pueden ejecutar correctamente.

## Conclusiones

En ésta práctica me he visto con problemas a la hora de realizar el testing, ya que se me queda colgado tras las pruebas y ello implica que las actions quedan colgadas y no pueden llegar a ejecutarse ni el coveralls ni el SonarCloud. Es por ello que los test del servidor están comentados, para evitar lo ya mencionado.

Sin embargo, es importante mencionar que la aplicación funciona correctamente, ya que he ido haciendo las pruebas a mano y en un principio tanto la conexión como las acciones que se pueden realizar funcionan correctamente.

## Bibliografía

- [Enunciado de la modificación](https://campusingenieriaytecnologia2324.ull.es/mod/assign/view.php?id=17360)
- [Enunciado de la práctica](https://ull-esit-inf-dsi-2324.github.io/prct09-fiilesystem-magic-app/)