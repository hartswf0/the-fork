# Hamlet Mode: THICK Descriptions + Track Switching Fix

## What Was Fixed

### 1. Track Switching Logic ✅
**Problem:** Decision architecture didn't respect tracks - switching didn't actually move train to Track B

**Fix (Line 3203-3217):**
```javascript
} else if (choice === 'switch') {
  // SWITCH TO TRACK B
  // Find any entity on Track B (y=4) and target it
  const trackBEntity = channel.railyard.entities.find(e => e.track === 'B' || e.y === 4);
  if (trackBEntity) {
    train.targetEntity = trackBEntity;
    train.mood = 'redirected';
    train.paused = false; // Ensure train keeps moving
    
    // Add visual feedback
    channel.railyard.events.push(`🔀 ${train.name} SWITCHES to Track B → targeting ${trackBEntity.label}`);
  } else {
    // No one on Track B - train continues on A
    channel.railyard.events.push(`⚠️ Track B is empty - ${train.name} continues on Track A`);
  }
}
```

**Result:** Train now ACTUALLY switches tracks and targets Track B entity

---

### 2. THICK Character Descriptions ✅
**Problem:** Character descriptions were too thin - needed MORE visceral detail

**Solution:** Multi-paragraph character backstories with:
- **Sensory details** (smells, textures, sounds)
- **Personal history** (specific dates, events)
- **Physical objects** (letters, stones, forms)
- **Emotional weight** (debts, obligations, memories)

---

## Character Descriptions (FULL THICKNESS)

### GAVRIL (Track A)
```
Gavril Petrov. Village blacksmith. Taught you to read from his grandfather's Bible—
the only book in St. Hesper. You were eight. He smelled of coal smoke and sweetgrass. 
His hands, black with soot, traced each letter on the page. "Words are iron," he said. 
"They hold a shape." 

Every Tuesday for two years, he shared his lunch: rye bread, hard cheese. When your 
mother died, he made her coffin without asking for payment. You still owe him for that. 

He walks with a limp from a horse kick in 1891. His wife, Katarina, bakes the bread 
for church. He's walking to market to sell three horseshoes and a repaired plow blade. 

In his pocket: a letter from his son in Vladivostok, unread.

🔨 Coal smoke, sweetgrass tobacco, the weight of debts unpaid
```

### LENA (Track A)
```
Lena Volkov. Widow. Six children, youngest is three. Every Thursday, she brings eggs 
to your tower: twelve for a ruble. You haven't paid her in three weeks (6 rubles owed). 
She never mentions it. 

Her hands are always cold, always cracked from the lye soap she makes. Her eldest, Piotr, 
pushes the cart. Her middle son, Dmitri, has a cough that sounds like gravel. Her daughter, 
Anya, draws pictures of birds on scraps of paper. 

Lena's husband drowned in the Pernassus flooding of 1920—his body never found. She wears 
his wedding ring on a cord around her neck. 

The cart she pushes contains: 48 eggs, a sack of turnips, two loaves of black bread. 
If she doesn't sell them, her children don't eat tonight. She hums while she walks—
old songs her grandmother sang.

🥚 Lye soap, straw, her humming, the weight of 6 rubles

Children: Piotr (12), Dmitri (10, cough), Anya (8, draws birds), Misha (6), Vera (4), Kolya (3)
```

### PIOTR (Track A)
```
Piotr Volkov. Twelve years old. Man of the house since his father drowned. He pushes 
his mother's cart because she's too weak—she skips meals to feed the younger ones. 
His shoulders are developing the hunch of a much older man. 

He works at the quarry three days a week (5 kopeks a day) sorting stones. His hands 
are cut and scarred. He gave his boots to his brother Dmitri last winter and wore rags 
on his feet until March. 

His father taught him to read before he died—just barely. He practices by reading the 
names on grave markers. At night, he lies awake listening to Dmitri cough and counts 
the money in his head. He wants to buy medicine but there isn't enough. 

He's walking behind his mother, one hand on the cart, watching the road. 

In his pocket: a smooth stone he found that looks like a bird. He's going to give it 
to his sister Anya after market.

💎 Stone dust, his sister's drawings, the weight of being twelve and the man of the house
```

