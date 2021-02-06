import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../../App.css";

export default class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      author: "",
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author } = this.state;

    Axios.post("https://api-excellence.herokuapp.com/", {
      title,
      description,
      author,
    })
      .then((docRef) => {
        this.setState({
          title: "",
          description: "",
          author: "",
        });
        this.props.history.push("/list");
        alert("Salvo");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { title, description, author } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            < br/>
            <h3 class="panel-title">Adicionar dados do paciente</h3>
          </div>
          < br/>
          <div class="panel-body">
            <h4>
              <Link to="/list" class="btn btn-primary">
                Livro de registro do paciente
              </Link>
            </h4>
            < br/>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Nome:</label>
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  placeholder="Ex: Cliente ou responsavel"
                />
              </div>
              < br/>
              <div class="form-group">
                <label for="description">Descrição:</label>
                <textArea
                  class="form-control"
                  name="description"
                  onChange={this.onChange}
                  placeholder="Ex: Orçamento, pedido, informações sobre cliente ou responsavel"
                  cols="80"
                  rows="3"
                >
                  {description}
                </textArea>
              </div>
              < br/>
              <div class="form-group">
                <label for="author">Autor:</label>
                <input
                  type="text"
                  class="form-control"
                  name="author"
                  value={author}
                  onChange={this.onChange}
                  placeholder="Ex: Dr Marcos"
                />
              </div>
              < br/>
              <button type="submit" class="btn btn-success">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
