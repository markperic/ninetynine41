/**
 * One-off migration: pushes the content that used to live as hardcoded
 * arrays/JSX (home/about/what-we-do/offline/donate/churches/contact/our-team
 * page copy, plus projects.ts's PROJECTS and our-team's TEAM) into Sanity as
 * real documents, so nothing written already is lost when those files
 * switch to fetching from Sanity. Run once, after `npx sanity init`:
 *
 *   npx tsx scripts/seed-sanity.mts
 *
 * Safe to rerun — every write uses createIfNotExists, so it never
 * overwrites content already edited in Studio.
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and
 * SANITY_API_WRITE_TOKEN (create one with Editor access at
 * sanity.io/manage → API → Tokens) in .env.local.
 */
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import path from "node:path";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

type ImageRef = { _type: "image"; asset: { _type: "reference"; _ref: string } };

const imageCache = new Map<string, Promise<ImageRef>>();

/** `relPath` is relative to /public, e.g. "images/srey1.webp" or "brand/gdg-logo.png". */
function uploadImage(relPath: string): Promise<ImageRef> {
  if (!imageCache.has(relPath)) {
    imageCache.set(
      relPath,
      (async () => {
        const filePath = path.join(process.cwd(), "public", relPath);
        const asset = await client.assets.upload("image", createReadStream(filePath), { filename: path.basename(relPath) });
        return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
      })(),
    );
  }
  return imageCache.get(relPath)!;
}

function toPortableText(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: "block" as const,
    _key: crypto.randomUUID(),
    style: "normal",
    children: [{ _type: "span" as const, _key: crypto.randomUUID(), text }],
  }));
}

const TEAM = [
  { name: "Nathan Higgins", role: "Founder" },
  { name: "Tomas Soner", role: "Business Strategy" },
  { name: "Stacey Peric", role: "Marketing & Communications" },
  { name: "Mark Peric", role: "Website & Graphic Design" },
  { name: "Lachie Goldsworthy", role: "Brand Strategy" },
];

const PROJECTS = [
  {
    slug: "srey-oun-small-business",
    title: "Small Business Success for Srey Oun*",
    date: "2025-06-09",
    excerpt:
      "We successfully assisted Srey Oun's* mother in launching a small business to support her family following her emergency surgery.",
    body: [
      "We successfully assisted Srey Oun's* mother in launching a small business to support her family following her emergency surgery.",
      "With a stable income back in the household, the family no longer carries the same day-to-day uncertainty — the same foundation Ninetynine41 helped put in place when it worked with volunteers to build the family's flood-safe home.",
    ],
    image: "images/srey1.webp",
    imageAlt: "The flood-safe house built for Srey Oun's family",
  },
  {
    slug: "building-a-future-for-srey-oun",
    title: "Building a Future for Srey Oun*",
    date: "2025-06-09",
    excerpt:
      "At just 7 years old, Srey Oun* was welcomed into the SHE Rescue Home after surviving human trafficking and sexual exploitation by someone who had gained the family's trust.",
    body: [
      "At just 7 years old, Srey Oun* was welcomed into the SHE Rescue Home after surviving human trafficking and sexual exploitation by someone who had gained the family's trust.",
      "Because of generous supporters, Ninetynine41 was able to purchase land for the family, and a team of volunteers built a brand-new, flood-safe house in just four days.",
    ],
    image: "images/srey1.webp",
    imageAlt: "The flood-safe house built for Srey Oun's family",
  },
];

async function seedTeamAndProjects() {
  console.log("Seeding team members...");
  for (const [i, member] of TEAM.entries()) {
    await client.createIfNotExists({
      _id: `teamMember-${member.name.toLowerCase().replace(/\s+/g, "-")}`,
      _type: "teamMember",
      name: member.name,
      role: member.role,
      order: i + 1,
    });
  }

  console.log("Seeding projects...");
  for (const project of PROJECTS) {
    await client.createIfNotExists({
      _id: `project-${project.slug}`,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      date: new Date(project.date).toISOString(),
      excerpt: project.excerpt,
      body: toPortableText(project.body),
      image: await uploadImage(project.image),
      imageAlt: project.imageAlt,
    });
  }
}

