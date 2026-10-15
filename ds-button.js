/** Botones nativos basados en 06. Botones de Figma DGSIAF. */
export function createButton({ estilo = 'Primario', tamano = 'M', estado = 'Default', label = 'Label', mostrarIcono = true, soloIcono = false, onClick } = {}) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'ds-button';
  button.dataset.style = estilo;
  button.dataset.size = tamano;
  button.dataset.state = estado;
  button.disabled = estado === 'Disabled';
  if (soloIcono) {
    button.classList.add('ds-button--icon-only');
    button.setAttribute('aria-label', label || 'Acción');
    button.title = label || 'Acción';
  }
  if (mostrarIcono || soloIcono) {
    const icon = document.createElement('span');
    icon.className = 'ds-button__icon';
    icon.setAttribute('aria-hidden', 'true');
    button.append(icon);
  }
  if (!soloIcono) {
    const text = document.createElement('span');
    text.className = 'ds-button__label';
    text.textContent = label || 'Label';
    button.append(text);
  }
  if (typeof onClick === 'function') button.addEventListener('click', onClick);
  return button;
}
