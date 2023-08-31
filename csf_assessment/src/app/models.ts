export interface TagCount {
  tag: string;
  count: number;
}

export interface News {
  id: number;
  postDate: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface State {
  minutes: number;
  tagList: TagCount[];
}
