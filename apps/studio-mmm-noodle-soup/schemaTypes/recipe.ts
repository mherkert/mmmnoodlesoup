import {defineField, defineType, validation} from 'sanity'

export const recipeType = defineType({
  name: 'recipe',
  title: 'Recipes',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(55),
      description: 'The title of the recipe',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      description: 'The slug of the recipe',
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.max(255),
      description: 'The description of the recipe',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      validation: (rule) => rule.required().max(255),
      description: 'Where the recipe was found (e.g. URL)',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          validation: (rule) => rule.required().max(96),
          description: 'The alt text for the image',
        }),
      ],
    }),
    defineField({
      name: 'imageCredit',
      title: 'Image Credit',
      type: 'string',
      validation: (rule) => rule.max(96),
      description: 'Credit for the image',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
      description: 'Tags for the recipe',
    }),
    defineField({
      name: 'servingsCount',
      title: 'Servings Count',
      type: 'number',
      validation: (rule) => rule.required().positive().integer(),
      description: 'Number of servings the recipe makes',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'recipeDuration',
      description: 'The duration of the recipe',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      description: 'The date and time the recipe was published',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      description: 'The date and time the recipe was last updated',
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{type: 'user'}],
      validation: (rule) => rule.required(),
      description: 'The user who uploaded the recipe',
    }),
    defineField({
      name: 'groupedIngredients',
      title: 'Grouped Ingredients',
      type: 'array',
      of: [{type: 'recipeGroupedIngredients'}],
      description: 'The ingredients needed for the recipe',
    }),
    defineField({
      name: 'groupedInstructions',
      title: 'Grouped Instructions',
      type: 'array',
      of: [{type: 'recipeGroupedInstructions'}],
      description: 'The instructions for the recipe',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      tag0: 'tags.0.name',
      tag1: 'tags.1.name',
      tag2: 'tags.2.name',
    },
    prepare({title, media, tag0, tag1, tag2}) {
      return {
        title,
        media,
        subtitle: [tag0, tag1, tag2].filter(Boolean).join(', '),
      }
    },
  },
})
