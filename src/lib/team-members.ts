/**
 * Fetch team members from WordPress grouped by department taxonomy.
 * Departments are sorted according to DEPARTMENT_ORDER below.
 */

import { fetchGraphQL } from "./wordpress";
import type { TeamMember } from "@/components/sections/MeetTheTeamSection";
import type { TeamDepartment } from "@/components/sections/TeamArchiveSection";

/* ─── Department sort order ──────────────────────────────────────────────── */

const DEPARTMENT_ORDER = [
  "executive-leadership",
  "commercial-leadership",
  "product-and-technology-leadership",
  "operations-and-customer-leadership",
  "people-and-finance-leadership",
];

/* ─── GraphQL query ──────────────────────────────────────────────────────── */

const TEAM_MEMBERS_QUERY = `
  query TeamMembers {
    teamMembers(first: 100) {
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        department {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface WPTeamMemberNode {
  id: string;
  title: string;
  content?: string | null;
  featuredImage?: {
    node?: { sourceUrl?: string; altText?: string } | null;
  } | null;
  department?: {
    nodes: { name: string; slug: string }[];
  };
  // TODO: add teamMemberFields { jobTitle linkedinUrl } once ACF field group is GraphQL-enabled
}

function normalizeNode(node: WPTeamMemberNode): TeamMember {
  return {
    name: node.title ?? "",
    title: "",
    imageSrc: node.featuredImage?.node?.sourceUrl ?? "",
    imageAlt: node.featuredImage?.node?.altText ?? node.title,
    bio: node.content ?? undefined,
    linkedinUrl: undefined,
  };
}

/* ─── Main fetch ─────────────────────────────────────────────────────────── */

export async function fetchTeamMembersByDepartment(): Promise<TeamDepartment[]> {
  const data = await fetchGraphQL<{ teamMembers: { nodes: WPTeamMemberNode[] } }>(
    TEAM_MEMBERS_QUERY
  );

  const nodes = data?.teamMembers?.nodes ?? [];

  // Group members by department, preserving the order departments first appear.
  const deptMap = new Map<string, { name: string; members: TeamMember[] }>();

  for (const node of nodes) {
    const depts = node.department?.nodes ?? [];
    const member = normalizeNode(node);

    if (depts.length === 0) {
      const key = "__uncategorised__";
      if (!deptMap.has(key)) deptMap.set(key, { name: "Team", members: [] });
      deptMap.get(key)!.members.push(member);
    } else {
      for (const dept of depts) {
        if (!deptMap.has(dept.slug)) deptMap.set(dept.slug, { name: dept.name, members: [] });
        deptMap.get(dept.slug)!.members.push(member);
      }
    }
  }

  const all = Array.from(deptMap.entries());

  all.sort(([slugA], [slugB]) => {
    const ia = DEPARTMENT_ORDER.indexOf(slugA);
    const ib = DEPARTMENT_ORDER.indexOf(slugB);
    // Known departments come first in defined order; unknowns go to the end.
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return all.map(([, dept]) => dept);
}
