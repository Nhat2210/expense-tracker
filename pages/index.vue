<template>
  <section class="flex items-center justify-between mb-10">
      <h1 class="text-[36px] font-extrabold">Xin chào Nhật</h1>
      <div>
          <USelectMenu :options="transactionViewOptions" v-model="selectedView" />
      </div>
  </section>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
      <Trend  color="green" title="Thu nhập" :amount="incomeTotal" :lastAmount="3000" :loading="isLoading"/>
      <Trend color="red" title="Thu nhập" :amount="incomeTotal" :lastAmount="3000" :loading="isLoading"/>
      <Trend color="green" title="Thu nhập" :amount="expenseTotal" :lastAmount="5000" :loading="isLoading"/>
      <Trend color="red" title="Thu nhập" :amount="expenseTotal" :lastAmount="5000" :loading="isLoading"/>
  </section>
  <section class="flex justify-between items-center mb-10">
    <div>
      <h2 class="text-xl font-extrabold">Chi tieu</h2>
      <p class="text-gray-500 dark:text-gray-600">
        Ban da kiem duoc {{ incomeTotal }} va tieu {{ expenseTotal }}
      </p>
    </div>
    <div>
      <ModalTransaction v-model="isOpen"/>
      <UButton icon="mdi:plus-circle-outline" color="white" variant="solid" label="Thêm giao dịch" @click="isOpen = true"></UButton>
    </div>
  </section>
  <section v-if="!isLoading">
    <h1 class="text-xl font-extrabold">Giao dịch gần đây</h1>
    <div v-for="(transactionsOnDay, date) in transactionsGroupedByDate" :key="date" class="mb-10">
      <Daily-Transaction :date="date" :transactions="transactionsOnDay" />
      <Transaction v-for="transaction in transactionsOnDay" :key="transaction.id" :transaction="transaction" @deleted="fetchTransactions()"/>
    </div>
  </section>
  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4 " :key="i"/>
  </section>
</template>
<script setup>
import { transactionViewOptions } from '~/constants';
const selectedView = ref(transactionViewOptions[1]);

const isLoading = ref(false);
const supabase = useSupabaseClient();
const isOpen = ref(false)
const transactions = ref([]);

const transactionsGroupedByDate = computed (() => {
  let grouped = {};
  for(const transaction of transactions.value) {
    const date = new Date(transaction.created_at).toISOString().split('T')[0];
    
    if(!grouped[date]){
      grouped[date] = [];
    }
    grouped[date].push(transaction);
  }  
  return grouped;
})
console.log(transactionsGroupedByDate.value); 

const income = computed(
  () => transactions.value.filter(t => t.type === 'Income')
)
const expense = computed(
  () => transactions.value.filter(t => t.type === 'Expense')
)
const incomeCount = computed(() => income.value.length)
const expenseCount = computed(() => expense.value.length)

const incomeTotal = computed(
  () => income.value.reduce((sum, transaction) => sum + transaction.amount, 0)
)
const expenseTotal = computed(
  () => expense.value.reduce((sum, transaction) => sum + transaction.amount, 0)
)

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const { data } = await useAsyncData('transactions', async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select();

      if (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return [];
      }
      return data;
    })
    return data.value; 
  } finally {
    isLoading.value = false;
  }
};



const refreshfetchTransactions = async () => {
  transactions.value = await fetchTransactions()
}
await refreshfetchTransactions();


// onMounted(refreshfetchTransactions);
</script>