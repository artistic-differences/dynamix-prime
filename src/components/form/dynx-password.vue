<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    modelValue: String,
    label: String,
    placeholder: String,
    config: Object
  },
}
</script>

<template>
  <Password :id="name" :name="name" :placeholder="placeholder"
             v-model="modelValue"></Password>
</template>

