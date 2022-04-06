import TodoDom from './todoDom'
import { ITodoData } from './type'

export default class TodoEvent extends TodoDom {
  private todoData: ITodoData[]
  constructor(todoData: ITodoData[], todoWrapper: HTMLElement) {
    super(todoWrapper)
    this.todoData = todoData
    this.init()
  }
  private init() {
    this.initList(this.todoData)
  }
  // 增加项
  public addTodo(todo: ITodoData): undefined | number {
    const _todo: null | ITodoData = this.todoData.find(
      item => item.content === todo.content
    )
    if (!_todo) {
      this.todoData.push(todo)
      this.addItem(todo)
      return
    }
    return 1001
  }

  public removeTodo(target: HTMLElement, id: number) {
    this.todoData = this.todoData.filter(item => item.id !== id)
    this.removeItem(target)
  }

  public toogleComplete(target: HTMLElement, id: number) {
    this.todoData = this.todoData.map(item => {
      if (item.id === id) {
        item.completed = !item.completed
        this.changeCompleted(target, item.completed)
      }
      return item
    })
  }
}
