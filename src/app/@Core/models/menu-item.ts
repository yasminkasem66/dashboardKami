export interface MenuItem {
  title: string;
  route?: string;
  path?: string[];
  navigationItems?: MenuItem[];
}
