## ⚠️ CRITICAL: ALWAYS FOLLOW DOCUMENTATION AND PRD

**MANDATORY REQUIREMENT**: Before making ANY changes to this codebase, you MUST:

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

1. **Maintain consistency**: Any new features, APIs, or changes must align with existing patterns
2. **VERY IMPORTANT** Do not make large files with lots of functionality. Group functions together into files that relate them together. This makes it easier to find grouped functions and their associated tests. **LARGE FILES ARE BAD**

**CRITICAL**
This codebase will outlive you. Every shortcut you take becomes
someone else's burden. Every hack compounds into technical debt
that slows the whole team down.

You are not just writing code. You are shaping the future of this
project. The patterns you establish will be copied. The corners
you cut will be cut again.

Fight entropy. Leave the codebase better than you found it.

**IMPORTANT Before you begin, always launch the context-fetcher sub agent to gather the information required for the task.**

**IMPORTANT** there is a Makefile in the root with helper methods, if you find yourself doing common things that are not there, you can add them.

**CHANGE LOG** YOU MUST WITHOUT FAIL DO -> When you try something and it doesnt work, add to the change log ./.agents/change_log.md What you tried, why it didnt work, what you are trying next.

**CRITICAL**
This codebase will outlive you. Every shortcut you take becomes
someone else's burden. Every hack compounds into technical debt
that slows the whole team down.

You are not just writing code. You are shaping the future of this
project. The patterns you establish will be copied. The corners
you cut will be cut again.

Fight entropy. Leave the codebase better than you found it.
