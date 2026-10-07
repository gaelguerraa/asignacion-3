export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  existencia: number;
}

// Lo que viaja dentro del evento 'agregar' (la SALIDA de la tarjeta).
export interface DetalleAgregar {
  id: string;
  nombre: string;
  precio: number;
}

declare global {
  interface HTMLElementEventMap {
    agregar: CustomEvent<DetalleAgregar>;
  }
}
