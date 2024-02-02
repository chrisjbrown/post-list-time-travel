import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";
import PostList from "../components/PostList.vue";

const posts = [...Array(5).keys()].map((id) => ({ id: id + 1 }));

describe("PostList", () => {
  it("Renders with correct order", () => {
    const wrapper = mount(PostList, {
      props: {
        posts,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("click down emits event", async () => {
    const wrapper = mount(PostList, {
      props: {
        posts,
      },
    });
    await wrapper.find('[data-testid="icon-down"]').trigger("click");

    const emittedAction: any = wrapper.emitted("action")?.[0];
    expect(emittedAction).toMatchObject([
      {
        from: 0,
        postId: 1,
        to: 1,
      },
    ]);
    expect(emittedAction?.[0].id).toBeTypeOf("string");
  });

  it("click up emits event", async () => {
    const wrapper = mount(PostList, {
      props: {
        posts,
      },
    });
    await wrapper.find('[data-testid="icon-up"]').trigger("click");

    const emittedAction: any = wrapper.emitted("action")?.[0];
    expect(emittedAction).toMatchObject([
      {
        from: 1,
        postId: 2,
        to: 0,
      },
    ]);
    expect(emittedAction?.[0].id).toBeTypeOf("string");
  });
});
