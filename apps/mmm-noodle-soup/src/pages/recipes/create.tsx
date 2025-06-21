import React from "react";
import { RecipeEditor } from "../../components/recipe/editor/RecipeEditor";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";

const CreateRecipePage = () => {
  return (
    <ProtectedRoute>
      <RecipeEditor />
    </ProtectedRoute>
  );
};

export default CreateRecipePage;
