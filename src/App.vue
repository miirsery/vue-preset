<template>
  <el-config-provider :locale="ru">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import ru from 'element-plus/dist/locale/ru.mjs'
</script>
