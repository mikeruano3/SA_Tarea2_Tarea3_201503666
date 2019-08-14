# Software Avanzado
## Tarea 2, Tarea 3

## Arquitectura
- La aplicación está conformada por 3 servicios: `Solicitud`, `Piloto`, `Rastreo`. 
- Estos servicios a su vez se comunican con el _Enterprise Service Bus_ (ESB) el cual es el encargado de hacer uso de los servicios para resolver las peticiones hechas.
- Existe un cliente que se comunica exclusivamente con el _ESB_ para procesar las peticiones.

![Arquitectura](diagrama1.png)

## Servicios Disponibles
### Solicitud
#### Funcionalidad
Recibe como parámetro una ubicación y devuelve la cantidad de viajes que existen en cada ruta
#### Clases
__recibirSolicitud__: contiene toda la lógica para consultar las rutas
__ruta__: es una clase que contiene toda la informacion de cada ruta
#### Comunicación
Este servicio envía y recibe datos del _ESB_.
#### No de puerto
Puerto 301


## Ejecutar Servicios
* Sin _daemon_
```
cd Solicitud
node recibirSolicitud.js
```
* Con _daemon_
```
nodemon recibirSolicitud.js
```

## Arquitectura

![Arquitectura](diagrama1.png)

## Otra información
* Instalar Express
```
npm install --save express
```
* Instalar Axios
```
npm install --save axios
```

* Recursos utilizados
* * Create A Microservice-based Web Application: [Link Youtube](https://www.youtube.com/playlist?list=PLDmvslp_VR0xZGhJHMjy5dozCDJYZK6W-)
* * Tutorial Express.js [Link TutorialsPoint](https://www.tutorialspoint.com/expressjs/expressjs_url_building.htm)
* * Tutorial Imports Exports [Link Tutorial](https://adrianmejia.com/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/)
* * Tutorial Requests Sincronas [Link StackOverflow](https://stackoverflow.com/questions/46347778/how-to-make-axios-synchronous/46347906)
* * Documentacion Express.js [Link Express JS](https://expressjs.com/en/4x/api.html#app.listen)