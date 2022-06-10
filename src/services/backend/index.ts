import { baseApi } from './base';
import { membersApi } from './members';
import { rolesApi } from './roles';

export * from './members';
export * from './roles';
export { useClearDataMutation } from './base';

type BackendApi = typeof baseApi & typeof membersApi & typeof rolesApi;

export const backendApi: BackendApi = baseApi as BackendApi;
