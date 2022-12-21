import React, {Suspense} from "react";
import {useTypedSelector} from "../../hooks";
import {getAuth, getEditMode} from "../../redux/app/app.selector";
import {getCurrentProject} from "../../redux/project/project.selector";
import {getDataSourceLs, getDataSourcesAll} from "../../redux/ds/ds.selector";

import AntRow from "./Row/AntRow";
import AntCol from "./Col/AntCol";
import {checkAddiction, checkRole} from "../../utils";

import {RootState} from "../../redux/redux.store";
import {IAddictions} from "../../redux/project/project.initial";

const LazyAntCard = React.lazy(() => import("./Card/AntCard"));
const LazyAntButton = React.lazy(() => import("./Button/AntButton"));
const LazyAntTable = React.lazy(() => import("./Table/AntTable"));
const LazyAntText = React.lazy(() => import("./Text/AntText"));
const LazyAntDivider = React.lazy(() => import("./Divider/AntDivider"));
const LazyAntModal = React.lazy(() => import("./Modal/AntModal"));
const LazyAntTabs = React.lazy(() => import("./Tabs/AntTabs"));
const LazyAntTags = React.lazy(() => import("./Tags/AntTags"));
const LazyAntDetails = React.lazy(() => import("./Details/AntDetails"));
const LazyAntBreadcrumb = React.lazy(() => import("./Breadcrumb/AntBreadcrumb"));
const LazyAntForm = React.lazy(() => import("./Form/AntForm"));
const LazyAntImage = React.lazy(() => import("./Image/AntImage"));
const LazyAntImageGallery = React.lazy(() => import("./Image/AntImageGallery"));
const LazyAntChartPie = React.lazy(() => import("./Charts/AntChartPie"));
const LazyAntChartColumn = React.lazy(() => import("./Charts/AntChartColumn"));
const LazyAntChartBar = React.lazy(() => import("./Charts/AntChartBar"));
const LazyAntChartLine = React.lazy(() => import("./Charts/AntChartLine"));
const LazyAntMultiChartLine = React.lazy(() => import("./Charts/AntChartMultiLine"));
const LazyAndDrawer = React.lazy(() => import("./Drawer/AndDrawer"));
const LazyAntDescriptions = React.lazy(() => import("./Descriptions/AntDescriptions"));
const LazyAntChartScatter = React.lazy(() => import("./Charts/AntChartScatter"));
const LazyAntRadarPlot = React.lazy(() => import("./Charts/AntChartRadarPlot"));
const LazyAntHistogram = React.lazy(() => import("./Charts/AntChartHistogram"));
const LazyAntTableTree = React.lazy(() => import("./Tree/AntTableTree"));
const LazyAntBidirectionalBar = React.lazy(() => import("./Charts/AntBidirectionalBar"));
const LazyAntDropdown = React.lazy(() => import("./Dropdown/AntDropdown"));
const LazyAntSelect = React.lazy(() => import("./Form/AntSelect"));
const LazyAntButtonActions = React.lazy(() => import("./Button/AntButtonActions"));
const LazyAntNavLink = React.lazy(() => import("./Link/AntNavLink"));
const LazyBarCode = React.lazy(() => import("./Barcode/AntBarcode"));
const LazyQRCode = React.lazy(() => import("./QRCode/AntQRCode"));
const LazyPagination = React.lazy(() => import("./Pagination/AntPagination"));
const LazySearch = React.lazy(() => import("./Search/AntSearch"));
const LazyExt = React.lazy(() => import("./Ext/Ext"));
const LazyTest = React.lazy(() => import("./TestComponent/Test"));
const LazyInputsMaster = React.lazy(() => import("./Inputs/InputsMaster"));
const LazyDownLoad = React.lazy(() => import("./DownLoad/AntDownLoad"));

type MasterType = {
    cmp: any
    props?: {[p: string]: string}
}

