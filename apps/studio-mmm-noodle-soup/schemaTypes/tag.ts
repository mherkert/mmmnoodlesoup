import {defineField, defineType} from 'sanity'

export const tagType = defineType({
    name: 'tag',
    title: 'Tags',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            validation: (rule) => rule.required().max(55),
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
    ],
})