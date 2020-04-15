export { gql } from 'apollo-boost';

export function responder(error) {
  const NO_INTERNET_MESSAGE = 'No internet, please check your network connection and try again';
  const SERVICE_UNAVAILABLE_MESSAGE = 'Service unavailable, please try again later';
  const UNEXPECTED_ERROR_MESSAGE = 'Please try again, an unexpected error occured';

  try {
    const { graphQLErrors, networkError } = error;

    if (networkError) {
      console.log('Network Error', networkError);
      return SERVICE_UNAVAILABLE_MESSAGE
    }

    if (graphQLErrors) {
      const { code, response } = graphQLErrors[0].extensions;

      console.log('GraphQL Error', response);

      if (response) {
        return response.body.data.constructor === Array ? response.body.data[0].message : response.body.data;
      } else {
        const error = code == 'ECONNREFUSED' ? SERVICE_UNAVAILABLE_MESSAGE : UNEXPECTED_ERROR_MESSAGE
        return error;
      }
    }

    return UNEXPECTED_ERROR_MESSAGE;
  } catch (ex) {
    console.log(ex);

    return ex.message;
  }
}
