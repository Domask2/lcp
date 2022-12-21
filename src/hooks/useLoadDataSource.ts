import {useActions} from "./useActions";
import {useTypedSelector} from "./useTypedSelector";
import {getCacheAll} from "../redux/ds/ds.selector";
import {RootState} from "../redux/redux.store";

const useLoadDataSource = () => {
    const {loadDataSource, loadDataSourceSuccess} = useActions()
    const cacheAll = useTypedSelector((state: RootState) => getCacheAll(state))

    const load = (key: string,
                  filter: string,
                  cache: boolean = true,
                  target?: string
    ): void =>
    {
        // let params: Array<string> = []
        const cacheKey = key + '#' + filter
        /**
         * Если данные лежат в кэше и стоит флаг о том что работаем с кэшем, берем данные из него
         * Если нет данных или флага то грузим данные.
         */

        if ( (cacheAll[cacheKey] === undefined || !cache) ) {
            loadDataSource(key, filter, cache, target)
        } else {
            let data = cacheAll[cacheKey] !== undefined
                ? cacheAll[cacheKey]
                : []

            loadDataSourceSuccess(data, filter, cache, target)
        }
    }

    return [ load ]
}

export default useLoadDataSource