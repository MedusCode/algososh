export type TStackContainer<T> = Array<T>;

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  elements: TStackContainer<T>
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

  get elements() {
    return [...this.container];
  }
}