<template>
    <div class="grid grid-cols-2 py-5 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark-text-gray-100">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-1">
                <UIcon name="mdi:arrow-top-right" class="text-green-600" v-if="props.transaction.type === 'Income'"/>
                <UIcon name="mdi:arrow-bottom-right" class="text-red-600" v-else/>
                <div>{{ transaction.description }}</div>
            </div>
            <div>
                <UBadge color="white" class="cursor-pointer" v-if="transaction.category">{{ transaction.category }}</UBadge>
            </div>
        </div>
        <div class="flex items-center justify-end space-x-3">
            <div>{{ formatCurrency }}</div>
            <div>
                <UDropdown :items="items" :popper="{placement: 'bottom-start'}">
                    <UButton color="white" variant="ghost" trailing-icon="i-mdi-ellipsis-horizontal" :loading="isLoading"/>
                </UDropdown>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    transaction: Object
})

const emit = defineEmits(['deleted'])

const { formatCurrency } = useCurrency(props.transaction.amount);

const isLoading = ref(false);
const toast = useToast();
const supabase = useSupabaseClient();
const deleteTransaction = async () => {
    isLoading.value = true;
    try{
        await supabase.from('transactions')
            .delete()
            .eq('id', props.transaction.id)
        toast.add({
            id: crypto.randomUUID(),
            title: 'Xoa thanh cong',
            icon: 'mdi:check-circle-outline'
        })
        emit('deleted', props.transaction.id)
    }
    catch(error){
        toast.error({
            id: crypto.randomUUID(),
            title: 'Xoa khong thanh cong',
            icon: 'mdi:exclamation'
        })
    }
    finally{
        isLoading.value = false;
    }

}

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
            deleteTransaction();
        }
    }
    ]   
]
</script>

<style lang="scss" scoped>
</style>