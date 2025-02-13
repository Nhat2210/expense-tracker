<template>
    <div>
        <div class="font-bold" :class="[color]">{{ title }}</div>
        <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
            <USkeleton class="h-8 w-full" v-if="loading"/>
            <div v-else>{{ amount }}</div>
        </div>

        <div>
            <USkeleton class="h-6 w-full" v-if="loading"/>
            <div v-else class="flex space-x-1 items-center text-[12px]">
                <UIcon name="i-mdi-trending-up" class="w-5 h-5" :class="[color]" />
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    title: String,
    amount: Number,
    lastAmount: Number,
    color: String,
    loading: Boolean,

})
</script>

<style lang="css" scoped>
.green{
    @apply text-green-600 dark:text-green-400;
}
.red{
    @apply text-red-600 dark:text-red-400;
}
</style>