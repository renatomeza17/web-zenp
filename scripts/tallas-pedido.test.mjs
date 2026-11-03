import test from 'node:test';
import assert from 'node:assert/strict';
import { precioProducto, mensajeProducto, esTallaAPedido } from '../src/lib/precios.ts';
const par={id:'mixto',categoria:'zapatillas',nombre:'Jordan',estado:'stock',precio:900,precioOferta:600,tallas:['8.5','Otras tallas a pedido']};
test('Otra talla a pedido no hereda el precio de oferta ni la disponibilidad del stock',()=>{
 assert.equal(esTallaAPedido(par,' OTRAS TALLAS A PEDIDO '),true);
 const precio=precioProducto(par,'Otras tallas a pedido');
 assert.equal(precio.valor,null);
 assert.equal(precio.anterior,null);
 assert.match(mensajeProducto(par,'Otras tallas a pedido'),/Disponibilidad: A pedido/);
 assert.doesNotMatch(mensajeProducto(par,'Otras tallas a pedido'),/600|En stock/);
});
test('Volver a una talla concreta conserva su precio y estado publicados',()=>{
 assert.equal(precioProducto(par,'8.5').valor,600);
 assert.match(mensajeProducto(par,'8.5'),/Disponibilidad: En stock/);
 assert.equal(par.estado,'stock');
 assert.equal(esTallaAPedido({...par,categoria:'iphones'},'Otras tallas a pedido'),false);
});

test('Desde aparece en stock mixto y en zapatillas a pedido antes de elegir talla',()=>{
 assert.equal(precioProducto(par).texto,'Desde S/ 600');
 assert.equal(precioProducto(par,'8.5').texto,'S/ 600');
 assert.equal(precioProducto({...par,estado:'pedido',tallas:['8.5']}).desde,true);
 assert.equal(precioProducto({...par,tallas:['8.5']}).desde,false);
});
