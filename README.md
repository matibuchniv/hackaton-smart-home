# hackaton-smart-home

## resumen del proyecto
Nuestro proyecto usa feed de una camara y valores de un sensor de CO2, combinados con datos de onboarding para realizar diferentes acciones sobre dispositivos inteligenes en el hogar.
Gracias a la toma de informacion relevante sobre el grupo familiar a la hora de hacer un onboarding web, somos capaces de ejecutar instrucciones a dispositivos iot como servos de ventanas y llaves de paso automaticas y comunicacion con el usuario y sus contactos de emergencia, usando thresholds adaptados a las necesidades de cada usuario.

## alcance de la demo
Debido a la restriccion a las restricciones fisicas y temporales inmediatas, tenemos un MVP que actualmente corre en un entorno de testing, en el cual estan presentes las siguientes features:

- se pueden cargar datos de un usuario para determinar si este tiene o no un factor de riesgo
- en base a esos datos, se ejecutan planes de accion pre-establecidos
- se mandan diferentes mensajes por whatsapp a un mismo numero pre-configurado usando Twillio (hacer un cliente de SMS/whatsapp requiere dinero y/o un rango horario extendido)
- se usa feed de una camara, procesado por un microservicio custom, que se encarga de notificar si hay o no usuarios en la casa, lo cual podria servir para modificar el plan de accion
- actualmente el servidor es capaz de conectarse realmente a home-assistance de google para obtener dispositivos, para poder visualizar la aplicacion realizando acciones en tiempo real, decidimos mockear los inputs de el sensor de co2, las ventanas y la llave de paso inteligentes.
- interfaces reactivas, tanto para web como para mobile.

## flujo de usuario actual

### Onboarding (/)
esta vista permite al usuario cargar los datos relevantes para definir los thresholds de co2, se redirige a /dispositivos luego

### Dispositivos (/dispositivos)
tiene un login reporesentativo para home assistance ya que las credenciales estan cargadas en la base de datos, ademas permite observar datos reales de los dispositivos cargados en el sistema.

### DashBoard (/dashboard)
permite obervar el estado de lo que miden los sensores y el estado de los dispositivos actuadores en tiempo real.

## Componentes logicos o infraestructura
Actualmente nuestro proyecta cuenta con un frontEnd hecho en react, un servidor en java, y un microservicio de python para el procesamiento de los datos de la camara.

## Guia de deploy
El deploy se puede realizar manualmente, o se puede usar docker para no tener que instalar dependencias, aunque gracias a maven, y a npm, con tener la version 21+ de java, deberia alcanzar.
Para ambos deploys, hay que hacer git checkout a master

### Con docker file
pegar "docker compose up --build" en la raiz del directorio
el front correria en localhost ya que el puerto seleccionado es 80, de querer usar otro puerto, simplemente se puede modificar el dofckerfile del front-end

### Sin docker file

para correr el programa sin docker file, se deben abrir dos consolas en paralelo, una para el back, otra para el front

en la primer consola:
cd backend
mvn spring-boot:run (si no se tiene maven, instalar maven con un packet manager, en linux ubuntu se usa sudo apt install maven)

en la segunda consola:
cd frontend
npm install
npm run dev

el proyecto deberia poderse correr en localhost:5173
