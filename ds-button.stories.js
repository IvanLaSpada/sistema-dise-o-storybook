import './ds-button.css';
import { createButton } from './ds-button';
import { action } from '@storybook/addon-actions';

const styles = ['Primario', 'Secundario', 'Terciario', 'Link', 'Peligro'];
const sizes = ['S', 'M', 'L', 'XL'];
const states = ['Default', 'Hover', 'Disabled'];

export default {
  title: 'Componentes/Botones', tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Botones actualizados de la página 06. Botones de Figma DGSIAF. El hover funciona al pasar el mouse; el control Estado permite fijarlo para revisar el diseño. Disabled usa el atributo nativo y no ejecuta acciones. El estilo Link representa una acción con apariencia de enlace; para navegar en un producto se debe usar un enlace con destino real.' } } },
  args: { estilo: 'Primario', tamano: 'M', estado: 'Default', label: 'Label', mostrarIcono: true, soloIcono: false },
  argTypes: {
    estilo: { name: 'Estilo', control: 'select', options: styles },
    tamano: { name: 'Tamaño', control: 'select', options: sizes },
    estado: { name: 'Estado', control: 'select', options: states },
    label: { name: 'Etiqueta / nombre accesible', control: 'text' },
    mostrarIcono: { name: 'Mostrar ícono', control: 'boolean' },
    soloIcono: { name: 'Solo ícono', control: 'boolean' },
  },
  render: args => {
    const wrapper = document.createElement('div');
    wrapper.className = 'ds-button-demo';
    const status = document.createElement('p');
    status.className = 'ds-button-demo__status';
    status.setAttribute('role', 'status');
    status.textContent = 'Hacé clic para probar la acción.';
    let clicks = 0;
    const onClick = () => {
      clicks += 1;
      status.textContent = `Acción ejecutada ${clicks} ${clicks === 1 ? 'vez' : 'veces'}.`;
      action('clic en botón')({ estilo: args.estilo, tamano: args.tamano });
    };
    wrapper.append(createButton({ ...args, onClick }), status);
    return wrapper;
  },
};
export const Playground = { name: 'Probar botón' };
export const Secundario = { args: { estilo: 'Secundario' } };
export const Terciario = { args: { estilo: 'Terciario' } };
export const Link = { args: { estilo: 'Link' } };
export const Peligro = { args: { estilo: 'Peligro' } };
export const SinIcono = { name: 'Sin ícono', args: { mostrarIcono: false } };
export const SoloIcono = { name: 'Probar botón de ícono', args: { soloIcono: true, label: 'Acción de ejemplo' } };
export const Deshabilitado = { args: { estado: 'Disabled' } };

function gallery(args, soloIcono) {
  const root = document.createElement('div');
  root.className = 'ds-button-gallery';
  for (const estado of states) for (const estilo of styles) for (const tamano of sizes) {
    const item = document.createElement('div');
    item.className = 'ds-button-gallery__item';
    const caption = document.createElement('p');
    caption.className = 'ds-button-gallery__caption';
    caption.textContent = `${estilo} · ${tamano} · ${estado}`;
    item.append(caption, createButton({ ...args, estilo, tamano, estado, soloIcono, onClick: action('clic en variante') }));
    root.append(item);
  }
  return root;
}
export const TodasLasVariantes = { name: 'Botones · todas las variantes', render: args => gallery(args, false) };
export const IconosTodasLasVariantes = { name: 'Íconos · todas las variantes', render: args => gallery(args, true) };
