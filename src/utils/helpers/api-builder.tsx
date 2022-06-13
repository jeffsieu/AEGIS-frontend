import { CircularProgress } from '@mui/material';

type SuccessArgs<Q extends QueryResults> = {
  [K in keyof Q]: NonNullable<Q[K]['data']>;
};
type ErrorArgs<Q extends QueryResults> = {
  reasons: (keyof Q)[];
};

type ApiStateBuilder = () => JSX.Element;
type SuccessBuilder<Q extends QueryResults> = (
  args: SuccessArgs<Q>
) => ReturnType<ApiStateBuilder>;
type ErrorBuilder<Q extends QueryResults> = (
  args: ErrorArgs<Q>
) => ReturnType<ApiStateBuilder>;

type QueryResult<T> = {
  data?: T;
  isUninitialized: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
};
type QueryResults = Record<string, QueryResult<any>>;

type ApiBuilderArgs<Q extends QueryResults> = {
  queries: Q;
  onSuccess: SuccessBuilder<Q>;
  onLoading?: ApiStateBuilder;
  onError?: ErrorBuilder<Q>;
};

const defaultProps = {
  onLoading: () => <CircularProgress />,
  onError: () => <div>Something went wrong.</div>,
};

/**
 * Builds a component that depend on the given queries.
 * @param args
 * @returns
 */
function buildWithApiQueries<Q extends QueryResults>(args: ApiBuilderArgs<Q>) {
  const { queries, onSuccess, onLoading, onError } = args;
  const isSuccess = Object.values(queries).every((query) => query.isSuccess);
  const isError = Object.values(queries).some((query) => query.isError);

  if (isSuccess) {
    const props: SuccessArgs<Q> = Object.keys(queries).reduce(
      (acc, key) => ({
        ...acc,
        [key]: queries[key].data,
      }),
      {} as SuccessArgs<Q>
    );
    return onSuccess(props);
  } else if (isError) {
    const reasons: (keyof Q)[] = Object.keys(queries).reduce((acc, key) => {
      if (queries[key].isError) {
        acc.push(key);
      }
      return acc;
    }, [] as (keyof Q)[]);
    return (onError ?? defaultProps.onError)({ reasons });
  } else {
    return (onLoading ?? defaultProps.onLoading)();
  }
}

export { buildWithApiQueries };
