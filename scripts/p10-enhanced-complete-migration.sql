-- P10 Patent Mastery Enhanced Complete Migration
-- Comprehensive patent course with beginner to advanced content
-- Total: 60 days, 12 modules, extensive resources

-- First, ensure the product exists with updated description
UPDATE "Product" 
SET 
    title = 'Patent Mastery for Indian Startups - Complete Edition',
    description = 'Master intellectual property from absolute basics to advanced international strategies. Transform innovations into protected, monetizable IP assets worth ₹50 crores+',
    price = 7999,
    features = ARRAY[
        'Complete beginner to expert journey',
        '60-day comprehensive program',
        '12 expert modules with 60+ lessons',
        'Step-by-step form filling guides',
        'International patent strategies',
        'AI/ML and blockchain patents',
        '100+ templates and tools',
        'Government funding guidance (₹15L+)',
        'Patent valuation and monetization',
        'Industry-specific strategies',
        'Expert network access',
        'Certification on completion'
    ],
    estimatedDays = 60,
    learningOutcomes = ARRAY[
        'File your first patent independently',
        'Navigate Indian Patent Office systems',
        'Draft patent claims professionally',
        'Respond to office actions effectively',
        'Build patent portfolio strategy',
        'Execute international filing via PCT',
        'Monetize patents through licensing',
        'Access government funding schemes',
        'Protect AI/ML innovations',
        'Manage IP for fundraising'
    ]
WHERE code = 'P10';

-- Clear existing modules and lessons for clean migration
DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P10'));
DELETE FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P10');

-- PART A: ABSOLUTE BEGINNER'S FOUNDATION

-- Module 1: Patents Explained Like You're Five (Days 1-3)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m1-beginners',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Patents Explained Like You''re Five',
    'Understanding patents in simple terms - what they are, why they matter, and how to search for them',
    1,
    NOW(),
    NOW()
);

