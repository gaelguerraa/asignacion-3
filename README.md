## Práctica 12 — Tabla genérica e insignia de estado

### Parte A · `<tabla-generica>`

**¿Por qué se puede llamar «genérica»?**
Porque el componente nunca menciona datos concretos como «precio» o «nombre». Solo recibe una lista
de columnas (`clave` + `titulo`) y una lista de filas (objetos cualesquiera), pinta un `<th>` por
columna y, por cada fila, un `<td>` con `fila[columna.clave]`. Qué significan los datos lo decide
quien la usa.

**¿Qué tendría que cambiar para mostrar alumnos en lugar de productos?**
Nada dentro de la tabla. Solo cambian las dos propiedades que se le asignan desde afuera, por ejemplo
`columnas = [{clave:'matricula', titulo:'Matrícula'}, {clave:'nombre', titulo:'Nombre'}]` y
`filas = [{matricula:'123', nombre:'Ana'}, ...]`.

Columnas y filas se reciben como **propiedades** (con `set`) y no como atributos, porque son arreglos
y un atributo solo guarda texto. Cada vez que se asigna una, la tabla se vuelve a pintar. Si no hay
filas muestra «Sin datos».

### Parte B · `<insignia-estado>`

- **Recibe:** el atributo vigilado `estado` (`disponible`, `pocas-piezas` o `agotado`).
- **Avisa:** nada hacia afuera; la insignia solo muestra (como permite el enunciado).
- **Guarda adentro:** su `<span>`, el mapa de textos por estado y sus estilos (color de cada estado), todo dentro del árbol de sombra.

Se usa dentro de cada `<tarjeta-producto>`: agotado si la existencia es 0, pocas piezas si es 5 o menos, disponible en otro caso.
