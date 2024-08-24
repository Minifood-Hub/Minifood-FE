export const shortenText = (items: string, maxLength: number): string => {
  return items.length > maxLength ? `${items.slice(0, maxLength)}...` : items;
};
