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
