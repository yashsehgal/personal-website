import { cn } from "@/lib/utils";

const CraftedCTCAction: React.FunctionComponent = () => {
  return <div className="copy-to-clipboard-action-component">
    <input type={"text"} placeholder={"Type text to copy"} 
        className={cn("px-4 py-2 rounded-md border")}
    />
  </div>;
};

export default CraftedCTCAction;