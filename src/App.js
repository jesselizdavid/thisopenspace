import React, { Component } from 'react';
import logo from './thisopenspace.svg';
import './App.css';

const API = 'https://thisopenspace.com/lhl-test?page=';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      location: [],
      currentPage: 1,
      perPage: 3
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }
  
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then( response => this.setState({ location: response.data })) 
  }

  render() {

    const { location, currentPage, perPage } = this.state;

    const LastPage = currentPage * perPage;
    const indexOfFirstPerPage = LastPage - perPage;
    const currentPerPage = location.slice(indexOfFirstPerPage, LastPage);


  const renderPage = currentPerPage.map((page, index) => {
    return (
      <div className="App-display">
        <li key={index}>{page.name}</li>
        <li key={index}>{page.address}</li>
        <li key={index}>{page.hourly_price}</li>
        <li key={index}>{page.daily_price}</li>
        <li key={index}>{page.square_footage}</li>
        <li key={index}>{page.capacity}</li>
        <li key={index}>{page.views_count}</li>
        <li key={index}>{page.primary_phot_css_url_small}</li>
      </div>
    );
  });

    const pageNumbers = []
    for (let i = 1; i <=Math.ceil(location.length / perPage); i++) {
      pageNumbers.push(i);
    }
    
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    })

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">welcome to thisopenspace locations</h1>
        </header>
        <div>{renderPage}</div>
        <ul>
          <li className="App-paginate">{renderPageNumbers}</li>
        </ul>
      </div>
    );
  }

}

export default App;
