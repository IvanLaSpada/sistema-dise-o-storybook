import { Component, EventEmitter, Input, Output } from '@angular/core';

export type InputVariant = 'outlined' | 'filled';
export type InputSize = 'S' | 'M' | 'L' | 'XL';
export type InputState = 'default' | 'focused' | 'error' | 'disabled';
export type InputContent = 'placeholder' | 'label' | 'input';

let nextInputId = 0;

/** Campo de texto del sistema de diseño. El formulario que lo contiene controla la validación. */
@Component({
  selector: 'ds-input',
  standalone: true,
  template: `
    <div
      class="ds-input"
      [attr.data-style]="styleName"
      [attr.data-state]="stateName"
      [attr.data-size]="size"
      [attr.data-content]="contentName"
      [class.ds-input--full]="fullWidth"
    >
      <div class="ds-input__field">
        <input
          class="ds-input__control"
          [id]="inputId"
          [name]="inputId"
          type="text"
          [placeholder]="content === 'label' ? ' ' : placeholder"
          [value]="value"
          [disabled]="disabled || state === 'disabled'"
          [attr.maxlength]="showCounter ? maxLength : null"
          [attr.aria-invalid]="state === 'error' ? 'true' : null"
          [attr.aria-describedby]="describedBy"
          (input)="handleInput($event)"
        />
        <label class="ds-input__label" [for]="inputId">{{ label }}</label>
        <span *ngIf="state === 'error'" class="ds-input__error-icon" aria-hidden="true"></span>
      </div>
      <div *ngIf="showSupportingText || showCounter" class="ds-input__footer">
        <span *ngIf="showSupportingText && supportingText" class="ds-input__support" [id]="supportId">
          {{ supportingText }}
        </span>
        <span *ngIf="showCounter" class="ds-input__counter" [id]="counterId">
          {{ currentLength }}/{{ maxLength }}
        </span>
      </div>
    </div>
  `,
  styleUrls: ['../../../ds-input.css'],
})
export class DsInputComponent {
  /** Identificador asociado a la etiqueta visible. */
  @Input() label = 'Label';
  /** Apariencia delineada o rellena. */
  @Input() variant: InputVariant = 'outlined';
  /** Tamaño visual del campo. */
  @Input() size: InputSize = 'M';
  /** Estado visual; el formulario conserva la responsabilidad de validar el dato. */
  @Input() state: InputState = 'default';
  /** Deshabilita el control aunque el estado visual sea otro. */
  @Input() disabled = false;
  /** Decide si se muestra una pista, una etiqueta flotante o un valor inicial. */
  @Input() content: InputContent = 'placeholder';
  /** Pista breve para el formato esperado. */
  @Input() placeholder = 'Placeholder';
  /** Valor editable del campo. */
  @Input() value = '';
  /** Ayuda asociada al campo mediante `aria-describedby`. */
  @Input() supportingText = 'Supporting text';
  /** Muestra u oculta el texto de soporte. */
  @Input() showSupportingText = true;
  /** Muestra el contador accesible de caracteres. */
  @Input() showCounter = false;
  /** Límite aplicado al campo y reflejado en el contador. */
  @Input() maxLength = 10;
  /** Hace que el campo ocupe el ancho disponible. */
  @Input() fullWidth = false;
  /** Emite el nuevo valor para que el formulario contenedor lo guarde. */
  @Output() readonly valueChange = new EventEmitter<string>();

  readonly inputId = `ds-input-${++nextInputId}`;
  readonly supportId = `${this.inputId}-help`;
  readonly counterId = `${this.inputId}-count`;

  get styleName(): string {
    return this.variant === 'filled' ? 'Relleno' : 'Delineado';
  }

  get stateName(): string {
    if (this.disabled) return 'Deshabilitado';
    return ({ default: 'Default', focused: 'Enfocado', error: 'Error', disabled: 'Deshabilitado' } as const)[this.state];
  }

  get contentName(): string {
    return ({ placeholder: 'Placeholder', label: 'Label', input: 'Input' } as const)[this.content];
  }

  get describedBy(): string | null {
    const ids = [this.showSupportingText && this.supportingText ? this.supportId : null, this.showCounter ? this.counterId : null]
      .filter((id): id is string => Boolean(id));
    return ids.length ? ids.join(' ') : null;
  }

  get currentLength(): number {
    return this.value.length;
  }

  handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}
