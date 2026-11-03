import test from 'node:test';
import assert from 'node:assert/strict';
import { paginar } from '../src/lib/paginacion.ts';
import { menuCatalogo, urlCatalogo, familiaIphone, parametrosFiltro } from '../src/lib/navegacion.ts';
import { filtrarYOrdenar } from '../src/lib/filtros.ts';
import { normalizarTallaUS, etiquetaTalla } from '../src/lib/tallas.ts';

test('Tallas US compatibles se agrupan sin convertir tallas europeas ni texto de pedidos', () => {
  assert.equal(normalizarTallaUS('8'), 'US 8');
  assert.equal(normalizarTallaUS('8 W'), 'US 8');
  assert.equal(normalizarTallaUS('US 8.5'), 'US 8.5');
  assert.equal(normalizarTallaUS('7,5 W'), 'US 7.5');
  assert.equal(normalizarTallaUS('38 EUR'), null);
  assert.equal(normalizarTallaUS('40.5'), null);
  assert.equal(normalizarTallaUS('Otras tallas a pedido'), null);
  assert.equal(etiquetaTalla('8 W'),'US 8 W');
  assert.equal(etiquetaTalla('US 8'),'US 8');
  assert.equal(etiquetaTalla('38 EUR'),'38 EUR');
});

test('Páginas de 12 conservan todos los productos sin repetirlos', () => {
  const items = Array.from({length:38},(_,index) => index);
  const paginas = [1,2,3,4].map(page => paginar(items,page));
  assert.deepEqual(paginas.map(p => p.items.length),[12,12,12,2]);
  assert.deepEqual(paginas.flatMap(p => p.items),items);
  assert.equal(paginas[3].inicio,37);
  assert.equal(paginas[3].fin,38);
});

test('La página se ajusta después de filtrar y ante parámetros inválidos', () => {
  assert.equal(paginar([1,2],20).actual,1);
  assert.equal(paginar([1,2],Number.NaN).actual,1);
  assert.equal(paginar([1,2],-4).actual,1);
  assert.deepEqual(paginar([],4).items,[]);
  assert.equal(paginar([],4).inicio,0);
});

test('Los menús apuntan a valores reales del catálogo, con caracteres codificados', () => {
  const products = [
    {categoria:'zapatillas',marca:'New Balance',modelo:'550'},
    {categoria:'zapatillas',marca:'Nike',modelo:'Dunk'},
    {categoria:'zapatillas',marca:'Nike',modelo:'Air Force'},
    {categoria:'iphones',marca:'Apple',modelo:'iPhone 15 Pro'},
    {categoria:'iphones',marca:'Apple',modelo:'iPhone 15'},
    {categoria:'tecnologia',marca:'Logitech',modelo:'MX',tipo:'Teclados mecánicos'},
  ];
  const menu = menuCatalogo(products);
  assert.equal(menu[0].marcas.length,2);
  assert.equal(new URL(menu[0].marcas[0].href,'https://zenp.test').searchParams.get('marca'),'New Balance');
  assert.equal(menu[1].marcas.length,1);
  assert.equal(new URL(menu[1].marcas[0].href,'https://zenp.test').searchParams.get('serie'),'iPhone 15');
  assert.ok(menu[2].marcas.some(m => m.href.includes('marca=Logitech')));
  assert.ok(menu[2].marcas.some(m => new URL(m.href,'https://zenp.test').searchParams.get('tipo') === 'Teclados mecánicos'));
  assert.equal(menuCatalogo([])[0].enlace,'/catalogo/zapatillas/');
});

test('El enlace de marca o serie filtra antes de paginar, sin mezclar generaciones', () => {
  const url = new URL(urlCatalogo('zapatillas',{brand:'Nike',state:'stock'}),'https://zenp.test');
  const filters = Object.fromEntries(['brand','state'].map(key => [key,url.searchParams.get(parametrosFiltro[key])]));
  const items = Array.from({length:40},(_,index) => ({index,brand:index%2 ? 'Nike' : 'Jordan',state:'stock'}));
  assert.equal(filtrarYOrdenar(items,'',filters,false,'default').length,20);
  assert.equal(paginar(filtrarYOrdenar(items,'',filters,false,'default'),2).items.length,8);
  const phones = ['iPhone 15','iPhone 15 Pro','iPhone 16','iPhone 18 Pro Max'].map((model,index) => ({index,model,family:familiaIphone(model)}));
  assert.equal(filtrarYOrdenar(phones,'',{family:'iPhone 15'},false,'default').length,2);
});
