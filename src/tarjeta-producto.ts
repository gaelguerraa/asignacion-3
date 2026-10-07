import './boton-app';
import estilos from './tarjeta-producto.css?inline';
import type { DetalleAgregar } from './tipos';

const pesos = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

const escapar = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * <tarjeta-producto producto-id nombre precio imagen existencia>
 *  - ENTRADAS: atributos (siempre llegan como texto).
 *  - SALIDA: evento 'agregar' con { id, nombre, precio }.
 */
export class TarjetaProducto extends HTMLElement {
  static observedAttributes = ['producto-id', 'nombre', 'precio', 'imagen', 'existencia'];

  constructor() {
    super();
    const sombra = this.attachShadow({ mode: 'open' });

    // Un solo listener, delegado: sobrevive a los re-renders.
    sombra.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).closest('boton-app')) return;
      if (this.existencia <= 0) return;

      this.dispatchEvent(
        new CustomEvent<DetalleAgregar>('agregar', {
          detail: {
            id: this.getAttribute('producto-id') ?? '',
            nombre: this.getAttribute('nombre') ?? '',
            precio: this.precio,
          },
          bubbles: true,   // sube por el árbol...
          composed: true,  // ...y CRUZA la frontera del Shadow DOM
        }),
      );
    });
  }

  // Atributo (texto) -> número.
  private get precio(): number {
    return Number(this.getAttribute('precio')) || 0;
  }
  private get existencia(): number {
    return Number(this.getAttribute('existencia')) || 0;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  private render() {
    const nombre = escapar(this.getAttribute('nombre') ?? '');
    const imagen = escapar(this.getAttribute('imagen') ?? '');
    const { precio, existencia } = this;
    const agotado = existencia <= 0;

    this.shadowRoot!.innerHTML = `
      <style>${estilos}</style>
      <article class="tarjeta">
        <img src="${imagen}" alt="${nombre}">
        <div class="cuerpo">
          <h3>${nombre}</h3>
          <p class="precio">${pesos.format(precio)}</p>
          <p class="existencia${agotado ? ' agotado' : ''}">${agotado ? 'Agotado' : `${existencia} disponibles`}</p>
          <boton-app${agotado ? ' deshabilitado' : ''}>Agregar al carrito</boton-app>
        </div>
      </article>
    `;
  }
}

customElements.define('tarjeta-producto', TarjetaProducto);
