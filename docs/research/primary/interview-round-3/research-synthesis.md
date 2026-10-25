# Feelio – Prototype Evaluation Research Synthesis

## 1. Overview of the Evaluation

The evaluation investigated whether Feelio's physical interactions allow users to express, receive and clarify emotional updates between romantic partners.

The testing also explored whether receiving emotional information could influence how users approach their partners and whether the physical product would be perceived as valuable for everyday emotional communication.

**Research materials analysed:**

| Document | Content                                              |
|--------------|----------------------------------------------------------|
| Testing Plan | Evaluation objectives, methodology and task instructions |
| Nat          | 1 participant                                            |
| Ellie        | 2 participants                                           |
| Pauline      | 1 participant                                            |
| Joli         | 1 participant                                            |
| Lester       | 1 participant                                            |

**Total: 6 participants.**

The evaluation was conducted using an early-stage paper prototype and a Wizard of Oz approach to simulate certain interactions.

The findings below represent a qualitative synthesis of participants' responses, rather than statistical conclusions about the wider population.

## 2. Key Research Findings

I've identified eight major themes across the interviews.

### Finding 1: Emotional updates provide awareness, but emotions alone do not communicate the full situation.

**One of the most significant findings is that participants recognised the potential value of knowing their partner's emotional state, but several felt that an emotion alone could be ambiguous.**

Participants described how receiving an emotional update could help them anticipate their partner's mood, adjust their expectations and approach conversations more thoughtfully.

However, several participants also questioned what the emotion actually meant within the broader context of their relationship.

#### Supporting evidence

**Nat's participant:**

"A facial expression alone would not provide the full context. I would also want to understand their tone and the intensity of their emotion."

The participant explained that knowing their partner was angry would not clarify whether the anger was directed towards them or caused by something unrelated.

**Lester's participant:**

"If we had an argument and then he sent me 'tired,' I think I would get mad. It depends on the context."

The participant initially suggested that knowing her partner was tired would encourage patience, but reconsidered when reflecting on how the same emotion might be interpreted following an argument.

**Ellie's second participant:**

The participant explained that receiving a sad emotional update without understanding its cause could create unnecessary worry, particularly if they were unable to listen to the accompanying message immediately.

#### Synthesised insight

Emotional information is not inherently meaningful without context. The same emotional state can be interpreted differently depending on the relationship's recent interactions, the intensity of the emotion and the recipient's expectations.

#### Design implication

Feelio should support emotional updates as an initial communication cue rather than a complete explanation of how someone is feeling.

The voice-message feature provides an opportunity for users to clarify their emotions when additional information is needed.

### Finding 2: Emotional awareness can influence how and when partners approach each other.

Participants generally recognised that seeing their partner's emotional state could influence how they initiate conversations or respond to their partner.

Rather than necessarily changing *whether* they communicate, emotional updates could change the tone, timing and expectations of the interaction.

#### Supporting evidence

**Lester's participant:**

"I would be more patient with him and understand him if he's quite slow to respond."

**Joli's participant:**

"If I know their feelings beforehand, before I message them, then I can... tune your conversation so that it makes them feel better."

**Pauline's participant:**

"If it says 'Frustrated,' I would know that I should take action to comfort them."

**Ellie's first participant:**

The participant explained that negative emotions would generally prompt them to check in with their partner, whereas positive emotions might not require an immediate response.

**Nat's participant:**

The participant suggested that receiving an angry emotional update could prompt them to contact their partner immediately.

#### Synthesised insight

Feelio has the potential to help partners become more aware of each other's emotional states before initiating communication.

However, participants did not respond to emotional updates in identical ways. Some preferred to provide space, while others preferred to initiate a conversation immediately.

This suggests that Feelio should communicate emotional information without prescribing how users should respond.

#### Design implication

Preserve users' autonomy in deciding how and when to approach their partners.

Feelio should provide emotional awareness rather than recommend a particular response or automatically initiate conversations.

### Finding 3: The physical controls require more intuitive navigation and clearer interaction feedback.

**This was one of the strongest usability findings across the evaluation.**

Participants were generally able to understand the relationship between pressing a button and changing an emotion, but the specific button functions were not consistently understood.

Several participants had different expectations about how to navigate, select and send emotions.

