Rails.application.routes.draw do
  root 'pages#index'

  get 'recipes/index'
  post 'recipes/create'
  get '/show/:id', to: 'recipes#show'
  delete 'destroy/:id', to: 'recipes#destroy'

  get '/*path', to: 'pages#index'
end
