# Sortable list with ability to rewind

# Description

The left side component (post list) loads its initial state from https://jsonplaceholder.typicode.com/posts, allowing the user to update the state via manipulating the UI, and creating a list of actions on the right. The actions on the right have a button to "Time travel" which rewinds the order of the posts to the way they were before the action.

# Tech stack

- Vite (5.0.12)
- VueJS (3.4.15)
- Tailwind (3.4.1)
- Uuid (9.0.1)
- TypeScript (5.3.3)

## Pinia / State management

I chose not to use a state management tool for this as there are only two real state objects, the "posts" and "actions" arrays. I felt they were fine to leave in the app component state for this project. If posts or actions were needed in more components or if more component actions triggered state mutations I would consider adding a state management store.

# Local dev

1. clone repo
2. `npm install`
3. `npm run dev`

# Testing

`npm run test` or `npm run coverage` (for test coverage)
I chose Vitest and vue-test-utils for unit testing. I feel that the unit tests adequately cover functionality of the application. `PostList.vue` and `ActionList.vue` are tested in their rendering based on the props they receive and their ability to emit events to the HoC `App.vue`. `App.vue` manages the state of `posts` and `actions`. So it tests that posts are able to be re-ordered as well as actions are able to be rewound resulting in the correct order of posts.

I didn't include browser tests in this project as I thought other aspects were more important. Going forward I would consider Cypress or Playwright as good options.

# Animations

- Used vue transitions for fading and transforming to give user a sense of which posts and actions were effected by their actions.
- Added skeleton loader while posts are loading
