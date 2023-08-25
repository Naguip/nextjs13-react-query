"use client";

import { GetUsers, User } from "../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export default function ListUsers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const page = searchParams.get("page") ?? 1;
  const perPage = searchParams.get("per_page") ?? 3;

  const offset = (Number(page) - 1) * Number(perPage);

  async function getUsers(perPage: string | number, offset: string | number) {
    return (await fetch(
      `https://api.slingacademy.com/v1/sample-data/users?limit=${perPage}&offset=${offset}`,
      { cache: "no-cache" }
    ).then((res) => res.json())) as GetUsers;
  }

  // https://tanstack.com/query/v4/docs/react/reference/useQuery
  const { isLoading, isError, isPreviousData, data, error } =
    useQuery<GetUsers>({
      // TanStack Query manages query caching for you based on query keys
      queryKey: ["users", String(page), String(perPage)],
      queryFn: () => getUsers(perPage, offset),
      // suspense: true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      // refetchOnMount: true,
      // staleTime: 10 * 1000,
      refetchInterval: 5 * 1000,
      // cacheTime: 5 * 60 * 1000,
    });

  // if (isLoading || isPreviousData) {
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError && error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => {
            router.push(`?page=${Number(page) - 1}&per_page=${perPage}`);
          }}
          disabled={isPreviousData || Number(page) === 1}
        >
          Previous
        </button>
        <span style={{ marginInline: ".5rem" }}>Page: {page}</span>
        <button
          onMouseEnter={() =>
            queryClient.prefetchQuery({
              queryKey: ["users", String(Number(page) + 1), perPage],
              queryFn: () => getUsers(perPage, Number(page) * Number(perPage)),
              staleTime: 10000,
            })
          }
          onClick={() => {
            router.push(`?page=${Number(page) + 1}&per_page=${perPage}`);
          }}
          disabled={
            isPreviousData || data?.total_users === offset + Number(perPage)
          }
        >
          Next
        </button>
      </div>
      <div style={{ display: "flex", flexFlow: "row wrap", gap: ".5rem" }}>
        {data?.users &&
          data.users.length > 0 &&
          data.users.map(
            ({ id, first_name, last_name, email, job, country }: User) => (
              <div
                key={id}
                style={{
                  background: "ghostwhite",
                  borderRadius: ".5rem",
                  padding: "1rem",
                  border: "1px solid lightgray",
                }}
              >
                <h1>
                  {first_name} {last_name}
                </h1>
                <hr />
                <h3>{email}</h3>
                <p>{country}</p>
                <p>{job}</p>
              </div>
            )
          )}
      </div>
    </div>
  );
}
