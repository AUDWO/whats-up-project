const paddingDirection = {
  t: "padding-top",
  l: "padding-left",
  b: "padding-bottom",
  r: "padding-right",
};

const paddingDynamic = (props) => {
  let paddingValue = ``;

  for (const key in props) {
    if (paddingDirection[key]) {
      paddingValue += `
        ${paddingDirection[key]} : ${props[key]}px;
        `;
    }
  }

  return paddingValue;
};

export default paddingDynamic;
