import {v4 as uuid} from "uuid"
type Task={
    id:string, title:string, completed:boolean,createdAT:Date
}
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("form") as HTMLFormElement || null
const input = document.querySelector<HTMLInputElement>("newtask") 
const tasks:Task[]=[]
form?.addEventListener("submit",e=>{
    e.preventDefault()
    if(input?.value =="" ||input?.value==null) return
        const newtask: Task={
            id:uuid(),
            title:input.value,
            completed:false,
            createdAT: new Date(),
        }
        tasks.push(newtask)
        saveTasks()
        
        addListItem(newtask)
        input.value =""

        addListItem(newtask)

})
function addListItem(task:Task)
    {
        const item = document.createElement("li")
        const label = document.createElement("label")
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.addEventListener("change",()=>{
            task.completed = checkbox.checked
            saveTasks()
        })
        checkbox.checked = task.completed
        label.append(checkbox, task.title)
        item.append(label)
        list?.append(item)
    }
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
function loadTasks(){
    const taskJSON=localStorage.getItem("tasks")
    if(taskJSON==null) return []
    return JSON.parse(taskJSON)
}