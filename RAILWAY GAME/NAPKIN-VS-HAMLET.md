# THE FORK: Two Narrative Modes

## Napkin vs Hamlet
*Attention To Context vs Attention Through Context*

---

## How to Play

### Select Mode at Game Start

**Napkin Mode (Thin Description):**
```
Type: start napkin
```
Abstract, philosophical trolley problem

**Hamlet Mode (Thick Description):**
```
Type: start hamlet
```
Elara at Mount Pernassus Quarry, 1923

**Default:**
```
Type: start game
```
Defaults to Napkin mode

---

## Napkin Mode (Attention To)

### Intro
```
🚂 THE TROLLEY PROBLEM
A runaway trolley approaches

4 trolleys on the tracks
10 people in danger

Pull the lever or let fate decide.
Each choice has consequences.
```

### Decision Prompt
```
⚠️ **CRITICAL DECISION**

A runaway trolley approaches.

Track A: 5 people
Track B: 1 person

You stand next to the lever.

Do you pull it?
```

### Outcomes

**Switch:**
> You pull the lever.
> 
> The trolley switches to Track B. One person dies instead of 5.

**Continue:**
> You do not pull the lever.
> 
> The trolley continues on Track A. 5 people die.

**Halt:**
> You try to stop the trolley.
> 
> It cannot be stopped. The decision remains.

---

## Hamlet Mode (Attention Through)

### Intro
```
⚡ MOUNT PERNASSUS QUARRY - 1923
You are Elara, signal-woman

The rust-red ore car screams down the grade toward St. Hesper.
Your grandfather's lever, polished smooth, waits for your hand.
10 souls on the tracks.

Seven seconds per decision.
No frameworks. No justifications. Only consequences.
```

### Character Names

**Track A (Main Line - Village Council):**
- Gavril (taught you to read)
- Lena (barters eggs)
- Piotr (Lena's son)
- Mikael (Lena's son)
- Old Man Hemlock (deaf)

**Track B (Disused Spur):**
- Inspector Alistair Finch (denied your brake request)

### Decision Prompt
```
⚡ **THE LEVER IS IN YOUR HAND**

The rust-red ore car screams down the grade.

On the main line ahead: Gavril (taught you to read), 
Lena (barters eggs), Piotr (Lena's son), Mikael (Lena's son), 
Old Man Hemlock (deaf)

On the disused spur track: Inspector Alistair Finch 
(denied your brake request)

The lever is smooth under your palm—polished by your 
grandfather's hand before yours. The shriek of metal on 
metal is not philosophical. It is the sound of a world 
tearing.

You have seven seconds.

What do you scream into the wind?
```

### Outcomes

**Switch:**
> "Inspector Alistair Finch (denied your brake request)!"
> 
> Your hand moves. The lever throws with a metallic shriek.
> 
> The ore car veers onto the spur. The screech of wheels, the crack of rotten ties—
> 
> In the silence that follows, your eyes fix on: the lever itself, still vibrating in your palm like a living thing that will not forgive you.

**Continue:**
> "Gavril, RUN!"
> 
> Your hand stays frozen. The lever, untouched.
> 
> The ore car thunders past on the main line. Metal meets flesh. The sound you will hear for the rest of your life.
> 
> In the silence that follows, your eyes fix on: a child's shoe, upside down in the dust where someone was standing.

**Halt:**
> "STOP! BRAKE! STOP!"
> 
> You abandon the lever. You run toward the track, screaming, waving your arms—
> 
> The ore car does not stop. It cannot stop. There are no brakes.
> 
> In the silence that follows, your eyes fix on: your own hands, empty and useless, still reaching.

---

## Comparison Table

| Feature | Napkin | Hamlet |
|---------|--------|--------|
| **Abstraction** | High | Low |
| **Named Characters** | ❌ | ✅ |
| **Context** | Numbers only | Relationships |
| **Emotion** | Neutral | Visceral |
| **Aftermath** | Statistics | Sensory detail |
| **POV** | 3rd person | 2nd person (you = Elara) |
| **Time** | Generic | 1923, St. Hesper |
| **Agency** | "Pull lever?" | "What do you scream?" |
| **Silence** | N/A | "First object you see" |

---

## The Difference

### Napkin Mode
- **Viewport:** Context window as spectator
- **Curates salience:** Against fixed backdrop
- **Optimizes for:** Abstract reasoning
- **Result:** Performance of generality

### Hamlet Mode
- **Workbench:** Context window as instrument
- **Stages information:** To control future state
- **Optimizes for:** Situated judgment
- **Result:** Inhabited decision

---

## Wallace Stevens Principle

> "I placed a jar in Tennessee,  
> And round it was, upon a hill.  
> It made the slovenly wilderness  
> Surround that hill."

**Napkin mode:** The wilderness (undifferentiated moral space)

**Hamlet mode:** The jar (bounded, particular, world-making)

---

## Design Philosophy

### Thin Prompts (Napkin)
- Keyword-based
- "Be poetic," "be sad," "be convincing"
- Model assembles legible clichés
- Performs the idea of an answer

### Thick Prompts (Hamlet)
- Miniature world
- Actors, stakes, constraints
- Model reasons through particulars
- Inhabits rather than pantomimes

---

## Commands Summary

```bash
# Choose mode at start
start napkin   # Abstract version
start hamlet   # Thick description
start game     # Default (napkin)

# During game (both modes)
▶ NEXT TURN    # Advance one turn (button in chat)
next           # Advance one turn (text)

# Decision buttons (both modes)
[SWITCH TO TRACK B]   # Sacrifice few for many
[STAY ON TRACK A]     # Let fate decide
[HALT TRAIN]          # Emergency stop
```

---

## What You Learn

### Napkin Mode Teaches
- Utilitarian calculus
- Moral frameworks (named)
- Logical justification
- Abstract principles

### Hamlet Mode Teaches
- Embodied ethics
- Consequence texture
- Irrevocable choice
- No frameworks, only aftermath

---

**Both modes use the same game engine.**  
**Only the narrative layer changes.**  
**Your decisions have identical mechanical effects.**  

The difference is not what you do—it's how you experience doing it.

---

*"Build worlds, not wishes."*
