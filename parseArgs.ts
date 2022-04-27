import {
  BatchRequestDocument,
  BatchRequestsExtendedOptions,
  BatchRequestsOptions,
  RawRequestExtendedOptions,
  RawRequestOptions,
  RequestDocument,
  RequestExtendedOptions,
  RequestOptions,
  Variables,
} from "./types.ts";

export function parseRequestArgs<V = Variables>(
  documentOrOptions: RequestDocument | RequestOptions<V>,
  variables?: V,
  requestHeaders?: RequestInit["headers"],
): RequestOptions<V> {
  return (documentOrOptions as RequestOptions<V>).document
    ? (documentOrOptions as RequestOptions<V>)
    : {
      document: documentOrOptions as RequestDocument,
      variables: variables,
      requestHeaders: requestHeaders,
      signal: undefined,
    };
}

export function parseRawRequestArgs<V = Variables>(
  queryOrOptions: string | RawRequestOptions<V>,
  variables?: V,
  requestHeaders?: RequestInit["headers"],
): RawRequestOptions<V> {
  return (queryOrOptions as RawRequestOptions<V>).query
    ? (queryOrOptions as RawRequestOptions<V>)
    : {
      query: queryOrOptions as string,
      variables: variables,
      requestHeaders: requestHeaders,
      signal: undefined,
    };
}

export function parseBatchRequestArgs<V = Variables>(
  documentsOrOptions: BatchRequestDocument<V>[] | BatchRequestsOptions<V>,
  requestHeaders?: RequestInit["headers"],
): BatchRequestsOptions<V> {
  return (documentsOrOptions as BatchRequestsOptions<V>).documents
    ? (documentsOrOptions as BatchRequestsOptions<V>)
    : {
      documents: documentsOrOptions as BatchRequestDocument<V>[],
      requestHeaders: requestHeaders,
      signal: undefined,
    };
}

export function parseRequestExtendedArgs<V = Variables>(
  urlOrOptions: string | RequestExtendedOptions<V>,
  document?: RequestDocument,
  variables?: V,
  requestHeaders?: RequestInit["headers"],
): RequestExtendedOptions<V> {
  return (urlOrOptions as RequestExtendedOptions<V>).document
    ? (urlOrOptions as RequestExtendedOptions<V>)
    : {
      url: urlOrOptions as string,
      document: document as RequestDocument,
      variables: variables,
      requestHeaders: requestHeaders,
      signal: undefined,
    };
}

export function parseRawRequestExtendedArgs<V = Variables>(
  urlOrOptions: string | RawRequestExtendedOptions<V>,
  query?: string,
  variables?: V,
  requestHeaders?: RequestInit["headers"],
): RawRequestExtendedOptions<V> {
  return (urlOrOptions as RawRequestExtendedOptions<V>).query
    ? (urlOrOptions as RawRequestExtendedOptions<V>)
    : {
      url: urlOrOptions as string,
      query: query as string,
      variables: variables,
      requestHeaders: requestHeaders,
      signal: undefined,
    };
}

export function parseBatchRequestsExtendedArgs<V = Variables>(
  urlOrOptions: string | BatchRequestsExtendedOptions<V>,
  documents?: BatchRequestDocument<V>[],
  requestHeaders?: RequestInit["headers"],
): BatchRequestsExtendedOptions<V> {
  return (urlOrOptions as BatchRequestsExtendedOptions<V>).documents
    ? (urlOrOptions as BatchRequestsExtendedOptions<V>)
    : {
      url: urlOrOptions as string,
      documents: documents as BatchRequestDocument<V>[],
      requestHeaders: requestHeaders,
      signal: undefined,
    };
}
