<template>
  <transition-group name="list" tag="ul">
    <li
      v-for="(post, index) in posts"
      :key="post.id"
      :data-testid="`post-${post.id}`"
    >
      <div
        class="flex h-16 p-4 bg-white rounded-md my-4 items-center shadow-lg"
      >
        <div>Post {{ post.id }}</div>
        <div class="ml-3 flex flex-col">
          <button
            v-if="index !== 0"
            @click="onUpAction(post.id, index)"
            data-testid="icon-up"
            aria-label="move up"
            class="hover:bg-slate-100"
          >
            <IconUp />
          </button>
          <button
            v-if="index !== posts.length - 1"
            @click="onDownAction(post.id, index)"
            data-testid="icon-down"
            aria-label="move down"
            class="hover:bg-slate-100"
          >
            <IconDown />
          </button>
        </div>
      </div>
    </li>
  </transition-group>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import IconDown from "@/components/IconDown.vue";
import IconUp from "@/components/IconUp.vue";
import { v4 as uuidv4 } from "uuid";
import type { PostType, ActionType } from "@/components/types";

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
    id: uuidv4(),
    postId,
    from,
    to: from - 1,
  });
}

function onDownAction(postId: number, from: number) {
  emit("action", {
    id: uuidv4(),
    postId,
    from,
    to: from + 1,
  });
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
