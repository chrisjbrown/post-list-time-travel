<template>
  <div class="bg-white border flex-col flex rounded-md shadow-lg">
    <h1 class="text-3xl font-bold p-4">List of actions committed</h1>
    <div class="p-6 bg-slate-100 grow">
      <transition-group class="rounded-md" name="slide" tag="ul">
        <li
          v-for="(action, index) in actions"
          :key="action.id"
          class="bg-white h-16 flex items-center p-2 justify-between w-full first:rounded-t-md last:rounded-b-md [&:not(:last-child)]:border-b"
          :data-testid="`action-${action.id}`"
        >
          <div>
            {{
              `Moved post ${action.postId} from index ${action.from} to index ${action.to}`
            }}
          </div>
          <button
            :data-testid="`time-travel-${index}`"
            class="bg-green-300 rounded-md p-2 mx-2"
            :aria-label="`Time travel back ${index + 1} changes`"
            @click="onTimeTravel(index)"
          >
            Time Travel
          </button>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { ActionType } from "@/components/types";

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

<style scoped>
.slide-enter {
  opacity: 0;
}

.slide-move {
  transition: all 0.5s;
}

.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-leave-active {
  animation: slide-out 0.5s ease-out forwards;
  transition: opacity 0.5s;
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateY(-32px);
  }
  to {
    transform: translateY(0px);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateY(-32px);
  }
}
</style>
