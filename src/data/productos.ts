export interface PrecioTalla {
 talla: string;
 precio: number;
 precioOferta?: number;
}
export interface Producto {
 moneda?: 'PEN'|'USD'; precioPedidoUSD?:number; precioOfertaPedidoUSD?:number; precioDesde?:boolean; genero?:'mujer'|'hombre'|'unisex'; preciosPorTalla?:PrecioTalla[];
 id: number|string; nombre:string; categoria:'zapatillas'|'iphones'|'tecnologia'|'ropa'; marca:string; modelo:string; tipo?:string; condicion?:string; precio:number; precioOferta?:number; imagenes:string[]; estado:'stock'|'pedido'|'agotado'; tallas?:string[]; capacidad?:string; bateria?:string; destacado?:boolean; descripcion?:string;
}
const foto = (id:string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=85`;
const sneaker = foto('photo-1595950653106-6c9ebd614d3a');
const phone = foto('photo-1695048133142-1a20484d2569');
const keyboard = foto('photo-1587829741301-dc798b83add3');
export const productos: Producto[] = [
{id:'zap-01',nombre:'Jordan 1 Mid Medium Olive',marca:'Jordan',modelo:'Mid Medium Olive',categoria:'zapatillas',genero:'hombre',precio:480,precioOferta:420,estado:'stock',tallas:['US 8','US 8.5','US 9','US 10'],descripcion:'Una silueta urbana para combinar a tu manera. Consulta el color y las tallas disponibles con nuestro equipo.',imagenes:["/productos/zapatillas/Jordan 1 Mid Medium Olive.webp","/productos/zapatillas/Jordan1MidOlive2.webp"],destacado:true},

{id:'zap-02',nombre:'Air Jordan 1 Retro High',marca:'Jordan',modelo:'Retro 1',categoria:'zapatillas',genero:'hombre',precio:890,estado:'stock',tallas:['US 8','US 9','US 10'],imagenes:["/productos/zapatillas/nike-travis-cactus/nike travis cactus corp.avif"],destacado:true},

{id:'zap-03',nombre:'Adidas Samba OG',marca:'Adidas',modelo:'Samba',categoria:'zapatillas',genero:'hombre',precio:520,estado:'stock',tallas:['US 7','US 8','US 9'],imagenes:[foto('photo-1542291026-7eec264c27ff')]},

{id:'zap-04',nombre:'New Balance 550',marca:'New Balance',modelo:'550',categoria:'zapatillas',genero:'hombre',precio:650,estado:'agotado',tallas:['US 8','US 9'],imagenes:[sneaker]},

// Ejemplo editable: sustituir precios, tallas y fotos por los valores reales antes de publicar.
{id:'zap-05',nombre:'Nike Dunk Low · Mujer',marca:'Nike',modelo:'Dunk Low',categoria:'zapatillas',genero:'mujer',precio:590,precioDesde:true,estado:'pedido',tallas:['US 6','US 7','US 8'],preciosPorTalla:[{talla:'US 6',precio:590},{talla:'US 7',precio:640},{talla:'US 8',precio:690}],descripcion:'Ejemplo de un par a pedido con tallaje de mujer. El precio cambia según la talla seleccionada; confirma la cotización por WhatsApp.',imagenes:[sneaker]},

{id:'iph-01',nombre:'iPhone 18 Pro',marca:'Apple',modelo:'iPhone 18 Pro',categoria:'iphones',precio:3600,estado:'stock',capacidad:'256 GB',condicion:'Sellado',bateria:'100%',descripcion:'iPhone 18 Pro de 256 GB. Consulta color, accesorios incluidos y condiciones de garantía antes de reservar.',imagenes:["/productos/iphones/iphone18/Iphone18proGuinda.webp"],destacado:true},

// Añade precioPedidoUSD y, opcionalmente, precioOfertaPedidoUSD cuando tengas la cotización en dólares.
{id:'iph-02',nombre:'iPhone 15',marca:'Apple',modelo:'iPhone 15',categoria:'iphones',precio:2900,precioOferta:2690,estado:'pedido',capacidad:'256 GB',condicion:'Sellado',imagenes:[phone]},

{id:'iph-03',nombre:'iPhone 14 Pro',marca:'Apple',modelo:'iPhone 14 Pro',categoria:'iphones',precio:2450,estado:'stock',capacidad:'128 GB',condicion:'Seminuevo',bateria:'90%',imagenes:[foto('photo-1592750475338-74b7b21085ab')]},
{id:'iph-04',nombre:'iPhone 13',marca:'Apple',modelo:'iPhone 13',categoria:'iphones',precio:1800,estado:'agotado',capacidad:'128 GB',condicion:'Seminuevo',imagenes:[phone]},
{id:'tech-01',nombre:'Razer Viper V3 Pro Faker Edition',marca:'Razer',modelo:'Viper V3 Pro Faker Edition',tipo:'Mouses',categoria:'tecnologia',precio:180,precioOferta:150,estado:'stock',imagenes:["/productos/tec/mouses/razer-viper-v3/0.webp","/productos/tec/mouses/razer-viper-v3/1.webp","/productos/tec/mouses/razer-viper-v3/2.webp","/productos/tec/mouses/razer-viper-v3/3.webp"],destacado:true},
{id:'tech-02',nombre:'Logitech G Pro Wireless',marca:'Logitech',modelo:'G Pro',tipo:'Mouse',categoria:'tecnologia',precio:390,estado:'pedido',imagenes:[foto('photo-1527814050087-3793815479db')]},
{id:'tech-03',nombre:'Sony WH-1000XM5',marca:'Sony',modelo:'WH-1000XM5',tipo:'Audio',categoria:'tecnologia',precio:1250,estado:'pedido',imagenes:[foto('photo-1546435770-a3e426bf472b')]},
{id:'tech-04',nombre:'Logitech MX Keys',marca:'Logitech',modelo:'MX Keys',tipo:'Teclados',categoria:'tecnologia',precio:490,estado:'agotado',imagenes:[keyboard]},
];

