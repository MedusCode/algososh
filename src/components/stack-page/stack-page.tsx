import React, { FormEvent, useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { IStack, Stack, TStackContainer } from "./stack";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element";
import { setShortDelay } from "../../assets/functions/delay";
import { IInProcess } from "../../types/animation-process";

export const StackPage: React.FC = () => {
  const [ stack ] = useState<IStack<string>>(new Stack())
  const [ inputValue, setInputValue ] = useState<string>('');
  const [ circles, setCircles ] = useState<TStackContainer<string>>([])
  const [ inProcess, setInProcess ] = useState<IInProcess>({ add: false, remove: false });
  const isAnyProcess = inProcess.add || inProcess.remove;

  const changeInput = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const updateCircles = () => {
    setCircles(stack.getElements());
  }

  const addCircle = async (item: string) => {
    stack.push(item);
    updateCircles();
    setInputValue('');
    await setShortDelay();
  }

  const removeCircle = async () => {
    setInProcess({ add: false, remove: true });
    stack.pop();
    await setShortDelay();
    updateCircles();
    setInProcess({ add: false, remove: false });
  }

  const clearCircles = () => {
    stack.clear();
    updateCircles();
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setInProcess({ add: true, remove: false });
    await addCircle(inputValue);
    setInProcess({ add: false, remove: false });
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type={'text'} maxLength={4} isLimitText={true} onChange={changeInput} value={inputValue} />
        <Button
          type={'submit'}
          text={'Добавить'}
          disabled={inputValue.length < 1 || circles.length >= 20 || isAnyProcess}
          isLoader={inProcess.add}
          extraClass={styles.button}
        />
        <Button
          text={'Удалить'}
          onClick={removeCircle}
          disabled={circles.length < 1 || isAnyProcess}
          isLoader={inProcess.remove}
          extraClass={styles.button}
        />
        <Button
          text={'Очистить'}
          onClick={clearCircles}
          disabled={circles.length < 1 || isAnyProcess}
          extraClass={styles.button}
        />
      </form>
      {circles ?
        <div className={styles.canvas}>
          {circles.map((circle, index) =>
            <Circle
              letter={circle}
              key={nanoid()}
              index={index}
              head={index === circles.length - 1 ? 'top' : ''}
              state={index === circles.length - 1 && isAnyProcess ? ElementStates.Changing : ElementStates.Default}
              extraClass={styles.circle}
            />)
          }
        </div>
        : <></>
      }
    </SolutionLayout>
  );
};
