<template>
<div class="eyfel__catalog">
  <h3 v-if="bestsellers?.length" class="eyfel-main__title--h3 eyfel-page__catalog__title montserrat">bestsellers</h3>
  <div v-if="bestsellers?.length" class="eyfel-page__bestsellers">
    <AppOrderCard
        v-for="item in bestsellers"
        :key="item"
        title-color="white"
        v-bind="item"
        :bg-src="bgSrcBestseller"
        src="/assets/woman/parfum.png"
        @click="showDescription(item)" />
  </div>
  <h3 v-if="content.length" class="eyfel-main__title--h3 eyfel-page__catalog__title montserrat">ароматы для него</h3>
  <div v-if="content.length" class="eyfel-page__catalog">
    <AppOrderCard
        v-for="item in content"
        title-color="white"
        :key="item"
        v-bind="item"
        :bg-src="bgSrcMan"
        src="/assets/woman/parfum.png"
        @click="showDescription(item)" />
  </div>
</div>

</template>
<script setup lang="ts">
import AppOrderCard from "@/components/AppOrderCard.vue";
import {useAsyncData} from "#app";
import {getBestsellersByType, getListByType} from "~/api/getters";
import type {IProductItem} from "~/api/types";
import {useLoaderStore} from "~/store/loader";
import {useProductsStore} from "~/store";
import {useOrderFlow} from "~/composables/useOrderFlow";
const {showDescription} = useOrderFlow()
const {isLoading} = storeToRefs(useLoaderStore())
const {man, manBest: bestsellers} = storeToRefs(useProductsStore())


useAsyncData(async () => {
  if (man.value.length) return

  isLoading.value = true
  const resPromise = getListByType('man', 20)
  const resBestsellerPromise = getBestsellersByType('man')

  const [res, best] = await  Promise.all([resPromise, resBestsellerPromise])
  bestsellers.value = best
  man.value = res

  isLoading.value = false
})
const bgSrcBestseller = '/assets/gold-bg.png'
const bgSrcMan = '/assets/man/silver-bg.png'

const content = computed<IProductItem[]>(() => man.value?.filter(item => !item.isBestseller) || [])


</script>
<style lang="scss" scoped>
.eyfel-page__catalog__title {
  color: white;
}
</style>
