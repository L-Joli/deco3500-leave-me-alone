# Ethical Considerations — Leave Me Alone (Team 20)

**Framework used:** Ethical Disclaimer (ethicsfordesigners.com), with a supplementary Normative Design Scheme section.

> Living document: updated at each project milestone (interview synthesis, low-fi prototyping, usability testing).

**Revision log**
- Early draft: framed around private reflection on boundary-related discomfort (Round 1 interviews).
- Current version: rewritten for Feelio, a pair of connected emotion charms for couples, after the concept moved to shared emotion signalling and after Round 3 usability testing.

---

## 1. The Current Situation Is...
*What's the problem today, before this design exists?*

Couples often misread each other's emotional states in everyday life. A partner may come home tired or stressed and be taken personally, or one partner can tell something is off but not why. Our research suggests couples tend to keep these matters between the two of them, and that phones and notifications can add friction to close relationships rather than reduce it. Misreadings that go unclarified can turn into arguments.

## 2. The Stakeholders Are...
*Who has an interest in, or is affected by, this design — both direct and indirect?*

- **Direct:** both partners using a pair of Feelio charms (each person is both sender and receiver)
- **Indirect:** people near a charm in public who may see its face or light; interview and testing participants, and the partners they describe but who are not present; the design team; future maintainers
- **Especially vulnerable:** users in unequal, coercive or unsafe relationships

## 3. Our Design Intentions Are...
*What do you want to change in the current situation, and why?*

To give two consenting partners a small, low-pressure way to share how they feel and what they need, so each can choose how and when to approach the other, and misinterpretation is less likely to turn into conflict. Feelio is meant to be an optional aid. It is not meant to monitor a partner, to score a relationship, or to replace direct conversation.

---

## 4. Unethical Situations With Our Design...
*Imagine the design in use. What dark, wrong, or weird situations could arise?*

Brainstormed from team discussions, interviews and Round 3 usability testing.

**A. Pressure and control**
1. A partner expects constant emotional availability: not sharing, or not responding, is read as hiding something or as dissatisfaction. (Raised in Round 3: updates can create a perceived obligation to respond.)
2. A controlling partner demands that the other keeps the charm on, updates it, or opens the privacy cover, using it to monitor or interrogate their mood. The charm could create or reinforce a power imbalance.
3. A shared emotional status is weaponised, for example "you said you were fine", or a sad status used to induce guilt or as evidence in an argument. (Raised in Round 3.)
4. Features that signal readiness to talk (the "I'd like to talk" option and the "Ready together" matching status) could be read as a request or expectation to talk, or lead someone to talk before they are ready. (Not yet observed in testing.)

**B. Misreading and limited expression**
5. Preset faces flatten complex feelings. A partner sees "stressed" and cannot tell whether it is about them, causing unnecessary worry or guilt. (Round 3.)
6. Limited options push people to display a socially acceptable emotion instead of a genuine one, so the signal stops being trustworthy.
7. Faces and emotion labels may carry different meanings across cultures and individuals.

**C. Privacy and exposure**
8. A lost, borrowed or visible charm reveals someone's emotional state to others, and its light may show that an update has arrived. Privacy preferences varied among testers (Round 3).
9. Emotion data is exposed to people other than the pair. In our prototype, anyone connected to the same local server can see the shared state and act as either partner, because there is no login or encryption. In a real product, data sent through an app or server could be leaked or accessed by others.
10. After a breakup, the charms stay linked and keep sharing emotional signals.

**D. Avoidance and substitution**
11. The charm replaces direct conversation or care: partners send a face instead of talking, or use it to avoid a hard conversation. (One Round 3 participant said they would rather ask their partner directly.)

**E. Unsafe relationships and research ethics**
12. Feelio is used inside an abusive or coercive relationship, where shared emotions give the controlling partner more information and power. A design cannot make a person who intends to control reflect on their own behaviour.
13. Interview and testing participants disclose sensitive relationship experiences; the partner they describe is identifiable but never agreed to be discussed; recordings or quotes are exposed.

> **To do:** revisit this list after any further testing or design changes.

---

## 5. We Take Responsibility For... / We Do Not Take Responsibility For...
*Team decision: which unethical situations fall within the project's ethical scope?*

**We take responsibility for:**
- **Not creating pressure to share or respond (1, 3, 4).** Sharing is optional, and "Just sharing" is always available as a need. Preset replies are supportive and pressure-free (e.g. "No rush", "Thinking of you"). The mood history feature was removed after the concern that it could be weaponised, so past states cannot be replayed as evidence. The prototype keeps only each partner's latest update.
- **Not encouraging a power imbalance (2, 5, 6).** We keep the handling of negative emotion deliberately abstract and avoid features that give one partner control over the other (Decision Log D020). The emotion set is drawn from the feelings participants described in our interviews and includes both positive and difficult feelings, so the charm does not push a single mood. A "prompted care" feature was dropped because it risked feeling non-genuine (D014).
- **Reducing misuse of messages (3, 13).** Voice messages were removed from the final design in favour of preset messages (D021), lowering the risk of rude or hurtful messages being recorded and reused.
- **Privacy by design (8, 9).** A physical privacy cover hides the partner's emotion from people nearby. The prototype collects no personal identifiers, accounts, voice recordings or history. Emotion data is held only in the server's memory during a session and is cleared when the server restarts or the demo is reset.
- **Positioning Feelio as an aid, not a replacement (11).** Our pitch and poster present it as support for conversation, not a substitute for it.
- **Ethical conduct of our research (13).** Participants were informed that taking part is voluntary, that they can withdraw or skip questions at any time, and that audio is recorded only with permission, de-identified, and deleted after the semester. Round 1 interviews used a written information sheet and consent form; Round 3 testing used a verbal consent script.
- **Reporting honestly.** We state the limits of our small, early-stage prototype tests and do not claim more than the evidence shows.