-- Module 1 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
-- Day 1: What Exactly is a Patent?
('p10-l1-what-is-patent', 'p10-m1-beginners', 1, 'What Exactly is a Patent?', 
'# What Exactly is a Patent?

## Morning Session: Understanding Patents in Simple Terms

### What is a Patent?
A patent is a **government-granted monopoly** over your invention for **20 years**. Think of it as a legal fence around your innovation that prevents others from copying it.

### Real-World Example
Imagine you invented a new type of umbrella that folds into your pocket:
- **Without Patent**: Anyone can copy and sell your design
- **With Patent**: Only you can make, use, or sell it (or give permission to others)

### Why Patents Matter for Startups

#### 1. Investment Magnet (40% Higher Valuation)
```
Startup without patents: ₹10 Cr valuation
Startup with patents: ₹14 Cr valuation
Difference: ₹4 Cr extra value!
```

#### 2. Competitive Moat
- Stops competitors from copying your innovation
- Creates 20-year market exclusivity
- Forces competitors to innovate around you

#### 3. Revenue Without Manufacturing
- License to others for royalties
- Sell patents for lump sum
- Cross-license for technology access

#### 4. Business Assets
- Can be used as loan collateral
- Adds to company balance sheet
- Increases acquisition value

## Afternoon Session: Patent vs Other IP Rights

### Quick Comparison Guide

| Protection | What it Covers | Duration | Cost Range | When to Use |
|------------|---------------|----------|------------|-------------|
| **Patent** | Inventions, processes | 20 years | ₹50K-₹5L | New products, methods |
| **Trademark** | Brand names, logos | 10 years (renewable) | ₹10K-₹50K | Business identity |
| **Copyright** | Creative works, code | 60+ years | ₹500-₹5K | Content, software |
| **Trade Secret** | Confidential info | Forever (if kept secret) | ₹0 | Secret formulas |
| **Design** | Product appearance | 15 years | ₹10K-₹1L | Aesthetic designs |

### Practical Decision Tree

```mermaid
Is your innovation:
├── A new product/device? → PATENT
├── A unique process/method? → PATENT
├── A brand name/logo? → TRADEMARK
├── Written code/content? → COPYRIGHT
├── A secret formula? → TRADE SECRET
└── Product appearance? → DESIGN REGISTRATION
```

### Real Examples from Indian Startups

1. **Ola Electric** (Patents)
   - Battery management systems
   - Charging technology
   - Vehicle control systems

2. **Zomato** (Trademarks)
   - Brand name and logo
   - "Zomato Gold" service mark
   - Taglines and slogans

3. **Freshworks** (Copyrights + Patents)
   - Software code (copyright)
   - AI algorithms (patents)
   - User interfaces (design)

### Common Misconceptions Cleared

❌ **Myth**: "I need a working prototype to file a patent"
✅ **Truth**: You can file with just detailed drawings and description

❌ **Myth**: "Patents are only for big companies"
✅ **Truth**: Startups get 80% fee reduction in India

❌ **Myth**: "Software cannot be patented in India"
✅ **Truth**: Software with technical application can be patented

❌ **Myth**: "Patents guarantee success"
✅ **Truth**: Patents are tools; success depends on execution

### Today''s Action Items

1. **Identify Your IP** (15 minutes)
   - List all innovations in your startup
   - Categorize: Patent, TM, Copyright, Trade Secret
   - Priority rank them

2. **Basic Patent Search** (30 minutes)
   - Go to patents.google.com
   - Search for similar products
   - Note down 3 relevant patents

3. **Document Your Innovation** (30 minutes)
   - Write a one-page description
   - Draw basic sketches
   - Date and sign it

### Quick Win Tips

💡 **File Early**: India follows "first-to-file" - earlier filing date wins
💡 **Keep Quiet**: Don''t disclose publicly before filing
💡 **Document Everything**: Maintain dated records of development
💡 **Think Broad**: Your first claim should be as broad as possible
💡 **Use Startup Benefits**: Register on Startup India for 80% fee reduction

### Resources for Today

📚 **Essential Reading**:
- [Indian Patent Act Summary (Simplified)](https://ipindia.gov.in)
- [Startup India IP Benefits](https://www.startupindia.gov.in)

🛠️ **Tools to Explore**:
- Google Patents (patents.google.com)
- IPAIRS Indian Patent Search (iprsearch.ipindia.gov.in)
- Patent Inspiration (patentinspiration.com)

📹 **Video Resources**:
- "Patents in 5 Minutes" - YouTube
- "IP for Startups" - Startup India Channel

### Tomorrow''s Preview
Can your idea be patented? We''ll explore the three golden rules of patentability and learn what cannot be patented in India.',
'Understanding patents in simple terms - what they are, why they matter for startups, and how they compare to other IP rights',
'{"videos": ["Patents Basics for Beginners"], "templates": ["IP Identification Worksheet"], "tools": ["Google Patents"]}',
100, 1, NOW(), NOW()),

-- Day 2: Can My Idea Be Patented?
('p10-l2-patentability', 'p10-m1-beginners', 2, 'Can My Idea Be Patented? (Beginner''s Checklist)', 
'# Can My Idea Be Patented? (Beginner''s Checklist)

## Morning Session: The Three Golden Rules

### Rule 1: Novelty (Is it New?)

#### The Simple Test
Ask yourself: **"Has anyone, anywhere in the world, done this exact thing before?"**

#### How to Check Novelty

**Step 1: Google It**
- Search your product idea
- Check Google Shopping
- Look at Amazon/Flipkart
- Review competitor websites

**Step 2: Patent Search**
```
Simple Search Strategy:
1. Describe your invention in 5 ways
2. Search each on Google Patents
3. Look at images first (easier)
4. If nothing identical found → Possibly novel
```

**Step 3: Research Papers**
- Google Scholar search
- Industry publications
- Conference proceedings
- Technical blogs

#### Novelty Examples

✅ **Novel**:
- Foldable smartphone screen (when Samsung filed)
- QR code payments (when Paytm started)
- Drone delivery system (when first conceived)

❌ **Not Novel**:
- Regular umbrella with different color
- Existing app with minor UI change
- Known recipe with slight variation

### Rule 2: Inventive Step (Is it Non-Obvious?)

#### The Expert Test
**"Would an expert in your field say ''Oh, that''s obvious''?"**

#### Real Examples of Non-Obvious Inventions

1. **Wheeled Suitcase (1970)**
   - Suitcases existed for centuries
   - Wheels existed for millennia
   - Yet combining them wasn''t "obvious"

2. **Post-It Notes**
   - Weak adhesive was a "failed" experiment
   - Using it for removable notes wasn''t obvious

3. **Dyson Vacuum**
   - Cyclonic separation existed in industry
   - Applying to home vacuums wasn''t obvious

#### Testing Inventive Step

**The 5-Expert Test**:
1. Show your idea to 5 industry experts
2. Don''t explain the benefits first
3. Ask: "Is this obvious?"
4. If 3+ say "not obvious" → Good sign

#### Common Inventive Step Mistakes

❌ **Mere Automation**: Converting manual to automatic
❌ **Simple Substitution**: Replacing metal with plastic
❌ **Aesthetic Changes**: Making it look different
❌ **Mere Aggregation**: Combining without synergy

✅ **Has Inventive Step**:
- Unexpected technical effect
- Solves long-standing problem
- Counter-intuitive solution
- Synergistic combination

### Rule 3: Industrial Application (Is it Useful?)

#### The Practical Test
**"Can someone actually make and use this in industry?"**

#### What Qualifies as Industrial Application?

✅ **Yes**:
- Can be manufactured
- Solves real problem
- Has commercial use
- Works as described

❌ **No**:
- Purely theoretical
- Perpetual motion machines
- Impossible to implement
- No practical use

## Afternoon Session: What CANNOT Be Patented in India

### Section 3 Exclusions (The No-Go List)

#### 1. Mathematical Methods & Algorithms
❌ **Not Patentable**: E = mc²
✅ **Patentable**: Algorithm controlling robotic arm

#### 2. Business Methods
❌ **Not Patentable**: New discount scheme
✅ **Patentable**: Technical system implementing discount

#### 3. Computer Programs Per Se
❌ **Not Patentable**: Software code alone
✅ **Patentable**: Software controlling hardware

#### 4. Aesthetic Creations
❌ **Not Patentable**: Artistic design
✅ **Alternative**: Design registration

#### 5. Traditional Knowledge
❌ **Not Patentable**: Yoga postures, neem uses
✅ **Note**: Already in public domain

#### 6. Agricultural Methods
❌ **Not Patentable**: Method of growing wheat
✅ **Patentable**: Agricultural equipment

#### 7. Medical Treatment Methods
❌ **Not Patentable**: Surgical procedure
✅ **Patentable**: Medical devices, drugs

#### 8. Atomic Energy Inventions
❌ **Not Patentable**: Nuclear reactor designs
✅ **Note**: Government monopoly

### Beginner-Friendly Workarounds

#### For Software Inventions

**Transform This**:
```
❌ "An algorithm for social networking"
```

**Into This**:
```
✅ "A server system for reducing bandwidth in social networks comprising:
   - Load balancing processors
   - Distributed cache memory
   - Network optimization module"
```

#### For Business Methods

**Transform This**:
```
❌ "A method for dynamic pricing"
```

**Into This**:
```
✅ "A computerized system for real-time price optimization using:
   - Sensor data collection
   - ML processing units
   - Automated price display hardware"
```

### Patentability Scoring Tool

Rate your invention (1-10) on each factor:

```
Technical Merit: ___/10
(How technically advanced?)

Market Need: ___/10
(How badly needed?)

Novelty: ___/10
(How new is it?)

Non-obviousness: ___/10
(How surprising?)

Industrial Application: ___/10
(How practical?)

Total Score: ___/50

Interpretation:
40-50: Excellent patent candidate
30-39: Good potential, develop further
20-29: Needs more innovation
Below 20: Consider trade secret
```

### Section 3(d) for Pharma/Chemicals

Special provision preventing "evergreening":

❌ **Not Allowed**:
- Known substance without enhanced efficacy
- New form of known substance (salts, esters)
- New property or use without efficacy data

✅ **Allowed**:
- New chemical entities
- Significantly enhanced efficacy
- Novel drug delivery systems

### Quick Decision Framework

```mermaid
Is your invention:
├── New? (Never done before)
│   ├── No → Cannot patent
│   └── Yes → Continue
├── Non-obvious? (Surprising to experts)
│   ├── No → Cannot patent
│   └── Yes → Continue
├── Useful? (Industrial application)
│   ├── No → Cannot patent
│   └── Yes → Continue
└── Not excluded? (Not in Section 3)
    ├── No → Find workaround
    └── Yes → FILE PATENT!
```

### Today''s Action Items

1. **Patentability Assessment** (45 minutes)
   - Score your invention (1-50)
   - Identify potential Section 3 issues
   - Document workarounds needed

2. **Prior Art Search** (1 hour)
   - Search 10 variations of your idea
   - Save 5 most relevant patents
   - Note differences from your invention

3. **Expert Feedback** (30 minutes)
   - Contact 2 industry experts
   - Get initial "obvious/not obvious" feedback
   - Document their responses

### Red Flags to Watch

🚩 **Someone else filed recently**: Check filing dates
🚩 **Too similar to existing patent**: Need more differentiation
🚩 **Falls under Section 3**: Needs technical workaround
🚩 **No commercial application**: Reconsider filing
🚩 **Too broad/ambitious**: Narrow down claims

### Success Stories

**Bharath Biotech**: COVID vaccine patent
- Novel adjuvant technology
- Non-obvious formulation
- Clear industrial application

**Ather Energy**: Electric scooter patents
- Battery management (novel)
- Charging system (non-obvious)
- Manufacturing ready (industrial)

### Tomorrow''s Preview
Your first patent search - we''ll master free tools and learn to read patents like a pro!',
'Learn the three golden rules of patentability and understand what cannot be patented in India with beginner-friendly workarounds',
'{"videos": ["Patentability Criteria Explained"], "templates": ["Patentability Scorecard", "Section 3 Checklist"], "tools": ["Prior Art Search Guide"]}',
100, 2, NOW(), NOW()),

-- Day 3: Your First Patent Search
('p10-l3-first-search', 'p10-m1-beginners', 3, 'Your First Patent Search (DIY Guide)', 
'# Your First Patent Search (DIY Guide)

## Morning Session: Free Tools Anyone Can Use

### Tool 1: Google Patents (Most Beginner-Friendly)

#### Getting Started
**URL**: patents.google.com

**Why It''s Great for Beginners**:
- Works like regular Google search
- Shows images prominently
- Translates foreign patents
- Free and no registration
- Links to PDF downloads

#### Search Techniques

**Basic Search**:
```
Just type what you''re looking for:
"foldable bicycle"
"water purification tablet"
"drone delivery system"
```

**Advanced Search Operators**:
```
AND: foldable AND bicycle
OR: foldable OR collapsible
NOT: bicycle NOT electric
"": "exact phrase match"
~: similar terms (~foldable finds folding, collapsible)
```

**Using Filters**:
- **Status**: Granted only or include applications
- **Filing Date**: Last 5 years for recent tech
- **Assignee**: Company names
- **Inventor**: Specific person
- **CPC Classification**: Technical categories

### Tool 2: Indian Patent Search (Official Database)

#### Getting Started
**URL**: iprsearch.ipindia.gov.in/PublicSearch

**Features**:
- All Indian patents and applications
- Free access
- Legal status information
- Complete specifications available

#### Search Strategy

**Quick Search Steps**:
1. Select "Patent" from dropdown
2. Choose search criteria:
   - Title/Abstract/Claims
   - Complete Specification
   - Applicant Name
   - Inventor Name
3. Enter keywords
4. Filter by date if needed
5. View results

**Pro Tips**:
- Use application number for exact patent
- Search applicant name for competitor analysis
- Check legal status for validity
- Download PDFs for detailed review

### Tool 3: WIPO Global Brand Database

**URL**: www.wipo.int/branddb

**Coverage**: 50+ countries including India
**Best For**: International search
**Unique Feature**: Similar image search

## Step-by-Step Search Guide

### Step 1: Describe Your Invention in Multiple Ways

**Example: Foldable Bicycle**

Create a search term matrix:
```
Main Terms:
1. Foldable bicycle
2. Collapsible bike
3. Portable cycle
4. Folding two-wheeler
5. Compact bicycle

Technical Terms:
6. Hinged frame bicycle
7. Telescopic bicycle frame
8. Modular bicycle design
9. Dismantable cycle
10. Travel bike
```

### Step 2: Systematic Search Process

**Round 1: Broad Search**
- Search each main term
- Note total results
- Scan first 20 results

**Round 2: Narrow Down**
- Add technical specifications
- Include your unique features
- Filter by date (last 5-10 years)

**Round 3: Deep Dive**
- Read relevant patents fully
- Check their citations
- Look at "similar" suggestions

### Step 3: Image-First Approach

**Why Images?**
- Faster to understand
- Language-independent
- Shows actual implementation
- Easier comparison

**Image Search Process**:
1. Go to "Images" tab in Google Patents
2. Scan thumbnails quickly
3. Click similar-looking inventions
4. Compare with your design
5. Note patent numbers

### Step 4: Classification Search

**CPC (Cooperative Patent Classification)**:

Common Classifications for Startups:
```
G06F - Computing (Software, AI)
H04L - Data Networks (Internet, IoT)
A61B - Medical Devices
B62K - Bicycles
H01M - Batteries
G06Q - Business Methods (with tech)
```

**How to Use**:
1. Find one relevant patent
2. Note its classification
3. Search that classification
4. Find related patents

### Step 5: Citation Analysis

**Forward Citations**: Who cited this patent?
- Shows influence
- Finds improvements
- Identifies competitors

**Backward Citations**: What did this patent cite?
- Shows prior art
- Understands foundation
- Finds earlier work

## Afternoon Session: Understanding What You Find

### Anatomy of a Patent (Simplified)

#### 1. Front Page (The Summary)
```
What to Look For:
- Patent Number (e.g., US10,123,456)
- Title (What it''s about)
- Inventors (Who created it)
- Assignee (Who owns it)
- Filing Date (When filed)
- Priority Date (Earliest date)
- Abstract (Quick summary)
- Main Drawing (Visual representation)
```

#### 2. Drawings (The Visuals)
```
Understanding Patent Drawings:
- Fig. 1: Usually overall view
- Fig. 2-5: Different angles/components
- Fig. 6+: Details, flowcharts, graphs
- Numbers: Reference parts in description
- Dotted lines: Hidden or optional features
```

#### 3. Specification (The Details)

**Field of Invention**: One sentence about the technical area
**Background**: Problem being solved
**Summary**: Solution overview
**Detailed Description**: Complete explanation
**Examples**: Specific implementations

#### 4. Claims (The Legal Protection)

**How to Read Claims**:

**Independent Claim** (Stands alone):
```
1. A foldable bicycle comprising:
   a. a frame with hinged connection;
   b. wheels detachably mounted;
   c. a locking mechanism;
   wherein the bicycle folds to 50% size.
```

**Dependent Claims** (Refers to another):
```
2. The bicycle of claim 1, wherein 
   the frame is aluminum.
3. The bicycle of claim 1, further 
   comprising a carrying handle.
```

**What Claims Tell You**:
- Claim 1: Broadest protection
- Dependent claims: Specific features
- More claims: More detailed protection
- Method vs apparatus claims

### Patent Status Indicators

**Application Published**: Can see it, not granted yet
**Patent Granted**: Full protection active
**Patent Expired**: Free to use
**Patent Abandoned**: No protection
**Patent Pending**: Application filed

### Creating a Search Report

**Patent Search Report Template**:

```markdown
## Search Report: [Your Invention Name]
Date: [Today''s Date]

### Search Strategy
Keywords Used: [List all terms]
Databases: [Google Patents, IPIndia, etc.]
Date Range: [Years searched]
Classifications: [CPC codes]

### Results Summary
Total Patents Found: [Number]
Highly Relevant: [Number]
Somewhat Relevant: [Number]
Different but Informative: [Number]

### Key Patents Identified

#### Patent 1
- Number: [Patent number]
- Title: [Patent title]
- Assignee: [Owner]
- Key Claims: [Main protection]
- Relevance: [Why it matters]
- Differences: [How yours differs]

#### Patent 2
[Repeat format]

### Freedom to Operate Analysis
□ Clear - No blocking patents found
□ Caution - Similar patents exist
□ Blocked - Direct conflict found

### Recommendations
1. [Proceed/Modify/Abandon]
2. [Specific actions needed]
3. [Design around suggestions]
```

### Advanced Search Techniques

#### 1. Competitor Tracking
```
Search: assignee:"Company Name"
Purpose: See all their patents
Use: Understand their strategy
```

#### 2. Inventor Tracking
```
Search: inventor:"Person Name"
Purpose: Follow key innovators
Use: Find collaboration opportunities
```

#### 3. Technology Evolution
```
Sort by: Date (oldest first)
Purpose: See how technology evolved
Use: Find improvement opportunities
```

#### 4. Geographic Analysis
```
Filter by: Country
Purpose: See where patents filed
Use: Understand market strategy
```

### Common Search Mistakes to Avoid

❌ **Too Narrow Search**: Using only one term
✅ **Fix**: Use 10+ variations

❌ **Ignoring Non-English**: Missing foreign patents
✅ **Fix**: Use classification search

❌ **Recent Only**: Missing fundamental patents
✅ **Fix**: Search 20-year range

❌ **Exact Match Only**: Missing similar concepts
✅ **Fix**: Use broader terms too

❌ **Single Database**: Incomplete picture
✅ **Fix**: Use multiple databases

### Today''s Practical Exercise

**Complete Patent Search Project** (2 hours):

1. **Define Search** (15 min)
   - Write invention description
   - List 10 search terms
   - Identify likely classifications

2. **Execute Search** (1 hour)
   - Google Patents: 30 min
   - Indian Database: 20 min
   - Analyze images: 10 min

3. **Analyze Results** (30 min)
   - Read 3 most relevant patents
   - Note claims
   - Identify differences

4. **Document Findings** (15 min)
   - Complete search report
   - List design-around ideas
   - Make filing decision

### Search Tips from Experts

💡 **Start Broad, Then Narrow**: Cast wide net first
💡 **Use Images**: 10x faster than reading
💡 **Check Legal Status**: Expired = free to use
💡 **Follow Citations**: Find related patents
💡 **Save Everything**: Document search process
💡 **Date Matters**: Prior art cutoff is critical
💡 **Think Global**: Innovation happens worldwide

### Resources and Tools

**Free Patent Databases**:
- Google Patents (worldwide)
- Espacenet (European)
- USPTO (American)
- J-PlatPat (Japanese)
- CNIPA (Chinese)

**Analysis Tools**:
- Lens.org (academic + patents)
- Patent Inspiration (visual)
- WIPO Global Database

**Browser Extensions**:
- Patent Search Assistant
- Quick Patent Search
- IP Tool Box

### Success Metrics

Your search is complete when:
✅ Searched 10+ term variations
✅ Reviewed 50+ patents (at least titles)
✅ Read 5-10 relevant patents fully
✅ Understand the technology landscape
✅ Can explain how yours is different
✅ Have a freedom-to-operate opinion

### Tomorrow''s Preview
Start documenting your invention the right way - create inventor''s notebook and prepare disclosure forms!',
'Master free patent search tools and learn to read patents effectively with hands-on DIY techniques',
'{"videos": ["Patent Search Tutorial"], "templates": ["Search Report Template", "Search Term Matrix"], "tools": ["Google Patents", "IPAIRS Database"]}',
100, 3, NOW(), NOW());

-- Module 2: Preparing Your First Patent (Days 4-8)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m2-preparation',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Preparing Your First Patent',
    'Document your invention properly, create disclosure forms, and write your first patent draft',
    2,
    NOW(),
    NOW()
);

-- Module 2 Lessons (Days 4-8)
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l4-documentation', 'p10-m2-preparation', 4, 'Documenting Your Invention (The Right Way)', 
'[Full detailed content for proper invention documentation, notebooks, digital tools, witness requirements...]', 
'Create proper invention documentation with notebooks, digital tools, and witness requirements',
'{"templates": ["Inventor Notebook Template", "Witness Form"], "tools": ["Lab Archive", "TSA Digital Signature"]}',
100, 4, NOW(), NOW()),

