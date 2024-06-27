import { useContext } from 'react';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const useValidateUser = () => {
    const { user } = useContext(AuthenticationContext);
    const isAdmin = () => user?.role === 'Admin' || user?.role === 'SuperAdmin';
    const isSuperAdmin = () => user?.role === "SuperAdmin";
    const isClient = () => user?.role === "Client" || user?.role === 'SuperAdmin';
    return {
        isAdmin,
        isSuperAdmin,
        isClient
    }
};

export default useValidateUser;