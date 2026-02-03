<script setup>
// core
import { ref } from 'vue';
import { useQuasar } from 'quasar';
// services
import { fetchDeleteUser } from '@/services/users.service';
// store
import { useUsersStore } from '@/store/user.store'

// composibles
const userStore = useUsersStore()
const $q = useQuasar()

// props
const props = defineProps({
	rowData : {
			type: Object
	}
})
// reactive
const loading = ref(false)
// 
const isOpen = defineModel({ default: false })

// methods
const showNotify = () => {
  $q.notify({message: "successfully"})
}

const handleSubmit = async () => {
    try {
        loading.value = true
        await fetchDeleteUser(props.rowData?.id)
        showNotify()
        userStore.actionUsersList()
        isOpen.value = false
    }
    catch(e){
        console.log(e)
    } finally {
        loading.value = false
    }
}

</script>   

<template>
  <q-dialog v-model="isOpen">
    <q-card class="w-[300px]">
      <q-card-section>
        <div class="text-h6">Delete Users </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :disable="loading" outline label="Decline" color="primary" v-close-popup />
        <q-btn  :loading="loading" :disable="loading" label="Delete" color="red" @click="handleSubmit"  />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
