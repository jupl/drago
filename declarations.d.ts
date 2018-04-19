// Add declarations here

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: Function
  __APOLLO_STATE__: any // tslint:disable-line:no-any
  __REDUX_STATE__: any // tslint:disable-line:no-any
}

// TODO Remove the following below once TS supports async iterator w/o esnext

interface SymbolConstructor {
  readonly asyncIterator: symbol
}

interface AsyncIterator<T> {
  next(value?: {}): Promise<IteratorResult<T>>
  return?(value?: {}): Promise<IteratorResult<T>>
  throw?(e?: {}): Promise<IteratorResult<T>>
}

interface AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>
}
