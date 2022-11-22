<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: String,
    label: String,
    config: Object
  },
  computed: {
    buttonClass: function() {
      let classes = [];
      switch (this.type) {
        case "warning": {
          classes.push("p-button-warning")
          break;
        }
      }
      return classes;
    }
  }
}
</script>

<template>
  <Button :id="name" :name="name" :class="buttonClass">{{label}}</Button>
</template>

