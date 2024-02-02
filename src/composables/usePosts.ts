import { ref } from "vue";
import type { Ref } from "vue";
import type { PostType } from "../components/types";

export function usePosts(): Ref<PostType[]> {
  const posts = ref<PostType[]>([]);

  async function getPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const allPosts = (await response.json()) as unknown;

    if (!Array.isArray(allPosts)) throw new Error("Array expected");

    posts.value = allPosts.slice(0, 5).map((post) => {
      return {
        id: post.id,
      };
    });
  }
  getPosts();

  return posts;
}
