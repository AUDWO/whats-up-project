const marginDirection = {
  l: "margin-left",
  r: "margin-right",
  b: "margin-bottom",
  t: "margin-top",
};

const marginDynamic = (props) => {
  let marginValue = ``;

  for (const key in props) {
    if (marginDirection[key]) {
      marginValue += `
        ${marginDirection[key]} : ${props[key]}px;
        `;
    }
  }
  console.log(marginValue, "marginValue-1-1-1-1-1-1-1");

  return marginValue;
};

export default marginDynamic;
