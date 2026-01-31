export function capitalizeFirstLetter(string: string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatName(name: string): string {
  return name
    .split("-")
    .map((word) => {
      if (word.length === 0) return word;
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function formatGeneration(name: string): string {
  return name
    .split("-")
    .map((word) => {
      if (word === word.toLowerCase() && word.length <= 4) {
        return word.toUpperCase();
      }
       return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}
