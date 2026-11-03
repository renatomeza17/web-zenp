export interface BannerPortada {
 id:string;
 nombre:string;
 alt:string;
 horizontal:string;
 vertical:string;
 horizontalSrcSet?:string;
 verticalSrcSet?:string;
 enlace?:string;
}

// Diseños completos de ejemplo. Sanity sustituye esta lista al publicar la portada.
export const bannersIniciales:BannerPortada[] = [
 {id:'jordan',nombre:'Jordan',alt:'Sneakers / ZENP. Zapatillas Jordan.',horizontal:'/banners/jordan-desktop.webp',vertical:'/banners/jordan-movil.webp',enlace:'/catalogo/zapatillas/?marca=Jordan'},
 {id:'iphones',nombre:'iPhones',alt:'iPhones / ZENP. iPhone 18 Pro.',horizontal:'/banners/iphones-desktop.webp',vertical:'/banners/iphones-movil.webp',enlace:'/catalogo/iphones/'},
 {id:'razer',nombre:'Razer',alt:'Setup / ZENP. Periféricos Razer.',horizontal:'/banners/razer-desktop.webp',vertical:'/banners/razer-movil.webp',enlace:'/catalogo/tecnologia/?marca=Razer'},
 {id:'jordan-unc',nombre:'Jordan 5 UNC',alt:'Jordan 5 Retro UNC University Blue. Disponible desde S/ 600. Confirmar precio actual en la ficha.',horizontal:'/banners/jordan-unc-desktop.webp',vertical:'/banners/jordan-unc-movil.webp',enlace:'/producto/d5017ef0-9a76-44c0-a88d-352ab3174661/'},
].map(banner=>({...banner,
 horizontalSrcSet:`${banner.horizontal} 1920w, ${banner.horizontal.replace('.webp','-hd.webp')} 3840w`,
 verticalSrcSet:`${banner.vertical} 900w, ${banner.vertical.replace('.webp','-hd.webp')} 1800w`,
}));
