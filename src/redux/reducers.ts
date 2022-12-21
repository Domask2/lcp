import appReducer from "./app/app.reducer";
import dsReducer from "./ds/ds.reducer";
import projectReducer from "./project/project.reducer";
import fncReducer from "./fnc/fnc.reducer";
import remoteReducer from "./remote/remote.reducer";
import fileSystemReducer from "./fileSystem/fileSystem.reducer";

const reducers = {
    app: appReducer,
    ds: dsReducer,
    project: projectReducer,
    fnc: fncReducer,
    remote: remoteReducer,
    fileSystem: fileSystemReducer
}

export default reducers