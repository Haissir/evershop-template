# EverShop Store — ShipKit Template

Tienda e-commerce lista para desplegar desde ShipKit en un clic.

## Despliegue con ShipKit

Selecciona la plantilla **EverShop** desde la UI de ShipKit. Se configuran automáticamente:

| Campo | Valor |
|-------|-------|
| **Stack** | Node.js |
| **Build command** | `npm run build` |
| **Base de datos** | PostgreSQL (creada automáticamente) |

### Opciones configurables en el formulario

| Opción | Valores disponibles |
|--------|-------------------|
| **Idioma** | Español (`es`), English (`en`) |
| **Divisa** | USD, COP, EUR, MXN, ARS |

ShipKit escribe `config/default.json` con estos valores antes del build.

### Acceso al panel de administración

El usuario admin se crea automáticamente ~90 segundos después del deploy:

- **Email:** `admin@tienda.com`
- **Contraseña:** `Admin1234!`
- **Panel:** `https://tu-dominio.com/admin`

> Cambia la contraseña inmediatamente desde `Admin > Mi cuenta`.

## Desarrollo local

```bash
cp .env.example .env
# Edita .env con tus credenciales PostgreSQL locales

npm install
npm run dev
```
