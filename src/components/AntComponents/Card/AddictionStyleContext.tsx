import React, {createContext, useContext, useMemo} from 'react'
import {IAddictionStyleArray, IProject} from "../../../redux/project/project.initial";

const AddictionStyleContext = createContext<any>({})

export const AddictionStyleProvider = ({
                                           children,
                                           cmp,
                                           currentProject,
                                           addictionStyleArray,
                                           setAddictionStyleArray
                                       }:
                                           {
                                               children: React.ReactNode,
                                               cmp: any,
                                               currentProject: IProject | undefined,
                                               addictionStyleArray: IAddictionStyleArray[] | [],
                                               setAddictionStyleArray: (a: IAddictionStyleArray[] | []) => void
                                           }) => {

    const value = useMemo(() => ({
        cmp,
        currentProject,
        addictionStyleArray,
        setAddictionStyleArray
    }), [cmp, currentProject, addictionStyleArray]);

    return <AddictionStyleContext.Provider value={value}>
        {children}
    </AddictionStyleContext.Provider>
}

export const useData = () => useContext(AddictionStyleContext)