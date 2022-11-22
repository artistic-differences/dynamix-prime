<template>
  <div :class="$style.vcenter">
    <slot></slot>
  </div>
</template>

<style module>
.vcenter {
  display: flex;
  align-items: center;
}
</style>