import basic from "./default";
import dark from "./dark";

const themes = {
  basic,
  dark,
};

export default function getTheme(theme) {
  return themes[theme];
}
