import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonSize, ButtonState, ButtonVariant, DsButtonComponent } from './ds-button.component';
import { DsInputComponent, InputContent, InputSize, InputState, InputVariant } from './ds-input.component';

@Component({
  selector: 'ds-button-gallery',
  standalone: true,
  imports: [CommonModule, DsButtonComponent],
  template: `
    <div class="ds-button-gallery">
      <div class="ds-button-gallery__item" *ngFor="let item of items">
        <p class="ds-button-gallery__caption">{{ variantLabel(item.variant) }} · {{ item.size }} · {{ stateLabel(item.state) }}</p>
        <ds-button [variant]="item.variant" [size]="item.size" [state]="item.state" [disabled]="item.state === 'disabled'" [iconOnly]="iconOnly" [label]="iconOnly ? 'Acción de ejemplo' : 'Label'"></ds-button>
      </div>
    </div>
  `,
  styleUrls: ['../../../ds-button.css'],
})
export class ButtonGalleryComponent {
  @Input() iconOnly = false;
  readonly variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'link', 'danger'];
  readonly sizes: ButtonSize[] = ['S', 'M', 'L', 'XL'];
  readonly states: ButtonState[] = ['default', 'hover', 'disabled'];

  get items(): Array<{ variant: ButtonVariant; size: ButtonSize; state: ButtonState }> {
    return this.variants.flatMap(variant => this.sizes.flatMap(size => this.states.map(state => ({ variant, size, state }))));
  }

  variantLabel(variant: ButtonVariant): string {
    return ({ primary: 'Primario', secondary: 'Secundario', tertiary: 'Terciario', link: 'Link', danger: 'Peligro' })[variant];
  }

  stateLabel(state: ButtonState): string {
    return ({ default: 'Default', hover: 'Hover', disabled: 'Disabled' })[state];
  }
}

@Component({
  selector: 'ds-input-gallery',
  standalone: true,
  imports: [CommonModule, DsInputComponent],
  template: `
    <div class="ds-input-gallery">
      <div class="ds-input-gallery__item" *ngFor="let example of examples">
        <p class="ds-input-gallery__caption">{{ sizeLabel(example.size) }} · {{ variantLabel(example.variant) }} · {{ stateLabel(example.state) }} · {{ contentLabel(example.content) }}</p>
        <ds-input
          [size]="example.size"
          [variant]="example.variant"
          [state]="example.state"
          [content]="example.content"
          label="Label"
          placeholder="Placeholder"
          [value]="example.content === 'input' ? 'Input' : ''"
          [showSupportingText]="false"
        ></ds-input>
      </div>
    </div>
  `,
  styleUrls: ['../../../ds-input.css'],
})
export class InputGalleryComponent {
  readonly examples: Array<{ size: InputSize; variant: InputVariant; state: InputState; content: InputContent }> = [];

  constructor() {
    for (const size of ['S', 'M', 'L', 'XL'] as InputSize[]) {
      for (const variant of ['outlined', 'filled'] as InputVariant[]) {
        for (const state of ['default', 'focused', 'error', 'disabled'] as InputState[]) {
          for (const content of ['placeholder', 'label', 'input'] as InputContent[]) {
            this.examples.push({ size, variant, state, content });
          }
        }
      }
    }
  }

  sizeLabel(size: InputSize): string { return size; }
  variantLabel(variant: InputVariant): string { return variant === 'filled' ? 'Relleno' : 'Delineado'; }
  stateLabel(state: InputState): string { return ({ default: 'Default', focused: 'Enfocado', error: 'Error', disabled: 'Deshabilitado' })[state]; }
  contentLabel(content: InputContent): string { return ({ placeholder: 'Placeholder', label: 'Label', input: 'Input' })[content]; }
}
