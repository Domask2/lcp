import React from 'react';
import {NavLink} from "react-router-dom";
import {useTypedSelector} from "../../../hooks";
import Editor from "../Editor/Editor";

import Mapped from "../Mapped";
import {getMappedText} from "../../../redux/ds/ds.selector";

import {INavLink} from "../Page/templates";
import {RootState} from "../../../redux/redux.store";

type AntNavLinkType = {
    cmp: INavLink
}
const AntNavLink: React.FC<AntNavLinkType> = ({cmp}) => {
    const text = useTypedSelector((state: RootState) => getMappedText(state, cmp.text))
    const url = useTypedSelector((state: RootState) => getMappedText(state, cmp.url))


    let styles: any = cmp.style
    styles = styles.length === 0 ? {} : styles

    const handleClickGoToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    if (cmp?.url?.split('')[0] === '#') {
        if (cmp?.url?.split('#')[1] === 'up') {
            return <>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Editor cmp={cmp} />
                <a
                    style={styles}
                    href="#"
                    onClick={handleClickGoToTop}> <Mapped text={text} /> </a>
                &nbsp;
                {cmp.lineBreak ? <br /> : ''}
            </>
        }

        return <>
            <Editor cmp={cmp} />
            {
                cmp.target ? (
                    <a
                        style={styles}
                        href={url.toString()}
                        rel="noreferrer"
                        target='_blank'
                    >
                        <Mapped text={text} />
                    </a>

                ) : (
                    <a
                        style={styles}
                        href={url.toString()}> <Mapped text={text} /> </a>
                )
            }
            &nbsp;
            {cmp.lineBreak ? <br /> : ''}
        </>
    } else {
        return <>
            <Editor cmp={cmp} />
            {
                cmp.target ? (
                    <NavLink
                        style={styles}
                        to={url ? {pathname: url.toString()} : {pathname: cmp.url}} target='_blank'> <Mapped text={text} />
                    </NavLink>
                ) : (
                    <NavLink
                        style={styles}
                        to={url ? {pathname: url.toString()} : {pathname: cmp.url}}> <Mapped text={text} />
                    </NavLink>
                )
            }
            &nbsp;
            {cmp.lineBreak ? <br /> : ''}
        </>
    }

};

export default AntNavLink;