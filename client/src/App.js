import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import { keepTheme } from "./utils/themes";

import Sidebar from "./components/Sidebar";
import Invoices from "./components/Invoices";
import Invoice from "./components/Invoice";
import NotFound from "./components/NotFound";

import ErrorState from "./context/error/ErrorState";
import InvoicesState from "./context/invoice/InvoicesState";
import ModalState from "./context/modal/ModalState";

//eslint-disable-next-line
import css from "./css/style.css";

const App = () => {
  useEffect(() => {
    keepTheme();
  }, []);

  return (
    <ErrorState>
      <InvoicesState>
        <ModalState>
          <div className='app'>
            <Sidebar />
            <Router history={history}>
              <Switch>
                <Route exact path='/' component={Invoices} />
                <Route exact path='/invoices/:id' component={Invoice} />
                <Route path='' component={NotFound} />
              </Switch>
            </Router>
          </div>
        </ModalState>
      </InvoicesState>
    </ErrorState>
  );
};

export default App;
