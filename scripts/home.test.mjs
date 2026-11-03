import test from 'node:test';
import assert from 'node:assert/strict';
import { seleccionarProductosPortada } from '../src/lib/home.ts';

const shoe = {id:'shoe',categoria:'zapatillas',nombre:'Jordan',estado:'stock'};
const phone = {id:'phone',categoria:'iphones',nombre:'iPhone',estado:'pedido'};
test('Los banners priorizan stock y destacados, excluyendo agotados', () => {
  const result = seleccionarProductosPortada([{...shoe,id:'agotado',estado:'agotado',destacado:true},{...shoe,id:'pedido',estado:'pedido',destacado:true},shoe,{...shoe,id:'destacado',destacado:true},phone]);
  assert.deepEqual(result.map(p=>p.id),['destacado','phone']);
});
test('Un ID editorial válido prevalece; un producto retirado no produce un enlace obsoleto', () => {
  const productos = [shoe,{...shoe,id:'otro'},phone];
  assert.equal(seleccionarProductosPortada(productos,{zapatillas:'otro'})[0].id,'otro');
  assert.equal(seleccionarProductosPortada(productos,{zapatillas:'retirado'})[0].id,'shoe');
  assert.deepEqual(seleccionarProductosPortada([]),[]);
});
