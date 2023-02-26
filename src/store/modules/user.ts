import { fetchJwtApi, fetchMeApi } from './../../api/index';
import { useRouteStore } from './route'
import { useMenuStore } from './menu'
import api from '@/api/request'

export const useUserStore = defineStore(
  'user',
  () => {
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()
    const username = ref(localStorage.username ?? '')
    const jwt = ref(localStorage.jwt ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => jwt.value)

    // 登录
    const login = async (data: Login) => {
      const response = await fetchJwtApi(data)
      jwt.value = response.data
      localStorage.setItem('jwt', response.data)
      const meResponse = await fetchMeApi()
      username.value = meResponse.data.nickname
      permissions.value = meResponse.data.permissions
      localStorage.setItem('username', meResponse.data.nickname)
    }

    // 登出
    const logout = async () => {
      localStorage.removeItem('username')
      localStorage.removeItem('jwt')
      username.value = ''
      jwt.value = ''
      routeStore.removeRoutes()
      menuStore.setActived(0)
    }

    // 获取我的权限
    async function getPermissions() {
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
      jwt,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
    }
  },
  {
    persist: true,
  }
)