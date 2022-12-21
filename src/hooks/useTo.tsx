import {useNavigate} from "react-router-dom";

const useTo = () => {
    const navigate = useNavigate()
    const to = (url: string, param: string) => {
        if (param !== undefined && param !== 'undefined')
            navigate(url + param)
        else
            navigate(url)
    }

    return {to}
}

export default useTo