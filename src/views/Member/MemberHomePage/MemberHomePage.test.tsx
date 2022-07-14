import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { renderWithProviders } from '@tests/redux-render-hook';
import { renderHook, screen, waitFor } from '@testing-library/react';
import ThisMonthSchedule from '@views/Shared/HomePage/ThisMonthSchedule';
import MemberHomePage from './MemberHomePage';
import { createMockScheduleItems } from '@utils/mock-data/schedule';
import { MEMBERS, ROLES } from '@utils/mock-data/backend';
import { BACKEND_URL } from '@services/backend/base';
enableFetchMocks();

beforeEach((): void => {
  fetchMock.doMock();
});

it('should render the latest month schedule', async () => {
  const { result } = renderHook(() => MemberHomePage());
  expect(result.current.props.children.type.name).toBe('ThisMonthSchedule');
});

test('working schedule component', async () => {
  const mockSchedule = createMockScheduleItems(
    new Date('2022-07-01'),
    new Date('2022-07-30'),
    ROLES
  );

  fetchMock.mockResponse((req) => {
    switch (req.url) {
      case `${BACKEND_URL}/roleInstances`:
        return new Promise((res) => res(JSON.stringify(ROLES)));
      case `${BACKEND_URL}/members?includeRoles=true`:
        return new Promise((res) => res(JSON.stringify(MEMBERS)));
      default:
        return new Promise((res) =>
          res(JSON.stringify({ month: '2022-07', duties: mockSchedule }))
        );
    }
  });

  renderWithProviders(<ThisMonthSchedule showDraft={true} />);
  await waitFor(() => expect(screen.getByText('Jul 2022')).toBeInTheDocument());
});
