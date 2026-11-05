import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { colorValue, cssName, displayValue, resolveToken, tokens } from '../../../token-utils';
import { DsButtonComponent } from './ds-button.component';
import { DsInputComponent } from './ds-input.component';

type DesignToken = (typeof tokens)[number];

/** Catálogo navegable de los tokens que se importaron desde las variables de Figma. */
@Component({
  selector: 'ds-token-catalog',
  standalone: true,
  imports: [CommonModule, DsButtonComponent, DsInputComponent],
  template: `
    <section class="token-catalog" [attr.data-ds-theme]="mode">
      <div class="token-catalog__toolbar">
        <label>Buscar token
          <input type="search" placeholder="Nombre, referencia o valor…" [value]="query" (input)="query = inputValue($event)" />
        </label>
        <label>Marca
          <select [value]="mode" (change)="mode = inputValue($event)">
            <option value="cliente-rico">cliente-rico</option>
            <option value="erecauda">erecauda</option>
          </select>
        </label>
      </div>
      <p class="token-catalog__count" aria-live="polite">
        {{ visibleTokens.length }} de {{ collectionTokens.length }} tokens · {{ collection === 'Componente' ? mode : 'Colección compartida entre marcas' }}
      </p>
      <div *ngIf="collection === 'Componente'" class="token-catalog__samples">
        <p>Ejemplos conectados a los tokens de color:</p>
        <ds-button label="Acción primaria" [showIcon]="false"></ds-button>
        <ds-input label="Campo de texto" state="focused" content="label" supportingText="El foco cambia con la marca."></ds-input>
      </div>
      <div class="token-catalog__table-wrap">
        <table [attr.aria-label]="'Tokens de ' + collection">
          <thead><tr><th scope="col">Vista previa</th><th scope="col">Token</th><th scope="col">Valor</th><th scope="col">Referencias</th></tr></thead>
          <tbody>
            <tr *ngFor="let token of visibleTokens">
              <td>
                <div class="token-catalog__preview" aria-hidden="true">
                  <span *ngIf="token.type === 'color'" class="token-catalog__swatch" [style.backgroundColor]="previewColor(token)"></span>
                  <span *ngIf="token.name.startsWith('border/radius/')" class="token-catalog__radius" [style.borderRadius.px]="resolved(token).value"></span>
                  <span *ngIf="token.name.startsWith('font/')" [style.fontWeight]="fontWeight(token)" [style.fontSize.px]="fontSize(token)" [style.fontFamily]="fontFamily(token)">Aa</span>
                  <span *ngIf="token.type !== 'color' && !token.name.startsWith('border/radius/') && !token.name.startsWith('font/')" class="token-catalog__measure" [style.width.px]="measureWidth(token)"></span>
                </div>
              </td>
              <th scope="row"><code>{{ token.name }}</code><small *ngIf="token.description">{{ token.description }}</small></th>
              <td><code>{{ tokenValue(token) }}</code></td>
              <td>
                <span class="token-catalog__chain">{{ referenceChain(token) }}</span>
                <code class="token-catalog__css-name">{{ cssName(token.name) }}</code>
              </td>
            </tr>
            <tr *ngIf="visibleTokens.length === 0"><td colspan="4">No se encontraron tokens. Probá con otro nombre, referencia o valor.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styleUrls: ['../../../token-catalog.css'],
})
export class TokenCatalogComponent {
  @Input() collection: 'Primitivo' | 'Semantico' | 'Componente' = 'Primitivo';
  query = '';
  mode: 'cliente-rico' | 'erecauda' = 'cliente-rico';

  get collectionTokens(): DesignToken[] {
    return tokens.filter(token => token.collection === this.collection);
  }

  get visibleTokens(): DesignToken[] {
    const query = this.query.trim().toLowerCase();
    if (!query) return this.collectionTokens;
    return this.collectionTokens.filter(token => {
      const resolved = resolveToken(token.name, this.mode);
      return [token.name, this.tokenValue(token), ...resolved.chain, token.description ?? ''].join(' ').toLowerCase().includes(query);
    });
  }

  inputValue(event: Event): string { return (event.target as HTMLInputElement | HTMLSelectElement).value; }
  resolved(token: DesignToken) { return resolveToken(token.name, this.mode); }
  tokenValue(token: DesignToken): string { return displayValue(token, this.resolved(token)); }
  previewColor(token: DesignToken): string { return colorValue(this.resolved(token)); }
  cssName(name: string): string { return cssName(name); }

  referenceChain(token: DesignToken): string {
    const chain = this.resolved(token).chain;
    return chain.length > 1 ? chain.slice(1).join(' → ') : 'Valor directo';
  }

  measureWidth(token: DesignToken): number {
    return Math.max(4, Math.min(Number(this.resolved(token).value), 100));
  }

  fontWeight(token: DesignToken): string | number | null {
    return token.name.startsWith('font/weight/') ? this.resolved(token).value : null;
  }

  fontSize(token: DesignToken): number | null {
    return token.name.startsWith('font/size/') ? Math.min(Number(this.resolved(token).value), 40) : null;
  }

  fontFamily(token: DesignToken): string | null {
    return token.name.startsWith('font/family/') ? String(this.resolved(token).value) : null;
  }
}
