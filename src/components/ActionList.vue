<template>
  <div class="bg-white border flex-col flex rounded-md shadow-lg">
    <h1 class="text-3xl font-bold p-4">List of actions committed</h1>
    <div class="p-6 bg-slate-100 grow">
      <ul class="bg-white">
        <li
          v-for="(action, index) in actions"
          class="h-16 border-b flex items-center p-2"
        >
          Moved post from index {{ action.from }} to index {{ action.to }}
          <button
            class="bg-green-300 rounded-md p-2 mx-2"
            :aria-label="`Time travel to  `"
            @click="onTimeTravel(index)"
          >
            Time Travel
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { ActionType } from "./types";

const { actions } = defineProps({
  actions: {
    type: Array as PropType<ActionType[]>,
    required: true,
  },
});

const emit = defineEmits<{
  travel: [number];
}>();

function onTimeTravel(index: number) {
  emit("travel", index);
}
</script>

<style scoped></style>
