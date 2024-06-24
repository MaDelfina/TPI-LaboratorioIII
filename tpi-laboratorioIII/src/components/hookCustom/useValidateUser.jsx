import { useContext } from 'react';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const useValidateUser = () => {
    const { user } = useContext(AuthenticationContext);
    const isAdmin = () => user?.role === 'admin' || user?.role === 'super-admin';
    const isSuperAdmin = () => user?.role === "super-admin";
    const isClient = () => user?.role === "client" || user?.role === 'super-admin';
    return {
        isAdmin,
        isSuperAdmin,
        isClient
    }
};

export default useValidateUser;