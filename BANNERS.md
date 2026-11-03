# Banners administrables de ZENP

## Ya implementado en la carpeta

- El carrusel solo muestra imágenes completas. No añade títulos, precios, botones comerciales ni degradados HTML.
- Conserva flechas, puntos, teclado y gesto horizontal.
- Usa una imagen horizontal desde 640 px y otra vertical en pantallas menores.
- Sanity tiene una sección única **Banners de portada**. La lista se reordena arrastrando.
- Cada banner puede activarse, ocultarse y enlazarse a un producto publicado o a una ruta/categoría. También puede mostrarse sin enlace.
- El nombre interno no aparece sobre la imagen. La descripción accesible sí debe describir su contenido y texto importante.

## Medidas para Canva o para tu diseñador

| Versión | Tamaño recomendado | Proporción |
| --- | --- | --- |
| Computadora | 3840 × 1440 px (mínimo 1920 × 720) | 8:3 |
| Celular | 1800 × 2400 px (mínimo 900 × 1200) | 3:4 |

Exporta desde el diseño original en PNG o WebP sin pérdida, a tamaño 2×. No amplíes un banner pequeño ya exportado. Una imagen con fotografías puede superar 1 MB: ajusta el peso solo si la nitidez se mantiene. La web selecciona la resolución según la pantalla; Sanity sirve variantes de alta calidad (95) hasta 3840 px en horizontal y 1800 px en vertical, sin ampliar más allá del original. Mantén los textos y logos importantes separados de los bordes. Reserva aproximadamente el 12% inferior y el 6% lateral para que los controles del carrusel no tapen contenido. No añadas flechas o puntos al diseño: ya los coloca la web.

La web muestra la imagen completa sin recortarla. Si usas otra proporción, pueden aparecer franjas negras; Sanity avisa si la proporción no coincide.

## Diseños actuales convertidos

En `public/banners/` están las versiones horizontal (`-desktop`) y vertical (`-movil`) de Jordan, iPhones, Razer y Jordan UNC. Los archivos `-hd.webp` (sin pérdida) o `-hd.png` son los recomendados para subir; conservan la exportación a 2×. Las versiones WebP sin `-hd` se sirven a pantallas de menor densidad.

**Importante:** El precio S/ 600 del ejemplo Jordan UNC quedó integrado en la imagen. No se sincroniza con el producto. Si cambia la promoción, reemplaza los dos diseños y su descripción accesible. Lo mismo ocurre con cualquier texto o disponibilidad dibujados en una imagen.

## Primera configuración (desarrollador)

El código del panel está en `studio/schemaTypes/portada.ts`; se registra en `studio/schemaTypes/index.ts` y `studio/sanity.config.ts`.

1. Desde `studio`, ejecuta `npm run dev` para probar el formulario localmente; o `npm run deploy` para actualizar tu Studio publicado con tu cuenta de Sanity. Esta entrega no ha desplegado el Studio ni modificado documentos en la nube.
2. Abre **Banners de portada**. El documento único tiene ID `portada`.
3. Añade cada banner, sube sus dos versiones, completa la descripción y el destino. Para empezar puedes usar los archivos `-hd.webp` de `public/banners/`.
4. Reordena los elementos arrastrándolos y pulsa **Publicar**.
5. Reconstruye y despliega la web. En desarrollo los datos se consultan al recargar.

Mientras no exista una portada publicada, la web muestra los diseños locales convertidos. Cuando publiques ese documento, solo mostrará la lista de Sanity. Publicar una lista vacía o con todos los banners ocultos elimina el carrusel; no reaparecen los ejemplos.

### Actualización automática del sitio estático

Publicar en Sanity no cambia por sí solo el HTML de producción. Al configurar el alojamiento, crea su enlace de reconstrucción (build/deploy hook) y un webhook en Sanity que invoque ese enlace al crear o actualizar el documento publicado `_id == "portada"`. Si el alojamiento permite incluir eliminaciones, inclúyelas también. No publiques el enlace privado de reconstrucción en el frontend. Conviene aplicar el mismo mecanismo a los productos. Este paso depende del proveedor de alojamiento y aún no está configurado.

## Uso del cliente, una vez publicado el panel

1. Entrar a Sanity y abrir **Banners de portada**.
2. Añadir o editar un banner.
3. Subir imagen para computadora e imagen para celular.
4. Elegir adónde lleva el clic.
5. Arrastrar para cambiar el orden o desactivar para ocultar.
6. Pulsar **Publicar** y esperar la actualización de la web si está configurada la reconstrucción automática.

No necesita editar código para administrar diseños, enlaces, visibilidad u orden.

## Nitidez de fotografías

Los banners HD se vuelven a renderizar desde las fotos originales y los textos, en lugar de ampliar las capturas antiguas. Aun así, la foto Jordan de origen mide 1920 × 1080, la nueva de iPhones (`imagen iphone banner.webp`) 1500 × 1500 y la de Razer 1187 × 890. Un lienzo mayor mejora la nitidez del texto pero no inventa detalle fotográfico. Para resultados más nítidos en pantallas Retina, usa fotografías de origen de mayor tamaño y evita copias descargadas de chats o capturas de pantalla.

## Cómo cambiar el orden paso a paso

1. En Sanity, abre **Banners de portada** en la columna izquierda.
2. Busca la lista **Banners (arrastra para ordenar)**. Si estás editando una imagen o un banner, cierra ese editor para volver a la lista.
3. Coloca el cursor sobre el lado izquierdo de la fila del banner, donde está el tirador de puntos. Mantén presionado y arrastra hacia arriba o abajo.
4. El primer elemento visible de la lista es el primer banner del carrusel; el segundo es el segundo, etc. Los desactivados se omiten sin cambiar el orden del resto.
5. Pulsa **Publicar** en ese documento. En desarrollo, recarga la web. En producción, espera la reconstrucción si hay un webhook configurado; de lo contrario hay que compilar y desplegar de nuevo.

No se escribe un número de orden en cada imagen y no depende del orden de subida a la biblioteca de archivos. Se ordenan los elementos de la lista. Si **Banners de portada** no aparece en el Studio publicado, primero debe desplegarse la versión actualizada de `studio`.
