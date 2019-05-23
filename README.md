This site is an isomorphic (universal) React app that's bootstrapped with Razzle
https://github.com/jaredpalmer/razzle

The reason I've chosed to go this route is for SEO purposes.  Since this site's main functionality will be as a web store, being returned in search results is important.  Since React is just JavaScript, search engine crawlers won't pick up on the content of the site (they'll see it as a blank page).  A solution to this is to server-side render the markup on the first request, which is done with an isomorphic SPA.  

The main difference from being fully server-side rendered is that all rendering past the intial render will be handled by the client.
