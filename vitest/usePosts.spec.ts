import { expect, describe, it, vi } from "vitest";
import { usePosts } from "@/composables/usePosts";

const posts = [...Array(5).keys()].map((id) => ({ id: id + 1 }));

describe("usePosts", () => {
  const mockFetch = vi.spyOn(global, "fetch");
  it("usePosts returns array of posts", async () => {
    mockFetch.mockReturnValue({
      json: () => new Promise((resolve) => resolve(posts)),
    });
    const [newPosts, pending, error] = usePosts();
    await new Promise(process.nextTick);
    expect(error.value).toEqual(null);
    expect(pending.value).toEqual(false);
    expect(newPosts.value).toEqual(posts);
  });
  it("usePosts returns pending true", async () => {
    mockFetch.mockReturnValue({
      json: () => new Promise((resolve) => resolve(posts)),
    });
    const [newPosts, pending, error] = usePosts();
    expect(error.value).toEqual(null);
    expect(pending.value).toEqual(true);
    expect(newPosts.value).toEqual([]);
  });
  it("usePosts throws error if response is not array", async () => {
    mockFetch.mockReturnValue({
      json: () => new Promise((resolve) => resolve("nada")),
    });

    const [newPosts, pending, error] = usePosts();
    await new Promise(process.nextTick);
    expect(error.value).toEqual("Error: response not of type array");
    expect(pending.value).toEqual(false);
    expect(newPosts.value).toEqual([]);
  });
});
