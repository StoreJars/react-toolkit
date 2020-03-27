
export function responder(response, context = '') {
  console.log('Error is', response, context);

  const NO_INTERNET_MESSAGE = 'No internet, please check your network connection and try again';
  return response ? (response.data.constructor === Array ? response.data[0].message : response.data) : NO_INTERNET_MESSAGE
}
