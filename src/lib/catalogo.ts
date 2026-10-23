import { productos, type Producto } from '../data/productos';
export const modoDemo = !import.meta.env.SANITY_PROJECT_ID;

async function cargarProductos(): Promise<Producto[]> {

 const project = import.meta.env.SANITY_PROJECT_ID;

 const dataset = import.meta.env.SANITY_DATASET || 'production';
 if (!project) return productos;
 if (!/^[a-z0-9-]+$/.test(project) || !/^[a-zA-Z0-9_-]+$/.test(dataset)) throw new Error('Configuración de Sanity inválida');
 
 const query = `*[_type == "producto" && activo == true] | order(_createdAt desc) {"id": _id, nombre, descripcion, categoria, marca, modelo, tipo, condicion, precio, precioOferta, moneda, precioPedidoUSD, precioOfertaPedidoUSD, precioDesde, genero, preciosPorTalla[]{talla, precio, precioOferta}, estado, tallas, capacidad, bateria, destacado, "imagenes": imagenes[].asset->url}`;

 const response = await fetch(`https://${project}.api.sanity.io/v2026-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`, {signal:AbortSignal.timeout(15000)});
 if (!response.ok) throw new Error(`No se pudo leer Sanity (${response.status}). Revisa el proyecto y dataset público.`);


 const data = await response.json();

 return (data.result || []).map((p:Producto) => ({...p, imagenes:(p.imagenes || []).map(url => `${url}?w=900&fit=max&auto=format`)}));

}


// Share one catalog snapshot during a static build; development always reads fresh data.
let productosBuild: Promise<Producto[]> | undefined;
export function getProductos(): Promise<Producto[]> {
 if (import.meta.env.DEV) return cargarProductos();
 return productosBuild ??= cargarProductos().catch(error => { productosBuild = undefined; throw error; });
}
