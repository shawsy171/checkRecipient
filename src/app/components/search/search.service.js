
/**
 * create the state object to be updated
 * @param {event} e 
 */
export const createStateMessage = (e) => {
  const message = {}
  message[e.target.name] = e.target.value;
  return message;
}
/**
 * contruct the url string used to make the request to the github API
 * @param {string} owner 
 * @param {string} repo 
 */
export const constructUrl = (owner, repo) => {
  return owner + '/' + repo + '/issues' 
}