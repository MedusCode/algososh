interface IMinMax {
  min: number;
  max: number;
}

export const randomStringArr = (length: IMinMax, values: IMinMax): Array<string> => {
  const result = [];
  const randomLength = Math.floor(length.min + Math.random() * (length.max + 1 - length.min));

  for (let i = 0; i < randomLength; i++) {
    const randomValue = Math.floor(values.min + Math.random() * (values.max + 1 - values.min));
    result.push(`${randomValue}`);
  }

  return result;
}

export const randomArr = (length: IMinMax, values: IMinMax): Array<number> => {
  const result = [];
  const randomLength = Math.floor(length.min + Math.random() * (length.max + 1 - length.min));

  for (let i = 0; i < randomLength; i++) {
    result.push(Math.floor(values.min + Math.random() * (values.max + 1 - values.min)));
  }

  return result;
}