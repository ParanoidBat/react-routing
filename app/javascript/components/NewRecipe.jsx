import React from "react";
import {Link} from 'react-router-dom'

class NewRecipe extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: "",
      ingredients: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();

    const url = '/recipes/create';

    const {name, ingredients} = this.state;

    const body = {
      name,
      ingredients
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      throw new Error("Response not okay");
    })
    .then(res => this.props.history.push(`/recipe/${res.id}`))
    .catch(error => console.log(error.message));
  }

  render(){
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text" onChange={this.handleChange} name="name" required />
          </div>
          <div>
            <input type="text" name="ingredients" onChange={this.handleChange} required />
          </div>
          <button type="submit">Create</button>
        </form>
        <Link to="/recipes">All Recipes</Link>
      </>
    );
  }
}

export default NewRecipe;