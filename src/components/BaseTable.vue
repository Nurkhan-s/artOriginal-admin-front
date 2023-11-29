<script setup lang="ts">
import {defineProps} from "vue";

defineProps({
  cols: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  defaultEmpty: {
    type: [String, Number],
    default: "",
  },
})
</script>

<template>
  <div class="base-table">
    <div class="cols-wrapper">
      <div
          class="cols-head"
      >
        <div
            class="cols"
            v-for="(col, i) in cols"
            :key="i"
        >
          {{ col.name }}
        </div>
      </div>
      <div
          class="rows"
          v-for="(row, i) in rows"
          :key="i"
          @click="$emit('clicked', row)"
      >
        <div
            class="row"
            v-for="(col, i) in cols"
            :key="i"
        >
          <slot :name="'key-' + col.key" :row="row">
            {{ row[col.key] || defaultEmpty }}
          </slot>
        </div>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.base-table {
  .cols-head {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    column-gap: 20px;
    background: #2c3e501a;
    border-radius: 2px 2px 0 0;
    text-align: left;
    .cols {
      min-width: 35px;
      width: 100%;
      font-size: 14px;
      line-height: 19px;
      color: #71757a;
      white-space: nowrap;
      padding: 10px 16px;
    }
  }

  .rows {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    column-gap: 20px;
    font-size: 14px;
    line-height: 16px;
    border-bottom: 1px solid #eef0f5;
    cursor: pointer;


    &:first-child {
      background: rgba(0, 185, 45, 0.08);
    }

    &:hover {
      background: #2c3e500d;

      .btn {
        background-color: #007aff;
        color: white;
      }
    }
    .row {
      display: flex;
      padding: 10px 16px;
      text-align: left;
    }
  }
}
.stripped:nth-child(odd) {
  background: #f7f8fa;
}

.hover {
  &:hover {
    background-color: #eef0f5;
  }

  &:hover button {
    background-color: #007aff;
    color: #fff;
  }
}
</style>