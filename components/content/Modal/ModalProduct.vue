<template>
  <div class="modal_product">
    <img v-if="isMobile" src="/assets/close.png" class="close" @click="emit('close')" />
    <div class="modal_product__image_wrapper">
      <img :src="getImageByType(category)" alt="" class="modal_product__image">
    </div>
    <div class="content">
      <div class="texts">
        <h3 class="eyfel-main__title--h3 title">{{title}}</h3>
        <p class="eyfel-main--description type">{{model}}</p>
        <p class="eyfel-main--description description">{{description}}</p>
      </div>
      <div class="buttons">
        <AppButton type="dark" text="купить в розницу" class="button" @click="emit('rozn')" />
        <AppButton type="dark-bordered" text="оптовый заказ" class="button" @click="emit('opt')" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {getImageByType, type ITypesCatalog} from "~/helpers/getImageByType";
import {useProductsStore} from "~/store";
import type {IProductItem} from "~/api/types";
import {useModalStore} from "~/store/modal";

const props = defineProps<{
  title: string,
  type: string,
  category: ITypesCatalog,
  description: string,
  model: string
}>()

const emit = defineEmits<{
  (e: 'rozn'): void
  (e: 'opt'): void
  (e: 'close'): void
}>()

const {isMobile} = useResponsive()
const {lastShowItem} = storeToRefs(useProductsStore())

onUnmounted(() => {
  close()
})

const close = () => {
  lastShowItem.value = {
    ...props as IProductItem,
    image: getImageByType(props.category)
  }
  useModalStore().startTimerShowRecommended()
}
</script>
<style lang="scss" scoped>
.content {
  padding: 40px;
  border-left: 2px solid black;
  background: $light;
  width: 600px;
  display: flex;
  flex-direction: column;
  @include mobile {
    width: 100%;
  }

}
.modal_product {
  border: 2px solid black;
  @include mobile {
    width: 100%;
    margin: 0 20px;
  }
}

.close {
  position: absolute;
  width: 30px;
  right: 40px;
  top: 40px;
}
.modal_product__image_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: black;
  width: 400px;
  @include mobile {
    display: none;
  }
}
.modal_product__image {
  max-width: 350px;
  width: 100%;
}
.description {
  margin-top: 30px;
  height: 200px;
  overflow: scroll;
  @include mobile {
    max-height: 50vh;
    overflow: scroll;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
.type {
  margin-top: 10px;
  font-weight: 500;
  font-style: italic;
}
.title {
  font-style: italic;
  font-weight: 600
}
.buttons {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-width: 386px;
  flex: 0;
}
.button {
  width: 100%;
}
.texts {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>