async function seedSiteSettings() {
  console.log("Seeding site settings...");
  await client.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    email: "info@ninetynine41.org",
    location: "Brisbane, Australia",
    facebookUrl: "https://www.facebook.com/profile.php?id=61574110970003",
    instagramUrl: "https://www.instagram.com/ninety_nine4one/",
    footerTagline: "Hope loading…",
    footerDescription:
      "We are an action-focused charity bringing hope and dignity to those who need it most. Ninetynine41 is a registered ACNC charity.",
  });
}

async function seedHomePage() {
  console.log("Seeding home page...");
  await client.createIfNotExists({
    _id: "homePage",
    _type: "homePage",
    hero: {
      headline: "For the ONE who has no one.",
      highlightWords: ["ONE"],
      subcopy: "Ever wanted to make a change in the world but didn't know where to start? Ninetynine41 is your answer.",
      ctaLabel: "Change starts here",
    },
    bigStatement: [
      { _key: crypto.randomUUID(), text: "Built on", highlighted: false },
      { _key: crypto.randomUUID(), text: "Trust", highlighted: true },
      { _key: crypto.randomUUID(), text: "Proven through", highlighted: false },
      { _key: crypto.randomUUID(), text: "ACTION.", highlighted: true },
    ],
    trustSlides: [
      {
        _key: crypto.randomUUID(),
        image: await uploadImage("images/slide1web.jpg"),
        alt: "Ninetynine41 community project",
        content: "Ninetynine41 fund, deliver and sustain real-world change through specific community projects, helping the world's poorest people.",
      },
      {
        _key: crypto.randomUUID(),
        image: await uploadImage("images/slide2web.jpg"),
        alt: "Ninetynine41 community project",
        content: "Ninetynine41 has the background, infrastructure and on-the-ground intel to bridge the gap between challenge and solution.",
      },
      {
        _key: crypto.randomUUID(),
        image: await uploadImage("images/slide3web.jpg"),
        alt: "Ninetynine41 community project",
        content: "We don't take over; we strengthen what exists. We trust local knowledge and trust the process. We see each project through to completion.",
      },
    ],
    whatWeDoHeading: "What We Do",
    whatWeDoFeatures: [
      {
        _key: crypto.randomUUID(),
        icon: "HelpCircle",
        eyebrow: "Why",
        title: "Kindness",
        body: "We are all connected. What happens to ONE, happens to all. There is great need and we are moved to make a difference, no matter how small. No ONE should go without. Every ONE matters.",
      },
      {
        _key: crypto.randomUUID(),
        icon: "Handshake",
        eyebrow: "How",
        title: "Connection",
        body: "Change begins at a grassroots level. Ninetynine41 comes alongside local organisations, community leaders and volunteers to create meaningful outcomes. We don't take over. We seek to understand through collaboration, empower through ongoing support and implement solutions to sustain in the long-term.",
      },
      {
        _key: crypto.randomUUID(),
        icon: "Link2",
        eyebrow: "What",
        title: "Action",
        body: "Less talk. Better outcomes. Ninetynine41 is interested in lasting change and the projects we select reflect this. Working closely with leading Australian charity, Global Development Group, gives us insight into the most urgent needs around the globe. We share the same vision; to bring change to the ONE to bring change to many.",
      },
    ],
    governance: {
      heading: "Governance",
      body: "Ninetynine41 operates under the governance of leading Australian development charity, Global Development Group.",
    },
    donorsHeading: "Donors",
    donors: await Promise.all(
      [
        ["Every Bodies Physio", "brand/donor-eb-physio.png"],
        ["KIND.SIR Leatherware", "brand/donor-kindsir.png"],
        ["PBN Constructions", "brand/donor-pbn.png"],
        ["Piwinski Constructions", "brand/donor-piwinski.png"],
        ["Harcourts Newcastle", "brand/donor-harcourts.png"],
        ["TS Projects", "brand/donor-ts-projects.png"],
        ["ESME Property Staging", "brand/donor-esme.png"],
      ].map(async ([name, img]) => ({ _key: crypto.randomUUID(), name, logo: await uploadImage(img) })),
    ),
    impactCta: {
      lines: [
        { _key: crypto.randomUUID(), text: "Bring change to ONE.", highlightWords: ["ONE"] },
        { _key: crypto.randomUUID(), text: "Bring change to many.", highlightWords: ["many"] },
      ],
      ctaLabel: "Let's get to work",
      backgroundImage: await uploadImage("brand/cta-running.jpg"),
    },
    testimonialsHeading: "What communities say about Ninetynine41",
    testimonials: [
      {
        _key: crypto.randomUUID(),
        quote:
          "Partnering with Ninetynine41 has helped us to make significant impact in a much shorter time than we expected. The team know how to find those small issues that become huge road blocks and turn them into practical solutions.",
        name: "SHE Rescue",
        photo: await uploadImage("images/library/landscape09.jpg"),
      },
      {
        _key: crypto.randomUUID(),
        quote:
          "It has been a privilege to partner with Nathan and the team at Ninetynine41 in providing a first-ever toilet and bathroom for a hill tribe family in a remote village in northern Thailand. We have been greatly encouraged by their commitment to excellence and their clear dedication to transforming lives and communities through strategic partnerships.",
        name: "Tim Daniell",
        role: "Founder & Director, Building Strong Families Foundation",
        photo: await uploadImage("brand/testimonial-bsf.jpg"),
      },
      {
        _key: crypto.randomUUID(),
        quote:
          "Ninetynine41 didn't just fund our water project, they walked the whole journey with us. Their team asked the right questions before a single dollar moved, and that groundwork is why the well is still running two years on.",
        name: "Amara Okafor",
        role: "Program Lead, Highland Community Trust",
        photo: await uploadImage("images/library/landscape07.jpg"),
      },
      {
        _key: crypto.randomUUID(),
        quote:
          "What sets Ninetynine41 apart is follow-through. Plenty of organisations show up for the launch photo; they showed up for the boring maintenance visits eighteen months later, which is when it actually mattered.",
        name: "Daniel Reyes",
        role: "Executive Director, Open Hands Foundation",
        photo: await uploadImage("images/library/landscape12.jpg"),
      },
    ],
  });
}

