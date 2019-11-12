# General

In general, things aren't too bad. Your styling is pretty atrocious (no
offense), but your code's intent is easy to read and understand, which is good.

You guys are understandbly a little behind on 2019 React standards, but I'd say
your biggest area of improvement could just come from stronger JavaScript
fundamentals. There's a lot of cases where stronger fundamentals would make your
code a lot simpler and easier.

While React has it's own quirks and things to learn, it's ultimately mostly
_just_ JavaScript, so having a strong understanding of writing good, clean, and
declarative JavaScript code will do you a lot of good.

Off the top of my head, here are some general re-occurring issues I saw across
your code:

## Variables and Immutability

- `camelCase` your variable names. This is standard convention.
- Use `const` and `let` when appropriate. If you are never re-assigning a
  variable, it should always be a `const`. A `let` that is never re-assigned is
  very confusing to any outsider reading your code.
- Never use a `var`. Seriously, don't.
- You should almost **never** re-assign a variable. If you need to derive a new
  value from an existing one, just create a new one. Mutating existing data is
  error-prone and can lead to all kinds of bugs.
- The above also applies for objects and arrays. Avoid directly mutative methods
  like `push()` and `pop()` if at all possible. The spread operator
  `[...arr, newValue]` is ideal.

## Control flow (if, else if, etc.)

Reduce your code's conditional branching as much as possible. Prefer `return`
statements to `else/else if` if possible. Keep it flat!

## Asynchronous code

Prefer `async`/`await` over `then`able Promises. Unless you need fine control
over abortable network requests (which you probably don't), async await is much
easier to read and write.

## React Fundamentals

Like mentioned above, you guys are understandbly behind on this, but here are a
few things:

- Try to use functional, hooks based components. While Class components are
  fine, you'll be seeing less and less of them as time goes on.
- Never forget the `key` prop when rendering a list of items (`map(), etc.`).
  Use ESLint to enforce this if needed.
- Utilize fragments `<>` when appropriate! Unless you need a `<div>` for styling
  purposes, don't put one.

## Code Formatting (Use Prettier)

There were several instances of generally questionable formatting (poorly
indented GraphQL template strings and JSX `return` statements). Instead of doing
this by hand (and skipping it cuz we're all lazy fucks), just use Prettier.

Prettier will automatically format your code so you don't have to. Use it and
forget about formatting forever.

## Pick a single styling solution

I'm not gonna nitpick your app's design to death since we all know it's pretty
non-existant, but you have other more technically related styling issues in your
application.

You currently have multiple fragmented styling approaches being used in this
application.

- Styled Components
- Classnames
- Semantic UI

It would be ideal if you picked one and remained consistent. I personally
recommend any of the following:

- [tailwindcss](https://tailwindcss.com/) a more traditional utility based CSS
  approach. I've personally leaned toward this recently due to it having better
  performance than the next two.
- [chakra-ui](https://chakra-ui.com/) if you want a more React-y props-based
  approach. I like this style of API better, but it has performance implications
  for larger apps/sites.
- [styled-system](https://styled-system.com/) if you want a more low-level
  React-y props approach. `charkra-ui` uses this under the hood. My personal
  favorite, but can be a bit intimidating for newer developers and still comes
  with a performance cost.

Traditional CSS works too, but I personally strongly dislike it at scale for
various reasons. (Naming conventions like BEM are error-prone, no enforced
consistency, etc.)

See the following for arguments against traditional semantic CSS:

- [utility-first](https://tailwindcss.com/docs/utility-first/)
- [three-tenets-of-styled-system](https://jxnblk.com/blog/the-three-tenets-of-styled-system/)
