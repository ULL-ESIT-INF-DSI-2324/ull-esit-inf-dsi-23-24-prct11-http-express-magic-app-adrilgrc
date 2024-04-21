[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-adrilgrc)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-adrilgrc/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-adrilgrc?branch=main)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-adrilgrc/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-adrilgrc/actions/workflows/node.js.yml)

# Práctica 11: Sistema Gestor de Cartas Magic usando un servidor EXPRESS

En ésta práctica se propone entre otras cosas adaptar el sistema gestor de cartas Magic implementado en la práctica 9 para que pueda ser utilizado en una estructura cliente-servidor. Para ello se utilizarán sockets y se implementará un servidor que permita a los clientes conectarse y realizar operaciones sobre la base de datos de ficheros de cartas.


## Introducción

En ésta práctica se plantean una serie de ejercicios que ayudan a profundizar y entender los conceptos del uso de promesas en Node. Además de las herramientas utilizadas en las prácticas individuales, se en ésta el manejo de la herramienta relativa a la calidad de código SonarCloud.

**IMPORTANTE**: El servidor debe estar ejecutándose al momento de ejecutar los test.

## Desarrollo

### IMPORTANTE: ERRORES RELACIONADOS CON LAS ACTIONS

En ésta práctica se me han producido una serie de errores de los que quiero dejar constancia. Por falta de tiempo, no he sido capaz de llegar a solucionarlos, y he tenido que hacer ciertos "apaños" para que funcione la action de tests.

Como podrá ver, el SonarCloud no está computando correctamente. Directamente el coveralls no está detectando ningún fichero al que se le esté haciendo testing directamente y entiendo que, por lo tanto, la github action de Coveralls está devolviendo un error al tratar de ejecutarse. Entiendo que no detecta que se estén ejecutando tests directamente sobre los ficheros ya que el único fichero de tests que se está ejecutando (el de `server.spec.ts`) solo hace uso del paquete request para simular peticiones al servidor, y no llama a a ninguna función directamente.

Como podrá ver, hay otro fichero de testing llamado `modificacion.spec.ts`. Ahí se encuentran las pruebas que realicé durante la modificación: sin embargo, hay un problema a la hora de pasarlos por el github action, y es que me devuelven errores donde no hay en local (por ejemplo, ficheros que no existen, cuando sí que existen y sus respectivas carpetas al ejecutar los test en local). Traté de solucionarlo pero no hubo éxito, así que tuve que dejar ese fichero todo comentado con el objetivo de que al menos la action de los tests pueda ser ejecutada, con el precio ya comentado anteriormente de que coveralls no detecte ningún fichero sobre el que se haga cubrimiento de código en los tests y, sonarcloud, al no tener la info del coverage, no pueda tampoco ejecutarse.

A modo de resumen:
- El testing funciona en local a expensas de que las action vayan mal.
- Si quiere comprobar el testing de la modificación, descomente el contenido del fichero `testing.spec.ts`.
- El código a parte ha sido probado a mano y los resultados han sido satisfactorios.

### Ejercicio 1: Implementación de un servidor Express

Para la implementación de ésta práctica, partiendo desde la práctica anterior, lo que se ha hecho es implementar un servidor Express que sea capaz de gestionar nuestras peticiones. Para ello, dentro del fichero `server.ts` se ha instanciado un nuevo servidor Express (`const server = express()`).

#### Los manejadores de peticiones

A continuación, lo que se ha hecho es crear una serie de manejadores que se encarguen de trabajar con las funciones de la aplicación gestora de cartas ya creada en prácticas anteriores. Para ello, se ha dotado al servidor de capacidad de responder en la ruta `/cards` de los siguientes tipos de peticiones:

