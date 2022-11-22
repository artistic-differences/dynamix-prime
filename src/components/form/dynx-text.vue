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
  <InputText :id="name" :name="name" :placeholder="placeholder"
             v-model="modelValue"></InputText>
</template>

