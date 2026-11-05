import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link' | 'danger';
export type ButtonSize = 'S' | 'M' | 'L' | 'XL';
export type ButtonState = 'default' | 'hover' | 'disabled';

const STYLE_BY_VARIANT: Record<ButtonVariant, string> = {
  primary: 'Primario',
  secondary: 'Secundario',
  tertiary: 'Terciario',
  link: 'Link',
  danger: 'Peligro',
};

const STATE_BY_NAME: Record<ButtonState, string> = {
  default: 'Default',
  hover: 'Hover',
  disabled: 'Disabled',
};

/**
 * Botón del sistema de diseño SIAF. No requiere Bootstrap.
 * La jerarquía visual se configura con `variant`; `disabled` desactiva el control nativo.
 */
@Component({
  selector: 'ds-button',
  standalone: true,
  template: `
    <button
      class="ds-button"
      type="button"
      [attr.data-style]="styleName"
      [attr.data-size]="size"
      [attr.data-state]="stateName"
      [disabled]="disabled || state === 'disabled'"
      [class.ds-button--icon-only]="iconOnly"
      [attr.aria-label]="iconOnly ? label : null"
      [attr.title]="iconOnly ? label : null"
      (click)="clicked.emit($event)"
    >
      <span *ngIf="showIcon || iconOnly" class="ds-button__icon" aria-hidden="true"></span>
      <span *ngIf="!iconOnly" class="ds-button__label"><ng-content>{{ label }}</ng-content></span>
    </button>
  `,
  imports: [CommonModule],
  styleUrls: ['../../../ds-button.css'],
})
export class DsButtonComponent {
  /** Jerarquía de la acción, según las variantes definidas en Figma. */
  @Input() variant: ButtonVariant = 'primary';
  /** Tamaño visual del botón. */
  @Input() size: ButtonSize = 'M';
  /** Estado visual de inspección. Usá `disabled` para deshabilitar la acción real. */
  @Input() state: ButtonState = 'default';
  /** Texto visible y nombre accesible del botón de solo ícono. */
  @Input() label = 'Label';
  /** Muestra el ícono ilustrativo incluido en la demo. */
  @Input() showIcon = true;
  /** Oculta el texto; requiere una etiqueta accesible en `label`. */
  @Input() iconOnly = false;
  /** Deshabilita el botón nativo y evita que emita clics. */
  @Input() disabled = false;

  /** Se emite cuando la persona activa el botón. */
  @Output() readonly clicked = new EventEmitter<MouseEvent>();

  get styleName(): string {
    return STYLE_BY_VARIANT[this.variant] ?? STYLE_BY_VARIANT.primary;
  }

  get stateName(): string {
    return STATE_BY_NAME[this.state] ?? STATE_BY_NAME.default;
  }
}
