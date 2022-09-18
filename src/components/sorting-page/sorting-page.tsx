import React, { FormEvent, useState } from "react";
import styles from './sorting-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { randomArr } from "../../assets/functions/random-array";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element";
import { setShortDelay } from "../../assets/functions/delay";
import { nanoid } from "nanoid";

type TRadioButtonsValues = 'bubble' | 'selection';

interface IChangingIndexes {
  firstIndex: number;
  secondIndex: number;
}

export const SortingPage: React.FC = () => {
  const [ radioButtonsValue, setRadioButtonsValue ] = useState<TRadioButtonsValues>('selection');
  const [ array, setArray ] = useState<Array<number>>(randomArr({min: 3, max: 17}, {min: 0, max: 100}));
  const [ changingIndexes, setChangingIndexes ] = useState<IChangingIndexes>({firstIndex: -1, secondIndex: -1});
  const [ modifiedIndexes, setModifiedIndexes ] = useState<Array<number | 'all'>>([])
  const [ inProcess, setInProcess ] = useState <boolean>(false);
  const [ sortDirection, setSortDirection ] = useState<Direction | null>(null)



  const swapRadio = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'bubble') {
      setRadioButtonsValue('bubble')
    } else {
      setRadioButtonsValue('selection')
    }
  }

  const bubbleSort = async (direction: Direction) => {
    const done: Array<number> = [];
    const result = [...array];

    setInProcess(true);
    for (let i = 0; i < result.length - 1; i++) {
      let wasSwap = false;
      for (let j = 0; j < result.length - i - 1; j++) {
        setChangingIndexes({firstIndex: j + 1, secondIndex: j})
        await setShortDelay();
        if (result[j] > result[j + 1] && direction === Direction.Ascending) {
          [result[j + 1], result[j]] = [result[j], result[j + 1]];
          setArray([...result]);
          wasSwap = true;
        } else if (result[j] < result[j + 1] && direction === Direction.Descending) {
          [result[j + 1], result[j]] = [result[j], result[j + 1]];
          setArray([...result]);
          wasSwap = true;
        }
      }
      done.push(result.length - 1 - i);
      setModifiedIndexes([...done]);
      if (!wasSwap) {
        setModifiedIndexes([...done, 'all'])
        return;
      }
    }

    setModifiedIndexes([...done, 0]);
    setArray(result);
  };

  const selectionSort = async (direction: Direction) => {
    const done: Array<number> = [];
    const result = [...array];

    for (let i = 0; i < result.length - 1; i++) {
      let selectedIndex = i;
      for (let j = i + 1; j < result.length; j++) {
        setChangingIndexes({firstIndex: selectedIndex, secondIndex: j})
        await setShortDelay();
        if (result[j] > result[selectedIndex] && direction === Direction.Descending) {
          selectedIndex = j;
          setChangingIndexes({firstIndex: selectedIndex, secondIndex: j})
        } else if (result[j] < result[selectedIndex] && direction === Direction.Ascending) {
          selectedIndex = j;
          setChangingIndexes({firstIndex: selectedIndex, secondIndex: j})
        }
      }
      [result[i], result[selectedIndex]] = [result[selectedIndex], result[i]];
      setArray([...result]);
      done.push(i);
      setModifiedIndexes([...done])
    }

    done.push(result.length - 1);
    setModifiedIndexes([...done]);
    setArray([...result]);
  };

  const sort = async (direction: Direction) => {
    setInProcess(true);
    setSortDirection(direction);
    setModifiedIndexes([]);

    if (radioButtonsValue === 'bubble') await bubbleSort(direction);
    else await selectionSort(direction);

    setInProcess(false)
}

  const changeArray = () => {
    setArray(randomArr({min: 3, max: 17}, {min: 0, max: 100}))
    setModifiedIndexes([]);
    setChangingIndexes({firstIndex: -1, secondIndex: -1});
  }


  return (
    <SolutionLayout title="Сортировка массива">

      <form className={styles.form}>
        <RadioInput
          label={'Выбор'}
          name={'selection'}
          extraClass={styles.radio}
          onChange={swapRadio}
          checked={radioButtonsValue === 'selection'}
          disabled={inProcess}
        />
        <RadioInput
          label={'Пузырёк'}
          name={'bubble'}
          extraClass={styles.radio}
          onChange={swapRadio}
          checked={radioButtonsValue === 'bubble'}
          disabled={inProcess}
        />
        <Button
          text={'По возрастанию'}
          sorting={Direction.Ascending}
          extraClass={styles.button}
          onClick={() => sort(Direction.Ascending)}
          disabled={inProcess}
          isLoader={sortDirection === Direction.Ascending && inProcess}
        />
        <Button
          text={'По убыванию'}
          sorting={Direction.Descending}
          extraClass={styles.button}
          onClick={() => sort(Direction.Descending)}
          disabled={inProcess}
          isLoader={sortDirection === Direction.Descending && inProcess}
        />
        <Button text={'Новый массив'} extraClass={styles.lastButton} onClick={changeArray} disabled={inProcess} />
      </form>

      <ul className={styles.canvas}>
        {array.map((value, index) =>
          <li key={nanoid()}>
            <Column
              index={value}
              state={modifiedIndexes.includes(index) || modifiedIndexes.includes('all') ? ElementStates.Modified
                : changingIndexes.firstIndex === index || changingIndexes.secondIndex === index ? ElementStates.Changing
                  : ElementStates.Default} />
          </li>)}
      </ul>
      
    </SolutionLayout>
  );
};
