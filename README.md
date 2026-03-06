# EverShop Store — ShipKit Template

Tienda e-commerce lista para desplegar desde ShipKit en un clic.

## Despliegue con ShipKit

| Campo | Valor |
|-------|-------|
| **Repo** | `https://github.com/Haissir/evershop-template` |
| **Stack** | Node.js |
| **Build command** | `npm run build` |
| **Init command** | `npx evershop install` |
| **Base de datos** | MySQL |

> ShipKit crea la base de datos automáticamente e inyecta todas las variables de entorno necesarias (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`). No se requiere configuración manual de variables.

## Desarrollo local

```bash
cp .env.example .env
# Edita .env con tus credenciales MySQL locales

npm install
npx evershop install   # Crea las tablas en la BD (solo primera vez)
npm run dev
```
