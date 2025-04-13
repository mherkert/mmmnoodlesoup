import {defineField, defineType} from 'sanity'

export const recipeGroupedInstructionsType = defineType({
  name: 'recipeGroupedInstructions',
  title: 'Recipe Grouped Instructions',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.max(55),
      description: 'The title of the grouped instructions',
    }),
    defineField({
      name: 'instructions',
      type: 'array',
      of: [{type: 'text'}],
      validation: (rule) => rule.max(2048),
      description: 'The instructions of the grouped instructions',
    }),
  ],
})
