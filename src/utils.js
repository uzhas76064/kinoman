const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomFloat = () => {
  const randomFloat = (Math.random() * 10).toFixed(1);
  return parseFloat(randomFloat);
};

const generateRandomIndex = (dataList) =>  getRandomInteger(0, dataList.length - 1);

const generateAmountStrings = (list) => {
  const numberOfElements = getRandomInteger(1, 4);

  // Используем Set для хранения уникальных жанров
  const selectedElements = new Set(
    Array.from({ length: numberOfElements }, () => list[generateRandomIndex(list)])
  );

  // Используем for...of для добавления жанров, если их меньше, чем нужно
  for (const listElement of list) {
    if (selectedElements.size < numberOfElements) {
      selectedElements.add(listElement);
    } else {
      break;
    }
  }

  return Array.from(selectedElements);
};

export {getRandomInteger, generateRandomFloat, generateRandomIndex, generateAmountStrings};
