/// <reference types="react-scripts" />
declare namespace NodeJS {
  export interface Global {}
}

declare var Request: {
  prototype: Request
  new <T = unknown>(input: RequestInfo, init?: TypedRequestInit<T>): Request
}
declare function fetch<FetchResponseBody = unknown, FetchRequestBody = unknown>(
  input: RequestInfo,
  init?: TypedRequestInit<FetchRequestBody>
): Promise<TypedResponse<FetchResponseBody>>

interface TypedRequestInit<T = unknown> extends RequestInit {
  body?: T | RequestInit['body']
  method?: 'get' | 'post' | 'patch' | 'delete'
}

interface TypedBody<T = unknown> extends Body {
  json(): Promise<T>
}
interface TypedResponse<T = unknown> extends Response {
  json(): Promise<T>
}

interface Meta {
  request_id: string
}

interface APIResponseBody<Data = unknown, Error = unknown> {
  data?: Data
  error?: Error
  meta: Meta
}

interface Post {
  created_time: string
  from_id: string
  from_name: string
  id: string
  message: string
  type: string
}
