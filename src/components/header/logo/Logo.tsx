import React from 'react';
import {getSettings} from "../../../redux/app/app.selector";
import {Skeleton} from "antd";
import {getCurrentProject} from "../../../redux/project/project.selector";
import {Link} from 'react-router-dom';
import {baseUrl} from "../../../saga/api/api";
import {useTypedSelector} from "../../../hooks";
import {Image, Space} from "antd";
import {RootState} from "../../../redux/redux.store";
import styles from './logo.module.css'

const Logo: React.FC = () => {
    const settings = useTypedSelector((state: RootState) => getSettings(state));
    const currentProject = useTypedSelector((state: RootState) => getCurrentProject(state));
    const settingsSrc = settings.logo ? `${baseUrl}/${settings.logo}?${new Date().getTime()}` : `${baseUrl}/logo.png`;
    const curProjSrc = currentProject?.logo ? `${baseUrl}/${currentProject.logo}?${new Date().getTime()}` : `${baseUrl}/logo.png`;

    const widthLogo: number = 45
    const heightLogo: number = 45

    return (
        <>
            {currentProject?.startpage ? (
                <Link className={styles.logo} key='navLogo' to={currentProject.startpage}>
                    {
                        currentProject && Object.keys(currentProject).length ? (
                            currentProject.loading ? (
                                <Space>
                                    <Skeleton.Avatar active={true} size={25} />
                                    <Skeleton.Button active={true} size={'small'} />
                                </Space>
                            ) : (
                                <>
                                    <Image
                                        preview={false}
                                        src={curProjSrc}
                                        width={widthLogo}
                                        height={heightLogo}
                                        alt={'logo'} />

                                    <span
                                        style={{marginLeft: '10px'}}>{currentProject.banner ? currentProject.banner : settings.title ? settings.title : 'LCP'}</span>
                                </>

                            )
                        ) : (
                            !settings.loading ? (
                                <Space>
                                    <Skeleton.Avatar active={true} size={25} />
                                    <Skeleton.Button active={true} size={'small'} />
                                </Space>
                            ) : (
                                <>
                                    <Image
                                        preview={false}
                                        src={settingsSrc}
                                        width={widthLogo}
                                        height={heightLogo}
                                        alt={'logo'} />
                                    <span
                                        style={{marginLeft: '10px'}}>{settings.title ? settings.title : 'LCP'}</span>
                                </>
                            )
                        )
                    }
                </Link>
            ) : (
                <Space className={styles.logo} key='navLogo'>
                    {
                        currentProject && Object.keys(currentProject).length ? (
                            currentProject.loading ? (
                                <Space>
                                    <Skeleton.Avatar active={true} size={25} />
                                    <Skeleton.Button active={true} size={'small'} />
                                </Space>
                            ) : (
                                <>
                                    <Image
                                        preview={false}
                                        src={curProjSrc}
                                        width={widthLogo}
                                        height={heightLogo}
                                        alt={'logo'} />

                                    <span
                                        style={{marginLeft: '10px'}}>{currentProject.banner ? currentProject.banner : settings.title ? settings.title : 'LCP'}</span>
                                </>

                            )
                        ) : (
                            !settings.loading ? (
                                <Space>
                                    <Skeleton.Avatar active={true} size={25} />
                                    <Skeleton.Button active={true} size={'small'} />
                                </Space>
                            ) : (
                                <>
                                    <Image
                                        preview={false}
                                        src={settingsSrc}
                                        width={widthLogo}
                                        height={heightLogo}
                                        alt={'logo'} />
                                    <span
                                        style={{marginLeft: '10px'}}>{settings.title ? settings.title : 'LCP'}</span>
                                </>
                            )
                        )
                    }
                </Space>
            )}
        </>
    )
};

export default Logo;