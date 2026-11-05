import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ButtonGalleryComponent } from './component-galleries.component';
import { DsButtonComponent } from './ds-button.component';

const meta: Meta<DsButtonComponent> = {
  title: 'Componentes/Botones',
  component: DsButtonComponent,
  parameters: {
    docs: {
      description: {
        component: 'Botones actualizados de la página 06. Botones de Figma DGSIAF. El hover funciona al pasar el mouse; el control Estado permite fijarlo para revisar el diseño. Disabled usa el atributo nativo y no ejecuta acciones. El estilo Link representa una acción con apariencia de enlace; para navegar en un producto se debe usar un enlace con destino real.',
      },
      source: {
        code: `<div [attr.data-brand]="dsBrand">
  <ds-button
    [variant]="variant"
    [size]="size"
    [disabled]="disabled"
    [showIcon]="showIcon"
  >
    {{ label }}
  </ds-button>
</div>`,
      },
    },
  },
  args: {
    variant: 'primary', size: 'M', state: 'default', label: 'Label',
    showIcon: true, iconOnly: false, disabled: false, clicked: fn(),
  },
  argTypes: {
    variant: { name: 'Variante', description: 'Jerarquía de la acción. Peligro se reserva para consecuencias destructivas.', control: 'select', options: ['primary', 'secondary', 'tertiary', 'link', 'danger'], table: { defaultValue: { summary: 'primary' } } },
    size: { name: 'Tamaño', description: 'S, M, L o XL. La jerarquía se define por la variante, no por el tamaño.', control: 'select', options: ['S', 'M', 'L', 'XL'] },
    state: { name: 'Estado visual', description: 'Hover permite inspeccionar la apariencia; Disabled desactiva también el botón.', control: 'select', options: ['default', 'hover', 'disabled'] },
    disabled: { name: 'Deshabilitado', description: 'Desactiva el control nativo y evita que emita clics.', control: 'boolean' },
    label: { name: 'Etiqueta / nombre accesible', description: 'Acción concreta; en solo ícono, proporciona el nombre accesible.', control: 'text' },
    showIcon: { name: 'Mostrar ícono', description: 'Ícono ilustrativo a la izquierda del texto.', control: 'boolean' },
    iconOnly: { name: 'Solo ícono', description: 'Requiere una etiqueta accesible en `label`.', control: 'boolean' },
    clicked: { name: 'Al hacer clic', description: 'Evento que emite el componente al activarse.', control: false },
  },
};

export default meta;
type Story = StoryObj<DsButtonComponent>;

export const Playground: Story = { name: 'Probar botón' };
export const Secundario: Story = { args: { variant: 'secondary' } };
export const Terciario: Story = { args: { variant: 'tertiary' } };
export const Link: Story = { args: { variant: 'link' } };
export const Peligro: Story = { args: { variant: 'danger' } };
export const SinIcono: Story = { name: 'Sin ícono', args: { showIcon: false } };
export const SoloIcono: Story = { name: 'Probar botón de ícono', args: { iconOnly: true, label: 'Acción de ejemplo' } };
export const Deshabilitado: Story = { args: { disabled: true, state: 'disabled' } };

export const TodasLasVariantes = {
  name: 'Botones · todas las variantes',
  render: () => ({ component: ButtonGalleryComponent }),
  parameters: { controls: { disable: true }, docs: { source: { code: '<ds-button [variant]="variant" [size]="size" [disabled]="disabled">Label</ds-button>' } } },
};

export const IconosTodasLasVariantes = {
  name: 'Íconos · todas las variantes',
  render: () => ({ component: ButtonGalleryComponent, props: { iconOnly: true } }),
  parameters: { controls: { disable: true }, docs: { source: { code: '<ds-button [variant]="variant" [size]="size" [iconOnly]="true" label="Acción de ejemplo"></ds-button>' } } },
};
