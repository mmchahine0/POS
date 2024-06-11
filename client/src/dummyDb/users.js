const users = [
    {
        id: 1,
        name: 'John Doe',
        username: 'john',
        password: 'john123',
    },
    {
        id: 2,
        name: 'Jane Doe',
        username: 'jane',
        password: 'jane123',
    }
]

const getUser = (username, password)=>{
    const user = users.find((user)=> user.username === username);
    if(!user){
        return Promise.reject('User not found');
    }
    const isPasswordMatch = user.password === password;
    if(!isPasswordMatch){
        return Promise.reject('Invalid credentials');
    }
    return Promise.resolve(user);
}

export default getUser;