import { defineStore } from 'pinia'
import type {IProductItem} from "~/api/types";
export const useModalStore = defineStore('modal',() => {

    const isShowModal = ref<boolean>(false)
    const isShowRecommended = ref<boolean>(false)
    const isShowRecommendedUsed = ref<boolean>(false)
    const selectedItem = ref<IProductItem | null>(null)
    const timer = ref()

    const startTimerShowRecommended = () => {
        if (isShowRecommendedUsed.value || timer.value) return
        timer.value = setTimeout(() => {
            isShowRecommended.value = true
            isShowRecommendedUsed.value = true
        }, 10000)
    }


    return {
        isShowModal,
        selectedItem,
        isShowRecommended,
        startTimerShowRecommended
    }
})