import { createSignal, For } from 'solid-js';

interface Comment {
  id: number;
  text: string;
  date: string;
}

export default function Comments() {
  const initialComments: Comment[] = [
    { id: 1, text: "Great article!", date: "2024-03-20" },
    { id: 2, text: "Very informative content", date: "2024-03-21" },
    { id: 3, text: "Looking forward to more posts like this", date: "2024-03-22" }
  ];

  const [comments, setComments] = createSignal(initialComments);

  return (
    <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 class="text-xl font-bold mb-4">Comments</h3>
      <div class="space-y-4">
        <For each={comments()}>
          {(comment) => (
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