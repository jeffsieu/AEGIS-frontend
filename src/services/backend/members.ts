import { Backend } from '@typing/backend';
import { baseApi } from './base';

type UpdateMemberArgs = {
  callsign: string;
  member: Backend.Member;
};

type UpdateMemberRolesArgs = {
  callsign: string;
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
        ...(result ?? []).map(({ callsign }) => ({
          type: 'Members' as const,
          id: callsign,
        })),
        { type: 'Members', id: 'LIST' },
      ],
    }),
    getMemberAvailabilitiesForMonth: builder.query<
      Backend.Entry<Backend.MemberWithAvailability>[],
      string
    >({
      query: (month) => ({
        url: `members/availability/${month}`,
        params: {
          includeRoles: true,
        },
      }),
      providesTags: (result) => [
        ...(result ?? []).map(({ callsign }) => ({
          type: 'Members' as const,
          id: callsign,
        })),
        { type: 'Members', id: 'LIST' },
      ],
    }),
    addMember: builder.mutation<void, Backend.Member>({
      query: (member) => ({
        url: 'members',
        method: 'POST',
        body: member,
      }),
      invalidatesTags: [{ type: 'Members', id: 'LIST' }],
    }),
    updateMember: builder.mutation<void, UpdateMemberArgs>({
      query: ({ callsign, member }) => ({
        url: `members/${callsign}`,
        method: 'PUT',
        body: member,
      }),
      invalidatesTags: (result, error, { callsign }) => [
        { type: 'Members', id: callsign },
      ],
    }),
    updateMemberRoles: builder.mutation<void, UpdateMemberRolesArgs>({
      query: ({ callsign, roleNames }) => ({
        url: `members/${callsign}/roles`,
        method: 'PUT',
        body: roleNames,
      }),
      invalidatesTags: (result, error, { callsign }) => [
        { type: 'Members', id: callsign },
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
