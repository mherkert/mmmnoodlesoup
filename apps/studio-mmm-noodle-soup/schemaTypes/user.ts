import {defineField, defineType, validation} from 'sanity'

export const userType = defineType({
  name: 'user',
  title: 'Users',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
      description: 'Primary identifier for the user',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(55),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'auth0Ids',
      title: 'Auth0 IDs',
      type: 'array',
      of: [{type: 'string'}],
      description: 'All Auth0 IDs associated with this user (from different social providers)',
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      //   validation: (rule) => rule.required().min(8), // TODO: add validation
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: ['admin', 'user'],
      },
    }),
  ],
})
