<purpose>
Transform raw source material (books, courses, transcripts, notes) into structured framework chunks ready for skill consumption. Reads source content, designs a chunking architecture, extracts discrete framework chunks, and validates output against framework syntax rules.
</purpose>

<user-story>
As a skill builder, I want to turn raw knowledge sources into structured, skill-ready framework chunks so that my skills can reference clean domain knowledge instead of wading through raw text.
</user-story>

<when-to-use>
- You have a book, course transcript, or raw notes that need to become framework files
- Building the knowledge layer for a new or existing skill
- Entry point routes here via /skillsmith distill
</when-to-use>

<context>
@rules/frameworks-rules.md
</context>

<references>
@../specs/frameworks.md (framework syntax spec — output format rules)
</references>

<steps>

<step name="assess_source" priority="first">
Understand the raw material before planning how to chunk it.

**Ask:**
1. **Source material** — Provide the file path(s) or paste the content. What is this? (book, course, transcript, notes, article collection)
2. **Target skill** — Which skill will consume these frameworks? (existing skill name, or "new skill — not yet built")
3. **Output location** — Where should chunks land? (default: `{skill-name}/frameworks/chunks/`)

**Wait for response.**

Once source is provided:

1. Read the source material fully
2. Assess structure:
   - How is it organized? (chapters, sections, modules, flat)
   - Approximate size (lines, pages, word count)
   - How many distinct concepts/frameworks are present?
3. Identify the natural seams — where does one concept end and another begin?
4. Check for existing chunking:
   - Does a chunking plan already exist for this source?
   - Are there partial chunks already extracted?

**Report:**
```
Source: {title/description}
Type: {book/course/transcript/notes}
Size: ~{N} lines / ~{N} pages
Structure: {chapters/sections/modules/flat}
Estimated concepts: {N}
Existing work: {none / partial — describe}
```

**Confirm:** "Ready to design the chunking plan?"
</step>

<step name="create_chunking_plan">
Design the chunk architecture — how to break the source into discrete, skill-ready pieces.

**Principles:**
- Group by **functional outcome** (what the chunk helps you DO), not by source structure (chapters)
- Each chunk should be independently useful — loadable without needing other chunks
- Target 5-15 chunks per source (fewer than 5 = too coarse, more than 15 = too granular)
- Name chunks by concept, not by source chapter number

**For each proposed chunk, define:**

| Field | Description |
|-------|-------------|
| **Number** | Sequential ID (01, 02, ...) |
| **Name** | Concept-based name (kebab-case for filename, title case for display) |
| **Source range** | Which sections/chapters/lines this covers |
| **Frameworks to extract** | List of specific frameworks, models, or templates in this chunk |
| **Skill output** | What this chunk enables — one sentence describing the actionable outcome |

**Present the chunking plan as a table:**

```
| # | Chunk Name | Source Range | Core Frameworks | Skill Output |
|---|-----------|-------------|-----------------|--------------|
| 1 | {name}    | {range}     | {frameworks}    | {output}     |
```

**Write the chunking plan** to `{output-location}/../{source-name}-chunks.md` following the proven format from the Expert Secrets chunking plan.

**Ask:** "Does this chunking architecture look right? Any chunks to merge, split, or rename?"

**Wait for approval before extracting.**
</step>

<step name="extract_chunks">
Extract each chunk from the source into a standalone framework file.

**For each chunk in the approved plan:**

1. Read the relevant source range
2. Distill into the standard chunk format:

```markdown
# Chunk {N}: {Display Name}
## Source: {Source Title} — {Section/Chapter Reference}

---

## Core Concept

[2-4 sentence synthesis of the central idea. Not a summary — a distillation
that captures the essence someone needs to understand before diving into
frameworks. Written in teaching voice.]

---

## Frameworks

### Framework: {Framework Name}

**When to use:** [Specific trigger condition — when should this framework be applied?]

**Steps/Template:**

[The actual framework content — steps, tables, templates, fill-ins.
Structured for immediate application, not academic understanding.
Include tables for comparisons, code blocks for fill-in templates,
numbered steps for processes.]

**Example from source:** [Concrete example that illustrates the framework in action]

---

[Repeat ### Framework for each framework in this chunk]

## Key Principles

- [Distilled principle 1 — actionable, not abstract]
- [Distilled principle 2]
- [Distilled principle 3]

---

## Templates and Fill-Ins

[Consolidated fill-in templates from this chunk's frameworks.
Use fenced code blocks with bracket placeholders for user input.]

---

## Decision Tools

[IF/THEN decision logic extracted from the source.
Help the user make choices without re-reading the full framework.]

---

*Chunk {N} of {total} — {Source Title} Framework Reference*
```

