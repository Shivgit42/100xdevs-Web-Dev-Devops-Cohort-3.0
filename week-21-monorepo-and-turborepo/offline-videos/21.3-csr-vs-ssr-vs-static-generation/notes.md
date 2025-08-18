## CSR

- Client-side rendering (CSR) is a modern technique used in web development where the rendering of a webpage is performed in the browser using JavaScript. Instead of the server sending a fully rendered HTML page to the client
- When sending request to the server from the browser(client), first it returns an empty HTML page, then there is script tag which contains javascript and css files which contains styling, then the javascript files is being sent to the browser side which is being rendered or shown on the UI.

## Downsides?

1. Not SEO optimised
1. User sees a flash before the page renders
1. Waterfalling problem

## Server side rendering

When the rendering process (converting JS components to HTML) happens on the server, it’s called SSR.

- Why SSR?

1. SEO Optimisations
1. Gets rid of the waterfalling problem
1. No white flash before you see content

## Downsides of SSR?

1. Expensive since every request needs to render on the server
1. Harder to scale, you can’t cache to CDNs

## Static site generation

- If a page uses Static Generation, the page HTML is generated at build time. That means in production, the page HTML is generated when you run next build. This HTML will then be reused on each request. It can be cached by a CDN.

- Why?<br />
  If you use static site generation, you can defer the expensive operation of rendering a page to the build time so it only happens once.
