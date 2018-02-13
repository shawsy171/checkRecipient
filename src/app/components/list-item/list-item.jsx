// @ts-check

// TODO: Refactor to create a sublist component? probably presentational
import React from 'react';
import PropTypes from 'prop-types';

// utils
import { isObject } from 'lodash';
import { isArray }  from 'lodash';

class ListItem extends React.Component {
  constructor({props}) {
    super(props);

    this.state = {
      show: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * toggle show state
   */
  handleClick () {
    this.setState(() => ({ show: !this.state.show }))
  }

  /**
   * Recursively create the list items to be shown in the results
   * show only the results that have been selected in the filter
   * if usefilter is false show all results
   * @param {Object} itemObj 
   * @param {boolean} usefilter 
   */
  // TODO: abstract to a service
  listkeys (itemObj, usefilter) {
    return Object.keys(itemObj)
      .filter((key) => {
        return usefilter ? this.props.filterByList.includes(key) : true;
      })
      .map((key, i) => {
        if (isObject(itemObj[key])) {
          return (
            <div key={i}>
              <span className="list-item__subtitle">{key}</span>
              <ul>{ this.listkeys(itemObj[key], false) }</ul>
            </div>
          )
        }
      return <li className="list-item__data" key={i} >{key}: {itemObj[key]} </li>
    })
  }

  render () {
    const {
      show,
    } = this.state
    const {
      item,
    } = this.props
    return (
      <li>
        <div className="list-item" onClick={this.handleClick}>
          <div className="list-item__id">Issue ID: { item.id }</div>
          <div className="list-item__title">Title: { item.title }</div>
        </div>
        { show ? 
          (
            <ul>
            {this.listkeys(item, true)}
            </ul>
          )
          : null
        }
        
      </li>
    );
  }
}

export default ListItem;

ListItem.proptype = {
  item: PropTypes.string,
  filterByList: PropTypes.arrayOf(PropTypes.string),
}