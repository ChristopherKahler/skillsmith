<purpose>
Assess existing skills against Skillsmith syntax specs. Reads a skill's directory structure, checks each component against the corresponding spec, and produces a structured compliance report with violations and remediation priorities.
</purpose>

<user-story>
As a skill builder, I want to audit existing skills against the syntax standards so that I can identify compliance gaps and fix them before distribution or deployment.
</user-story>

<when-to-use>
- Checking a skill for compliance after building or modifying it
- Quality gate before distributing a skill via Skool, GitHub, or courses
- Auditing legacy skills that predate the Skillsmith standards
- Entry point routes here via /skillsmith audit
</when-to-use>

<context>
@rules/entry-point-rules.md
@rules/tasks-rules.md
</context>

<references>
@../specs/entry-point.md (when assessing entry point compliance)
@../specs/tasks.md (when assessing task files)
@../specs/templates.md (when assessing template files)
@../specs/frameworks.md (when assessing framework files)
@../specs/context.md (when assessing context files)
@../specs/checklists.md (when assessing checklist files)
@../specs/rules.md (when assessing rules files)
</references>

<steps>

<step name="identify_target" priority="first">
Determine what to audit.

**Ask:**
1. **Skill path** — Provide the path to a skill directory, or say "batch" to audit all skills in a parent directory.

**Wait for response.**

**Single skill mode:**
1. Validate the path exists
2. Locate the entry point file:
   - Look for `{directory-name}.md` first (spec convention)
   - Fall back to `SKILL.md`, `skill.md`, or any single `.md` at root
   - If no entry point found: note as first violation
3. Confirm: "Auditing `{skill-name}` at `{path}`. Proceed?"

**Batch mode:**
1. Ask for the parent directory path (e.g., `~/.claude/skills/` or `~/.claude/commands/`)
2. Discover all subdirectories that appear to be skills (contain `.md` files)
3. List discovered skills and confirm: "Found {N} skills. Audit all?"

**Wait for confirmation before proceeding.**
</step>

<step name="inventory_structure">
Catalog what exists in the skill directory before checking compliance.

1. List all files and subdirectories
2. Classify each component:

| Component | Present? | Files | Maps to Spec |
|-----------|----------|-------|-------------|
| Entry point | Yes/No | {filename} | entry-point.md |
| tasks/ | Yes/No | {count} files | tasks.md |
| templates/ | Yes/No | {count} files | templates.md |
| frameworks/ | Yes/No | {count} files | frameworks.md |
| context/ | Yes/No | {count} files | context.md |
| checklists/ | Yes/No | {count} files | checklists.md |
| rules/ | Yes/No | {count} files | rules.md |
| {other}/ | Yes/No | {count} files | No spec coverage |

3. Identify the skill tier based on structure:
   - Has sub-skill entry points at root → `suite`
   - Has auxiliary folders → `standalone`
   - Entry point only → `task-only`

4. Note non-standard directories (data/, scripts/, utils/, output/) — these are informational, not violations

5. Skip from audit: `node_modules/`, `output/`, `.git/`, any generated directories

Display the inventory table to establish what will be audited.
</step>

<step name="assess_entry_point">
Load @../specs/entry-point.md and check the entry point file against it.

**Check each requirement:**

**1. YAML Frontmatter:**
- [ ] Frontmatter present (delimited by `---`)
- [ ] `name` field present and kebab-case
- [ ] `type` field present and valid (`suite`, `standalone`, `task-only`)
- [ ] `version` field present and semver format
- [ ] `category` field present
- [ ] `description` field present and one-line

**2. XML Sections (check presence and order):**
- [ ] `<activation>` present with What, When to Use, Not For subsections
- [ ] `<persona>` present with Role, Style, Expertise subsections
- [ ] `<commands>` present (if not task-only) with table format
- [ ] `<routing>` present with Always Load / Load on Command / Load on Demand structure
- [ ] `<greeting>` present with available actions listed

**3. Conventions:**
- [ ] Entry point filename matches directory name
- [ ] Entry point is thin (routing, not process logic)
- [ ] Placeholders use correct convention ([square]=prose, {curly}=variable)
- [ ] @-references in routing point to existing files

**Score:** Count checks passed vs total applicable checks.
- All pass → **Compliant**
- 70%+ pass → **Partial**
- Below 70% → **Non-compliant**

Record each failed check with the specific line or section that violates the spec.
</step>

<step name="assess_folder_types">
For each folder that maps to a spec, load the corresponding spec and check files.

**For each folder present:**

1. Load the corresponding spec from `@../specs/{folder-type}.md`
2. Read all files in the folder (if 5 or fewer) or a representative sample (first 3 + last, if more)
3. Check each file against the spec's requirements

