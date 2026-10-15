# Revisión de Botones — 15 de octubre de 2026

final result: passed

## Referencia y alcance

Figma: QiyZVheWsrCupfVa8woxdI, página 06. Botones. Button: conjunto 58673:328; Primario XL Default 58673:524; M 58673:520; S 58673:327. Icon button: conjunto 58706:135, Primario XL 59159:2834.

Se reemplazó el ejemplo anterior por cinco estilos, cuatro tamaños y tres estados, en Button e Icon button: 60 combinaciones por familia. Ícono opcional para Button; etiqueta accesible para Icon button. Los estados Hover y Disabled conservan los colores/opacity del diseño. La matriz sin ícono se obtiene desde los controles.

## Evidencia

Capturas en el directorio `work/`, un nivel por encima del proyecto:
- Fuente con texto: figma-button-xl.png (881 × 804, Figma al 164%).
- Fuente de ícono: figma-icon-button-xl.png (881 × 804, Figma al 468%).
- Implementación: button-xl-local.png, buttons-gallery.png e icon-buttons-gallery.png (1280 × 720, CSS 1:1).
- Comparación de texto: button-comparison.png. Recorte de Figma 262 × 92 px para el botón de 160 × 56 CSS, normalizado y comparado con el mismo botón local de 160 × 56. Ambos se muestran a 320 × 112 en la lámina.
- Comparación de ícono: icon-button-comparison.png. Fuente 262 × 262 para 56 × 56 CSS y recorte local 56 × 56, normalizados ambos a 168 × 168. La ampliación local muestra menor resolución de captura; el ícono original es vectorial.
- Responsive: buttons-mobile.png (320 × 740).

Se abrió y comparó cada lámina lado a lado. La vista general muestra las familias, jerarquía y cuatro tamaños; las regiones enfocadas comparan el estado Primario XL Default con el mismo contenido e ícono.

## Superficies de fidelidad

- Tipografía: Roboto local. S 12/16 con peso 500 y tracking 0.1; M 14/20, L 16/24, XL 18/24 con peso 400 y tracking 0. M se confirmó inspeccionando la capa de texto, que referencia Roboto/400.
- Layout: alturas 32/40/48/56, anchos mínimos 80/104/128/160, gaps 8/8/12/12, radio 16. Icon button es cuadrado del mismo alto. Etiquetas largas pueden aumentar el ancho o envolver para evitar desbordamiento.
- Colores: primario #3061AF/#3F75CE; secundario #393939/#505050; terciario transparente/#E6E6E6, borde interior 2 px #393939; Link transparente/#CFDCF6, texto #3061AF; peligro #E53935/#EA5A56. Disabled usa opacity .3, como la propiedad inspeccionada en Figma.
- Assets: Material Icons stars oficial, SVG externo usado como máscara. Roboto y licencias locales; sin dependencias de fuentes externas al abrir el catálogo.
- Copy: Label replica la referencia; los textos de confirmación y controles pertenecen al entorno de prueba y no al botón reutilizable.

## Historial y hallazgos

[P2 corregido] El primer borrador aplicaba peso 500 y tracking .1 al tamaño M. La capa de Figma confirmó 400 y tracking 0; se corrigió antes de la compilación final. La galería final muestra la corrección. Sin P0/P1/P2 pendientes en los estados revisados.

[P3] La equivalencia visual detallada se verificó con dos muestras XL y revisión general. No se afirma comparación píxel a píxel de las 120 combinaciones.

## Verificación funcional

- Compilación de producción exitosa; advertencias de tamaño de bundles de Storybook.
- Galería Button: 60 elementos, 20 disabled; alturas 32/40/48/56 y anchos 80/104/128/160.
- Galería Icon button: 60 elementos; medidas cuadradas 32/40/48/56; aria-label presente.
- Clic en Button confirma “Acción ejecutada 1 vez” y registra Actions.
- Enter en Icon button confirma la acción; Disabled no está habilitado.
- Colores computados de las cinco variantes Hover coinciden con los valores de Figma.
- A 320 px, scrollWidth=320 y se renderizan los 60 botones sin desbordamiento.
- Input existente permite escribir “Revisión” después del cambio.
- Consola de la vista revisada sin errores.

## Checklist

- [x] Reemplazar la historia y CSS anteriores.
- [x] Incorporar ambas familias y galerías.
- [x] Compilar, probar interacciones y comparar capturas.
- [x] Preservar el input.

La publicación de Netlify se verifica por separado; este informe confirma la implementación local.
