import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from '@/lib/axios'
import { useSession } from 'next-auth/react'

export function useRequestProcessor() {
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  function query(key: any, queryFunction: any, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  function mutate(key: any, mutationFunction: any, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  }

  function fetchCategories() {
    return axios.get('/post-categories', {
      headers: {
        Authorization: `Bearer ${session?.jwt}`
      }
    });
  }

  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      return response.data;
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      throw new Error(error.message);
    }
  };

  return { query, mutate, getCategories };
}