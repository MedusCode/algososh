import { ElementStates, IElement } from "../../types/element";
import { setNormalDelay } from "../../assets/functions/delay";
import { Dispatch, SetStateAction } from "react";

export const reorderString = async (items: Array<IElement<string>>, setArray: Dispatch<SetStateAction<Array<IElement<string>>>>) => {
  const middleCircleIndex = items.length / 2;

  for (let i = 0; i < middleCircleIndex; i++) {
    const rightIndex = items.length - 1 - i;

    if (i !== rightIndex) {
      items[i].state = ElementStates.Changing;
      items[rightIndex].state = ElementStates.Changing;
      setArray([ ...items ]);
      await setNormalDelay();
    }

    [items[i], items[rightIndex]] = [items[rightIndex], items[i]]
    items[i].state = ElementStates.Modified;
    items[rightIndex].state = ElementStates.Modified;
    setArray([ ...items ]);
  }
}