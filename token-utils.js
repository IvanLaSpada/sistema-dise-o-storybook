import data from './design-tokens.json';

export const tokenData = data;
export const tokens = data.collections.flatMap(collection => collection.tokens.map(token => ({ ...token, collection: collection.name })));
const byName = new Map(tokens.map(token => [token.name, token]));
export const cssName = name => `--ds-token-${name.replaceAll('/', '-')}`;

export function resolveToken(name, mode = 'cliente-rico', visited = []) {
  if (visited.includes(name)) throw new Error(`Referencia circular: ${[...visited, name].join(' → ')}`);
  const token = byName.get(name);
  if (!token) throw new Error(`Token inexistente: ${name}`);
  const definition = token.values[mode] || Object.values(token.values)[0];
  if (definition.ref) {
    const resolved = resolveToken(definition.ref, mode, [...visited, name]);
    return { ...resolved, chain: [name, ...resolved.chain] };
  }
  return { value: definition.value, alpha: definition.alpha ?? 1, chain: [name] };
}

export function colorValue(resolved) {
  return `${resolved.value}${resolved.alpha < 1 ? Math.round(resolved.alpha * 255).toString(16).padStart(2, '0') : ''}`;
}

export function displayValue(token, resolved) {
  if (token.type === 'color') return `${resolved.value}${resolved.alpha < 1 ? ` · ${Math.round(resolved.alpha * 100)}%` : ''}`;
  // Figma stores numbers without units. These paths represent dimensions in this web catalog.
  const unitless = token.name.startsWith('grid/columns/') || token.name.startsWith('font/weight/');
  return `${resolved.value}${token.type === 'number' && !unitless ? ' px' : ''}`;
}
