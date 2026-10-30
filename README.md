# Sistema de Diseño — Storybook

Catálogo inicial de componentes HTML/CSS. Incluye los botones actualizados de Figma y el campo de texto Input.

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
- `ds-button.stories.js`: ejemplos, controles y galerías de botones.
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

## Botones — 06. Botones

El ejemplo anterior “Botón Primario SIAF” fue reemplazado por **Componentes → Botones**.

- Estilos: Primario, Secundario, Terciario, Link y Peligro.
- Tamaños: S (32 px), M (40 px), L (48 px), XL (56 px), radio de 16 px.
- Estados: Default, Hover y Disabled. Hover también responde al mouse y Disabled bloquea la acción nativa.
- Etiqueta editable, ícono Material stars opcional y versión de solo ícono con nombre accesible.
- Dos galerías con 60 combinaciones cada una; la versión con texto también permite ocultar el ícono.
- El ejemplo interactivo registra los clics en Actions y muestra una confirmación. La integración real usa el callback `onClick` de `createButton`.

El estilo Link es una apariencia de botón de acción. La navegación de un producto debe implementarse con enlaces y destinos reales.
Referencia: [06. Botones en Figma](https://www.figma.com/design/QiyZVheWsrCupfVa8woxdI/?node-id=58673-328).
# Documentación de uso

Las páginas **Docs** de Botones e Input combinan ejemplos interactivos, controles,
anatomía, estados, reglas de uso y accesibilidad. **Documentación / Introducción**
explica cómo navegar el catálogo. Los archivos `Botones.mdx`, `Input.mdx` e
`Introduccion.mdx` definen estas páginas; `component-guidelines.js` contiene la
síntesis del PDF **Pautas Diseño Aplicaciones SIAF (4)** aportado por UX el
28/10/2026 (botones: páginas 16–22; inputs: 24–32).

Se distinguen las pautas del comportamiento implementado. La documentación registra
las diferencias de radio, tipografía, estados, jerarquías de peligro y posición del
ícono, los campos especializados pendientes y el anuncio dinámico del contador.
También señala la contradicción entre la matriz de cancelación de la página 22 y
las reglas de la página 21. No se modificaron estilos ni comportamientos al añadir
estas pautas. El PDF original no se distribuye con el catálogo.



## Tokens de Figma

Se importaron 252 variables (137 Primitivo, 40 Semantico, 75 Componente) desde el panel de variables de Figma el 30/10/2026. Componente tiene modos cliente-rico y erecauda (327 valores en total).

- `design-tokens.json`: nombres, valores, transparencias, alias y modos. Instantánea manual; no se conecta automáticamente con Figma.
- `npm run build-tokens`: valida nombres CSS, referencias, ciclos y colores observados, y genera `design-tokens.css`. Se ejecuta antes de iniciar o construir Storybook.
- Catálogos en Tokens: primitivos, semánticos y componentes, con búsqueda y selector de marca.
- Botones e inputs consumen sus tokens de color aplicables; radios 16 y 4 consumen los primitivos. Otras medidas conservan su implementación previa. Para aplicar la marca a un contenedor: `data-ds-theme="erecauda"`; por defecto se usa cliente-rico.
- Los números del JSON se preservan sin unidad. La salida web agrega px a medidas y deja sin unidad columnas y pesos. Las descripciones se recuperaron de alias visibles; no hay IDs/scopes de Figma ni garantía de metadatos completos.
- Los tokens de componentes aún no desarrollados son documentación, no implementaciones nuevas.
