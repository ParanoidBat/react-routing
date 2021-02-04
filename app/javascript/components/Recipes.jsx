import React from 'react'
import {Link} from 'react-router-dom'

class Recipes extends React.Component{
  constructor(props){
    super(props);

    this.state = {recipes: []}
  }

  componentDidMount() {
    const url = '/recipes/index';

    fetch(url).then(res => {
      if(res.ok){
        return res.json();
      }
      throw new Error("Respons not okay");
    })
    .then(res => this.setState({recipes: res}))
    .catch(() => this.props.history.push("/"));
  }

  render(){
    const {recipes} = this.state;
    
    const allRecipes = recipes.map((recipe, index)=> (
      <div>
        <h3>{recipe.name}</h3>
        <p>{recipe.ingredients}</p>
        <Link to={`/recipe/${recipe.id}`}>
          Show
        </Link>
      </div>
    )
    )

    return(
      <>
        <section>
          {allRecipes}

          <Link to="/recipe">
            Create New
          </Link>
          <br/>
          <Link to ="/">
            Home
          </Link>
        </section>
      </>
    )
  }
}

export default Recipes;