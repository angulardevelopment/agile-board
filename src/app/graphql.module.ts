import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

// const uri = 'https://wlivfllgizadjcmus3gp35izou.appsync-api.us-east-1.amazonaws.com/graphql'; // <-- add the URL of the GraphQL server here
const uri = 'https://countries.trevorblades.com';
export function createApollo(httpLink: HttpLink) {

  // const basic = setContext((operation, context) => ({
  //   headers: {
  //     Accept: 'charset=utf-8'
  //   }
  // }));

  // const auth = setContext((operation, context) => ({
  //   headers: {
  //     'x-api-key': `da2-v7a3ylacdvg4vn37ta4fik4ypu`
  //   },
  // }));

  // const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const link = httpLink.create({ uri });
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
