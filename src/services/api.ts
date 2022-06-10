import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { getScheduleByMonth } from './getScheduleByMonthApi';


export type APIEndpointBuilder = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "api">;

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({baseUrl: "http://localhost:2000/"}), //TODO: probs wana use .env to store the base url
	endpoints: (builder) => ({
		getScheduleByMonth: getScheduleByMonth(builder)
	})
})

export const { useGetScheduleByMonthQuery } = api;