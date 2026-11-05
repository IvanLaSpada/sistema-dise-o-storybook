import type { Meta, StoryObj } from '@storybook/angular';
import { TokenCatalogComponent } from './token-catalog.component';

const meta: Meta<TokenCatalogComponent> = {
  title: 'Tokens/Catálogo',
  component: TokenCatalogComponent,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<TokenCatalogComponent>;

export const Primitivos: Story = { args: { collection: 'Primitivo' } };
export const Semanticos: Story = { name: 'Semánticos', args: { collection: 'Semantico' } };
export const Componentes: Story = { args: { collection: 'Componente' } };
