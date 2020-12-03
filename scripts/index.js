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

const initDataTodo = key => localStorage.getItem(key) ?
  JSON.parse(localStorage.getItem(key)) : [];

const updateDataTodo = (key, todoData) => 
  localStorage.setItem(key, JSON.stringify(todoData))

const createTodo = (title, form, list) => {
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
  wrapperList.append(list)
  todoRow.append(wrapperForm, wrapperList)


  todoContainer.append(todoHeader, todoRow)

   return todoContainer;
}




const createForm = () => {
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

const createListTodo = () => {
  const listTodo = document.createElement('ul')
  
  listTodo.classList.add('list-group')


  return listTodo;
}

const createItemTodo = (item, listTodo) => {
  const itemTodo = document.createElement('li')
  const btnItem = document.createElement('button')

  itemTodo.classList.add('list-group-item', 'p-0', 'mb-4', 'border-0')
  btnItem.classList.add('list-item', 'btn', 'block', 'border-primary', item.success ? 'btn-success' : 'btn-info')

  btnItem.textContent = item.nameTodo
  btnItem.id = item.id

  itemTodo.append(btnItem)
  listTodo.append(itemTodo)
}

const addTodoItem = (key, todoData, listTodo, nameTodo, descriptionTodo) => {
  const id = `todo${(+new Date()).toString(16)}`
  todoData.push({ id, nameTodo, descriptionTodo, success: false })
  updateTodo(listTodo, todoData, key)

}


const createModalTodo = () => {
  const modalEl = document.createElement('div');
  const modalDialog = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalHeader = document.createElement('div');
  const modalBody = document.createElement('div');
  const modalBFooter = document.createElement('div');
  const itemTitle = document.createElement('h2');
  const itemDescription = document.createElement('p');
  const btnClose = document.createElement('button');
  const btnSuccess = document.createElement('button');
  const btnDelete = document.createElement('button');


  modalEl.classList.add('modal')
  modalDialog.classList.add('modal-dialog')
  modalContent.classList.add('modal-content')
  modalHeader.classList.add('modal-header')
  modalBody.classList.add('modal-body')
  modalBFooter.classList.add('modal-footer')
  itemTitle.classList.add('modal-title')
  btnClose.classList.add('btn', 'close', 'btn-modal')
  btnSuccess.classList.add('btn', 'btn-success', 'btn-modal')
  btnDelete.classList.add('btn', 'btn-danger', 'btn-delete', 'btn-modal')
  
  btnClose.innerHTML = '&times;';
  btnSuccess.textContent = 'Ready';
  btnDelete.textContent = 'Delete';

  
  modalDialog.append(modalContent);
  modalContent.append(modalHeader, modalBody, modalBFooter);
  modalHeader.append(itemTitle, btnClose);
  modalBody.append(itemDescription);
  modalBFooter.append(btnSuccess, btnDelete);

  modalEl.append(modalDialog);


  const closeModal = e => {
    const target = e.target;
    if(target.classList.contains('btn-modal') || target === modalEl) {
      modalEl.classList.remove('d-block');
    }
  }

  
 
  const showModal = (titleTodo, descTodo, id) => {
    modalEl.dataset.idItem = id;
    modalEl.classList.add('d-block');
    itemTitle.textContent = titleTodo;
    itemDescription.textContent = descTodo;
  }
  modalEl.addEventListener('click', closeModal);
  return { modalEl, btnSuccess, btnDelete, showModal}
}

const updateTodo = (listTodo, todoData, key) => {
  listTodo.textContent = '';
  todoData.forEach(i => createItemTodo(i, listTodo));
  updateDataTodo(key, todoData)
}


const initTodo = (selector) => {
  const key = prompt('Write your key!')

  const todoData = initDataTodo(key)

  const wrapper = document.querySelector(selector)
  const listTodo = createListTodo()
  const todoForm = createForm()
  const todoModal = createModalTodo()
  const todoApp = createTodo(key, todoForm.form, listTodo)
  
  document.body.append(todoModal.modalEl)
  wrapper.append(todoApp)
  todoForm.form.addEventListener('submit', e => {

    todoForm.input.classList.remove('is-invalid')
    todoForm.textArea.classList.remove('is-invalid')
    e.preventDefault()
    if(todoForm.input.value && todoForm.textArea.value) {
      
      addTodoItem(key, todoData, listTodo, todoForm.input.value, todoForm.textArea.value)
      todoForm.form.reset()

    } else {
      if(!todoForm.input.value) {
        todoForm.input.classList.add('is-invalid')
      }
      if(!todoForm.textArea.value) {
        todoForm.textArea.classList.add('is-invalid')
      }
    }
  })

  listTodo.addEventListener('click', e => {
    const target = e.target;
    
    if(target.classList.contains('list-item')) {
     
      const item = todoData.find(e => e.id === target.id)
      todoModal.showModal(item.nameTodo, item.descriptionTodo, item.id)
    }
  });

  todoModal.btnSuccess.addEventListener('click', () => {
    const itemTodoEl = todoData.find(e => 
      e.id === todoModal.modalEl.dataset.idItem)
      
    itemTodoEl.success = !itemTodoEl.success;
    updateTodo(listTodo, todoData, key)
  })

  todoModal.btnDelete.addEventListener('click', () => {
    const index = todoData.findIndex(e => 
      e.id === todoModal.modalEl.dataset.idItem);
    todoData.splice(index, 1);
    updateTodo(listTodo, todoData, key);
  })

  document.title = key;

  updateTodo(listTodo, todoData, key)
} 

initTodo('.root', 'List of deals');