<template>
      <UModal 
      v-model="props.modelValue"
      >
        <UCard>
            <template #header>
                <h2 class="font-bold">Thêm chi tiêu</h2>
            </template>

            <UForm :state="state" :schema="schema" ref="form" @submit="save">
                <UFormGroup required label="Loại giao dịch" name="type" class="mb-4">
                    <USelect placeholder="Chọn loại chi tiêu" :options="types" v-model="state.type"/>
                </UFormGroup>

                <UFormGroup label="Số tiền" required name="amount" class="mb-4">
                    <UInput placeholder="Nhập số tiền" type="number" v-model="state.amount"/>
                </UFormGroup>

                <UFormGroup label="Thời gian giao dịch" required name="created_at" class="mb-4">
                    <UInput type="date" icon="mdi:calendar" v-model="state.created_at"/>
                </UFormGroup>
                
                <UFormGroup label="Thời gian giao dịch" required name="created_at" class="mb-4">
                    <UInput placeholder="Mô tả" v-model="state.description" />
                </UFormGroup>

                <UFormGroup label="Thể loại" required name="category" class="mb-4" v-if="state.type === 'Chi tiêu'">
                    <USelect placeholder="Thể loại" :options="categories" v-model="state.category"/>
                </UFormGroup>`
                <div class="flex items-center justify-center">
                    <UButton type="submit" color="black" variant="solid" label="Save" class="px-8 py-2" />
                </div>
            </UForm>

            <template #footer>
                <div class="flex justify-end">
                    <UButton icon="mdi:minus-circle-outline" color="white" variant="solid" label="Đóng modal" @click="closeModal" class="hover:bg-red-500 hover:text-white"></UButton>
                </div>
            </template>
        </UCard>
      </UModal>
</template>

<script setup>
import { categories, types } from '~/constants';
import z from 'zod';
const props = defineProps({
    modelValue:{
        type:Boolean,
        default: false,
    }
})
const emit = defineEmits(['update:modelValue'])
const closeModal = ()=>{
    emit('update:modelValue', false)
}

const state = ref({
    type:undefined,
    amount: 0,
    created_at: undefined,
    description: undefined,
    category: undefined
})

const defaultSchema = z.object({
    created_at: z.string().min(1, "Vui lòng chọn ngày"),
    description: z.string().optional(),
    amount: z.number().positive("Số tiền cần lớn hơn 0"),
    type: z.string().nonempty("Vui lòng không để trống"),
    category: z.string().nonempty("Vui lòng không để trống"),
})
const incomeSchema = z.object({
    type: z.literal("Thu nhập"),
})
const expenseSchema = z.object({
    type: z.literal("Chi tiêu"),
    category: z.enum("categories")
})
const investmentSchema = z.object({
    type: z.literal("Đầu tư")
})
const savingSchema = z.object({
    type: z.literal("Tiết kiệm")
})
const schema = z.intersection(
  z.discriminatedUnion('type', [incomeSchema, expenseSchema, investmentSchema, savingSchema]),
  defaultSchema
)
const form= ref();
const save = async () => {
    form.value.validate();
}
</script>
