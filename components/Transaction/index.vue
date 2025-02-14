<template>
    <div class="grid grid-cols-2 py-5 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark-text-gray-100">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-1">
                <UIcon name="i-mdi-arrow-bottom-right-thin" class="text-green-600" />
                <div>Lương</div>
            </div>
            <div>
                <UBadge color="white" class="cursor-pointer">Phân loại</UBadge>
            </div>
        </div>
        <div class="flex items-center justify-end space-x-3">
            <div>{{ formatCurrency }}</div>
            <div>
                <UDropdown :items="items" :popper="{placement: 'bottom-start'}">
                    <UButton color="white" variant="ghost" trailing-icon="i-mdi-ellipsis-horizontal"/>
                </UDropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
const { formatCurrency } = useCurrency(300000);
const items = [
    [   
    {
        label: 'Edit',
        icon: 'i-mdi-pencil',
        click : () => {
            console.log({message: 'Edit'});
        }
    },
    {
        label: 'Delete',
        icon: 'i-mdi-delete',
        click : () => {
            console.log({message: 'Delete'});
        }
    }
    ]   
]
</script>

<style lang="scss" scoped>
</style>