export type TStackContainer<T> = Array<T>;

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getElements: () => TStackContainer<T>
}

export class Stack<T> implements IStack<T> {
  private container: TStackContainer<T> = [];

  push = (item: T) => {
    this.container.push(item);
  }

  pop = () => {
    this.container.pop();
  }

  clear = () => {
    this.container = [];
  }

  getElements = () => [...this.container];
}