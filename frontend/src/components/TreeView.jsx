import React from "react";
import TreeNode from "./TreeNode";
import styles from "../styles/Tree.module.css";
export default function TreeView({ data, onLeafNodeSelect, ...restProps }) {
    const handleNodeClick = (node) => {
        if (!node.children && onLeafNodeSelect) onLeafNodeSelect(node);
        //alert(`Clicked on node: ${node.label}`);
    }
    return (
        <div className={styles.treeView} {...restProps}>
            {
                data.map((node) => (
                    <TreeNode key={node.id} node={node} onNodeClick={handleNodeClick} />
                ))
            }
        </div>
    );
};