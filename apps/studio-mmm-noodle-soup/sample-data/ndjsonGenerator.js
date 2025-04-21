import allSampleData from './all-sample-data.json' with {type: 'json'}
import fs from 'fs'

const tagRefs = {
  baking: '71963e77-40e5-4904-b1eb-1c6d89ecd09d',
  dessert: 'fd9193e7-1432-4bf3-a825-1c1f69f84a30',
  meat: '95f92a26-04cc-4657-b27e-1dff6fe1a20e',
  soup: '576f595e-3453-41aa-8311-245fab4f1a54',
  vegetarian: '1788a3bf-d4c0-4599-97f9-e6d301afa8df',
  main: 'cac0a89d-2615-4c9b-b9e8-6bc8377703c0',
}

// Transform the data to match Sanity schema
const transformedData = allSampleData.map((recipe) => ({
  _type: 'recipe',
  title: recipe.title,
  slug: recipe.slug,
  description: recipe.description,
  source: recipe.source,
  image: recipe.image,
  imageCredit: recipe.imageCredit,
  tags: recipe.tags.map((tag) => ({
    _type: 'reference',
    _ref: tagRefs[tag.name.toLocaleLowerCase()],
  })),
  servingsCount: recipe.servingsCount,
  duration: {
    _type: 'recipeDuration',
    preparation: recipe.duration.preparation || 0,
    cooking: recipe.duration.cooking || 0,
    waiting: recipe.duration.waiting || 0,
  },
  user: {
    _type: 'reference',
    _ref: '953cb92e-b6b0-4646-8079-ff04eb46b8b9',
  },
  groupedIngredients: recipe.groupedIngredients.map((group) => ({
    _type: 'recipeGroupedIngredients',
    title: group.title,
    ingredients: group.ingredients.map((ingredient) => ({
      _type: 'recipeIngredient',
      name: ingredient.name,
      unit: ingredient.unit,
      amount: ingredient.amount,
      comment: ingredient.comment,
    })),
  })),
  groupedInstructions: recipe.groupedInstructions.map((group) => ({
    _type: 'recipeGroupedInstructions',
    instructions: group.instructions,
  })),
}))

// Convert to NDJSON format and write to file
const ndjson = transformedData.map((recipe) => JSON.stringify(recipe)).join('\n')
fs.writeFileSync('./all-data.ndjson', ndjson)
// console.log('NDJSON data written to ./sample-data/all-data.ndjson')
