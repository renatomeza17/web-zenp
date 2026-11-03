export const tienda = { whatsapp: '51934870906', redes: [{nombre:'Instagram', url:'https://www.instagram.com/zenp.originals/'}, {nombre:'Facebook', url:'https://www.facebook.com/ZenpOriginals'}, {nombre:'TikTok', url:'https://www.tiktok.com/@zenp_originals'}] };
export const whatsappUrl = (mensaje = 'Hola ZENP, tengo una consulta sobre el catálogo.') => `https://wa.me/${tienda.whatsapp}?text=${encodeURIComponent(mensaje)}`;
export const moneda = (valor: number) => new Intl.NumberFormat('es-PE', {style:'currency',currency:'PEN',maximumFractionDigits:0}).format(valor);
export const categorias = [{slug:'zapatillas',nombre:'Zapatillas',etiqueta:'Sneakers & streetwear',descripcion:'Los pares que hacen la diferencia. Encuentra tu próximo favorito.'},{slug:'iphones',nombre:'iPhones',etiqueta:'Tu próximo upgrade',descripcion:'Encuentra tu modelo, capacidad y condición. Consulta también por importación.'},{slug:'tecnologia',nombre:'Tecnología',etiqueta:'Para tu día a día',descripcion:'Periféricos, audio y accesorios para darle otro nivel a tu setup.'}] as const;

// Configura el enlace cuando esté disponible. Vacío: no muestra un botón de pago.
export const pagos = {
 metodos: ['Yape', 'Plin', 'Transferencia bancaria', 'Tarjetas · Izipay'],
 enlaceIzipay: '',
};

export const entregas = {
 direccion:'Av. Angamos Oeste 1635, Miraflores, Lima',
 tarifaLima:10,
 mapa:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Av. Angamos Oeste 1635, Miraflores, Lima, Perú'),
};
