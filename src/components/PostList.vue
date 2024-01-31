<template>
  <div>
    <h1 class="text-3xl font-bold text-white">Sortable List</h1>
    <TransitionGroup name="list" tag="ul">
      <li v-for="(post, index) in posts" :key="post.id">
        <div
          class="flex h-16 p-4 bg-white rounded-md my-4 items-center shadow-lg"
        >
          <div>Post {{ post.id }}</div>
          <div class="ml-3">
            <IconUp
              v-if="index !== 0"
              @click="onUpAction(post.id, index)"
              aria-label="move up"
              class="hover:bg-slate-100 cursor-pointer"
            />
            <IconDown
              v-if="index !== posts.length - 1"
              @click="onDownAction(post.id, index)"
              aria-label="move down"
              class="hover:bg-slate-100 cursor-pointer"
            />
          </div>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import IconDown from "./IconDown.vue";
import IconUp from "./IconUp.vue";
import type { PostType, ActionType } from "./types";

const { posts } = defineProps({
  posts: {
    type: Array as PropType<PostType[]>,
    required: true,
  },
});

const emit = defineEmits<{
  action: [ActionType];
}>();

function onUpAction(postId: number, from: number) {
  emit("action", {
    postId,
    from,
    to: from - 1,
  });
}

function onDownAction(postId: number, from: number) {
  emit("action", {
    postId,
    from,
    to: from + 1,
  });
}
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
