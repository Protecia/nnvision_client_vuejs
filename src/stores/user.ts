import {defineStore} from 'pinia'

export interface UserInfo {
  avatar: string
  username: string
  firstName: string
  lastName: string
  email: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      avatar: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    } as UserInfo
  }),
  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info
    }
  }
})

