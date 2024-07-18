import { TTab } from "@/types";
import { Button } from "@/components/ui/button";

type Props = {
  activeTab: string;
  handleTabClick: (tab: TTab) => void;
  tab: TTab;
  children: React.ReactNode;
};

const Tab = ({ activeTab, handleTabClick, children, tab }: Props) => {
  return (
    <Button
      variant="ghost"
      className={`px-4 sm:px-4 md:px-7 rounded-full font-medium text-xs whitespace-nowrap
      ${activeTab === tab ? "bg-gray-200" : "text-gray-500"}`}
      onClick={() => handleTabClick(tab)}
    >
      {children}
    </Button>
  );
};

export default Tab;
