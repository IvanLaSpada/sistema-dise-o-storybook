import { tokens, tokenData, resolveToken, displayValue, colorValue, cssName } from './token-utils';
import './token-catalog.css';
import './ds-button.css';
import './ds-input.css';
import { createButton } from './ds-button';
import { createInput } from './ds-input';

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createTokenCatalog({ collection = 'Primitivo' } = {}) {
  const root = element('section', 'token-catalog');
  root.dataset.dsTheme = 'cliente-rico';
  const list = tokens.filter(t => t.collection === collection);
  const toolbar = element('div', 'token-catalog__toolbar');
  const searchLabel = element('label', '', 'Buscar token');
  const search = element('input'); search.type = 'search'; search.placeholder = 'Nombre, referencia o valor…';
  searchLabel.append(search);
  const modeLabel = element('label', '', 'Marca');
  const mode = element('select');
  for (const name of ['cliente-rico', 'erecauda']) { const o = element('option', '', name); o.value = name; mode.append(o); }
  modeLabel.append(mode); toolbar.append(searchLabel, modeLabel);
  const count = element('p', 'token-catalog__count'); count.setAttribute('aria-live', 'polite');
  const samples = element('div', 'token-catalog__samples');
  if (collection === 'Componente') {
    samples.append(element('p', '', 'Ejemplos conectados a los tokens de color:'));
    samples.append(createButton({ label: 'Acción primaria', mostrarIcono: false }));
    samples.append(createInput({ label: 'Campo de texto', estado: 'Enfocado', contenido: 'Label', mostrarSoporte: true, supportingText: 'El foco cambia con la marca.' }));
  }
  const tableWrap = element('div', 'token-catalog__table-wrap');
  const table = element('table'); table.setAttribute('aria-label', `Tokens de ${collection}`);
  const head = element('thead'); const headRow = element('tr');
  for (const title of ['Vista previa', 'Token', 'Valor', 'Referencias']) { const th = element('th', '', title); th.scope = 'col'; headRow.append(th); }
  head.append(headRow); const body = element('tbody'); table.append(head, body); tableWrap.append(table);
  root.append(toolbar, count, samples, tableWrap);
  function render() {
    root.dataset.dsTheme = mode.value;
    body.replaceChildren();
    let shown = 0;
    for (const token of list) {
      const resolved = resolveToken(token.name, mode.value);
      const value = displayValue(token, resolved);
      const query = search.value.trim().toLowerCase();
      if (![token.name, value, ...resolved.chain, token.description].join(' ').toLowerCase().includes(query)) continue;
      shown++;
      const row = element('tr');
      const previewCell = element('td'); const preview = element('div', 'token-catalog__preview');
      preview.setAttribute('aria-hidden', 'true');
      if (token.type === 'color') { const swatch = element('span', 'token-catalog__swatch'); swatch.style.backgroundColor = colorValue(resolved); preview.append(swatch); }
      else if (token.name.startsWith('border/radius/')) { const box = element('span', 'token-catalog__radius'); box.style.borderRadius = `${resolved.value}px`; preview.append(box); }
      else if (token.name.startsWith('font/')) {
        const text = element('span', '', 'Aa');
        if (token.name.startsWith('font/weight/')) text.style.fontWeight = resolved.value;
        if (token.name.startsWith('font/size/')) text.style.fontSize = `${Math.min(resolved.value, 40)}px`;
        if (token.name.startsWith('font/family/')) text.style.fontFamily = resolved.value;
        preview.append(text);
      } else { const bar = element('span', 'token-catalog__measure'); bar.style.width = `${Math.max(4, Math.min(Number(resolved.value), 100))}px`; preview.append(bar); }
      previewCell.append(preview);
      const nameCell = element('th'); nameCell.scope = 'row'; nameCell.append(element('code', '', token.name));
      if (token.description) nameCell.append(element('small', '', token.description));
      const valueCell = element('td'); valueCell.append(element('code', '', value));
      const refCell = element('td');
      refCell.append(element('span', 'token-catalog__chain', resolved.chain.length > 1 ? resolved.chain.slice(1).join(' → ') : 'Valor directo'));
      refCell.append(element('code', 'token-catalog__css-name', cssName(token.name)));
      row.append(previewCell, nameCell, valueCell, refCell); body.append(row);
    }
    count.textContent = `${shown} de ${list.length} tokens · ${collection === 'Componente' ? mode.value : 'Colección compartida entre marcas'}`;
    if (!shown) { const row = element('tr'); const cell = element('td', '', 'No se encontraron tokens. Probá con otro nombre, referencia o valor.'); cell.colSpan = 4; row.append(cell); body.append(row); }
  }
  search.addEventListener('input', render); mode.addEventListener('change', render); render();
  return root;
}

export const tokenSource = tokenData.source;
