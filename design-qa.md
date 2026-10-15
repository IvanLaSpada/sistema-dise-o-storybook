# Revisión de Input — 15 de octubre de 2026

final result: passed

Alcance: campo de texto HTML/CSS dentro del Storybook existente. 96 combinaciones de 4 tamaños, 2 estilos, 4 estados y 3 contenidos. No incluye selector de fechas ni integración Angular.

## Evidencia y comparación

Referencia: Figma QiyZVheWsrCupfVa8woxdI, página 07.Inputs, Text Field; nodo de entrada 59884:3966 y variantes del conjunto 12122:4909. Se inspeccionaron variantes delineadas y rellenas y sus propiedades visibles. Se comparó lado a lado el estado S delineado enfocado con la captura de Figma normalizada al mismo ancho: borde azul, radio, label, tipografía y posición del texto de soporte. Sin diferencias P0/P1/P2 detectadas en ese estado. La galería se revisó visualmente; esto no constituye una comparación píxel a píxel de las 96 variantes.

Capturas guardadas en el directorio de trabajo, un nivel por encima del proyecto: `figma-input-reference.png`, `input-comparison.png`, `input-gallery-final.png`, `input-mobile.png`.

## Comprobaciones

- Compilación de producción de Storybook exitosa. Advertencias de tamaño de bundles de Storybook; sin errores de compilación.
- Se renderizan 96 campos con identificadores únicos y alturas de 32/40/48/56 px.
- Escritura y foco real: se introduce texto y aparece el borde azul; el label flota al enfocar/escribir.
- Contador: escribir Hola produce 4/10. Intentar escribir 11 caracteres con límite 10 conserva 1234567890.
- Error: aria-invalid=true y aria-describedby enlaza al mensaje visible.
- Deshabilitado: el campo nativo no está habilitado.
- Controles de Storybook disponibles al cambiar de ejemplo. Se retiró la desactivación especial de controles en la galería que provocaba una advertencia del manager.
- Ancho móvil: viewport 320 px, scrollWidth 320 px, campo 240 px, sin desbordamiento horizontal.
- Regresión: el ejemplo Botón Primario SIAF sigue renderizando.

## Límites

Las reglas de validación pertenecen al formulario. Las variables se transcribieron desde Figma: no hay sincronización automática. Se entrega el campo de texto; el icono opcional de calendario requiere definir e implementar su interacción por separado. Esta revisión local no confirma la publicación de Netlify.
