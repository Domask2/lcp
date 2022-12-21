import {Route} from 'react-router-dom';
import {RootState} from "./../redux/redux.store";
import {getAuth} from "./../redux/app/app.selector";
import {useTypedSelector} from "./../hooks/useTypedSelector";
import AuthModal from '../components/header/authModal/AuthModal';

const PrivateRoute = (props: any) => {
    const {path, render} = props;
    const auth = useTypedSelector((state: RootState) => getAuth(state));

    // Проверяем аутентификацию в редаксе, 
    // если она есть - создаем переданный (routeProps) маршрут.
    // Если ее нет - маршрут даже не создаётся.
    return (
        <Route
            path={path}
            element={(routeProps:any) => (
                auth.authenticated
                    ? render(routeProps)
                    : <AuthModal view={true} />
            )}
        />
    );
}

export default PrivateRoute;
