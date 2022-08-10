
import './App.css';
import React from 'react';
import Field from './components/Field.jsx';
import { Provider } from "react-redux";
import store from './redux/store';
import Info from './components/Info';

window.store = store;

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Info/>
        <Field countField="5"/>
      </div>
    </Provider>

  );
}

export default App;
