type Item = {index:number; [key:string]:string|number|undefined};
const normalize = (v:unknown) => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function filtrarYOrdenar(items:Item[],query:string,filters:Record<string,string>,offers:boolean,sort:string) {
 const words = normalize(query).trim().split(/\s+/).filter(Boolean);
 const result = items.filter(p => words.every(w => normalize(`${p.title} ${p.brand} ${p.model} ${p.type} ${p.capacity} ${p.condition}`).includes(w)) && Object.entries(filters).every(([key,value]) => !value || (key === 'size' ? String(p.sizes || '').split('|').includes(value) : p[key] === value)) && (!offers || p.offer === 'true'));
 return result.sort((a,b) => {
  if (sort === 'price-asc' || sort === 'price-desc') {
   const hasPrice = (p:Item) => p.price !== '' && p.price !== undefined && Number.isFinite(Number(p.price)) && Number(p.price) > 0;
   if (hasPrice(a) !== hasPrice(b)) return hasPrice(a) ? -1 : 1;
   if (!hasPrice(a)) return a.index-b.index;
   // Never compare dollars directly with soles without an exchange rate.
   const currency = String(a.currency || 'PEN').localeCompare(String(b.currency || 'PEN'));
   return currency || (sort === 'price-asc' ? Number(a.price)-Number(b.price) : Number(b.price)-Number(a.price)) || a.index-b.index;
  }
  return sort === 'name' || sort === 'model' ? String(a[sort === 'name' ? 'title' : 'model']).localeCompare(String(b[sort === 'name' ? 'title' : 'model']),'es',{numeric:true}) : a.index-b.index;
 });
}
