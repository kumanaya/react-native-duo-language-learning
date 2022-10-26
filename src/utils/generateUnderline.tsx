const generateUnderline = (length: number) => {
  var underline = '_';

  var i = length + 5;

  while (i--) {
    underline += '_';
  }

  return underline;
};

export default generateUnderline;