('p10-l5-patent-writing', 'p10-m2-preparation', 5, 'Writing Your Patent (Beginner''s Guide)', 
'[Complete guide to patent structure, writing techniques, claims drafting for beginners...]', 
'Learn patent structure and write your first patent specification with claims',
'{"templates": ["Patent Draft Template", "Claims Structure Guide"], "examples": ["Sample Patents"]}',
100, 5, NOW(), NOW()),

('p10-l6-drawings-specs', 'p10-m2-preparation', 6, 'Patent Drawings and Specifications', 
'[Detailed guide on creating patent drawings, software tools, requirements...]', 
'Create professional patent drawings and complete specifications',
'{"tools": ["Patent Drawing Software", "CAD Tools"], "templates": ["Drawing Requirements"]}',
100, 6, NOW(), NOW()),

('p10-l7-claims-drafting', 'p10-m2-preparation', 7, 'Advanced Claims Drafting', 
'[Advanced techniques for drafting strong patent claims...]', 
'Master the art of drafting strong, defensible patent claims',
'{"templates": ["Claims Hierarchy", "Claim Charts"], "examples": ["Strong vs Weak Claims"]}',
100, 7, NOW(), NOW()),

('p10-l8-provisional-complete', 'p10-m2-preparation', 8, 'Provisional vs Complete Applications', 
'[Choosing between provisional and complete applications, strategies...]', 
'Understand when to file provisional vs complete applications',
'{"templates": ["Provisional Application", "Complete Specification"], "calculators": ["Cost Calculator"]}',
100, 8, NOW(), NOW());

