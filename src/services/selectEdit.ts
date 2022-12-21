export const getDsParamArray = (ds:any, dsArr:any, dsApp:any) => {
    let arrayParamDs: any = []
    if (ds && dsApp) {
        const [dsKey, dsKey_pro] = ds.key.split('/')
        let dsAppKey = dsApp?.filter((ds: any) => ds.key === dsKey)
        let dsArrayKey = dsAppKey.length ? dsAppKey[0].dataSources?.filter((ds: any) => ds.key === dsKey_pro) : []
        if(dsArrayKey.length) {
            dsArrayKey[0].dataSourceFields?.forEach((ds: any) => {
                arrayParamDs.push(ds.key)
            })
        }
    }

    return arrayParamDs;
}