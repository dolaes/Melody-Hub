interface Options {
  apiKey: string;
  title: string;
  artist: string;
}

export const checkOptions = (options: Options): void => {
  const { apiKey, title, artist } = options;
  if (!apiKey) throw new Error("apiKey property is missing from options");
  if (!title) throw new Error("title property is missing from options");
  if (!artist) throw new Error("artist property is missing from options");
};

export const getTitle = (title: string, artist: string): string => {
  return `${title} ${artist}`
    .toLowerCase()
    .replace(/ *\([^)]*\) */g, "") // Removes anything in parentheses
    .replace(/ *\[[^\]]*]/g, "") // Removes anything in square brackets
    .replace(/feat\.|ft\./g, "") // Removes 'feat.' or 'ft.'
    .replace(/\s+/g, " ") // Collapses multiple spaces into one
    .trim(); // Removes leading and trailing whitespace
};
