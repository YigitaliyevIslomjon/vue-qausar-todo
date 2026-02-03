import { defineStore } from "pinia"
import {
  fetchGetUserList,
} from "@/services/users.service"

export const useUsersStore = defineStore("users", {
  state: () => ({
    userList: [],
    loading: false,
    totalCount: 0
  }),
  actions: {
    async actionUsersList(params) {
      try {
        this.loading = true 
        const { data } = await fetchGetUserList(params)
        this.userList = data
        // always 10 becaouse api deon't reutrn totalCount so it is considered 10  
        this.totalCount = 10
      } catch(e){
         console.log(e)
      } finally{
        this.loading = false
      }
    }
  }
})