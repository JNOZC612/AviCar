import React, { useState } from "react";
import styles from "../styles/Tree.module.css";
export default function TreeNode({ node, onNodeClick }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToogle = () => {
        if (node.children) setIsExpanded(!isExpanded);
        else onNodeClick(node);
    };
    return (
        <div className={styles.treeNode}>
            <div className={styles.nodeConect} onClick={handleToogle}>
                {
                    node.children && (
                        <span className={styles.toogleIcon}>
                            {isExpanded ? '-   ' : '+   '}
                        </span>
                    )
                }
                {node.label}
            </div>
            {isExpanded && node.children && (
                <div className={styles.nodeChildren}>
                    {
                        node.children.map((child) => (
                            <TreeNode key={child.id} node={child} onNodeClick={onNodeClick} />
                        ))
                    }
                </div>
            )}
        </div>
    );
};