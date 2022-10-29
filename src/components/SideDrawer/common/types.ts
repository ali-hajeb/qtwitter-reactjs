export interface IMenuItem {
  to: string;
  end?: boolean;
  title: string;
  icon?: JSX.Element;
  className?: string;
}

export interface IMenuList {
  _id: string;
  title: string;
  items: IMenuItem[];
}
