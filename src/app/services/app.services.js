// @ts-check

//utils
import { isObject } from 'lodash';

// rxjs
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromPromise';

// used to pass data from component to container component
export const stateMessageBus$ = new Subject();

/**
 * call url
 * @param {string} url 
 */
export const getOptionsList$ = (url) => {
  Observable.fromPromise(
    fetch(url)
      .then((response) => {
      return response.json();
    }).catch((err) => {
      return err;
    })
  )
  .subscribe((data) => {

    if (!hasErrors(data)) {
      const keyList = createPills(data[0])

      stateMessageBus$.next(() => ({ filterOptionItems: keyList, results: data }));      
    }

  }, (err) => {
    console.error('this is an ERROR', err);
  })
}
/**
 * create an array keys from an object
 * @param {Object} obj 
 */
const createPills = (obj) => {
  if (isObject(obj)) {
    const optionsList = Object.keys(obj).map((key) => {
      return key;
    })
    return optionsList;
  }
}
/**
 * check if there is an error in the response
 * @param {Object} data 
 */
const hasErrors = (data) => {
  if (data.message) {
    stateMessageBus$.next(() => ({ error: 'Repo ' + data.message}));
    return true;
  }
  stateMessageBus$.next(() => ({ error: undefined }));
  return false;
}

/**
 * add and remove items from the filterByArray 
 * @param {string} item 
 * @param {Array} filterByList 
 * @returns {Array} filterByList
 */
export const updateFilterByList = (item, filterByList) => {
  if (filterByList.includes(item)) {
    return filterByList.filter((filterByItem) => filterByItem !== item);
  } else {
    return [ ...filterByList, item]
    
  }
}