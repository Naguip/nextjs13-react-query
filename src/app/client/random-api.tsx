"use client";

import { RandomAPI, APIElement } from "../types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function getRandomAPI() {
  // {cache: "no-cache"}
  return (await fetch("https://api.publicapis.org/random", {
    cache: "no-cache",
  }).then((res) => res.json())) as RandomAPI;
}

// Specifying a longer staleTime means queries will not refetch their data as often. Stale queries are refetched automatically in the background when:
// ----------------
// New instances of the query mount
// The window is refocused
// The network is reconnected
// The query is optionally configured with a refetch interval

// Query results that have no more active instances of useQuery, useInfiniteQuery or query observers are labeled as "inactive" and remain in the cache in case they are used again at a later time.
// By default, "inactive" queries are garbage collected after 5 minutes.
// To change this, you can alter the default cacheTime for queries to something other than 1000 * 60 * 5 milliseconds.

// Queries that fail are silently retried 3 times, with exponential backoff delay before capturing and displaying an error to the UI.
// To change this, you can alter the default retry and retryDelay options for queries to something other than 3 and the default exponential backoff function.

export default function ListRandomAPI() {
  // https://tanstack.com/query/v4/docs/react/reference/useQuery
  const { isLoading, isError, data, error } = useQuery<RandomAPI>({
    // TanStack Query manages query caching for you based on query keys
    queryKey: ["client-random-api"],
    queryFn: () => getRandomAPI(),
    suspense: true,
    refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
    // refetchOnMount: true,
    staleTime: 5 * 1000,
    refetchInterval: 10 * 1000,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError && error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      {data?.entries &&
        data.entries.map(({ API, Description, Link }: APIElement) => (
          <div key={API}>
            <h1>{API}</h1>
            <hr />
            <h3>{Description}</h3>
            <p>{Link}</p>
          </div>
        ))}
    </div>
  );
}
