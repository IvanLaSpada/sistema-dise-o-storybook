// Síntesis editorial del PDF aportado por UX el 28/10/2026.
// Las diferencias con el código y las contradicciones del PDF se registran
// explícitamente: documentar una pauta no implica implementar una función.
export const buttonUsage = `
## Cuándo usar cada variante

Elegí la jerarquía según la importancia de la acción. Diferenciá los botones por su diseño, no por su tamaño.

| Variante | Uso recomendado | Ejemplos |
| --- | --- | --- |
| Primario | La acción principal. Usá uno por contexto visual. | Guardar cambios, Crear usuario, Enviar |
| Secundario | Acciones importantes que complementan a la principal y herramientas de exploración. | Buscar, Aplicar filtros |
| Terciario | Acciones de utilidad, reversibles o de menor prioridad. | Volver, Descargar, Exportar |
| Link o texto | Acciones de muy baja prioridad que no deben competir visualmente. | Limpiar filtros, Ver ayuda |
| Peligro | Acciones destructivas o irreversibles. El riesgo y la jerarquía son decisiones diferentes. | Eliminar, Descartar cambios |

No uses el botón primario para todas las acciones de una pantalla. En un grupo horizontal, ubicá la acción principal a la derecha; el PDF contempla una excepción para mantenerla visible arriba a la derecha en formularios largos.

## Anatomía y contenido

- **Etiqueta:** describe la acción que se ejecuta. Preferí “Guardar cambios” o “Crear usuario” a “OK” o “Aceptar”. Conservá la escritura natural, sin forzar mayúsculas.
- **Ícono opcional:** a la izquierda refuerza una acción; a la derecha puede expresar dirección, como Siguiente. El catálogo actual muestra un ícono de ejemplo a la izquierda.
- **Solo ícono:** reservá esta opción para espacios reducidos y acciones reconocibles en contexto. Necesita un nombre accesible que explique la acción.
- **Fondo, borde y estado:** comunican jerarquía y disponibilidad. Evitá truncar el texto y mantené espacio suficiente alrededor del contenido.

La anatomía del PDF establece un margen mínimo de 8 px entre contenido y borde. El diagrama muestra un radio de 12 px y ancho mínimo de 120 px; no son las medidas actuales de todas las variantes del catálogo. Revisá las diferencias al final de esta página antes de usarlas como especificación.

## Estados e interacción

- **Normal:** la acción está disponible.
- **Hover:** confirma visualmente la interacción al pasar el puntero. No debe ser la única señal de disponibilidad.
- **Deshabilitado:** la acción no se ejecuta. Si no se entiende el motivo, explicá qué falta para habilitarla o reconsiderá si conviene mostrarla.
- **Foco de teclado:** debe permanecer visible. Un botón nativo recibe foco con Tab y se activa con Enter o Espacio.

El catálogo permite fijar Hover para inspeccionarlo y también responde al puntero. Deshabilitado utiliza el atributo nativo disabled.

## Acciones destructivas

Usá una etiqueta explícita y el color de peligro para eliminar, revocar o descartar información. El color por sí solo no comunica la consecuencia. La guía muestra estas acciones en distintas jerarquías; para una eliminación principal plantea un modal de confirmación.

Cancelar un formulario no debe aparecer en rojo por defecto. Si implica pérdida de cambios, explicá esa consecuencia. El modal y la operación real deben implementarse en la aplicación: el ejemplo de Storybook no elimina datos.

## Accesibilidad

- Proporcioná un nombre accesible a los botones de ícono. En este catálogo se toma de la propiedad Etiqueta.
- Comprobá foco, operación por teclado y contraste. La guía pide al menos 4,5:1 para el texto en los estados normales descritos.
- Usá un enlace con destino real para navegar. El estilo Link de este catálogo sigue siendo un botón de acción.
- Para móvil, verificá el área de toque: la guía de espaciado recomienda 44 × 44 px. Las variantes compactas de 32 y 40 px requieren considerar su área interactiva en el contexto de uso.
`;

export const buttonScope = `
## Correspondencia con la guía

La apariencia actual procede de la página **06. Botones de Figma** implementada previamente. Este agregado incorpora documentación; no modifica sus estilos.

| Tema | PDF de pautas | Catálogo actual |
| --- | --- | --- |
| Radio | 12 px en la anatomía de la página 17 | 16 px |
| Tamaño | Diagrama con ancho mínimo de 120 px | Cuatro tamaños con distintos anchos mínimos |
| Tipografía | Peso 600 en los estados de la página 19 | Pesos 400 o 500 según el tamaño |
| Hover y deshabilitado | Overlays y opacidad indicados en la página 19 | Colores de hover propios y opacidad 0,3 al deshabilitar |
| Acción de peligro | Ejemplos primario, secundario y terciario | Una variante Peligro |
| Ícono | Posiciones izquierda y derecha según el significado | Ícono de ejemplo a la izquierda y opción solo ícono |

**Pendiente de definición de UX:** unificar las especificaciones visuales del PDF y Figma antes de declarar equivalencia completa. La matriz de la página 22 asigna una acción reversible o de cancelación al botón destructivo, en contradicción con las reglas de la página 21. Esta documentación sigue la regla de no usar peligro para una cancelación neutral; esa fila necesita corrección en la fuente.

**Fuente:** Pautas Diseño Aplicaciones SIAF, PDF aportado el 28 de octubre de 2026, páginas 16 a 22. Área de toque: sección Espaciado. Síntesis de pautas con aclaraciones sobre el alcance del catálogo, no certificación de conformidad.
`;

