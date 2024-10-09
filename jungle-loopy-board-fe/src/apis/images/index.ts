export const getRandomImage = async (): Promise<string> => {
  const result = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await result.json();
  return data[0].url;
}