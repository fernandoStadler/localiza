import React, { Component } from 'react';
import api from '../service/api';
import Menu from '../components/menu'
import Footer from '../components/footer'

import toast, { Toaster } from 'react-hot-toast';


export default class Localiza extends Component {

    state = {
        locations: [],
        form_busca: {}
    };

    handleInput = event => {
        const input = event.target;
        const value = input.value;
        const name = input.name;

        const form_busca = this.state.form_busca;
        this.setState({ form_busca: { ...form_busca, [name]: value } });


    }
    handleSubmit = async (event) => {

        event.preventDefault();

        const estado = document.getElementById("estado").value;
        const cidade = document.getElementById("cidade").value;
        const logradouro = document.getElementById("logradouro").value;

        const response = await api.get(`/${estado}/${cidade}/${logradouro}/json/`);

        if (response.data.length < 1) {

            toast.error("A Sua busca não retornou resultados.")
        }

        const value = response.data

        this.setState({ locations: value })

    }

    render() {
        const { locations } = this.state;
        return (
            <div className="container my-5 py-5">
                <Menu />
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Selecione o estado</label>
                                <select value={this.state.value} name="estados-brasil" id="estado" className="custom-select" onChange={this.handleInput} aria-label="Default select example">
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Digite o nome da Cidade</label>
                                <input type="text" className="form-control" name="cidade" id="cidade" onChange={this.handleInput} />
                            </div>
                        </div>
                        <div className="col-12 col-lg-12">
                            <div className="mb-3">
                                <label className="form-label text-uppercase" >Digite o logradouro</label>
                                <input type="text" className="form-control" id="logradouro" onChange={this.handleInput} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block text-uppercase">Buscar</button>
                </form>
                <div className="alert border-primary text-center text-uppercase mt-3"> Resultado da busca </div>
                {
                    locations.map((result, index) => (
                        <div className="p-3 my-3 border border-1 shadow">
                            <article key={result.cep} >
                                <p className="bold"><strong>Estado:</strong> {result.uf} </p>
                                <p className="bold"><strong>Cidade:</strong> {result.localidade} </p>
                                <p className="bold"><strong>Bairro:</strong> {result.bairro}</p>
                                <p className="bold"><strong>CEP:</strong> {result.cep}</p>
                                <p className="bold"><strong>Logradouro:</strong> {result.logradouro}</p>
                            </article>
                        </div>
                    ))}
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <Footer />
            </div >
        );
    }

}
