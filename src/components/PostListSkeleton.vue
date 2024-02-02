<template>
  <ul>
    <li
      v-for="_ in count"
      class="flex h-16 p-4 bg-slate-100 rounded-md my-4 items-center shadow-lg"
    ></li>
  </ul>
</template>

<script setup lang="ts">
const { count } = defineProps({
  count: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped></style>
