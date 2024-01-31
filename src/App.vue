<template>
  <div
    class="absolute -z-10 border-b-[10vw] border-l-[100vw] border-b-transparent border-l-indigo-900"
  ></div>
  <div class="mx-auto grid max-w-[1200px] gap-12 p-8 grid-cols-[1fr_1fr]">
    <PostList :posts="posts" @action="onMove" />
    <ActionList :actions="actions" @travel="timeTravel" />
  </div>
</template>

<script setup lang="ts">
import PostList from "./components/PostList.vue";
import ActionList from "./components/ActionList.vue";

import { ref } from "vue";
import type { PostType, ActionType } from "./components/types";
const posts = ref<PostType[]>([]);
const actions = ref<ActionType[]>([]);

async function getPosts() {
  // could add more error handling here
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

/**
 * Move post and update actions
 * @param action ActionType
 */
function onMove(action: ActionType) {
  movePost(action.from, action.to);
  actions.value = [action, ...actions.value];
}

/**
 * Move post from to in actions array
 * @param from number - index of post to move
 * @param to number - index of where to move post to
 */
function movePost(from: number, to: number) {
  const postToMove = posts.value[from];
  posts.value.splice(from, 1);
  posts.value.splice(to, 0, postToMove);
}

/**
 * Move backwards through time based on number of jumps
 * @param jumps number of jumps to make
 */
function timeTravel(jumps: number) {
  for (let i = 0; i <= jumps; i++) {
    const nextAction = actions.value.shift();
    if (!nextAction) break;

    movePost(nextAction.to, nextAction.from);
  }
}
</script>
