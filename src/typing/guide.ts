import { ReactNode } from 'react';

export type Guide = {
  title: string;
  steps: GuideStep[];
};

export type GuideStep = {
  label: string;
  content?: ReactNode;
  optional?: boolean;
};
