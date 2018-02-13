// @ts-check
import React from 'react';
import PropTypes from 'prop-types';

// utils
import { isArray } from 'lodash';
// components
import ListItem from './../list-item/list-item';

const ResultsList = ({ list, filterByList }) => {
  // const templist = ['one', 'two', 'three', 'four', 'five'];

  /**
   * create a list of ListItems
   * @param {Array} list 
   */
  const createList = (list) => {
    if (isArray(list)) {
      return list.map((item, index) => {
        return <ListItem key={index} item={item} filterByList={filterByList} />
      })
    }
  };

  return (
    <div>
      <ul>
        {createList(list)}
      </ul>
    </div>
  )
}

export default ResultsList;

ResultsList.proptypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  filterByList: PropTypes.arrayOf(PropTypes.string),
}