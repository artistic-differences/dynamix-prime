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

  computed: {
    rows: function() {
      return this.config?.rows ? this.config.rows: 5;
    }
  }
}
</script>

<template>
  <Textarea :id="name" :name="name" :placeholder="placeholder" style="width:100%" :rows="rows"
             v-model="modelValue"></Textarea>
</template>

