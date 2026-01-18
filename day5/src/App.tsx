import "./App.css";
import { useIsFetching, useQueries, useQuery } from "@tanstack/react-query";

type Post = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

function App() {
  const { isError, data, error } = useQuery({
    queryKey: ["topstories"],
    queryFn: (): Promise<string[]> =>
      fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then((res) => res)
        .then((res) => res.json()),
  });

  const topTen = data?.slice(0, 10);

  const stories = useQueries({
    queries: topTen
      ? topTen.map((storyId) => ({
          queryKey: ["topstories", storyId],
          queryFn: (): Promise<Post> =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
              .then((res) => res)
              .then((res) => res.json()),
        }))
      : [],
  });

  const isFetching = useIsFetching();
  if (isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <ul>
          {stories &&
            stories.map((story) => {
              return (
                <li key={story.data?.id}>
                  <a href={story.data?.url}>{story.data?.title}</a>
                </li>
              );
            })}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
