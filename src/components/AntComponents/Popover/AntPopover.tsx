import React, {useState} from 'react';
import {Popover, Typography} from "antd";
const {Text} = Typography;

type AntPopoverType = {
    title?: string | React.ReactNode
    hoverText?: string | React.ReactNode
    clickText?: string
    children?: React.ReactNode
    underline?: boolean
}
const AntPopover: React.FC<AntPopoverType> = ({title, hoverText, clickText, children, underline = true}) => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    const underlineStyle = underline ? {
        borderBottom: '1px dashed #999'
    } : {}

    const hide = () => {
        setClicked(false);
        setHovered(false);
    };

    const handleHoverChange = (visible: boolean) => {
        setHovered(visible);
        setClicked(false);
    };

    const handleClickChange = (visible: boolean) => {
        if (clickText) {
            setHovered(false);
            setClicked(visible);
        }
    };

    const hoverContent = <div>{hoverText}</div>;
    const clickContent = <div>{clickText}</div>;
    return (
        <Popover
            style={{width: 500}}
            content={hoverContent}
            trigger="hover"
            visible={hovered}
            onVisibleChange={handleHoverChange}
        >
            <Popover
                content={
                    <div>
                        {clickContent}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a onClick={hide}>Close</a>
                    </div>
                }
                title="Click title"
                trigger="click"
                visible={clicked}
                onVisibleChange={handleClickChange}
            >
                {children ? children : <Text style={underlineStyle}>{title}</Text>}

            </Popover>
        </Popover>
    );
};

export default AntPopover;