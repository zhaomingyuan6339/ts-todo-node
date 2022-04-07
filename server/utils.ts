import fs from 'fs'
import { resolve } from 'path'
import { ITodoData } from '../src/scripts/type'
// 读文件
export function readFile(pathName: string): string {
  return fs.readFileSync(resolve(__dirname, pathName), 'utf-8')
}
// 写入文件
export function writeFile<T>(path: string, data: T) {
  fs.writeFileSync(resolve(__dirname, path), JSON.stringify(data))
}

// 读写操作抽取
export function fileOperation(path: string, foo?: (todo: ITodoData[])=> ITodoData[] ) {
  let todolist: ITodoData[] = JSON.parse(readFile(path)) || []
  if (!foo) {
    return JSON.stringify(todolist)
  }
  todolist = foo(todolist)
  writeFile<ITodoData[]>(path, todolist)
}
