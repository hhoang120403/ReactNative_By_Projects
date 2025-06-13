// export const evaluateExpression = (nums: string[]) => {
//   const stack: number[] = [];
//   let currentNumber = 0;
//   let currentOperator = "+";

//   for (let i = 0; i <= nums.length; i++) {
//     if (nums.length === 0) return 0;

//     const char = nums[i];

//     // If the character is a number
//     if (!isNaN(Number(char))) {
//       currentNumber = parseFloat(char);
//     }

//     if (isNaN(Number(char)) || i === nums.length) {
//       switch (currentOperator) {
//         case "+":
//           stack.push(currentNumber);
//           break;
//         case "-":
//           stack.push(-currentNumber);
//           break;
//         case "*":
//           const multiplication = (stack.pop() || 1) * currentNumber;
//           stack.push(multiplication);
//           break;
//         case "/":
//           const division = (stack.pop() || 1) / currentNumber;
//           stack.push(division);
//           break;
//       }

//       currentOperator = char;
//       currentNumber = 0;
//     }
//   }

//   return stack.reduce((acc, currentValue) => (acc += currentValue), 0);
// };

export const evaluateExpression = (nums: string[]) => {
  if (nums.length === 0) return 0;

  let result = parseFloat(nums[0]);

  for (let i = 1; i < nums.length; i += 2) {
    const operator = nums[i];
    const nextNumber = parseFloat(nums[i + 1]);

    switch (operator) {
      case "+":
        result += nextNumber;
        break;
      case "-":
        result -= nextNumber;
        break;
      case "*":
        result *= nextNumber;
        break;
      case "/":
        result /= nextNumber;
        break;
      default:
        break;
    }
  }

  return result;
};