**Chunk quality rules:**
- Core Concept is a synthesis, not a copy-paste summary
- Frameworks have **When to use** triggers (not just what they are)
- Templates use `[_______________]` fill-in blanks for user input
- Decision Tools use `IF/THEN` logic for quick application
- Each chunk stands alone — no "see Chunk 3 for details" cross-references
- Key Principles are actionable statements, not vague platitudes
- Include source examples where they illustrate the framework

3. Write each chunk to `{output-location}/{NN}-{chunk-name}.md`
4. After each chunk, briefly report: "Chunk {N}/{total}: {name} — {frameworks extracted} frameworks"

**Do NOT rush.** Each chunk is a knowledge artifact that will be referenced many times. Quality over speed.
</step>

<step name="build_consolidated_framework">
Create a single consolidated framework file that ties all chunks together.

**This is optional but recommended for sources with 5+ chunks.**

Create `{output-location}/../{source-name}.md` (the parent framework file):

```markdown
# {Source Title} — Framework Reference

## Purpose
[What this framework collection teaches and when to reference it]

## Chunk Index

| # | Chunk | Key Frameworks | Load When |
|---|-------|---------------|-----------|
| 1 | {name} | {frameworks} | {trigger condition} |
| 2 | {name} | {frameworks} | {trigger condition} |

## Quick Reference

### Decision Tree
[High-level decision tree that routes to the right chunk based on what the user needs]

### Framework Inventory
[Complete list of all frameworks across all chunks with chunk reference]
```

**Ask:** "Consolidated framework created. Want to review it, or proceed to validation?"
</step>

<step name="validate_output">
Validate all generated files against framework rules.

1. Load @rules/frameworks-rules.md
2. For each chunk file, verify:
   - [ ] No YAML frontmatter (frameworks are read-only knowledge)
   - [ ] Has Core Concept section (purpose/synthesis)
   - [ ] Has at least one Framework with "When to use" trigger
   - [ ] Frameworks teach (not prescribe) — teaching orientation
   - [ ] Has examples (not abstract-only)
   - [ ] File named kebab-case: `{NN}-{chunk-name}.md`
   - [ ] Stands alone without cross-chunk dependencies
3. If consolidated framework exists, verify:
   - [ ] Has Purpose section
   - [ ] Has Chunk Index with load triggers
   - [ ] Has Quick Reference / Decision Tree

**Report:**
```
Distillation Complete: {source-title}

Chunks: {N} extracted
Location: {output-location}/
Consolidated: {yes/no} at {path}

Validation: {N}/{N} chunks pass rules

Files:
- {NN}-{chunk-name}.md ({N} frameworks)
- {NN}-{chunk-name}.md ({N} frameworks)
- ...
- {source-name}.md (consolidated index)

Next steps:
1. Review chunks for domain accuracy (you know the source better than I do)
2. Add chunks to your skill's routing as on-demand framework references
3. Test by asking the skill to apply a specific framework
```
</step>

</steps>

<output>
## Artifacts
- Chunking plan: `{source-name}-chunks.md`
- Individual chunks: `chunks/{NN}-{chunk-name}.md` (one per chunk)
- Consolidated framework: `{source-name}.md` (optional, for 5+ chunks)

## Structure
```
{skill-name}/frameworks/
├── {source-name}.md              (consolidated index)
├── {source-name}-chunks.md       (chunking plan)
└── chunks/
    ├── 01-{chunk-name}.md
    ├── 02-{chunk-name}.md
    └── ...
```
</output>

<acceptance-criteria>
- [ ] Source material fully read and assessed
- [ ] Chunking plan created with concept-based groupings (not chapter-based)
- [ ] Each chunk follows the standard format (Core Concept, Frameworks with triggers, Templates, Decision Tools)
- [ ] All chunks stand alone without cross-chunk dependencies
- [ ] Chunk files named kebab-case with sequential numbering
- [ ] Consolidated framework created (if 5+ chunks)
- [ ] All files pass frameworks-rules.md validation
- [ ] User reviewed and approved chunking plan before extraction
</acceptance-criteria>
