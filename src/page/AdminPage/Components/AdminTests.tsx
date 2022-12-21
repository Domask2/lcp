import { Tree } from 'antd';
import React, {useState} from 'react';

interface DataNode {
    title: React.ReactFragment;
    key: string;
    isLeaf?: boolean;
    children?: DataNode[];
}

const initTreeData: DataNode[] = [
    { title: <>
                <div>multiple line title</div>
                <div>multiple line title</div>
            </>
        , key: '0' },
    { title: 'Expand to load', key: '1' },
];

const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
    list.map(node => {
        if (node.key === key) {
            return {
                ...node,
                children,
            };
        }
        if (node.children) {
            return {
                ...node,
                children: updateTreeData(node.children, key, children),
            };
        }
        return node;
    });

const AdminTests = () => {
    const [treeData, setTreeData] = useState(initTreeData);

    const onLoadData = ({ key, children }: any) =>
        new Promise<void>(resolve => {
            if (children) {
                resolve();
                return;
            }
            setTimeout(() => {
                setTreeData(origin =>
                    updateTreeData(origin, key, [
                        { title: 'Child Node', key: `${key}-0` },
                        { title: 'Child Node', key: `${key}-1` },
                    ]),
                );

                resolve();
            }, 1000);
        });

    return <Tree loadData={onLoadData} treeData={treeData} />
};

export default AdminTests;