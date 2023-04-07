import React, {useEffect, useState} from "react";
import {useAction} from "../../../hooks";
import {IActionsType} from "../Page/templates";

type IteratorHOCType = {
    WrappedComponent: any,
    cmp: any,
    index: number,
    item: any
};


const WithIteratorComponents = ({WrappedComponent, cmp, index, item}: IteratorHOCType) => {


    useEffect(() => {
        // console.log(cmp)
    })

    // const CheckActions = (cmp: any) => {

    //     if (cmp.children) {
    //         if (cmp.actions?.length) {
    //             console.log(item, cmp.actions);
    //             // action.onClick()
    //         } else {
    //             cmp.children.map((item: any) => CheckActions(item))
    //         }
    //     } else {
    //         if (cmp.actions?.length) {
    //             console.log(item, cmp.actions);
    //         } else {
    //             return
    //         }
    //     }
    // }

    // const useActions = (action: any, key: string) => {
    //     action.onClick()
    // }

    const props = {
        index,
        item,
        // CheckActions
    }

    return <WrappedComponent key={`${cmp.key}_${index}`} cmp={cmp} props={props} />;
};

export default WithIteratorComponents