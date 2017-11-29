import React from 'react';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
    this.state={
      recipes: [],
      adding: false,
      editing: false,
      index: '',
      name: '',
      ingredients:'',
      shown: false,
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.edit = this.edit.bind(this);
    this.show = this.show.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleIngr = this.handleIngr.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.add = this.add.bind(this);
	}

  componentDidMount() {
		var recipes=[];
		recipes = JSON.parse(localStorage.getItem('recipes', recipes)) || [{'name':'Spaggeti', 'ingredients':'tijesto, rajcica, bosiljak'}, {'name': 'Sataras', 'ingredients': 'paprika, rajcica, luk, soja sos'}];

    this.setState({
      recipes: recipes,
    });
  }
  show(e){
		if(e.target.matches('span')) return;
    this.setState({
      shown: true,
      index: e.target.id,
      name: this.state.recipes[e.target.id].name,
      ingredients: this.state.recipes[e.target.id].ingredients,
    });
  }
  edit(e){
    this.setState({
      editing: true,
    });
  }
  add(e){
    this.setState({
      adding: true,
      index: this.state.recipes.length,
    });
  }
  handleName(e){
    this.setState({
      name: e.target.value,
    });
  }
  handleIngr(e){
    this.setState({
      ingredients: e.target.value,
    });
  }
  cancel() {
    this.setState({
      editing: false,
      adding: false,
      shown: false,
    });
  }
  saveRecipe(){
    var myrecipes=[...this.state.recipes];
    myrecipes[this.state.index].name = this.state.name;
    myrecipes[this.state.index].ingredients = this.state.ingredients;
    localStorage.setItem('recipes',JSON.stringify(myrecipes));
    this.cancel();
  }
  addRecipe(){
    var myrecipes=[...this.state.recipes,{name:this.state.name,ingredients: this.state.ingredients }];
    localStorage.setItem('recipes',JSON.stringify(myrecipes));
    this.cancel();
  }
  deleteRecipe(){
    var myrecipes=[...this.state.recipes.slice(0, this.state.index),...this.state.recipes.slice(this.state.index + 1)];
    localStorage.setItem('recipes',JSON.stringify(myrecipes));
    this.cancel();
  }
  render() {

    if(this.state.editing) {
	    return (
        <div>
          <EditForm index={this.state.index} name={this.state.name} ingredients={this.state.ingredients} handleName={this.handleName} handleIngr={this.handleIngr} show={this.show} saveRecipe={this.saveRecipe} cancel={this.cancel} deleteRecipe={this.deleteRecipe}/>
        </div>
      );
    }
    if (this.state.adding) {
        return (
          <div>
            <AddForm handleName={this.handleName} handleIngr={this.handleIngr} addRecipe={this.addRecipe} cancel={this.cancel}/>
          </div>
        );
    }
    if(!this.state.adding && !this.state.editing){
      if(this.state.shown) {
        var listItems=this.state.recipes.map((recipe, i) => {
          if(Number(i)===Number(this.state.index)){
            return <p key={i} id={i} onClick={this.show}> {recipe.name}
						<Recipe id="recipe" index={this.state.index} name={this.state.name} ingredients={this.state.ingredients} edit={this.edit} cancel={this.cancel} deleteRecipe={this.deleteRecipe}>
						</Recipe>
						</p>;
          } else {
              return <p key={i} id={i} onClick={this.show}> {recipe.name}</p>;
          }
        });
      } else {
          listItems=this.state.recipes.map((recipe, i) => {
            return <p key={i} id={i} onClick={this.show}> {recipe.name}</p>;
          });
      }
      return (
        <div id="recipeList">
					<p id="addp"><span id="addspan" className="button green" onClick={this.add}>Add Recipe</span></p>
            {listItems}


          <br/><br/>
        </div>
      );
    }
  }
};

class EditForm extends React.Component {

  render() {
	    return (
        <div id="form">
          <form id="add">
            <span> Recipe Name:</span>
            <input onChange={this.props.handleName} type="text" name="name" value={this.props.name} required/>
            <span> Ingredients:<span className="explain">(enter the ingredients separated by commas)</span></span>
            <input onChange={this.props.handleIngr} type="text" name="ingredients" value={this.props.ingredients} required/>
            <br/><br/>
            <span className="button red" onClick={this.props.deleteRecipe}>Delete Recipe</span>
            <span className="button gold" onClick={this.props.cancel}>Cancel</span>
            <span className="button green" onClick={this.props.saveRecipe}>Save Recipe</span>
          </form>
          <br/>
        </div>
      );
  }
};
class AddForm extends React.Component {

  render() {
	    return (
        <div id="form">
          <form id="add">
            <span> Recipe Name:</span>
            <input onChange={this.props.handleName} type="text" name="name" placeholder="Recipe Name" required/>
            <span> Ingredients:</span>
            <input onChange={this.props.handleIngr} type="text" name="ingredients" placeholder="Enter the ingredients separated by commas" required/>
            <br/><br/>
            <span className="button green" onClick={this.props.addRecipe}>Save Recipe</span>
            <span className="button gold" onClick={this.props.cancel}>Cancel</span>
          </form>
          <br/>
        </div>
      );
    }
};
class Recipe extends React.Component {
	
  render() {
    var ingredientsList= this.props.ingredients.split(',');
    ingredientsList=ingredientsList.map((ing) => {
      ing=ing.trim();
      return <li> {ing}</li>;
    })
	    return (
        <div id="recipe">
          <ul>
            {ingredientsList}
          </ul>
          <br/>
            <span className="button red"  onClick={this.props.deleteRecipe}>Delete Recipe</span>
            <span className="button green"  onClick={this.props.edit}>Edit Recipe</span>
            <span className="button gold"  onClick={this.props.cancel}>Back</span>
          <br/><br/>
        </div>
      );
    }
};

export default App;
