---
applyTo: "**/!(*.stories).ts?(x)"
---

PRD Located at
`./docs/PRD.md`

Instructions for models are in
`./docs/Models.md`

Instructions for styling are in
`./docs/Styling.md`

Instructions for utilites are in
`./docs/Utilities.md`

Specific component instructions are in `./.github/prompts/*`
`./.github/prompts/columns.prompt.md` // how table columns should work
`./.github/prompts/details.prompt.md` // how how a details page should be setup
`./.github/prompts/filters.prompt.md` // how table filters should work
`./.github/prompts/form.prompt.md` // how a form should be created
`./.github/prompts/new-vite-pod.prompt.md` // how a new model pod should be created
`./.github/prompts/shadcn.prompt.md` // how a shadcn component should work
`./.github/prompts/slot.prompt.md` // how component slots should be created
`./.github/prompts/storybook.prompt.md` // how to create a storybook file

When starting with a new component, always use `#ui_code_tools` to generate the component, it will stub everything for you

## REQUIRED

When creating components, **ALWAYS** create a storybook file to verify how it looks.

Use `#ui_code_tools storybook` to launch storybook if its not already available on `http://localhost:6006`

**NOTE**
This project uses shadcn and already has all of the components installed. They are in `./packages/ui/src/shadcn/ui`

**This project is using Mobx for state management**

- Favor simple, maintainable solutions over verbose code. Assume understanding of language idioms and design patterns.
- Highlight potential performance implications and optimization opportunities in suggested code.
- Frame solutions within broader architectural contexts and suggest design alternatives when appropriate.
- Focus comments on 'why' not 'what' - assume code readability through well-named functions and variables.
- Proactively address edge cases, race conditions, and security considerations without being prompted.
- When debugging, provide targeted diagnostic approaches rather than shotgun solutions.
- Most importantly, KISS should be the motto of all of your code
- I dont like spread operations for component props, keep the props within the props unless they need to be pulled out.
- If they need to be pulled out, use rawProps:ComponentProps const {className,...props} = rawProps
- use debugLog to log complex things, its console.log but with protections
- keep components small and simple
- use tailwind for all classes no inline styles
- if there are conditional classes use cn() its a wrapper that combines clsx and twmerge
- if there are classes for states like hover: targetting: etc etc, use clsx([regular_classes,hover: classes, group:classes]) etc so the related classes are easy to read together in the array
- no single letter variables outside of iterators
- no complex flows greater then 3 for combining .map.filter.join.include etc etc

**IMPORTANT**

Whenever you get feedback, always add it to .agents/LEARNINGS.md with "What i learned" and "How you can improve the instructions". Always do this before writing the new code
