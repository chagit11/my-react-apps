import React from 'react';
import '../_sass/UsersBase.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

export const UsersBase = () => {
  const [users, setUsers] = React.useState([])
  const [invites, setInvites] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)
  const [success, setSuccess] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(json => {
        setUsers(json.data)
        console.log(json.data)
      } )
      .catch(err => {
        console.warn(err)
        alert('Ошибка при получении пользователей!')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  const onClickInvite = (id) => {
    if(invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    }else {
      setInvites(prev => [...prev, id])
    }
  }
  return (
    <div className="usersbase">
      {
        success 
        ? (<Success count={invites.length} /> )
        : (
          <Users isLoading={isLoading} items={users} 
          searchValue={searchValue} setSearchValue={setSearchValue}
          invites={invites} onClickInvite={onClickInvite} 
          setSuccess={setSuccess} />
        )
      }
      
    </div>
  );
}

