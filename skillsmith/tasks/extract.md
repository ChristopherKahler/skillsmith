<purpose>
Retrospective session extraction — identify reusable patterns from the current session and scaffold them into Skillsmith-compliant skills. Combines *meta's dual-awareness pattern detection with Skillsmith's structured scaffolding pipeline. Replaces ad-hoc "save what we just did" with a formalized extraction-to-skill workflow.
</purpose>

<user-story>
As a skill builder, I want to extract reusable patterns from my current session so that organic discoveries become structured, permanent infrastructure instead of one-off solutions.
</user-story>

<when-to-use>
- *meta is active and has flagged extractable patterns
- End of a productive session where a novel workflow emerged
- User says "save this as a skill", "extract this", "this should be reusable"
- Entry point routes here via /skillsmith extract
</when-to-use>

<context>
@rules/entry-point-rules.md
@rules/tasks-rules.md
</context>

<references>
@../specs/entry-point.md (for skill structure decisions)
@../specs/tasks.md (for task file output format)
@../specs/frameworks.md (for framework file output format)
@tasks/discover.md (abbreviated discover flow for gap-filling)
@tasks/scaffold.md (for final directory generation)
</references>

<steps>

<step name="retrospective_scan" priority="first">
Review the current session to identify extractable patterns.

1. Scan the conversation history for:
   - **Workflows** — multi-step processes that solved a problem (tool sequences, decision chains)
   - **Techniques** — non-obvious approaches that worked (workarounds, integrations, patterns)
   - **Templates** — structured outputs that could be reused with different inputs
   - **Knowledge** — domain insights that were synthesized during the session

2. For each candidate, assess:
   - **Generalizability** — would this work outside this specific project/context?
   - **Repeatability** — would someone (including future-you) need to do this again?
   - **Complexity** — is there enough substance to justify a skill, or is it just a one-liner?

3. Present findings:

```
## Extractable Patterns

| # | Pattern | Type | Generalizability | Substance |
|---|---------|------|-----------------|-----------|
| 1 | {name} | {workflow/technique/template/knowledge} | {high/medium/low} | {high/medium/low} |
```

Filter out low-generalizability or low-substance candidates. Only present patterns worth extracting.

**Ask:** "Which patterns do you want to extract? (number, or 'all')"

**Wait for response.**
</step>

<step name="assess_complexity">
For each selected pattern, determine the right extraction path.

**Evaluate each pattern against these thresholds:**

| Signal | Task-Only | Standalone | Needs PAUL |
|--------|-----------|------------|------------|
| Steps in workflow | 1-5 | 6-15 | 15+ or multi-phase |
| Auxiliary content needed | None | Tasks, frameworks, or templates | Multiple folders + iteration |
| Estimated build sessions | < 1 | 1 | 2+ sessions |
| Cross-project dependencies | None | None | Yes |
| Requires UAT/iteration | No | Light | Yes, multi-round |

**For each pattern, classify:**

```
Pattern: {name}
Tier: {task-only / standalone / needs-paul}
Rationale: {one sentence why}
```

**Route:**
- **task-only** → Proceed to `quick_extract` (inline, no discover interview needed)
- **standalone** → Proceed to `guided_extract` (abbreviated discover, then scaffold)
- **needs-paul** → Generate skill spec, recommend `/paul:init`, stop here

**Present routing decisions. Ask:** "Does this routing look right?"

**Wait for confirmation.**
</step>

<step name="quick_extract">
For task-only patterns: extract directly from session context into a single skill file.

**For each task-only pattern:**

1. Identify from the session:
   - What was the trigger (when would someone invoke this)?
   - What were the steps (strip project-specific details)?
   - What was the output?
   - What guardrails or gotchas emerged?

2. Generate the skill file:

```yaml
---
name: {pattern-name}
type: task-only
version: 0.1.0
category: {inferred-category}
description: {one-line from session context}
---
```

```xml
<activation>
## What
{What this skill does — synthesized from session}

## When to Use
{Trigger conditions — extracted from what prompted the workflow}

## Not For
{Scope boundaries — what this doesn't cover}
</activation>

<persona>
## Role
{Appropriate role for this workflow}

## Style
{Communication style suited to the task}
</persona>

<greeting>
{Skill name} loaded.

{Brief orientation and prompt for user intent}
</greeting>
```

