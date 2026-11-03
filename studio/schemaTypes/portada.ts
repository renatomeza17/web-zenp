import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

const imagen = (name:string,title:string,ancho:number,alto:number) => defineField({
 name,title,type:'image',options:{hotspot:true},
 description:`Diseño completo, con textos incluidos. Para máxima nitidez: ${ancho * 2} × ${alto * 2} px. También se acepta ${ancho} × ${alto} px (misma proporción). No se agregan textos ni sombras desde la web.`,
 validation:rule => [rule.required(),rule.custom(async (value,context) => {
  const ref = (value as {asset?:{_ref?:string}} | undefined)?.asset?._ref
  if (!ref) return true
  const asset = await context.getClient({apiVersion:'2026-01-01'}).getDocument<{metadata?:{dimensions?:{aspectRatio:number}}}>(ref)
  const ratio = asset?.metadata?.dimensions?.aspectRatio
  return !ratio || Math.abs(ratio - ancho/alto) < 0.02 ? true : `Usa la proporción ${ancho}:${alto} para evitar espacios alrededor del diseño.`
 }).warning()],
})

export default defineType({
 name:'portada',title:'Banners de portada',type:'document',icon:ImageIcon,
 fields:[defineField({
  name:'banners',title:'Banners (arrastra para ordenar)',type:'array',
  description:'El orden de esta lista es el orden del carrusel. Publica al terminar. Puedes desactivar un banner sin eliminarlo.',
  validation:rule=>rule.max(12),
  of:[defineArrayMember({name:'banner',title:'Banner',type:'object',icon:ImageIcon,
   fields:[
    defineField({name:'nombre',title:'Nombre interno',type:'string',validation:r=>r.required(),description:'Solo sirve para identificar este banner en el panel.'}),
    defineField({name:'activo',title:'Mostrar en la web',type:'boolean',initialValue:true}),
    imagen('horizontal','Imagen para computadora',1920,720),
    imagen('vertical','Imagen para celular',900,1200),
    defineField({name:'alt',title:'Descripción accesible',type:'string',description:'Describe el producto y el texto importante de la imagen para quienes usan lector de pantalla.',validation:r=>r.required().max(300)}),
    defineField({name:'destino',title:'Al hacer clic',type:'string',initialValue:'enlace',options:{list:[{title:'Abrir producto',value:'producto'},{title:'Abrir categoría u otro enlace',value:'enlace'},{title:'Solo imagen, sin enlace',value:'ninguno'}],layout:'radio'},validation:r=>r.required()}),
    defineField({name:'producto',title:'Producto de destino',type:'reference',to:[{type:'producto'}],options:{filter:'activo == true'},hidden:({parent})=>parent?.destino!=='producto',validation:r=>r.custom((value,context)=> (context.parent as {destino?:string})?.destino==='producto' && !value ? 'Selecciona un producto publicado.' : true)}),
    defineField({name:'enlace',title:'Enlace de destino',type:'string',description:'Ejemplo: /catalogo/zapatillas/?marca=Jordan o https://…',hidden:({parent})=>parent?.destino!=='enlace',validation:r=>r.custom((value,context)=>{
     if ((context.parent as {destino?:string})?.destino!=='enlace') return true
     return typeof value==='string' && (/^\/(?!\/)[^\s\\]*$/.test(value) || /^https:\/\/[^\s\\]+$/.test(value)) ? true : 'Ingresa una ruta interna que empiece con / o una dirección https://.'
    })}),
   ],
   preview:{select:{title:'nombre',media:'horizontal',activo:'activo'},prepare({title,media,activo}){return {title,media,subtitle:activo===false?'Oculto':'Visible · horizontal + móvil'}}},
  })],
 })],
 preview:{prepare:()=>({title:'Banners de portada'})},
})
