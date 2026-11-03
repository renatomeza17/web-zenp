import test from 'node:test';
import assert from 'node:assert/strict';
import {enlaceSeguro,transformarBanners} from '../src/lib/banners.ts';
const imagen={asset:{_ref:'image-abcdef1234567890-1920x720-webp'}};
const base={_key:'a',nombre:'A',alt:'Colección Jordan',horizontal:imagen,vertical:imagen,destino:'enlace',enlace:'/catalogo/zapatillas/?marca=Jordan'};
test('Sanity conserva el orden editorial y oculta desactivados e incompletos',()=>{
 const banners=transformarBanners([{...base,_key:'z'},{...base,_key:'oculto',activo:false},{...base,_key:'incompleto',vertical:undefined},base],'uugu24du','production');
 assert.deepEqual(banners.map(b=>b.id),['z','a']);
 assert.match(banners[0].horizontalSrcSet,/1920w/);
 assert.match(banners[0].verticalSrcSet,/450w/);
 assert.deepEqual(transformarBanners([],'uugu24du','production'),[]);
});
test('Un banner puede enlazar al producto publicado o mostrarse sin enlace',()=>{
 assert.equal(transformarBanners([{...base,destino:'producto',producto:{id:'par',activo:true}}],'uugu24du','production')[0].enlace,'/producto/par/');
 assert.equal(transformarBanners([{...base,destino:'producto',producto:{id:'retirado',activo:false}}],'uugu24du','production')[0].enlace,undefined);
 assert.equal(transformarBanners([{...base,destino:'ninguno'}],'uugu24du','production')[0].enlace,undefined);
});
test('Solo acepta rutas locales y enlaces HTTPS',()=>{
 for (const bad of ['javascript:alert(1)','//otro.com','/\\otro.com','http://otro.com','https://user:password@otro.com'])assert.equal(enlaceSeguro(bad),undefined);
 assert.equal(enlaceSeguro('/catalogo/'),'/catalogo/');
 assert.equal(enlaceSeguro('https://www.instagram.com/zenp_originals/'),'https://www.instagram.com/zenp_originals/');
});

test('Banners de alta densidad ofrecen 3840 px y no declaran resoluciones superiores al original',()=>{
 const hd={asset:{_ref:'image-abcdef1234567890-3840x1440-png'}};
 const banner=transformarBanners([{...base,horizontal:hd}],'uugu24du','production')[0];
 assert.match(banner.horizontalSrcSet,/3840w/);
 assert.match(banner.horizontal,/q=95/);
 assert.doesNotMatch(transformarBanners([base],'uugu24du','production')[0].horizontalSrcSet,/3840w/);
});
