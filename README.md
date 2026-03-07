# EverShop Store — ShipKit Template

Tienda e-commerce lista para desplegar desde ShipKit en un clic.

## Despliegue con ShipKit

| Campo | Valor |
|-------|-------|
| **Repo** | `https://github.com/Haissir/evershop-template` |
| **Stack** | Node.js |
| **Build command** | `npm run build` |
| **Init command** | *(dejar vacío)* |
| **Base de datos** | PostgreSQL |

> ShipKit crea la base de datos PostgreSQL automáticamente e inyecta todas las variables de entorno necesarias (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`). Las migraciones corren automáticamente al iniciar la app. No se requiere configuración manual.

### Acceso al panel de administración

Después del primer deploy, crea el usuario admin desde SSH en el servidor:

```bash
cd /ruta/de/tu/app
DB_HOST=127.0.0.1 DB_PORT=5432 DB_NAME=<db> DB_USER=<user> DB_PASSWORD=<pass> \
  npx evershop user:create --name "Admin" --email "admin@tienda.com" --password "Admin1234!"
```

Luego accede en `https://tu-dominio.com/admin`.

> Cambia la contraseña inmediatamente desde `Admin > Mi cuenta`.

## Desarrollo local

```bash
cp .env.example .env
# Edita .env con tus credenciales PostgreSQL locales

npm install
npm run dev
```
