import dayjs from 'dayjs';
import { Backend } from '@typing/backend';
import { baseApi } from './base';

type UpdateMemberArgs = {
  member: Backend.Entry<Backend.Member>;
};

type UpdateMemberRolesArgs = {
  memberId: number;
  roleNames: string[];
};

export const membersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query<
      Backend.Entry<Backend.Member & { roles: Backend.Role[] }>[],
      void
    >({
      query: () => ({
        url: 'members',
        params: {
          includeRoles: true,
        },
      }),
      providesTags: (result) => [
        ...(result ?? []).map(({ id }) => ({
          type: 'Members' as const,
          id: id,
        })),
        { type: 'Members', id: 'LIST' },
      ],
    }),
    getMemberAvailabilitiesForMonth: builder.query<
      Backend.Entry<Backend.MemberWithAvailability>[],
      Date
    >({
      query: (month) => ({
        url: `members/availability/${dayjs(month).format('YYYY-MM-DD')}`,
      }),
      providesTags: (result) => [
        ...(result ?? []).map(({ id }) => ({
          type: 'Members' as const,
          id: id,
        })),
        { type: 'Members', id: 'LIST' },
      ],
    }),
    addMember: builder.mutation<number, Backend.Member>({
      query: (member) => ({
        url: 'members',
        method: 'POST',
        body: member,
      }),
      invalidatesTags: [{ type: 'Members', id: 'LIST' }],
    }),
    updateMember: builder.mutation<void, UpdateMemberArgs>({
      query: ({ member }) => ({
        url: `members/${member.id}`,
        method: 'PUT',
        body: member,
      }),
      invalidatesTags: (result, error, { member }) => [
        { type: 'Members', id: member.id },
      ],
    }),
    updateMemberRoles: builder.mutation<void, UpdateMemberRolesArgs>({
      query: ({ memberId, roleNames }) => ({
        url: `members/${memberId}/roles`,
        method: 'PUT',
        body: roleNames,
      }),
      invalidatesTags: (result, error, { memberId }) => [
        { type: 'Members', id: memberId },
      ],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useAddMemberMutation,
  useGetMemberAvailabilitiesForMonthQuery,
  useUpdateMemberMutation,
  useUpdateMemberRolesMutation,
} = membersApi;
