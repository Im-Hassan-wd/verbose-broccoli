export const usePostReadTime = () => {
  const averageReadingSpeed = 200; // words per minute

  const calculateReadingTime = (text) => {
    // Remove leading and trailing white spaces
    const trimmedText = text.trim();

    // Split the text into an array of words using white spaces as the separator
    const words = trimmedText.split(/\s+/);
    const minutes = Math.ceil(words.length / averageReadingSpeed);
    return words.length < 50 ? `< ${minutes} min read` : `${minutes} min read`;
  };

  return { calculateReadingTime };
};
