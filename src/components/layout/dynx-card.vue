<template>
  <article :class="$style['card']">
    <header v-if="$slots.header"><slot name="header"></slot></header>
    <slot></slot>
    <footer v-if="$slots.footer"><slot name="footer"></slot></footer>
  </article>
</template>
<style module>
  .card {
    width: 100%;
  }
</style>