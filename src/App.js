import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
 
function App() {
  const [users, setUsers] = useState([]);
  const { reset, handleSubmit, register, formState: { errors } } = useForm();

  function addUser(newUser) {
    setUsers(users.concat({...newUser, id: users.length + 1}));
    reset();
  }

  return (
    <div className="App">
      <div className="container px-5 sm:px-0 my-10 mx-auto max-w-xl">
        <header className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
          <a href="https://explainingcode.com">
            <svg className="h-8">
              <use xlinkHref="#logo" />
            </svg>
          </a>
          <h1 className="mt-2 sm:mt-0 text-gray-600 text-lg uppercase font-medium tracking-wide">Adicione um usuário</h1>
        </header>

        <form
          onSubmit={handleSubmit(addUser)}
          className="bg-white rounded p-5 shadow mt-4"
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              {...register('name', { required: "Name can't be blank" })} // Atualize o registro
              className="input"
              name="name"
              id="name"
              type="text"
              placeholder="Bob Wiley"
              autoComplete="off"
            />
            <ErrorMessage error={errors.name} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              {...register('email', { required: "Email can't be blank" })}
              className="input"
              name="email"
              id="email"
              type="email"
              autoComplete="off"
              placeholder="bob@example.com"
            />
            <ErrorMessage error={errors.email} />
          </div>

          <div className="flex justify-end border-t mt-3 pt-5">
            <button
              type="button"
              onClick={reset}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
            >
              Excluir tudo
            </button>
            <button
              type="submit" // Atualize o tipo para submit
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Adicionar usuário
            </button>
          </div>
        </form>

        <div
          className="bg-white rounded p-5 shadow mt-4"
        >
          <h2 className="text-xl">Usuários: ({users.length})</h2>

          <table className="w-full mt-2">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">ID</th>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => 
                <tr key={user.id} className="border-t">
                  <td className="py-2">{user.id}</td>
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="flex items-center mt-2 text-gray-500 text-sm">
      <span>
        <svg viewBox="0 0 20 20" fill="currentColor" className="text-red-600 w-5 h-5">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
        </svg>
      </span>
      <span className="ml-1">
        {error.message}
      </span>
    </div>
  );
}

export default App;
