// @ts-check
import React from 'react';
import PropTypes from 'prop-types';

// components
import FilterPill from './components/filter-pill/filter-pill';

const FilterOptions = ({ filterOptionItems, filterByList}) => {
  /**
   * create a list of FilterPills
   * @param {Array} items 
   */
  const filterList = (items) => (
    items.map((item, i) => (
      <FilterPill
        filterByList={filterByList}
        key={i} 
        item={item} 
      />
    ))
  )

  return (
    <div className="filter-options">
      {filterList(filterOptionItems)}
    </div>    
  )
}

export default FilterOptions;

FilterOptions.propTypes = {
  filterOptionItems: PropTypes.arrayOf(PropTypes.string),
  filterByList: PropTypes.arrayOf(PropTypes.string),
}