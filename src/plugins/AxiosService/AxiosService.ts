import axios, { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'
import type { AxiosRequestConfig } from 'axios'

import router from '@/router'
import { AxiosResponseType } from '@/plugins/AxiosService/AxiosConfig.type'

export class AxiosService {
  private axiosInstance!: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)

    this.axiosInstance.interceptors.request.use((config) => {
      const accessToken = Cookies.get('access_token')

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    })

    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (response.data.message) {
          ElMessage({
            message: response.data.message,
            type: 'success',
            duration: 3000,
            showClose: true,
          })
        }

        return response
      },
      (error) => {
        const response = error?.response?.data

        switch (error?.response?.status) {
          case 401:
            break
          case 403:
            ElMessage({
              message:
                'Ваш сеанс работы с сайтом завершен из-за отсутствия активности' +
                ' в течение 15 минут. Пожалуйста,' +
                ' авторизуйтесь для продолжения работы.',
              type: 'error',
              duration: 3000,
              showClose: true,
            })

            router.push({ name: 'LoginAuthorization' })

            break
          case 404:
            break
          case 422:
            if (process.env.NODE_ENV !== 'production') {
              ElMessage({
                message: response.code.message || 'Неверный логин или пароль!',
                type: 'error',
                duration: 3000,
                showClose: true,
              })
            }

            break

          default:
            if (response.code.message) {
              if (Array.isArray(response.code.message)) {
                response.code.message.forEach((message: string) => {
                  setTimeout(() => {
                    ElMessage({
                      message,
                      type: 'error',
                      duration: 3000,
                      showClose: true,
                    })
                  }, 100)
                })
              } else {
                ElMessage({
                  message: response.code.message,
                  type: 'error',
                  duration: 3000,
                  showClose: true,
                })
              }
            }

            break
        }

        return Promise.reject(response.code ? response.code : response)
      }
    )
  }

  protected async axiosCall<T = any>(config: AxiosRequestConfig): AxiosResponseType<T> {
    try {
      const { data } = await this.axiosInstance.request<T>(config)

      return [null, data]
    } catch (error: any) {
      return [error]
    }
  }
}
