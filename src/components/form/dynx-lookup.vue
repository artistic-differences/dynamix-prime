<script>
import {useGetLookupData} from "../../api/datasources";

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
  setup(props) {
    let rtnObj = {status: null, error: null, listData: null, refetch: null}
    if (props.config.datasource) {
      const {status, error, data} = useGetLookupData(props.config.datasource);
      rtnObj.status = status;
      rtnObj.error = error;
      rtnObj.listData = data;
    } else {
      rtnObj.listData = props.config.fixedData
    }
    return rtnObj
  },
  data: function() {
    return {
      search: '',
      listData: [],
      filteredItems: [],
    }
  },
  methods: {
    filteredList() {
      if (!this.search) {
        return this.listData
      }
      return this.listData.filter(r => {
        return r[this.config.displayField].toLowerCase().includes(this.search.toLowerCase())
      } )
    },
    onSearch(event) {
      this.search = event.query;
      this.filteredItems = [...this.filteredList()];
    }
  }
}
</script>

<template>
  <AutoComplete forceSelection :id="name" :name="name" :placeholder="placeholder" :dropdown="true"
             v-model="modelValue" :suggestions="filteredItems" @complete="onSearch($event)" :optionLabel="this.config.displayField"></AutoComplete>
</template>

