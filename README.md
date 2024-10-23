# HeroesApp
    Este proyecto es una aplicación SPA (Single Page Application) desarrollada en Angular 16 para gestionar héroes.

## Características
- CRUD de héroes (Crear, Leer, Actualizar, Eliminar)
- Paginación y búsqueda de héroes
- Validación de formularios
- Uso de Angular Material para el diseño de la interfaz

## Requisitos previos

1. **Instalar Node.js con `nvm`:**  
   Si utilizas `nvm` para gestionar versiones de Node.js, asegúrate de instalar la versión 16.14.0 con el siguiente comando:

   nvm install 16.14.0

2. Instalar Angular CLI:

    Para instalar Angular CLI en la versión 16.2.16, ejecuta el siguiente comando:

    npm install -g @angular/cli@16.2.16

    --Configuración e Instalación--

1. Clonar el repositorio:

        git clone <https://github.com/davidrom555/HeroesApp.git>
        cd heroes-app   

2. Instalar las dependencias:

    npm install

3.  Iniciar el servidor de desarrollo:
        Ejecuta ng serve para iniciar el servidor de desarrollo. Navega a http://localhost:4200/. 
4.  Construir el proyecto:
        Ejecuta ng build para construir el proyecto. Los archivos resultantes se almacenarán en el directorio dist/.

        ng build
5.  Gestión de imágenes:
        Las imágenes utilizadas para agregar un nuevo héroe se encuentran en el directorio assets/img.

5. Pruebas unitarias:
        Ejecuta las pruebas unitarias:
        
        ng test 
6. prueba en vivo:
        El proyecto ha sido subido para pruebas directas. Puedes acceder a la aplicación en vivo aquí: 

        https://heroes-app-min-data.netlify.app/