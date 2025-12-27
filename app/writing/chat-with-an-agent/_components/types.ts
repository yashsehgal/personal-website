export enum AGENT_CHAT_LOG_ITEM_TYPE {
  FILE_CONTENT_CHANGE = 'file_content_change',
  READ_FILE = 'read_file',
  READ_FOLDER = 'read_folder',
  ANALYSING_FILE = 'analysing_file',
  SEARCHING_CODEBASE = 'searching_codebase',
  THINKING = 'thinking',
  THOUGHT = 'thought',
  SEARCHED = 'searched',
  CHAT_MESSAGE = 'chat_message',
  TODO_LIST = 'todo_list',
}

export type AgentChatLogTodoListItemType = {
  completed: boolean;
  name: string;
};

export type AgentChatLogTodoListItemsType = AgentChatLogTodoListItemType[];

export type AnalysingFileLogConfig = {
  message: string;
};

export type ChatMessageLogConfig = {
  message: string;
};

export type FileContentChangeLogConfig = {
  file_name: string;
  diff: {
    addition: number;
    deletion: number;
  };
};

export type ReadFileLogConfig = {
  message: string;
  file_path: string;
};

export type ReadFolderLogConfig = {
  message: string;
  folder_path: string;
};

export type SearchedLogConfig = {
  message: string;
};

export type SearchingCodebaseLogConfig = {
  message: string;
  resources_visited: string[];
};

export type ThinkingLogConfig = {
  message: string;
};

export type ThoughtLogConfig = {
  message: string;
};

export type TodoListLogConfig = {
  title: string;
  todo_list_items: AgentChatLogTodoListItemsType;
};

export type AgentChatLogType =
  | {
      agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.ANALYSING_FILE;
      config: AnalysingFileLogConfig;
    }
  | {
      agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.CHAT_MESSAGE;
      config: ChatMessageLogConfig;
    }
  | {
      agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.FILE_CONTENT_CHANGE;
      config: FileContentChangeLogConfig;
    }
  | {
      agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.READ_FILE;
      config: ReadFileLogConfig;
    }
  | {
      agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.READ_FOLDER;
      config: ReadFolderLogConfig;
    }
  | {
      agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.SEARCHED;
      config: SearchedLogConfig;
    }
  | {
      agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.SEARCHING_CODEBASE;
      config: SearchingCodebaseLogConfig;
    }
  | {
      agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.THINKING;
      config: ThinkingLogConfig;
    }
  | {
      agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.THOUGHT;
      config: ThoughtLogConfig;
    }
  | {
      agent_chat_log_item_type: AGENT_CHAT_LOG_ITEM_TYPE.TODO_LIST;
      config: TodoListLogConfig;
    };

export type AgentChatLogListType = AgentChatLogType[];
