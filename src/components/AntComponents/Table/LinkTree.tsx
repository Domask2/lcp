import React, {useEffect, useState} from 'react';
import {useTypedSelector} from '../../../hooks';
import {getProjectsAll} from '../../../redux/project/project.selector';
import {changeKey, searchParams} from '../../../utils';
import Modal from 'antd/lib/modal/Modal';
import {DeleteOutlined, MoreOutlined} from '@ant-design/icons';
import {Button, Col, Input, Row, Tree} from 'antd';
import {RootState} from '../../../redux/redux.store';

interface ILinkTree {
    item: any
    setItem: (item: any) => void
}

const LinkTree: React.FC<ILinkTree> = ({item, setItem}) => {
    const [isVisible, setVisible] = useState<boolean>(false);
    const [params, setParams] = useState<any>(item && item.split(':')[1]);
    const [selectedKey, setKey] = useState<any>(item && item.split(':')[0]);
    const projectsAll = useTypedSelector((state: RootState) => getProjectsAll(state))

    let newObj = JSON.parse(JSON.stringify(Object.values(projectsAll)));
    newObj.map((pr: any) => pr.children = pr.navigation);
    newObj.forEach((pr: any) => changeKey(pr, ''));

    const handleOk = () => {
        params ? setItem(`${selectedKey.toString()}/:${params}`) : setItem(selectedKey.toString());
        setVisible(false);
    }

    const handleCancel = () => {
        setItem(item)
        setVisible(false);
    }

    useEffect(() => {
        if (selectedKey) {
            let arr = selectedKey[0].split('/');
            arr.splice(0, 1);
            let pageParams = searchParams(newObj, arr, 0) ? searchParams(newObj, arr, 0) : '';

            setParams(pageParams ? pageParams.split(':')[1].split('?')[0] : '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKey])

    const onSelect = (selectedKeys: React.Key[]) => {
        setKey(selectedKeys)
    };

    return (
        <>
            {item &&
                <>
                    <Row>
                        <Col flex={'80px'}>
                            link
                        </Col>
                        <Col flex="auto">
                            <Input
                                className="lcEditorInput"
                                size="small"
                                value={item}
                            />
                        </Col>
                        <Col flex="50px">
                            <Button type="link" onClick={() => setVisible(true)}
                                style={{width: '20px', height: '25px', lineHeight: 1, marginLeft: '4px', marginRight: '2px', padding: 0}}><MoreOutlined />
                            </Button>
                            <Button type="link" style={{width: '19px', height: '25px', lineHeight: 1, marginLeft: '5px'}}
                                danger
                                icon={<DeleteOutlined />} onClick={() => setItem(undefined)} />
                        </Col>
                    </Row>
                    <Modal title={selectedKey || 'url'} open={isVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Tree
                            showLine={true}
                            showIcon={true}
                            defaultExpandedKeys={['0-0-0']}
                            onSelect={onSelect}
                            treeData={newObj}
                        />
                        <br />
                        <Row>
                            <Col flex={'120px'}>
                                Параметр
                            </Col>
                            <Col flex="auto">
                                <Input
                                    size="small"
                                    value={params}
                                    onChange={(evt) => setParams(evt.target.value)}
                                />
                            </Col>
                        </Row>
                    </Modal>
                </>
            }
        </>
    );
};

export default LinkTree