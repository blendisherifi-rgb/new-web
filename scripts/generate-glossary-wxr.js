const path = require("path");
const fs = require("fs");
const terms = require(path.join(__dirname, "../glossary-terms-import.json"));

const item = (t, id) => `
  <item>
    <title><![CDATA[${t.title}]]></title>
    <link>https://softco.com/glossary/${t.slug}/</link>
    <dc:creator><![CDATA[admin]]></dc:creator>
    <description></description>
    <content:encoded><![CDATA[]]></content:encoded>
    <excerpt:encoded><![CDATA[]]></excerpt:encoded>
    <wp:post_id>${id}</wp:post_id>
    <wp:post_date><![CDATA[2026-02-27 12:00:00]]></wp:post_date>
    <wp:post_name><![CDATA[${t.slug}]]></wp:post_name>
    <wp:post_type><![CDATA[glossary_term]]></wp:post_type>
    <wp:status><![CDATA[publish]]></wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:comment_status><![CDATA[closed]]></wp:comment_status>
    <wp:ping_status><![CDATA[closed]]></wp:ping_status>
  </item>`;

const header = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>Glossary Terms Import</title>
  <link>https://softco.com/glossary/</link>
  <description>Glossary terms migrated from legacy site</description>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>https://softco.com</wp:base_site_url>
  <wp:base_blog_url>https://softco.com</wp:base_blog_url>
`;

const items = terms.map((t, i) => item(t, i + 1)).join("\n");
const footer = "\n</channel>\n</rss>";

fs.writeFileSync(path.join(__dirname, "../glossary-terms-import.xml"), header + items + footer);
console.log("Wrote", terms.length, "terms to glossary-terms-import.xml");
