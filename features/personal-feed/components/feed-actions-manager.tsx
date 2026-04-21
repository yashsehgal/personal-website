import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IFeed } from "@/features/personal-feed/interfaces";
import { Archive, Bell, Mail, Pencil } from "lucide-react";
import { ReactElement } from "react";

interface FeedActionsManagerProps {
  children: React.ReactNode;
  feed: IFeed;
}

export function FeedActionsManager({
  children,
  feed,
}: FeedActionsManagerProps) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger render={children as unknown as ReactElement} />
          }
        />
        <TooltipContent>More options...</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-80">
        <DropdownMenuItem>
          <Bell />
          Remind him to check his inbox
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Mail />
          Reach out to Yash via email...
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Pencil />
          Rename feed name
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Archive />
          Delete this feed...
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