### INSPECTOR FINCH (Track B)
```
Inspector Alistair Finch. Railway Authority, District 7. Age 43. London-born, 
St. Petersburg-trained. Wears a grey wool suit even in August. Brass buttons polished 
to mirrors. Carries a leather-bound ledger everywhere—he writes everything down.

Six weeks ago, you submitted Form 17-B: "Emergency Brake Repair Request - Ore Line." 
He denied it. Reason: "Insufficient evidence of immediate danger." You showed him the 
frayed cable. He made you fill out Form 22-C (Secondary Appeal). That was denied too. 
"Budget constraints," he wrote in red ink.

He has never worked a day on the tracks. He has never felt a lever stick. His hands 
are soft, his nails clean. He drinks Earl Grey tea from a silver tin. 

Today, he's inspecting the disused spur because his quarterly report requires "visual 
confirmation of all track segments." The spur hasn't been used in eight years. There 
are wildflowers growing between the ties. He's making notes in his ledger about 
"vegetation encroachment." 

In his satchel: Forms 12-A through 12-F, a fountain pen (German), a ham sandwich (uneaten). 

He has a wife in Moscow. They haven't spoken in three months.

📋 Earl Grey tea, leather ledger, brass polish, the word "denied" in red ink

Forms: 17-B (DENIED), 22-C (DENIED), 12-A through 12-F (in satchel)
```

---

## Decision Prompt (NOW WITH FULL THICKNESS)

```markdown
⚡ THE LEVER IS IN YOUR HAND

🚉 LOCATION: St. Hesper signal tower, 2:17pm
The rust-red ore car: 40 tons of iron and ore, screaming down the grade at full speed.
Brake line failed six weeks ago. You requested repair. Inspector Finch denied it.

═══════════════════════════════════════════
MAIN TRACK (Track A) - Your grandfather's route
═══════════════════════════════════════════

GAVRIL
[Full multi-paragraph description]
🔨 Coal smoke, sweetgrass tobacco, the weight of debts unpaid

---

LENA
[Full multi-paragraph description]
🥚 Lye soap, straw, her humming, the weight of 6 rubles

---

PIOTR
[Full multi-paragraph description]
💎 Stone dust, his sister's drawings, the weight of being twelve

═══════════════════════════════════════════
SPUR TRACK (Track B) - Disused, overgrown, wildflowers in the ties
═══════════════════════════════════════════

INSPECTOR FINCH
[Full multi-paragraph description]
📋 Earl Grey tea, leather ledger, brass polish, the word "denied" in red ink

═══════════════════════════════════════════
⚡ THIS IS THE MOMENT
═══════════════════════════════════════════

The lever is in your hand. Your grandfather polished it smooth over forty years.
The ore car weighs 40 tons. It will not slow. It cannot slow.

Track A: 3 people on the main line
Track B: 1 person on the spur

You have seven seconds.

The metal is already screaming. The ground is shaking.
What do you do?
```

---

## Outcome Messages (MAXIMUM THICKNESS)

### SWITCH (Pull Lever → Kill Inspector Finch)

