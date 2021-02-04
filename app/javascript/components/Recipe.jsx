import React from 'react'
import {Link} from 'react-router-dom'

class Recipe extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {recipe: {ingredients: ""}};

    this.addHTMLEntities = this.addHTMLEntities.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  deleteRecipe(){
    const {
      match: {
        params: {id}
      }
    } = this.props;

    const url = `/destroy/${id}`;

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/recipes"))
      .catch(error => console.log(error.message));
  }

  componentDidMount(){
    const {
      match: {
        params: {id}
      }
    } = this.props;

    const url = `/show/${id}`;

    fetch(url).then(res => {
      if(res.ok){
        return res.json();
      }
      throw new Error("Response fukced");
    })
    .then(res => this.setState({recipe: res}))
    .catch(()=> this.props.history.push("/recipes"))
  }

  addHTMLEntities(str){
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }

  render(){
    const {recipe} = this.state;

    return(
      <>
        <h3>{recipe.name}</h3>
        <p>{recipe.ingredients}</p>
        <button type="button" onClick={this.deleteRecipe}>
          Delete
        </button>

        <br/>

        <Link to="/recipes">
          All recipes
        </Link>
      </>
    )
  }
}

export default Recipe;