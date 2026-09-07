export const PROJECTS_QUERY = /* groq */ `
  *[_type == "project"] | order(date desc) {
    "slug": slug.current,
    title,
    date,
    excerpt,
    body,
    image,
    imageAlt
  }
`;

export const PROJECT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    date,
    excerpt,
    body,
    image,
    imageAlt
  }
`;

export const TEAM_MEMBERS_QUERY = /* groq */ `
  *[_type == "teamMember"] | order(order asc) {
    name,
    role,
    photo
  }
`;
