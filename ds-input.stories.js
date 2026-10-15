import './ds-input.css';
import { createInput } from './ds-input';

export default {
  title: 'Componentes/Input',
  tags: ['autodocs'],
  render: createInput,
  parameters: {
    docs: { description: { component: 'Campo de texto basado en Text Field de Figma DGSIAF. Escribí o usá Tab para probar el foco real. El estado Enfocado permite comparar su apariencia sin mover el teclado. El error se controla desde el formulario; no aplica reglas de validación propias.' } },
  },
  args: {
    estilo: 'Delineado', estado: 'Default', contenido: 'Placeholder', tamano: 'M',
    label: 'Label', placeholder: 'Placeholder', value: 'Input',
    supportingText: 'Supporting text', mostrarSoporte: true,
    mostrarContador: false, maxLength: 10, fullWidth: false,
  },
  argTypes: {
    estilo: { control: 'select', options: ['Delineado', 'Relleno'] },
    estado: { control: 'select', options: ['Default', 'Enfocado', 'Error', 'Deshabilitado'] },
    contenido: { control: 'select', options: ['Placeholder', 'Label', 'Input'], description: 'Presentación inicial. Input usa el valor; Label flota al escribir o enfocar.' },
    tamano: { name: 'Tamaño', control: 'select', options: ['S', 'M', 'L', 'XL'] },
    label: { control: 'text' }, placeholder: { control: 'text' }, value: { control: 'text' },
    supportingText: { name: 'Texto de soporte', control: 'text' },
    mostrarSoporte: { name: 'Mostrar texto de soporte', control: 'boolean' },
    mostrarContador: { name: 'Mostrar contador', control: 'boolean' },
    maxLength: { name: 'Máximo de caracteres', control: { type: 'number', min: 1 } },
    fullWidth: { name: 'Ocupar ancho disponible', control: 'boolean' },
  },
};

export const Playground = { name: 'Probar componente' };
export const Relleno = { args: { estilo: 'Relleno' } };
export const Enfocado = { args: { estado: 'Enfocado' } };
export const Error = { args: { estado: 'Error', supportingText: 'Revisá el dato ingresado.' } };
export const Deshabilitado = { args: { estado: 'Deshabilitado' } };
export const ConContenido = { name: 'Con contenido', args: { contenido: 'Input', value: 'Ejemplo' } };
export const ConContador = { name: 'Con contador', args: { mostrarContador: true } };

export const TodasLasVariantes = {
  name: 'Todas las variantes',
  render: (args) => {
    const gallery = document.createElement('div');
    gallery.className = 'ds-input-gallery';
    for (const tamano of ['S', 'M', 'L', 'XL']) {
      for (const estilo of ['Delineado', 'Relleno']) {
        for (const estado of ['Default', 'Enfocado', 'Error', 'Deshabilitado']) {
          for (const contenido of ['Placeholder', 'Label', 'Input']) {
            const item = document.createElement('div');
            item.className = 'ds-input-gallery__item';
            const caption = document.createElement('p');
            caption.className = 'ds-input-gallery__caption';
            caption.textContent = `${tamano} · ${estilo} · ${estado} · ${contenido}`;
            item.append(caption, createInput({ ...args, tamano, estilo, estado, contenido }));
            gallery.append(item);
          }
        }
      }
    }
    return gallery;
  },
};
