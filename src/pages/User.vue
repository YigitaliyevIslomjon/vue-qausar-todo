<script setup>
// core
import { ref } from 'vue'
// components
import Modal from '@/components/Modal.vue';
import Table from '@/components/Table.vue';
import DeleteModal from '@/components/DeleteModal.vue';
// store
import { useUsersStore } from '@/store/user.store'; 

// composibles
const userStore = useUsersStore()

// reactives
const isModalVisible = ref(false)
const isDeleteModalVisible = ref(false)
const rowData = ref(null)

// methods
const onAdd = ()=>{
  rowData.value = null
  isModalVisible.value = true 
}

const columns = [
  { name: 'name', label: 'Name', align: 'left', style: 'width: 50% ', headerStyle:"width: 50% ", field: row => row.name},
  { name: 'username', label: 'Username', align: 'left',  style: 'width:40%', headerStyle:"width: 40% ",  field: row => row.username},
  { name: 'actions', label: 'Actions', align: 'right' }
]

const editRow = (row) => {
  isModalVisible.value = true
  rowData.value = row
}

const deleteRow = (row) => {
  isDeleteModalVisible.value = true
  rowData.value= row
}

</script>
<template>
  <div class="max-w-7xl mx-auto p-10">
    <div class="flex flex-col gap-3">
      <div class="flex justify-between">
        <div class="text-lg">User List </div>
        <q-btn color="light-blue" text-color="white" label="add user" @click="onAdd" />
      </div>
      <Table class="w-full" :columns="columns" :rows="userStore.userList" :totalCount="userStore.totalCount" :loading="userStore.loading" :action-list="userStore.actionUsersList" >
        <template #body-cell-actions="props">
          <q-td :props="props" align="center">
            <q-btn dense flat color="blue" icon="edit" @click="editRow(props.row)" />
            <q-btn dense flat color="red" icon="delete" @click="deleteRow(props.row)" />
          </q-td>
      </template>
      </Table>  
    </div>
  </div>

  <modal v-if="isModalVisible" v-model="isModalVisible" :row-data="rowData" :title="rowData ? 'edit User' : 'add User'" />
  <delete-modal v-model="isDeleteModalVisible" :row-data="rowData" />

</template>
  