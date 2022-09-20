export const getFibonacciNumbers = (n: number): Array<number> => {
  const numbers: Array<number> = [ 1, 1 ];

  for (let i = 2; i <= n; i++) {
    numbers.push(numbers[i - 1] + numbers[i - 2]);
  }

  return numbers;
}