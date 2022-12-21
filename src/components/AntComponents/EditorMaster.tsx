import React, {Suspense} from 'react';
// import AntPaginationEdit from "./Pagination/AntPaginationEdit";
const AntRowEditLazy = React.lazy(() => import('./Row/AntRowEdit'))
const AntColEditLazy = React.lazy(() => import('./Col/AntColEdit'))
const AntCardEditLazy = React.lazy(() => import('./Card/AntCardEdit'))
const AntTabsEditLazy = React.lazy(() => import('./Tabs/AntTabsEdit'))
const AntBreadcrumbEditLazy = React.lazy(() => import('./Breadcrumb/AntBreadcrumbEdit'))
const AntButtonEditLazy = React.lazy(() => import('./Button/AntButtonEdit'))
const AntTextEditLazy = React.lazy(() => import('./Text/AntTextEdit'))
const AntImageEditLazy = React.lazy(() => import('./Image/AntImageEdit'))
const AntTableEditLazy = React.lazy(() => import('./Table/AntTableEdit'))
const AntDrawerEditLazy = React.lazy(() => import('./Drawer/AntDrawerEdit'))
const AntFormEditLazy = React.lazy(() => import('./Form/AntFormEdit'))
const AntSelectEditLazy = React.lazy(() => import('./Form/AntSelectEdit'))
const AntDividerEditLazy = React.lazy(() => import('./Divider/AntDividerEdit'))
const AntTableTreeEditLazy = React.lazy(() => import('./Tree/AntTableTreeEdit'))
const AntModalEditLazy = React.lazy(() => import('./Modal/AntModalEdit'))
const AntDescriptionsEditLazy = React.lazy(() => import('./Descriptions/AntDescriptionsEdit'))
const AntNavLinkEditLazy = React.lazy(() => import('./Link/AntNavLinkEdit'))
const AntChardBarEditLazy = React.lazy(() => import('./Charts/AntChartEdit'))
const AntBarCodeEditLazy = React.lazy(() => import('./Barcode/AntBarCodeEdit'))
const AntQRCodeEditLazy = React.lazy(() => import('./QRCode/AntQRCodeEdit'))
const AntPaginationEditLazy = React.lazy(() => import('./Pagination/AntPaginationEdit'))
const AntSearchEditLazy = React.lazy(() => import("./Search/AntSearchEdit"));
const ExtEditLazy = React.lazy(() => import("./Ext/ExtEdit"));
const AntInputsEditLazy = React.lazy(() => import("./Inputs/AntInputsEdit"));
const AntDownLoadEditLazy = React.lazy(() => import("./DownLoad/AntDownLoadEdit"));


type EditorMasterType = {
    cmp: any
    setVisible?: (v: boolean) => void
}
const EditorMaster: React.FC<EditorMasterType> = ({cmp, setVisible}) => {

    switch (cmp.type) {
        case 'Row':
            return <Suspense fallback={<></>}><AntRowEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Col':
            return <Suspense fallback={<></>}><AntColEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Card':
            return <Suspense fallback={<></>}><AntCardEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Tabs':
            return <Suspense fallback={<></>}><AntTabsEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Breadcrumb':
            return <Suspense fallback={<></>}><AntBreadcrumbEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Button':
            return <Suspense fallback={<></>}><AntButtonEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Text':
            return <Suspense fallback={<></>}><AntTextEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Image':
            return <Suspense fallback={<></>}><AntImageEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Table':
            return <Suspense fallback={<></>}><AntTableEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Drawer':
            return <Suspense fallback={<></>}><AntDrawerEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Form':
            return <Suspense fallback={<></>}><AntFormEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Select':
            return <Suspense fallback={<></>}><AntSelectEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Divider':
            return <Suspense fallback={<></>}><AntDividerEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'TableTree':
            return <Suspense fallback={<></>}><AntTableTreeEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Modal':
            return <Suspense fallback={<></>}><AntModalEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Descriptions':
            return <Suspense fallback={<></>}><AntDescriptionsEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'NavLink':
            return <Suspense fallback={<></>}><AntNavLinkEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'ChartBar':
            return <Suspense fallback={<></>}><AntChardBarEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'ChartPie':
            return <Suspense fallback={<></>}><AntChardBarEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'ChartColumn':
            return <Suspense fallback={<></>}><AntChardBarEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'BarCode':
            return <Suspense fallback={<></>}><AntBarCodeEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'QRCode':
            return <Suspense fallback={<></>}><AntQRCodeEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Pagination':
            return <Suspense fallback={<></>}><AntPaginationEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Search':
            return <Suspense fallback={<></>}><AntSearchEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Ext':
            return <Suspense fallback={<></>}><ExtEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'Input':
            return <Suspense fallback={<></>}><AntInputsEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>
        case 'DownLoad':
            return <Suspense fallback={<></>}><AntDownLoadEditLazy cmp={cmp} setVisible={setVisible} /></Suspense>

        default:
            return <>Ничего нет</>
    }
};

export default EditorMaster;