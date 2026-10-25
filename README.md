# Feelio — Showcase Panel

This app is a demonstration panel for **Feelio**, a bag charm concept that lets two partners share how they feel and what they need through a pair of connected bag charms. The panel showcases the idea by simulating the charms' screens and controls, so you can try the interaction in a browser.

## Research and Design Evidence

The following resources document Feelio’s research, design development and evaluation.

| Resource | Contents |
| --- | --- |
| [Miro — Research and Design Process](https://miro.com/app/board/uXjVHzNHlLI=/?share_link_id=754372985168) | Research activities, synthesis, ideation and design development. |
| [OneDrive — Supporting Project Materials](https://uq-my.sharepoint.com/:f:/r/personal/s4946038_uq_edu_au/Documents/DECO3500%20Leave%20me%20alone?d=w156d6fc213134e7980258a0e539c3d9d&csf=1&web=1&e=PQnwzv) | Supporting research, design and evaluation files. |
| [Round 1 — Relationship Boundaries](docs/research/primary/interview-round-1/) | Initial interviews and research synthesis diagrams. |
| [Round 2 — Emotional Awareness](docs/research/primary/interview-round-2/) | Focused interviews and synthesis exploring how partners recognise and respond to emotions. |
| [Round 3 — Prototype Evaluation](docs/research/primary/interview-round-3/) | Testing plan, transcripts and research synthesis. |
| [Round 4 — Refined Prototype Evaluation](docs/research/primary/interview-round-4/) | In-class testing transcripts, survey responses and thematic analysis. |
| [Secondary Research](secondary-research-synthesis.md) | Literature synthesis informing the project direction. |
| [Design Decisions](docs/design/Decision%20Log.md) | Key decisions and their rationale throughout the project. |
| [Prototype Iterations](docs/design/prototype-iterations/) | Images and descriptions showing how the prototypes developed. |
| [Ethical Considerations](docs/design/Ethical-Considerations.md) | Ethical risks, design responses and limitations. |
| [Meeting Notes](docs/Meeting%20Notes.md) | Team discussions, progress and next steps. |

## Run the app

You need **Node.js 20.19.0+ (20.x) or 22.12.0+**, and **npm**.

Download Node.js from the [official Node.js website](https://nodejs.org/en/download), choose the installer for your computer, and follow the installation instructions. npm is included with the installer.

Open a **terminal** (Terminal on Mac or Command Prompt on Windows) in the project folder—the folder containing `package.json`. Run the following commands in the terminal, one at a time.

```sh
npm install
npm run dev
```

Then look for **Network:** in the terminal. Copy the web address shown next to it and paste it into your browser to open the setup dashboard. Use the address from your own terminal, as it can be different on each computer. Keep the terminal open while using the app.

## Simulate the experience with Overview

Once the app is running and you have opened the setup dashboard in your browser, use the **Overview** pages to simulate the experience. Each Overview brings one partner's face, hand controls, head button, and belly display together in a single panel, so you can explore the idea without setting up separate devices.

Open both partners' Overview pages in separate tabs or windows. Placing them side by side makes it easy to follow both sides of the exchange:

- **Partner A:** open the **Overview** link under **Partner A** on the dashboard.
- **Partner B:** open the **Overview** link under **Partner B** on the dashboard in another tab or window.

Use your browser's **Open link in new tab** option to keep both pages available.

1. **Choose an emotion.** In Partner A's Overview, use the left and right hand arrows to browse emotions. The face and emotion label change as you browse.
2. **Confirm the emotion.** Press the head button between the arrows. The face panel now shows the preset messages available for that emotion.
3. **Choose and send a message.** Use the arrows to browse the messages, then press the head button again to send your choice.
4. **Receive the update.** Switch to Partner B's Overview. Its belly display shows Partner A's emotion and message.
5. **Reply.** On Partner B's belly display, select **Reply**, choose a preset response, and select **Confirm**. Use **Change** to pick a different response before sending.
6. **See the response.** Partner B sees their sent reply beneath the incoming message. Partner A sees their shared message and Partner B's reply in the belly history; scroll the belly display if needed. Some exchanges also show a shared status, such as **Ready together ❤️** or **Talk later ❤️**.
7. **Try the other direction.** Use Partner B's hand and head controls to send an update back to Partner A.

For example, choose **Curious** and send **“How's your day going? ❤️”** from Partner A. On Partner B's belly display, select **Reply**, choose **“Pretty good ❤️”**, and select **Confirm**. “Pretty good ❤️” is a reply option for this message; it does not appear when browsing messages with the hand arrows.

The **My face** panel represents your own emotion and message selection. The **Partner belly** panel shows updates from the other partner, your replies, and replies to your own shared messages.

To start again, return to the dashboard and select **Reset demo**. All open panels use the same shared demo state. Restarting the server also clears the demo; there are no separate accounts or saved conversations.

## Use separate screens or devices

The dashboard also links to individual bag charm screens and controls for each partner:

| Screen | Partner A | Partner B | Purpose |
| --- | --- | --- | --- |
| Overview | `/a/overview` | `/b/overview` | Simulate a complete bag charm in one panel |
| Face display | `/a/face` | `/b/face` | Show emotions and browse preset messages |
| Head button | `/a/head` | `/b/head` | Confirm an emotion or send a message |
| Left hand | `/a/left` | `/b/left` | Browse to the previous option |
| Right hand | `/a/right` | `/b/right` | Browse to the next option |
| Belly display | `/a/belly` | `/b/belly` | Read updates and exchange replies |

To try the demo across devices, connect them to the same Wi-Fi network as the computer running the app. Open the **Network** address printed in the terminal, then use the dashboard links or scan the screen QR codes. Open the dashboard through that network address before scanning, so the QR codes point to an address the other devices can reach.

## Repository Structure

This repository contains both the Feelio showcase app and the research and design work behind the bag charm concept.

| Folder | What you will find |
| --- | --- |
| [src/](src/) | The code for the app you see and interact with in your browser. |
| [server/](server/) | The code that keeps both partners' screens connected and passes updates and replies between them. |
| [docs/](docs/) | Project documentation, including meeting notes, research, and design work. |
| [docs/research/primary/](docs/research/primary/) | Interview transcripts and findings.|
| [docs/design/](docs/design/) | Design decisions, ethical considerations, and the development of the Feelio concept. |
| [docs/design/prototype-iterations/](docs/design/prototype-iterations/) | Images of earlier wireframes, app prototypes, and bag charm prototypes. |

