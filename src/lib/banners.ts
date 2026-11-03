import {createImageUrlBuilder} from '@sanity/image-url';
import {bannersIniciales,type BannerPortada} from '../data/banners.ts';

interface ImagenBanner {asset?:{_ref:string};crop?:{top:number;bottom:number;left:number;right:number};hotspot?:{x:number;y:number;width:number;height:number}}
interface BannerSanity {
 _key:string;nombre:string;alt:string;activo?:boolean;horizontal?:ImagenBanner;vertical?:ImagenBanner;
 destino?:string;enlace?:string;producto?:{id:string;activo?:boolean};
}
export function enlaceSeguro(value?:string):string|undefined {
 if (!value || /[\s\\\u0000-\u001f]/.test(value)) return;
 if (/^\/(?!\/)/.test(value)) return value;
 try {const url = new URL(value);if(url.protocol==='https:' && !url.username && !url.password)return url.href;} catch {}
}
export function transformarBanners(items:BannerSanity[],project:string,dataset:string):BannerPortada[] {
 const builder = createImageUrlBuilder({projectId:project,dataset});
 return items.flatMap(item=>{
  if (item.activo===false || !item.horizontal?.asset?._ref || !item.vertical?.asset?._ref || !item.alt?.trim()) return [];
  const image=(source:ImagenBanner,width:number)=>builder.image(source).width(width).fit('max').auto('format').quality(95).url();
  const srcset=(source:ImagenBanner,widths:number[])=>{
   const originalWidth=Number(source.asset?._ref.match(/-(\d+)x\d+-/)?.[1]);
   const candidates=[...new Set(widths.map(w=>originalWidth ? Math.min(w,originalWidth) : w))];
   return candidates.map(w=>`${image(source,w)} ${w}w`).join(', ');
  };
  const enlace = item.destino==='producto' ? item.producto?.activo && item.producto.id ? `/producto/${encodeURIComponent(item.producto.id)}/` : undefined : item.destino==='enlace' ? enlaceSeguro(item.enlace) : undefined;
  return [{id:item._key,nombre:item.nombre,alt:item.alt,horizontal:image(item.horizontal,3840),vertical:image(item.vertical,1800),horizontalSrcSet:srcset(item.horizontal,[960,1440,1920,2560,3200,3840]),verticalSrcSet:srcset(item.vertical,[450,675,900,1200,1800]),enlace}];
 });
}

export async function getBanners():Promise<BannerPortada[]> {
 const project=import.meta.env.SANITY_PROJECT_ID;
 const dataset=import.meta.env.SANITY_DATASET || 'production';
 if (!project) return bannersIniciales;
 if (!/^[a-z0-9-]+$/.test(project) || !/^[a-zA-Z0-9_-]+$/.test(dataset)) throw new Error('Configuración de Sanity inválida');
 const query='*[_id == "portada"][0]{banners[]{_key,nombre,alt,activo,horizontal{asset,crop,hotspot},vertical{asset,crop,hotspot},destino,enlace,"producto":producto->{"id":_id,activo}}}';
 const response=await fetch(`https://${project}.api.sanity.io/v2026-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`,{signal:AbortSignal.timeout(15000)});
 if (!response.ok) throw new Error(`No se pudieron leer los banners de Sanity (${response.status})`);
 const {result}=await response.json();
 // Si aún no se configuró Sanity, mostramos los ejemplos. Una lista publicada vacía sí oculta el carrusel.
 return result ? transformarBanners(result.banners || [],project,dataset) : bannersIniciales;
}
