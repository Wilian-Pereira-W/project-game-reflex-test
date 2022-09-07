import zeroLeft from './zeroLeft';

export const secondsToTime = (seconds: number): string => {
  const min = zeroLeft(seconds / 100 / 60);
  const sec = zeroLeft((seconds / 100) % 60);
  const cent = zeroLeft(seconds % 100);
  return `${min}:${sec}:${cent}`;
};
