import estilos from './boton-app.css?inline';

const VARIANTES = ['primario', 'secundario', 'peligro'];

/**
 * <boton-app variante="primario|secundario|peligro" deshabilitado>Texto</boton-app>
 *  - ENTRADAS: atributos `variante` y `deshabilitado`, y el texto por el <slot>.
 *  - SALIDA: el click normal del navegador.
 *  - AISLADO: su CSS vive en el Shadow DOM.
 */
export class BotonApp extends HTMLElement {
  static observedAttributes = ['variante', 'deshabilitado'];

  private boton: HTMLButtonElement;

  constructor() {
    super();
    const sombra = this.attachShadow({ mode: 'open' });
    sombra.innerHTML = `
      <style>${estilos}</style>
      <button class="primario"><slot>Vaciar</slot></button>
    `;
    this.boton = sombra.querySelector('button')!;
  }

  connectedCallback() {
    this.actualizar();
  }

  attributeChangedCallback() {
    this.actualizar();
  }

  private actualizar() {
    const variante = this.getAttribute('variante') ?? 'primario';
    this.boton.className = VARIANTES.includes(variante) ? variante : 'primario';
    // Atributo booleano: basta con que exista.
    this.boton.disabled = this.hasAttribute('deshabilitado');
  }
}

// El nombre DEBE llevar guion (ver README).
customElements.define('boton-app', BotonApp);
