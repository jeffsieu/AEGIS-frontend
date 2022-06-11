import { baseApi } from './base';
import { membersApi } from './members';
import { rolesApi } from './roles';
import { schedulesApi } from './schedules';

export * from './members';
export * from './roles';
export * from './schedules';
export { useClearDataMutation } from './base';

type BackendApi = typeof baseApi &
  typeof membersApi &
  typeof rolesApi &
  typeof schedulesApi;

export const backendApi: BackendApi = baseApi as BackendApi;
