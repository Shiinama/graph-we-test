/* eslint-disable no-console */
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { request } from "@tarojs/taro";

import { onError } from "@apollo/client/link/error";

interface RequestInit {
  /** A BodyInit object or null to set request's body. */
  body?: BodyInit | null;
  /** A string indicating how the request will interact with the browser's cache to set request's cache. */
  cache?: RequestCache;
  /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
  credentials?: RequestCredentials;
  /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
  headers?: HeadersInit;
  /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
  integrity?: string;
  /** A boolean to set request's keepalive. */
  keepalive?: boolean;
  /** A string to set request's method. */
  method?: string;
  /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
  mode?: RequestMode;
  /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
  redirect?: RequestRedirect;
  /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
  referrer?: string;
  /** A referrer policy to set request's referrerPolicy. */
  referrerPolicy?: ReferrerPolicy;
  /** An AbortSignal to set request's signal. */
  signal?: AbortSignal | null;
  /** Can only be null. Used to disassociate request from any Window. */
  window?: null;
}
const httpLink = new HttpLink({
  uri: "https://rekxrk.container-demo.hjgpscm.com/operation/graphql",
  fetch: (url, options: RequestInit) =>
    request({
      url: url.toString(),
      method: options.method as "POST" | "GET" | "PUT" | "DELETE" | "OPTIONS",
      data: options.body,
      header: options.headers,
    }).then(({ data }) => {
      return {
        text: () => {
          return Promise.resolve(JSON.stringify(data));
        },
      };
    }) as Promise<Response>,
});
// 请求处理
const requestMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token =
      "kktJLMPhAtduLA0Jl5dXqlx5b2HETHK5Ah/H2M1kJo4DiDGfdctWo7Vfh/oA9pGXFL3yB0ztGMFwK6TFla/GmA==";
    if (token) {
      console.log(headers, 111);
      Object.assign(headers, { Authorization: token });
    }
    return {
      headers,
    };
  });

  // operation.variables = omitDeepLodash(operation?.variables, ["__typename"]);
  return forward(operation);
});
// 响应处理
const responseMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    return response;
  });
});
// 错误处理
let loginModalIsShown = false;
const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
  const token =
    "kktJLMPhAtduLA0Jl5dXqlx5b2HETHK5Ah/H2M1kJo4DiDGfdctWo7Vfh/oA9pGXFL3yB0ztGMFwK6TFla/GmA==";
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, extensions, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      );

      if (extensions) {
        const { message: code } = extensions;
        if (code === "401" || code === 401) {
          if (!loginModalIsShown && token) {
            loginModalIsShown = true;
            console.error("请求失败");
          }
        } else {
          console.error("请求失败");
        }
      }
    });
  if (networkError) {
    console.error(`[Network error]: ${networkError.stack}`);
  }
});
export default new ApolloClient({
  link: concat(
    errorMiddleware,
    concat(responseMiddleware, concat(requestMiddleware, httpLink))
  ),
  cache: new InMemoryCache({
    // 去掉 __typename
    addTypename: false,
  }),
  defaultOptions: {
    // 禁用缓存
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});
