<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    modelValue: Date,
    placeholder: String,
    config: Object
  },
}
</script>

<template>
  <Calendar v-model="modelValue" :name="name" :placeholder="placeholder" />
</template>

