import { describe, expect, it, vi } from "vitest";
import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";

import App from "../App.vue";

const posts = [...Array(5).keys()].map((id) => ({ id: id + 1 }));

function getPosts(wrapper: VueWrapper): string[] {
  return wrapper
    .findAll('[data-testid^="post-"]')
    .map((post) => post.attributes("data-testid") || "");
}
function getActions(wrapper: VueWrapper): DOMWrapper<HTMLElement>[] {
  return wrapper.findAll('[data-testid^="action-"]');
}

describe("App", () => {
  const mockFetch = vi.spyOn(global, "fetch");
  mockFetch.mockReturnValue({
    json: () => new Promise((resolve) => resolve(posts)),
  });
  it("Consumes usePosts and renders", async () => {
    const wrapper = mount(App);

    await new Promise(process.nextTick);
    expect(wrapper.html()).toMatchSnapshot();
  });
  describe("Moves posts", async () => {
    const wrapper = mount(App);

    await new Promise(process.nextTick);
    await wrapper.find('[data-testid="icon-down"]').trigger("click");
    await wrapper.findAll('[data-testid="icon-up"]')?.[3].trigger("click");
    await wrapper.findAll('[data-testid="icon-up"]')?.[2].trigger("click");

    it("Order of posts are correct", async () => {
      expect(getPosts(wrapper)).toEqual([
        "post-2",
        "post-1",
        "post-5",
        "post-3",
        "post-4",
      ]);

      const actionList = wrapper.findAll('[data-testid^="action-"]');
      expect(actionList.length).toEqual(3);
    });
    it("Number of actions is correct", async () => {
      expect(getActions(wrapper).length).toEqual(3);
    });
    it("Time travel back one, results in correct order and actions", async () => {
      const timeTravelBtns = wrapper.findAll('[data-testid^="time-travel-"]');
      await timeTravelBtns[0].trigger("click");
      expect(getPosts(wrapper)).toEqual([
        "post-2",
        "post-1",
        "post-3",
        "post-5",
        "post-4",
      ]);

      expect(getActions(wrapper).length).toEqual(2);
    });
    it("Time travel back two, results in original order and no actions", async () => {
      const timeTravelBtns = wrapper.findAll('[data-testid^="time-travel-"]');
      await timeTravelBtns[1].trigger("click");
      expect(getPosts(wrapper)).toEqual([
        "post-1",
        "post-2",
        "post-3",
        "post-4",
        "post-5",
      ]);

      expect(getActions(wrapper).length).toEqual(0);
    });
  });
});
