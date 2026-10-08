import estilos from './tabla-generica.css?inline';
import type { Columna, Fila } from './tipos';

const escapar = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export class TablaGenerica extends HTMLElement {
  private _columnas: Columna[] = [];
  private _filas: Fila[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  get columnas(): Columna[] {
    return this._columnas;
  }
  set columnas(valor: Columna[]) {
    this._columnas = valor;
    this.render();
  }

  get filas(): Fila[] {
    return this._filas;
  }
  set filas(valor: Fila[]) {
    this._filas = valor;
    this.render();
  }

  private render() {
    const encabezado = this._columnas.map((c) => `<th>${escapar(c.titulo)}</th>`).join('');

    const cuerpo =
      this._filas.length === 0
        ? `<tr><td class="vacio" colspan="${Math.max(this._columnas.length, 1)}">Sin datos</td></tr>`
        : this._filas
            .map(
              (fila) =>
                `<tr>${this._columnas
                  .map((c) => `<td>${escapar(String(fila[c.clave] ?? ''))}</td>`)
                  .join('')}</tr>`,
            )
            .join('');

    this.shadowRoot!.innerHTML = `
      <style>${estilos}</style>
      <table>
        <thead><tr>${encabezado}</tr></thead>
        <tbody>${cuerpo}</tbody>
      </table>
    `;
  }
}

customElements.define('tabla-generica', TablaGenerica);