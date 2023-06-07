<template>
  <button>
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '按钮'
  }
})
</script>

<style lang="less" scoped></style>
