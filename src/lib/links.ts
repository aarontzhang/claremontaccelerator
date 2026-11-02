// Every site-wide external URL and contact address lives here. Several of these
// were previously declared in two or three places at once (MAILING_LIST_URL was
// defined under the same name in both Navbar.tsx and intern/page.tsx, and again
// in next.config.ts), which meant updating a form link silently missed callers.
//
// Per-person links (team member LinkedIn profiles, startup websites) are data
// and stay in their own files / markdown frontmatter.

export const CONTACT_EMAIL = "claremontaccelerator@gmail.com";
export const FOUNDER_CONTACT_EMAIL = "cwitzansky29@cmc.edu";

export const MAILING_LIST_URL = "https://forms.gle/G4489e8ERFvpuY7V9";
export const SUBSTACK_URL = "https://claremontaccelerator.substack.com/";
export const DONATION_URL = "https://www.cmc.edu/giving/institutes/rlcie";

export const LINKEDIN_URL = "https://www.linkedin.com/company/claremontaccelerator/";
export const INSTAGRAM_URL = "https://www.instagram.com/claremontaccelerator/";

// CA Studio applications are open; this is the live respondent-facing link.
export const STUDIO_APPLICATION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeg2lSHEbIUKTTvpywkVSm-A_GKXojY0z3jSTLk5ASCzPBt1w/viewform";

// The main-cohort application is not an in-site flow yet — /found and the
// homepage both point at the /found/cohort email mockup instead. Note the URL
// below is an owner-only `/edit` link, so it is NOT safe to link publicly as-is;
// it needs its `viewform` equivalent before it can be used.
export const FOUNDER_APPLICATION_URL_EDIT_ONLY =
  "https://docs.google.com/forms/d/1ODnyqt-Y0f1UXhx-2BRLloTDYEwGQIL-UJDZOqmDgA4/edit";

export const MENTOR_FORM_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Mentor Interest"
)}`;
