import { baseApi } from './base';
import { membersApi } from './members';
import { rolesApi } from './roles';
import { schedulesApi } from './schedules';
import { requestsApi } from './requests';

export * from './members';
export * from './roles';
export * from './schedules';
export * from './requests';
export { useClearDataMutation } from './base';

type BackendApi = typeof baseApi &
  typeof membersApi &
  typeof rolesApi &
  typeof schedulesApi &
  typeof requestsApi;

export const backendApi: BackendApi = baseApi as BackendApi;
