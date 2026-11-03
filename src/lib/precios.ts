import type { Producto } from '../data/productos';

export type Divisa = 'PEN' | 'USD';

export const formatearPrecio = (valor: number, divisa: Divisa = 'PEN') =>
  `${divisa === 'USD' ? 'US$' : 'S/'} ${new Intl.NumberFormat('es-PE', {
    minimumFractionDigits: Number.isInteger(valor) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(valor)}`;

const valido = (valor: unknown): valor is number =>
  typeof valor === 'number' && Number.isFinite(valor) && valor > 0;

function importe(precio: unknown, oferta: unknown) {
  if (!valido(precio)) return { valor: null, anterior: null };
  return valido(oferta) && oferta < precio
    ? { valor: oferta, anterior: precio }
    : { valor: precio, anterior: null };
}

export const usaTallas = (p: Pick<Producto,'categoria'>) => p.categoria === 'zapatillas' || p.categoria === 'ropa';

export function tallasProducto(p: Producto): string[] {
  return [...new Set([...(p.tallas || []), ...(p.preciosPorTalla || []).map((v) => v.talla)])];
}

export const generoEtiqueta = (p: Pick<Producto, 'genero'>) =>
  ({
    mujer: 'Mujer',
    hombre: 'Hombre',
    unisex: '',
  })[p.genero!] || '';

// Reconoce también mayúsculas y espacios adicionales del texto guardado en Sanity.
export function esTallaAPedido(p: Producto, talla = '') {
  return usaTallas(p) && /\ba\s+pedido\b/i.test(talla.trim());
}

export function precioProducto(p: Producto, talla = '') {
  const mostrarDesde = Boolean(p.precioDesde) || (p.categoria === 'zapatillas' && (p.estado === 'pedido' || tallasProducto(p).some(t => esTallaAPedido(p,t))));
  const iphonePedido = p.categoria === 'iphones' && p.estado === 'pedido';
  const divisa: Divisa = iphonePedido ? 'USD' : (p.moneda || 'PEN');
  const variantes = usaTallas(p) ? p.preciosPorTalla || [] : [];
  const tieneVariantesConPrecio = variantes.length > 0;

  // 1. Precio base general configurado en Sanity
  let precio = iphonePedido
    ? importe(p.precioPedidoUSD, p.precioOfertaPedidoUSD)
    : importe(p.precio, p.precioOferta);

  // 2. Si el producto tiene precios específicos por talla
  if (tieneVariantesConPrecio) {
    if (talla) {
      // Si el cliente seleccionó una talla en el dropdown
      const variante = variantes.find((v) => v.talla === talla);
      if (variante && valido(variante.precio)) {
        precio = importe(variante.precio, variante.precioOferta);
      }
      // Si esa talla no tiene precio personalizado, mantiene el precio base general
    } else {
      // Si no ha seleccionado talla pero sí existen precios por talla y activó precioDesde
      const preciosValidos = variantes
        .map((v) => importe(v.precio, v.precioOferta))
        .filter((v) => v.valor !== null);

      if (preciosValidos.length > 0 && mostrarDesde) {
        precio = preciosValidos.sort((a, b) => a.valor! - b.valor!)[0];
      }
    }
  }

  if (esTallaAPedido(p,talla)) precio = {valor:null,anterior:null};

  // El mínimo se anuncia antes de elegir una talla; la importación abierta se cotiza.
  const desde = !talla && mostrarDesde;

  const texto =
    precio.valor === null
      ? `Consultar precio en ${divisa === 'USD' ? 'US$' : 'S/'}`
      : `${desde ? 'Desde ' : ''}${formatearPrecio(precio.valor, divisa)}`;

  return {
    ...precio,
    divisa,
    porTalla: tieneVariantesConPrecio,
    desde,
    texto,
    descuento:
      precio.anterior && precio.valor !== null
        ? Math.round((1 - precio.valor / precio.anterior) * 100)
        : null,
  };
}

export function mensajeProducto(p: Producto, seleccion = '') {
  const precio = precioProducto(p, usaTallas(p) ? seleccion : '');
  const tallaPedido = esTallaAPedido(p,seleccion);
  const estado = tallaPedido ? 'A pedido / importación' : {
    stock: 'En stock',
    pedido: 'A pedido / importación',
    agotado: 'Agotado',
  }[p.estado];

  return (
    `Hola ZENP, ${p.estado === 'agotado' ? 'quisiera consultar la reposición de' : 'me interesa'} ${p.nombre}. ` +
    `Precio publicado: ${precio.texto}. Disponibilidad: ${estado}.` +
    (tallaPedido ? ' Quisiera consultar otra talla para importar. Mi talla es: ____. Por favor confirmar precio y plazo.' : '') +
    (usaTallas(p)
      ? ` ${generoEtiqueta(p) || 'Tallaje por confirmar'}. Talla: ${seleccion || 'por confirmar'}.`
      : '') +
    (p.capacidad ? ` Capacidad: ${seleccion || p.capacidad}.` : '') +
    (p.condicion ? ` Condición: ${p.condicion}.` : '') +
    (p.bateria ? ` Batería: ${p.bateria}.` : '')
  );
}