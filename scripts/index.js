// const obj = {
//   a: 1,
//   b: [1,2,3]
// }

// const objJson = JSON.stringify(obj)

// localStorage.setItem('key', objJson)
// // localStorage.getItem('key')
// // console.log(localStorage.getItem('key'));

// const objOld = JSON.parse(localStorage.getItem('key'))
// console.log(objOld.b[2]);

const createTodo = (title, form) => {
  const todoContainer = document.createElement('div');
  const todoRow = document.createElement('div')
  const todoHeader = document.createElement('h1')
  const wrapperForm = document.createElement('div')
  const wrapperList = document.createElement('div')


  
  todoContainer.classList.add('container')
  todoRow.classList.add('row')
  todoHeader.classList.add('text-center', 'mb-5')
  wrapperForm.classList.add('col-6')
  wrapperList.classList.add('col-6')

  todoHeader.textContent = title

  wrapperForm.append(form)
  todoRow.append(wrapperForm, wrapperList)


  todoContainer.append(todoHeader, todoRow)

   return todoContainer;
}


const createForm = (todoForm) => {
  const form = document.createElement('form')
  const input = document.createElement('input')
  const textArea = document.createElement('textarea')
  const btnSubmit = document.createElement('button')


  input.placeholder = 'Title'
  textArea.placeholder = 'Description'

  btnSubmit.type = 'submit'
  btnSubmit.textContent = 'ADD'
  form.classList.add('form-group')
  input.classList.add('form-control', 'mb-3')
  textArea.classList.add('form-control', 'mb-3')
  btnSubmit.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block')

  form.append(input, textArea, btnSubmit)

  return { input, textArea, btnSubmit, form }
}


const initTodo = (selector, titleTodo) => {
  const wrapper = document.querySelector(selector)
 
  const todoForm = createForm()
  const todoApp = createTodo(titleTodo, todoForm.form)
  
  wrapper.append(todoApp)
} 

initTodo('.root', 'List of deals');