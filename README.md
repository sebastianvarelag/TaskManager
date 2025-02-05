> Gestor de Tareas - Prueba Técnica | Sebastián Varela

## Descripción
Solución para la primera prueba técnica de INFORMA Colombia para el puesto Desarrollador Full Stack Junior. Este proyecto consiste en crear un gestor de tareas en React con consumo de APIs RESTful usando Java como backend

## Links

Front-end deploy: https://task-manager-sv.vercel.app/

Back-end deploy: https://taskmanager-production-sv.up.railway.app/api

## Tecnologías

- **Backend**
  - Java 17 
  - Spring Boot 3 
  - PostgreSQL
  - Hibernate / JPA
- **Frontend**
  - React 
  - Bootstrap 5
  
## Configuración del Entorno

### Requisitos del Sistema

- Java 17
- Node.js
- PostgreSQL
- Maven

### Instrucciones de Configuración Local

#### Backend

1.  Clonar el repositorio
  ```sh
    git clone https://github.com/sebastianvarelag/TaskManager.git
  ```

2. Crear una base de datos en PostgreSQL llamada 'db_taskmanager' y ejecuta el siguiente script:
``` sql
CREATE TABLE public.tasks (
		id serial4 NOT NULL,
		title varchar(20) NOT NULL,
		description varchar(100) NULL,
		completed bool DEFAULT false NULL
);
```
3.  Configura el proyecto con las variables de entorno locales. Para esto hicimos uso del dotEnv.
	- Crea un archivo .env en la carpeta raíz de backend.
	- Ajustar las variables de entorno localmente según su configuración:  

		````ini
# .env
DB_URL=jdbc: postgresql://localhost:5432/db_taskmanager
DB_USERNAME=[Tu nombre de usuario local de Postgres]
DB_PASSWORD=[Tu contraseña local de postgres]
PORT=8080````
		Sin el espacio entre jdbc: y postgresql:
4.  Abre la terminal y navega hasta la carpeta  `/backend/ `
5.  Ejecuta el backend usando `mvn spring-boot:run`.

#### Frontend

1.  Clonar el repositorio (Si no lo has hecho previamente)
  ```sh
    git clone https://github.com/sebastianvarelag/TaskManager.git
  ```
 
2. Abre la terminal y navega hasta la carpeta `/frontend/`

3. Instala las dependencias del frontend con `npm install`.

4.  Configura el proyecto con las variables de entorno de Vite
	- Crea un archivo .env en la carpeta raíz de frontend
	
		````ini
# .env
VITE_API_URL=http://localhost:8080/api````

4. Por último inicial el servidor local del frontend con el comando `npm run dev`.

## Autor

👨🏻‍💻 **Sebastián Varela Giraldo**

- Linkedin: [Linkedin](https://www.linkedin.com/in/sebastianvarelag/)
- GitHub: [@sebastianvarelag](https://github.com/sebastianvarelag)