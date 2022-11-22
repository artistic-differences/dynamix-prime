<script>
import {useGetLookupData} from "../../api/datasources";
import Loader from "@/components/data/dynx-loader.vue";

export default {
  components: {Loader},
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
      const {status, error, data, refetch} = useGetLookupData(props.config.datasource);
      rtnObj.status = status;
      rtnObj.error = error;
      rtnObj.listData = data;
      rtnObj.refetch = refetch;
    } else {
      rtnObj.listData = props.config.fixedData
    }
    return rtnObj
  },
  data: function() {
    return {
      dropdownShown :false,
      search: '',
      selectedItem: null,
      listData: []
    }
  },
  computed: {
    filteredList: function() {
      if (!this.search) {
        return this.listData
      }
      return this.listData.filter(r => {
        return r[this.config.displayField].toLowerCase().includes(this.search.toLowerCase())
      } )
    },
    displayValue: function() {
      return this.selectedItem ? this.selectedItem[this.config.displayField] : ''
    }
  },
  methods: {
    updateValue: function (item) {
      this.selectedItem = item;
      const value = item[this.config.keyField]
      //can parse this before we hand back i.e. dates
      this.$emit('update:modelValue', value);
      this.$refs.summary.click();
    },
    dropDownClick: function() {
      this.dropdownShown = !this.dropdownShown;
      if (this.dropdownShown) {
        setTimeout(() => this.$refs.search.focus(),2)
      }
    }
  }
}
</script>

<template>
  <details role="list">
    <summary ref="summary" @click="dropDownClick" aria-haspopup="listbox">{{ displayValue }}</summary>
    <ul role="listbox">
      <li><input ref="search" type="text" v-model="search" placeholder="Search ..."></li>
      <loader :status="status" :error="error" :data="listData">
        <template v-for="item in filteredList" :key="item[config.keyField]">
          <li style="cursor: pointer;" @click="updateValue(item)"><a>{{ item[config.displayField] }}</a></li>
        </template>
      </loader>
    </ul>
  </details>
</template>

