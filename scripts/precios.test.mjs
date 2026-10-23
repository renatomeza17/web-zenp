import { test } from 'node:test';
import assert from 'node:assert/strict';
import { precioProducto, mensajeProducto, tallasProducto, generoEtiqueta } from '../src/lib/precios.ts';
import { filtrarYOrdenar } from '../src/lib/filtros.ts';

const base = { id:'test', nombre:'Par de prueba', marca:'Nike', modelo:'Dunk', categoria:'zapatillas', estado:'pedido', precio:500, precioDesde:true, genero:'mujer', imagenes:[], tallas:['US 6','US 7','US 8'], preciosPorTalla:[{talla:'US 6',precio:600},{talla:'US 7',precio:750,precioOferta:650}] };

test('La tarjeta muestra el mínimo; la ficha y WhatsApp reflejan la talla elegida', () => {
  assert.equal(precioProducto(base).valor,600);
  assert.equal(precioProducto(base).desde,true);
  assert.equal(precioProducto(base,'US 7').valor,650);
  assert.equal(precioProducto(base,'US 7').anterior,750);
  assert.equal(precioProducto(base,'US 7').desde,false);
  const message = mensajeProducto(base,'US 7');
  assert.match(message,/650/);
  assert.match(message,/Talla: US 7/);
  assert.match(message,/mujer/i);
  assert.doesNotMatch(message,/Desde/);
});

test('Una talla sin precio personalizado conserva el precio base según la configuración actual', () => {
  assert.equal(precioProducto(base,'US 8').valor,500);
  assert.match(mensajeProducto(base,'US 8'),/500/);
  assert.equal(precioProducto({...base,precio:0},'US 8').valor,null);
});

test('iPhone a pedido utiliza USD independiente de PEN y no convierte cantidades', () => {
  const phone = {...base,categoria:'iphones',preciosPorTalla:undefined,tallas:undefined,precio:2900,precioOferta:2690,capacidad:'256 GB'};
  assert.equal(precioProducto(phone).divisa,'USD');
  assert.equal(precioProducto(phone).valor,null);
  assert.match(precioProducto(phone).texto,/Consultar precio en US\$/);
  assert.equal(precioProducto({...phone,precioPedidoUSD:799,precioOfertaPedidoUSD:749}).valor,749);
  assert.match(mensajeProducto({...phone,precioPedidoUSD:799}),/US\$/);
  assert.equal(precioProducto({...phone,estado:'stock'}).valor,2690);
  assert.equal(precioProducto({...phone,estado:'stock'}).divisa,'PEN');
});

test('Se ignoran ofertas inválidas y precios no positivos', () => {
  assert.equal(precioProducto({...base,preciosPorTalla:undefined,precioOferta:700}).valor,500);
  assert.equal(precioProducto({...base,preciosPorTalla:undefined,precio:0}).valor,null);
});

test('El tallaje es explícito y los filtros incluyen tallas de variantes', () => {
  assert.equal(generoEtiqueta(base),'Mujer');
  assert.equal(generoEtiqueta({...base,genero:'hombre'}),'Hombre');
  assert.deepEqual(tallasProducto({...base,tallas:[]}),['US 6','US 7']);
  assert.equal(filtrarYOrdenar([{index:0,gender:'mujer',currency:'PEN',sizes:'US 6|US 7'}],'',{gender:'mujer',size:'US 7'},false,'default').length,1);
});

test('Ordenar precios agrupa divisas y coloca los importes pendientes al final', () => {
  const items = [{index:0,price:'',currency:'USD'},{index:1,price:900,currency:'PEN'},{index:2,price:100,currency:'USD'},{index:3,price:600,currency:'PEN'}];
  assert.deepEqual(filtrarYOrdenar(items,'',{},false,'price-asc').map(p => p.index),[3,1,2,0]);
  assert.deepEqual(filtrarYOrdenar(items,'',{},false,'price-desc').map(p => p.index),[1,3,2,0]);
});
