import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import category from './category'
import product from './product'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, category, product],
}
