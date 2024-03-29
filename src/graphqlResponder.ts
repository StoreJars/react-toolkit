export default function gqlResponder(error, errorReporter?: any) {
  const SERVICE_UNAVAILABLE_MESSAGE = 'Service unavailable, please check your network connection and try again';
  const UNEXPECTED_ERROR_MESSAGE = 'Please try again, an unexpected error occurred';

  try {
    const { graphQLErrors, networkError } = error;

    if (networkError) {
      errorReporter.notify(networkError);
      return SERVICE_UNAVAILABLE_MESSAGE;
    }

    if (graphQLErrors) {
      const { code, response } = graphQLErrors[0].extensions;

      if (response) {
        let error;

        if (response.body.data.constructor === Array) {
          error = response.body.data[0].message;
        } else {
          error = response.body.data;
        }

        errorReporter.notify(error);
        return error;
      } else {
        let error;

        if (code == 'ECONNREFUSED') {
          error = SERVICE_UNAVAILABLE_MESSAGE;
        } else {
          error = UNEXPECTED_ERROR_MESSAGE;
        }
        errorReporter.notify(error);
        return error;
      }
    }

    return UNEXPECTED_ERROR_MESSAGE;
  } catch (ex) {
    errorReporter.notify(ex);
    return ex.message;
  }
}
