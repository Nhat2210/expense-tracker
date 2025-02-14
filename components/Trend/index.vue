<template>
    <div>
        <div class="font-bold" :class="[color]">{{ title }}</div>
        <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
            <USkeleton class="h-8 w-full" v-if="loading"/>
            <div v-else>{{ formatCurrency }}</div>
        </div>

        <div>
            <USkeleton class="h-6 w-full" v-if="loading"/>
            <div v-else class="flex space-x-1 items-center text-[12px]">
                <UIcon :name="icon" class="w-5 h-5" :class="{'green': trendingUp , 'red': !trendingUp}" />
                <div class="text-gray-500 dark:text-gray-400" >{{ percentageTrending }} so với tháng trước</div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    title: String,
    amount: Number,
    lastAmount: Number,
    color: String,
    loading: Boolean,
})

// trendingUp dung de so sanh tien thang truoc va thang nay
const trendingUp = computed(() => {
   return  props.amount >= props.lastAmount;
})

// icon dung de hien thi icon trendingUp hay trendingDown
const icon = computed(()=>{
   return  trendingUp.value ? 'i-mdi-trending-up' : 'i-mdi-trending-down';
})

// tinh % chi tieu so voi thang truoc (co the nhieu hon co the it hon)
const percentageTrending = computed(() => {
    if(props.amount == 0 || props.lastAmount == 0) return '%';
    const bigger = Math.max(props.amount, props.lastAmount);
    const lower = Math.min(props.amount, props.lastAmount);
// su dung percentage difference de tinh % chi tieu thang truoc va thang nay
    const percentageDifference = ((bigger - lower) / lower) * 100;
    console.log(bigger, lower, percentageDifference);
    return Math.ceil(percentageDifference) + '%';
})
// su dung format currency 
const { formatCurrency} = useCurrency(props.amount);
</script>

<style lang="css" scoped>
.green{
    @apply text-green-600 dark:text-green-400;
}
.red{
    @apply text-red-600 dark:text-red-400;
}
</style>