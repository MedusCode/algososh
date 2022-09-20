export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export interface IElement<T> {
  element: T;
  state: ElementStates;
}