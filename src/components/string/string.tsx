import React, { FormEvent, useState } from "react";
import styles from "./string.module.css";
import { nanoid } from "nanoid";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates, IElement } from "../../types/element";
import { NOT_STATED } from "../../constants/not-stated";
import { reorderString } from "./string.utils";

export const StringComponent: React.FC = () => {
  const [ inputValue, setInputValue ] = useState<string>(NOT_STATED);
  const [ circles, setCircles ] = useState<Array<IElement<string>>>([]);
  const [ isReordering, setIsReordering ] = useState(false);

  const changeInput = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = inputValue.split('').map(symbol => ({ element: symbol, state: ElementStates.Default }));

    setIsReordering(true)
    await reorderString(items, setCircles);
    setIsReordering(false)
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type={'text'} maxLength={11} isLimitText onChange={changeInput} value={inputValue} disabled={isReordering} />
        <Button
          type={'submit'}
          text={'Развернуть'}
          disabled={inputValue.length < 1}
          isLoader={isReordering}
          linkedList={'small'} />
      </form>
      {circles ?
        <div className={styles.canvas}>
          {circles.map(circle => <Circle letter={circle.element} key={nanoid()} state={circle.state} />)}
        </div>
        : <></>
      }
    </SolutionLayout>
  );
};