export const inputUsage = `
## Cuándo usar un input

Usá un campo de entrada para capturar o editar un dato. Agrupá los campos por contexto, identificá los obligatorios y los opcionales, y elegí el control según el dato esperado. Un texto de ejemplo no reemplaza la etiqueta.

## Anatomía

1. **Etiqueta:** identifica el dato y se asocia al control.
2. **Campo de entrada:** recibe el valor. Para texto de una línea usá un input; para comentarios extensos, un área de texto.
3. **Indicador activo:** muestra el foco y ayuda a localizar el campo que se está editando.
4. **Texto de soporte:** explica el formato o una restricción cuando esa información aporta valor. Omitilo si la aclaración es trivial.
5. **Contador opcional:** hace visible el límite de caracteres. La guía pide mostrarlo siempre que un campo de texto libre tenga un límite.

## Estados y mensajes

| Estado | Qué debe comunicar |
| --- | --- |
| Habilitado | Se puede seleccionar el campo y escribir. |
| Enfocado | El foco es visible, la etiqueta deja espacio al contenido y aparece el cursor. |
| Error | Hay un dato que corregir. Mostrá señal visual, ícono y un mensaje descriptivo bajo el campo. |
| Deshabilitado | El campo está visible pero no admite interacción. |

Los mensajes deben indicar qué ocurrió y cómo corregirlo: por ejemplo, “Ingresá una fecha con formato DD/MM/AAAA”. No comuniques el error solo con rojo.

La guía de correo electrónico indica validar al perder el foco, evitando mostrar errores mientras la persona todavía escribe. En el catálogo, Error es un estado controlado desde las propiedades: no ejecuta validación automática.

## Elección del campo según el dato

Estas son pautas de selección del PDF. **El componente actual es únicamente un input de texto de una línea**; esta tabla no implica que implemente los controles especializados.

| Dato | Pauta de uso | Página |
| --- | --- | --- |
| Texto libre | Comentarios u observaciones sin formato fijo. Para contenido largo, área de texto con crecimiento vertical. | 27 |
| Correo electrónico | Mostrar el formato esperado, facilitar autocompletado y teclado de correo. Validar al perder el foco. | 28 |
| Teléfono | Mostrar el formato esperado. Si admite internos o múltiples números, contemplar entrada de texto libre. | 29 |
| Número e importe | Distinguir cantidades de dinero. Los importes requieren moneda, separadores y decimales según el contexto. | 30 |
| Rango o lista | Explicar la sintaxis de valores y rangos: por ejemplo, 1;4-5;9. | 31 |
| Fecha | Mostrar DD/MM/AAAA, permitir escritura y aplicar límites de fecha cuando correspondan. El calendario es complementario. | 32 |

Los identificadores, como CUIT o expediente, necesitan conservar su formato y no deben tratarse como cantidades por defecto. La implementación técnica de estos casos debe definirse por separado; un selector de tipo no reemplaza esa decisión.

## Accesibilidad

- Asociá una etiqueta al control. El catálogo genera un identificador único y utiliza label asociado.
- Vinculá ayuda y error mediante aria-describedby. El estado Error expone aria-invalid.
- Mantené el foco visible y el recorrido con Tab. Un campo deshabilitado no debe recibir interacción.
- No dependas solo del color para señalar un error ni ocultes su explicación.
- La guía solicita anunciar el contador restante con aria-live polite. El catálogo muestra un contador visual y lo asocia como descripción, pero todavía no incorpora ese anuncio dinámico de caracteres restantes.

Para email, teléfono y fecha, la guía agrega requisitos específicos de teclado, autocompletado y calendario. Verificalos al desarrollar esas variantes.
`;

export const inputScope = `
## Alcance del componente disponible

Podés probar los estilos Delineado y Relleno, cuatro tamaños, etiqueta, valor inicial, texto de soporte, ancho disponible, contador y estados visuales. El límite de caracteres del ejemplo se aplica cuando se activa el contador.

Todavía no incluye textarea con crecimiento automático, tipos especializados de email o teléfono, máscara monetaria, interpretación de rangos, calendario, indicador nativo de campo obligatorio ni validación al perder el foco. Esas funciones requieren desarrollo adicional; no se activan al cambiar una propiedad de este playground.

El formulario que use este componente debe decidir cuándo validar, qué mensaje mostrar y cómo gestionar el envío. La pauta de la página 28 sobre no bloquear el envío solo por un campo no debe interpretarse como aceptar datos inválidos: conviene acordar la interacción y presentar juntos los errores que impiden completar el formulario.

**Fuente:** Pautas Diseño Aplicaciones SIAF, PDF aportado el 28 de octubre de 2026, páginas 24 a 32. Síntesis de pautas con aclaraciones técnicas sobre el alcance implementado.
`;
