# AviCar

## Resumen
Este proyecto es una sencilla aplicación web de gestión de usuarios(clientes y recepcionistas) que permite a los usuarios de tipo cliente el registro de reservación de vuelos y alquiler de vehículos así como el amacenamiento de una foto de perfil. Utiliza una arquitectura cliente-servidor, donde el frontend está desarrollado en React y el backend en Express con TypeScript. Las fotos de perfil se almacenan en AWS S3 y los datos de los usuarios se almacenas en bases de datos de MongoDB. El frontend como el backend y la base de datos están contenedorizados usando Docker.

## Arquitectura

### Cliente
- **Framework**: React
- **Comunicación con el servidor**: Axios
- **Funcionalidad**:
  - Interfaz de usuario para listar y generar reservaciones y vuelos y reportes de los mismos según el tipo de usuario.
  - Formularios de autenticación de usuario (registro y login).
  - Formularios de registro de usuarios y otros para el administrador
  - Visualización de información de usuarios y datos registrados para el administrador.

### Servidor
- **Framework**: Express
- **Lenguaje**: TypeScript
- **Funcionalidad**:
  - API RESTful para gestionar usuarios y fotografías.
  - Autenticación y autorización de usuarios.
  - Gestión de fotografías con AWS S3 (subida, descarga).
  - Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en las bases de datos MongoDB.

### Base de Datos
- **Motor**: MongoDB
- **Funcionalidad**:
  - Almacenamiento de datos de usuarios, reservación de vuelos y alquier de vehiculos así como su estado de aprovación.

### Almacenamiento en la Nube
- **Servicio**: AWS S3
- **Funcionalidad**:
  - Almacenamiento de fotos de perfil subidos por los usuarios.
  - Gestión de permisos y acceso a fotografías.

## Contenedores

### Docker
- **Frontend**:
  - Dockerfile para construir la aplicación React.
  - Imagen basada en Node.js para ejecutar el servidor de desarrollo de React.
- **Backend**:
  - Dockerfile para construir la aplicación Express con TypeScript.
  - Imagen basada en Node.js para ejecutar el servidor Express.
- **Base de Datos**:
  - Imagen de MongoDB desde Docker Hub.
  
- **Docker Compose**:
  - Archivo `docker-compose.yml` para orquestar los contenedores de frontend, backend y base de datos.