- `GET`: Éste tipo de petición se encarga de devolver la información de la carta deseada por el usuario basada en los parámetros de la query. Sin embargo, es **importante** destacar que, si bien en ejercicios anteriores lo que hacía ésta función era o bien imprimir la carta formateada, o devolver el contenido formateado, en ésta práctica lo que se ha hecho es provocar que devuelva un objeto JSON del objeto de la carta, de tal forma que así se consigue un funcionamiento más similar a una API real, ya que el cliente podría trabajar con el objeto devuelto como se hace normalmente en la realidad. También cabe destacar que, por falta de tiempo, solo he podido hacer que cuando se envíe una petición GET, ésta responda a devolver una única carta mediante la llamada a `showCard` de la aplicación, ya que no he podido convertir a patrón callback la función que era encargada de listarlas todas debido a múltiples errores.
- `POST`: Ésta petición hará que el servidor se encargue de manejar el proceso de añadido de una carta mediante la función de la aplicación `addCard`, previamente convertida a patrón Callback. Internamente, los pasos serán los siguientes:
    - Se comprobará que en la query venga el parámetro de usuario. Si no es así se maneja error.
    - Se crea una nueva carta con el json enviado por el body de la petición.
    - Se intentará crear la carta llamando a la función `addCard`, se informará de éxito o error dependiendo de lo que devuelva el callback.
- `DELETE`: Se encarga del borrado de una carta concreta de la colección. En la query vienen indicados tanto el usuario al que deseamos borrarle la carta como el id de la carta en sí. En éste caso el body va vacío. El funcionamiento a grandes rasgos es el siguiente:
    - Se comprueba que en la query se haya mandado el usuario. Si no es así se informa de error.
    - Se comprueba que se haya mandado el identificador. De nuevo, si no es así, se informa de error.
    - Se procede a tratar de borrar la carta. Si se consigue, se informa, sino, se informa con el error que devuelve el callback de la función `removeCard`.
- `PATCH`: Se encarga de modificar una carta ya existente en la colección del usuario.
    - Se comprueba que en la query se haya mandado el usuario. Si no es así se informa de error.
    - Se comprueba que se haya mandado el identificador. De nuevo, si no es así, se informa de error.
    - Se procede a tratar de modificar la carta. Si se consigue, se informa, sino, se informa con el error que devuelve el callback de la función `modifyCard`.


### Modificación 1: Uso de Promesas con la API asíncrona de fs

Para la modificación 1 se ha modificado la clase `App` para que haga uso de la API asíncrona de promesas de fs. Para ello, se han modificado los métodos `readFile`,`writeFile` para que hagan uso de la API asíncrona de promesas de fs ha hecho que devuelvan una promesa, con el resultado dependiendo de lo que se ejecuta una vez se ha terminado de leer o escribir el fichero. Además, hay casos como el del método para revisar el contenido de un fichero, que se ha tenido que modificar para que haga uso de la API asíncrona de fs al método `access`.

Como se mencionó anteriormente, en éste caso los test funcionan de forma local, pero al tratar de ejecutar las actions comienzan a dar errores relacionados con los errores que están devolviendo las promesas, que aparecen distintos a los que hay en local, produciéndose errores donde no hay en local. Podrá comprobar que descomentando el código de los test del fichero `modificacion.spec.ts`, que funcionan correctamente.

## Conclusiones

En ésta práctica me he visto con problemas a la hora de realizar el testing, ya que se me queda colgado tras las pruebas y ello implica que las actions quedan colgadas y no pueden llegar a ejecutarse ni el coveralls ni el SonarCloud. Es por ello que los test del servidor están comentados, para evitar lo ya mencionado.

Sin embargo, es importante mencionar que la aplicación funciona correctamente, ya que he ido haciendo las pruebas a mano y en un principio tanto la conexión como las acciones que se pueden realizar funcionan correctamente.

## Bibliografía

- [Enunciado de la modificación](https://campusingenieriaytecnologia2324.ull.es/mod/assign/view.php?id=17360)
- [Enunciado de la práctica](https://ull-esit-inf-dsi-2324.github.io/prct09-fiilesystem-magic-app/)