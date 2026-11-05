# Sistema de Diseño SIAF — Storybook Angular

Catálogo de botones, campos de texto y tokens con componentes **Angular 20 standalone**. Los componentes pertenecen al sistema de diseño SIAF y tienen estilos propios; no usan Bootstrap ni Angular Material.

## Desarrollo local

```sh
npm ci
npm run storybook
```

Storybook abre en `http://localhost:6006`. Para generar el sitio estático:

```sh
npm run build-storybook
```

La salida se guarda en `storybook-static/`. `npm run build` también verifica la app mínima de Angular.

## Componentes Angular

- `src/app/components/ds-button.component.ts`: componente `<ds-button>` con propiedades `variant`, `size`, `state`, `label`, `showIcon`, `iconOnly` y `disabled`; emite el evento `clicked`.
- `src/app/components/ds-input.component.ts`: componente `<ds-input>` con variantes, estados, tamaños, textos accesibles, contador y evento `valueChange`.
- `src/app/components/*stories.ts`: historias Angular y controles de Storybook. La pestaña de código muestra ejemplos de uso Angular.
- `ds-button.css` y `ds-input.css`: estilos propios basados en Figma; no dependen de Bootstrap.
- `.storybook/main.ts` y `angular.json`: configuración de Storybook para Angular y builders de Angular CLI.

Los componentes son implementaciones de demostración en Angular y documentan el contrato propuesto para el sistema. Todavía no forman un paquete npm/ng-packagr listo para instalar desde Conta NG; para esa distribución falta acordar el contrato final con desarrollo y empaquetar/publicar la librería.

## Botones e Input

Los botones ofrecen las variantes Primario, Secundario, Terciario, Link y Peligro; tamaños S/M/L/XL y estados Default, Hover y Disabled. La galería incluye las 60 combinaciones de variante, tamaño y estado.

Input ofrece estilos delineado/relleno, tamaños S/M/L/XL, estados Default/Enfocado/Error/Deshabilitado, placeholder/etiqueta/contenido, texto de soporte y contador. La galería conserva las 96 combinaciones de estilo, tamaño, estado y contenido. La validación del valor queda a cargo del formulario que lo usa.

Las páginas Docs resumen las pautas del PDF **Pautas Diseño Aplicaciones SIAF (4)** y explican la correspondencia entre Figma y el comportamiento implementado. Los cambios de Figma todavía requieren sincronización y revisión; no se actualizan automáticamente.

## Tokens de Figma

Se importaron 252 variables (137 Primitivo, 40 Semantico, 75 Componente) desde el panel de variables de Figma. Componente tiene modos cliente-rico y erecauda, con 327 valores contando ambos modos.

- `design-tokens.json`: nombres, valores, transparencias, alias y modos. Es una instantánea manual, no una sincronización automática con Figma.
- `npm run build-tokens`: valida referencias y genera `design-tokens.css` antes de iniciar o construir Storybook.
- Las páginas Tokens permiten buscar por nombre, referencia o valor y comparar las dos marcas.
- Botones e inputs consumen los tokens de color aplicables y los radios primitivos 16 y 4. Los demás valores visuales siguen definidos en sus estilos.
- Los tokens de otros componentes quedan documentados, pero todavía no implican que esos componentes estén implementados.

## Publicación

Netlify publica `storybook-static/` al compilar la rama configurada. GitLab Pages usa `.gitlab-ci.yml` y necesita un runner disponible con la etiqueta `okd`; la imagen de CI es Node 22 para que sea compatible con Angular 20.

La conversión a Angular no publica por sí sola el cambio en GitHub, Netlify ni GitLab: hay que subir estos archivos al repositorio que corresponda.
