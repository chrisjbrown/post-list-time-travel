import { ref } from "vue";
import type { Ref } from "vue";
import type { PostType } from "../components/types";

export function usePosts(): [Ref<PostType[]>, Ref<string | null>] {
  const posts = ref<PostType[]>([]);
  const error = ref<string | null>(null);

  async function getPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const allPosts = (await response.json()) as unknown;

    if (!Array.isArray(allPosts)) {
      error.value = "Error: response not of type array";
      return [posts, error];
    }

    posts.value = allPosts.slice(0, 5).map((post) => {
      return {
        id: post.id,
      };
    });
  }
  getPosts();

  return [posts, error];
}
