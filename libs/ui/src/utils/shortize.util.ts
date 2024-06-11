export const shortize = (text: string, start = 6, end = -4) => `${text.slice(0, start)}...${text.slice(end)}`;
export const shortizeStart = (text: string, start = 12) => `${text.slice(0, start)}...`;