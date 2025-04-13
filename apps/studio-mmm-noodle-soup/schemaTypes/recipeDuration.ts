import {defineField, defineType} from 'sanity'

export const recipeDurationType = defineType({
  name: 'recipeDuration',
  title: 'Recipe Duration',
  type: 'object',
  fields: [
    defineField({
      name: 'preparation',
      type: 'number',
      validation: (rule) => rule.positive().integer(),
      description: 'Time in minutes to prepare the recipe',
    }),
    defineField({
      name: 'cooking',
      type: 'number',
      validation: (rule) => rule.positive().integer(),
      description: 'Time in minutes to cook the recipe',
    }),
    defineField({
      name: 'waiting',
      type: 'number',
      validation: (rule) => rule.positive().integer(),
    }),
  ],
})
