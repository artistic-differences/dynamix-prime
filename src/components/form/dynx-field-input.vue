<script>
import DynxErrorLabel from "./dynx-error-label.vue";
import DynxSelectBox from "./dynx-select-box.vue";
import DynxDate from "./dynx-date.vue";
import DynxText from "./dynx-text.vue";
import DynxCheckbox from "./dynx-checkbox.vue";
import DynxPassword from "./dynx-password.vue";
import DynxTextarea from "./dynx-textarea.vue";
import DynxLookup from "./dynx-lookup.vue";
export default {
  setup(config) {
  },
  components: {
    DynxErrorLabel, DynxSelectBox, DynxDate, DynxText, DynxTextarea, DynxPassword, DynxCheckbox,
    DynxLookup},
  props: {
    type: {
      name: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    modelValue: String|Object|Array|Boolean,
    label: String,
    placeholder: String,
    error: String,
    config: Object
  },
  computed: {
    typeIsInput : function() {
      return !["textarea", "select", "lookup", "text"].includes(this.type)
    },
    validClass: function() {
      return this.error? ['p-invalid'] : []
    },
    validLabel: function() {
      return this.error? this.$style['invalid'] : ''
    }

  },
  methods: {
    updateValue: function (evt) {
      //can parse this before we hand back i.e. dates
      this.$emit('update:modelValue', evt.target.value);
    },
  },
  created(){
    console.log(this.name)
    console.log(this.config)
  }
}
</script>

<template>
  <div style="margin-bottom:5px;">
    <label for="name" :class="validLabel"><h6>{{ label }}</h6></label>
      <DynxText :class="validClass" v-if="type=='text'" :id="name" :name="name" :placeholder="placeholder" v-model="modelValue"
                v-tooltip.top="{value: error}"></DynxText>
      <DynxPassword :class="validClass" v-if="type=='password'" :id="name" :name="name" :placeholder="placeholder" v-model="modelValue"
              v-tooltip.top="{value: error}"></DynxPassword>
      <DynxCheckbox :class="validClass" v-if="type=='checkbox'" :id="name" :name="name" :placeholder="placeholder" v-model="modelValue"
                  v-tooltip.top="{value: error}"></DynxCheckbox>
      <DynxDate v-else-if="type=='date'" :name="name" :placeholder="placeholder" v-model="modelValue"
                v-tooltip.top="{value: error}"
      ></DynxDate>
      <DynxLookup v-else-if="type=='select'" :name="name" :placeholder="placeholder"
                  :config="config"
      />
      <DynxTextarea v-else-if="type=='textarea'" :name="name" :placeholder="placeholder"
                    :value="modelValue" @input="updateValue"
      />
    </div>

</template>
<style module>
  .invalid {
    color:var(--red-500)
  }
</style>

