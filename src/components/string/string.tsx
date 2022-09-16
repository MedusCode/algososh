import React, { FormEvent, useState } from "react";
import styles from "./string.module.css";
import { nanoid } from "nanoid";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setNormalDelay } from "../../assets/functions/delay";
import { ElementStates, IElement } from "../../types/element";

export const StringComponent: React.FC = () => {
  const [ inputValue, setInputValue ] = useState<string>('');
  const [ circles, setCircles ] = useState<Array<IElement<string>>>([]);
  const [ isReordering, setIsReordering ] = useState<boolean>(false);

  const changeInput = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const reorderString = async () => {
    const symbols = inputValue.split('').map(symbol => ({ element: symbol, state: ElementStates.Default }));
    const middleCircleIndex = symbols.length / 2;

    for (let i = 0; i < middleCircleIndex; i++) {
      const rightIndex = symbols.length - 1 - i;

      if (i !== rightIndex) {
        symbols[i].state = ElementStates.Changing;
        symbols[rightIndex].state = ElementStates.Changing;
        setCircles([ ...symbols ]);
        await setNormalDelay();
      }

      let temp = symbols[i];
      symbols[i] = symbols[rightIndex];
      symbols[rightIndex] = temp;
      symbols[i].state = ElementStates.Modified;
      symbols[rightIndex].state = ElementStates.Modified;
      setCircles([ ...symbols ]);
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsReordering(true)
    await reorderString();
    setIsReordering(false)
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type={'text'} maxLength={11} isLimitText={true} onChange={changeInput} value={inputValue} />
        <Button type={'submit'} text={'Развернуть'} disabled={inputValue.length < 1} isLoader={isReordering} />
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
