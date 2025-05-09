import { BoardEntity } from 'src/board/entities/board';
import { CommentEntity } from 'src/board/entities/comment';

export type AlertSource = {
  board?: Pick<BoardEntity, 'id' | 'title' | 'contents'>;
  comment?: Pick<CommentEntity, 'id' | 'contents'>;
};

export const sendAlert = (
  author: string,
  keyword: string,
  source: AlertSource,
) => {
  console.log({
    msg: `${author}님과 관련된 게시물 or 댓글이 달렸습니다.`,
    keyword,
    source,
  });
};
