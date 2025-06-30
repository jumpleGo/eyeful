<template>
  <div class="eyfel-modal_recommended">
    <h3 class="eyfel-main__title--h3">Недавно вы просмотривали товар</h3>
    <div class="eyfel-modal_recommended_last-item">
      <img class="eyfel-modal_recommended_last-item--image" :src="lastShowItem.image" />
      <div class="eyfel-modal_recommended_last-item--content">
        <p class="eyfel-main__description">{{ lastShowItem.title }}</p>
        <i><p class="eyfel-main__description">{{ lastShowItem.model }}</p></i>
      </div>
    </div>
    <h3 class="eyfel-main__title--h4">С этим часто покупают следующие позиции:</h3>
    <div class="eyfel-modal_recommended__list">
      <AppCard
          v-for="item in availableItems"
          :key="item.title"
          v-bind="item"
          size="sm"
          with-button
          :src="getImageByType(item.category)"
          background="transparent"
          bordered
          @click="openModal(item)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {useProductsStore} from "~/store";
import {getImageByType} from "~/helpers/getImageByType";
import type {IProductItem} from "~/api/types";
import {useOrderFlow} from "~/composables/useOrderFlow";
import {useModalStore} from "~/store/modal";

const {showDescription} = useOrderFlow()
const {lastShowItem, availableItems} = storeToRefs(useProductsStore())
const { isShowRecommended} = storeToRefs(useModalStore())
const openModal = (item: IProductItem) => {
  isShowRecommended.value = false
  showDescription(item)
}
</script>
<style lang="scss" scoped>
.eyfel-modal_recommended {
  border: 2px solid black;
  padding: 40px;
  background: $light;
  width: 600px;
  display: flex;
  flex-direction: column;
  position: absolute;


  @include mobile {
    height: calc(100vh - 15%);
    overflow: scroll;
    width: calc(100% - 100px);
  }

  &_last-item {
    margin: 20px 0 60px 0;
    display: flex;
    border: 1px solid rgba(122, 122, 122, 0.36);
    align-items: center;
    width: fit-content;
    padding: 0 20px 0 0 ;
  }
  &_last-item--content {

  }

  &_last-item--image {
    max-height: 100px;
  }
}
.eyfel-modal_recommended__list {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
   @include mobile {
     flex-wrap: wrap;
     gap: 30px;
   }
}

</style>