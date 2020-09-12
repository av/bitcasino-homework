import apollo from "next-with-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import { createApolloClient } from "lib/apollo";
import { NextPage } from "next";

export default apollo(
  function initClient({ initialState, ctx }) {
    return createApolloClient(initialState, ctx);
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