const Master: React.FC<MasterType> = ({cmp, props}) => {
    const auth = useTypedSelector((state: RootState) => getAuth(state))
    const editMode = useTypedSelector((state: RootState) => getEditMode(state))
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state))

    const addictionId = cmp?.addiction ? Array.isArray(cmp?.addiction) ? cmp?.addiction : [cmp?.addiction] : [];

    const currentAddiction: any = [];
    currentProject?.addictions && addictionId?.forEach((addictId: number) => {
        let res = currentProject?.addictions.filter((item: IAddictions) => item.id === addictId)[0]
        res && currentAddiction.push(res)
    })

    const ls = useTypedSelector((state: RootState) => getDataSourceLs(state))
    const allDs = useTypedSelector((state: RootState) => getDataSourcesAll(state))

    /** не показывать компоненту если нет доступа по acl  */
    if (!editMode) {
        if (!(auth.projects_roles ? checkRole(cmp?.acl, currentProject && auth.projects_roles[currentProject?.key]) : checkRole(cmp?.acl, undefined))) {
            return <></>
        }
    }

    // отображать только те элементы, которые соответствуют условиям зависимостей(addictions)
    if (currentAddiction.length && !editMode) {
        // const currentDs = currentAddiction?.choice === AddictionsChoiceType?.LS_VARS.value ? ls?.vars : ds;
        if (!checkAddiction(false, currentAddiction, allDs, ls)) {
            return <></>
        }
    }

    /** не показывать компоненты которые со свойством visible = false */
    if (cmp?.visible !== undefined && cmp?.visible === false)
        return <></>

    switch (cmp?.type) {
        case 'Row':
            return <AntRow cmp={cmp} props={props} />
        case 'Col':
            return <AntCol cmp={cmp} props={props} />
        case 'Card':
            return <Suspense fallback={<></>}><LazyAntCard cmp={cmp} props={props} /></Suspense>
        case 'Modal':
            return <Suspense fallback={<></>}><LazyAntModal cmp={cmp} props={props} /></Suspense>
        case 'Details':
            return <Suspense fallback={<></>}><LazyAntDetails cmp={cmp} props={props} /></Suspense>
        case 'Tabs':
            return <Suspense fallback={<></>}><LazyAntTabs cmp={cmp} props={props} /></Suspense>
        case 'Tags':
            return <Suspense fallback={<></>}><LazyAntTags cmp={cmp} props={props} /></Suspense>
        case 'Table':
            return <Suspense fallback={<></>}><LazyAntTable cmp={cmp} props={props} /></Suspense>
        case 'TableTree':
            return <Suspense fallback={<></>}><LazyAntTableTree cmp={cmp} /></Suspense>
        case 'Button':
            return <Suspense fallback={<></>}><LazyAntButton cmp={cmp} /></Suspense>
        case 'ButtonActions':
            return <Suspense fallback={<></>}><LazyAntButtonActions cmp={cmp} /></Suspense>
        case 'Text':
            return <Suspense fallback={<></>}><LazyAntText cmp={cmp} /></Suspense>
        case 'Divider':
            return <Suspense fallback={<></>}><LazyAntDivider cmp={cmp} /></Suspense>
        case 'Breadcrumb':
            return <Suspense fallback={<></>}><LazyAntBreadcrumb cmp={cmp} props={props} /></Suspense>
        case 'Form':
            return <Suspense fallback={<></>}><LazyAntForm cmp={cmp} props={props} /></Suspense>
        case 'Select':
            return <Suspense fallback={<></>}><LazyAntSelect cmp={cmp} /></Suspense>
        case 'Image':
            return <Suspense fallback={<></>}><LazyAntImage cmp={cmp} /></Suspense>
        case 'ImageGallery':
            return <Suspense fallback={<></>}><LazyAntImageGallery cmp={cmp} /></Suspense>
        case 'ChartPie':
            return <Suspense fallback={<></>}><LazyAntChartPie cmp={cmp} /></Suspense>
        case 'ChartColumn':
            return <Suspense fallback={<></>}><LazyAntChartColumn cmp={cmp} /></Suspense>
        case 'ChartBar':
            return <Suspense fallback={<></>}><LazyAntChartBar cmp={cmp} /></Suspense>
        case 'ChartLine':
            return <Suspense fallback={<></>}><LazyAntChartLine cmp={cmp} /></Suspense>
        case 'ChartMultiLine':
            return <Suspense fallback={<></>}><LazyAntMultiChartLine cmp={cmp} /></Suspense>
        case 'ChartScatter':
            return <Suspense fallback={<></>}><LazyAntChartScatter cmp={cmp} /></Suspense>
        case 'ChartRadarPlot':
            return <Suspense fallback={<></>}><LazyAntRadarPlot cmp={cmp} /></Suspense>
        case 'ChartHistogram':
            return <Suspense fallback={<></>}><LazyAntHistogram cmp={cmp} /></Suspense>
        case 'BidirectionalBar':
            return <Suspense fallback={<></>}><LazyAntBidirectionalBar cmp={cmp} /></Suspense>
        case 'Drawer':
            return <Suspense fallback={<></>}> <LazyAndDrawer cmp={cmp} props={props} /></Suspense>
        case 'Descriptions':
            return <Suspense fallback={<></>}><LazyAntDescriptions cmp={cmp} /></Suspense>
        case 'Dropdown':
            return <Suspense fallback={<></>}><LazyAntDropdown cmp={cmp} /></Suspense>
        case 'NavLink':
            return <Suspense fallback={<></>}><LazyAntNavLink cmp={cmp} /></Suspense>
        case 'BarCode':
            return <Suspense fallback={<></>}><LazyBarCode cmp={cmp} /></Suspense>
        case 'QRCode':
            return <Suspense fallback={<></>}><LazyQRCode cmp={cmp} /></Suspense>
        case 'Pagination':
            return <Suspense fallback={<></>}><LazyPagination cmp={cmp} /></Suspense>
        case 'Search':
            return <Suspense fallback={<></>}><LazySearch cmp={cmp} /></Suspense>
        case 'Test':
            return <Suspense fallback={<></>}><LazyTest cmp={cmp} /></Suspense>
        case 'Input':
            return <Suspense fallback={<></>}><LazyInputsMaster cmp={cmp} /></Suspense>
        case 'Ext':
            return <Suspense fallback={<></>}> <LazyExt cmp={cmp} props={props} /></Suspense>
        case 'DownLoad':
            return <Suspense fallback={<></>}> <LazyDownLoad cmp={cmp} /></Suspense>
    }

    return <></>
}

export default Master