export function paginar<T>(items:T[], pagina:number, porPagina = 12) {
  const tamano = Number.isFinite(porPagina) ? Math.max(1,Math.trunc(porPagina)) : 12;
  const totalPaginas = Math.max(1,Math.ceil(items.length/tamano));
  const actual = Math.min(totalPaginas,Math.max(1,Number.isFinite(pagina) ? Math.trunc(pagina) : 1));
  const inicio = (actual-1)*tamano;
  return {items:items.slice(inicio,inicio+tamano),actual,totalPaginas,inicio:items.length ? inicio+1 : 0,fin:Math.min(inicio+tamano,items.length)};
}
