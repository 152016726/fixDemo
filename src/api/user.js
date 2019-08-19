import {service} from '@/axios';

export function login(data) {
  return service({
    url: 'login/user',
    method: 'post',
    data
  })
}
