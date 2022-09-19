import React, { FormEvent, useState } from "react";
import styles from './sorting-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { randomArr } from "../../assets/functions/random-array";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element";
import { nanoid } from "nanoid";
import { bubbleSort, selectionSort } from "./sorting.utils";

enum TRadioButtonsValues {
  BUBBLE = 'bubble',
  SELECTION = 'selection'
}

export interface IChangingIndexes {
  firstIndex: number;
  secondIndex: number;
}

export type TModifiedIndexes = Array<Number | 'all'>;

export const SortingPage: React.FC = () => {
  const [ radioButtonsValue, setRadioButtonsValue ] = useState<TRadioButtonsValues>(TRadioButtonsValues.SELECTION);
  const [ array, setArray ] = useState<Array<number>>(randomArr({min: 3, max: 17}, {min: 0, max: 100}));
  const [ changingIndexes, setChangingIndexes ] = useState<IChangingIndexes>({firstIndex: -1, secondIndex: -1});
  const [ modifiedIndexes, setModifiedIndexes ] = useState<TModifiedIndexes>([])
  const [ inProcess, setInProcess ] = useState(false);
  const [ sortDirection, setSortDirection ] = useState<Direction | null>(null)

  const swapRadio = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'bubble') {
      setRadioButtonsValue(TRadioButtonsValues.BUBBLE)
    } else {
      setRadioButtonsValue(TRadioButtonsValues.SELECTION)
    }
  }

  const sort = async (direction: Direction) => {
    setInProcess(true);
    setSortDirection(direction);
    setModifiedIndexes([]);

    if (radioButtonsValue === TRadioButtonsValues.BUBBLE) {
      await bubbleSort(array, direction, setArray, setChangingIndexes, setModifiedIndexes);
    }
    else {
      await selectionSort(array, direction, setArray, setChangingIndexes, setModifiedIndexes);
    }

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
          checked={radioButtonsValue === TRadioButtonsValues.SELECTION}
          disabled={inProcess}
        />
        <RadioInput
          label={'Пузырёк'}
          name={'bubble'}
          extraClass={styles.radio}
          onChange={swapRadio}
          checked={radioButtonsValue === TRadioButtonsValues.BUBBLE}
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
