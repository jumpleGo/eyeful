<template>
  <div class="eyfel-app">
    <div class="eyfel-content">
      <layout>
        <AppPreloader v-if="isLoading" />
        <AppHeader class="eyfel-header" />
        <keep-alive>
          <NuxtPage  />
        </keep-alive>
        <AppModal v-if="lastShowItem && isShowRecommended" @close="closeRecommended">
          <ModalRecommended   />
        </AppModal>
      </layout>
    </div>
    <OrderFlow :show-modal="isShowModal" @close="isShowModal = false" @rozn="roznZakaz" />
    <client-only>
      <AppFooter class="eyfel-footer" />
    </client-only>
  </div>
</template>
<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
import Layout from "~/layouts/layout.vue";
import {useLoaderStore} from "~/store/loader";
import AppPreloader from "~/components/AppPreloader.vue";
import {getAllCount} from "~/api/getters";
import {useProductsStore} from "~/store";
import OrderFlow from "~/components/content/OrderFlow.vue";
import {useOrderFlow} from "~/composables/useOrderFlow";
import {useModalStore} from "~/store/modal";
import ModalRecommended from "~/components/content/Modal/ModalRecommended.vue";
const {showDescription, roznZakaz} = useOrderFlow()
const {isLoading} = storeToRefs(useLoaderStore())
const {count, lastShowItem} = storeToRefs(useProductsStore())
const {isShowModal, isShowRecommended} = storeToRefs(useModalStore())

useAsyncData(async () => {
  count.value = await getAllCount()

})

const closeRecommended = () => {
  isShowRecommended.value = false
  lastShowItem.value = false
}

</script>

<style lang="scss" scoped>
.eyfel-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.eyfel-content {
  flex: 1;
}
.eyfel-footer {
  flex: 0;
}
</style>
<style lang="scss">
body {
  margin: unset;
}
</style>