'use client';
import { DIRECTORY } from '@/app/posts/(internal-posts)/breadcrumb-component/constants';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import { cn } from '@/helpers/cn';
import {
  IconChevronRight,
  IconFolderFilled,
  IconPointFilled,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

const DASHBOARD_SIDEBAR_TREE_NODE_ICON: number = 16 as const;
const NUQS_SELECTED_NODE_ITEM: string = 'nodeId';

export interface Directory {
  id: string;
  name: string;
  children: Directory[];
}

export default function BreadcrumbComponentPage() {
  return (
    <InternalPostContainer>
      <ComponentPreviewContainer className="h-[420px]">
        <DashboardComponentPreview />
      </ComponentPreviewContainer>
    </InternalPostContainer>
  );
}

function DashboardComponentPreview() {
  return (
    <div className="w-full h-full flex items-stretch justify-start bg-foreground/5 p-2 gap-2">
      <DashboardSidebarComponent />
      <main className="flex-1 bg-background rounded-xl shadow-2xs border border-foreground/10"></main>
    </div>
  );
}

function DashboardSidebarComponent() {
  return (
    <aside className="w-60 h-full overflow-y-scroll hide-scrollbar">
      {DIRECTORY.map((node) => {
        return (
          <DashboardSidebarTreeNodeContainerComponent
            level={1}
            key={node.id}
            node={node}
          />
        );
      })}
    </aside>
  );
}

function DashboardSidebarTreeNodeContainerComponent({
  node,
  level = 1,
}: {
  node: Directory;
  level: number;
}) {
  const [selectedFileNodeId, setSelectedFileNodeId] = useQueryState(
    NUQS_SELECTED_NODE_ITEM,
    { defaultValue: '' },
  );
  const [openFolderNode, setOpenFolderNode] = useState<boolean>(false);
  const isNodeFolder: boolean = node.children.length > 0;

  const handleOpenFolderNode = () => {
    setOpenFolderNode((state) => !state);
  };

  const handleSelectedFileNode = (id: string) => {
    setSelectedFileNodeId(id);
  };

  return (
    <div className="dashboard-sidebar-tree-node-container-component">
      {isNodeFolder ? (
        <>
          <DashboardSidebarNodeComponent
            isNodeFolder
            onClick={handleOpenFolderNode}
            id={node.id}
            name={node.name}
            level={level}
            isFolderOpen={openFolderNode}
          />
          {openFolderNode ? (
            <motion.div
              key={node.id}
              className="dashboard-sidebar-tree-node-children-items-container overflow-hidden"
              layout="size"
              initial={{ height: 0 }}
              animate={{ height: 'fit-content' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0 }}>
              {node.children?.map((childNode) => {
                return (
                  <DashboardSidebarTreeNodeContainerComponent
                    level={level + 1}
                    key={childNode.id}
                    node={childNode}
                  />
                );
              })}
            </motion.div>
          ) : null}
        </>
      ) : (
        <DashboardSidebarNodeComponent
          isNodeFolder={false}
          onClick={() => handleSelectedFileNode(node.id)}
          level={level}
          name={node.name}
          id={node.id}
        />
      )}
    </div>
  );
}

type DashboardSidebarNodeComponentProps = Omit<Directory, 'children'> & {
  isNodeFolder: boolean;
  onClick: () => void;
  level: number;
  isFolderOpen?: boolean;
};

function DashboardSidebarNodeComponent(
  node: DashboardSidebarNodeComponentProps,
) {
  return (
    <button
      onClick={node.onClick}
      className="w-full h-8 hover:bg-foreground/5 flex items-center justify-start gap-2 rounded-md cursor-pointer group/tree-node pr-3 active:bg-foreground/10"
      style={{
        paddingLeft: `${(node.isNodeFolder ? 12 : 12) * node.level}px`,
      }}>
      {node.isNodeFolder ? (
        <>
          <IconChevronRight
            size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
            className={cn(
              'text-foreground/50 shrink-0 transition-all group-hover/tree-node:text-foreground',
              node.isFolderOpen ? 'rotate-90' : 'rotate-0',
            )}
          />
          <IconFolderFilled
            size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
            className="text-blue-300 group-hover/tree-node:text-blue-400 shrink-0 dark:text-blue-400"
          />
        </>
      ) : (
        <IconPointFilled
          size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
          className="text-foreground/50 shrink-0 group-hover/tree-node:text-foreground"
        />
      )}
      <p className="text-sm font-medium text-secondary truncate group-hover/tree-node:text-foreground">
        {node.name}
      </p>
    </button>
  );
}
