// studio/schemaTypes/producto.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'producto',
  title: 'Productos',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del Producto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'activo',
      title: '¿Publicado / Visible en la web?',
      type: 'boolean',
      initialValue: true,
      description: 'Desmárcalo si quieres ocultar el producto sin borrarlo.',
    }),
    defineField({
      name: 'destacado',
      title: '¿Destacar en Más Vendidos / Portada?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría Principal',
      type: 'string',
      options: {
        list: [
          { title: 'Zapatillas', value: 'zapatillas' },
          { title: 'iPhones & Apple', value: 'iphones' },
          { title: 'Tecnología', value: 'tecnologia' },
          { title: 'Ropa', value: 'ropa' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'marca',
      title: 'Marca',
      type: 'string',
      description: 'Ej: Nike, Apple, Jordan, Adidas, Razer, Lacoste, On',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modelo',
      title: 'Modelo',
      type: 'string',
      description: 'Ej: Dunk Low, iPhone 18 Pro, Samba OG',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'genero',
      title: 'Género (Zapatillas y Ropa)',
      type: 'string',
      options: {
        list: [
          { title: 'Hombre', value: 'hombre' },
          { title: 'Mujer', value: 'mujer' },
          { title: 'Unisex', value: 'unisex' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => !['zapatillas', 'ropa'].includes(parent?.categoria),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo de producto (Tecnología y Ropa)',
      type: 'string',
      description: 'Ej: Shorts, Polos, Casacas; o Mouses, Teclados, Audio',
      hidden: ({ parent }) => !['tecnologia', 'ropa'].includes(parent?.categoria),
    }),
    defineField({
      name: 'estado',
      title: 'Disponibilidad / Estado',
      type: 'string',
      options: {
        list: [
          { title: 'En Stock', value: 'stock' },
          { title: 'A Pedido / Importación', value: 'pedido' },
          { title: 'Agotado', value: 'agotado' },
        ],
        layout: 'radio',
      },
      initialValue: 'stock',
      validation: (rule) => rule.required(),
    }),

    // --- SECCIÓN PRECIOS ---
    defineField({
      name: 'moneda',
      title: 'Moneda',
      type: 'string',
      options: {
        list: [
          { title: 'Soles (PEN)', value: 'PEN' },
          { title: 'Dólares (USD)', value: 'USD' },
        ],
        layout: 'radio',
      },
      initialValue: 'PEN',
    }),
    defineField({
      name: 'precio',
      title: 'Precio Regular',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'precioOferta',
      title: 'Precio de Oferta (Opcional)',
      type: 'number',
    }),
    defineField({
      name: 'precioDesde',
      title: '¿Mostrar como "Precio Desde"?',
      type: 'boolean',
      initialValue: false,
      description: 'Actívalo si el precio cambia dependiendo de la talla.',
    }),
    defineField({
      name: 'precioPedidoUSD',
      title: 'Precio a Pedido en Dólares (USD)',
      type: 'number',
      hidden: ({ parent }) => parent?.estado !== 'pedido',
    }),
    defineField({
      name: 'precioOfertaPedidoUSD',
      title: 'Precio Oferta a Pedido en Dólares (USD)',
      type: 'number',
      hidden: ({ parent }) => parent?.estado !== 'pedido',
    }),

    // --- PRECIOS DIFERENCIADOS POR TALLA ---
    defineField({
      name: 'preciosPorTalla',
      title: 'Precios específicos por talla (Opcional)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'talla', title: 'Talla (Ej: M o US 7)', type: 'string' },
            { name: 'precio', title: 'Precio', type: 'number' },
            { name: 'precioOferta', title: 'Precio de Oferta', type: 'number' },
          ],
        },
      ],
      hidden: ({ parent }) => !['zapatillas', 'ropa'].includes(parent?.categoria),
    }),

    // --- FOTOS ---
    defineField({
      name: 'imagenes',
      title: 'Galería de Fotos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid', // Presenta los elementos en mosaico visual
      },
      validation: (rule) => rule.required().min(1),
    }),

    // --- ESPECÍFICOS: ZAPATILLAS ---
    defineField({
      name: 'tallas',
      description: 'Ropa: S, M, L, XL o talla numérica. Zapatillas: US 8, US 9. Una talla por elemento.',
      title: 'Tallas disponibles (Zapatillas o Ropa)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => !['zapatillas', 'ropa'].includes(parent?.categoria),
    }),

    // --- ESPECÍFICOS: IPHONES ---
    defineField({
      name: 'capacidad',
      title: 'Capacidad (iPhones)',
      type: 'string',
      description: 'Ej: 128 GB, 256 GB',
      hidden: ({ parent }) => parent?.categoria !== 'iphones',
    }),
    defineField({
      name: 'condicion',
      title: 'Condición (iPhones)',
      type: 'string',
      description: 'Ej: Sellado o Seminuevo A+',
      hidden: ({ parent }) => parent?.categoria !== 'iphones',
    }),
    defineField({
      name: 'bateria',
      title: 'Batería (iPhones)',
      type: 'string',
      description: 'Ej: 100% o 89%',
      hidden: ({ parent }) => parent?.categoria !== 'iphones',
    }),

    // --- DESCRIPCIÓN ---
    defineField({
      name: 'descripcion',
      title: 'Descripción / Notas adicionales',
      type: 'text',
      rows: 3,
    }),
  ],
});