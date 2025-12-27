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

  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.SEARCHED,
    config: {
      message:
        'Deep search for "refreshIfNeeded", "refreshToken", and "inFlight" tokens across repo and tests. Found helpers, mocks, and flaky test patterns that reinitialize auth state.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.READ_FILE,
    config: {
      message:
        'Opening test file to understand flaky behavior and teardown logic that may cause token state leaks between tests.',
      file_path: 'test/auth/refresh.spec.ts',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.ANALYSING_FILE,
    config: {
      message:
        'refresh.spec.ts: several tests reset global axios interceptors directly; mock implementations of token-utils do not simulate in-progress refresh. Tests assume refresh is instantaneous which masks race conditions.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.THOUGHT,
    config: {
      message:
        'Idea: Add a test helper that simulates a slow refresh (Promise that resolves after X ms) and spawn parallel requests to assert only one network refresh is issued.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.CHAT_MESSAGE,
    config: {
      message:
        'Suggestion: Add metrics/logging for refresh start/end to help debug production incidents — include timestamps and request ids to correlate concurrent refreshes.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.FILE_CONTENT_CHANGE,
    config: {
      file_name: 'src/services/auth.ts',
      diff: {
        addition: 48,
        deletion: 6,
      },
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.READ_FILE,
    config: {
      message:
        'Inspecting src/services/token-utils.ts for existing refresh helpers and how they are consumed by the client.',
      file_path: 'src/services/token-utils.ts',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.ANALYSING_FILE,
    config: {
      message:
        'token-utils.ts: utility exposes refreshIfNeeded but callers sometimes call refreshToken directly. Consolidation needed to avoid duplicate refreshes and inconsistent error handling.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.TODO_LIST,
    config: {
      title: 'Implementation checklist (detailed)',
      todo_list_items: [
        {
          name: 'Implement refreshInFlight in auth service with cancellation safety',
          completed: false,
        },
        {
          name: 'Update axios interceptor to await auth.refreshIfNeeded() instead of token-utils.refreshToken()',
          completed: false,
        },
        {
          name: 'Add integration test that launches 10 parallel requests returning 401 and asserts single refresh request',
          completed: false,
        },
        {
          name: 'Document migration in CONTRIBUTING.md and update CHANGELOG',
          completed: false,
        },
        {
          name: 'Add runtime metric (counter) for refresh attempts and instrument with existing telemetry',
          completed: false,
        },
      ],
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.SEARCHING_CODEBASE,
    config: {
      message:
        'Searching for places where token functions are imported directly (vs via auth service). Flagging pattern occurrences for later automated codemod.',
      resources_visited: [
        'src',
        'src/components',
        'scripts/codemods',
        'test',
        'package.json',
      ],
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.CHAT_MESSAGE,
    config: {
      message:
        'Will propose a small codemod to replace direct imports of token-utils.refreshToken with auth.refreshIfNeeded. Plan to run on CI for affected files only.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.THOUGHT,
    config: {
      message:
        'Corner case: background sync tasks that run outside request lifecycle — ensure refreshIfNeeded returns a promise that is safe to call from cron jobs or workers.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.CHAT_MESSAGE,
    config: {
      message:
        'Estimate: ~3-5 days of work including tests and migration. Can split into two PRs: (A) auth service + tests, (B) client/hook updates + codemod.',
    },
  },
  {
    agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.FILE_CONTENT_CHANGE,
    config: {
      file_name: 'test/auth/refresh.spec.ts',
      diff: {
        addition: 36,
        deletion: 12,
      },
    },
  },
] as const;
