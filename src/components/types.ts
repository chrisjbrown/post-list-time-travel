export type PostType = {
  id: number;
};

export type ActionType = {
  id: string;
  postId: number;
  from: number;
  to: number;
};
