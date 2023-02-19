// colors
const green = "rgb(71, 155, 9)";
const greener = "rgb(51, 107, 11)";
const grey = "rgb(221,221,221)";
const greyTrans = "rgba(221,221,221,.5)";

const families = {
  label: "'Roboto Condensed', sans-serif",
  content: "'Righteous', cursive",
  header: "'Lemonada', cursive",
};

const tags = {
  select: {
    bg: {
      default: greyTrans,
      hover: grey,
    },
  },
  exit: {
    color: {
      default: green,
      hover: greener,
    },
  },
};

export { families, tags };