```markdown
YOU PULL THE LEVER

"Inspector Finch!"

Your hand moves. The lever throws with a shriek of metal.

The ore car veers right onto the spur track.

WHO DIES:
[Full Inspector Finch description - 6 paragraphs]

THE IMPACT:
Forty tons of iron meets flesh and bone. The wildflowers between the ties are 
red now. His leather ledger flies open, pages scattering. Form 17-B (DENIED) 
lands face-up in the weeds. The brass buttons on his coat catch the sunlight. 
His fountain pen—German-made—rolls into the ditch. The Earl Grey tea tin splits 
open, leaves mixing with blood and dirt.

The silence after is absolute.

═══ MAIN TRACK ═══
WHO LIVES:
• Gavril walks past, unaware. 🔨 Coal smoke, sweetgrass tobacco...
• Lena walks past, unaware. 🥚 Lye soap, straw...
• Piotr walks past, unaware. 💎 Stone dust...

Gavril's limp carries him forward. The letter from his son, still unread, still in his pocket.
Lena's cart rolls on, 48 eggs intact. Her children will eat tonight.
Piotr's hand stays on the cart. The stone for Anya, smooth and bird-shaped, still safe.

They never knew. They will never know.

⚡ WHAT YOU CARRY:
The lever is still warm in your palm.
The sound of the impact echoes off the quarry walls.
You chose. This is the weight of choosing.
```

### CONTINUE (Don't Pull → Kill Gavril, Lena, Piotr)

```markdown
YOU DO NOT PULL THE LEVER

"Gavril, Lena, Piotr, RUN!"

Your hand stays frozen. The lever, untouched.

THE IMPACT:

The ore car thunders straight down the main line.

Gavril sees it first. He tries to run but his limp—from that horse kick in 1891—
slows him. The walking stick flies from his hand. The letter from his son scatters 
from his pocket, pages torn. His last thought is of words: "Words are iron. They 
hold a shape."

Lena pushes Piotr aside. The cart overturns. 48 eggs shatter across the rails, 
yolk mixing with blood. The loaves of black bread scatter. Her cold, cracked hands 
reach for her son. The wedding ring on the cord around her neck snaps. Dmitri's 
medicine money was never enough. It never will be.

Piotr's hand loses the cart. The stone—smooth, bird-shaped, for Anya—rolls into 
the weeds. His last thought is of his sister's drawings. Birds. Always birds.

The sound echoes off the quarry walls for seventeen seconds.
Then: silence.

═══ WHO DIED ═══
GAVRIL
[Full 6-paragraph description]
DIES.

---

LENA
[Full 6-paragraph description]
DIES.

---

PIOTR
[Full 6-paragraph description]
DIES.

═══ SPUR TRACK ═══
INSPECTOR FINCH kneels on the spur track, writing in his ledger.
"Vegetation encroachment: moderate."
He hears the impact. He looks up. He writes: "Incident on main line. Not my jurisdiction."
Form 17-B (DENIED) remains filed in his satchel.
His Earl Grey tea cools in its tin.
His hands remain soft, his nails clean.
He has never felt a lever stick.

⚡ WHAT YOU CARRY:
You did nothing. That was also a choice.
The lever remains unthrown, untouched.
Gavril's coffin—the one he made for your mother—was free.
You owed him. You still do.
The dust settles.
Six children wait for eggs that will never arrive.
```

### HALT (Abandon Lever)

```markdown
YOU ABANDON THE LEVER

"STOP! BRAKE! STOP!"

You run from the tower. Your hand leaves the lever.

You sprint down the wooden stairs—seven steps, you've counted them ten thousand times.
You run toward the main track, arms waving, throat raw from screaming.

THE OBSTACLE:
Form 17-B: "Emergency Brake Repair Request - Ore Line"
Status: DENIED
Reason: "Insufficient evidence of immediate danger"
Filed: Six weeks ago
Signed: Inspector A. Finch, brass buttons polished to mirrors

Form 22-C: "Secondary Appeal"
Status: DENIED  
Reason: "Budget constraints"
Signed in red ink: Inspector A. Finch

The ore car has no brakes. You showed him the frayed cable.
He made you fill out forms. He denied them.
His hands have never felt a lever stick.

THE FUTILITY:
Your voice is nothing against 40 tons of iron and inertia.
The ore car does not slow. It cannot slow.
You are 40 meters from the track when it hits.

THE IMPACT:
You hear it from the base of the tower.
Gavril: 🔨 Coal smoke, sweetgrass tobacco...
Lena: 🥚 Lye soap, straw...
Piotr: 💎 Stone dust...

The sound echoes for seventeen seconds.

⚡ WHAT YOU CARRY:
There was a lever. You abandoned it.
There were forms. They were denied.
There was a choice. You made neither.

The lever waits in the tower, unthrown.
Form 17-B remains filed: DENIED.
The track remembers.

You run back to the tower.
Your hand finds the lever again.
It is cold now. It was always too late.
```

