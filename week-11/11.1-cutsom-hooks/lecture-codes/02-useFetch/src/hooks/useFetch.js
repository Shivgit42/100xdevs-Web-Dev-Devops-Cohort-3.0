import { useEffect } from "react";
import { useState } from "react";

export function usePostTitle() {
  const [post, setPost] = useState({});

  async function getPosts() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/2"
    );
    const json = await response.json();
    setPost(json);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return post.title;
}

export function useFetch(url) {
  const [finalData, setFinalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function getData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        if (isMounted) {
          setFinalData(json);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { finalData, loading, error };
}
