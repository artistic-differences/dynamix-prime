<script>
export default {
  props: {
    status: String,
    error: String,
    data: Object || Array,
  },
}
</script>
<template>
    <progress v-if="status == 'loading' || status == 'fetching'" :class="$style['loading']"></progress>
    <div v-else-if="status == 'error'">An error has occurred: {{ error }}</div>
    <slot v-if="data"></slot>
</template>

<style module>
.loading {
  animation: progress-indeterminate 1s linear infinite;
}
</style>