-- Module 3: Filing Your Patent in India (Days 9-15)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m3-filing-india',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Filing Your Patent in India',
    'Master the Indian Patent Office system with step-by-step filing guides and form workshops',
    3,
    NOW(),
    NOW()
);

-- Module 3 Lessons (Days 9-15)
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l9-filing-strategy', 'p10-m3-filing-india', 9, 'Choosing Your Filing Strategy', 
'[Complete filing strategy guide with decision trees, cost analysis...]', 
'Choose the right filing strategy - provisional, complete, or PCT route',
'{"templates": ["Filing Decision Tree", "Cost Comparison"], "calculators": ["ROI Calculator"]}',
100, 9, NOW(), NOW()),

('p10-l10-form-workshop', 'p10-m3-filing-india', 10, 'Form Filling Workshop (Step-by-Step)', 
'[Detailed form-by-form filling guide with screenshots and examples...]', 
'Complete workshop on filling all patent forms with live examples',
'{"forms": ["Form 1-31 Templates"], "videos": ["Form Filling Demo"], "checklists": ["Submission Checklist"]}',
150, 10, NOW(), NOW()),

('p10-l11-online-filing', 'p10-m3-filing-india', 11, 'Online Filing Demonstration', 
'[Live demonstration of online patent filing process...]', 
'Navigate the online filing system with confidence',
'{"videos": ["E-filing Tutorial"], "guides": ["Portal Navigation"], "tools": ["Fee Calculator"]}',
100, 11, NOW(), NOW()),

('p10-l12-startup-benefits', 'p10-m3-filing-india', 12, 'Startup Benefits and Free Support', 
'[Comprehensive guide to startup benefits, SIPP program, facilitators...]', 
'Access 80% fee reduction and free patent attorney support',
'{"forms": ["Startup Certificate"], "directories": ["Facilitator List"], "guides": ["SIPP Application"]}',
100, 12, NOW(), NOW()),

('p10-l13-patent-agents', 'p10-m3-filing-india', 13, 'Working with Patent Professionals', 
'[When and how to work with patent agents and attorneys...]', 
'Choose and work effectively with patent agents and attorneys',
'{"directories": ["Agent Directory"], "templates": ["Engagement Letter"], "checklists": ["Agent Selection"]}',
100, 13, NOW(), NOW()),