async function seedAboutPage() {
  console.log("Seeding about page...");
  await client.createIfNotExists({
    _id: "aboutPage",
    _type: "aboutPage",
    hero: {
      headline: "About Ninetynine41",
      highlightWords: [],
      subcopy: "Ninetynine41 fund, deliver and sustain specific community projects, bringing hope and dignity to those who need it most.",
      ctaLabel: "Our Impact",
    },
    changeForOne: {
      heading: "Change for the ONE.",
      headingHighlight: "ONE",
      heading2: "Change for the community.",
      image1: await uploadImage("images/about1.webp"),
      image2: await uploadImage("images/about2.webp"),
      paragraphs: [
        "Ninetynine41 fund, deliver and sustain real-world change through specific community projects helping the world's poorest people.",
        "Our commitment begins at a local level. We foster relationships within the local neighbourhood; with local leaders and the community. We understand real change is a collaborative effort. We don't take over.",
        "By partnering with local organizations and bringing our support, we amplify the good already present in these communities.",
        "In a world where challenges often overshadow positivity, we're not just dreamers, we are an action-focused organisation.",
        "We provide strategy and practical support bridging the gap from idea, to impact, to sustainability.",
      ],
    },
    stats: {
      column1Stat1Figure: "13+",
      column1Stat1Note: "Community projects funded, delivered and sustained since founding",
      column1Stat2Figure: "7",
      column1Stat2Note: "Corporate and community partners backing the mission today",
      column2Stat1Figure: "5+",
      column2Stat1Note: "Countries reached across Asia, Africa and Australia",
      column2Stat2Figure: "6",
      column2Stat2Note: "Nations home to an active project: Cambodia, Thailand, Sri Lanka, Nepal, Kenya, Australia",
      backdrop1: await uploadImage("images/world-map-web.jpg"),
      backdrop2: await uploadImage("images/community-web.jpg"),
      scene1Text: "Change for the ONE. Change for the community.",
      scene2Text: "You don't have to be rich to make a difference.",
      footerLabel: "Global Projects",
    },
    supportCta: {
      text: "You don't have to be rich to make a difference.",
      linkLabel: "Ways to support Ninetynine41",
    },
    testimonial: {
      eyebrow: "Testimonials",
      heading: "Safety for the ONE",
      headingHighlight: "ONE",
      heading2: "Srey Oun",
      image: await uploadImage("images/srey1.webp"),
      quote:
        "Because of generous supporters like you, we've been able to purchase land for the family, and thanks to a team of volunteers, we built a brand-new, flood-safe house in just four days.",
      name: "Srey Oun",
      role: "Project Participant",
    },
    weFocusOn: {
      eyebrow: "Our Expertise",
      heading: "We Focus On",
      features: [
        {
          _key: crypto.randomUUID(),
          icon: "Target",
          title: "Strategy & Structure",
          body: "Ninetynine41 brings strategy, structure and important on-the-ground information to create practical, cost-effective solutions to pressing community issues. A sustainable plan is paramount so projects are not only implemented but also supported and maintained.",
        },
        {
          _key: crypto.randomUUID(),
          icon: "Users",
          title: "Grassroots Connection",
          body: "We maintain close liaison with local community leaders to create practical strategy particular to the region. The communities we serve are our number one priority.",
        },
        {
          _key: crypto.randomUUID(),
          icon: "Globe2",
          title: "Global Vision",
          body: "We are an Australian organisation addressing important global issues by connecting like-minded people lending a hand where they can. Together, we're leaving a legacy both locally and globally.",
        },
      ],
    },
  });
}

