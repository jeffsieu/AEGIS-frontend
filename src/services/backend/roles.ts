import { Backend } from '@typing/backend';
import { baseApi } from './base';

export const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<Backend.Entry<Backend.Role>[], void>({
      query: () => ({
        url: 'roles',
      }),
      providesTags: (result) => [
        ...(result ?? []).map(({ name }) => ({
          type: 'Roles' as const,
          id: name,
        })),
        { type: 'Roles', id: 'LIST' },
      ],
    }),
    getRoleInstances: builder.query<
      Backend.Entry<Backend.RoleInstance>[],
      void
    >({
      query: () => ({
        url: 'roleInstances',
      }),
      providesTags: (result) => [
        ...(result ?? []).map(({ id }) => ({
          type: 'RoleInstances' as const,
          id: id,
        })),
        { type: 'RoleInstances', id: 'LIST' },
      ],
    }),
    addRole: builder.mutation<
      void,
      Backend.Role & {
        roleInstances: Backend.RoleInstance[];
      }
    >({
      query: (role) => ({
        url: 'roles',
        method: 'POST',
        body: role,
      }),
      invalidatesTags: [{ type: 'Roles', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleInstancesQuery,
  useAddRoleMutation,
} = rolesApi;