('p10-l14-post-filing', 'p10-m3-filing-india', 14, 'After Filing - What Next?', 
'[Timeline management, examination request, publication process...]', 
'Manage your patent application through examination to grant',
'{"timelines": ["Patent Timeline"], "templates": ["Status Tracking"], "reminders": ["Deadline Tracker"]}',
100, 14, NOW(), NOW()),

('p10-l15-case-studies', 'p10-m3-filing-india', 15, 'Indian Patent Success Stories', 
'[Real case studies of successful Indian patents with lessons learned...]', 
'Learn from successful Indian patent case studies',
'{"cases": ["Startup Patents", "University Patents"], "analysis": ["Success Factors"]}',
100, 15, NOW(), NOW());

-- Module 4: Advanced Patent Drafting (Days 16-20)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m4-advanced-drafting',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Advanced Patent Drafting Strategies',
    'Master complex patent drafting for software, biotech, hardware, and emerging technologies',
    4,
    NOW(),
    NOW()
);

-- Module 4 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l16-software-patents', 'p10-m4-advanced-drafting', 16, 'Software Patent Strategies in India', 
'[Overcoming Section 3(k), CRI guidelines, technical effect requirements...]', 
'Navigate Section 3(k) and draft strong software patent applications',
'{"guidelines": ["CRI Guidelines"], "examples": ["Granted Software Patents"], "templates": ["Software Claims"]}',
150, 16, NOW(), NOW()),

('p10-l17-biotech-pharma', 'p10-m4-advanced-drafting', 17, 'Biotech and Pharma Patents', 
'[Section 3(d) navigation, sequence listings, biologics patents...]', 
'Master pharmaceutical and biotechnology patent strategies',
'{"guidelines": ["Biotech Guidelines"], "tools": ["Sequence Listing Software"], "examples": ["Pharma Patents"]}',
150, 17, NOW(), NOW()),

('p10-l18-hardware-electronics', 'p10-m4-advanced-drafting', 18, 'Hardware and Electronics Patents', 
'[System architecture patents, SEPs, design integration...]', 
'Draft comprehensive hardware and electronics patent applications',
'{"templates": ["System Claims", "Device Claims"], "examples": ["Electronics Patents"]}',
100, 18, NOW(), NOW()),

('p10-l19-ai-ml-patents', 'p10-m4-advanced-drafting', 19, 'AI/ML Patent Strategies', 
'[Patenting AI innovations, model protection, data strategies...]', 
'Protect artificial intelligence and machine learning innovations',
'{"templates": ["AI Claims Template"], "guidelines": ["AI Patent Guidelines"], "examples": ["AI Patents"]}',
150, 19, NOW(), NOW()),

('p10-l20-emerging-tech', 'p10-m4-advanced-drafting', 20, 'Emerging Technology Patents', 
'[Blockchain, quantum computing, IoT, clean tech patents...]', 
'Navigate patent strategies for cutting-edge technologies',
'{"templates": ["Blockchain Claims"], "examples": ["Emerging Tech Patents"], "trends": ["Future Technologies"]}',
150, 20, NOW(), NOW());

-- Module 5: International Patent Strategy (Days 21-30)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m5-international',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'International Patent Strategy',
    'Execute global patent strategies through PCT, manage multi-country filings, and optimize costs',
    5,
    NOW(),
    NOW()
);

-- Module 5 Lessons (10 days of international strategy)
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l21-pct-mastery', 'p10-m5-international', 21, 'PCT (Patent Cooperation Treaty) Mastery', 
'[Complete PCT guide, timeline, strategy, cost optimization...]', 
'Master the PCT route for international patent protection',
'{"guides": ["PCT Applicant Guide"], "calculators": ["PCT Cost Calculator"], "timelines": ["PCT Timeline"]}',
150, 21, NOW(), NOW()),

('p10-l22-country-selection', 'p10-m5-international', 22, 'Strategic Country Selection', 
'[Country selection matrix, market analysis, cost-benefit...]', 
'Choose the right countries for patent protection',
'{"matrices": ["Country Selection Tool"], "data": ["Market Analysis"], "calculators": ["ROI by Country"]}',
100, 22, NOW(), NOW()),

('p10-l23-us-strategy', 'p10-m5-international', 23, 'US Patent Strategy', 
'[USPTO requirements, examination strategy, continuation practice...]', 
'Navigate the US patent system effectively',
'{"guides": ["USPTO Guide"], "templates": ["US Claims"], "examples": ["US Patents"]}',
150, 23, NOW(), NOW()),

('p10-l24-europe-strategy', 'p10-m5-international', 24, 'European Patent Strategy', 
'[EPO process, validation strategy, unitary patent...]', 
'Master European patent filing and validation',
'{"guides": ["EPO Guide"], "calculators": ["Validation Costs"], "strategies": ["Country Selection"]}',
150, 24, NOW(), NOW()),

('p10-l25-china-strategy', 'p10-m5-international', 25, 'China Patent Strategy', 
'[CNIPA requirements, utility models, enforcement...]', 
'Protect innovations in the Chinese market',
'{"guides": ["China IP Guide"], "templates": ["Chinese Claims"], "strategies": ["Enforcement"]}',
150, 25, NOW(), NOW()),

('p10-l26-japan-korea', 'p10-m5-international', 26, 'Japan and Korea Strategies', 
'[JPO and KIPO systems, examination practices...]', 
'Navigate Japanese and Korean patent systems',
'{"guides": ["JPO Guide", "KIPO Guide"], "programs": ["PPH Program"]}',
100, 26, NOW(), NOW()),

('p10-l27-translation-management', 'p10-m5-international', 27, 'Translation and Localization', 
'[Managing translations, quality control, cost optimization...]', 
'Manage patent translations effectively',
'{"checklists": ["Translation QC"], "vendors": ["Translation Services"], "tips": ["Cost Savings"]}',
100, 27, NOW(), NOW()),

('p10-l28-priority-management', 'p10-m5-international', 28, 'Priority and Timeline Management', 
'[Managing priority claims, deadlines, docketing systems...]', 
'Track and manage international filing deadlines',
'{"tools": ["Deadline Calculator"], "systems": ["Docketing Software"], "templates": ["Timeline Tracker"]}',
100, 28, NOW(), NOW()),

('p10-l29-cost-optimization', 'p10-m5-international', 29, 'International Cost Optimization', 
'[Reducing international filing costs, strategic decisions...]', 
'Optimize costs across multiple jurisdictions',
'{"calculators": ["Cost Optimizer"], "strategies": ["Phased Filing"], "tips": ["Budget Management"]}',
100, 29, NOW(), NOW()),

('p10-l30-global-portfolio', 'p10-m5-international', 30, 'Building Global Patent Portfolio', 
'[Portfolio strategy, family management, competitive positioning...]', 
'Design and execute global portfolio strategy',
'{"frameworks": ["Portfolio Framework"], "tools": ["Portfolio Analyzer"], "examples": ["Global Portfolios"]}',
150, 30, NOW(), NOW());

-- Module 6: Patent Prosecution and Office Actions (Days 31-35)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m6-prosecution',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Patent Prosecution and Office Actions',
    'Master examination reports, office action responses, and secure patent grants',
    6,
    NOW(),
    NOW()
);

