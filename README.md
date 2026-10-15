# Sistema de Diseño — Storybook

Catálogo inicial de componentes HTML/CSS. Incluye el botón primario y el campo de texto Input.

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

## Input / Text Field

En Storybook: **Componentes → Input → Probar componente**. Los controles permiten elegir estilo Delineado/Relleno, tamaño S/M/L/XL, estado, contenido inicial, texto de soporte y contador. **Todas las variantes** muestra las 96 combinaciones principales.

- `ds-input.js`: campo nativo, label asociado, ayuda accesible y contador con límite de caracteres.
- `ds-input.css`: estilos y tamaños del diseño de Figma.
- `ds-input.stories.js`: ejemplos interactivos y galería.
- `assets/`: Roboto y el icono Material de error con sus licencias.

Referencia: [Text Field en Figma](https://www.figma.com/design/QiyZVheWsrCupfVa8woxdI/?node-id=59884-3966).
El error lo establece el formulario; el componente no decide reglas de validación. El icono opcional de calendario y un selector de fechas quedan fuera de esta entrega del campo de texto. Los cambios de Figma todavía requieren implementación y revisión antes de subirlos a GitHub.
