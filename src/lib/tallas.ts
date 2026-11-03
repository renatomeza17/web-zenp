// Preserve original sizes in product details. Only normalize compatible US sizes for filtering.
export function normalizarTallaUS(valor: string): string | null {
  const texto = String(valor).trim().toUpperCase().replace(',', '.');
  const coincidencia = texto.match(/^(?:US\s*)?(\d+(?:\.\d+)?)\s*(?:W|M|WMNS)?$/);
  if (!coincidencia) return null;
  const numero = Number(coincidencia[1]);
  // Unqualified large numbers (e.g. 40.5) are not silently relabeled as US sizes.
  return numero > 0 && numero <= 22 ? `US ${numero}` : null;
}

export function etiquetaTalla(valor:string): string {
  const texto = String(valor).trim();
  return normalizarTallaUS(texto) && !/^US\s*\d/i.test(texto) ? `US ${texto}` : texto;
}
