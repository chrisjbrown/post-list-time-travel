import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";
import ActionList from "@/components/ActionList.vue";

const actions = [
  {
    id: "abc",
    postId: 1,
    from: 0,
    to: 1,
  },
  {
    id: "def",
    postId: 3,
    from: 2,
    to: 1,
  },
];

describe("ActionList", () => {
  it("Renders with empty action list", () => {
    const wrapper = mount(ActionList, {
      props: {
        actions: [],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("Renders with 2 actions", () => {
    const wrapper = mount(ActionList, {
      props: {
        actions,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("emits travel event on click", () => {
    const wrapper = mount(ActionList, {
      props: {
        actions,
      },
    });
    const timeTravelBtn = wrapper.findAll('[data-testid^="time-travel-"]');
    timeTravelBtn[1].trigger("click");
    expect(wrapper.emitted("travel")?.[0]).toEqual([1]);
  });
});