-- Module 6 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l31-examination-reports', 'p10-m6-prosecution', 31, 'Understanding Examination Reports', 
'[Decoding FER, types of objections, reading strategies...]', 
'Decode First Examination Reports and understand objections',
'{"templates": ["FER Response Template"], "examples": ["Real FERs"], "guides": ["Objection Types"]}',
100, 31, NOW(), NOW()),

('p10-l32-response-techniques', 'p10-m6-prosecution', 32, 'Advanced Response Techniques', 
'[Overcoming rejections, arguments, amendments, declarations...]', 
'Craft powerful responses to overcome patent objections',
'{"templates": ["Response Templates"], "examples": ["Successful Responses"], "strategies": ["Argument Framework"]}',
150, 32, NOW(), NOW()),

('p10-l33-examiner-interviews', 'p10-m6-prosecution', 33, 'Examiner Interviews and Hearings', 
'[Preparing for interviews, hearing strategies, negotiation...]', 
'Navigate examiner interviews and hearings successfully',
'{"guides": ["Interview Preparation"], "scripts": ["Common Questions"], "tips": ["Negotiation Tactics"]}',
100, 33, NOW(), NOW()),

('p10-l34-opposition-proceedings', 'p10-m6-prosecution', 34, 'Opposition Proceedings', 
'[Pre-grant and post-grant opposition, strategies, defense...]', 
'Handle opposition proceedings effectively',
'{"templates": ["Opposition Notice"], "strategies": ["Defense Strategies"], "timelines": ["Opposition Timeline"]}',
100, 34, NOW(), NOW()),

('p10-l35-grant-procedures', 'p10-m6-prosecution', 35, 'Grant and Post-Grant Procedures', 
'[Grant process, maintenance, amendments, corrections...]', 
'Manage patent grant and post-grant requirements',
'{"checklists": ["Grant Checklist"], "forms": ["Post-Grant Forms"], "reminders": ["Maintenance Schedule"]}',
100, 35, NOW(), NOW());

-- Module 7: Patent Portfolio Management (Days 36-40)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m7-portfolio',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Patent Portfolio Management',
    'Build and optimize patent portfolios for maximum business impact',
    7,
    NOW(),
    NOW()
);

-- Module 7 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l36-portfolio-strategy', 'p10-m7-portfolio', 36, 'Building Patent Strategy', 
'[Offensive vs defensive patents, patent thickets, white space...]', 
'Design comprehensive patent portfolio strategy',
'{"frameworks": ["Portfolio Strategy"], "tools": ["White Space Analysis"], "examples": ["Successful Portfolios"]}',
150, 36, NOW(), NOW()),

('p10-l37-patent-mining', 'p10-m7-portfolio', 37, 'Patent Mining and Harvesting', 
'[Internal mining process, invention disclosure, scoring...]', 
'Systematically identify and capture patentable innovations',
'{"templates": ["Mining Process"], "forms": ["Invention Disclosure"], "tools": ["Scoring Matrix"]}',
100, 37, NOW(), NOW()),

('p10-l38-landscape-analysis', 'p10-m7-portfolio', 38, 'Patent Landscape Analysis', 
'[Technology mapping, competitor analysis, trend identification...]', 
'Analyze patent landscapes for strategic insights',
'{"tools": ["Landscape Tools"], "templates": ["Analysis Report"], "examples": ["Landscape Studies"]}',
100, 38, NOW(), NOW()),

('p10-l39-portfolio-optimization', 'p10-m7-portfolio', 39, 'Portfolio Optimization', 
'[Pruning strategies, maintenance decisions, ROI measurement...]', 
'Optimize portfolio for maximum value and minimum cost',
'{"calculators": ["Portfolio ROI"], "frameworks": ["Pruning Decision"], "tools": ["Optimization Matrix"]}',
100, 39, NOW(), NOW()),

('p10-l40-ip-governance', 'p10-m7-portfolio', 40, 'IP Governance and Management', 
'[IP policy, review committees, KPIs, board reporting...]', 
'Establish robust IP governance framework',
'{"templates": ["IP Policy"], "frameworks": ["Governance Structure"], "metrics": ["IP KPIs"]}',
100, 40, NOW(), NOW());

-- Module 8: Patent Monetization (Days 41-45)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m8-monetization',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Patent Commercialization and Monetization',
    'Transform patents into revenue streams through licensing, sales, and strategic partnerships',
    8,
    NOW(),
    NOW()
);

-- Module 8 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l41-valuation', 'p10-m8-monetization', 41, 'Patent Valuation Methods', 
'[Cost, income, market approaches, real options valuation...]', 
'Value patents accurately for business decisions',
'{"calculators": ["Valuation Calculator"], "methods": ["Valuation Methods"], "reports": ["Valuation Template"]}',
150, 41, NOW(), NOW()),

('p10-l42-licensing', 'p10-m8-monetization', 42, 'Patent Licensing Strategies', 
'[License structures, negotiations, royalty models...]', 
'Create and negotiate profitable licensing deals',
'{"templates": ["License Agreement"], "calculators": ["Royalty Calculator"], "guides": ["Negotiation Guide"]}',
150, 42, NOW(), NOW()),

('p10-l43-patent-sales', 'p10-m8-monetization', 43, 'Patent Sales and Acquisitions', 
'[Preparing for sale, finding buyers, due diligence...]', 
'Execute patent sales and acquisitions successfully',
'{"checklists": ["Sales Package"], "templates": ["Purchase Agreement"], "directories": ["Patent Brokers"]}',
100, 43, NOW(), NOW()),

('p10-l44-partnerships', 'p10-m8-monetization', 44, 'Strategic Partnerships and Collaborations', 
'[Joint development, cross-licensing, patent pools...]', 
'Structure IP-based strategic partnerships',
'{"templates": ["JDA Template"], "frameworks": ["Partnership Models"], "examples": ["Successful Partnerships"]}',
100, 44, NOW(), NOW()),

('p10-l45-revenue-models', 'p10-m8-monetization', 45, 'Patent Revenue Generation Models', 
'[Direct protection, licensing, assertion, funds...]', 
'Implement diverse patent revenue strategies',
'{"models": ["Revenue Models"], "calculators": ["Revenue Projector"], "case studies": ["Success Stories"]}',
150, 45, NOW(), NOW());

-- Module 9: Patent Litigation and Enforcement (Days 46-50)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m9-litigation',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Patent Litigation and Enforcement',
    'Protect your patents through enforcement strategies and litigation management',
    9,
    NOW(),
    NOW()
);

-- Module 9 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l46-infringement-analysis', 'p10-m9-litigation', 46, 'Pre-Litigation Strategy and Infringement Analysis', 
'[Detection methods, claim charts, evidence collection...]', 
'Detect infringement and prepare pre-litigation strategy',
'{"templates": ["Claim Chart"], "guides": ["Evidence Collection"], "tools": ["Infringement Detector"]}',
100, 46, NOW(), NOW()),

('p10-l47-litigation-process', 'p10-m9-litigation', 47, 'Patent Litigation Process', 
'[Court procedures, timeline, costs, evidence management...]', 
'Navigate patent litigation from filing to judgment',
'{"guides": ["Litigation Guide"], "timelines": ["Court Timeline"], "calculators": ["Litigation Cost"]}',
100, 47, NOW(), NOW()),

