/// <reference lib="dom" />
// deno-lint-ignore-file no-explicit-any
import { DocumentNode } from "https://deno.land/x/graphql_deno@v15.0.0/mod.ts";

export type Variables = { [key: string]: any };

export interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: any;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: GraphQLError[];
  extensions?: any;
  status: number;
  [key: string]: any;
}

export interface GraphQLRequestContext<V = Variables> {
  query: string | string[];
  variables?: V;
}

export class ClientError extends Error {
  response: GraphQLResponse;
  request: GraphQLRequestContext;

  constructor(response: GraphQLResponse, request: GraphQLRequestContext) {
    const message = `${ClientError.extractMessage(response)}: ${
      JSON.stringify({
        response,
        request,
      })
    }`;

    super(message);

    Object.setPrototypeOf(this, ClientError.prototype);

    this.response = response;
    this.request = request;

    // this is needed as Safari doesn't support .captureStackTrace
    if ((typeof Error as any).captureStackTrace === "function") {
      (typeof Error as any).captureStackTrace(this, ClientError);
    }
  }

  private static extractMessage(response: GraphQLResponse): string {
    try {
      return response.errors![0].message;
    } catch (_e) {
      return `GraphQL Error (Code: ${response.status})`;
    }
  }
}

export type RequestDocument = string | DocumentNode;

export type BatchRequestDocument<V = Variables> = {
  document: RequestDocument;
  variables?: V;
};

export type RawRequestOptions<V = Variables> = {
  query: string;
  variables?: V;
  requestHeaders?: RequestInit["headers"];
  signal?: RequestInit["signal"];
};

export type RequestOptions<V = Variables> = {
  document: RequestDocument;
  variables?: V;
  requestHeaders?: RequestInit["headers"];
  signal?: RequestInit["signal"];
};

export type BatchRequestsOptions<V = Variables> = {
  documents: BatchRequestDocument<V>[];
  requestHeaders?: RequestInit["headers"];
  signal?: RequestInit["signal"];
};

export type RequestExtendedOptions<V = Variables> =
  & { url: string }
  & RequestOptions<V>;

export type RawRequestExtendedOptions<V = Variables> =
  & { url: string }
  & RawRequestOptions<V>;

export type BatchRequestsExtendedOptions<V = Variables> =
  & { url: string }
  & BatchRequestsOptions<V>;
