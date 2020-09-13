import apollo from "next-with-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import { createApolloClient } from "lib/apollo";

/**
 * Sets up a HOC wrapping a given Next Page
 * with an Apollo Provider.
 */
export default apollo(
  function initClient({ initialState }) {
    return createApolloClient(initialState);
  },
  {
    render: function PageWithApollo({ Page, props }) {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
