export class Storage {
    static createNewUser(userData) {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([userData]));
        } else {
            if (checkUserExist(userData)) {
                alert('This user already exists');
                return;
            }
            const existUsers = JSON.parse(localStorage.getItem('users'));
            localStorage.setItem('users', JSON.stringify([...existUsers, userData]));
        }
        alert('Account is created');

        return userData.id;
    }

    static enterTodoList(login) {
        const existUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        const user = existUsers.find(({ name, password }) => {
            return name === login.name && password === login.password;
        });
        if (user) {
            alert('Successful authorization');
            return user.id;
        } else {
            alert('Incorrect login or password');
        }
    }

    static getUserData() {
        const existUsers = JSON.parse(localStorage.getItem('users'));
        const userId = JSON.parse(localStorage.getItem('selectedUserId'));
        const user = existUsers.find(({ id }) => id === userId);
        return user;
    }

    static createPost(postData) {
        const users = JSON.parse(localStorage.getItem('users'));
        const currentUser = findUserData();
        const updateUser = {
            ...currentUser,
            todoList: [...currentUser.todoList, postData],
        };
        const indexCurrentUser = users.findIndex((user) => user.id === currentUser.id);
        const updateUsersArray = [...users.slice(0, indexCurrentUser), updateUser, ...users.slice(indexCurrentUser + 1)];
        localStorage.setItem('users', JSON.stringify(updateUsersArray));
    }

    static getTodoInfo(todoId) {
        const currentUser = findUserData();
        return currentUser.todoList.find((todo) => todo.id == todoId);
    }

    static setTodoStatus(todoId) {
        const users = JSON.parse(localStorage.getItem('users'));
        const currentUser = findUserData();
        const indexCurrentUser = users.findIndex((user) => user.id === currentUser.id);
        currentUser.todoList.forEach((todo) => {
            if (todo.id == todoId) {
                todo.status = todo.status === 'processing' ? 'done' : 'processing';
            }
        });
        const updateUsersArray = [...users.slice(0, indexCurrentUser), currentUser, ...users.slice(indexCurrentUser + 1)];
        localStorage.setItem('users', JSON.stringify(updateUsersArray));
    }

    static removeTodo(todoId) {
        const users = JSON.parse(localStorage.getItem('users'));
        const currentUser = findUserData();
        const updateTodosArray = currentUser.todoList.filter((todo) => todo.id != todoId);
        const updateUser = {
            ...currentUser,
            todoList: updateTodosArray,
        };
        const indexCurrentUser = users.findIndex((user) => user.id === currentUser.id);
        const updateUsersArray = [...users.slice(0, indexCurrentUser), updateUser, ...users.slice(indexCurrentUser + 1)];
        localStorage.setItem('users', JSON.stringify(updateUsersArray));
    }

    static editPost(todoId, formData) {
        const users = JSON.parse(localStorage.getItem('users'));
        const currentUser = findUserData();
        const indexCurrentUser = users.findIndex((user) => user.id === currentUser.id);
        const indexTodo = currentUser.todoList.findIndex((todo) => todo.id == todoId);
        const updateUser = {
            ...currentUser,
            todoList: [...currentUser.todoList.slice(0, indexTodo), formData, ...currentUser.todoList.slice(indexTodo + 1)],
        };
        const updateUsersArray = [...users.slice(0, indexCurrentUser), updateUser, ...users.slice(indexCurrentUser + 1)];
        localStorage.setItem('users', JSON.stringify(updateUsersArray));
    }
}

function checkUserExist(newUser) {
    let isUser = false;
    const existUsers = JSON.parse(localStorage.getItem('users'));
    existUsers.forEach(({ name, email }) => {
        if (name === newUser.name && email === newUser.email) {
            isUser = true;
        }
    });

    return isUser;
}

function findUserData() {
    const userId = JSON.parse(localStorage.getItem('selectedUserId'));
    const users = JSON.parse(localStorage.getItem('users'));
    return users.find((user) => user.id === userId);
}
