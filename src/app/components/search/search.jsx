// @ts-check
import React from 'react';
import PropTypes from 'prop-types';

// constants 
import { GITHUB_REPOS_URL } from './../../constants/app.constants';

// services 
import { 
  createStateMessage,
  constructUrl 
} from './search.service';
import { 
  stateMessageBus$,
  getOptionsList$,
} from './../../services/app.services';

// components
import Input from './components/input';

const Search = ({ owner, repo, error }) => {
  /**
   * send the event to container component
   * @param {event} e 
   */
  const handleChange = (e) => {
    const message = createStateMessage(e);
    stateMessageBus$.next(() => (message));
  }
  /**
   * call the github API
   * @param {event} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    getOptionsList$(GITHUB_REPOS_URL + constructUrl(owner, repo));
  }

  return (
    <div className="search">
      <p className="error-message">{ error }</p>
      <form onSubmit={handleSubmit}>
      <Input 
        labelName="Owner"
        type="text"
        name="owner"
        value={owner}
        handleChange={handleChange}
        placeholder="e.g. atom"
      />

      <Input 
        labelName="Repo"
        type="text"
        name="repo"
        value={repo}
        handleChange={handleChange}
        placeholder="e.g. atom"
      />
      
      <input type="submit" value="Search"/>
      </form>
    </div>
  )
}

export default Search;

Search.proptypes = {
  owner: PropTypes.string,
  repo: PropTypes.string,
  error: PropTypes.string, // seems allow undefined
}