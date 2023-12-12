import { ReactNode, useState } from 'react';

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean | undefined) => ReactNode;
  activeCondition: boolean | undefined;
}

const SidebarLinkGroup = ({
  children,
  activeCondition,
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean | undefined>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;
