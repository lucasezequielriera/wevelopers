import React from 'react';
import './assets/css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import VerticalMenu from './components/Navbar/VerticalMenu';
import HorizontalMenu from './components/Navbar/HorizontalMenu';
import DataProvider from './context/DataContext';

// const initialValue = []

// const reducer = (state = initialValue, action) => {
//   return state
// }
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function App() {
  
  return (
    <DataProvider>
      <div className="app">
        <HorizontalMenu />
        <VerticalMenu />
      </div>
    </DataProvider>
  )
}
