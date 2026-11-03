import type { Producto } from '../data/productos';
import { precioProducto, formatearPrecio } from './precios.ts';

export function crearBannerProducto(productos:Producto[], id:string) {
  const producto = productos.find(p => String(p.id) === id && p.estado !== 'agotado' && p.imagenes?.length);
  if (!producto) return null;
  const precio = precioProducto({...producto,precioDesde:true});
  return {
    nombre:producto.nombre, etiqueta:'SNEAKERS / ZENP', imagen:producto.imagenes[1],
    alt:producto.nombre, enlace:`/producto/${producto.id}/`, posicion:'object-contain pb-44 sm:pb-0 sm:pl-[35%]',
    precio:precio.valor !== null ? `${producto.estado === 'stock' ? 'Disponible' : 'A pedido'} desde ${formatearPrecio(precio.valor,precio.divisa)}` : 'Consulta su disponibilidad',
    producto:true,
  };
}

export function seleccionarProductosPortada(productos:Producto[], ids:Partial<Record<Producto['categoria'],string>> = {}) {
  return (['zapatillas','iphones','tecnologia'] as const).flatMap(categoria => {
    const candidatos = productos.filter(p => p.categoria === categoria && p.estado !== 'agotado');
    const producto = candidatos.find(p => ids[categoria] && String(p.id) === ids[categoria])
      || candidatos.find(p => p.estado === 'stock' && p.destacado)
      || candidatos.find(p => p.estado === 'stock')
      || candidatos.find(p => p.destacado)
      || candidatos[0];
    return producto ? [producto] : [];
  });
}
