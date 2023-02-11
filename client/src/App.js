import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { keepTheme } from "./utils/themes";

import Sidebar from "./components/Sidebar";
import Invoices from "./components/Invoices";
import Invoice from "./components/Invoice";
import NotFound from "./components/Errors/NotFound";

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
      <ModalState>
        <InvoicesState>
          <div className='app'>
            <Sidebar />
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Invoices />} />
                <Route path='/invoices/:id' element={<Invoice />} />
                <Route path='' element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </InvoicesState>
      </ModalState>
    </ErrorState>
  );
};

export default App;
