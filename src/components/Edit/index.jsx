import React from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';

export default class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      author: ''
    };
  }

  componentDidMount() {
    Axios.get(`https://api-excellence.herokuapp.com/${this.props.match.params.id}`).then((res) => {
      if (res.data != null) {
        let board = res.data;
        this.setState({
          key: board.Id,
          title: board.Title,
          description: board.Description,
          author: board.Author
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author } = this.state;

    Axios.put(`https://api-excellence.herokuapp.com/${this.state.key}`, {
      title,
      description,
      author
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        author: ''
      });
      this.props.history.push("/list")
      alert("Berhasil Edit Data");
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Editar
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/list/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Nome:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Nome:" />
              </div>
              <div class="form-group">
                <label for="description">Descrição:</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Descrição" />
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" class="btn btn-success">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