('p10-l48-defense-strategies', 'p10-m9-litigation', 48, 'Defense Against Patent Assertions', 
'[Invalidity, non-infringement, prior use, design around...]', 
'Defend against patent infringement claims',
'{"strategies": ["Defense Playbook"], "templates": ["Defense Response"], "examples": ["Successful Defenses"]}',
100, 48, NOW(), NOW()),

('p10-l49-settlement-negotiation', 'p10-m9-litigation', 49, 'Settlement and Negotiation', 
'[Settlement strategies, negotiation tactics, agreements...]', 
'Negotiate favorable settlements and agreements',
'{"templates": ["Settlement Agreement"], "strategies": ["Negotiation Tactics"], "calculators": ["Settlement Value"]}',
100, 49, NOW(), NOW()),

('p10-l50-enforcement-strategies', 'p10-m9-litigation', 50, 'Global Enforcement Strategies', 
'[Multi-jurisdiction enforcement, customs, online platforms...]', 
'Enforce patents globally across multiple channels',
'{"guides": ["Customs Enforcement"], "strategies": ["Platform Takedowns"], "networks": ["Enforcement Network"]}',
100, 50, NOW(), NOW());

-- Module 10: Industry-Specific Advanced Strategies (Days 51-55)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m10-industry-specific',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Industry-Specific Patent Strategies',
    'Master sector-specific patent approaches for maximum protection and value',
    10,
    NOW(),
    NOW()
);

-- Module 10 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l51-fintech-patents', 'p10-m10-industry-specific', 51, 'FinTech and Business Method Patents', 
'[Technical solutions, payment systems, blockchain applications...]', 
'Navigate FinTech patent challenges and opportunities',
'{"templates": ["FinTech Claims"], "examples": ["FinTech Patents"], "guidelines": ["RBI Compliance"]}',
150, 51, NOW(), NOW()),

('p10-l52-healthtech-medtech', 'p10-m10-industry-specific', 52, 'HealthTech and MedTech Patents', 
'[Medical devices, diagnostics, digital health, regulatory...]', 
'Protect healthcare innovations effectively',
'{"guidelines": ["Medical Device Patents"], "regulatory": ["FDA/CDSCO"], "examples": ["MedTech Patents"]}',
150, 52, NOW(), NOW()),

('p10-l53-cleantech-sustainability', 'p10-m10-industry-specific', 53, 'CleanTech and Sustainability Patents', 
'[Green technology, renewable energy, environmental solutions...]', 
'Leverage patents for sustainable innovation',
'{"programs": ["Green Channel"], "examples": ["CleanTech Patents"], "incentives": ["Government Support"]}',
100, 53, NOW(), NOW()),

('p10-l54-iot-connectivity', 'p10-m10-industry-specific', 54, 'IoT and Connectivity Patents', 
'[Connected devices, protocols, edge computing, 5G...]', 
'Protect IoT and connectivity innovations',
'{"standards": ["IoT Standards"], "templates": ["IoT Claims"], "strategies": ["SEP Strategy"]}',
100, 54, NOW(), NOW()),

('p10-l55-traditional-industries', 'p10-m10-industry-specific', 55, 'Traditional Industry Innovations', 
'[Manufacturing, chemicals, textiles, agriculture tech...]', 
'Patent strategies for traditional industries',
'{"templates": ["Process Claims"], "examples": ["Manufacturing Patents"], "opportunities": ["Industry 4.0"]}',
100, 55, NOW(), NOW());

-- Module 11: Government Support and Funding (Days 56-58)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m11-government-support',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Government Support and Patent Funding',
    'Access government schemes, grants, and support programs for patent development',
    11,
    NOW(),
    NOW()
);

-- Module 11 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l56-central-schemes', 'p10-m11-government-support', 56, 'Central Government Patent Support', 
'[Startup India, MSME, BIRAC, DST programs, application process...]', 
'Access central government patent support schemes',
'{"schemes": ["Scheme Directory"], "forms": ["Application Forms"], "calculators": ["Grant Calculator"]}',
100, 56, NOW(), NOW()),

('p10-l57-state-schemes', 'p10-m11-government-support', 57, 'State-wise Patent Support Programs', 
'[Karnataka, Tamil Nadu, Maharashtra, Gujarat programs...]', 
'Leverage state government patent incentives',
'{"directory": ["State Schemes"], "comparisons": ["State Benefits"], "applications": ["State Forms"]}',
100, 57, NOW(), NOW()),

('p10-l58-international-funding', 'p10-m11-government-support', 58, 'International Filing Support', 
'[DSIR support, WIPO programs, bilateral agreements...]', 
'Get funding for international patent filings',
'{"programs": ["International Support"], "eligibility": ["Criteria"], "applications": ["DSIR Application"]}',
100, 58, NOW(), NOW());

-- Module 12: Building IP-Driven Business (Days 59-60)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p10-m12-ip-business',
    (SELECT id FROM "Product" WHERE code = 'P10'),
    'Building IP-Driven Business',
    'Leverage patents for fundraising, partnerships, and successful exits',
    12,
    NOW(),
    NOW()
);

-- Module 12 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, content, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l59-fundraising-ip', 'p10-m12-ip-business', 59, 'IP Strategy for Fundraising', 
'[IP due diligence, investor pitch, valuation impact...]', 
'Position IP for successful fundraising',
'{"templates": ["IP Pitch Deck"], "checklists": ["DD Checklist"], "examples": ["Success Stories"]}',
150, 59, NOW(), NOW()),

('p10-l60-certification', 'p10-m12-ip-business', 60, 'Course Certification and Implementation', 
'[90-day action plan, certification exam, ongoing support...]', 
'Complete certification and implement IP strategy',
'{"plans": ["90-Day Plan"], "exam": ["Certification Test"], "resources": ["Ongoing Support"]}',
200, 60, NOW(), NOW());

-- Add comprehensive resources and templates
INSERT INTO "Resource" (id, title, type, url, description, category, "productCode", "createdAt", "updatedAt")
VALUES
-- Forms and Templates
('p10-r1', 'Complete Indian Patent Forms Package', 'template', '/templates/p10/patent-forms.zip', 'All 31 patent forms with instructions', 'forms', 'P10', NOW(), NOW()),
('p10-r2', 'Patent Drafting Templates', 'template', '/templates/p10/drafting-templates.zip', 'Industry-specific patent templates', 'templates', 'P10', NOW(), NOW()),
('p10-r3', 'Response Templates Library', 'template', '/templates/p10/response-templates.zip', 'FER and office action responses', 'templates', 'P10', NOW(), NOW()),
('p10-r4', 'Agreement Templates', 'template', '/templates/p10/agreements.zip', 'NDA, licensing, assignment agreements', 'legal', 'P10', NOW(), NOW()),

