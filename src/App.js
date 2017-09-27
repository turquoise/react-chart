import React, { Component } from 'react';
import BarChart from './components/BarChart';
import {Container} from 'reactstrap';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [100, 400, 232, 200, 233, 120, 78, 162, 390, 20]
    }
  }
  render() {
    return (
      <div className="App">
        <Container>
          <BarChart data={this.state.data}/>
        </Container>
      </div>
    );
  }
}

export default App;
