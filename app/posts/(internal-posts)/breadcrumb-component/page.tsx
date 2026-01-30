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
import { useMemo, useState } from 'react';

const DASHBOARD_SIDEBAR_TREE_NODE_ICON: number = 16 as const;
const NUQS_SELECTED_NODE_ITEM: string = 'nodeId';
const BASE_SEGMENTS_LIMIT: number = 2 as const;

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

/**
 * Computes which nodes should be expanded based on a selected node ID.
 * Returns a Set of node IDs that should be expanded (all parent nodes of the selected node).
 */
function computeExpandedNodes(selectedNodeId: string | null): Set<string> {
  if (!selectedNodeId) return new Set();

  const expandedNodes = new Set<string>();
  const parts = selectedNodeId.split('/');

  // Build all parent paths (e.g., 'a/b/c' -> ['a', 'a/b', 'a/b/c'])
  for (let i = 1; i < parts.length; i++) {
    const parentPath = parts.slice(0, i).join('/');
    expandedNodes.add(parentPath);
  }

  return expandedNodes;
}

export default function BreadcrumbComponentPage() {
  return (
    <InternalPostContainer>
      <div className="space-y-12">
        <p className="text">
          Having a sidebar nested content and a breadcrumb component is one of
          the best and most common ways of having a clear navigation. This
          article has a basic implementation both explaining my design and
          logical approach on how to design a layout with these elements.
        </p>
        <p className="text">
          For state management, using a state manager like use-state, redux,
          zustand sounds like a good option. I prefer using query states for
          this as it acts as a shared context inside the URL. When a page is
          open and the user reloads or share the current page link with someone,
          if the sidebar and breadcrumb is backward compatible, we can auto
          expand to that particular page.
        </p>
        <p className="text">
          Here is an example component that uses query state and NUQs to store
          the current open page path as a unique ID. That can be used to
          highlight the sidebar content tree node and render the segment path
          for the breadcrumb.
        </p>
        <ComponentPreviewContainer className="h-[420px]">
          <DashboardComponentPreview />
        </ComponentPreviewContainer>
        <p className="text">
          Let&apos;s understand how we can implement this using query states,
          NUQs with some basic design and logic.
        </p>
      </div>
      <div className="space-y-12">
        <h2>State management</h2>
        <p className="text">
          Using query state is pretty simple, just like we use the useState
          hook, we just need to install the NUQs package and use the{' '}
          <code>useQueryState</code> hook. Which takes 2 arguments: the unique
          key which is the NUQ, and the state value options. By default we put
          the <code>defaultValue</code> as false.
        </p>
      </div>
      <div className="space-y-12">
        <h2>Sidebar component with content tree</h2>
      </div>
      <div className="space-y-12">
        <h2>Breadcrumb component</h2>
      </div>
      <div className="space-y-12">
        <h2>Making the navigation support backward compatibility</h2>
      </div>
    </InternalPostContainer>
  );
}

function DashboardComponentPreview() {
  return (
    <div className="w-full h-full flex items-stretch justify-start bg-foreground/5 p-2 gap-2">
      <DashboardSidebarComponent />
      <main className="flex-1 bg-background rounded-xl shadow-2xs border border-foreground/10 px-4 flex items-center justify-center">
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
              <button
                className={cn(
                  'size-7 rounded-lg flex items-center justify-center hover:bg-foreground/10 cursor-pointer',
                  middleSegmentsDropdownOpen && 'bg-foreground/10',
                )}>
                <IconDots size={DASHBOARD_SIDEBAR_TREE_NODE_ICON} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-56 max-w-80 rounded-xl"
              align="start"
              alignOffset={-24}>
              {middleSegments?.map((middleSegment, index) => {
                return (
                  <DropdownMenuItem
                    key={middleSegment.id}
                    className="first:rounded-t-lg last:rounded-b-lg cursor-pointer font-medium pr-8"
                    style={{ paddingLeft: `${(index + 1) * 12}px` }}>
                    <IconCornerDownRight
                      size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
                      className="text-foreground/40"
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
  const [selectedFileNodeId] = useQueryState(NUQS_SELECTED_NODE_ITEM);
  const [manuallyExpandedNodes, setManuallyExpandedNodes] = useState<
    Set<string>
  >(new Set());
  const [manuallyCollapsedNodes, setManuallyCollapsedNodes] = useState<
    Set<string>
  >(new Set());

  // Compute required expanded nodes from query state
  const requiredExpandedNodes = useMemo(
    () => computeExpandedNodes(selectedFileNodeId),
    [selectedFileNodeId],
  );

  // Merge required expansions (from query state) with manual expansions,
  // but exclude nodes that have been manually collapsed
  const expandedNodes = useMemo(() => {
    const merged = new Set<string>();
    // Add all required nodes (from query state) except manually collapsed ones
    requiredExpandedNodes.forEach((nodeId) => {
      if (!manuallyCollapsedNodes.has(nodeId)) {
        merged.add(nodeId);
      }
    });
    // Add all manually expanded nodes
    manuallyExpandedNodes.forEach((nodeId) => merged.add(nodeId));
    return merged;
  }, [requiredExpandedNodes, manuallyExpandedNodes, manuallyCollapsedNodes]);

  const toggleNodeExpansion = (nodeId: string) => {
    const isRequired = requiredExpandedNodes.has(nodeId);
    const isCurrentlyExpanded = expandedNodes.has(nodeId);

    if (isCurrentlyExpanded) {
      // Collapsing the node
      if (isRequired) {
        // If it's a required node, mark it as manually collapsed
        setManuallyCollapsedNodes((prev) => {
          const next = new Set(prev);
          next.add(nodeId);
          return next;
        });
      } else {
        // If it's manually expanded, remove it from manually expanded
        setManuallyExpandedNodes((prev) => {
          const next = new Set(prev);
          next.delete(nodeId);
          return next;
        });
      }
    } else {
      // Expanding the node
      // Remove from collapsed set if it was there
      setManuallyCollapsedNodes((prev) => {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      });
      // Add to manually expanded if it's not required
      if (!isRequired) {
        setManuallyExpandedNodes((prev) => {
          const next = new Set(prev);
          next.add(nodeId);
          return next;
        });
      }
    }
  };

  return (
    <aside className="w-60 h-full overflow-y-scroll hide-scrollbar">
      {DIRECTORY.map((node) => {
        return (
          <DashboardSidebarTreeNodeContainerComponent
            level={1}
            key={node.id}
            node={node}
            expandedNodes={expandedNodes}
            onToggleExpansion={toggleNodeExpansion}
          />
        );
      })}
    </aside>
  );
}

function DashboardSidebarTreeNodeContainerComponent({
  node,
  level = 1,
  expandedNodes,
  onToggleExpansion,
}: {
  node: Directory;
  level: number;
  expandedNodes: Set<string>;
  onToggleExpansion: (nodeId: string) => void;
}) {
  const [, setSelectedFileNodeId] = useQueryState(NUQS_SELECTED_NODE_ITEM, {
    defaultValue: '',
  });
  const isNodeFolder: boolean = node.children.length > 0;
  const isNodeExpanded: boolean = expandedNodes.has(node.id);

  const handleOpenFolderNode = () => {
    onToggleExpansion(node.id);
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
            isFolderOpen={isNodeExpanded}
          />
          {isNodeExpanded ? (
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
                    expandedNodes={expandedNodes}
                    onToggleExpansion={onToggleExpansion}
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
        paddingLeft: `${(node.isNodeFolder ? 12 : 15) * node.level}px`,
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
