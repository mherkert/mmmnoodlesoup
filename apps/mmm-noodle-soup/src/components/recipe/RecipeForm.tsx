import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/authStore";
import { Button } from "../buttons/Button";
import {
  createRecipe,
  getUserByEmail,
  createUser,
  updateUserAuth0Ids,
  generateSlug,
  generateUniqueSlug,
} from "../../services/sanity";
import { navigate } from "gatsby";

interface RecipeFormData {
  title: string;
  description: string;
  source: string;
  servingsCount: number;
  imageCredit?: string;
  ingredients: Array<{
    name: string;
    amount: number;
    unit: string;
    comment?: string;
  }>;
  instructions: Array<{
    text: string;
    order: number;
  }>;
}

// don't use a form but the editor instead, keeping for future reference
export const RecipeForm = () => {
  const { user, isAuthenticated, isLoading, error: authError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedSlug, setGeneratedSlug] = useState<string>("");

  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    description: "",
    source: "",
    servingsCount: 4,
    imageCredit: "",
    ingredients: [{ name: "", amount: 1, unit: "", comment: "" }],
    instructions: [{ text: "", order: 1 }],
  });

  // Generate slug preview when title changes
  useEffect(() => {
    if (formData.title) {
      const slug = generateSlug(formData.title);
      setGeneratedSlug(slug);
    } else {
      setGeneratedSlug("");
    }
  }, [formData.title]);

  const handleInputChange = (field: keyof RecipeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { name: "", amount: 1, unit: "", comment: "" },
      ],
    }));
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      ),
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { text: "", order: prev.instructions.length + 1 },
      ],
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) =>
        i === index ? { ...inst, text: value } : inst
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      setError("You must be logged in to create a recipe");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // First, ensure user exists in Sanity (using email as primary key)
      let sanityUser = await getUserByEmail(user.email!);

      if (!sanityUser) {
        // Create user in Sanity if they don't exist
        sanityUser = await createUser({
          name: user.name,
          email: user.email,
          image: user.picture,
          auth0Ids: [user.sub], // Start with current Auth0 ID
          role: "user",
        });
      } else {
        // Update user's Auth0 IDs to include the current one
        await updateUserAuth0Ids(sanityUser._id, user.sub!);
      }

      // Generate unique slug (this will check for conflicts)
      const { generateUniqueSlug } = await import("../../services/sanity");
      const uniqueSlug = await generateUniqueSlug(formData.title);

      // Prepare recipe data for Sanity
      const recipeData = {
        title: formData.title,
        slug: {
          _type: "slug",
          current: uniqueSlug,
        },
        description: formData.description,
        source: formData.source,
        servingsCount: formData.servingsCount,
        imageCredit: formData.imageCredit || undefined,
        user: {
          _type: "reference",
          _ref: sanityUser._id,
        },
        groupedIngredients: [
          {
            _type: "recipeGroupedIngredients",
            title: "Ingredients",
            ingredients: formData.ingredients.map((ing) => ({
              _type: "recipeIngredient",
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit,
              comment: ing.comment || undefined,
            })),
          },
        ],
        groupedInstructions: [
          {
            _type: "recipeGroupedInstructions",
            title: "Instructions",
            instructions: formData.instructions.map((inst) => ({
              _type: "recipeInstruction",
              text: inst.text,
              order: inst.order,
            })),
          },
        ],
      };

      const result = await createRecipe(recipeData);

      // Redirect to the new recipe
      navigate(`/recipes/${result.slug.current}`);
    } catch (err) {
      console.error("Error creating recipe:", err);
      setError("Failed to create recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle authentication error
  if (authError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Authentication Error</p>
          <p>{authError.message}</p>
        </div>
      </div>
    );
  }

  // Handle not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Create New Recipe</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to create a recipe.
          </p>
          <Button onClick={() => (window.location.href = "/recipes")}>
            Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create New Recipe</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          {generatedSlug && (
            <p className="text-sm text-gray-600 mt-1">
              URL will be:{" "}
              <code className="bg-gray-100 px-1 rounded">
                /recipes/{generatedSlug}
              </code>
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Source *</label>
          <input
            type="text"
            value={formData.source}
            onChange={(e) => handleInputChange("source", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., Grandma's cookbook, https://example.com/recipe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Servings *</label>
          <input
            type="number"
            value={formData.servingsCount}
            onChange={(e) =>
              handleInputChange("servingsCount", parseInt(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            min="1"
            required
          />
        </div>
      </div>

      {/* Ingredients */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <Button
            type="button"
            onClick={addIngredient}
            variant="outline"
            size="sm"
          >
            Add Ingredient
          </Button>
        </div>

        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="grid grid-cols-4 gap-2">
            <input
              type="number"
              value={ingredient.amount}
              onChange={(e) =>
                updateIngredient(index, "amount", parseFloat(e.target.value))
              }
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Amount"
              step="0.1"
            />
            <input
              type="text"
              value={ingredient.unit}
              onChange={(e) => updateIngredient(index, "unit", e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Unit"
            />
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => updateIngredient(index, "name", e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Ingredient name"
            />
            <input
              type="text"
              value={ingredient.comment}
              onChange={(e) =>
                updateIngredient(index, "comment", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Optional comment"
            />
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Instructions</h2>
          <Button
            type="button"
            onClick={addInstruction}
            variant="outline"
            size="sm"
          >
            Add Step
          </Button>
        </div>

        {formData.instructions.map((instruction, index) => (
          <div key={index} className="flex gap-2">
            <span className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <textarea
              value={instruction.text}
              onChange={(e) => updateInstruction(index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder="Describe this step..."
              rows={2}
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          className="px-6 py-2"
        >
          {isSubmitting ? "Creating Recipe..." : "Create Recipe"}
        </Button>
      </div>
    </form>
  );
};
