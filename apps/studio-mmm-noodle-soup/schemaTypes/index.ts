import {recipeType} from './recipe'
import {recipeDurationType} from './recipeDuration'
import {recipeGroupedInstructionsType} from './recipeGroupedInstructions'
import {recipeIngredientType} from './recipeIngredient'
import {recipeGroupedIngredientsType} from './recipeGroupedIngredients'
import {tagType} from './tag'
import {userType} from './user'

export const schemaTypes = [
  recipeIngredientType,
  recipeGroupedInstructionsType,
  recipeGroupedIngredientsType,
  recipeDurationType,
  recipeType,
  tagType,
  userType,
]
