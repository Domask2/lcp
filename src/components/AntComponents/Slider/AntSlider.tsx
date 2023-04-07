import React, {useEffect, useState} from "react";
import Editor from "../Editor/Editor";
import ScrollableAnchor from "react-scrollable-anchor";
import {Carousel} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import Master from "../Master";
import {ISlider} from "../Page/templates";

type SliderType = {
    cmp: ISlider;
};

interface AntdArrowProps {
    currentSlide?: number
    slideCount?: number
}

interface ArrowProps {
    direction: 'left' | 'right'
}

const AntSlider: React.FC<SliderType> = ({cmp}: any) => {

    const [value, setValue] = useState<any>()

    const time = () => {
        if (cmp.effect === 'fade') {
            setValue(`${new Date().getHours().toString().length === 2 ? new Date().getHours().toString() : `0${new Date().getHours().toString()}`}`)
        } else {
            setValue(`${new Date().getMinutes().toString().length === 2 ? new Date().getMinutes().toString() : `0${new Date().getMinutes().toString()}`}`)

        }
    }
    useEffect(() => {
        const timerID = setInterval(() => time(), 1000);
        return () => clearInterval(timerID);
    })

    const Arrow = ({currentSlide, direction, slideCount, ...carouselProps}: ArrowProps & AntdArrowProps) => {
        return direction === 'left' ? (
            <LeftOutlined {...carouselProps} />
        ) : (
            <RightOutlined {...carouselProps} />
        )
    }

    return <>
        {cmp.anchor && <ScrollableAnchor id={`${cmp.anchor}`}>
            <span></span>
        </ScrollableAnchor>}
        <Editor cmp={cmp} />
        <Carousel
            autoplay={cmp.autoplay}
            autoplaySpeed={cmp.autoplaySpeed ? cmp.autoplaySpeed : 3000}
            arrows={cmp.arrows}
            effect={cmp.effect}
            prevArrow={<Arrow direction="left" />}
            nextArrow={<Arrow direction="right" />}
            style={cmp.style}
            dots={cmp.dots}
        >
            {cmp.timeMode ? (
                <div>
                    <h1 style={{fontSize: '24px', textAlign: 'center'}}>
                        {value}
                    </h1>
                </div>
            ) : (
                cmp.children.map((item: any, index: any) => <Master key={`${item.key}_carousel_${index}`} cmp={item} />)
            )}
            {/* {cmp.timeMode ? (
                <div>
                    <h1 style={{fontSize: '20px', textAlign: 'center'}}>
                        {value}
                    </h1>
                </div>
            ) : (
                ''
            )}
            {!cmp.timeMode ? cmp.children.map((item2: any) => <Master key={item2.key} cmp={item2} />) : ''} */}
        </Carousel>
    </>
}

export default AntSlider