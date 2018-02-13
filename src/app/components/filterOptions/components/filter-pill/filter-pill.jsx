// @ts-check

import React from 'react';
import PropTypes from 'prop-types';

// services
import { pillsMessageBus$ } from './filler-pills.service';

class FilterPill extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      show: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggleClassName = this.toggleClassName.bind(this);
  }

  componentWillMount () {
    /**
     * check for default set filter properties
     */
    const initalShowState = this.props.filterByList.includes(this.props.item);
    this.setState(() => ({ show: initalShowState }))
  }
  /**
   * toggle Class
   */
  toggleClassName () {
    return this.state.show ? "filter-pill filter-pill--active" : "filter-pill";
  }
  /**
   * toggle state and send item name to container component
   */
  handleClick () {
    this.setState(() => ({ show: !this.state.show }))
    pillsMessageBus$.next(this.props.item);
  }

  render () {
    
    return (
      <span 
        onClick={this.handleClick}
        className={this.toggleClassName()}
      >
        { this.props.item }
      </span>
    ) 
  }
}

export default FilterPill;

FilterPill.proptypes = {
  filterByList: PropTypes.arrayOf(PropTypes.string),
  item: PropTypes.string,
}