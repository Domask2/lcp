import React, {Suspense} from 'react';
const LazyStepBackwardOutlined = React.lazy(() => import("./Icons/AntStepBackwardOutlined"));
const LazyStepForwardOutlined = React.lazy(() => import("./Icons/AntStepForwardOutlined"));
const LazyArrowUpOutlined = React.lazy(() => import("./Icons/AntArrowUpOutlined"));
const LazyArrowDownOutlined= React.lazy(() => import("./Icons/AntArrowDownOutlined"));
const LazyArrowLeftOutlined = React.lazy(() => import("./Icons/AntArrowLeftOutlined"));
const LazyArrowRightOutlined = React.lazy(() => import("./Icons/AntArrowRightOutlined"));
const LazyPrinterOutlined = React.lazy(() => import("./Icons/AntPrinterOutlined"));
const LazyBarChartOutlined = React.lazy(() => import("./Icons/AntBarChartOutlined"));
const LazyPieChartOutlined = React.lazy(() => import("./Icons/AntPieChartOutlined"));
const LazyLineChartOutlined = React.lazy(() => import("./Icons/AntLineChartOutlined"));
const LazyDotChartOutlined = React.lazy(() => import("./Icons/AntDotChartOutlined"));
const LazyAreaChartOutlined = React.lazy(() => import("./Icons/AntAreaChartOutlined"));
const LazyFilterOutlined = React.lazy(() => import("./Icons/AntFilterOutlined"));
const LazyCloudDownloadOutlined = React.lazy(() => import("./Icons/AntCloudDownloadOutlined"));
const LazyCloudUploadOutlined = React.lazy(() => import("./Icons/AntCloudUploadOutlined"));
const LazyIdcardOutlined = React.lazy(() => import("./Icons/AntIdcardOutlined"));
const LazyPlusOutlined = React.lazy(() => import("./Icons/AntPlusOutlined"));
const LazyPlusCircleOutlined = React.lazy(() => import("./Icons/AntPlusCircleOutlined"));
const LazyEditOutlined = React.lazy(() => import("./Icons/AntEditOutlined"));
const LazyOrderedListOutlined = React.lazy(() => import("./Icons/AntOrderedListOutlined"));
const LazyUnorderedListOutlined = React.lazy(() => import("./Icons/AntUnorderedListOutlined"));
const LazyCheckOutlined = React.lazy(() => import("./Icons/AntCheckOutlined"));
const LazyCheckCircleOutlined = React.lazy(() => import("./Icons/AntCheckCircleOutlined"));
const LazyCheckSquareOutlined = React.lazy(() => import("./Icons/AntCheckSquareOutlined"));
const LazySearchOutlined = React.lazy(() => import("./Icons/AntSearchOutlined"));
const LazyGoogleOutlined = React.lazy(() => import("./Icons/AntGoogleOutlined"));

type AntIconType = {
    name: string
    style?: React.CSSProperties
}
const AntIcon:React.FC<AntIconType> = ({name, style}) => {

    switch (name) {
        case "StepBackwardOutlined":
            return <Suspense fallback={<></>}><LazyStepBackwardOutlined style={style} /></Suspense>
        case "StepForwardOutlined":
            return <Suspense fallback={<></>}><LazyStepForwardOutlined style={style} /></Suspense>
        case "ArrowUpOutlined":
            return <Suspense fallback={<></>}><LazyArrowUpOutlined style={style} /></Suspense>
        case "ArrowDownOutlined":
            return <Suspense fallback={<></>}><LazyArrowDownOutlined style={style} /></Suspense>
        case "ArrowLeftOutlined":
            return <Suspense fallback={<></>}><LazyArrowLeftOutlined style={style} /></Suspense>
        case "ArrowRightOutlined":
            return <Suspense fallback={<></>}><LazyArrowRightOutlined style={style} /></Suspense>
        case "PrinterOutlined":
            return <Suspense fallback={<></>}><LazyPrinterOutlined style={style} /></Suspense>
        case "BarChartOutlined":
            return <Suspense fallback={<></>}><LazyBarChartOutlined style={style} /></Suspense>
        case "PieChartOutlined":
            return <Suspense fallback={<></>}><LazyPieChartOutlined style={style} /></Suspense>
        case "LineChartOutlined":
            return <Suspense fallback={<></>}><LazyLineChartOutlined style={style} /></Suspense>
        case "DotChartOutlined":
            return <Suspense fallback={<></>}><LazyDotChartOutlined style={style} /></Suspense>
        case "AreaChartOutlined":
            return <Suspense fallback={<></>}><LazyAreaChartOutlined style={style} /></Suspense>
        case "FilterOutlined":
            return <Suspense fallback={<></>}><LazyFilterOutlined style={style} /></Suspense>
        case "CloudDownloadOutlined":
            return <Suspense fallback={<></>}><LazyCloudDownloadOutlined style={style} /></Suspense>
        case "CloudUploadOutlined":
            return <Suspense fallback={<></>}><LazyCloudUploadOutlined style={style} /></Suspense>
        case "IdcardOutlined":
            return <Suspense fallback={<></>}><LazyIdcardOutlined style={style} /></Suspense>
        case "PlusOutlined":
            return <Suspense fallback={<></>}><LazyPlusOutlined style={style} /></Suspense>
        case "PlusCircleOutlined":
            return <Suspense fallback={<></>}><LazyPlusCircleOutlined style={style} /></Suspense>
        case "EditOutlined":
            return <Suspense fallback={<></>}><LazyEditOutlined style={style} /></Suspense>
        case "OrderedListOutlined":
            return <Suspense fallback={<></>}><LazyOrderedListOutlined style={style} /></Suspense>
        case "UnorderedListOutlined":
            return <Suspense fallback={<></>}><LazyUnorderedListOutlined style={style} /></Suspense>
        case "CheckOutlined":
            return <Suspense fallback={<></>}><LazyCheckOutlined style={style} /></Suspense>
        case "CheckCircleOutlined":
            return <Suspense fallback={<></>}><LazyCheckCircleOutlined style={style} /></Suspense>
        case "CheckSquareOutlined":
            return <Suspense fallback={<></>}><LazyCheckSquareOutlined style={style} /></Suspense>
        case "SearchOutlined":
            return <Suspense fallback={<></>}><LazySearchOutlined style={style} /></Suspense>
        case "GoogleOutlined":
            return <Suspense fallback={<></>}><LazyGoogleOutlined style={style} /></Suspense>

        default:
            return <></>
    }
};

export default AntIcon;