import type { Meta, StoryObj } from '@storybook/angular';
import { InputGalleryComponent } from './component-galleries.component';
import { DsInputComponent } from './ds-input.component';

const meta: Meta<DsInputComponent> = {
  title: 'Componentes/Input',
  component: DsInputComponent,
  parameters: {
    docs: {
      description: {
        component: 'Campo de texto basado en Text Field de Figma DGSIAF. Escribí o usá Tab para probar el foco real. El estado Enfocado permite comparar su apariencia sin mover el teclado. El error se controla desde el formulario; no aplica reglas de validación propias.',
      },
      source: {
        code: `<ds-input
  [variant]="variant"
  [size]="size"
  [state]="state"
  [disabled]="disabled"
  [label]="label"
  [placeholder]="placeholder"
  [(value)]="value"
  [supportingText]="supportingText"
></ds-input>`,
      },
    },
  },
  args: {
    variant: 'outlined', state: 'default', disabled: false, content: 'placeholder', size: 'M',
    label: 'Label', placeholder: 'Placeholder', value: '', supportingText: 'Supporting text',
    showSupportingText: true, showCounter: false, maxLength: 10, fullWidth: false,
  },
  argTypes: {
    variant: { name: 'Estilo', control: 'select', options: ['outlined', 'filled'] },
    state: { name: 'Estado', control: 'select', options: ['default', 'focused', 'error', 'disabled'] },
    disabled: { name: 'Deshabilitado', description: 'Bloquea la edición del campo.', control: 'boolean' },
    content: { name: 'Contenido inicial', control: 'select', options: ['placeholder', 'label', 'input'], description: 'Input muestra un valor inicial; Label usa etiqueta flotante.' },
    size: { name: 'Tamaño', control: 'select', options: ['S', 'M', 'L', 'XL'] },
    label: { description: 'Etiqueta asociada al campo. Identifica el dato esperado y no se reemplaza por el placeholder.', control: 'text' },
    placeholder: { description: 'Ejemplo o pista del formato esperado.', control: 'text' },
    value: { description: 'Valor editable. El formulario puede escuchar valueChange para guardar el cambio.', control: 'text' },
    supportingText: { name: 'Texto de soporte', description: 'Ayuda breve y útil; en Error explica qué corregir. Se asocia con aria-describedby.', control: 'text' },
    showSupportingText: { name: 'Mostrar texto de soporte', control: 'boolean' },
    showCounter: { name: 'Mostrar contador', control: 'boolean' },
    maxLength: { name: 'Máximo de caracteres', control: { type: 'number', min: 1 } },
    fullWidth: { name: 'Ocupar ancho disponible', control: 'boolean' },
    valueChange: { name: 'Al cambiar el valor', description: 'Emite el texto actualizado para que el formulario lo guarde.', control: false },
  },
};

export default meta;
type Story = StoryObj<DsInputComponent>;

export const Playground: Story = { name: 'Probar componente' };
export const Relleno: Story = { args: { variant: 'filled' } };
export const Enfocado: Story = { args: { state: 'focused', content: 'label' } };
export const Error: Story = { args: { state: 'error', supportingText: 'Revisá el dato ingresado.' } };
export const Deshabilitado: Story = { args: { state: 'disabled' } };
export const ConContenido: Story = { name: 'Con contenido', args: { content: 'input', value: 'Ejemplo' } };
export const ConContador: Story = { name: 'Con contador', args: { showCounter: true } };

export const TodasLasVariantes = {
  name: 'Todas las variantes',
  render: () => ({ component: InputGalleryComponent }),
  parameters: { controls: { disable: true }, docs: { source: { code: '<ds-input [variant]="variant" [size]="size" [state]="state" [label]="label"></ds-input>' } } },
};
