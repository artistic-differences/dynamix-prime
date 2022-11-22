<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    modelValue: Boolean,
    placeholder: String,
    config: Object
  },
}
</script>

<template>
  <div style="margin-top: 5px; margin-bottom: 5px;">
    <label>
      <Checkbox style="margin-right: 5px;"  :id="name" :name="name" v-model="modelValue" :binary="true"></Checkbox>
      {{placeholder}}
    </label>
  </div>
</template>

