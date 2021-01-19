import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Menu extends Component {



    render() {

        return (
            <div className="container pb-5 my-2">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <Link className="btn btn-block text-uppercase d-flex my-2 mx-2 float-right btn-outline-primary" to={`/`}>Buscar por por endereço</Link>
                    </div>
                    <div className="col-12 col-lg-6">
                        <Link className="btn  btn-block text-uppercase d-flex my-2 mx-2 float-right btn-outline-primary" to={`/busca-por-cep`}>Buscar por cep</Link>
                    </div>
                </div>
            </div >
        );
    }

}
