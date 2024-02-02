<template>
  <div
    class="absolute -z-10 border-b-[10vw] border-l-[100vw] border-b-transparent border-l-indigo-900"
  ></div>
  <div v-if="error" class="text-red-500">
    {{ error }}
  </div>
  <main
    class="mx-auto grid max-w-[1200px] gap-12 p-8 grid-cols-[1fr] md:grid-cols-[1fr_1fr]"
  >
    <div>
      <h1 class="text-3xl font-bold text-white">Sortable List</h1>
      <template v-if="pending">
        <PostListSkeleton :count="5" />
      </template>
      <template v-else>
        <PostList :posts="posts" @action="onMove" />
      </template>
    </div>
    <ActionList :actions="actions" @travel="timeTravel" />
  </main>
</template>

<script setup lang="ts">
import PostList from "@/components/PostList.vue";
import PostListSkeleton from "@/components/PostListSkeleton.vue";
import ActionList from "@/components/ActionList.vue";
import { usePosts } from "@/composables/usePosts";

import { ref } from "vue";
import type { ActionType } from "@/components/types";
const actions = ref<ActionType[]>([]);
const [posts, pending, error] = usePosts();

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
