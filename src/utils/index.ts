
export const trimStrings = (value: string | any) => {
    if (typeof value === 'string') {
        return value.trim();
      }
      return value;
}