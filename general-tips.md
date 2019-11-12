# General Tips

## Use Prettier

Use prettier for automatic code formatting. This makes life way easier once you
get into it, trust me.

## Pick a single styling solution

You have multiple styling approaches being used in this application.

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