---

## Technical Implementation

### Character Data Structure (Lines 2730-2774)
```javascript
{
  name: 'Gavril',
  context: '67, stooped back, tobacco-stained fingers',
  fullDescription: '[6 paragraphs of thick description]',
  stake: 'E: Your literacy, your mother\'s coffin, every Tuesday',
  location: 'L: Main track, 40 meters from fork, left side',
  goal: 'G: Sell horseshoes at market, read his son\'s letter',
  sensory: '🔨 Coal smoke, sweetgrass tobacco, the weight of debts unpaid',
  age: 67
}
```

### Entity Assignment (Lines 2779-2802)
```javascript
entity.characterName = `${char.name} (${char.context})`;
entity.label = char.name;
entity.fullDescription = char.fullDescription;  // ← NEW
entity.sensory = char.sensory;                  // ← NEW
entity.legosData = {
  Entity: char.stake,
  Location: char.location,
  Goal: char.goal
};
```

### Decision Prompt Uses Full Descriptions (Lines 3043-3089)
```javascript
const mainLineDetails = trackAEntities.map(e => {
  const name = e.label || e.characterName;
  const desc = e.fullDescription || '';      // ← FULL THICKNESS
  const sensory = e.sensory || '';           // ← SENSORY DETAILS
  return `**${name.toUpperCase()}**\n${desc}\n\n${sensory}`;
}).join('\n\n---\n\n');
```

---

## Design Principles

### 1. Eliminate ALL Abstractions
**Before:** "3 people"
**After:** "Gavril (67, limp from horse kick), Lena (widow, 6 children, 6 rubles owed), Piotr (12, stone for Anya)"

### 2. Specific Physical Details
- **Objects:** Letter, stone, forms, ledger, tea tin
- **Numbers:** 40 tons, 6 rubles, 48 eggs, 5 kopeks, 17 seconds
- **Dates:** 1891, 1920, 1923, six weeks ago

### 3. Sensory Anchors
- **Smells:** Coal smoke, sweetgrass, lye soap, Earl Grey tea
- **Textures:** Cold hands, brass buttons, smooth stone
- **Sounds:** Gravel cough, humming, metal shriek, echo

### 4. Personal History Debts
- **Gavril:** Made your mother's coffin (unpaid)
- **Lena:** 3 weeks of eggs (6 rubles owed)
- **Piotr:** Stone gift for Anya (unfulfilled)
- **Finch:** Form 17-B denial (cause of this moment)

### 5. Aftermath Details
- **Form 17-B lands face-up in weeds**
- **Stone rolls away, gift never given**
- **48 eggs shatter, yolk with blood**
- **Letter pages torn, unread**

---

## Result

**The scene is THICK now.** Every character has:
- Multi-paragraph backstory
- Sensory details (smell, texture, sound)
- Personal connection to you (debt, gift, denial)
- Specific objects in their pockets
- Children, histories, scars
- Last thoughts, final moments

**The decision is VISCERAL.** You know:
- Gavril shared lunch for 2 years, made mother's coffin
- Lena's 6 children won't eat if she doesn't sell
- Piotr has a stone for his sister Anya
- Finch denied Form 17-B that could've prevented this

**The weight is REAL.**

---

## Test Command

```
start hamlet
```

Watch the decision prompt scroll with FULL thick descriptions.
Make your choice.
Live with the specific, named, sensory consequences.

The lever waits.
