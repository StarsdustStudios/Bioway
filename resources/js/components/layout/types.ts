interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
}

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

type NavLink = BaseNavItem & {
  url: string; // Changed from LinkProps['to']
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarData {
  user: User;
  teams: Team[];
  navGroups: NavGroup[];
}

interface ProductData {
  productName: string;
  productColumns: string[];
  productColDataset: string[];
  productStatus: string[];
}

interface CmsData {
  cmsName: string;
  cmsColumns: string[];
  cmsColDataset: string[];
  cmsStatus: string[];
}

export type { User, SidebarData, ProductData, CmsData, NavGroup, NavItem, NavCollapsible, NavLink };
