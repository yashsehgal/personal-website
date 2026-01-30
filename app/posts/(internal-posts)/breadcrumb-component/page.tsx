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
  IconChevronDown,
  IconChevronRight,
  IconCornerDownRight,
  IconDots,
  IconFolderFilled,
  IconPointFilled,
  IconReload,
} from '@tabler/icons-react';
import { motion, MotionConfig, MotionProps } from 'framer-motion';
import { useQueryState } from 'nuqs';
import { useEffect, useMemo, useRef, useState } from 'react';

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
          Unlike local component state, query states persist in the URL, making
          the navigation experience more robust. This way, your sidebar and
          breadcrumb context survive refreshes or link sharing without extra
          work, helping users keep their states, no matter how they load the
          page.
        </p>
      </div>
      <div className="space-y-12">
        <h2>Writing breadcrumb and sidebar content tree component</h2>
      </div>
      <div className="space-y-12">
        <h2>Making the navigation support backward compatibility</h2>
        <p className="text">
          One of the most important edge cases when designing a state system
          like this is ensuring that the active state is correctly shown on the
          UI based on the query state when a page loads. To achieve this user
          experience, we need to backtrack the parent segments and automatically
          expand the nested tree nodes so the current active page is visible.
        </p>
        <p className="text">
          The backtracking logic works by parsing the selected node ID from the
          query state (e.g.,{' '}
          <span className="font-serif italic">engineering/setup/frontend</span>)
          and splitting it by the forward slash delimiter. Starting from the
          root, we incrementally build parent paths by joining segments: first{' '}
          <span className="font-serif italic">engineering</span>, then{' '}
          <span className="font-serif italic">engineering/setup</span>, and
          finally{' '}
          <span className="font-serif italic">engineering/setup/frontend</span>.
          These parent paths are collected into a Set and used to automatically
          expand the corresponding tree nodes in the sidebar. This ensures that
          when a page loads with a deep nested path, all parent nodes are
          expanded automatically, making the active page visible without
          requiring manual expansion.
        </p>
        <p className="text">
          The auto-expand functionality in{' '}
          <code>DashboardSidebarComponent</code> works by computing required
          expanded nodes from the query state and merging them with manual user
          interactions. First, the component calculates which nodes must be
          expanded based on the selected file node ID:
        </p>
        <pre className="code-block">
          <code>{`const requiredExpandedNodes = useMemo(
  () => computeExpandedNodes(selectedFileNodeId),
  [selectedFileNodeId],
);`}</code>
        </pre>
        <p className="text">
          These required nodes are then merged with manually expanded nodes,
          while respecting user preferences for collapsed nodes:
        </p>
        <pre className="code-block">
          <code>{`const expandedNodes = useMemo(() => {
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
}, [requiredExpandedNodes, manuallyExpandedNodes, manuallyCollapsedNodes]);`}</code>
        </pre>
        <BacktrackingPreviewComponent />
        <p className="text">
          This approach ensures that when a page loads with a selected node ID
          in the query state, all parent nodes automatically expand to reveal
          the active page. However, if a user manually collapses a required
          node, that preference is remembered and prevents auto-expansion until
          the user expands it again or the selected node changes.
        </p>
      </div>
    </InternalPostContainer>
  );
}

// Follow the scene sequence in the same order
enum BACKTRACKING_PREVIEW_STATE {
  SHOW_URL_IN_BROWSER = 'SHOW_URL_IN_BROWSER',
  HIGHLIGHT_SEGMENTS = 'HIGHLIGHT_SEGMENTS',
  ZOOM_SEGMENTS = 'ZOOM_SEGMENTS',
  SHOW_FOLDER_TREE_NODE = 'SHOW_PARENT_FOLDER_TREE_NODE',
  END_SCENE = 'END_SCENE',
}

const BACKTRACKING_SCENE_ORDER: BACKTRACKING_PREVIEW_STATE[] = [
  BACKTRACKING_PREVIEW_STATE.SHOW_URL_IN_BROWSER,
  BACKTRACKING_PREVIEW_STATE.HIGHLIGHT_SEGMENTS,
  BACKTRACKING_PREVIEW_STATE.ZOOM_SEGMENTS,
  BACKTRACKING_PREVIEW_STATE.SHOW_FOLDER_TREE_NODE,
  BACKTRACKING_PREVIEW_STATE.END_SCENE,
];

