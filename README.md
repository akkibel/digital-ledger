# 📒 Digital Ledger — Grocery Manager

> Aplicación web PWA mobile-first para gestionar clientes, deudas, pagos y catálogo de productos en tu negocio.

---

## ✨ Características

### 👥 Gestión de Clientes
- Registrar clientes con nombre y teléfono opcional.
- Ver el **saldo total** de cada cliente en tiempo real.
- Registrar **deudas** y **pagos** individuales o saldar el total de un clic.
- Filtrar clientes por nombre con búsqueda instantánea.
- Eliminar clientes junto con su historial.

### 💳 Transacciones
- Registrar deudas con monto, detalle y fecha automática.
- Registrar pagos parciales o totales.
- Calculadora de pesaje integrada: ingresá kilos y precio/kg para calcular el monto automáticamente.
- **Saldo a favor** cuando los pagos superan las deudas.

### 📦 Catálogo de Productos
- Crear **subcategorías** (ej. Lácteos, Fiambres, Bebidas).
- Agregar productos con nombre, precio y foto (cámara o galería).
- Buscar productos en todas las categorías.
- Eliminar productos y subcategorías.

### 🛒 Lista de Faltantes
- Lista rápida de productos que necesitás reponer.
- Marcar como comprado con un toque.
- Eliminar ítems individualmente.

### 📱 WhatsApp
- Generar un mensaje listo para enviar por WhatsApp a cada cliente con su saldo y últimos movimientos.

### 🌍 Multi-moneda y Multi-idioma
- Soporte para **Español** e **Inglés**.
- Selección de país al configurar la app con símbolo de moneda automático:
  - Paraguay (₲), Argentina ($), México ($), España (€), Perú (S/), Brasil (R$), y más.

### ⚙️ Configuración Inicial
- Nombre de la empresa.
- Logo personalizado (cargado desde el dispositivo).
- Idioma de la interfaz.
- País y moneda.

---

## 🚀 Tecnologías

| Tecnología | Descripción |
|---|---|
| [React 19](https://react.dev/) | UI reactiva basada en componentes |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático para mayor robustez |
| [Vite 8](https://vite.dev/) | Build tool ultrarrápido |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos utilitarios modernos |
| [Lucide React](https://lucide.dev/) | Iconografía limpia y consistente |
| [PWA (Service Worker)](https://web.dev/progressive-web-apps/) | Instalable y funciona offline |
| `localStorage` | Persistencia de datos local, sin backend |

---

## 📂 Estructura del Proyecto

```
DSSC/
├── public/
│   ├── manifest.json       # Configuración PWA
│   └── sw.js               # Service Worker
├── src/
│   ├── components/
│   │   ├── Setup.tsx           # Pantalla de configuración inicial
│   │   ├── Dashboard.tsx       # Panel principal con clientes
│   │   ├── TransactionModal.tsx # Modal para registrar deudas/pagos
│   │   ├── NewClientModal.tsx   # Modal para agregar cliente
│   │   ├── Catalog.tsx          # Catálogo de productos
│   │   ├── ProductModal.tsx     # Modal para agregar producto
│   │   └── MissingItems.tsx     # Lista de faltantes
│   ├── hooks/
│   │   └── useLocalStorage.ts  # Hook para persistencia local
│   ├── i18n/
│   │   └── index.ts            # Traducciones ES/EN
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

---

## 🛠️ Instalación y Desarrollo

### Requisitos
- Node.js 18+
- npm 9+

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/akkibel/digital-ledger.git
cd digital-ledger/DSSC

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`.

### Build para producción

```bash
npm run build
```

Los archivos de salida se generarán en la carpeta `dist/`.

---

## 📦 Deploy en Vercel

Este proyecto está configurado para desplegarse en [Vercel](https://vercel.com).

> ⚠️ **Importante:** Como la app vive dentro de la subcarpeta `DSSC/`, debés configurar el **Root Directory** en Vercel:
> 1. Ir a **Settings** → **General** del proyecto.
> 2. En **Root Directory**, escribir: `DSSC`
> 3. Guardar y redesplegar.

---

## 💾 Datos y Privacidad

Toda la información (clientes, transacciones, productos) se almacena **exclusivamente en el dispositivo** del usuario mediante `localStorage`. No se envía ningún dato a servidores externos.

---

## 📋 Roadmap / Ideas Futuras

- [ ] Exportar historial a PDF o Excel
- [ ] Sincronización en la nube (opcional)
- [ ] Estadísticas y gráficos de deudas
- [ ] Notificaciones de recordatorio de pago
- [ ] Edición de transacciones existentes

---

## 📄 Licencia

Este proyecto es de uso privado. Todos los derechos reservados.
