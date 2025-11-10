import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('GF Deuche Collection')
    .items([
      S.documentTypeListItem('product').title('🛍️ Products'),
      S.documentTypeListItem('category').title('🏷️ Categories'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['product', 'category'].includes(item.getId()!),
      ),
    ])
