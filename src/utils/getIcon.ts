export interface TabIcon {
  id: number;
  src: string;
  alt: string;
}

export const getIcon = (name: string, icons: TabIcon[]): TabIcon | undefined =>
  icons.find((icon) => icon.alt === name);
