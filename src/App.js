


import React from 'react';
import Container from 'react-bootstrap/Container';

import Chart from './components/Chart';
import Input from './components/Input';
import './App.css';


class App extends React.Component {
  render() {
    return (
    	
      <Container className='main'>
      <h1>Stock Market</h1>

        <Input />
        <Chart />
      </Container>
    );
  }
}

export default App;