-- Calculators and Tools
('p10-r5', 'Patent Cost Calculator', 'tool', '/tools/p10/cost-calculator', 'Calculate filing and prosecution costs', 'calculators', 'P10', NOW(), NOW()),
('p10-r6', 'ROI Calculator', 'tool', '/tools/p10/roi-calculator', 'Patent investment ROI analysis', 'calculators', 'P10', NOW(), NOW()),
('p10-r7', 'Timeline Planner', 'tool', '/tools/p10/timeline-planner', 'Patent timeline and deadline tracker', 'planning', 'P10', NOW(), NOW()),
('p10-r8', 'Country Selection Matrix', 'tool', '/tools/p10/country-matrix', 'Choose optimal filing countries', 'strategy', 'P10', NOW(), NOW()),

-- Guides and Documentation
('p10-r9', 'Beginner''s Patent Guide', 'guide', '/guides/p10/beginners-guide.pdf', 'Complete guide for first-time filers', 'education', 'P10', NOW(), NOW()),
('p10-r10', 'CRI Guidelines Simplified', 'guide', '/guides/p10/cri-guidelines.pdf', 'Software patent guidelines explained', 'guidelines', 'P10', NOW(), NOW()),
('p10-r11', 'PCT Applicant Guide', 'guide', '/guides/p10/pct-guide.pdf', 'Complete PCT filing strategy', 'international', 'P10', NOW(), NOW()),
('p10-r12', 'Startup Benefits Guide', 'guide', '/guides/p10/startup-benefits.pdf', 'Access 80% fee reduction and support', 'benefits', 'P10', NOW(), NOW()),

-- Video Tutorials
('p10-r13', 'Form Filling Video Series', 'video', '/videos/p10/form-filling', '10-part form filling tutorial', 'tutorials', 'P10', NOW(), NOW()),
('p10-r14', 'Patent Search Masterclass', 'video', '/videos/p10/search-masterclass', 'Advanced search techniques', 'tutorials', 'P10', NOW(), NOW()),
('p10-r15', 'Claim Drafting Workshop', 'video', '/videos/p10/claims-workshop', 'Write strong patent claims', 'tutorials', 'P10', NOW(), NOW()),

-- Directories and Networks
('p10-r16', 'Patent Agent Directory', 'directory', '/directories/p10/agents', 'Verified patent professionals', 'network', 'P10', NOW(), NOW()),
('p10-r17', 'Government Schemes Directory', 'directory', '/directories/p10/schemes', 'All patent support schemes', 'funding', 'P10', NOW(), NOW()),
('p10-r18', 'Translation Services', 'directory', '/directories/p10/translators', 'Certified patent translators', 'services', 'P10', NOW(), NOW());

-- Update product metadata
UPDATE "Product"
SET 
    "updatedAt" = NOW(),
    metadata = jsonb_build_object(
        'totalLessons', 60,
        'totalModules', 12,
        'certificationAvailable', true,
        'supportLevel', 'comprehensive',
        'updateFrequency', 'quarterly',
        'accessDuration', '1 year',
        'languages', ARRAY['English', 'Hindi'],
        'prerequisites', 'None - suitable for beginners',
        'targetAudience', 'Founders, Innovators, Researchers, Tech Teams',
        'outcomes', ARRAY[
            'File patents independently',
            'Build IP portfolio worth ₹50Cr+',
            'Access ₹15L+ government funding',
            'Execute international filing strategy',
            'Generate licensing revenue'
        ]
    )
WHERE code = 'P10';

-- Add portfolio activity types for patent course
INSERT INTO "PortfolioActivityType" (id, name, category, "sectionName", description, "promptTemplate", "createdAt", "updatedAt")
VALUES
('patent_disclosure', 'Patent Invention Disclosure', 'legal', 'legal-compliance', 'Document your invention for patent filing', 'Describe your invention including problem, solution, and novelty', NOW(), NOW()),
('patent_claims', 'Patent Claims Draft', 'legal', 'legal-compliance', 'Draft patent claims for your innovation', 'Write independent and dependent claims for your invention', NOW(), NOW()),
('patent_search', 'Prior Art Search Report', 'legal', 'legal-compliance', 'Document prior art search findings', 'List relevant patents and explain how your invention differs', NOW(), NOW()),
('patent_strategy', 'IP Protection Strategy', 'legal', 'legal-compliance', 'Define your intellectual property strategy', 'Outline your approach to protecting innovations', NOW(), NOW()),
('patent_portfolio', 'Patent Portfolio Plan', 'legal', 'legal-compliance', 'Plan your patent portfolio development', 'Map out planned patent filings over next 2 years', NOW(), NOW())
ON CONFLICT (id) DO UPDATE
SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    "updatedAt" = NOW();

-- Add XP events for patent milestones
INSERT INTO "XPEventType" (id, name, description, "baseXP", category, "createdAt", "updatedAt")
VALUES
('patent_search_complete', 'Completed Patent Search', 'Successfully completed prior art search', 100, 'achievement', NOW(), NOW()),
('patent_draft_complete', 'Drafted First Patent', 'Completed first patent draft', 200, 'achievement', NOW(), NOW()),
('patent_filed', 'Filed Patent Application', 'Successfully filed patent application', 500, 'achievement', NOW(), NOW()),
('patent_granted', 'Patent Granted', 'Received patent grant', 1000, 'achievement', NOW(), NOW()),
('patent_international', 'International Filing', 'Filed PCT or foreign patent', 750, 'achievement', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_lessons_p10_module ON "Lesson" ("moduleId") WHERE "moduleId" IN (
    SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P10')
);

CREATE INDEX IF NOT EXISTS idx_modules_p10_product ON "Module" ("productId") WHERE "productId" = (
    SELECT id FROM "Product" WHERE code = 'P10'
);

-- Verify the migration
DO $$
DECLARE
    v_product_id UUID;
    v_module_count INTEGER;
    v_lesson_count INTEGER;
    v_resource_count INTEGER;
BEGIN
    -- Get product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P10';
    
    -- Count modules
    SELECT COUNT(*) INTO v_module_count FROM "Module" WHERE "productId" = v_product_id;
    
    -- Count lessons
    SELECT COUNT(*) INTO v_lesson_count FROM "Lesson" 
    WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    
    -- Count resources
    SELECT COUNT(*) INTO v_resource_count FROM "Resource" WHERE "productCode" = 'P10';
    
    -- Output verification
    RAISE NOTICE 'P10 Patent Mastery Enhanced Migration Complete:';
    RAISE NOTICE '  Modules: %', v_module_count;
    RAISE NOTICE '  Lessons: %', v_lesson_count;
    RAISE NOTICE '  Resources: %', v_resource_count;
    
    IF v_module_count = 12 AND v_lesson_count = 60 THEN
        RAISE NOTICE '✅ Migration successful - All content migrated';
    ELSE
        RAISE WARNING '⚠️ Migration incomplete - Expected 12 modules and 60 lessons';
    END IF;
END $$;

-- Grant necessary permissions
GRANT SELECT ON "Product", "Module", "Lesson", "Resource", "PortfolioActivityType", "XPEventType" TO authenticated;
GRANT ALL ON "Product", "Module", "Lesson", "Resource" TO service_role;

-- Final success message
SELECT 'P10 Patent Mastery Enhanced - Migration completed successfully. 60 comprehensive lessons from beginner to expert level.' AS status;