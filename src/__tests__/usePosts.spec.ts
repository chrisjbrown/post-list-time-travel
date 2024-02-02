import { expect, describe, it, vi } from "vitest";
import { usePosts } from "../composables/usePosts";

const posts = [...Array(5).keys()].map((id) => ({ id: id + 1 }));

describe("usePosts", () => {
  const mockFetch = vi.spyOn(global, "fetch");
  it("usePosts returns array of posts", async () => {
    mockFetch.mockReturnValue({
      json: () => new Promise((resolve) => resolve(posts)),
    });
    const [newPosts, _] = usePosts();
    await new Promise(process.nextTick);
    expect(newPosts.value).toEqual(posts);
  });
  it("usePosts throws error if response is not array", async () => {
    mockFetch.mockReturnValue({
      json: () => new Promise((resolve) => resolve("nada")),
    });

    const [_, error] = usePosts();
    await new Promise(process.nextTick);
    expect(error.value).toEqual("Error: response not of type array");
  });
});
