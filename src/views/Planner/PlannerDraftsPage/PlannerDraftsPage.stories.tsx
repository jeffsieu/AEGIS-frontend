import { ComponentStory } from '@storybook/react';
import { PlannerDraftsPageWithProps } from './PlannerDraftsPage';
import { Decorators } from '@utils/storybook/decorators';
import { iterateDates } from '@utils/helpers/schedule';
import dayjs from 'dayjs';

export default {
  title: 'Planner/Drafts Page',
  component: PlannerDraftsPageWithProps,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Decorators.dateLocalizationProvider,
    Decorators.plannerContainerDecorator,
  ],
};

const Template: ComponentStory<typeof PlannerDraftsPageWithProps> = (args) => (
  <PlannerDraftsPageWithProps {...args} />
);

const creationDates = {
  createdAt: '2020-01-01T00:00:00.000Z',
  updatedAt: '2020-01-01T00:00:00.000Z',
};

export const Default = Template.bind({});
Default.args = {
  drafts: [
    {
      month: '2022-01-01',
      isPublished: false,
      duties: [...iterateDates(new Date('2022-01-01'), new Date('2022-01-31'))]
        .map((date) => dayjs(date).format('YYYY-MM-DD'))
        .flatMap((date, index) => [
          {
            roleId: 1,
            date: date,
          },
          ...(index % 2 === 0
            ? [
                {
                  roleId: 2,
                  date: date,
                },
              ]
            : []),
          ...(index % 3 === 0
            ? [
                {
                  roleId: 3,
                  date: date,
                },
              ]
            : []),
        ]),
    },
  ],
  roles: [
    {
      id: 1,
      name: 'A1',
    },
    {
      id: 2,
      name: 'A2',
    },
    {
      id: 3,
      name: 'A3',
    },
  ].map((role) => ({ ...role, ...creationDates })),
};