#### Supporting evidence

**Lester's participant:**

"I still think the hand buttons should be left and right. It feels more intuitive."

She explained that cycling through emotions in only one direction would be frustrating if a user accidentally skipped their intended selection.

She suggested using the two hands for directional navigation and introducing a separate confirmation button on Feelio's belly.

**Pauline's participant:**

"I don't know how to send it to the other person. I'd probably just keep pressing until I land on the emotion I want, and then stop there."

The participant understood that pressing a button changed the emotion, but did not understand how to communicate the selection to their partner.

**Joli's participant:**

The participant assumed that one hand controlled emotions and the other controlled audio functions.

She also noted that the distinction between single and double presses would introduce a learning curve.

**Ellie's participants:**

Both participants used double-pressing to send their selected emotions. However, their responses occurred within a facilitated interaction in which the controls were discussed.

#### Synthesised insight

The current interaction design does not consistently communicate the distinction between navigating emotions, confirming a selection and sending information.

Participants developed different mental models of Feelio's controls, indicating that the physical mapping between buttons and actions requires refinement.

#### Design implication

Consider revising the physical controls to:

- Left hand: Navigate backwards.

- Right hand: Navigate forwards.

- Separate button: Confirm or send the selected emotion.

Additionally, provide clear feedback when an emotion has been selected and successfully communicated.

**An important distinction:** The left/right navigation proposal came specifically from Lester's participant. Other participants also experienced control-related confusion, but they did not independently propose the exact same solution.

That makes this a well-supported usability problem with a participant-generated design opportunity, rather than a unanimously requested redesign.

### Finding 4: Voice messages help clarify emotional updates, but users need control over recording and sending.

The voice-message feature was perceived as a useful complement to the emotional display.

Participants recognised that short recordings could communicate context that was not apparent from the selected emotion alone.

However, uncertainty emerged around how recordings were completed, reviewed and sent.

#### Supporting evidence

**Nat's participant:**

"When I release the button, I would expect the recording to stop."

The participant was unsure whether releasing the button would automatically send the message or whether an additional confirmation step was required.

They also wanted feedback confirming that the message had been successfully delivered.

**Lester's participant:**

"What if you record something and accidentally send it when you don't want to?"

She suggested displaying options to send, re-record or delete the message after recording.

**Ellie's second participant:**

The participant explained that including a voice message could prevent a negative emotional update from being misinterpreted.

**Pauline's participant:**

"The recording function itself is very intuitive."

This suggests that the basic concept of recording a message was understandable, even when the wider communication process was perceived as more complicated.

#### Synthesised insight

The recording interaction was generally understandable, but participants wanted greater confidence that messages would only be sent intentionally.

This concern is particularly relevant because Feelio facilitates potentially sensitive emotional communication.

#### Design implication

Consider a recording sequence that separates recording from sending:

**Hold to record → Release to stop → Review or re-record → Confirm to send.**

Provide an explicit visual or auditory confirmation when a message has been successfully sent.

### Finding 5: Users expect clear, multimodal feedback from Feelio's physical interactions.

Participants repeatedly suggested that Feelio should communicate its system status through visual or auditory feedback.

These suggestions appeared across emotion selection, message recording, playback and notifications.

#### Supporting evidence

**Nat's participant:**

The participant expected the facial expression to update immediately when navigating emotions.

They also wanted confirmation that a voice message had been successfully sent.

**Pauline's participant:**

"An audio prompt or chime indicating that playback has started or finished would be helpful."

**Joli's participant:**

"I don't quite understand, actually, the indicator."

The participant was unable to interpret the prototype's existing audio indicator.

**Lester's participant:**

She suggested a red notification dot or exclamation mark on Feelio's face to indicate an unread voice message.

She also suggested conventional play/pause symbols to communicate the current playback state.

Additionally, she expressed interest in satisfying sound effects similar to ASMR.

#### Synthesised insight

Participants expected Feelio to provide feedback that confirms what the device is doing without requiring them to remember complex button combinations or infer its state.

This is particularly important because Feelio is intended to function as a standalone physical product rather than relying primarily on an accompanying application.

#### Design implication

Introduce a consistent feedback system that communicates:

| Interaction    | Suggested feedback          |
|--------------------|---------------------------------|
| Emotion navigation | Face changes immediately        |
| Emotion selection  | Visual confirmation             |
| Emotion sent       | Confirmation animation or sound |
| New voice message  | Notification indicator          |
| Recording          | Recording indicator             |
| Message playing    | Play/pause icon                 |
| Playback finished  | Visual or auditory cue          |

Sound effects should be subtle and satisfying rather than intrusive, particularly because Feelio may be used in shared or public environments.

### Finding 6: Privacy preferences vary, suggesting that emotional visibility should be optional.

Feelio's privacy helmet received mixed responses.

Some participants appreciated it as a functional accessory that could prevent other people from seeing their emotions. Others viewed it primarily as a decorative feature or preferred a simpler alternative.

#### Supporting evidence

**Nat's participant:**

The participant initially understood that the helmet would hide their emotional display but wanted reassurance that their partner would still receive the emotional update.

They also appreciated its appearance.

**Pauline's participant:**

"It would be easier to just use an on/off toggle switch to decide whether to display the emotion or not."

The participant considered the helmet somewhat redundant and preferred a direct physical mechanism for hiding emotions.

**Joli's participant:**

The participant described the helmet as cute and indicated that they would use it to hide their emotions from others.

**Ellie's first participant:**

The participant initially assumed that Feelio's face would become blank after sending an emotion.

They nevertheless appreciated the helmet as a decorative accessory.

**Ellie's second participant:**

The participant felt that other people might interpret Feelio's face as a cute keychain design rather than recognising it as a representation of the owner's actual emotional state.

#### Synthesised insight

Privacy is not a uniform concern among potential users.

While some participants wanted control over who could see their emotions, others did not perceive the face display as particularly revealing.

The helmet's decorative appeal was also valued independently of its privacy function.

#### Design implication

Consider providing multiple approaches to privacy, such as a removable helmet or a temporary display-hiding function.

The design should distinguish between hiding the owner's emotional display from people nearby and preventing their partner from receiving the emotional update.

## 3. Two Findings That Are Especially Important for Your Original Design Problem

The previous six findings are primarily concerned with usability and functionality.

However, two additional themes directly relate to your project's broader goal of supporting emotional communication and reducing misunderstandings in romantic relationships.

These are worth including because they demonstrate that your evaluation explored more than whether participants could operate a robot.

### Finding 7: Emotional communication tools may unintentionally create pressure or conflict.

Several participants acknowledged that Feelio could help partners communicate, but also recognised situations in which sharing emotional information could be counterproductive.

#### Supporting evidence

**Lester's participant:**

"As long as the two partners set a boundary when they buy Feelio, so they don't abuse it."

She expressed concern that emotional information could be weaponised in a relationship.

**Ellie's second participant:**

The participant explained that displaying sadness or disappointment after a cancelled date might cause their partner to feel unnecessarily worried or guilty.

They also suggested that seeing an emotional update before having time to listen to its accompanying explanation could lead to misinterpretation.

**Pauline's participant:**

When presented with the scenario of a partner cancelling plans, the participant explained that they would rather directly ask their partner why they cancelled than use Feelio.

**Ellie's first participant:**

The participant similarly distinguished between everyday emotional communication and situations involving direct relationship conflict.

#### Synthesised insight

Although Feelio may support emotional awareness, sharing emotions does not necessarily prevent conflict.

Depending on the relationship context, emotional updates may introduce uncertainty, create perceived obligations to respond or be interpreted as an indirect expression of dissatisfaction.

Participants also demonstrated different preferences for direct and indirect emotional communication.

#### Design implication

Feelio should be designed as an optional communication aid rather than a replacement for direct conversation.

The product should avoid implying that recipients are responsible for immediately responding to, interpreting or resolving their partner's emotions.

**This is particularly relevant to your project's focus on boundary-related discomfort.** Feelio may help partners become aware of emotional changes before a conversation, but its design should not create an expectation of constant emotional availability.

### Finding 8: Feelio's perceived value depends on individual communication preferences and relationship circumstances.

Participants expressed different levels of interest in using Feelio regularly.

Some valued the prospect of remaining emotionally connected throughout the day, while others preferred familiar communication methods or were less comfortable expressing their emotions explicitly.

