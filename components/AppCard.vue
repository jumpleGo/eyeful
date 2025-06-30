<template>
  <div :class="['app-card', size]">
    <p v-if="name" class="app-card__name">{{ name }}</p>
    <div :class="{bordered}" :style="background ? `background-image: url('${background}')` : 'background: black'" class="app-card__image-wrapper">
      <img :src="src" class="app-card__image">
    </div>
    <h3 class="app-card__title">{{ title }} {{ model }}</h3>
    <AppButton v-if="withButton" :text="buttonText" :type="buttonType" fluid @click="emit('click')" class="app-card__button" />
  </div>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
  src: string,
  title: string,
  background: string,
  name?: string,
  model?: string
  bordered?: boolean,
  size?: 'sm' | 'md' | 'lg',
  withButton?: boolean,
  buttonText?: string,
  buttonType?:  'light' | 'dark' | 'light-bordered' | 'dark-bordered' | 'gold' ,
}>(), {
  src: '',
  title: '',
  name: '',
  size: 'lg',
  buttonText: "подробнее",
  buttonType: 'dark'
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
.bordered {
  border: 1px solid rgba(122, 122, 122, 0.36);

}
.lg {
  max-width: 350px;
  .app-card__image-wrapper {
    padding: 80px 0;
  }
  .app-card__image {
    max-height: 400px;
  }
  .app-card__title {
    font-weight: 400;
    padding: 20px 30px;
    font-size: 20px;
  }

}
.sm {
  max-width: 150px;
  height: 100%;
  .app-card__image-wrapper {
    padding: 30px 15px;
  }
  .app-card__image {
    max-height: 120px;
  }
  .app-card__title {
    font-weight: 400;
    padding: 5px 0;
    font-size: 14px;
    height: 40px;
  }
  :deep(.eyfel-main__description) {
    font-size: 14px;
  }
  :deep(.app-button) {
    padding: 10px;
  }

}
.app-card {
  position: relative;
  width: 100%;
}
.app-card__image {
  height: 100%;
  width: auto;
}
.app-card__name {
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
}
.app-card__image-wrapper {
  height: 100%;
  width: auto;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  @include mobile {
    height: auto;
  }
}

</style>