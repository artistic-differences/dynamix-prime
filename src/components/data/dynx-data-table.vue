<script>
import { ref, onMounted, computed } from 'vue';
import {resolve} from "../../utils/datautils";
import {useGetListData} from "../../api/datasources";

//fields [fieldName, title, type]  title = table heading or label on component
export default {
  props: {
    datasource: {
      type: String,
      required: true
    },
    fields: {
      type: [Object],
      required: true
    },
    config: Object
  },
  setup(props) {

    const { fields, config } = props;
    const dt = ref();
    const dataFetchingEnabled = ref(false);
    const lazyParams = ref({});
    const { status, data, error, refetch } = useGetListData(props.datasource, lazyParams, null, {enabled: dataFetchingEnabled});
    const loading = computed(()=> status==='loading')
    const totalRecords = ref(0);
    const records = ref(data);
    //TODO this needs to come from config same for the global filters
    const filters = ref({
      'name': {value: '', matchMode: 'contains'},
      'country.name': {value: '', matchMode: 'contains'},
      'company': {value: '', matchMode: 'contains'},
      'representative.name': {value: '', matchMode: 'contains'},
    });

    const onPage = (event) => {
      lazyParams.value = event;
    };
    const onSort = (event) => {
      lazyParams.value = event;
    };
    const onFilter = () => {
      lazyParams.value.filters = filters.value ;
    }

    onMounted(() => {
      lazyParams.value = {
        first: 0,
        rows: dt.value.rows,
        sortField: null,
        sortOrder: null,
        //filters: filters.value
      };
      dataFetchingEnabled.value=true;
    })

    return { dt, loading, totalRecords, records, filters, lazyParams, fields, config, status, error
      , onPage, onSort, onFilter, resolve }
  }
}
</script>
<template>
  <DataTable ref="dt"
      :value="records" :paginator="true" :rows="10" :loading="status==='loading'"
      @page="onPage($event)" @sort="onSort($event)" @filter="onFilter($event)"
      :globalFilterFields="config?.globalFilterFields"
      stateStorage="session" stateKey="dt-state-demo-session"
      class="p-datatable-sm"
  >
    <template #header v-if="config?.showHeader">
      <div style="text-align: right">
        <span v-if="config?.enableSearch">
          <i class="pi pi-search" style="margin: 4px 10px 0px 0px;"></i>
          <InputText v-model="filters['global']" placeholder="Search ..." size="25" />
        </span>
      </div>
      <!-- intermediate loading bar can go here -->
    </template>
    <Column v-for="field of fields" :field="field.fieldName"
            :header="field.title" :key="field.fieldName"
            :sortable="field.sortable"
    >
      <template #body="slotProps">
        {{resolve(field.fieldName, slotProps.data) }} <!-- can do lookup on field to link to display field -->
      </template>
    </Column>
  </DataTable>
</template>
<style module>

</style>