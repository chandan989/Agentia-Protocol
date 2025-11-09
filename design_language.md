# Design Language: Protocol Zero

**Core Philosophy:** Machine-Readable Minimalism.
Every element should feel like it serves a functional purpose. Decoration is replaced by data visualization. The interface should feel like a "HUD" (Heads-Up Display) for orchestrating autonomous software.

## 1\. Color System

We use a stark, high-contrast palette. Green is used strictly for *active* states, *value* (money/data), and *confirmation*.

| Role | Color | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | `Protocol White` | `#FFFFFF` | Main background. Uncompromisingly stark. |
| **Surface** | `Off-White` | `#FAFAFA` | Subtle differentiation for cards/sections. |
| **Primary** | `Electric Green` | `#00E676` | Primary actions, active connections, positive value, terminal cursors. |
| **Ink (Primary)** | `Deep Carbon` | `#0A0A0A` | Primary text, strong borders. |
| **Ink (Secondary)** | `Machine Grey` | `#71717A` | Metadata, labels, inactive states. |
| **Border** | `Faint Line` | `#E4E4E7` | Subtle dividers, default card borders. |

## 2\. Typography

Mix highly readable sans-serifs with technical monospaced fonts to emphasize the "code" nature of the protocol.

  * **Primary Font (Human Readable):** `Inter` or `Geist Sans` (tight tracking, high legibility).
      * Used for: Headings, long-form descriptions, user prompts.
  * **Technical Font (Machine Readable):** `JetBrains Mono`, `Geist Mono`, or `Fira Code`.
      * Used for: Agent IDs (`0x...`), transaction hashes, prices (`0.01 USDC`), capability tags, and terminal outputs.
      * *Styling Note:* Often used in uppercase with slightly increased letter spacing for a "data readout" feel.

## 3\. Core Components & Styling

### The "Terminal" Aesthetic

Since this is an agent protocol, the UI should frequently reference terminal interfaces, even in a web context.

  * **Sharp Corners:** Border radius should be minimal (`0px` to `4px` max). No friendly, rounded bubbles.
  * **Thin Lines:** Use `1px` borders for almost everything.
  * **Glows (Sparingly):** Active elements can have a subtle green drop-shadow to mimic a CRT monitor glow. `box-shadow: 0 0 12px rgba(0, 230, 118, 0.4)`

### Buttons & Actions

  * **Primary Action:** Solid Electric Green background, Deep Carbon text. Sharp corners. Text is bold and uppercase.
      * `[ HIRE AGENT ]`
  * **Secondary Action:** White background, Deep Carbon `1px` border.
      * `[ VIEW DETAILS ]`
  * **Machine State:** When an agent is working, replace the button with a blinking monospace loader.
      * `> EXECUTING_`

### Cards (Agent Registry)

Instead of elevated cards with drop shadows, use flat, outlined cards that look like data entries.

```css
.agent-card {
  background: #FFFFFF;
  border: 1px solid #E4E4E7; /* Faint Line */
  transition: all 0.2s ease;
}
.agent-card:hover {
  border-color: #00E676; /* Electric Green */
  box-shadow: 0 4px 20px rgba(0, 230, 118, 0.15); /* Subtle radioactive glow */
}
```

### Data Visualization (Network Activity)

To visualize the "Agentic Economy," use node-link diagrams rendered in thin lines.

  * **Inactive connections:** Light grey lines (`#E4E4E7`).
  * **Active transaction:** A pulse of Electric Green traveling along the line from Manager -\> Specialist Agent.

## 4\. Applied Examples

### A. The Manager Terminal (Main Interface)

A split view. Left side is the "Input/Output" log. Right side is the "Network State."

  * **Background:** Pure White.
  * **Input Field:** At the bottom, a simple line with a blinking green cursor `> |`.
  * **Log Stream:** Responses from agents appear as timestamped blocks.
      * `[10:42:23] MANAGER: Job started. Finding web-scraper...`
      * `[10:42:25] REGISTRY: Found agent <0x8a7...3f9> (98% match)`

### B. Agent Profile (Registry Detail)

  * **Header:** Agent Name in large, bold Sans-serif.
  * **ID Badge:** A pill with Electric Green border and Monospace text: `ID: 0x7f9...57d`
  * **Capabilities:** displayed not as colorful tags, but as a technical list:
      * `> can_navigate_browser`
      * `> can_extract_text_css`
      * `> accepts_USDC_on_Base`
  * **Price/Rate:** Large monospace font in green: `0.01 USDC / call`

### C. Transaction Confirmation (The "Receipt")

When the `evm-wallet-mcp` pays an agent, show a minimalist, brutalist receipt.

  * White background, dashed black border.
  * Monospace font for everything.
  * **Status:** `[ PAYMENT SUCCESSFUL ]` (in green).
  * **Hash:** `Tx: 0xabc...123` (clickable link).