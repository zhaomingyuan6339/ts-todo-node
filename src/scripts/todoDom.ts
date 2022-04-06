import TodoTemplate from './todoTemplate'
import { ITodoData } from './type'
import { createItem, findParentNode } from './utils'
// 继承DOM模板类
export default class TodoDom extends TodoTemplate {
  private todoWrapper: HTMLElement
  constructor(todoWrapper: HTMLElement) {
    super()
    this.todoWrapper = todoWrapper
  }
  // 初始化数据
  protected initList(todoData: ITodoData[]) {
    if (todoData.length) {
      /**
       * Document.createDocumentFragment()
       * DocumentFragments 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。
       * 因为文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。
       */
      const oFrag: DocumentFragment = document.createDocumentFragment()
      todoData.map(todo => {
        const oItem = createItem('div','todo-item',this.todoview(todo))
        oFrag.appendChild(oItem)
      })
      this.todoWrapper.appendChild(oFrag)
    }
  }
  // 增加项
  protected addItem(todo: ITodoData) {
    const oItem: HTMLElement = createItem('div','todo-item',this.todoview(todo))
    this.todoWrapper.appendChild(oItem)
  }
  // 删除项
  protected removeItem(target: HTMLElement) {
    const oParentNode = findParentNode(target, 'todo-item')
    oParentNode.remove()
  }
  // 改变项(改变事项完成状态)
  protected changeCompleted(target: HTMLElement, completed: boolean) {
    const oParentNode = findParentNode(target, 'todo-item')
    const oContent: HTMLElement = oParentNode.querySelector('span')
    oContent.style.textDecoration = completed ? 'line-through' : 'none'
  }
}
