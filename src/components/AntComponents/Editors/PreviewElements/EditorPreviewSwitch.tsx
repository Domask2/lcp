import React, {memo} from "react";
import {Image, Button, Card, Divider, Skeleton} from 'antd';
import {ComponentsType} from "../../../../editorUtils/editorDictionaries";
import Mapped from "../../Mapped";
import BreadcrumbPreviewElement from "./BreadcrumbPreviewElement";
import NavLinkPreviewElement from "./NavLinkPreviewElement";
import BarCodePreviewElement from "./BarCodePreviewElement";
import QrCodePreviewElement from "./QrCodePreviewElement";
import FlyInputsPreviewElement from "./FlyInputsPreviewElement";

type AntInputType = {
    props: any
}

const EditorPreviewSwitch: React.FC<AntInputType> = ({props}) => {

    const renderPreview = () => {
        switch (props.value.type) {
            case ComponentsType.CARD:
                return <>
                    <h4>Пример</h4>
                    <Card
                        size={props.value.props.size}
                        className={props.value.className}
                        style={props.value.style}
                        bodyStyle={props.value.bodyStyle}
                        headStyle={props.value.headStyle}
                        title={props.value.caption}
                    >
                        <Skeleton avatar paragraph={{rows: 4}} />
                    </Card>
                    <br />
                </>
            case ComponentsType.DIVIDER:
                return <>
                    <h4>Пример</h4>
                    <Card size="small" bodyStyle={{padding: 0}}>
                        <Divider style={props.value.style} children={props.value.caption} />
                    </Card>
                </>
            case ComponentsType.BUTTON:
                return <Card size="small">
                    <h4>Пример</h4>
                    <Button style={props.value.style} {...props.value.props}>
                        <Mapped text={props.value.caption} />
                    </Button>
                </Card>
            case ComponentsType.MODAL:
                return <Card size="small">
                    <h4>Пример</h4>
                    <Button style={props.value.style} {...props.value.button}>
                        <Mapped text={props.value.button.title} />
                    </Button>
                </Card>
            case ComponentsType.DRAWER:
                return <Card className="cardEdit" size="small">
                    <h4>Пример</h4>
                    <Button style={props.value.style} {...props.value.button}>
                        <Mapped text={props.value.button.title} />
                    </Button>
                </Card>
            case ComponentsType.INPUT:
                return <Card className="cardEdit" size="small">
                    <h4>Пример</h4>
                    <FlyInputsPreviewElement props={props} />
                </Card>
            case ComponentsType.NAV_LINK:
                return <Card size="small">
                    <NavLinkPreviewElement props={props} />
                </Card>
            case ComponentsType.BREADCRUMB:
                return <BreadcrumbPreviewElement props={props} />
            case ComponentsType.IMAGE:
                return <Card size="small">
                    <div style={{display: 'inline-block', ...props.value.style}}>
                        <Image {...props.value.props} width={props.value.props.width && +props.value.props.width} height={props.value.props.height && +props.value.props.height} src={props.value.props.src} />
                    </div>
                </Card>
            case ComponentsType.IMAGE_GALLERY:
                return <Card size="small">
                    <div style={{display: 'inline-block', ...props.value.style}}>
                        <Image {...props.value.props} width={props.value.props.width && +props.value.props.width} height={props.value.props.height && +props.value.props.height} src={props.value.props.src} />
                    </div>
                </Card>
            case ComponentsType.BAR_CODE:
                return <Card size="small">
                    <BarCodePreviewElement props={props} />
                </Card>
            case ComponentsType.QR_CODE:
                return <Card size="small">
                    <QrCodePreviewElement props={props} />
                </Card>
            default:
                break;
        }
    }

    return <>{renderPreview()}</>
}

export default memo(EditorPreviewSwitch)