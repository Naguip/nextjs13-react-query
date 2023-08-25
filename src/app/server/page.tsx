interface APIElement {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

const url = "https://api.publicapis.org/random";

async function getData() {
  // // Refetch data on server after 10 seconds
  // const res = await fetch(url, { next: { revalidate: 10 } });

  // // Always fetch new data
  // const res = await fetch(url, {
  //   cache: "no-cache",
  // });

  // // Only fetch the first time, then use cache
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Server() {
  let data = await getData();

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
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
    </main>
  );
}
