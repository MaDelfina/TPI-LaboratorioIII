import { useContext } from 'react';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const useValidateUser = () => {
    const { user } = useContext(AuthenticationContext);
    const isAdmin = () => user?.role === 'Admin';
    const isSuperAdmin = () => user?.role === "SuperAdmin";
    const isClient = () => user?.role === "Client";
    return {
        isAdmin,
        isSuperAdmin,
        isClient
    }
};

export default useValidateUser;