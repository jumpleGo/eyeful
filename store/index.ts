import { defineStore } from 'pinia'
import type {IProductItem} from "~/api/types";
export const useProductsStore = defineStore('products',() => {

  const indexBestsellers = ref<IProductItem[]>([])
  const indexMan = ref<IProductItem[]>([])
  const indexWoman = ref<IProductItem[]>([])
  const indexHome = ref<IProductItem[]>([])
  const isLoadedIndex = ref<boolean>(false)
  const premium = ref<IProductItem[]>([])
  const premiumBest = ref<IProductItem[]>([])
  const man = ref<IProductItem[]>([])
  const manBest = ref<IProductItem[]>([])
  const woman = ref<IProductItem[]>([])
  const womanBest = ref<IProductItem[]>([])

  const catalog = ref<IProductItem[]>([])
  const count = ref<number>(0)
  const lastShowItem = ref()
  const availableItems = computed(() => {
      const itemsList = [indexMan.value, indexBestsellers.value, indexHome.value, premium.value, woman.value, man.value].filter(arr => arr.length).flat()
      console.log(itemsList)
      const items = catalog.value.length ? catalog.value : itemsList

      const randomIndex1 = Math.floor(Math.random() * items.length);
      const randomIndex2 = Math.floor(Math.random() * items.length);
      const randomIndex3 = Math.floor(Math.random() * items.length);

      console.log(randomIndex1, randomIndex2, randomIndex3)

      return [items[randomIndex1], items[randomIndex2], items[randomIndex3]]
  })


    return {
        indexBestsellers,
        indexMan,
        indexWoman,
        indexHome,
        isLoadedIndex,
        premium,
        premiumBest,
        man,
        manBest,
        woman,
        womanBest,
        catalog,
        count,
        lastShowItem,
        availableItems
    }
})