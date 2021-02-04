class RecipesController < ApplicationController
  def index
    recipes = Recipe.all
    render json: recipes
  end

  def create
    recipe = Recipe.create(name: params[:name], ingredients: params[:ingredients])

    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end

  end

  def show
    recipe = Recipe.find(params[:id])
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def destroy
    recipe = Recipe.find(params[:id])
    recipe.destroy

    render json: {message: "Deleted"}
  end
end
