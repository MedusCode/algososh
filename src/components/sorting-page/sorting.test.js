import { useState as useStateMock } from "react";
import { bubbleSort, selectionSort } from "./sorting.utils";
import { Direction } from "../../types/direction";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const setArray = jest.fn();
const setChangingIndexes = jest.fn();
const setModifiedIndexes = jest.fn();
useStateMock.mockImplementation(init => [init, setArray]);
useStateMock.mockImplementation(init => [init, setChangingIndexes]);
useStateMock.mockImplementation(init => [init, setModifiedIndexes]);

describe('Bubble Sort unit-tests', () => {
  it('Sort array with several elements', async () => {
    await bubbleSort([1,3,2], Direction.Ascending, setArray, setChangingIndexes, setModifiedIndexes);
    expect(setArray).toHaveBeenLastCalledWith([1,2,3]);

    await bubbleSort([1,3,2], Direction.Descending, setArray, setChangingIndexes, setModifiedIndexes);
    expect(setArray).toHaveBeenLastCalledWith([3,2,1]);
  });

  it('Sort empty array', async () => {
    await bubbleSort([], Direction.Descending, setArray, setChangingIndexes, setModifiedIndexes);
    expect(setArray).toHaveBeenLastCalledWith([]);

    await bubbleSort([], Direction.Ascending, setArray, setChangingIndexes, setModifiedIndexes);
    expect(setArray).toHaveBeenLastCalledWith([]);
  });

  it('Sort array with one element', async () => {
    await bubbleSort([1], Direction.Descending, setArray, setChangingIndexes, setModifiedIndexes)
    expect(setArray).toHaveBeenLastCalledWith([1]);

    await bubbleSort([1], Direction.Ascending, setArray, setChangingIndexes, setModifiedIndexes)
    expect(setArray).toHaveBeenLastCalledWith([1]);
  });
});

describe('Selection Sort unit-tests', () => {
  it('Sort array with several elements', async () => {
    await selectionSort([1,3,2], Direction.Ascending, setArray, setChangingIndexes, setModifiedIndexes);
    expect(setArray).toHaveBeenLastCalledWith([1,2,3]);

    await selectionSort([1,3,2], Direction.Descending, setArray, setChangingIndexes, setModifiedIndexes);
    expect(setArray).toHaveBeenLastCalledWith([3,2,1]);
  });

  it('Sort empty array', async () => {
    await selectionSort([], Direction.Descending, setArray, setChangingIndexes, setModifiedIndexes);
    expect(setArray).toHaveBeenLastCalledWith([]);

    await selectionSort([], Direction.Ascending, setArray, setChangingIndexes, setModifiedIndexes);
    expect(setArray).toHaveBeenLastCalledWith([]);
  });

  it('Sort array with one element', async () => {
    await selectionSort([1], Direction.Descending, setArray, setChangingIndexes, setModifiedIndexes)
    expect(setArray).toHaveBeenLastCalledWith([1]);

    await selectionSort([1], Direction.Ascending, setArray, setChangingIndexes, setModifiedIndexes)
    expect(setArray).toHaveBeenLastCalledWith([1]);
  });
})