# Editar el catálogo ZENP

Mientras no conectes Sanity, los ejemplos están en `src/data/productos.ts`.

Cada tarjeta abre `/producto/<id>/`. La ficha contiene una galería, descripción, precio, disponibilidad y botón de WhatsApp. La talla o capacidad seleccionada se incluye en el mensaje.

## Fotografías y descripción

Guarda tus fotos en `public/productos/` y referencia las rutas sin `public`:

```ts
{
  id: 'zap-01',
  nombre: 'Nike Dunk Low Retro',
  categoria: 'zapatillas',
  marca: 'Nike',
  modelo: 'Dunk Low',
  descripcion: 'Descripción real del producto, color y detalles incluidos.',
  precio: 480,
  precioOferta: 420, // Opcional; elimina este campo si no hay oferta.
  estado: 'stock', // stock | pedido | agotado
  tallas: ['US 8', 'US 9'],
  imagenes: [
    '/productos/dunk-lateral.jpg',
    '/productos/dunk-frente.jpg',
    '/productos/dunk-suela.jpg',
  ],
  destacado: true,
}
```

La primera imagen se usa en la tarjeta. Todas aparecen como miniaturas en la ficha. Para iPhones utiliza `capacidad`, `condicion` y, si corresponde, `bateria`. Para tecnología agrega `tipo`.

Las fotografías actuales son ejemplos de categoría, no fotografías verificadas de los modelos. Sustitúyelas antes de publicar.

## Estilos

Los componentes usan utilidades de Tailwind CSS v4, con variantes adaptables. `src/styles/global.css` solo contiene la importación de Tailwind, tokens de marca y reglas base de accesibilidad. Las clases semánticas restantes sirven como referencias para scripts y organización.

## Precios por talla y tallaje

En zapatillas puedes indicar `genero: 'mujer'`, `'hombre'` o `'unisex'`. Las etiquetas actuales muestran Mujer u Hombre. Especifica el sistema de talla en cada valor de `tallas` (por ejemplo US 7); no se convierten tallas automáticamente.

Para precios por talla agrega, por ejemplo:

```ts
genero: 'mujer',
estado: 'pedido',
tallas: ['US 6', 'US 7', 'US 8'],
preciosPorTalla: [
  { talla: 'US 6', precio: 590 },
  { talla: 'US 7', precio: 640 },
  { talla: 'US 8', precio: 690 },
],
```

Estos importes son ejemplos: reemplázalos por tus precios reales. La tarjeta y la ficha sin talla seleccionada muestran **Desde** con el menor importe. Elegir una talla actualiza el precio y el mensaje de WhatsApp. Con la lógica actual de tu catálogo, si una talla no tiene un precio personalizado se usa el precio base general; si tampoco hay un precio base válido se muestra **Consultar precio**. Cada variante también admite `precioOferta` (menor que `precio`).

`precioDesde: true` permite mostrar Desde aunque aún uses un precio base. La opción Desde se muestra únicamente si activas `precioDesde`, respetando la configuración actual de Sanity. El producto `zap-05` ilustra los precios por talla de mujer; es una muestra que debes revisar o eliminar antes de publicar.

Las fichas incluyen una guía desplegable con instrucciones de medición y enlaces oficiales por marca y tallaje. Configuración: `src/data/guias-tallas.ts`. Jordan utiliza la referencia de tallaje de Nike; confirma el ajuste específico de cada modelo.

## iPhones a pedido en dólares

Usa `precioPedidoUSD` y opcionalmente `precioOfertaPedidoUSD` para guardar los importes reales de importación en USD. Por ejemplo, `precioPedidoUSD: 799` significa US$ 799; es solo un ejemplo de configuración, no una cotización.

Estos campos se usan únicamente cuando un iPhone tiene `estado: 'pedido'`. Los campos `precio` y `precioOferta` mantienen su precio local en soles para stock. **Nunca se interpreta un precio en soles como dólares ni se convierte automáticamente.** Si no has cargado `precioPedidoUSD`, se muestra “Consultar precio en US$”. El iPhone a pedido actual necesita esa cotización.

Los precios muestran su símbolo S/ o US$ sin un filtro adicional de moneda. Al ordenar por precio con ambas divisas, primero se agrupan por moneda (PEN, USD) y luego se ordenan; los precios pendientes quedan al final.

## Métodos de pago e Izipay

El footer lee `pagos` en `src/data/tienda.ts`: Yape, Plin y transferencia bancaria. Cuando tengas el enlace de pago, rellena `enlaceIzipay` con tu URL HTTPS oficial; aparecerá el botón **Pagar con tarjeta · Izipay**. Vacío, no ofrece tarjetas ni muestra un enlace pendiente. No añadas credenciales de Izipay: solo se necesita el enlace público.

