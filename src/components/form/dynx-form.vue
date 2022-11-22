<script>
import DynxFieldInput from "@/components/form/dynx-field-input.vue";
import DynxButton from "@/components/form/dynx-button.vue";
import DynxRow from "@/components/layout/dynx-row.vue";
export default {
  setup() {
  },
  components: {DynxRow, DynxFieldInput, DynxButton},
  props: {
    handleSubmit: Function,
    schema:Object,
    layout:Array,
    data:Object,
  },
  methods: {
    getField(fieldName) {
      return {
        name: fieldName,
        ...this.schema[fieldName]
      }
    }
  }
}
</script>

<template>
  <form @submit="handleSubmit">
    <template v-for="(row, rowIdx) in layout" :key="rowIdx">
      <DynxRow>
        <template v-for="fieldName in row">
          <div>
            <DynxFieldInput v-bind="getField(fieldName)" v-model="data[fieldName]"/>
          </div>
        </template>
      </DynxRow>
    </template>
    <div v-if="this.$slots.actions">
      <slot name="actions"></slot>
    </div>
    <div v-else>
      <DynxRow>
          <DynxButton name="btnSubmit" label="Submit"/>
      </DynxRow>
    </div>

  </form>
</template>

