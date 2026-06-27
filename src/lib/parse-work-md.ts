export type WorkFeature = {
  title: string;
  description: string;
};

export type WorkSnapshot = {
  label: string;
  value: string;
};

export type ParsedWorkContent = {
  tagline: string;
  problem: string;
  features: WorkFeature[];
  snapshots: WorkSnapshot[];
};

function extractSection(content: string, sectionNumber: number, title: string): string {
  const pattern = new RegExp(
    `(?:^|\\n)${sectionNumber}\\.\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n([\\s\\S]*?)(?=\\n\\d+\\.\\s|$)`,
    "i",
  );
  const match = content.match(pattern);
  return match?.[1]?.trim() ?? "";
}

function extractTagline(section1: string): string {
  const cleaned = section1
    .replace(/^[^\n]*Project Context Document\s*\n?/i, "")
    .replace(/^[^\n]*—[^\n]*\n?/m, "")
    .trim();

  const beforeProblem = cleaned.split(/[Pp]roblem it solves[^:]*:/i)[0]?.trim() ?? cleaned;
  const paragraphs = beforeProblem
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);

  return paragraphs[0] ?? "";
}

function extractProblem(section1: string): string {
  const match = section1.match(
    /[Pp]roblem it solves[^:]*:\s*([\s\S]*?)(?=\n\s*\n|\nThe platform|\nWhat it offers|\nAccess is|\nThe space|\n[A-Z][a-z]+ it operates)/i,
  );
  if (!match?.[1]) return "";

  return match[1]
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countRoles(section4: string): number {
  const pipeRows =
    section4.match(/^\|?\s*[A-Za-z][^|\n]+\|/gm)?.filter((row) => !/Role|Who they are|Who is/i.test(row)) ??
    [];

  if (pipeRows.length > 0) return pipeRows.length;

  const lines = section4.split("\n");
  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim() ?? "";
    if (!line || /^Role\t|^End-user roles|^Internal admin roles|^Note:|^There are no other roles|^AI persona/i.test(line)) {
      continue;
    }

    const next = lines[i + 1]?.trim() ?? "";
    const looksLikeRoleTitle =
      /^[A-Z]/.test(line) &&
      line.length < 70 &&
      !line.includes("\t") &&
      next &&
      !/^(Role|Who|What|Note|There|Browse|Full|Same|Everything|Log in|View|Create|Someone|Anyone|Primarily|Staff working)/i.test(next);

    if (looksLikeRoleTitle) {
      count++;
      i++;
    }
  }

  return count;
}

function inferPlatform(section1: string, section6: string): string {
  const combined = `${section1}\n${section6}`.toLowerCase();
  if (/ios|android|mobile app/.test(combined)) return "Mobile + Web";
  if (/marketplace/.test(combined)) return "Marketplace";
  if (/saas|subscription/.test(combined)) return "SaaS Platform";
  return "Web Platform";
}

function inferIndustry(section1: string): string {
  const text = section1.toLowerCase();
  if (/crypto|fintech|trading/.test(text)) return "Fintech";
  if (/food|chef|catering|delivery/.test(text)) return "Food & Delivery";
  if (/event|party|rental|wedding/.test(text)) return "Events & Rentals";
  if (/licht|signage|décor|decor/.test(text)) return "Event Décor";
  return "Digital Services";
}

function inferCountry(section1: string, tag: string): string {
  if (/ · UK\b/.test(tag) || /\bUK\b|United Kingdom|British/.test(section1)) return "UK";
  if (/Netherlands|Dutch|\.nl\b/.test(section1)) return "Netherlands";
  return tag.split("·").pop()?.trim() ?? "International";
}

function parseFeatures(section5: string): WorkFeature[] {
  const lines = section5.split("\n");
  const features: WorkFeature[] = [];
  let introEnded = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim() ?? "";
    if (!line) continue;
    if (/^Described as|^For landing page|^Note:|^Admin Operations Suite/i.test(line)) {
      introEnded = true;
      continue;
    }
    if (!introEnded && /landing page|app store/i.test(line)) {
      introEnded = true;
      continue;
    }
    if (/^\d+\./.test(line)) continue;
    if (/^Area|^Role|^Layer|^Revenue|^Admin Operations/i.test(line)) continue;

    const nextLine = lines[i + 1]?.trim() ?? "";
    const looksLikeTitle =
      nextLine &&
      !/^\d+\./.test(nextLine) &&
      !/^Area|^Role|^Layer|^Revenue|^Note:/i.test(nextLine) &&
      line.length < 80 &&
      !line.endsWith(":");

    if (looksLikeTitle) {
      features.push({
        title: line,
        description: nextLine.replace(/\s+/g, " ").trim(),
      });
      i++;
    }
  }

  return features.slice(0, 12);
}

function buildSnapshots(section1: string, section4: string, tag: string): WorkSnapshot[] {
  const roleCount = countRoles(section4);
  const snapshots: WorkSnapshot[] = [
    {
      label: "Platform",
      value: inferPlatform(section1, ""),
    },
    {
      label: "Industry",
      value: inferIndustry(section1),
    },
    {
      label: "Country",
      value: inferCountry(section1, tag),
    },
  ];

  if (roleCount > 0) {
    snapshots.unshift({
      label: "User roles",
      value: String(roleCount),
    });
  }

  return snapshots.slice(0, 4);
}

export function parseWorkMd(content: string, tag: string): ParsedWorkContent {
  const section1 = extractSection(content, 1, "What Is This Business?");
  const section4 = extractSection(content, 4, "Roles in the System");
  const section5 = extractSection(content, 5, "Core Features of the Platform");
  const section6 = extractSection(content, 6, "Technical Overview");

  const snapshots = buildSnapshots(section1, section4, tag);
  const platformSnapshot = snapshots.find((s) => s.label === "Platform");
  if (platformSnapshot) {
    platformSnapshot.value = inferPlatform(section1, section6);
  }

  return {
    tagline: extractTagline(section1),
    problem: extractProblem(section1),
    features: parseFeatures(section5),
    snapshots,
  };
}
