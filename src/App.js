
import './App.css';
import React from 'react';
import Field from './components/Field.jsx';
import { Provider } from "react-redux";
import store from './redux/store';

window.store = store;

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Field countField="5"/>
      </div>
    </Provider>

  );
}

export default App;
