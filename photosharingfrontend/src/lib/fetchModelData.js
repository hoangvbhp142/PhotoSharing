/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
import axios from "axios";
async function fetchModel(url) {
  //let models = null;
  const response = await axios.get(`${url}`);
  if (response.data.success) {
    return response.data.data;
  } else {
    return null;
  }
}

export default fetchModel;
