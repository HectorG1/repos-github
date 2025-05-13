import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { Repository } from "./types";
import api from "../api/github"


async function fetchRepos(ctx: QueryFunctionContext) {
  let repos = [] as Repository[];
  let page = 1;
  let hasMore = ctx.queryKey[1];

  while (hasMore) {
    const { data } = await api.get<Repository[]>(`users/${ctx.queryKey[1]}/repos?per_page=100&page=${page}`);

    repos = repos.concat(data);
    hasMore = data.length === 100;
    page++;
  }

  return repos
}

export function useFetchRepositories(gitHubUser: string) {
  return useQuery({ queryKey: ['repos', gitHubUser], queryFn: fetchRepos })
}

