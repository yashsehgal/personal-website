'use client';
import { DIRECTORY } from '@/app/posts/(internal-posts)/breadcrumb-component/constants';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/helpers/cn';
import {
  IconChevronRight,
  IconCornerDownRight,
  IconDots,
  IconFolderFilled,
  IconPointFilled,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

const DASHBOARD_SIDEBAR_TREE_NODE_ICON: number = 16 as const;
const NUQS_SELECTED_NODE_ITEM: string = 'nodeId';
const BASE_SEGMENTS_LIMIT: number = 3 as const;

export interface Directory {
  id: string;
  name: string;
  children: Directory[];
}

function createDirectoryIdToNameMap(nodes: Directory[]) {
  const map = new Map<string, string>();

  const walk = (nodeList: Directory[]) => {
    for (const node of nodeList) {
      map.set(node.id, node.name);
      if (node.children.length > 0) walk(node.children);
    }
  };

  walk(nodes);
  return map;
}

const DIRECTORY_ID_TO_NAME = createDirectoryIdToNameMap(DIRECTORY);

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
      <main className="flex-1 bg-background rounded-xl shadow-2xs border border-foreground/10 px-4">
        <DashboardBreadcrumbComponent />
      </main>
    </div>
  );
}

function DashboardBreadcrumbComponent() {
  const [selectedFileNodeId] = useQueryState(NUQS_SELECTED_NODE_ITEM);
  const segmentParts = selectedFileNodeId?.split('/');
  const segments = segmentParts?.map((part, index) => {
    const id = segmentParts.slice(0, index + 1).join('/');
    const name = DIRECTORY_ID_TO_NAME.get(id) ?? part;
    return { id, name };
  });

  const [middleSegmentsDropdownOpen, setMiddleSegmentsDropdownOpen] =
    useState<boolean>(false);

  const handleMiddleSegmentsDropdownOpenStateChange = (open: boolean) => {
    setMiddleSegmentsDropdownOpen(open);
  };

  const middleSegments =
    segments && segments.length > 1 ? segments.slice(0, -1) : null;
  const lastSegment = segments?.[segments.length - 1] ?? null;

  const shouldTruncateSegments: boolean = segments
    ? segments?.length > BASE_SEGMENTS_LIMIT
    : false;

  return (
    <div className="flex items-center justify-start gap-2 text-foreground font-medium h-12">
      <p className="text-sm">Home</p>
      {shouldTruncateSegments ? (
        <>
          <IconChevronRight
            size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
            className="shrink-0"
          />
          <DropdownMenu
            open={middleSegmentsDropdownOpen}
            onOpenChange={handleMiddleSegmentsDropdownOpenStateChange}>
            <DropdownMenuTrigger asChild>
              <button className="size-7 rounded-lg flex items-center justify-center hover:bg-foreground/10 cursor-pointer active:bg-foreground/15">
                <IconDots size={DASHBOARD_SIDEBAR_TREE_NODE_ICON} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-56 max-w-80 rounded-xl"
              align="start"
              alignOffset={-36}>
              {middleSegments?.map((middleSegment, index) => {
                return (
                  <DropdownMenuItem
                    key={middleSegment.id}
                    className="first:rounded-t-lg last:rounded-b-lg cursor-pointer font-medium"
                    style={{ paddingLeft: `${(index + 1) * 12}px` }}>
                    <IconCornerDownRight
                      size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
                    />
                    {middleSegment.name}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <IconChevronRight
            size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
            className="shrink-0"
          />
          {lastSegment ? <p className="text-sm">{lastSegment.name}</p> : null}
        </>
      ) : (
        segments?.map((segment) => {
          return (
            <div key={segment.id} className="flex items-center gap-2">
              <IconChevronRight
                size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
                className="shrink-0"
              />
              <p className="text-sm">{segment.name}</p>
            </div>
          );
        })
      )}
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
  const [, setSelectedFileNodeId] = useQueryState(NUQS_SELECTED_NODE_ITEM, {
    defaultValue: '',
  });
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
  const [selectedFileNodeId] = useQueryState(NUQS_SELECTED_NODE_ITEM);

  const isNodeSelected: boolean = selectedFileNodeId === node.id;

  return (
    <button
      onClick={node.onClick}
      className={cn(
        'w-full h-8 hover:text-foreground flex items-center justify-start gap-2 rounded-md cursor-pointer group/tree-node pr-3',
        isNodeSelected &&
          'bg-foreground/5 hover:bg-foreground/5 active:bg-foreground/5',
      )}
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
            className="text-blue-400 shrink-0"
          />
        </>
      ) : (
        <IconPointFilled
          size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
          className={cn(
            'text-foreground/50 shrink-0 group-hover/tree-node:text-foreground',
            isNodeSelected && 'text-foreground',
          )}
        />
      )}
      <p
        className={cn(
          'text-sm font-medium text-secondary truncate group-hover/tree-node:text-foreground',
          isNodeSelected && 'text-foreground',
        )}>
        {node.name}
      </p>
    </button>
  );
}
