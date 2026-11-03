import test from 'node:test';
import assert from 'node:assert/strict';
import { usaTallas, precioProducto, mensajeProducto, tallasProducto } from '../src/lib/precios.ts';
import { menuCatalogo } from '../src/lib/navegacion.ts';
import { filtrarYOrdenar } from '../src/lib/filtros.ts';
const short={id:'prueba-ropa',nombre:'Short original',marca:'Lacoste',modelo:'Short',tipo:'Shorts',categoria:'ropa',estado:'stock',genero:'hombre',precio:180,tallas:['S','M','L'],imagenes:[],preciosPorTalla:[{talla:'L',precio:200}]};
test('La ropa conserva tallas de prendas y manda la selección y precio correctos a WhatsApp',()=>{
 assert.equal(usaTallas(short),true);
 assert.deepEqual(tallasProducto(short),['S','M','L']);
 assert.match(mensajeProducto(short,'M'),/Talla: M/);
 assert.doesNotMatch(mensajeProducto(short,'M'),/US M|Capacidad:/);
 assert.equal(precioProducto(short,'L').valor,200);
 assert.match(mensajeProducto(short,'L'),/200/);
});
test('El menú Ropa y su filtro de talla corresponden a la categoría de la prenda',()=>{
 const menu=menuCatalogo([short]).find(m=>m.titulo==='Ropa');
 assert.equal(menu.enlace,'/catalogo/ropa/');
 assert.equal(menu.marcas[0].href,'/catalogo/ropa/?marca=Lacoste');
 assert.equal(filtrarYOrdenar([{index:0,sizes:'S|M|L',type:'Shorts'}],'',{size:'M'},false,'default').length,1);
 assert.equal(filtrarYOrdenar([{index:0,sizes:'S|M|L'}],'',{size:'XL'},false,'default').length,0);
});
