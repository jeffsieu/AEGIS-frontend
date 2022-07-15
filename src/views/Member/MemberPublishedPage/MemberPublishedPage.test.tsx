import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { renderWithProviders } from '@tests/redux-render-hook';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMockScheduleItems } from '@utils/mock-data/schedule';
import { MEMBERS, ROLES } from '@utils/mock-data/backend';
import { BACKEND_URL } from '@services/backend/base';
import MemberPublishedPage from './MemberPublishedPage';
enableFetchMocks();

beforeEach((): void => {
  fetchMock.doMock();
});

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Member Schedule Page', () => {
  test('test', async () => {
    render(<button onClick={() => console.log('test')}>Button</button>);
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button'));
  });

  test('should render the latest month schedule', async () => {
    const mockSchedule = createMockScheduleItems(
      new Date('2022-07-01'),
      new Date('2022-07-30'),
      ROLES
    );

    fetchMock.mockResponse((req) => {
      console.log(req.url);
      switch (req.url) {
        case `${BACKEND_URL}/roleInstances`:
          return new Promise((res) => res(JSON.stringify(ROLES)));
        case `${BACKEND_URL}/members?includeRoles=true`:
          return new Promise((res) => res(JSON.stringify(MEMBERS)));
        default:
          return new Promise((res) =>
            res(JSON.stringify([{ month: '2022-07', duties: mockSchedule }]))
          );
      }
    });

    renderWithProviders(<MemberPublishedPage />);

    await waitFor(() => {
      expect(screen.getByText('Jul 2022')).toBeInTheDocument();
      const button = screen.getByTestId('schedule-button');
      expect(button).toBeInTheDocument();
    });

    expect(fetchMock).toBeCalledTimes(3);
  });

  test('should goto published page when button clicked', async () => {
    const mockSchedule = createMockScheduleItems(
      new Date('2022-07-01'),
      new Date('2022-07-30'),
      ROLES
    );

    fetchMock.mockResponse((req) => {
      console.log(req.url);
      switch (req.url) {
        case `${BACKEND_URL}/roleInstances`:
          return new Promise((res) => res(JSON.stringify(ROLES)));
        case `${BACKEND_URL}/members?includeRoles=true`:
          return new Promise((res) => res(JSON.stringify(MEMBERS)));
        default:
          return new Promise((res) =>
            res(JSON.stringify([{ month: '2022-07', duties: mockSchedule }]))
          );
      }
    });

    renderWithProviders(<MemberPublishedPage />);

    await waitFor(() => {
      expect(screen.getByTestId('schedule-button')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('schedule-button'));

    //expect to navigate to 2022-07 since 2022-07 was given to the client
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/schedules/2022-07');
    });

    expect(fetchMock).toBeCalledTimes(3);
  });
});