#### Supporting evidence

**Nat's participant:**

"I think it would be helpful for people in long-distance relationships."

The participant valued the possibility of receiving emotional updates without needing to initiate a real-time phone call.

They described voice messages as being similar to sending a voice-recorded letter.

**Ellie's first participant:**

The participant preferred texting and did not expect to use the microphone regularly, although they recognised that others might find it valuable.

**Ellie's second participant:**

The participant described difficulty expressing emotions and suggested that explicitly displaying their emotional state could feel like seeking attention or making a minor issue seem more significant.

They also stated that Feelio's appearance would influence their willingness to buy it.

**Pauline's participant:**

The participant initially imagined Feelio as a way to leave romantic voice messages for a partner before leaving home.

However, they later described the broader communication process as potentially more complicated than communicating directly.

#### Synthesised insight

Feelio's value is influenced by individual communication habits, emotional expressiveness and relationship circumstances.

The product may be particularly meaningful when partners are physically separated or when users want to share an emotional update without initiating a conversation immediately.

However, not all users want to communicate their emotions frequently or through a dedicated physical product.

#### Design implication

Position Feelio as a supplementary emotional communication channel rather than a replacement for existing messaging applications or face-to-face conversations.

Allow users to decide when, how frequently and how much emotional information they want to share.

## 4. Consolidated Findings for Your Affinity Diagram

For your Miro board, I would organise the data into the following affinity groups.

| Affinity group                 | Recurring observations                                                              | Participants                             |
|------------------------------------|-----------------------------------------------------------------------------------------|----------------------------------------------|
| Emotional awareness                | Knowing a partner's mood may help users adjust their approach.                          | Nat, Ellie 1, Ellie 2, Pauline, Joli, Lester |
| Need for emotional context         | Emotion labels may not explain the cause or intensity of an emotion.                    | Nat, Ellie 2, Lester                         |
| Navigation and button mapping      | Button functions and sending interactions were not consistently understood.             | Nat, Pauline, Joli, Lester                   |
| Voice-message control              | Users wanted greater clarity about how recordings are stopped and sent.                 | Nat, Lester                                  |
| System feedback                    | Users expected visual or auditory indicators for interactions and playback.             | Nat, Pauline, Joli, Lester                   |
| Privacy and visibility             | Participants had different preferences for displaying emotions publicly.                | Nat, Ellie 1, Ellie 2, Pauline, Joli         |
| Communication boundaries           | Emotional updates may create misunderstandings or pressure in some circumstances.       | Ellie 1, Ellie 2, Pauline, Lester            |
| Personal communication preferences | Participants differed in their willingness to use emotional updates and voice messages. | Nat, Ellie 1, Ellie 2, Pauline               |

*These participant references indicate where each theme appeared in the available transcripts. They are not measurements of how strongly each participant agreed with the theme.*

## 5. Recommended Design Iterations

Based on the evaluation, these are the changes I would take forward into the next iteration of Feelio.

| Design area      | Identified problem                                                         | Proposed iteration                                                     |
|----------------------|--------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| Emotion navigation   | Cycling in one direction may be inconvenient.                                  | Use left and right hand buttons for bidirectional navigation.              |
| Emotion confirmation | Users may not know whether selecting an emotion automatically sends it.        | Introduce a dedicated confirmation button.                                 |
| Recording            | Users may accidentally send messages or be unsure whether they have been sent. | Separate stopping a recording from confirming its delivery.                |
| Audio playback       | Playback status and unread messages may be unclear.                            | Introduce notification and play/pause indicators.                          |
| Emotional context    | Emotions alone may be ambiguous.                                               | Retain optional voice messages for further explanation.                    |
| Privacy              | Users have different preferences for public emotional visibility.              | Retain the helmet while exploring alternative display-hiding interactions. |
| Audio feedback       | Users may not know whether actions have been completed.                        | Introduce subtle confirmation sounds.                                      |
| Emotional autonomy   | Updates may unintentionally create pressure to respond.                        | Preserve optional communication and avoid response requirements.           |

**For your physical computing prototype, the most immediately actionable changes concern the controls, recording process and feedback system.** These can be tested directly through physical interaction, whereas the broader relationship-related findings would benefit from further evaluation over an extended period.

