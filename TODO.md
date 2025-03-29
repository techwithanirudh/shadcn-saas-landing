# To-Do List

- [x] Add `fuma-comments` for comment integration.
- [ ] Implement newsletter support:
  - Implement a newsletter form (Done)
  - Send a welcome email on subscription. (Done)
  - Create a pre-build script that:
    - Scans all `.mdx` files.
    - Converts them to HTML.
    - Updates an existing Resend broadcast item, or creates a new one if it doesn’t exist.
  - Publishing is controlled manually by running a `publish` script.
  - Consider using [Beehiiv](https://www.beehiiv.com/) as an alternative.
- [ ] Add an AI-powered "Ask Me Anything" chat to the blog template using the existing `fumadocs-mcp` setup.
- [ ] Use [pqoqubbw animated icons](https://icons.pqoqubbw.dev/).
- [ ] Add a smooth dark/light mode view transition like [0.email](https://0.email).
- So, when a user is re-putting their email it might mean they like to resubscribe, so update to unsubscribe: false
- look at https://www.joshwcomeau.com/react/wonderful-emails-with-mjml-and-mdx/