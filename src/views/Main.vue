<script setup lang="ts">
import {ref} from "vue";
import BaseTable from "@/components/BaseTable.vue";
import  {cols, rows} from "@/mocks/TableMocks";

const tableCols = ref(cols);
const tableRows = ref(rows);

</script>

<template>
  <div>
   <BaseTable :cols="tableCols" :rows="tableRows"/>
  </div>
</template>

<style scoped>

</style>
