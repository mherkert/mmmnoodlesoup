import {defineField, defineType} from 'sanity'

export const recipeGroupedIngredientsType = defineType({
  name: 'recipeGroupedIngredients',
  title: 'Recipe Grouped Ingredients',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.max(55),
      description: 'The title of the grouped ingredients',
    }),
    defineField({
      name: 'ingredients',
      type: 'array',
      of: [{type: 'recipeIngredient'}],
      description: 'The ingredients of the grouped ingredients',
    }),
  ],
})
