import { ITodoData } from './type'

export default class TodoTemplate {
  protected todoview(tododata: ITodoData) {
    return `
    <input type="checkbox" ${tododata.completed ? 'checked' : ''} data-id=${
      tododata.id
    }/>
    <span style="text-decoration:${
      tododata.completed ? 'line-through' : 'none'
    }">${tododata.content}</span>
    <button data-id="${tododata.id}">删除</button>
    `
  }
}
