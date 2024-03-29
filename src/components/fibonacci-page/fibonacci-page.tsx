import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { setShortDelay } from "../../assets/functions/delay";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { TNotStated } from "../../types/not-stated";
import { NOT_STATED } from "../../constants/not-stated";
import { getFibonacciNumbers } from "./fibonacci.utils";

export const FibonacciPage: React.FC = () => {
  const [ inputValue, setInputValue ] = useState<number | TNotStated>(NOT_STATED);
  const [ circles, setCircles ] = useState<Array<number>>([]);
  const [ inProcess, setInProcess ] = useState(false);

  const changeInput = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    try {
      if (value === '') {
        setInputValue(NOT_STATED);
      } else {
        setInputValue(Number(value));
      }
    } catch (err) {
      return;
    }
  }

  const renderCircles = async (numbers: Array<number>) => {
    let shownNumbers: Array<number> = [];

    for (let i = 0; i < numbers.length; i++) {
      shownNumbers.push(numbers[i]);
      setCircles([ ...shownNumbers ]);
      await setShortDelay();
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof inputValue === 'number') {
      setInProcess(true)
      await renderCircles(getFibonacciNumbers(inputValue))
      setInProcess(false)
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input data-cy={'input'} type={'number'} max={19} isLimitText onChange={changeInput} value={inputValue} disabled={inProcess} />
        <Button
          type={'submit'}
          text={'Рассчитать'}
          disabled={inputValue < 1 || inputValue > 19}
          isLoader={inProcess}
          linkedList={'small'}
          data-cy={'submit'}
        />
      </form>
      {circles ?
        <div className={styles.canvas}>
          {circles.map((circle, index) =>
            <Circle
              letter={`${circle}`}
              key={nanoid()}
              index={index}
              extraClass={styles.circle}
            />)
          }
        </div>
        : <></>
      }
    </SolutionLayout>
  );
};
