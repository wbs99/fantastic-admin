import { fetchJwtApi } from './../../api/index';
import useRouteStore from './route'
import useMenuStore from './menu'
import api from '@/api/request'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const username = ref(localStorage.username ?? '')
    const token = ref(localStorage.token ?? '')
    const failure_time = ref(localStorage.failure_time ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      if (token.value) { return true }
      // let retn = false
      // if (token.value) {
      //   if (new Date().getTime() < parseInt(failure_time.value) * 1000) {
      //     retn = true
      //   }
      // }
      // return retn
    })

    // 登录
    async function login(data: Login) {
      const response = await fetchJwtApi(data)
      token.value = response.data
      localStorage.setItem('token', response.data)
      //localStorage.setItem('username', response.data)
      // localStorage.setItem('token', response.data.token)
      // localStorage.setItem('failure_time', response.data.failure_time)
      // username.value = response.data.username
      // failure_time.value = response.data.failure_time
    }
    // 登出
    async function logout() {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      localStorage.removeItem('failure_time')
      username.value = ''
      token.value = ''
      failure_time.value = ''
      routeStore.removeRoutes()
      menuStore.setActived(0)
    }
    // 获取我的权限
    async function getPermissions() {
      // 通过 mock 获取权限
      const response = await api.get('member/permission', {
        baseURL: '/mock/',
        params: {
          username: username.value,
        },
      })
      permissions.value = response.data.permissions
      return permissions.value
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await api.post('member/edit/password', {
        username: username.value,
        password: data.password,
        newpassword: data.newpassword,
      }, {
        baseURL: '/mock/',
      })
    }

    return {
      username,
      token,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
