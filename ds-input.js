let nextId = 0;

/** Campo de texto nativo. Los estados de validación los decide el formulario. */
export function createInput({
  estilo = 'Delineado', estado = 'Default', contenido = 'Placeholder',
  tamano = 'M', label = 'Label', placeholder = 'Placeholder', value = 'Input',
  supportingText = 'Supporting text', mostrarSoporte = true,
  mostrarContador = false, maxLength = 10, fullWidth = false,
} = {}) {
  const id = `ds-input-${++nextId}`;
  const root = document.createElement('div');
  root.className = 'ds-input';
  root.dataset.style = estilo;
  root.dataset.state = estado;
  root.dataset.size = tamano;
  root.dataset.content = contenido;
  if (fullWidth) root.classList.add('ds-input--full');

  const field = document.createElement('div');
  field.className = 'ds-input__field';
  const input = document.createElement('input');
  input.className = 'ds-input__control';
  input.id = id;
  input.name = id;
  input.type = 'text';
  input.placeholder = contenido === 'Label' ? ' ' : placeholder;
  input.value = contenido === 'Input' ? value : '';
  input.disabled = estado === 'Deshabilitado';
  if (mostrarContador) input.maxLength = Math.max(1, Number(maxLength) || 10);
  if (estado === 'Error') input.setAttribute('aria-invalid', 'true');
  const caption = document.createElement('label');
  caption.className = 'ds-input__label';
  caption.htmlFor = id;
  caption.textContent = label || 'Campo de texto';
  field.append(input, caption);
  if (estado === 'Error') {
    const icon = document.createElement('span');
    icon.className = 'ds-input__error-icon';
    icon.setAttribute('aria-hidden', 'true');
    field.append(icon);
  }
  root.append(field);

  const footer = document.createElement('div');
  footer.className = 'ds-input__footer';
  const descriptions = [];
  if (mostrarSoporte && supportingText) {
    const support = document.createElement('span');
    support.className = 'ds-input__support';
    support.id = `${id}-help`;
    support.textContent = supportingText;
    footer.append(support);
    descriptions.push(support.id);
  }
  if (mostrarContador) {
    const counter = document.createElement('span');
    counter.className = 'ds-input__counter';
    counter.id = `${id}-count`;
    const updateCount = () => { counter.textContent = `${input.value.length}/${input.maxLength}`; };
    input.addEventListener('input', updateCount);
    updateCount();
    footer.append(counter);
    descriptions.push(counter.id);
  }
  if (descriptions.length) {
    input.setAttribute('aria-describedby', descriptions.join(' '));
    root.append(footer);
  }
  return root;
}