**We do not take responsibility for:**
- **Resolving abusive or coercive relationships (2, 12).** Feelio is not a safety, support or intervention tool. We take responsibility for not promoting this harm, not for fixing it, because a design cannot make someone who intends to control reflect on their behaviour (D020). We state this honestly as a design constraint. Feelio is intended only for two partners who both choose to use it.
- **The agreements couples make with each other (1).** Couples decide their own rules for how and when they use it. One tester suggested partners agree on boundaries when they start.
- **Whether a person shares truthfully (6).** Feelio shows what a partner chooses to show.
- **Production-level security and long-term use (9, 10).** This is a course prototype with no login, encryption or access control. Securing real data, and handling breakups or unlinking, are future work and would be required before any real-world use.
- **Cultural variation (7).** Our testing involved a small group, so we do not claim the faces and labels work across all cultures.

---

## Supplementary: Normative Design Scheme
*Cross-checks our design goal against three ethical theories. There is no absolute answer; the aim is to use each theory to question and improve the design.*

**Our design goal:**
- **We want to** help couples recognise and clarify each other's emotional states and needs in everyday life,
- **By doing** this through a pair of connected charms on which each partner chooses an emotion and a need, sends it, and answers with supportive preset replies, with a privacy cover and no voice messages or mood history,
- **In order to** let each partner choose how and when to approach the other, so misinterpretation is less likely to turn into conflict.

**Virtue Ethics** — *Is the design morally right, judged by what a virtuous person would do? Why/why not?*
> Mostly yes, with two risks.
> - *Honesty and moderation:* Sharing a feeling in a small, optional, low-effort way supports honesty without demanding long disclosure, and preset replies steer towards gentle responses rather than blame.
> - *Justice:* Both partners have the same controls and the same options.
> - *Risks to honesty and courage:* Limited options may push people to show a socially acceptable feeling instead of a genuine one (Section 4, item 6), and the charm could let people avoid the courage needed for a direct conversation (item 11).
> - *Who it appeals to:* People who want to communicate but find it hard to start, which is the group we targeted (D006). It may appeal less to people who prefer direct conversation, as one Round 3 participant said.
> - *How we could change it:* Keep sharing optional and keep "Just sharing" available, present Feelio as a way to open a conversation rather than replace one, and avoid features that reward constant sharing.

**Deontology** — *Does it abide by moral rules and serve people's duties?*
> Partly.
> - *Duties we meet:* Respect for each partner's autonomy and privacy (voluntary use by two partners, a privacy cover, no history, no accounts); no deception about what the prototype does, since we state its limits; and informed consent, confidentiality and the right to withdraw for research participants.
> - *Duties at risk:* Autonomy is weakened if one partner pressures the other to use it (items 1 and 2). Preset replies deliberately steer how partners respond, like a script built into the product. This supports kindness but limits free expression, so we state it openly.
> - *If everyone used it:* If every couple used it by mutual choice, the norms it relies on (consent, privacy between partners, honesty) would be respected. Under pressure, they would not. Testers were divided on whether they would use it.
> - *How we could change it:* State clearly in our pitch and poster that Feelio is for two partners who both choose it, make sure not sharing carries no visible penalty, and keep the presets supportive.

**Consequentialism** — *Does it produce the best outcomes for the stakeholders involved?*
> Uncertain, likely positive for mutual, healthy relationships, with clear limits.
> - *Likely benefits:* Fewer misreadings, easier timing of conversations, and a small sense of connection through the day (some Round 3 participants valued this). Sharing a need alongside an emotion responds to a Round 3 finding that an emotion alone does not explain its cause or what the person wants.
> - *Likely harms:* Worry or guilt from unexplained negative updates, a perceived obligation to respond, weaponisation, and exposure of private feelings (Round 3).
> - *By stakeholder:* Partners carry most of the benefit and the harm. Bystanders are little affected, and the privacy cover helps. Research participants face low risk with consent. Users in unsafe relationships may be worse off, and the design cannot fix this (D020).
> - *Limits of our evidence:* Only small, early-stage tests with a paper prototype. Long-term effects on relationships are unknown.
> - *How we could change it:* Test over a longer period, keep updates low-pressure, and recheck this scheme whenever features change.

**What this scheme changed**
- It supports keeping optional sharing, supportive presets, no mood history and the privacy cover.
- It highlights two open risks: honesty (limited options) and avoidance (substituting for conversation). We respond by framing Feelio as a conversation opener and stating that it is for voluntary, mutual use.
- It highlights an evidence gap: longer-term testing would be needed to judge real effects on relationships.