async function seedWhatWeDoPage() {
  console.log("Seeding what we do page...");
  await client.createIfNotExists({
    _id: "whatWeDoPage",
    _type: "whatWeDoPage",
    hero: {
      headline: "What We Do",
      highlightWords: ["Do"],
      subcopy: "We are the bridge between need and impact.",
      ctaLabel: "How We Work",
    },
    actionPlan: {
      eyebrow: "Ninetynine41",
      heading: "An action-focused plan leads to a sustainable outcome.",
      subcopy: "Actions speak louder than words.",
      progressLabel: "Project Funding Tracking",
      progressPercent: 90,
      image: await uploadImage("images/about2.webp"),
    },
    collaborate: {
      heading: "We don't take over.",
      heading2: "We collaborate.",
      subcopy: "We strengthen, support and see it through.",
      image: await uploadImage("images/about1.webp"),
      points: [
        {
          _key: crypto.randomUUID(),
          icon: "Handshake",
          title: "We respect the locals.",
          body: "We listen to the needs of the community and, using the local information given, provide a sustainable solution to a pressing problem.",
        },
        {
          _key: crypto.randomUUID(),
          icon: "Link2",
          title: "We stay connected.",
          body: "Sustainability is key. We deliver and fund the projects but our priority is providing a sustainable project everyone can be proud of.",
        },
      ],
    },
    ctaBanner: {
      lines: [{ _key: crypto.randomUUID(), text: "For the ONE who has no one.", highlightWords: ["ONE"] }],
      ctaLabel: "Ways to help right now",
      backgroundImage: await uploadImage("images/theone-web.jpg"),
    },
    pillars: [
      {
        _key: crypto.randomUUID(),
        icon: "Target",
        title: "Strategy for Action & Maximum Impact",
        body: "Working with local community leaders, Ninetynine41 develop clear and realistic strategic plans to overcome specific challenges. We collaborate with the community to identify the need and create a sustainable answer to a pressing problem. Our partnership with Global Development Group gives us the clarity and insight to move community projects from intention to action, and from action to outcomes.",
      },
      {
        _key: crypto.randomUUID(),
        icon: "HeartHandshake",
        title: "Fundraising & Donor Confidence",
        body: "Ninetynine41 makes it simple for donors to support specific projects which bring lasting change to communities in need. Donors give to causes they trust, and trust is built through transparency, structure and consistent, open communication. We work closely with Global Development Group as our advisory body, so donor reporting stays consistent and available.",
      },
      {
        _key: crypto.randomUUID(),
        icon: "Repeat",
        title: "Fund | Deliver | Sustain",
        body: "Implementing a community project is challenging; maintaining it afterward is often more so. Our goal is to leave communities with the strategy to sustain the work long after we've finished. We provide practical delivery oversight so funded projects are managed well, milestones are met, and outcomes are reported and sustained with integrity.",
      },
    ],
  });
}

