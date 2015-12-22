/*
 * Puts text in lower case.
 */
exports.lowerText = function(string) {
  return string.toLowerCase();
}

/*
 * Cleans the text removing a several characters
 */
exports.cleanText = function(text) {
  text = text.replace(/"/g, '');
  text = text.replace(/«/g, '');
  text = text.replace(/»/g, '');
  text = text.replace(/“/g, '');
  text = text.replace(/”/g, '');
  text = text.replace(/ - /g, '');
  // text = text.replace(/\'/g, '\\\'');
  text = text.replace(/,/g, '');
  text = text.replace(/;/g, '');
  text = text.replace(/:/g, '');
  return text;
}
