import { Direction } from "../../types/direction";
import { setShortDelay } from "../../assets/functions/delay";
import { Dispatch, SetStateAction } from "react";
import { IChangingIndexes, TModifiedIndexes } from "./sorting-page";

export const bubbleSort = async (
  array: Array<number>,
  direction: Direction,
  setArray: Dispatch<SetStateAction<Array<number>>>,
  setChangingIndexes: Dispatch<SetStateAction<IChangingIndexes>>,
  setModifiedIndexes: Dispatch<SetStateAction<TModifiedIndexes>>
) => {
  const done: Array<number> = [];
  const result = [...array];

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

export const selectionSort = async (
  array: Array<number>,
  direction: Direction,
  setArray: Dispatch<SetStateAction<Array<number>>>,
  setChangingIndexes: Dispatch<SetStateAction<IChangingIndexes>>,
  setModifiedIndexes: Dispatch<SetStateAction<TModifiedIndexes>>
) => {
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