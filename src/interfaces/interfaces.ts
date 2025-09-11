export interface Tab {
  id: number;
  name: string;
  pinned: boolean;
}

export interface TabIcon {
  id: number;
  src: string;
  alt: string;
}

export interface DraggedTab {
  id: number;
  index: number;
}
