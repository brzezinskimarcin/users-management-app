<script setup lang="ts">
defineProps<{
  color: 'primary' | 'white';
  size: 'big' | 'small';
  label?: string;
}>();

const colorClassMapping = {
  primary: '!border-primary',
  white: '!border-white',
};

const sizeClassMapping = {
  big: 'w-20 h-20 relative',
  small: 'w-18 h-18 scale-50 absolute',
};
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div :class="['lds-ripple', sizeClassMapping[size]]">
      <div :class="colorClassMapping[color]" />
      <div :class="colorClassMapping[color]" />
    </div>
    <p v-if="label">
      {{ label }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
/* source: loading.io/css */
.lds-ripple {
  display: inline-block;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
