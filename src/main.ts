import './boton-app';
import './tarjeta-producto';
import type { TablaGenerica } from './tabla-generica';
import './tabla-generica';
import type { Producto } from './tipos';

const rejilla = document.querySelector<HTMLElement>('#rejilla')!;

const productos: Producto[] = [
  { id: 'P-001', nombre: 'Tenis para correr Vento', precio: 1299, categoria: 'calzado', imagen: '/img/producto-01.jpg', existencia: 8 },
  { id: 'P-002', nombre: 'Tenis de entrenamiento Cross', precio: 1549, categoria: 'calzado', imagen: '/img/producto-02.jpg', existencia: 25 },
  { id: 'P-003', nombre: 'Tenis casuales Urbano', precio: 989, categoria: 'calzado', imagen: '/img/producto-03.jpg', existencia: 8 },
  { id: 'P-004', nombre: 'Sandalias de recuperación', precio: 449, categoria: 'calzado', imagen: '/img/producto-04.jpg', existencia: 25 },
  { id: 'P-005', nombre: 'Playera deportiva seca', precio: 399, categoria: 'ropa', imagen: '/img/producto-05.jpg', existencia: 3 },
  { id: 'P-006', nombre: 'Playera de algodón clásica', precio: 289, categoria: 'ropa', imagen: '/img/producto-06.jpg', existencia: 25 },
  { id: 'P-007', nombre: 'Sudadera con capucha', precio: 749, categoria: 'ropa', imagen: '/img/producto-07.jpg', existencia: 8 },
  { id: 'P-008', nombre: 'Short de entrenamiento', precio: 359, categoria: 'ropa', imagen: '/img/producto-08.jpg', existencia: 12 },
  { id: 'P-009', nombre: 'Licra de compresión', precio: 529, categoria: 'ropa', imagen: '/img/producto-09.jpg', existencia: 0 },
  { id: 'P-010', nombre: 'Pantalón deportivo', precio: 649, categoria: 'ropa', imagen: '/img/producto-10.jpg', existencia: 5 },
  { id: 'P-011', nombre: 'Chamarra rompeviento', precio: 899, categoria: 'ropa', imagen: '/img/producto-11.jpg', existencia: 0 },
  { id: 'P-012', nombre: 'Calcetas deportivas (3 pares)', precio: 179, categoria: 'ropa', imagen: '/img/producto-12.jpg', existencia: 25 },
];

// Una tarjeta por producto, configurada SOLO con atributos.
for (const p of productos) {
  const tarjeta = document.createElement('tarjeta-producto');
  tarjeta.setAttribute('producto-id', p.id);
  tarjeta.setAttribute('nombre', p.nombre);
  tarjeta.setAttribute('precio', String(p.precio));
  tarjeta.setAttribute('imagen', p.imagen);
  tarjeta.setAttribute('existencia', String(p.existencia));
  rejilla.append(tarjeta);
}

const cuenta = document.querySelector<HTMLElement>('#cuenta')!;
const vaciar = document.querySelector<HTMLElement>('#vaciar')!;
const tabla = document.querySelector<TablaGenerica>('#tabla-carrito')!;

const pesos = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

// El estado del carrito: id -> línea con cantidad.
const carrito = new Map<string, { producto: string; precio: number; cantidad: number }>();

// La tabla no sabe de productos: solo recibe columnas y filas.
tabla.columnas = [
  { clave: 'producto', titulo: 'Producto' },
  { clave: 'precio', titulo: 'Precio' },
  { clave: 'cantidad', titulo: 'Cantidad' },
];

function actualizarVista() {
  let total = 0;
  const filas = [];
  for (const linea of carrito.values()) {
    total += linea.cantidad;
    filas.push({ producto: linea.producto, precio: pesos.format(linea.precio), cantidad: linea.cantidad });
  }
  cuenta.textContent = String(total);
  tabla.filas = filas;
}
actualizarVista();

// UN solo listener para las doce tarjetas: el evento sube hasta la rejilla.
rejilla.addEventListener('agregar', (e) => {
  const { id, nombre, precio } = e.detail;
  const linea = carrito.get(id);
  if (linea) linea.cantidad++;
  else carrito.set(id, { producto: nombre, precio, cantidad: 1 });
  actualizarVista();
});

vaciar.addEventListener('click', () => {
  carrito.clear();
  actualizarVista();
});