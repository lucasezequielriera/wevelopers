import React from 'react';
import './assets/css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import VerticalMenu from './components/Navbar/VerticalMenu';
import HorizontalMenu from './components/Navbar/HorizontalMenu';

export default function App() {
  
  return (
  <div className="app">
    <HorizontalMenu />
    <VerticalMenu />
  </div>
  )
}
