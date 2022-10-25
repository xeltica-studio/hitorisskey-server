import { Component, createSignal, Show } from "solid-js";
import { Post } from "../../api/models/post";

export type PostProp = {
  post: Post;
};

export const PostView: Component<PostProp> = (p) => {
  const [isOpenCw, setOpenCw] = createSignal(false); 
  return (
    <div class="card hs-post">
      <div class="body">
        <Show when={p.post.annotation} fallback={<p>{p.post.content}</p>}>
          <details>
            <summary>{p.post.annotation}</summary>
            {p.post.content}
          </details>
        </Show>
        <div class="hstack mt-2">
          <button class="btn flat">
            <i class="far fa-face-smile"></i>
          </button>
          <button class="btn flat">
            <i class="fas fa-ellipsis"></i>
          </button>
        </div>
      </div>
    </div>
  );
};