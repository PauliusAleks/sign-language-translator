import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { STORAGE_KEY_USER } from '../../const/storageKeys'
import { storageDelete, storageSave } from '../../utils/storage'
import { addTranslations } from '../../api/UserApi'

function ProfileActions() {
    const {user, setUser } = useUser();

    const handleLogoutClick = () =>{
        const doLogout = window.confirm("Are you sure you want to logout?")
        if(doLogout){
            storageDelete(STORAGE_KEY_USER);
            setUser(null);
        }
    }

    const handleDeleteHistory = async () => {
      const doDelete = window.confirm("Are you sure you want to delete history?")

      if(doDelete){
        const [error, userResponse] = await addTranslations(user.id, [])
        if(error === null){
          storageSave(STORAGE_KEY_USER, userResponse)
          setUser(userResponse)
        } else{
          console.log(error)
        }       
      }
    }
  return (
    <div>
        <Link to="/translation">Translation Page </Link>
        <button onClick={handleDeleteHistory}>Clear history</button>
        <button onClick={handleLogoutClick}>Logout </button>
    </div>
  )
}

export default ProfileActions