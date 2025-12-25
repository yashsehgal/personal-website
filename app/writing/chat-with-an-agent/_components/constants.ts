import {
  AGENT_CHAT_LOG_ITEM_TYPE,
  AgentChatLogListType,
} from '@/app/writing/chat-with-an-agent/_components/types';

export const AGENT_CHAT_PREVIEW_LOG: AgentChatLogListType = [
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.SEARCHING_CODEBASE,
    config: {
      message:
        'Scanning repository for authentication, token, and refresh logic. Prioritizing services, hooks and components that handle login or API calls.',
      resources_visited: [
        'package.json',
        'tsconfig.json',
        'src/services/auth.ts',
        'src/services/token-utils.ts',
        'src/hooks/useAuth.ts',
        'src/components/LoginForm/index.tsx',
        'src/components/Profile/SessionManager.tsx',
        'src/lib/api/client.ts',
        'README.md',
      ],
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.READ_FOLDER,
    config: {
      message:
        'Enumerating files under src/services to locate centralized auth helpers and token refresh implementations.',
      folder_path: 'src/services',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.READ_FILE,
    config: {
      message:
        'Opening src/services/auth.ts to inspect exported methods and refresh flow.',
      file_path: 'src/services/auth.ts',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.ANALYSING_FILE,
    config: {
      message:
        'auth.ts: found exports login(), logout(), getAccessToken(), and a refreshToken() helper that invokes /auth/refresh. refreshToken is used directly in two places — token-utils and Profile/SessionManager.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.READ_FILE,
    config: {
      message:
        'Opening src/hooks/useAuth.ts to see how components subscribe to auth state and trigger refresh on 401 responses.',
      file_path: 'src/hooks/useAuth.ts',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.READ_FILE,
    config: {
      message:
        'Inspecting src/lib/api/client.ts: found global axios instance with response interceptor that retries on 401 by calling token-utils.refreshIfNeeded.',
      file_path: 'src/lib/api/client.ts',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.SEARCHED,
    config: {
      message:
        'Search complete — located 6 references to refresh logic across 4 files. Patterns: some callers duplicate refresh call, some assume refresh is synchronous.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.THINKING,
    config: {
      message:
        'Plan minimal, low-risk changes: (1) consolidate refresh logic in auth service; (2) expose a single refreshIfNeeded() promise; (3) update client & hooks to use the single API; (4) add unit + integration tests to cover concurrent 401s.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.THOUGHT,
    config: {
      message:
        'Potential race: concurrent requests triggering separate refresh calls. Solution: implement in-flight refresh promise in auth service so callers await the same promise when refresh is ongoing.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.CHAT_MESSAGE,
    config: {
      message:
        'Recommendation: implement singleton in-flight refresh in src/services/auth.ts, update src/lib/api/client.ts to call auth.refreshIfNeeded(), and add tests simulating concurrent 401 responses.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.TODO_LIST,
    config: {
      title: 'Refactor tasks (priority order)',
      todo_list_items: [
        {
          name: 'Add refreshInFlight promise to auth service and export refreshIfNeeded()',
          completed: false,
        },
        {
          name: 'Replace token-utils.refreshIfNeeded usages with auth.refreshIfNeeded in api client',
          completed: false,
        },
        {
          name: 'Update useAuth hook to rely on auth service for token state',
          completed: false,
        },
        {
          name: 'Add unit tests for auth.refreshIfNeeded to cover success, failure and concurrent callers',
          completed: false,
        },
        {
          name: 'Add e2e test that simulates server returning 401 for parallel requests',
          completed: false,
        },
        {
          name: 'Open PR with changelog and migration notes',
          completed: false,
        },
      ],
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.FILE_CONTENT_CHANGE,
    config: {
      file_name: 'src/services/auth.ts',
      diff: {
        addition: 120,
        deletion: 36,
      },
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.FILE_CONTENT_CHANGE,
    config: {
      file_name: 'src/lib/api/client.ts',
      diff: {
        addition: 18,
        deletion: 22,
      },
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.FILE_CONTENT_CHANGE,
    config: {
      file_name: 'src/hooks/useAuth.ts',
      diff: {
        addition: 24,
        deletion: 8,
      },
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.SEARCHING_CODEBASE,
    config: {
      message:
        'Re-running targeted search to ensure no remaining direct refresh calls. Verifying tests and lint pass locally before PR.',
      resources_visited: ['src', 'test', 'jest.config.ts', 'package.json'],
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.CHAT_MESSAGE,
    config: {
      message:
        'Next steps: implement changes in a feature branch, run unit tests (npm run test), run linter (npm run lint), and create PR referencing issue #42 with description and migration notes.',
    },
  },
] as const;
