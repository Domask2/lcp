import appActionCreators from "./app/app.action.creators";
import dsActionCreators from "./ds/ds.action.creators";
import {projectActionCreators} from "./project/project.action.creators";
import fncActionCreators from "./fnc/fnc.action.creators";
import remoteActionCreators from "./remote/remote.action.creators";
import fileSystemActionCreators from "./fileSystem/fileSystem.action.creators";

export const allActionCreators = {
    ...appActionCreators,
    ...dsActionCreators,
    ...projectActionCreators,
    ...fncActionCreators,
    ...remoteActionCreators,
    ...fileSystemActionCreators
}