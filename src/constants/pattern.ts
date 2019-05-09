export const Pattern = {
  STYLE: /<style\s+.*lang="scss"\s*.*>([\S\s]+)<\/style>/,
  COLOR: /(#([\da-z]{6}|[\da-z]{3})|rgb\s*\((\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\s*,?){3}\s*\))/ig,
  VAR_2_CONSTS: /\$[\w-]+\s*:\s*(#([\da-z]{6}|[\da-z]{3})|rgb\s*\((\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\s*,?){3}\s*\))\s*;/g,
};