**tasks/ — Check against specs/tasks.md:**
- [ ] No YAML frontmatter (tasks are execution files)
- [ ] Has `<purpose>` section
- [ ] Has `<user-story>` in format: As a [role], I want [action], so that [outcome]
- [ ] Has `<when-to-use>` with trigger conditions
- [ ] Has `<steps>` with named steps (`<step name="snake_case">`)
- [ ] Steps use imperative voice
- [ ] Steps have explicit wait points where user input needed
- [ ] Has `<output>` section specifying artifacts
- [ ] Has `<acceptance-criteria>` as plain checklists (not BDD)

**templates/ — Check against specs/templates.md:**
- [ ] Has YAML frontmatter with `name` and `description`
- [ ] Uses placeholder convention consistently
- [ ] Template is fill-in-ready (not just documentation)
- [ ] Sections are clearly labeled

**frameworks/ — Check against specs/frameworks.md:**
- [ ] No YAML frontmatter (frameworks are read-only knowledge)
- [ ] Has teaching orientation (explains why, not just what)
- [ ] Has examples grounding the concepts
- [ ] Structured for on-demand loading (standalone, no cross-dependencies)

**context/ — Check against specs/context.md:**
- [ ] Has YAML frontmatter (context is the mutable file type)
- [ ] Clearly scoped to one domain of state
- [ ] Has default/empty state structure
- [ ] Designed for session-to-session persistence

**checklists/ — Check against specs/checklists.md:**
- [ ] Uses checkbox format (`- [ ]` items)
- [ ] Each item is independently verifiable
- [ ] Items have clear pass/fail criteria
- [ ] Organized by concern (not just a flat list)

**rules/ — Check against specs/rules.md:**
- [ ] Has Must Have section (positive requirements)
- [ ] Has Anti-Patterns section (what to avoid)
- [ ] Rules are compact enforcement, not spec copies
- [ ] Scoped to one consumer folder type

**Score each folder** using the same Compliant / Partial / Non-compliant scale.
Record specific violations with file:line references where possible.
</step>

<step name="generate_report">
Compile all findings into a structured compliance report.

**Report structure:**

```markdown
# Skill Audit Report: {skill-name}

**Path:** {skill-path}
**Tier:** {suite/standalone/task-only}
**Audit Date:** {date}
**Overall Score:** {N}% ({compliant-count}/{total-audited} components compliant)

---

## Summary

| Component | Spec | Status | Issues |
|-----------|------|--------|--------|
| Entry point | entry-point.md | {Compliant/Partial/Non-compliant} | {N} |
| tasks/ | tasks.md | {status} | {N} |
| templates/ | templates.md | {status} | {N} |
| frameworks/ | frameworks.md | {status} | {N} |
| context/ | context.md | {status} | {N} |
| checklists/ | checklists.md | {status} | {N} |
| rules/ | rules.md | {status} | {N} |

**Non-standard folders:** {list any unaudited folders}

---

## Violations Detail

### Entry Point
{For each failed check: what's wrong, where, and how to fix it}

### tasks/
{Per-file violations}

### {each folder with issues}
{Per-file violations}

---

## Remediation Priorities

Priority order (fix these first):
1. {Highest impact — entry point structural issues}
2. {Next highest — missing required sections in tasks}
3. {Lower priority — convention violations}

---

*Generated by /skillsmith audit*
```

**Ask:** "Where should I save this report?"
- Default: `{skill-path}/{skill-name}-AUDIT.md`
- User can specify alternate location

**Wait for response, then write the report.**

**For batch mode:**
After all individual reports, generate a rollup:

```markdown
# Batch Audit Summary

**Directory:** {parent-path}
**Skills Audited:** {N}
**Date:** {date}

| Skill | Tier | Score | Top Issue |
|-------|------|-------|-----------|
| {name} | {tier} | {N}% | {brief description} |

**Cross-cutting issues:** {patterns that appear in multiple skills}
**Highest priority:** {which skill needs the most work}
```

Save rollup to `{parent-path}/AUDIT-SUMMARY.md`.
</step>

</steps>

<output>
## Artifacts
- Individual audit report: `{skill-name}-AUDIT.md` (per skill)
- Batch summary: `AUDIT-SUMMARY.md` (batch mode only)

## Format
Markdown report with summary table, per-component violations, and prioritized remediation list.
</output>

<acceptance-criteria>
- [ ] Target skill path validated and entry point located
- [ ] Skill structure inventoried with folder-to-spec mapping
- [ ] Entry point assessed against entry-point.md spec
- [ ] Each present folder assessed against its corresponding spec
- [ ] Compliance scored per component (Compliant / Partial / Non-compliant)
- [ ] Violations recorded with specific details and file references
- [ ] Report generated with summary table and remediation priorities
- [ ] User confirmed report location
</acceptance-criteria>
