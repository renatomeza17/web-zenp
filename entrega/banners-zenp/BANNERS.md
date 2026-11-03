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
| Computadora | 1920 × 720 px | 8:3 |
| Celular | 900 × 1200 px | 3:4 |

Exporta en WebP, JPG o PNG. Idealmente menos de 500 KB por archivo. Mantén los textos y logos importantes separados de los bordes. Reserva aproximadamente el 12% inferior y el 6% lateral para que los controles del carrusel no tapen contenido. No añadas flechas o puntos al diseño: ya los coloca la web.

La web muestra la imagen completa sin recortarla. Si usas otra proporción, pueden aparecer franjas negras; Sanity avisa si la proporción no coincide.

## Diseños actuales convertidos

En `public/banners/` están las versiones horizontal (`-desktop`) y vertical (`-movil`) de Jordan, iPhones, Razer y Jordan UNC. Los WebP son los archivos recomendados para subir. Los PNG conservan una copia de la exportación.

**Importante:** El precio S/ 600 del ejemplo Jordan UNC quedó integrado en la imagen. No se sincroniza con el producto. Si cambia la promoción, reemplaza los dos diseños y su descripción accesible. Lo mismo ocurre con cualquier texto o disponibilidad dibujados en una imagen.

## Primera configuración (desarrollador)

El código del panel está en `studio/schemaTypes/portada.ts`; se registra en `studio/schemaTypes/index.ts` y `studio/sanity.config.ts`.

1. Desde `studio`, ejecuta `npm run dev` para probar el formulario localmente; o `npm run deploy` para actualizar tu Studio publicado con tu cuenta de Sanity. Esta entrega no ha desplegado el Studio ni modificado documentos en la nube.
2. Abre **Banners de portada**. El documento único tiene ID `portada`.
3. Añade cada banner, sube sus dos versiones, completa la descripción y el destino. Para empezar puedes usar los archivos WebP de `public/banners/`.
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
