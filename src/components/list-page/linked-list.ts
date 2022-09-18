export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export interface ILinkedList<T> {
  prepend: (item: T) => void;
  append: (item: T) => void;
  addByIndex: (item: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => Array<T>;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private size: number;

  constructor(items?: Array<T>) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (items) this.initialize(items);
  }

  private initialize = (items: Array<T>) => {
    let previous = new LinkedListNode<T>(items[0])
    let current: LinkedListNode<T> | null = null;

    this.head = previous;
    for (let i = 1; i < items.length; i++) {
      current = new LinkedListNode(items[i]);
      previous.next = current;

      if (i === items.length - 1) {
        this.tail = current;
        current.next = null;
      }

      previous = current;
    }
    this.size = items.length;
  }

  prepend = (item: T) => {
    const node = new LinkedListNode(item);

    if (this.head) {
      node.next = this.head;
    } else {
      this.tail = node;
    }
    this.head = node;
    this.size++;
  }

  append = (item: T) => {
    const node = new LinkedListNode(item);

    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }
    this.tail = node;
    this.size++;
  }

  addByIndex = (item: T, index: number) => {
    if ((index < 0 || index >= this.size) && index !== 0) {
      throw new Error("Индекс вне масива");
    }

    if (index === 0) {
      this.prepend(item);
      return;
    }

    const node = new LinkedListNode(item);
    let previous: LinkedListNode<T> | null = null;
    let current = this.head;

    for (let i = 0; i < this.size; i++) {
      if (index === i && previous) {
        previous.next = node;
        node.next = current;
        this.size++;
        return;
      }

      previous = current;
      current = current?.next || null;
    }
  }

  deleteByIndex = (index: number) => {
    if ((index < 0 || index >= this.size)) {
      throw new Error("Индекс вне масива");
    }

    if (index === 0) {
      this.deleteHead();
      return;
    }

    if (index === this.size - 1) {
      this.deleteTail();
      return;
    }

    let previous: LinkedListNode<T> | null = null;
    let current = this.head;

    for (let i = 0; i < this.size - 1; i++) {
      if (index === i && previous && current) {
        previous.next = current.next;
        this.size--;
        return;
      }

      previous = current;
      current = current?.next || null;
    }
  }

  deleteHead = () => {
    if (!this.head) {
      throw new Error("Список пустой");
    }

    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size--;
  }

  deleteTail = () => {
    if (!this.head) {
      throw new Error("Список пустой");
    }

    let previous: LinkedListNode<T> | null = null;
    let current = this.head;

    while (current.next) {
      previous = current;
      current = current.next;
    }

    if (previous) {
      this.tail = previous;
      this.tail.next = null;
    } else {
      this.tail = null;
      this.head = null;
    }
    this.size--;
  }

  toArray = () => {
    const array: Array<T> = [];

    let current = this.head;

    while(current) {
      array.push(current.value);
      current = current.next;
    }

    return array;
  }
}

