import { createSignal, For, onMount, type Accessor, type JSX } from 'solid-js';
import { Agent, AppBskyFeedDefs, AppBskyFeedGetPostThread, AtpAgent, type AtpSessionData } from '@atproto/api';
import { type ThreadViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

// TODO: do this satisfactorily
export default function Comments() {
  const [comments, setComments] = createSignal<ThreadViewPost[]>();

  const uri = getUriFromUrl("https://bsky.app/profile/emilyliu.me/post/3lbqta5lnck2i");
  console.log(uri);
  getPostThread(uri).then(console.log).catch(console.log);

  return (
    <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 class="text-xl font-bold mb-4">Comments</h3>
      <div class="space-y-4">
        <For each={comments()}>
          {(comment: ThreadViewPost, _i: Accessor<number>) => (
            <div class="p-4 bg-white dark:bg-gray-700 rounded-lg">
              <p class="text-gray-800 dark:text-gray-200">{comment.text}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{comment.date}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

const getUriFromUrl = (url: string): string => {
  if (!url.startsWith('at://') && url.includes('bsky.app/profile/')) {
    const match = url.match(/profile\/([\w.]+)\/post\/([\w]+)/);
    if (match) {
      const [, did, postId] = match;
      return `at://${did}/app.bsky.feed.post/${postId}`;
    }
  }
  return url;
};


const getPostThread = async (uri: string) => {
  const params = new URLSearchParams({ uri });

  const res = await fetch(
    "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?" +
    params.toString(),
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to fetch post thread");
  }

  const data = (await res.json()) as AppBskyFeedGetPostThread.OutputSchema;

  if (!AppBskyFeedDefs.isThreadViewPost(data.thread)) {
    throw new Error("Could not find thread");
  }

  return data.thread;
};
