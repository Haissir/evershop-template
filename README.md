# EverShop Store — ShipKit Template

Tienda e-commerce lista para desplegar desde ShipKit en un clic.

Usa **EverShop 2.3.x** (Node.js >= 20). La versión 1.x tiene vulnerabilidades sin corrección
(CVE-2026-72843 toma de cuentas de clientes, CVE-2025-12919 acceso a pedidos ajenos).

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
- **Contraseña:** `Admin1234x`
- **Panel:** `https://tu-dominio.com/admin`

> Para cambiar la contraseña: ve al proyecto en ShipKit y haz clic en el ícono 🔑 junto al botón de Re-deploy,
> o desde el panel: **Mi perfil → Cambiar contraseña**.

## Extensión `admin-profile`

Añade la página **Mi perfil → Cambiar contraseña** al panel de administración.

- El código fuente está en `extensions/admin-profile/src/`.
- EverShop 2.x carga las extensiones compiladas desde `dist/`. `npm run build` ejecuta primero
  `build:extensions` (SWC, con la misma configuración que EverShop) y después `evershop build`.
- `dist/` no se versiona: se genera en cada build.

## Seguridad de dependencias

`package.json` incluye `overrides` de `@graphql-tools/*` porque EverShop 2.3.0 fija versiones
con una vulnerabilidad de prototype pollution. Revisar si siguen siendo necesarios al subir de versión
de EverShop (`npm audit --omit=dev`).

## Desarrollo local

```bash
cp .env.example .env
# Edita .env con tus credenciales PostgreSQL locales

npm install
npm run dev
```
