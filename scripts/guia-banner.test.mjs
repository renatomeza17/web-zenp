import test from 'node:test';
import assert from 'node:assert/strict';
import { obtenerGuiaTallas } from '../src/data/guias-tallas.ts';
import { crearBannerProducto } from '../src/lib/home.ts';
test('Las equivalencias respetan marca y tallaje de mujer u hombre',()=>{
 const row=(brand,gender,us)=>obtenerGuiaTallas(brand).tablas.find(t=>t.genero===gender).filas.find(f=>f.us===us);
 assert.equal(row('Air Jordan','hombre','8.5').eu,'42');
 assert.equal(row('Adidas','hombre','8.5').cm,'25.9');
 assert.equal(row('New Balance','mujer','8.5').eu,'40');
 assert.equal(row('New Balance','hombre','8.5').eu,'42');
 assert.equal(obtenerGuiaTallas('Marca desconocida'),null);
});
test('El banner usa la oferta publicada y se retira al agotarse el producto',()=>{
 const p={id:'unc',nombre:'Jordan 5 Retro UNC University Blue',estado:'stock',categoria:'zapatillas',precio:1099.9,precioOferta:600,imagenes:['/unc.avif']};
 const banner=crearBannerProducto([p],'unc');
 assert.equal(banner.precio,'Disponible desde S/ 600');
 assert.equal(banner.enlace,'/producto/unc/');
 assert.equal(crearBannerProducto([{...p,estado:'agotado'}],'unc'),null);
});
