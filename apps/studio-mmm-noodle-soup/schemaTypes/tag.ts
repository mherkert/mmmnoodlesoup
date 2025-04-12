import {defineField, defineType, validation} from 'sanity'

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
    ],
})