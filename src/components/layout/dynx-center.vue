<template>
  <div :class="$style.center">
    <slot></slot>
  </div>
</template>

<style module>
.center {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>