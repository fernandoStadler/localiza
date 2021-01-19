import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PorEndereco from './page/index';
import PorCep from './page/cep';;

const Routes = () => (

    <BrowserRouter>
            <Switch>
                <Route path="/busca-por-cep" component={PorCep} />
                <Route path="/" component={PorEndereco} />
            </Switch>
    </BrowserRouter>
);


export default Routes;