# Sistema de Diseño — Storybook

Catálogo inicial de componentes HTML/CSS. Incluye el botón primario y sus variables de diseño.

## Desarrollo local

```sh
npm install
npm run storybook
```

## Generar el catálogo

```sh
npm run build-storybook
```

El resultado se guarda en `storybook-static/`.

## Netlify

Vincular este repositorio al proyecto existente de Netlify y seleccionar la rama de producción. `netlify.toml` configura el comando de compilación y la carpeta publicada. Cada cambio en la rama de producción iniciará una nueva publicación si los builds están habilitados.

## Archivos principales

- `tokens.css`: variables de diseño.
- `ds-button.css`: estilos del botón.
- `ds-button.stories.js`: ejemplo y controles del botón.
- `.storybook/main.js`: configuración del catálogo.

Las variables están definidas manualmente en CSS. Este proyecto todavía no incluye sincronización con Figma, Style Dictionary ni componentes Angular.

La configuración original de GitLab se conserva en `.gitlab-ci.yml`.
