import {useTypedSelector} from "./useTypedSelector";
import {shallowEqual} from "react-redux";
import {getDsByArrKey, getLsVarsByArrObj} from "../redux/ds/ds.selector";
import {RootState} from "../redux/redux.store";
import {IAddictions, IArrayAddictionResult} from "../redux/project/project.initial";
import {AddictionsChoiceType, TypeAddictions} from "../utils";

const useCheckAddictions = (currentAddiction: [IAddictions]) => {
    const arrayAddictionResult: IArrayAddictionResult[] = [];

    const lsArr: Array<any> = [];
    const dsArr: Array<any> = [];

    currentAddiction?.length && currentAddiction.forEach((item: IAddictions) => {
        if (item.choice === AddictionsChoiceType.LS_VARS.value) {
            lsArr.push(item.ds)
        } else {
            dsArr.push(item.ds)
        }
    });

    // const ls = useTypedSelector((state: RootState) => getDataSourceAllLs(state));
    const ls = useTypedSelector((state: RootState) => getLsVarsByArrObj(state, lsArr), shallowEqual);
    // const allDs = useTypedSelector((state: RootState) => getDataSourcesAll(state));
    const allDs = useTypedSelector((state: RootState) => getDsByArrKey(state, dsArr), shallowEqual);


    function checkAddiction() {
        if (!currentAddiction?.length) {
            return true
        }
        let result = true;
        let finalResult: any = [];

        currentAddiction.forEach((addict: IAddictions) => {
            if (addict.type === TypeAddictions.DS.value) {
                return result = allDs[addict.ds] !== undefined;
            }

            if (addict.type === TypeAddictions.NOT_DS.value) {
                return result = allDs[addict.ds] === undefined;
            }

            if (allDs[addict.ds] === undefined && ls === undefined) {
                return result = false
            }

            let condition;
            if (allDs[addict.ds]) {
                const addictDs: any = allDs[addict.ds]
                switch (addict.choice) {
                    case AddictionsChoiceType.ITEM.value:
                        condition = addictDs?.items && addictDs.items.length;
                        break;
                    case AddictionsChoiceType.KEY.value:
                        condition = addictDs?.items.length && addictDs.items[0][addict.dsKey];
                        break;
                    case AddictionsChoiceType.PROP.value:
                        condition = addictDs[addict.dsKey];
                        break;
                    // case AddictionsChoiceType.ROW.value:
                    //     condition = row[addict.dsKey];
                    //     break;
                    default:
                        break;
                }
            }

            if (addict.choice === AddictionsChoiceType.LS_VARS.value) {
                condition = ls[addict.ds];
            }


            switch (addict.type) {
                case TypeAddictions.AVAILABILITY.value:
                    result = !!condition;
                    break
                case TypeAddictions.FAILURE.value:
                    result = !condition;
                    break
                case TypeAddictions.MORE.value:
                    result = +condition > +addict.value;
                    break
                case TypeAddictions.LESS.value:
                    result = +condition < +addict.value;
                    break
                case TypeAddictions.MORE_EQUAL.value:
                    result = +condition >= +addict.value;
                    break
                case TypeAddictions.LESS_EQUAL.value:
                    result = +condition <= +addict.value;
                    break
                case TypeAddictions.EQUALLI.value:
                    result = String(condition) === addict.value;
                    break
                case TypeAddictions.NOT_EQUAL.value:
                    result = String(condition) !== addict.value;
                    break
                default:
                    // console.log(currentAddiction, allDs, ls);
                    // console.log('No-no-no!');
                    result = false;
            }

            finalResult.push(result)
            arrayAddictionResult.push({result, addict})
        })


        return { finalResult: finalResult.includes(true), arrayAddictionResult }
        // return finalResult.includes(true)

    }

    const checkRowAddiction = (row: any, addictions: any) => {

        if (!addictions?.length) {
            return true
        }
        let result = true;
        let finalResult: any = [];

        addictions.forEach((addict: IAddictions) => {

            if (addict.type === TypeAddictions.DS.value) {
                return result = allDs[addict.ds] !== undefined;
            }

            if (addict.type === TypeAddictions.NOT_DS.value) {
                return result = allDs[addict.ds] === undefined;
            }

            if (allDs[addict.ds] === undefined && ls === undefined) {
                return result = false
            }

            let condition;
            if (allDs[addict.ds]) {
                const addictDs: any = allDs[addict.ds]
                switch (addict.choice) {
                    case AddictionsChoiceType.ITEM.value:
                        condition = addictDs?.items && addictDs.items.length;
                        break;
                    case AddictionsChoiceType.KEY.value:
                        condition = addictDs?.items.length && addictDs.items[0][addict.dsKey];
                        break;
                    case AddictionsChoiceType.PROP.value:
                        condition = addictDs[addict.dsKey];
                        break;
                    case AddictionsChoiceType.ROW.value:
                        condition = row[addict.dsKey];
                        break;
                    default:
                        break;
                }
            }

            if (addict.choice === AddictionsChoiceType.LS_VARS.value) {
                condition = ls[addict.ds];
            }

            // console.log(condition, currentAddiction);
            switch (addict.type) {
                case TypeAddictions.AVAILABILITY.value:
                    result = !!condition;
                    break
                case TypeAddictions.FAILURE.value:
                    result = !condition;
                    break
                case TypeAddictions.MORE.value:
                    result = +condition > +addict.value;
                    break
                case TypeAddictions.LESS.value:
                    result = +condition < +addict.value;
                    break
                case TypeAddictions.MORE_EQUAL.value:
                    result = +condition >= +addict.value;
                    break
                case TypeAddictions.LESS_EQUAL.value:
                    result = +condition <= +addict.value;
                    break
                case TypeAddictions.EQUALLI.value:
                    result = String(condition) === addict.value;
                    break
                case TypeAddictions.NOT_EQUAL.value:
                    result = String(condition) !== addict.value;
                    break
                default:
                    console.log(currentAddiction, allDs, ls);

                    console.log('No-no-no!');
                    result = false;
            }
            finalResult.push(result)

            // console.log(finalResult);
        })
        // finalResult.push(result)
        return finalResult.includes(true)

    }


    return {
        checkAddiction,
        checkRowAddiction,
    }
}

export default useCheckAddictions