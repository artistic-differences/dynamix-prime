<script>
export default {
  props: {
    error: String
  },
}
</script>

<template>
    <span v-if="error" :data-tooltip="error" data-placement="bottom">
      <slot></slot>
    </span>
    <span v-else>
      <slot></slot>
    </span>
</template>

