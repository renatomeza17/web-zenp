import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'web-zenp',

  projectId: 'uugu24du',
  dataset: 'production',

  plugins: [structureTool({structure:S=>S.list().title('ZENP').items([
    S.listItem().title('Banners de portada').child(S.document().schemaType('portada').documentId('portada').title('Banners de portada')),
    S.divider(),
    ...S.documentTypeListItems().filter(item=>item.getId()!=='portada'),
  ])}), visionTool()],

  document: {
    newDocumentOptions:prev=>prev.filter(item=>item.templateId!=='portada'),
    actions:(prev,context)=>context.schemaType==='portada' ? prev.filter(item=>item.action!=='delete' && item.action!=='duplicate') : prev,
  },

  schema: {
    types: schemaTypes,
  },
})
