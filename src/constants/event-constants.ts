import { IOptionNum } from '../types/IOptionNum';
import { IOptionStr } from '../types/IOptionStr';

export enum EventPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}

export const eventPriorityNumOptions: IOptionNum[] = [
  { id: 3, label: 'High' },
  { id: 2, label: 'Medium' },
  { id: 1, label: 'Low' },
];

export const eventPrioirtyLabels: { [key: number]: string } = {
  3: 'High',
  2: 'Medium',
  1: 'Low',
};

export const eventPriorityStrOptions: IOptionStr[] = [
  { id: '3', label: 'High' },
  { id: '2', label: 'Medium' },
  { id: '1', label: 'Low' },
];


export enum EventStatus {
  Open = 1,
  Closed = 2,
}

export const eventStatusNumOptions: IOptionNum[] = [
  { id: 1, label: 'Open' },
  { id: 2, label: 'Closed' },
];
