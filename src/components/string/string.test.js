import { reorderString } from "./string.utils";
import { ElementStates } from "../../types/element";
import { useState as useStateMock } from 'react';


const evenArray = [
  {element: 'м', state: ElementStates.Default},
  {element: 'а', state: ElementStates.Default},
  {element: 'ш', state: ElementStates.Default},
  {element: 'и', state: ElementStates.Default},
  {element: 'н', state: ElementStates.Default},
  {element: 'а', state: ElementStates.Default}
]

const evenArrayResult = [
  {element: 'а', state: ElementStates.Modified},
  {element: 'н', state: ElementStates.Modified},
  {element: 'и', state: ElementStates.Modified},
  {element: 'ш', state: ElementStates.Modified},
  {element: 'а', state: ElementStates.Modified},
  {element: 'м', state: ElementStates.Modified}
]

const oddArray = [
  {element: 'к', state: ElementStates.Default},
  {element: 'о', state: ElementStates.Default},
  {element: 'ш', state: ElementStates.Default},
  {element: 'к', state: ElementStates.Default},
  {element: 'а', state: ElementStates.Default},
]

const oddArrayResult = [
  {element: 'а', state: ElementStates.Modified},
  {element: 'к', state: ElementStates.Modified},
  {element: 'ш', state: ElementStates.Modified},
  {element: 'о', state: ElementStates.Modified},
  {element: 'к', state: ElementStates.Modified},
]

const oneElementArray = [
  {element: 'я', state: ElementStates.Default},
]

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const setArray = jest.fn();
useStateMock.mockImplementation(init => [init, setArray]);

describe('Reverse string unit-tests', () => {
  it('Reverse string with even number of elements', async () => {
    await reorderString(evenArray, setArray);
    expect(setArray).toHaveBeenLastCalledWith(evenArrayResult)
  })

  it('Reverse string with odd number of elements', async () => {
    await reorderString(oddArray, setArray);
    expect(setArray).toHaveBeenLastCalledWith(oddArrayResult)
  })

  it('Reverse string with one element', async () => {
    await reorderString(oneElementArray, setArray);
    expect(setArray).toHaveBeenLastCalledWith(oneElementArray)
  })

  it('Reverse empty string', async () => {
    await reorderString([], setArray);
    expect(setArray).not.toBeCalled();
  })
});