import { siteConfig } from "./src/lib/site-config";

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: 'null',

  // basic site info (required)
  name: 'Explosing Roses',
  domain: 'legedev',
  author: 'Privilege Mendes',

  // open graph metadata (optional)
  description: 'Privilege Site',

  // social usernames (optional)
  twitter: 'privilegemendes',
  github: 'privilegemendes/ExplodingRoses',
  linkedin: 'privilegemendes',
})
