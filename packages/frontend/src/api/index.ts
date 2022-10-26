import { CreatePostParam } from "./params/create-post";
import { Post } from "./models/post";
import { User } from "./models/user";
import { $get, $post, $delete } from "./primitives";

/**
 * ひとりすきー API。
 */
export const api = {
  /**
   * アカウント API。
   */
  session: {
    /**
     * セッション情報を取得します。
     */
    readAsync: () => $get<User>('session'),

    /**
     * アカウントを新規作成します。
     */
    startAsync: () => $post<User>('session/start'),
    
    /**
     * メールアドレスとパスワードを用いて、アカウントにログインします。
     * @param email - メールアドレス
     * @param password - パスワード
     */
    loginAsync: (email: string, password: string) => $post<User>('session/login', {
      email, password,
    }),
    
    /**
     * メールアドレスとパスワードを現在のアカウントに設定します。
     * @param email - メールアドレス
     * @param password - パスワード
     */
    signupAsync: (email: string, password: string) => $post<User>('session/signup', {
      email, password,
    }),
  },

  /**
   * つぶやき API。
   */
  post: {
    /**
     * つぶやきを取得します。
     * @param id - つぶやき ID。
     */
    readAsync: (id: string) => $get<Post>(`post/${id}`),
    /**
     * チャンネルの投稿を全取得します。
     * @param channel - チャンネル ID。
     */
    readChannelPostsAsync: (channel: string) => $get<Post[]>(`post/channel/${channel}`),

    /**
     * つぶやきを作成します。
     * @param args - つぶやき。
     */
    createAsync: (args: CreatePostParam) => $post<Post>('post', args),

    /**
     * 指定したつぶやきを削除します。
     * @param id - つぶやき ID。
     */
    deleteAsync: (id: string) => $delete<Post>(`post/${id}`),
  },
};