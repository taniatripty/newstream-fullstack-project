import React, { useContext } from 'react';
import { AuthContex } from '../../AuthContex/AuthContex';

const useAuth = () => {
   const auth=useContext(AuthContex)

   return auth
};

export default useAuth;