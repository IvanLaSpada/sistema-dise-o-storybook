const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'design-tokens.json'), 'utf8'));
const tokens = data.collections.flatMap(c => c.tokens);
const byName = new Map(tokens.map(t => [t.name, t]));
const cssName = name => `--ds-token-${name.replaceAll('/', '-')}`;
if (byName.size !== tokens.length) throw new Error('Nombres duplicados');
if (new Set(tokens.map(t => cssName(t.name))).size !== tokens.length) throw new Error('Colisión de nombres CSS');
function resolve(name, mode, chain = []) {
  if (chain.includes(name)) throw new Error(`Referencia circular: ${chain.join(' → ')} → ${name}`);
  const t = byName.get(name);
  if (!t) throw new Error(`Referencia inexistente: ${name}`);
  const v = t.values[mode] || Object.values(t.values)[0];
  return v.ref ? resolve(v.ref, mode, [...chain, name]) : v;
}
function cssValue(t, v) {
  if (v.ref) return `var(${cssName(v.ref)})`;
  if (t.type === 'color') return v.value + (v.alpha < 1 ? Math.round(v.alpha * 255).toString(16).padStart(2, '0') : '');
  if (t.type === 'string') return JSON.stringify(v.value);
  const unitless = t.name.startsWith('grid/columns/') || t.name.startsWith('font/weight/');
  return `${v.value}${unitless ? '' : 'px'}`;
}
let valueCount = 0;
for (const t of tokens) {
  for (const [mode, v] of Object.entries(t.values)) {
    valueCount++;
    const resolved = resolve(t.name, mode);
    if (v.observed) {
      const [hex, percent] = v.observed.split(', ');
      const alpha = percent ? Number(percent.replace('%', '')) / 100 : 1;
      if (resolved.value.toUpperCase() !== hex.toUpperCase() || Math.abs((resolved.alpha ?? 1) - alpha) > .001) {
        throw new Error(`El alias no coincide con Figma: ${t.name} (${mode})`);
      }
    }
  }
}
let css = '/* Generado por npm run build-tokens. Editar design-tokens.json. */\n';
for (const mode of ['cliente-rico', 'erecauda']) {
  css += mode === 'cliente-rico' ? ':root, [data-ds-theme="cliente-rico"] {\n' : '[data-ds-theme="erecauda"] {\n';
  for (const t of tokens) css += `  ${cssName(t.name)}: ${cssValue(t, t.values[mode] || Object.values(t.values)[0])};\n`;
  css += '}\n';
}
fs.writeFileSync(path.join(root, 'design-tokens.css'), css);
console.log(`Tokens verificados: ${tokens.length}; valores por modo: ${valueCount}; sin referencias rotas, ciclos ni diferencias de color.`);
