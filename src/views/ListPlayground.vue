<script>
import DynxCenter from "@/components/layout/dynx-center.vue";
import DynxDataTable from "@/components/data/dynx-data-table.vue";
import pages from "../config/pages/index";

export default {
  setup() {
    const metaData = pages.lists.users;
    const { datasource, fields } = metaData;
    return { datasource, fields }
  },
  components: {DynxCenter, DynxDataTable}, /*these can be loaded dynamically https://medium.com/scrumpy/dynamic-component-templates-with-vue-js-d9236ab183bb*/}
</script>

<template>
  <DynxCenter>
    <DynxDataTable :datasource="datasource" :fields="fields"></DynxDataTable>
  </DynxCenter>
</template>

<style module>
</style>