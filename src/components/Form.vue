<script setup>
// core
import { ref, watch } from 'vue'

// props
const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  v$: { type: Object, default: () => ({}) },
})
// reactives
const form = ref({ ...props.modelValue })

// emit
const emit = defineEmits(['update:modelValue'])

// methods
watch(
  form,
  (newVal) => emit('update:modelValue', newVal),
  { deep: true }
)

</script>

<template>
  <q-form class="flex flex-col gap-3">
    <q-input
      filled
      v-model="form.name"
      label="name *"
      :error="v$.name?.$error"
      :error-message="v$.name?.$errors[0]?.$message"
    />
    <q-input
      filled
      v-model="form.username"
      label="username *"
      :error="v$.username?.$error"
      :error-message="v$.username?.$errors[0]?.$message"
    />
  </q-form>
</template>
