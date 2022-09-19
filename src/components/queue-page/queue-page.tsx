import React, { FormEvent, useRef, useState } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { IQueue, Queue, TQueueContainer } from "./queue";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element";
import { setShortDelay } from "../../assets/functions/delay";
import { QUEUE_SIZE } from "../../constants/queue-size";
import { HEAD, TAIL } from "../../constants/element-captions";
import { IInProcess } from "../../types/animation-process";
import { NOT_STATED } from "../../constants/not-stated";

export const QueuePage: React.FC = () => {
  const { current: queue } = useRef<IQueue<string>>(new Queue(QUEUE_SIZE))
  const [ inputValue, setInputValue ] = useState<string>(NOT_STATED);
  const [ circles, setCircles ] = useState<TQueueContainer<string>>(queue.elements)
  const [ inProcess, setInProcess ] = useState<IInProcess>({ add: false, remove: false });
  const newQueue = useRef(true);
  const isAnyProcess = inProcess.add || inProcess.remove;
  const queueLength = queue.currLength;

  const changeInput = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const updateCircles = () => {
    setCircles(queue.elements);
  }

  const removeCircle = async () => {
    setInProcess({ add: false, remove: true });
    await setShortDelay();
    queue.dequeue();
    updateCircles();
    setInProcess({ add: false, remove: false });
  }

  const clearCircles = () => {
    queue.clear();
    newQueue.current = true;
    updateCircles();
  }

  const addCircle = async (item: string) => {
    queue.enqueue(item)
    updateCircles();
    newQueue.current = false;
    await setShortDelay();
    setInputValue(NOT_STATED);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setInProcess({ add: true, remove: false });
    await addCircle(inputValue);
    setInProcess({ add: false, remove: false });
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type={'text'}
          maxLength={4}
          isLimitText
          onChange={changeInput}
          value={inputValue}
          placeholder={'Введите значение'}
          disabled={inProcess.add || inProcess.remove}
        />
        <Button
          type={'submit'}
          text={'Добавить'}
          disabled={inputValue.length < 1 || queueLength >= QUEUE_SIZE || isAnyProcess}
          isLoader={inProcess.add}
          extraClass={styles.button}
        />
        <Button
          text={'Удалить'}
          onClick={removeCircle}
          disabled={queueLength < 1 || isAnyProcess}
          isLoader={inProcess.remove}
          extraClass={styles.button}
        />
        <Button
          text={'Очистить'}
          onClick={clearCircles}
          disabled={isAnyProcess}
          extraClass={styles.button}
        />
      </form>
      <div className={styles.canvas}>
        {circles.map((circle, index) =>
          <Circle
            letter={circle}
            key={nanoid()}
            index={index}
            head={index === queue.headIndex && !newQueue.current ? HEAD : ''}
            tail={index === queue.tailIndex && queueLength > 0 ? TAIL : ''}
            state={(index === queue.headIndex && inProcess.remove) || (index === queue.tailIndex && inProcess.add)
              ? ElementStates.Changing
              : ElementStates.Default}
            extraClass={styles.circle}
          />)
        }
      </div>
    </SolutionLayout>
  );
};