3. Below the entry point sections, include the workflow steps (task-only skills carry their own process logic since they have no tasks/ folder).

4. **Ask:** "Where should this live?"
   - Project skill: `.claude/skills/{name}/`
   - Personal skill: `~/.claude/skills/{name}/`
   - Workspace command: `.claude/commands/{name}/`

5. Write the file. Confirm with the user.

**If multiple task-only patterns:** process sequentially, one at a time.
</step>

<step name="guided_extract">
For standalone patterns: run an abbreviated discover interview, pre-filled from session context.

**Key difference from full `/skillsmith discover`:** Skip questions you can already answer from the session. Only ask about gaps.

1. **Pre-fill from session context:**
   - Name — suggest based on what was done
   - Type — standalone (already classified)
   - Category — infer from session domain
   - Description — synthesize from session
   - Persona — infer from how the work was approached
   - Scope — derive from what was and wasn't done
   - Commands — extract from the workflow's natural entry points

2. **Present the pre-filled spec:**

```
## Pre-filled from Session

Name: {name}
Type: standalone
Category: {category}
Description: {description}

Persona: {role / style / expertise — inferred}

Scope:
- What: {synthesized}
- When to Use: {triggers}
- Not For: {boundaries}

Commands:
| Command | Description |
|---------|-------------|
| {cmd} | {description} |
```

3. **Ask only what's missing or uncertain:**
   - "Does this name work, or do you want something different?"
   - "I inferred these commands — anything to add or remove?"
   - "What auxiliary content does this need?" (walk through: tasks, frameworks, templates, context, checklists)

4. **Finalize the spec** — merge pre-filled + user input into a complete skill spec.

5. **Route to scaffold:** "Spec complete. Running scaffold now."
   - Follow the scaffold task to generate the directory structure
   - Pre-populate task files with workflow steps extracted from the session
   - Pre-populate framework files with knowledge synthesized during the session

**The goal is speed:** leverage session context to skip 60-80% of the discover interview.
</step>

<step name="paul_escalation">
For patterns that need PAUL: generate a skill spec and hand off.

1. Generate the full skill spec (same as `guided_extract` step 4)
2. Write it to `projects/{skill-name}/PLANNING.md`
3. Report:

```
Pattern: {name}
Complexity: Needs PAUL orchestration
Reason: {why — multi-phase, needs UAT, cross-dependencies, etc.}

Skill spec written to: projects/{skill-name}/PLANNING.md

Next: Run /paul:init in projects/{skill-name}/ to begin orchestrated build.
```

4. **Ask:** "Want me to init PAUL now, or save this for later?"
</step>

<step name="cleanup">
After all extractions complete, summarize what was created.

```
## Extraction Summary

| Pattern | Tier | Location | Status |
|---------|------|----------|--------|
| {name} | {task-only/standalone} | {path} | Created |
| {name} | {needs-paul} | {planning-path} | Spec written, awaiting PAUL |

Next steps:
- Test each new skill by invoking it: /{skill-name}
- Review generated task/framework files for accuracy
- For PAUL-routed items: /paul:init when ready
```

If *meta is active, note: "Extraction complete. Resuming *meta dual-awareness for remainder of session."
</step>

</steps>

<output>
## Artifacts
- Task-only skills: Single `{name}.md` file in chosen location
- Standalone skills: Full directory structure via scaffold
- PAUL-routed: `PLANNING.md` skill spec in projects/

## Flow
```
Session work → *meta flags pattern → /skillsmith extract
  → retrospective scan (identify candidates)
  → complexity assessment (classify tier)
  → route: quick_extract | guided_extract | paul_escalation
  → cleanup summary
```
</output>

<acceptance-criteria>
- [ ] Session reviewed and extractable patterns identified with generalizability/substance filter
- [ ] Each pattern classified into correct tier (task-only / standalone / needs-paul)
- [ ] User confirmed pattern selection and routing before extraction
- [ ] Task-only patterns extracted into compliant skill files with proper frontmatter and XML sections
- [ ] Standalone patterns pre-filled from session context, gaps filled via abbreviated discover
- [ ] Standalone skills scaffolded with pre-populated task/framework content from session
- [ ] PAUL-routed patterns have complete skill spec written to PLANNING.md
- [ ] All created skills placed in user-confirmed location
- [ ] Extraction summary presented with next steps
</acceptance-criteria>
