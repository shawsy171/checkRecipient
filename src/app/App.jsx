// @ts-check

import React, { Component } from 'react';
import logo from './../logo.svg';
import './App.css';

// services
import { 
  getOptionsList$, 
  stateMessageBus$, 
  updateFilterByList,
} from './services/app.services'
import { pillsMessageBus$ } from './components/filterOptions/components/filter-pill/filler-pills.service';

// components
import Search from './components/search/search';
import ResultsList from './components/results-list/results-list';
import FilterOptions from './components/filterOptions/filterOptions';

class App extends Component {
  constructor (props) {
    super(props);
     this.state = {
      results: [],
      filterOptionItems: [],
      filterByList: ['url'],
      owner: '',
      repo: '',
      error: undefined,
     }
  }
  componentWillMount () {

    /**
     * receieves data which is use to update the app
     */
    stateMessageBus$
      .subscribe((message) => {
      this.setState(message);
    })

    /**
     * relays the data from the selected pill
     */
    pillsMessageBus$
      .subscribe((item) => {
        this.setState(() => ({filterByList: updateFilterByList(item, this.state.filterByList)}))
      })
  }

  render() {
    const {
      results,
      owner,
      repo,
      error,
      filterOptionItems,
      filterByList,
    } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Please Enter the Owner and Repo
        </p>
        <Search owner={owner} repo={repo} error={error}/>
        <FilterOptions 
          filterOptionItems={filterOptionItems} 
          filterByList={filterByList}
        />
        <ResultsList list={results} filterByList={filterByList}/>
      </div>
    );
  }
}

export default App;
