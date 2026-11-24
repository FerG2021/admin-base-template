# admin-base-template

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Agregar una cuenta

Crea `src/config/accounts/<cuenta>/` con `<cuenta>.account.js` y
`modules.configuration.<cuenta>.js`. Las cuentas se descubren automáticamente
desde esos archivos. Los logos pueden guardarse en la misma carpeta e importarse
desde `<cuenta>.account.js`; configura `tenant.title`, `tenant.subtitle` y
`tenant.logo` para mostrarlos en el sidebar.

## Agregar un módulo

Crea una carpeta en `src/modules/<modulo>/` con un archivo `<modulo>.routes.js`
que exporte un arreglo de rutas, y un archivo `<modulo>.configuration.js` con
los datos de navegación y configuración predeterminados. Las rutas se registran
automáticamente y el menú lateral toma el nombre de ruta inicial de ese módulo.

Para sobrescribir configuración de una cuenta, agrega
`<modulo>.<cuenta>.configuration.js` en la misma carpeta. La visibilidad por
cuenta se controla en `src/config/accounts/<cuenta>/modules.configuration.<cuenta>.js`
mediante `disabledModules`; los módulos nuevos están habilitados por defecto.
Los endpoints compartidos se definen en `src/api/endpoints.js`.

## Acciones CRUD compartidas

`src/components/DataTable.vue` emite `create`, `edit(item)` y `delete(item)`;
activa sus botones con `allowCreate`, `allowEdit` y `allowDelete`. Cada módulo
puede importar `CrudFormDialog.vue` para crear/editar y colocar sus propios
campos en el slot del formulario, e importar `DeleteConfirmDialog.vue` para
confirmar eliminaciones. Los diálogos emiten `submit` y `confirm`: el módulo
debe conectar esos eventos con su store o servicio y cerrar el diálogo cuando
la operación termine correctamente. También se pueden personalizar celdas de
la tabla con slots `cell-<field>` y agregar controles mediante el slot `toolbar`.
# admin-base-template
