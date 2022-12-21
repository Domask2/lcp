import {AppActionCreatorsType, AppActionsEnum} from "./app.action.types";
import {IAppInitialized, initialStateApp} from "./app.initial";

const appReducer = (state = initialStateApp, action: AppActionCreatorsType): IAppInitialized => {
    let settings;
    switch (action.type) {
        case AppActionsEnum.AUTH_LOGIN_SUCCESS:
            window.localStorage.setItem('user-id', action.data.id)
            window.localStorage.setItem('user-token', action.data.token)
            window.localStorage.setItem('user-name', action.data.name)
            window.localStorage.setItem('user-email', action.data.email)
            window.localStorage.setItem('user-theme', action.data.theme)
            window.localStorage.setItem('user-role', action.data.role)
            window.localStorage.setItem('projects-roles', JSON.stringify(action.data.projects_roles))
            return {
                ...state,
                auth: {
                    ...state.auth,
                    id: action.data.id,
                    name: action.data.name,
                    email: action.data.email,
                    theme: action.data.theme,
                    role: action.data.role,
                    authenticated: true,
                    projects_roles: action.data.projects_roles,
                }
            }

        case AppActionsEnum.AUTH_LOGIN_FAILED:
        case AppActionsEnum.AUTH_LOGOUT_SUCCESS:
            window.localStorage.removeItem('user-token')
            window.localStorage.setItem('user-id', '')
            window.localStorage.setItem('user-token', '')
            window.localStorage.setItem('user-name', '')
            window.localStorage.setItem('user-email', '')
            window.localStorage.setItem('user-theme', '')
            window.localStorage.setItem('user-role', '')
            window.localStorage.setItem('projects-roles', '')
            return {
                ...state,
                auth: {authenticated: false, email: '', id: '', role: '', name: '', projects_roles: '', theme: ''}
            }

        case AppActionsEnum.APP_CHANGE_EDIT_MODE:
            /** включение/выключение режима редактирования */
            return {...state, edit_mode: action.value}

        case AppActionsEnum.APP_INITIALIZED_SUCCESS:
            /**
             * Инициализация приложения.
             * Подгрузка компонентов.
             * Используется в app.reducer
             */
            return {
                ...state,
                initialized: true,
                components: action.settings.data.components,
                setting: {...action.settings.data.setting[0], loading: true, errors: false},
                db: action.settings.data.db
            }

        case AppActionsEnum.APP_INITIALIZED_FAILED:
            window.localStorage.removeItem('user-token')
            return {
                ...state,
                initialized: false,
                initializeError: action.message,
                auth: {...state.auth, authenticated: false, email: '', role: '', name: ''}
            }

        case AppActionsEnum.APP_UPDATE_USER_SUCCESS:
            window.localStorage.setItem('projects-roles', JSON.stringify(action.user.projects_roles))
            window.localStorage.setItem('theme', JSON.stringify(action.user.theme))
            return {
                ...state,
                auth: {
                    ...state.auth,
                    projects_roles: action.user.projects_roles,
                    theme: action.user.theme
                }
            }
        case AppActionsEnum.APP_UPDATE_SETTINGS:
            settings = state.setting
            return {
                ...state,
                setting: {...settings, loading: false, error: false}
            }
        case AppActionsEnum.APP_UPDATE_SETTINGS_SUCCESS:
            return {
                ...state,
                setting: {...action.data, loading: true, error: false}
            }
        case AppActionsEnum.APP_UPDATE_SETTINGS_FAILED:
            settings = state.setting

            return {
                ...state,
                setting: {...settings, message: action.error, loading: true, error: true}
            }
        default:
            return state
    }
}

export default appReducer