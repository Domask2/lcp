import React, {createRef, CSSProperties, Suspense, useEffect, useState} from 'react';
import {Button, Input, Tabs} from 'antd';
import {IPage} from '../../../redux/project/project.initial';
import {useLocation} from 'react-router-dom';
import {changeKey, searchParams} from '../../../utils';
import {useTypedSelector} from '../../../hooks';
import {RootState} from '../../../redux/redux.store';
import {getProjectsAll} from '../../../redux/project/project.selector';
import EditorPopoverElement from '../Editors/InputsElements/EditorPopoverElement';
import {FileTextOutlined, SaveOutlined, SettingOutlined} from "@ant-design/icons";
import PageSettings from "./PageSettings";

type ToolbarType = {
    page: IPage
    openModalFileSystem: () => void
    onSave: () => void
}

const Toolbar: React.FC<ToolbarType> = ({page, openModalFileSystem, onSave}) => {
    const [open, setOpen] = useState(false);
    const [left, setLeft] = useState(false);
    const [startDrop, setStartDrop] = useState<number>(0);
    // const [move, setMove] = useState<number>(0);
    const [endDrop, setEndDrop] = useState<number>(0);
    const [topPosition, setTopPosition] = useState<number>(100);
    const [leftPosition, setLeftPosition] = useState<number>(0);
    const [rightPosition, setRightPosition] = useState<number>(0);
    const [width, setWidth] = useState<string>('-400px');
    const [string, setString] = useState<string>('');
    const [value, setValue] = useState<string>('');

    const projectsAll = useTypedSelector((state: RootState) => getProjectsAll(state));
    let newObj = JSON.parse(JSON.stringify(Object.values(projectsAll)));
    newObj.map((pr: any) => pr.children = pr.navigation);
    newObj.forEach((pr: any) => changeKey(pr, ''));

    const refComponent: any = createRef();
    const location = useLocation().pathname.split('/');

    const params = searchParams(newObj, location.slice(1), 0);

    useEffect(() => {
        string && setValue(`${value}${string}`);
        setString('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [string]);

    const setLeftOrRightPosition = () => {
        if (left) {
            return {
                left: open ? '0px' : width
                // left: open ? '0px' : `${refComponent?.current?.clientWidth - 30}px`
            }
        } else {
            return {
                right: open ? '0px' : width
                // right: open ? '-20px' : `${refComponent?.current?.clientWidth - 30}px`
            }
        }
    };

    const toolbarStyle: any = {
        display: 'flex',
        flexDirection: left ? 'row-reverse' : 'row',
        position: 'fixed',
        minWidth: '400px',
        minHeight: '10px',
        top: topPosition,
        backgroundColor: 'rgba(255, 249, 181, 0.4)',
        zIndex: '1001',
        transition: 'all .5s ',
        borderRadius: left ? '0px 8px 8px 0px' : '8px 0px 0px 8px',
        backdropFilter: 'blur(5px)',
        boxShadow: '0 0 10px #b1b1b1',
        ...setLeftOrRightPosition(),
        fontSize: '12px',
        // cursor: 'move',
    };

    const buttonStyle = {
        flexGrow: 1,
        // border: 'none',
        color: '#ffffff',
        height: '100%',
        lineHeight: '18px',
        padding: '23px 13px 31px',
        border: open ? '1px solid rgba(178, 34, 34, 0)' : '1px solid #ffffff',
        borderRadius: left ? '0px 7px 7px 0px' : '7px 0px 0px 7px',
        fontSize: '24px',
        backgroundColor: open ? 'rgba(178, 34, 34, 0.3)' : 'rgba(128, 128, 0, 0.3)',
        transition: 'all .5s ',
    };

    const buttonStyle2: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        color: '#ffffff',
        height: '100%',
        lineHeight: '18px',
        padding: '20px 0x',
        border: open ? '1px solid rgba(178, 34, 34, 0)' : '1px solid #ffffff',
        borderRadius: left ? '0px 7px 7px 0px' : '7px 0px 0px 7px',
        fontSize: '24px',
        // backgroundColor: open ? 'rgba(178, 34, 34, 0.3)' : 'rgba(128, 128, 0, 0.3)',
        transition: 'all .5s ',
    };

    useEffect(() => {
        if (refComponent.current) {
            setWidth(`-${refComponent?.current?.clientWidth - 30}px`);
        }
    }, [refComponent]);

    useEffect(() => {
        const position = topPosition + endDrop - startDrop;
        if (position < 0) {
            setTopPosition(0)
        } else if (position > (+window.innerHeight - +refComponent.current.clientHeight)) {
            setTopPosition(+window.innerHeight - +refComponent.current.clientHeight)
        } else {
            setTopPosition(position);
        }
        // console.log('leftPosition:', leftPosition); console.log('rightPosition:', rightPosition); console.log('topPosition:', topPosition);
        if (leftPosition < 300) {
            setLeft(true);
        }
        if (rightPosition > -400) {
            setLeft(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDrop]);

    const showDrawer = () => {
        setOpen(!open);
    };

    // const geo = navigator.geolocation;
    // console.log(geo.getCurrentPosition((e: any) => {
    //     console.log(e);
    // }));

    return (
        <div
            ref={refComponent}
            draggable={true}
            style={toolbarStyle}
            onDragStart={(evt: any) => {
                setStartDrop(evt.screenY);
            }}
            // onDrag={(evt: any) => {
            //     setMove(evt.screenY);
            // }}
            onDragEnd={(evt: any) => {
                setEndDrop(evt.screenY);
                setLeftPosition(evt.clientX);
                setRightPosition(evt.screenX);
            }}
        >
            {/* <div
                onMouseDown={(evt: any) => {
                    console.log(evt);
                }}
                onMouseMove={(evt: any) => {
                    console.log(evt);
                }}
                onMouseUp={(evt: any) => {
                    console.log(evt);
                }}
                style={{cursor: 'ew-resize', width: '3px', marginLeft: '-3px'}}
            ></div> */}

            <div style={buttonStyle2}>
                <Button style={buttonStyle}
                        onClick={showDrawer}>
                    :<br/>:<br/>:
                </Button>

                <div style={buttonStyle2}>
                    <Button type="text" onClick={openModalFileSystem} icon={<FileTextOutlined/>}/>
                    {page && <PageSettings page={page} titleBtn={''}/>}
                    <Button type="text" onClick={onSave} icon={<SaveOutlined/>}/>
                </div>
            </div>
            <div style={{width: '100%', color: 'black'}}>
                <div style={{width: '100%', padding: '1px 15px', borderBottom: '1px solid black'}}>
                    <span style={{fontWeight: 'bold'}}>ID страницы: </span> {page?.id}
                    {!!params && <><span
                        style={{fontWeight: 'bold', marginLeft: '10px'}}>Параметр:</span> {params.split('?')}</>}
                </div>
                {page?.datasources && !!Object.keys(page.datasources).length &&
                    <div style={{display: 'flex', padding: '5px 15px'}}>
                        <p style={{
                            fontWeight: 'bold',
                            marginRight: '5px',
                            marginBottom: '0px',
                            paddingRight: '5px',
                            borderRight: '1px solid gray'
                        }}>DS:</p>
                        <div>{page?.datasources && Object.keys(page.datasources).map((item: string, index: number) => {
                            return (
                                <div key={`${item}_${index}`} style={{userSelect: 'text'}}>
                                    <span>{page?.datasources[item].key}</span>
                                    <span
                                        style={{fontSize: '11px'}}>{` ${page?.datasources[item].filter ? `(${page?.datasources[item].filter})` : ''}`}</span>
                                </div>
                            )
                        })}</div>
                    </div>}
                {!!page?.fnc?.length && <div style={{display: 'flex', padding: '5px 15px'}}>
                    <p style={{
                        fontWeight: 'bold',
                        marginRight: '5px',
                        marginBottom: '0px',
                        paddingRight: '5px',
                        borderRight: '1px solid gray'
                    }}>Fnc:</p>
                    <div>{page?.fnc?.map((item: any, index: number) => {
                        return (
                            <div key={`${item.source}_${index}`} style={{userSelect: 'text'}}>{item.source}</div>
                        )
                    })}</div>
                </div>}
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <EditorPopoverElement setValue={setString}/>
                    <Input
                        style={{flexGrow: 1, height: '24px', fontSize: '13px'}}
                        size='small'
                        value={value}
                        onChange={(e: any) => {
                            setValue(e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Toolbar;