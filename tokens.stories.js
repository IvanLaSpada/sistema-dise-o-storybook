import { createTokenCatalog } from './token-catalog';

export default {
  title: 'Tokens/Catálogo',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export const Primitivos = { render: () => createTokenCatalog({ collection: 'Primitivo' }) };
export const Semanticos = { name: 'Semánticos', render: () => createTokenCatalog({ collection: 'Semantico' }) };
export const Componentes = { render: () => createTokenCatalog({ collection: 'Componente' }) };
