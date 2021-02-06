import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import Axios from "axios";

export default class List extends React.Component {
  state = {
    data: [],
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    Axios.get("http://localhost:3000").then((res) => {
      let words = res.data;
      let newState = [];
      for (let word in words) {
        newState.push({
          Id: word,
          Author: words[word].Author,
          Description: words[word].Description,
          Title: words[word].Title,
        });
      }
      this.setState({
        data: newState,
      });
    });
  };

  deleteData = (id) => {
    Axios.delete(`http://localhost:3000/${id}`).then((res) => {
      alert("Berhasil Delete Data");
      this.getData();
    });
  };

  handleButtonDeleteClick = (id) => {
    this.deleteData(id);
  };

  handleUpdateClick = (data) => {
    this.props.history.push("/edit", { data });
  };

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            < br/>
            <h3 class="panel-title">Lista Pacientes - Ortopédica Excellence </h3>
          </div>
          < br/>
          <div class="panel-body">
            <h4>
              <Link to="/" class="btn btn-primary">
                Editar e Deletar dados do paciente
              </Link>
            </h4>
            < br/>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Responsável</th>
                  <th>Editar</th>
                  <th>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((data) => (
                  <tr>
                    <td>
                      <Link to={`/show/${data.Id}`}>{data.Title}</Link>
                    </td>
                    <td>{data.Description}</td>
                    <td>{data.Author}</td>
                    <td>
                      <Link to={`/edit/${data.Id}`} class="btn btn-success">Editar</Link>&nbsp;
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleButtonDeleteClick(data.Id)}
                        class="btn btn-danger"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
