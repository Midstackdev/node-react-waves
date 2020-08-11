import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {

  componentDidMount() {
    axios.get('/api/product/brand')
    .then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <div className="App">
        My app
      </div>
    );
  }
}

export default App;
