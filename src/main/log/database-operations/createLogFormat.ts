import { Result } from "../types";

export const createLogFormat = (
  date: string,
  result: Result,
  message: string
): string => {
  return `${date} ${result} ${message}\n`;
};