const SCENE_INTERVAL_MS: number = 1200 as const;

function BacktrackingPreviewComponent() {
  const [scene, setScene] = useState<BACKTRACKING_PREVIEW_STATE>(
    undefined as unknown as BACKTRACKING_PREVIEW_STATE,
    // BACKTRACKING_PREVIEW_STATE.SHOW_FOLDER_TREE_NODE,
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const validateActiveScene = (checkScene: BACKTRACKING_PREVIEW_STATE) => {
    return scene === checkScene;
  };

  type SceneAnimationItems = 'full-url' | 'base-url-path' | 'show-folder';

  const SCENE_ANIMATIONS: Record<
    SceneAnimationItems,
    Record<
      BACKTRACKING_PREVIEW_STATE,
      {
        initial: MotionProps['initial'];
        animate: MotionProps['animate'];
      }
    >
  > = {
    'full-url': {
      [BACKTRACKING_PREVIEW_STATE.SHOW_URL_IN_BROWSER]: {
        initial: { y: 12, opacity: 0 },
        animate: { y: 0, opacity: 1 },
      },
      [BACKTRACKING_PREVIEW_STATE.HIGHLIGHT_SEGMENTS]: {
        initial: {},
        animate: { x: -140 },
      },
      [BACKTRACKING_PREVIEW_STATE.ZOOM_SEGMENTS]: {
        initial: {},
        animate: { scale: 1.3, x: -160 },
      },

      [BACKTRACKING_PREVIEW_STATE.SHOW_FOLDER_TREE_NODE]: {
        initial: {},
        animate: { y: -120, scale: 0.6, x: -85 },
      },
      [BACKTRACKING_PREVIEW_STATE.END_SCENE]: {
        initial: {},
        animate: { y: -120, scale: 0.6, x: -85 },
      },
    },
    'base-url-path': {
      [BACKTRACKING_PREVIEW_STATE.SHOW_URL_IN_BROWSER]: {
        initial: {},
        animate: {},
      },
      [BACKTRACKING_PREVIEW_STATE.HIGHLIGHT_SEGMENTS]: {
        initial: {},
        animate: {},
      },
      [BACKTRACKING_PREVIEW_STATE.ZOOM_SEGMENTS]: {
        initial: {},
        animate: { opacity: 0, scale: 0.4 },
      },

      [BACKTRACKING_PREVIEW_STATE.SHOW_FOLDER_TREE_NODE]: {
        initial: {},
        animate: { opacity: 0, display: 'hidden' },
      },
      [BACKTRACKING_PREVIEW_STATE.END_SCENE]: {
        initial: {},
        animate: { opacity: 0, display: 'hidden' },
      },
    },
    'show-folder': {
      [BACKTRACKING_PREVIEW_STATE.SHOW_URL_IN_BROWSER]: {
        initial: {},
        animate: { opacity: 0, scale: 0.3, y: 56 },
      },
      [BACKTRACKING_PREVIEW_STATE.HIGHLIGHT_SEGMENTS]: {
        initial: {},
        animate: { opacity: 0, scale: 0.3, y: 56 },
      },
      [BACKTRACKING_PREVIEW_STATE.ZOOM_SEGMENTS]: {
        initial: {},
        animate: { opacity: 0, scale: 0.3, y: 56 },
      },

      [BACKTRACKING_PREVIEW_STATE.SHOW_FOLDER_TREE_NODE]: {
        initial: {},
        animate: {
          opacity: 1,
          scale: 1.2,
          y: 0,
        },
      },
      [BACKTRACKING_PREVIEW_STATE.END_SCENE]: {
        initial: {},
        animate: {
          opacity: 1,
          scale: 1.2,
          y: 0,
        },
      },
    },
  } as const;

  useEffect(() => {
    console.log('Scene> ', scene);
  }, [scene]);

  const startAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    let index = 0;
    setScene(BACKTRACKING_SCENE_ORDER[index]);
    intervalRef.current = setInterval(() => {
      index += 1;
      if (index >= BACKTRACKING_SCENE_ORDER.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }
      setScene(BACKTRACKING_SCENE_ORDER[index]);
    }, SCENE_INTERVAL_MS);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const isUndefined: boolean = typeof scene === 'undefined';

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0 }}>
      <ComponentPreviewContainer className="h-[420px] relative select-none cursor-default">
        {!isUndefined && (
          <>
            <motion.div className="w-full h-full flex items-center justify-center">
              <motion.div
                key="full-url"
                initial={SCENE_ANIMATIONS['full-url'][scene]?.initial}
                animate={SCENE_ANIMATIONS['full-url'][scene]?.animate}
                className={cn(
                  'text-2xl font-medium text-foreground font-mono flex items-center',
                )}>
                {/* engineering/setup/frontend */}
                <motion.p
                  animate={SCENE_ANIMATIONS['base-url-path'][scene]?.animate}>
                  /dashboard?nodeId=
                </motion.p>
                <motion.div
                  key="segments-container"
                  className={cn(
                    'transition-[padding] w-fit flex items-center',
                    !validateActiveScene(
                      BACKTRACKING_PREVIEW_STATE.SHOW_URL_IN_BROWSER,
                    ) &&
                      'px-3 py-1 rounded-xl border border-blue-300 bg-blue-50 text-blue-400 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-600',
                  )}>
                  engineering/setup/frontend
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              key="folder-container"
              className="border border-foreground/10 absolute bottom-0 left-1/2 -translate-x-1/2 rounded-3xl p-2 bg-foreground/2"
              initial={{ opacity: 0, scale: 0.3, y: 56 }}
              animate={SCENE_ANIMATIONS['show-folder'][scene]?.animate}>
              <div className="px-5 py-2 border border-foreground/12 rounded-t-xl h-64 w-64 bg-background">
                <div className="h-8 flex items-center justify-start gap-2">
                  <IconChevronDown
                    size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
                    strokeWidth={1.5}
                  />
                  <IconFolderFilled
                    size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
                    className="text-blue-400"
                  />
                  <p className="text-foreground text-xs">Engineering</p>
                </div>
                <div className="h-8 flex items-center justify-start gap-2 pl-[25px]">
                  <IconChevronRight
                    size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
                    strokeWidth={1.5}
                  />
                  <IconFolderFilled
                    size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
                    className="text-blue-400"
                  />
                  <p className="text-foreground text-xs">Guidelines</p>
                </div>
                <div className="h-8 flex items-center justify-start gap-2 pl-[25px]">
                  <IconChevronDown
                    size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
                    strokeWidth={1.5}
                  />
                  <IconFolderFilled
                    size={DASHBOARD_SIDEBAR_TREE_NODE_ICON}
                    className="text-blue-400"
                  />
                  <p className="text-foreground text-xs">Setup</p>
                </div>
                <div className="h-8 flex items-center justify-start gap-2 pl-[50px] bg-foreground/5 rounded-lg">
                  <IconPointFilled size={DASHBOARD_SIDEBAR_TREE_NODE_ICON} />
                  <p className="text-foreground text-xs">Frontend</p>
                </div>
                <div className="h-8 flex items-center justify-start gap-2 pl-[50px] text-secondary">
                  <IconPointFilled size={DASHBOARD_SIDEBAR_TREE_NODE_ICON} />
                  <p className="text-foreground text-xs">Backend</p>
                </div>
                <div className="h-8 flex items-center justify-start gap-2 pl-[50px] text-secondary">
                  <IconPointFilled size={DASHBOARD_SIDEBAR_TREE_NODE_ICON} />
                  <p className="text-foreground text-xs">DevOps</p>
                </div>
                <div className="h-8 flex items-center justify-start gap-2 pl-[50px] text-secondary">
                  <IconPointFilled size={DASHBOARD_SIDEBAR_TREE_NODE_ICON} />
                  <p className="text-foreground text-xs">Tools</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
        {validateActiveScene(BACKTRACKING_PREVIEW_STATE.END_SCENE) ||
        isUndefined ? (
          <motion.button
            key="animate-backtracking-preview-button"
            className="rounded-full p-4 py-2 border border-foreground/10 shadow-2xs text-foreground text-sm font-medium bg-background cursor-pointer flex items-center gap-2 absolute top-4 right-4"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={startAnimation}>
            <IconReload size={16} />
            <span>Animate</span>
          </motion.button>
        ) : null}
      </ComponentPreviewContainer>
    </MotionConfig>
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
