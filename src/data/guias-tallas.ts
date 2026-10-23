export const guiasTallas: Record<string, { nombre: string; enlaces: {nombre:string; url:string}[] }> = {
  nike: { nombre:'Nike', enlaces:[
    {nombre:'Mujer · tabla oficial Nike',url:'https://www.nike.com/size-fit/womens-footwear'},
    {nombre:'Hombre · tabla oficial Nike',url:'https://www.nike.com/size-fit/mens-footwear'},
  ]},
  jordan: { nombre:'Jordan / Nike', enlaces:[
    {nombre:'Mujer · tabla oficial Nike',url:'https://www.nike.com/size-fit/womens-footwear'},
    {nombre:'Hombre · tabla oficial Nike',url:'https://www.nike.com/size-fit/mens-footwear'},
  ]},
  adidas: { nombre:'Adidas', enlaces:[
    {nombre:'Mujer y hombre · tabla oficial Adidas',url:'https://www.adidas.com/us/help/size_charts/shoes'},
  ]},
  'new balance': { nombre:'New Balance', enlaces:[
    {nombre:'Mujer y hombre · guía oficial New Balance',url:'https://www.newbalance.com/size-guide.html'},
  ]},
};
