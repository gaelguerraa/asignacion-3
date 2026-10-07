# Práctica 11 — Componentes con TypeScript puro

Web Components (`<boton-app>` y `<tarjeta-producto>`) con Vite + vanilla-ts, sin frameworks.

## Cómo correrlo

```bash
npm install
npm run dev
```

> Copia la carpeta `img/` del código base dentro de `public/img/` (fotos `producto-01.jpg` … `producto-12.jpg`).

## Ejercicio 1 — Botón reutilizable

**Qué pasa al cambiar la variante en el HTML (sin tocar el TypeScript):**
Al cambiar `variante="secundario"` por `primario` o `peligro` en `index.html`, el botón cambia de
aspecto al instante (fondo azul, blanco con borde, o rojo). El TypeScript no se modificó porque el
componente observa el atributo `variante` (`observedAttributes`) y `attributeChangedCallback`
vuelve a aplicar la clase CSS correspondiente. El HTML es quien "configura" al componente.

**¿Por qué el nombre de una etiqueta propia debe llevar guion?**
Porque el HTML ya tiene (y puede tener en el futuro) etiquetas con nombres de una sola palabra
(`button`, `article`, `section`…). La especificación reserva todos los nombres sin guion para el
estándar, de modo que una etiqueta propia con guion (`boton-app`) nunca va a chocar con una
etiqueta oficial presente o futura. Además el navegador usa el guion para distinguir un
elemento personalizado de uno desconocido, y `customElements.define` lanza error si falta.

## Ejercicio 2 — Tarjeta de producto

**Contrato de la tarjeta**
- **Entradas:** atributos `producto-id`, `nombre`, `precio`, `imagen`, `existencia` (llegan como texto; `precio` y `existencia` se convierten con `Number()`).
- **Salida:** evento propio `agregar` con `{ id, nombre, precio }`.
- **Aislado:** su CSS vive en el Shadow DOM y no se mezcla con el de la página.

**¿Qué pasa si el evento no puede salir del árbol de sombra?**
Si el `CustomEvent` se crea sin `composed: true`, no cruza la frontera del Shadow DOM: se queda
dentro de la sombra y el listener de la rejilla jamás se entera. El contador no se mueve y **no
hay ningún error**, porque para el navegador todo funcionó: el evento sí se emitió, solo que
nadie fuera de la sombra puede escucharlo. Se necesitan `bubbles: true` (que suba) **y**
`composed: true` (que cruce la sombra).

## Evidencias

Capturas en `evidencias/`:
- Botón en sus variantes (primario, secundario, peligro y deshabilitado)
- Catálogo con las tarjetas agotadas
- Contador después de agregar
