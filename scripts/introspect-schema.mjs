const url = "https://kaosk10.sg-host.com/graphql";

// Get the Page type and its pageContentSections.sections field type
const query = `
  query {
    __type(name: "Page") {
      name
      fields {
        name
        type {
          name
          kind
          ofType { name kind }
          possibleTypes { name }
        }
      }
    }
  }
`;

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query }),
});
const data = await res.json();

const pageType = data?.data?.__type;
if (!pageType) {
  console.log(JSON.stringify(data, null, 2));
  process.exit(1);
}

const sectionsField = pageType.fields?.find((f) => f.name === "pageContentSections");
if (!sectionsField) {
  console.log("pageContentSections field not found. Fields:", pageType.fields?.map((f) => f.name));
  process.exit(1);
}

// Get PageContentSections type
const sectionsTypeName = sectionsField.type?.name || sectionsField.type?.ofType?.name;
console.log("pageContentSections type:", sectionsTypeName);

// Query for PageContentSections to get its sections field
const query2 = `
  query {
    __type(name: "PageContentSections") {
      name
      fields {
        name
        type {
          name
          kind
          possibleTypes { name }
        }
      }
    }
  }
`;

const res2 = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: query2 }),
});
const data2 = await res2.json();
const pcType = data2?.data?.__type;
console.log("\nPageContentSections fields:", JSON.stringify(pcType?.fields, null, 2));

// Get possibleTypes for the sections union
const sectionsFieldType = pcType?.fields?.find((f) => f.name === "sections")?.type;
const unionName = sectionsFieldType?.name;
const possibleTypes = sectionsFieldType?.possibleTypes || [];

console.log("\nSections union name:", unionName);
console.log("\nLayout types (possibleTypes):");
possibleTypes.forEach((t) => console.log("  -", t.name));
