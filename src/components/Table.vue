<script setup>
// core
import { ref, onMounted, watch } from 'vue'
import { useRouter , useRoute} from 'vue-router'

// compsibles
const route = useRoute()
const router = useRouter()

// props
const props = defineProps({
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  totalCount: { type: Number, default: 0 },
  loading: { type: Boolean, default: false },
  actionList: { type: Function, required: true },
  apiParams: { type: Object, default: () => ({}) },
})


// reactives
const pagination = ref({
  page: Number(route.query.page) || 1,
  rowsPerPage: Number(route.query.page_size) || 10,
  rowsNumber: props.totalCount
})

// methods
const onRequest = async (requestProp) => {
  const { page, rowsPerPage } = requestProp.pagination

  await router.replace({
    query: {
      ...route.query,
      page,
      page_size: rowsPerPage,
    }
  })

  // API so'rov yuborish
  await props.actionList({
    ...props.apiParams,
    ...route.query,
    _page: page,
    _limit: rowsPerPage,
  })

  pagination.value.page = page
  pagination.value.rowsPerPage = rowsPerPage
}

const initializeTable = async () => {
  await props.actionList({
    ...props.apiParams,
    _page: pagination.value.page,
    _limit: pagination.value.rowsPerPage,
    ...route.query
  })
}

watch(() => props.totalCount, (newVal) => {
  pagination.value.rowsNumber = newVal
})

onMounted(() => {
  initializeTable()
})

</script>

<template>
  <q-table
    :rows="rows"
    :columns="columns"
    :loading="loading" 
    v-model:pagination="pagination"
    @request="onRequest"'
    style="min-height: 400px; height: 600px;"
    loading-label=""
    :rows-per-page-options="[2,5,7,10]"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>

    <template #loading>
      <q-inner-loading :showing="loading" color="primary">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </template>

    <template #no-data>
      <div v-if="!loading" class="full-width column flex-center q-gutter-sm text-grey-8 no-data-box">
        <q-icon size="3em" name="sentiment_dissatisfied" />
        <span class="text-h6">No Data</span>
      </div>
    </template>
  </q-table>
</template>