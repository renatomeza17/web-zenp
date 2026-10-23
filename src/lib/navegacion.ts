import type { Producto } from '../data/productos';

export const parametrosFiltro: Record<string, string> = {
  brand:'marca', model:'modelo', family:'serie', type:'tipo', state:'estado', size:'talla',
  gender:'genero', currency:'moneda', capacity:'capacidad', condition:'condicion',
};

export function urlCatalogo(categoria = '', filtros: Record<string,string> = {}) {
  const params = new URLSearchParams();
  for (const [key,value] of Object.entries(filtros)) if (value) params.set(parametrosFiltro[key] || key, value);
  return `/catalogo/${categoria ? `${categoria}/` : ''}${params.size ? `?${params}` : ''}`;
}

export const familiaIphone = (modelo = '') => modelo.match(/\biPhone\s+(\d+|SE)\b/i)?.[0] || modelo;

export function menuCatalogo(productos: Producto[]) {
  const unique = (items:string[]) => [...new Set(items.filter(Boolean))].sort((a,b) => a.localeCompare(b,'es',{numeric:true}));
  return [
    { titulo:'Zapatillas', enlace:urlCatalogo('zapatillas'), marcas:unique(productos.filter(p => p.categoria === 'zapatillas').map(p => p.marca)).map(nombre => ({nombre,href:urlCatalogo('zapatillas',{brand:nombre})})) },
    { titulo:'iPhones', enlace:urlCatalogo('iphones'), marcas:unique(productos.filter(p => p.categoria === 'iphones').map(p => familiaIphone(p.modelo || p.nombre))).map(nombre => ({nombre,href:urlCatalogo('iphones',{family:nombre})})) },
    { titulo:'Tecnología', enlace:urlCatalogo('tecnologia'), marcas:[
      ...unique(productos.filter(p => p.categoria === 'tecnologia').map(p => p.tipo || '')).map(nombre => ({nombre,href:urlCatalogo('tecnologia',{type:nombre})})),
      ...unique(productos.filter(p => p.categoria === 'tecnologia').map(p => p.marca)).map(nombre => ({nombre,href:urlCatalogo('tecnologia',{brand:nombre})})),
    ] },
  ];
}
