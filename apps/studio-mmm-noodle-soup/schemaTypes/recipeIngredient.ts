import {defineField, defineType} from 'sanity'

export const recipeIngredientType = defineType({
  name: 'recipeIngredient',
  title: 'Recipe Ingredient',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required().max(55),
      description: 'The name of the ingredient',
    }),
    defineField({
      name: 'amount',
      type: 'number',
      validation: (rule) => rule.positive(),
      description: 'The amount of the ingredient',
    }),
    defineField({
      name: 'unit',
      type: 'string',
      validation: (rule) => rule.max(55),
      description: 'The unit of the ingredient',
    }),
    defineField({
      name: 'comment',
      type: 'string',
      validation: (rule) => rule.max(127),
      description: 'Comment for the ingredient',
    }),
  ],
})
