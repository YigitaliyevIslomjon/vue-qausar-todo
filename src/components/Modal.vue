<script setup>
// core
import { ref, onMounted } from 'vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useQuasar } from 'quasar'
// components
import Form from './Form.vue'
// services
import { fetchCreateUser, fetchUpdateUser } from '@/services/users.service'
// store
import { useUsersStore } from '@/store/user.store'

// composibles
const userStore = useUsersStore()
const $q = useQuasar()

// props
const props = defineProps({
  rowData: {
    type: [Object, String]
  },
  title: {
    type: String
  }
})


//reactives
const isOpen = defineModel({default: false})
const isLoading = ref(false)

const formData = ref({
  name: null,
  username: null,
})


const formRules = {
  name: { required },
  username: { required },
}

const v$ = useVuelidate(formRules, formData)

// methods
const showNotify = () => {
  $q.notify({message: "successfully"})
}

const handleSubmit = async () => {
  const valid = await v$.value.$validate()
  if (!valid) return 

  isLoading.value = true
  try {  

    if(!props.rowData){
      await fetchCreateUser(formData.value)
    } else {
      await fetchUpdateUser(props.rowData?.id,formData.value)
    }
    showNotify()
    userStore.actionUsersList()
    isOpen.value = false
    formData.value = {
      name: null,
      username: null
    }
  } catch(e){
    console.log(e)
  }
  finally{
    isLoading.value = false
  }
}

onMounted(()=>{
  if(props.rowData) {
    formData.value = {
      name: props.rowData.name,
      username: props.rowData.username
    }
  }
})

</script>

<template>
  <q-dialog v-model="isOpen">
    <q-card class="w-[500px]">
      <q-card-section>
        <div class="text-h6">{{title}}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <Form
          v-model:modelValue="formData"
          :v$="v$"
        />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn :disable="isLoading"  label="Decline" outline color="blue" v-close-popup />
        <q-btn :disable="isLoading" :loading="isLoading"   label="submit" color="primary" @click="handleSubmit"  />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
