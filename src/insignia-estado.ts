import estilos from './insignia-estado.css?inline';
import type { EstadoInsignia } from './tipos';

const TEXTOS: Record<EstadoInsignia, string> = {
  'disponible': 'Disponible',
  'pocas-piezas': 'Pocas piezas',
  'agotado': 'Agotado',
};


export class InsigniaEstado extends HTMLElement {
  static observedAttributes = ['estado'];

  private etiqueta: HTMLSpanElement;

  constructor() {
    super();
    const sombra = this.attachShadow({ mode: 'open' });
    sombra.innerHTML = `<style>${estilos}</style><span></span>`;
    this.etiqueta = sombra.querySelector('span')!;
  }

  connectedCallback() {
    this.actualizar();
  }

  attributeChangedCallback() {
    this.actualizar();
  }

  private actualizar() {
    const valor = this.getAttribute('estado') as EstadoInsignia | null;
    const estado: EstadoInsignia = valor && valor in TEXTOS ? valor : 'disponible';
    this.etiqueta.className = estado;
    this.etiqueta.textContent = TEXTOS[estado];
  }
}

customElements.define('insignia-estado', InsigniaEstado);