## Campos adicionales para Sanity

La consulta ya incluye `moneda` (`PEN` o `USD`, opcional), `genero`, `precioDesde`, `preciosPorTalla` (array de objetos con `talla`, `precio`, `precioOferta` opcional), `precioPedidoUSD` y `precioOfertaPedidoUSD`. Al crear tu Studio, agrega estos campos al esquema `producto`. Los campos son opcionales para mantener compatibles los productos existentes.

## Sanity pendiente

La lectura del catálogo está preparada en `src/lib/catalogo.ts`: cuando crees el proyecto, configura `SANITY_PROJECT_ID` y `SANITY_DATASET` en el entorno de Astro. El dataset debe ser público para esta consulta sin token. El tipo esperado es `producto`, con los campos del ejemplo, `activo: true` e `imagenes` como un array de imágenes de Sanity. `descripcion` se lee también desde Sanity.

Falta configurar tu Sanity Studio y sus esquemas cuando tengas el proyecto. El sitio es estático: los cambios de Sanity requieren volver a compilar y desplegar, o configurar un webhook de despliegue. La disponibilidad se administra manualmente; no se descuentan unidades automáticamente.

WhatsApp y redes: `src/data/tienda.ts`. Agrega TikTok ahí cuando tengas el enlace oficial.

## Comandos

- Desarrollo: `npm exec astro dev -- --background`
- Estado: `npm exec astro dev -- status`
- Detener: `npm exec astro dev -- stop`
- Compilar: `npm run build`


## Portada y navegación del catálogo

La portada utiliza `src/components/SeccionProductos.astro` para mantener el diseño de Novedades en todas las selecciones. Muestra hasta cuatro productos por sección:

- **Novedades**: productos destacados disponibles; si no hay destacados, usa los primeros productos disponibles.
- **Disponibles ahora**: productos en stock, dando prioridad a los que no aparecieron en Novedades.
- **A pedido**: productos con estado `pedido`.
- **Precios especiales**: productos disponibles con oferta válida; la sección se oculta si no hay ofertas.

El orden procede de la consulta actual del catálogo (en Sanity, los creados más recientemente primero). Los cambios aparecen al recompilar y desplegar. Ninguna sección modifica los productos o el stock de Sanity.

El menú se construye a partir de las marcas, series de iPhone y tipos/marcas de tecnología que existen en tus productos. Las opciones abren la categoría con su filtro activo, por ejemplo `/catalogo/zapatillas/?marca=Nike`. Los enlaces conservan búsqueda, filtros, orden y página en la URL.

## Paginación y carga de imágenes

El catálogo muestra **12 productos por página**, con controles Anterior, números y Siguiente. Buscar, filtrar u ordenar devuelve a la primera página; volver atrás en el navegador recupera la página y los filtros anteriores.

Las fotografías de producto usan `loading="lazy"` y `decoding="async"`. Los productos de páginas posteriores están en plantillas HTML inactivas: sus imágenes no se solicitan hasta que se muestran. La primera imagen del banner usa carga inmediata y prioridad alta. No se cargan secciones mediante peticiones nuevas a Sanity al hacer scroll: el sitio sigue siendo estático. Sin JavaScript, se ofrece el listado completo como alternativa.

## Símbolos de pago en el footer

Los métodos y el copyright comparten una única fila en escritorio. En móvil el copyright puede pasar a otra línea, pero los símbolos de pago permanecen juntos. El enlace de Izipay sigue siendo opcional en `src/data/tienda.ts`.

Logotipos locales obtenidos de las páginas oficiales:

- Yape: `public/pagos/yape.png`, fuente https://www.yape.com.pe/_next/image?q=100&url=%2Fimages%2Fcomponents%2Fcomponent-25%2Flogo.png&w=256
- Plin: `public/pagos/plin.png`, fuente https://plin.pe/logo.png

Transferencia bancaria utiliza un símbolo vectorial accesible; los tres métodos mantienen su nombre para lectores de pantalla.


## Presentación y filtros simplificados

Las secciones del inicio y las tarjetas recuperaron el ancho, la distribución y la tipografía que tenían antes de la ampliación. Se retiró el bloque editorial intermedio.

Se quitaron los filtros Condición (iPhones) y Moneda (todas las categorías). En zapatillas aparecen Talla US y Género (Hombre/Mujer). El filtro US normaliza valores como `8`, `8 W` y `US 8` a `US 8`; las tallas originales permanecen intactas en las fichas y mensajes. Valores como `38 EUR`, `40.5` u “Otras tallas a pedido” no se etiquetan ni se convierten automáticamente a US.