## 6. Research Limitations

I would strongly recommend including this section in your evaluation report.

There are a few methodological limitations worth acknowledging.

**First, participants did not always receive identical scenarios.** Your testing plan includes a scenario involving a partner cancelling plans, but some facilitators substituted scenarios involving a partner being tired after work. This makes direct comparisons between participants' emotional responses less reliable.

**Second, the prototype's interactions were not consistently understood or explained across sessions.** Some participants described the left hand as controlling emotions, while others used the right hand. In certain sessions, participants received guidance before completing tasks.

This means you should avoid claiming that all participants independently discovered the controls or successfully completed every task without assistance.

**Third, the evaluation used a paper prototype and simulated interactions.** Participants were often describing what they expected to happen rather than interacting with fully functional electronics.

Consequently, their feedback provides useful evidence about discoverability, expectations and perceived usability, but does not establish the technical reliability of the final product.

**Finally, participants were responding to hypothetical relationship scenarios.** Their answers indicate how they believe Feelio might influence their behaviour, but the evaluation does not establish whether Feelio would actually reduce conflict or improve relationship outcomes during everyday use.

## 7. A Ready-to-Use Findings Section for Your Assignment

If you want something more cohesive and academic that you can incorporate into your assessment, I would synthesise the entire evaluation into the following:

### Evaluation Findings

The prototype evaluation involved six participants and investigated the usability of Feelio's physical interactions alongside its perceived value in supporting emotional communication between romantic partners.

The findings suggest that Feelio has the potential to support emotional awareness by allowing users to communicate their current emotional state and recognise changes in their partner's emotions. Participants described how receiving emotional updates could help them adjust their expectations, approach conversations more thoughtfully and respond with greater consideration. However, several participants also highlighted that emotional information alone may be insufficient to understand the circumstances behind an emotion. Factors such as emotional intensity, relationship context and the cause of the emotional state could influence how the information is interpreted.

The evaluation also revealed several usability challenges associated with Feelio's physical interactions. Participants developed different expectations about the functions of the hand buttons, particularly regarding emotion navigation and confirmation. Uncertainty was also observed during the voice-recording process, with participants questioning whether releasing the recording button would automatically send a message. These findings highlight the importance of intuitive physical controls and clear feedback to communicate the system's current state.

Participants generally recognised the value of voice messages as a way to provide additional emotional context. However, they expressed a preference for greater control over message delivery, including opportunities to review, re-record or confirm messages before sending them. Visual and auditory feedback, such as notification indicators, playback symbols and confirmation sounds, were also suggested to improve interaction clarity.

Beyond usability, the findings revealed differences in participants' communication preferences and attitudes towards emotional visibility. While some participants valued the privacy helmet, others preferred simpler mechanisms for hiding their emotions or did not perceive the public display as a significant concern. Participants also identified potential risks associated with emotional communication, including misinterpretation, perceived pressure to respond and the possibility of emotional information being used negatively within a relationship.

Overall, the findings suggest that Feelio's potential value lies in providing an additional channel for emotional awareness rather than replacing direct communication. Future design iterations should prioritise more intuitive physical navigation, clearer confirmation and feedback mechanisms, and greater user control over emotional disclosure and message delivery.

## One final observation for your team

There is a particularly useful connection between these findings and your original design opportunity:

**Your initial research identified that people may experience emotional discomfort before they are ready to initiate a conversation. Your prototype evaluation suggests that communicating an emotion could help make that internal state visible to a partner, but that the communication itself must remain contextual, intentional and optional.**

That gives you a coherent narrative across your entire project:

**Initial research:** People may struggle to recognise or communicate emotional discomfort before it develops into conflict.

**Design opportunity:** Support awareness of emotional changes before difficult conversations occur.

**Design response:** Feelio provides a physical channel for partners to communicate and receive emotional updates.

**Evaluation finding:** Emotional awareness may influence how partners approach each other, but emotions alone can be misinterpreted, and users need control over what they communicate.

**Next iteration:** Refine Feelio's physical interactions and communication features to support clearer, more intentional and context-sensitive emotional sharing.

This connects your research, ideation, physical prototype and evaluation into one continuous design process rather than presenting them as separate assessment activities.