async function seedOfflinePage() {
  console.log("Seeding OFFLINEFOR99 page...");
  await client.createIfNotExists({
    _id: "offlinePage",
    _type: "offlinePage",
    hero: {
      backgroundImage: await uploadImage("images/offlinehero-web.jpg"),
      logo: await uploadImage("images/offline99-logo-stacked@2x.png"),
      headline: "OFFLINEFOR99",
      highlightWords: ["99"],
      subcopy1: "Caught on the dreaded doomscroll? Get offline to get switched on.",
      subcopy2: "Get offline for 99 minutes and feel alive. No catch. Your ONE life is waiting for you.",
      ctaLabel: "I Want In",
    },
    intro: {
      heading: "Feeling tired & bored of your phone?",
      heading2: "Yup. Us too.",
      paragraphs: [
        "We want to FEEL more. Actually LIVE our life.",
        "Enter OFFLINEFOR99.",
        "OFFLINEFOR99 is an initiative where you put the phone down, jump offline for 99 minutes, feel alive and help those around the world who need it most. Get your friends and family involved — a group of mates doing the challenge together, raising money for communities who really need it, and feeling good doing it. Register your interest below to be the first to find out how to get OFFLINEFOR99 in your school, church or organisation.",
      ],
    },
    registerForm: {
      heading: "I Want In",
      formHeading: "Register Your Interest",
      registrationTypes: ["Individual", "School", "Church", "Organisation"],
      states: ["QLD", "NSW", "VIC", "ACT", "SA", "WA", "NT", "TAS"],
    },
  });
}

async function seedDonatePage() {
  console.log("Seeding donate page...");
  const frameId = "9941-donate-embed";
  await client.createIfNotExists({
    _id: "donatePage",
    _type: "donatePage",
    panel: {
      eyebrow: "Donate Today",
      heading: "Your legacy starts here.",
      headingHighlight: "here",
      heading2: "Ninetynine41.",
      intro: "Please use the form below to make your tax deductible donation. Payments are processed directly by Global Development Group.",
      thankYouLabel: "Thank you",
      legalText1:
        "Ninetynine41 is a partner for Project J9941N with Global Development Group (ABN 57 102 400 993), an Australian NGO approved by the Minister for Foreign Affairs.",
      legalText2:
        "Gifts over $2 are tax deductible in the USA, Australia, and over $5 New Zealand. In the UK, eligible donors can claim Gift Aid. All donations are received subject to GDG's donation and privacy policy (www.gdg.org.au/policy). If excess funds are received, they may be applied to other approved project activities.",
    },
    embedHtml: `<div class="raisely-donate" data-campaign-path="global-development-group-project" data-profile="j9941n-ninetynine41?projectNum=J9941N&projectName=Ninetynine41" data-width="100%" data-height="500">
  <iframe src="https://global-development-group-project.raisely.com/embed/j9941n-ninetynine41?projectNum=J9941N&projectName=Ninetynine41?targethost=https%3A%2F%2Fninetynine41.org&frameId=${frameId}" data-frame-id="${frameId}" title="Embedded donation form" allow="payment" width="100%" height="500" style="border:0;display:block"></iframe>
</div>`,
    supportCta: {
      heading: "You don't have to be rich to make a difference.",
      paragraphs: [
        "Ever wondered how you can help others when your budget is already tight? Ninetynine41 is your answer.",
        "We have many avenues for donors just like you to lend a hand. Our Giving Legacy begins at $8.25/month.",
        "Perhaps you're a professional who has a skill or time to donate? We'd love to hear from you.",
      ],
    },
  });
}

