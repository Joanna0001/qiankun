import { get, post } from '@/utils/request'

// 用户登录
export function login(data: { username: string; password: string }) {
  return post<{ token: string }>('/user/login', data)
}

// 获取用户信息
export function getUserInfo() {
  return get<{
    id: number
    username: string
    avatar: string
    roles: string[]
  }>('/user/info')
}

// 用户登出
export function logout() {
  return post('/user/logout')
} 