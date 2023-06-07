<template>
  <div class="">
    <div>ProjectA-Home</div>
    <MyButton @click="onClick">测试按钮</MyButton>
    <div>Framework Version: {{ getVersion() }}</div>
    <div>App Code: {{ settings.appCode }}</div>
    <div>Param A: {{ settings.paramA }}</div>
    <div>Param B: {{ settings.paramB }}</div>
  </div>
</template>

<script setup>
import MyButton from '@libs/components/MyButton.vue'
import { getVersion } from '@libs/utils'
import settings from '@proja/settings'

function onClick() {
  alert('点击了按钮')
}
</script>