async function seedChurchesPage() {
  console.log("Seeding churches page...");
  await client.createIfNotExists({
    _id: "churchesPage",
    _type: "churchesPage",
    hero: {
      logo: await uploadImage("brand/9941-logo-stacked-reverse.png"),
      headline: "For the ONE who has no one.",
      highlightWords: ["ONE"],
    },
    intro: {
      paragraph1: "Feeling called to make a change but not sure where to start? Ninetynine41 is your answer.",
      paragraph2:
        "Ninetynine41 fund, deliver and sustain real-world change through specific community projects, helping some of the world's poorest people. Ninetynine41 is a registered Australian charity with the ACNC (The Australian Charities and Not-for-profits Commission). Working closely with overarching Australian charity, Global Development Group, Ninetynine41 has the background, infrastructure and on-the-ground intel to bridge the gap between challenge and solution.",
    },
    trust: {
      heading: "Built on trust. Proven through action.",
      paragraph:
        "Ninetynine41 chooses projects based on requests, reports and information provided to us by Global Development Group. Projects are assessed for their suitability, sustainability and maintainability. Ninetynine41 is committed to taking on only the projects we can see through to completion. Projects are monitored by GDG Project Officers through preliminary stages, during roll-out and beyond completion.",
    },
    callToAction: {
      heading: "Will you answer the call?",
      intro: "There are two simple ways to answer the call:",
      weeklyAmount: "$99/week",
      weeklyYearly: "$5,148/year",
      monthlyAmount: "$99/month",
      monthlyYearly: "$1,188/year",
      lglFormId: "22QylqlNw7D4p-6Xvzlclg",
      closingHeading: "We can do this TOGETHER.",
      closingBody: "Would you consider supporting Ninetynine41?",
    },
  });
}

async function seedContactPage() {
  console.log("Seeding contact page...");
  await client.createIfNotExists({
    _id: "contactPage",
    _type: "contactPage",
    heading: "Contact Ninetynine41",
    description: "We'd love to hear from you. Please fill in the form below and we will respond within 48 hours. We read every message.",
  });
}

async function seedOurTeamPage() {
  console.log("Seeding our team page...");
  await client.createIfNotExists({
    _id: "ourTeamPage",
    _type: "ourTeamPage",
    heading: "Meet Our Team",
    subheading: "Collaboration is key.",
  });
}

async function seedProjectsPage() {
  console.log("Seeding projects page...");
  await client.createIfNotExists({
    _id: "projectsPage",
    _type: "projectsPage",
    intro: {
      eyebrow: "Ninetynine41",
      heading: "Our Projects",
      paragraph1:
        "Ninetynine41 fund, deliver and sustain real-world change through specific community projects. There is need and we want to help. We have the background, infrastructure and on-the-ground intel to bridge the gap between pressing issue and solution.",
      paragraph2: "We don't take over; we strengthen what exists. We see each project through to completion.",
      image: await uploadImage("images/srey1.webp"),
      progressLabel: "Srey Oun Small Business",
      progressPercent: 90,
    },
  });
}

async function seed() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.");
  }

  await seedTeamAndProjects();
  await seedSiteSettings();
  await seedHomePage();
  await seedAboutPage();
  await seedWhatWeDoPage();
  await seedOfflinePage();
  await seedDonatePage();
  await seedChurchesPage();
  await seedContactPage();
  await seedOurTeamPage();
  await seedProjectsPage();

  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
