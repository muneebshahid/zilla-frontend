export interface MenuItem {
  description: string;
  title: string;
  image: string;
  price: number;
}

export interface IBusinessMenu {
  menuItem: MenuItem[];
  menuCategory: string;

  collapsed: boolean;
  name: string;
}
