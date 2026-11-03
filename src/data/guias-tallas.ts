// Equivalencias adultas revisadas en las guías oficiales el 23/10/2026.
// Nike diferencia CM/JP de etiqueta del largo del pie. No mezclar ambos conceptos.
export interface FilaTalla { us:string; eu:string; uk:string; cm:string; }
export interface TablaTallas { genero:'hombre'|'mujer'; titulo:string; filas:FilaTalla[]; }
export interface GuiaTallas {
  nombre:string; etiquetaCm:string; nota:string; fuentes:string[]; tablas:TablaTallas[];
}
function filas(us:(string|number)[], eu:(string|number)[], uk:(string|number)[], cm:(string|number)[]):FilaTalla[] {
  if (![eu,uk,cm].every(columna => columna.length === us.length)) throw new Error('Columnas de tallas desalineadas');
  return us.map((talla,index)=>({us:String(talla),eu:String(eu[index]),uk:String(uk[index]),cm:String(cm[index])}));
}
const nike:GuiaTallas = {
  nombre:'Nike', etiquetaCm:'CM / JP',
  nota:'CM/JP es la talla de la etiqueta y no el largo de tu pie. Las equivalencias pueden variar según el modelo; confirma el ajuste si tienes dudas.',
  fuentes:['https://www.nike.com/size-fit/mens-footwear','https://www.nike.com/size-fit/womens-footwear'],
  tablas:[
    {genero:'hombre',titulo:'US Hombre',filas:filas(
      [4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13],
      [36,36.5,37.5,38,38.5,39,40,40.5,41,42,42.5,43,44,44.5,45,45.5,46,47,47.5],
      [3.5,4,4.5,5,5.5,6,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],
      [23,23.5,23.5,24,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31],
    )},
    {genero:'mujer',titulo:'US Mujer',filas:filas(
      [5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],
      [35.5,36,36.5,37.5,38,38.5,39,40,40.5,41,42,42.5,43,44,44.5],
      [2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5],
      [22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29],
    )},
  ],
};
const adidasUs = [4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13];
const adidasEu = ['36','36 2/3','37 1/3','38','38 2/3','39 1/3','40','40 2/3','41 1/3','42','42 2/3','43 1/3','44','44 2/3','45 1/3','46','46 2/3','47 1/3','48'];
const adidasUk = [3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5];
const adidasCm = [22.1,22.5,22.9,23.3,23.8,24.2,24.6,25,25.5,25.9,26.3,26.7,27.1,27.6,28,28.4,28.8,29.3,29.7];
export const guiasTallas:Record<string,GuiaTallas> = {
  nike,
  jordan:{...nike,nombre:'Jordan / Nike'},
  adidas:{
    nombre:'Adidas',etiquetaCm:'Largo del pie (cm)',
    nota:'La columna en centímetros corresponde al largo del pie de talón a dedo. El calce puede variar según el modelo.',
    fuentes:['https://www.adidas.com/us/help/size_charts/shoes'],
    tablas:[
      {genero:'hombre',titulo:'US Hombre',filas:filas(adidasUs,adidasEu,adidasUk,adidasCm)},
      {genero:'mujer',titulo:'US Mujer',filas:filas(adidasUs.map(us=>us+1),adidasEu,adidasUk,adidasCm)},
    ],
  },
  'new balance':{
    nombre:'New Balance',etiquetaCm:'Longitud (cm)',
    nota:'Equivalencias adultas de la guía de New Balance. Las tablas de mujer y hombre tienen diferencias propias de calce y no se intercambian automáticamente.',
    fuentes:['https://www.newbalance.com/size-guide.html'],
    tablas:[
      {genero:'hombre',titulo:'US Hombre',filas:filas(
        [4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13],
        [36,37,37.5,38,38.5,39.5,40,40.5,41.5,42,42.5,43,44,44.5,45,45.5,46.5,47,47.5],
        [3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5],
        [22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31],
      )},
      {genero:'mujer',titulo:'US Mujer',filas:filas(
        [5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],
        [35,36,36.5,37,37.5,38,39,40,40.5,41,41.5,42.5,43,43.5,44],
        [3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10],
        [22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29],
      )},
    ],
  },
};

export function obtenerGuiaTallas(marca:string) {
  const clave = marca.trim().toLowerCase();
  return guiasTallas[clave === 'air jordan' || clave === 'jordan brand' ? 'jordan' : clave] || null;
}
