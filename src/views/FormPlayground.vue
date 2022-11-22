<script>
import { useGetFormData } from "/src/api/datasources.js";
import DynxCenter from "@/components/layout/dynx-center.vue";
import DynxFieldInput from "@/components/form/dynx-field-input.vue";
import DynxRow from "@/components/layout/dynx-row.vue";
import DynxCard from "@/components/layout/dynx-card.vue";
import DynxLoader from "@/components/data/dynx-loader.vue";
import DynxForm from "@/components/form/dynx-form.vue";
import pages from "../config/pages/index";

export default {
  setup() {
    const metaData = pages.forms.user;
    const formDataSource = metaData.datasource;
    const { status, data, error, refetch } = useGetFormData(formDataSource);

    return { metaData, status, form:data, error, refetch };
    //return { metaData, status: 'loaded', form: {}, error: null }
  },
  components: {DynxForm, DynxCard, DynxRow, DynxFieldInput, DynxCenter, DynxLoader}, //these can be loaded dynamically https://medium.com/scrumpy/dynamic-component-templates-with-vue-js-d9236ab183bb
  data: function () {

    const initData = this.metaData.initData

    return {
      schema: this.metaData.schema,
      layout: this.metaData.layout,
      //this is from datasource
      form: initData,

      date: new Date(),

      selectedItem: null,
      lookupConfig :{
      datasource:'users',
          keyField: 'id',
          displayField: 'name'
      }
    }
  },
  watch: {
    form: function() {
      console.log(this.form)
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.form)
    }
  }

}
</script>

<template>

    <!--
    <DynxCard>
      <DynxLoader :status="status" :error="error" :data="form">
        <DynxForm :schema="schema" :layout="layout" :data="form"
                      :handleSubmit="handleSubmit">
        </DynxForm>
        <DynxFieldInput type="date" name="date" v-model="date"></DynxFieldInput>
        <DynxFieldInput type="textarea" name="textarea" value="This is my value"></DynxFieldInput>
      </DynxLoader>
    </DynxCard>
    -->
    <div class="flex-grid">
      <div class="col">
        <div class="card">
          <h5>InputText</h5>
          <div class="flex-grid">
            <div class="col">
              <DynxFieldInput type="text" label="Input" name="date" placeholder="input" error="Required"></DynxFieldInput>
            </div>
            <div class="col">
              <DynxFieldInput type="text" label="Input" name="date" placeholder="input"></DynxFieldInput>
            </div>
            <div class="col">
              <DynxFieldInput type="text" label="Input" name="date" placeholder="input"></DynxFieldInput>
            </div>
          </div>
        </div>
      </div>
    </div>



</template>

<style module>

</style>