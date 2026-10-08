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


export interface Columna {
  clave: string;
  titulo: string;
}

export type Fila = Record<string, unknown>;

export type EstadoInsignia = 'disponible' | 'pocas-piezas' | 'agotado';