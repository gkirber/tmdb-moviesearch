import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {handleErrors} from "@/shared/ui/ErrorState/handleErrors.tsx"


const TMDB_BASE_URL = "https://api.themoviedb.org/3"


export const baseApi = createApi({
  reducerPath: "tmdbApi",
  tagTypes: ["Movies", "Shared", "Search", "Filters", "Genres"],
  keepUnusedDataFor: 5,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: TMDB_BASE_URL,
      prepareHeaders: (headers) => {
        if (import.meta.env.VITE_TMDB_AUTH_TOKEN) {
          headers.set("Authorization", `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`)
        }
        headers.set("Content-Type", "application/json;charset=utf-8")
        return headers
      },
    })(args, api, extraOptions)

    if (result.error) {
      handleErrors(result.error)
    }

    return result
  },
  endpoints: () => ({}),
})
