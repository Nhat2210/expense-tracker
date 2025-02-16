<template>
  <section class="flex items-center justify-between mb-10">
      <h1 class="text-[36px] font-extrabold">Xin chào Nhật</h1>
      <div>
          <USelectMenu :options="transactionViewOptions" v-model="selectedView" />
      </div>
  </section>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
      <Trend  color="green" title="Thu nhập" :amount="4000" :lastAmount="3000" :loading="false"/>
      <Trend color="red" title="Thu nhập" :amount="4000" :lastAmount="3000" :loading="false"/>
      <Trend color="green" title="Thu nhập" :amount="4000" :lastAmount="5000" :loading="false"/>
      <Trend color="red" title="Thu nhập" :amount="4000" :lastAmount="5000" :loading="false"/>
  </section>
  <section>
    <h1>TEST API</h1>
    <div v-for="(transactionsOnDay, date) in transactionsGroupedByDate" :key="date" class="mb-10">
      <Daily-Transaction :date="date" :transactions="transactionsOnDay" />
      <Transaction v-for="transaction in transactionsOnDay" :key="transaction.id" :transaction="transaction" />
    </div>
  </section>
</template>
<script setup>
import { transactionViewOptions } from '~/constants';
const selectedView = ref(transactionViewOptions[1]);

const supabase = useSupabaseClient();

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

const fetchTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select();

  if (error) {
    console.error('Lỗi khi fetch transactions:', error);
    return;
  }

  transactions.value = data;
  console.log('Data:', data);


};



onMounted(fetchTransactions);
</script>