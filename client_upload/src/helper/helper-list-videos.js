import { queryClient } from '../main';

export const reloadDataQuery = (key) => {
  queryClient.invalidateQueries({ queryKey: [key] });
};
