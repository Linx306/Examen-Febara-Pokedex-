# Pokedex Manager

Aplicación web full-stack diseñada para gestionar un equipo de Pokémon, integrada con la PokéAPI y un sistema de persistencia de datos relacional.

## Stack Tecnológico
* **Frontend:** React (con Vite).
* **Backend:** Node.js con Express, JWT (JSON Web Tokens) para autenticación y bcryptjs para seguridad de contraseñas.
* **Base de Datos:** MySQL.
* **Control de Versiones:** Git / GitHub.
---
## Estructura del Proyecto
```text
Examen-Febara-Pokedex/
├── Backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── index.js
│   ├── .env
│   ├── package-lock.json
│   └── package.json
├── Frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── .gitignore
└── README.md
```
## Requisitos de instalacion
* Tener instalado Node.js (version 18 o superior sugerida)

* Un servidor de MySql(MySql Workbench recomendado)

* Git para clonar el proyecto
# Pasos para instalacion

### 1-Clonar repositorio
Abrir una terminal de comandos y clonar el repositorio del proyecto en la maquina local
```bash
git clone <url-de-tu-repositorio-en-github>
cd Examen-Febara-Pokedex
```
### 2-Configurar Base de datos(MySql)
* Abrir un gestor de MySql
* Ejecutar el siguiente script Sql para crear la base de datos y sus tablas necesarias para el proyecto:
```sql
CREATE DATABASE IF NOT EXISTS pokedex_db;
USE pokedex_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    poke_id INT NOT NULL,
    poke_name VARCHAR(100) NOT NULL,
    poke_sprite VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
### 3-Configuracion y ejecucion del Backend
1-Desde la carpeta raiz del proyecto, muevete a la carpeta backend
2-Abrir una terminal de comandos en la carpeta backend y escribir el siguiente comando para instalar todas las dependecias necesarias:
```bash
npm install
```
3-Crear un archivo de configruacion llamado .env en la carpeta backend con el siguiente contenido adentro(Remplazar los datos necesarios por tus configuraciones locales de MySql):
```text
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_de_mysql
DB_NAME=pokedex_db
JWT_SECRET=super_secreto_poke_key_2026
```
4-Iniciar el servidor backend, en la terminal de la carpeta backend escribir el siguiente comando:
```bash
node src/index.js
```
Debera aparecer en la consola mensajes de confirmación indicando que en el puerto 5000 se está corriendo el servidor y la base de datos está conectada con exito.

### 4-Configuracion y ejecucion del Frontend
1-Abrir una nueva terminal(El backend debe permanecer abierto y corriendo)
2-Ir a la carpeta frontend desde la carpeta raiz
3-En la nueva terminal escribir el siguiente comando para instalar las dependencias necesarias:
```bash
npm install
```
4-En la misma terminal una vez instaladas las dependencias, escribir el siguiente comando para iniciar el entorno en el frontend:
```bash
npm run dev
```
La terminal escribirá un enlace local, puedes hacer click en el o copiarlo en el navegador para utilizar la aplicacion.

## Como usar la aplicacion
### Login y registro

1-Al iniciar la aplicación la primera pantalla sera el login con dos campos de correo y contraseña
<img width="665" height="522" alt="image" src="https://github.com/user-attachments/assets/e30932d9-32bf-42b5-8e56-e4a547c7baee" />

2-Primero es necesario entrar al campo de Registrarse en la parte inferior derecha
<img width="505" height="365" alt="image" src="https://github.com/user-attachments/assets/1512a802-ad06-4523-a32d-8e585732a269" />

3-Luego de completar el registro es necesario con el mismo correo y contraseña Iniciar sesión
### Pantalla principal y registro de pokemons
<img width="574" height="498" alt="image" src="https://github.com/user-attachments/assets/0f01ee18-917d-44b8-b6f7-c8696f2166ab" />

1-En esta pantalla se pueden buscar y guardar pokemon en un equipo de hasta 6 Pokemones, los mismos se podran buscar por nombre o por numero en la pokedex.

<img width="562" height="730" alt="image" src="https://github.com/user-attachments/assets/9bb542a8-f356-4d53-98fb-b4382394fb5e" />

2-Al agregar al pokemon al equipo usando el botón amarillo debajo de la búsqueda este se añadirá al equipo 
<img width="548" height="778" alt="image" src="https://github.com/user-attachments/assets/07d7d67e-5a4f-46f1-9b21-cf330c9b0a00" />

Se puede seguir este proceso hasta completar el equipo con 6 o menos pokemon 
<img width="558" height="805" alt="image" src="https://github.com/user-attachments/assets/2753b231-2ac4-431c-a9e3-ca81962076f8" />

3-Una vez el equipo este completo se puede dar click el boton verde de Guardar equipo para guardar con exito el equipo y cada que cierres sesion y vuelvas a entrar estara tu equipo justo como lo dejaste.
<img width="569" height="527" alt="image" src="https://github.com/user-attachments/assets/ff3384dc-d0f5-4c1e-8f04-00dfcd25ce40" />

## Listo! Muchas gracias por usar la aplicación y suerte en tu travesia entrenador!
(No nos hacemos responsables por los accidentes ocurridos por ataques pokemon inefectivos y falta de pokemons en la pokedex en estos casos dirigirse con su professor local)
