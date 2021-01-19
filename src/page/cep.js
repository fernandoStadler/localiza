import React, { Component } from 'react';
import api from '../service/api';
import Menu from '../components/menu'
import Footer from '../components/footer'

import InputMask from "react-input-mask";

import toast, { Toaster } from 'react-hot-toast';


export default class PorCep extends Component {

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

        const cep = document.getElementById("cep").value;

        const response = await api.get(`/${cep}/json/`);

        if (response.data.erro == true) {

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

                        <div className="col-12 col-lg-12">
                            <div className="mb-3">
                                <label className="form-label text-uppercase" >Digite o cep que deseja consultar</label>
                                <InputMask mask="99999-999" type="text" className="form-control" id="cep" onChange={this.handleInput} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block text-uppercase">Buscar</button>
                </form>
                <div className="alert border-primary text-center text-uppercase mt-3"> Resultado da busca </div>
                {
                    locations != null ?
                        <div className="p-3 my-3 border border-1 shadow">
                            <article key={locations} >
                                <p className="bold"><strong>Estado:</strong> {locations.uf} </p>
                                <p className="bold"><strong>Cidade:</strong> {locations.localidade} </p>
                                <p className="bold"><strong>Bairro:</strong> {locations.bairro}</p>
                                <p className="bold"><strong>CEP:</strong> {locations.cep}</p>
                                <p className="bold"><strong>Logradouro:</strong> {locations.logradouro}</p>
                            </article>
                        </div>
                        :
                    null
                }
                    <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                <Footer />
            </div >
        );
    }

}
