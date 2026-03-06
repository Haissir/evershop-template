# EverShop Store Template

Template de tienda e-commerce lista para desplegar con ShipKit.

## Configuración en ShipKit

| Campo | Valor |
|-------|-------|
| **Repo** | URL de este repositorio |
| **Stack** | Node.js |
| **Build command** | `npm run build` |
| **Init command** | `npx evershop install` |
| **Base de datos** | MySQL |

## Variables de entorno requeridas

Configura las siguientes variables en ShipKit al momento del deploy:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=<nombre_db>
DB_USER=<usuario_db>
DB_PASSWORD=<password_db>
NODE_ENV=production
```

> Las credenciales de base de datos son generadas automáticamente por ShipKit al seleccionar MySQL.

## Desarrollo local

```bash
cp .env.example .env
# Edita .env con tus credenciales locales
npm install
npx evershop install  # Inicializa la base de datos (solo primera vez)
npm run dev
```
