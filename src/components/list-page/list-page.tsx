import React, { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ILinkedList, LinkedList } from "./linked-list";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { HEAD, TAIL } from "../../constants/element-captions";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { randomStringArr } from "../../assets/functions/random-array";
import { setShortDelay } from "../../assets/functions/delay";
import { ElementStates } from "../../types/element";
import { TNotStated } from "../../types/not-stated";
import { NOT_STATED } from "../../constants/not-stated";

interface IInputValues {
  value: string;
  index: number | TNotStated;
}

enum CirclePosition {
  TOP = 'top',
  BOTTOM = 'bottom'
}

interface IProcess {
  index: number | null;
  changeCircles: boolean;
  isDone: boolean;
  circlePosition: CirclePosition | null;
}

const processInitialState: IProcess = { index: null, changeCircles: false, isDone: false, circlePosition: null };

export const ListPage: React.FC = () => {
  const { current: linkedList }= useRef<ILinkedList<string>>(new LinkedList(randomStringArr({ min: 2, max: 5 }, { min: 0, max: 100 })));
  const [ inputValues, setInputValues ] = useState<IInputValues>({ value: NOT_STATED, index: NOT_STATED });
  const [ process, setProcess ] = useState<IProcess>(processInitialState);
  const [ circles, setCircles ] = useState<Array<string>>(linkedList.toArray());
  const [ loader, setLoader ] = useState<string>('')

  const isAddDisabled = circles.length > 8 || inputValues.value === '' || process.index !== null;
  const isRemoveDisabled = circles.length < 1 || process.index !== null;
  const isIndexManipulationDisabled = inputValues.index === '' || inputValues.index < 0 || inputValues.index >= circles.length;
  const addCircle = <Circle letter={inputValues.value} state={ElementStates.Changing} isSmall={true} />

  const changeValueInput = (e: FormEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, value: e.currentTarget.value });
  }

  const changeIndexInput = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    try {
      if (value === NOT_STATED) {
        setInputValues({ ...inputValues, index: NOT_STATED });
      } else {
        setInputValues({ ...inputValues, index: Number(value) });
      }
    } catch (err) {
      return;
    }
  }

  const updateCircles = () => {
    setCircles(linkedList.toArray());
  }

  const clearValues = () => {
    setInputValues({ value: NOT_STATED, index: NOT_STATED });
  }

  const activateLoader = (e: FormEvent<HTMLButtonElement>) => {
    setLoader(e.currentTarget.name);
  }

  const addToHead = async (e: FormEvent<HTMLButtonElement>) => {
    activateLoader(e);
    setProcess({ index: 0, changeCircles: false, isDone: false, circlePosition: CirclePosition.TOP });
    await setShortDelay();
    linkedList.prepend(inputValues.value);
    setProcess({ index: 0, changeCircles: false, isDone: true, circlePosition: null });
    updateCircles();
    await setShortDelay();
    setProcess({ ...processInitialState });
    clearValues();
  }

  const addToTail = async (e: FormEvent<HTMLButtonElement>) => {
    activateLoader(e);
    setProcess({ index: circles.length - 1, changeCircles: false, isDone: false, circlePosition: CirclePosition.TOP });
    await setShortDelay();
    linkedList.append(inputValues.value);
    setProcess({ index: circles.length, changeCircles: false, isDone: true, circlePosition: null });
    updateCircles();
    await setShortDelay();
    setProcess({ ...processInitialState });
    clearValues();
  }

  const removeHead = async (e: FormEvent<HTMLButtonElement>) => {
    activateLoader(e);
    setProcess({ index: 0, changeCircles: false, isDone: false, circlePosition: CirclePosition.BOTTOM });
    await setShortDelay();
    linkedList.deleteHead();
    updateCircles();
    setProcess({ ...processInitialState });
  }

  const removeTail = async (e: FormEvent<HTMLButtonElement>) => {
    activateLoader(e);
    setProcess({ index: circles.length - 1, changeCircles: false, isDone: false, circlePosition: CirclePosition.BOTTOM });
    await setShortDelay();
    linkedList.deleteTail();
    updateCircles();
    setProcess({ ...processInitialState });
  }

  const addByIndex = async (e: FormEvent<HTMLButtonElement>) => {
    activateLoader(e);
    if (inputValues.value !== NOT_STATED && inputValues.index !== NOT_STATED) {
      let counter = 0;
      for (let i = 0; i <= inputValues.index; i++) {
        setProcess({ index: i, changeCircles: true, isDone: false, circlePosition: CirclePosition.TOP });
        await setShortDelay();
        counter++;
      }
      setProcess({ index: counter - 1, changeCircles: false, isDone: true, circlePosition: null });
      linkedList.addByIndex(inputValues.value, inputValues.index);
      updateCircles();
      await setShortDelay();
      setProcess({ ...processInitialState });
      clearValues();
    }
  }

  const deleteByIndex = async (e: FormEvent<HTMLButtonElement>) => {
    activateLoader(e);
    if (inputValues.index !== NOT_STATED) {
      let counter = 0;
      for (let i = 0; i <= inputValues.index; i++) {
        setProcess({ index: i, changeCircles: true, isDone: false, circlePosition: null });
        await setShortDelay();
        counter++;
      }
      setProcess({ index: counter - 1, changeCircles: true, isDone: false, circlePosition: CirclePosition.BOTTOM });
      await setShortDelay();
      linkedList.deleteByIndex(inputValues.index);
      updateCircles();
      setProcess({ ...processInitialState });
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  useEffect(() => {
    process.index === null && setLoader('');
  }, [process])

  return (
    <SolutionLayout title="Связный список">

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type={'text'}
          maxLength={4}
          isLimitText
          name={'value'}
          onChange={changeValueInput}
          value={inputValues.value}
          placeholder={'Введите значение'}
          disabled={process.index !== null}
        />
        <Button
          text={'Добавить в head'}
          onClick={addToHead}
          disabled={isAddDisabled}
          extraClass={styles.button}
          name={'addToHead'}
          isLoader={loader === 'addToHead'}
        />
        <Button
          text={'Добавить в tail'}
          onClick={addToTail}
          disabled={isAddDisabled}
          extraClass={styles.button}
          name={'addToTail'}
          isLoader={loader === 'addToTail'}
        />
        <Button
          text={'Удалить из head'}
          onClick={removeHead}
          disabled={isRemoveDisabled}
          extraClass={styles.button}
          name={'removeFromHead'}
          isLoader={loader === 'removeFromHead'}
        />
        <Button
          text={'Удалить из tail'}
          onClick={removeTail}
          disabled={isRemoveDisabled}
          extraClass={styles.button}
          name={'removeFromTail'}
          isLoader={loader === 'removeFromTail'}
        />
        <Input
          type={'number'}
          max={20}
          name={'index'}
          onChange={changeIndexInput}
          value={inputValues.index}
          placeholder={'Введите индекс'}
          disabled={process.index !== null}
        />
        <Button
          text={'Добавить по индексу'}
          onClick={addByIndex}
          disabled={isAddDisabled || isIndexManipulationDisabled}
          extraClass={styles.buttonLarge}
          name={'addByIndex'}
          isLoader={loader === 'addByIndex'}
        />
        <Button
          text={'Удалить по индексу'}
          onClick={deleteByIndex}
          disabled={isRemoveDisabled || isIndexManipulationDisabled}
          extraClass={styles.buttonLarge}
          name={'removeByIndex'}
          isLoader={loader === 'removeByIndex'}
        />
      </form>

      {circles ?
        <div className={styles.canvas}>
          {circles.map((circle, index) =>
            <div className={styles.circleContainer} key={nanoid()}>
              <Circle
                letter={process.circlePosition === CirclePosition.BOTTOM && process.index === index ? '' : circle}
                index={index}
                head={process.circlePosition === CirclePosition.TOP && process.index === index ? addCircle
                  : index === 0 ? HEAD : ''}
                tail={process.circlePosition === CirclePosition.BOTTOM && process.index === index ?
                  <Circle
                    letter={circle}
                    state={ElementStates.Changing}
                    isSmall={true}
                  />
                  : index === circles.length - 1 ? TAIL : ''}
                state={process.index && process.index > index && process.changeCircles ? ElementStates.Changing
                  : process.isDone && process.index === index ? ElementStates.Modified : ElementStates.Default}
              />
              {index !== circles.length - 1 ? <ArrowIcon /> : <></>}
            </div>
          )}
        </div>
        : <></>}

    </SolutionLayout>
  );
};
