import axios from 'axios'
import { ITodoData } from './type'

const PREFIX = 'http://localhost:8080'

export function getTodoList(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  // 保存原有的init函数
  const _origin = descriptor.value
  // 重写init函数
  descriptor.value = function (todoData: ITodoData[]) {
    axios
      .get(`${PREFIX}/todolist`)
      .then(res => {
        if (!res.data) {
          return
        }
        todoData = res.data
      })
      .then(() => {
        _origin.call(this, todoData)
      })
  }
}

export function handleRemoveTodo(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const _origin = descriptor.value
  descriptor.value = function (target: HTMLElement, id: number) {
    axios.post(`${PREFIX}/remove`, { id }).then(res => {
      _origin.call(this, target, id)
    })
  }
}

export function toogleTodo(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const _origin = descriptor.value
  descriptor.value = function (target: HTMLElement, id: number) {
    axios.post(`${PREFIX}/toogle`, { id }).then(() => {
      _origin.call(this, target, id)
    })
  }
}

export function addTodo(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const _origin = descriptor.value
  descriptor.value = function (todo: ITodoData) {
    axios
      .post<{ stat: number; msg: string }>(`${PREFIX}/add`, {
        todo: JSON.stringify(todo)
      })
      .then(res => {
        if (res.data.stat === 100) {
          alert(res.data.msg)
          return
        }
        _origin.call(this, todo)
      })
  }
}
