export type TQueueContainer<T> = Array<T | undefined>;

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  elements: TQueueContainer<T>;
  headIndex: number;
  tailIndex: number;
  currLength: number;
}

export class Queue<T> implements IQueue<T> {
  private container: TQueueContainer<T> = [];
  private head: number = 0;
  private tail: number = 0;
  private length: number = 0;

  constructor(private readonly size: number = 0) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Нарушена максимальная длина очереди");
    }

    if (this.length > 0) {
      if (this.tail === this.size - 1) {
        this.tail = 0;
      } else {
        this.tail++;
      }
    }
    this.container[this.tail] = item;
    this.length++;
  }

  dequeue = () => {
    if (this.length < 1) {
      throw new Error("Очередь пустая");
    }

    this.container[this.head] = undefined;
    if (this.length > 1) {
      if (this.head === this.size - 1) {
        this.head = 0;
      } else {
        this.head++;
      }
    }
    this.length--;
  };

  clear = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  get elements() {
    return [...this.container];
  }

  get headIndex() {
    return this.head;
  }

  get tailIndex() {
    return this.tail;
  }

  get currLength() {
    return this.length;
  }
}