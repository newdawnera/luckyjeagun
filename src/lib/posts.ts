import type { Accent } from "@/lib/projects";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMins: number;
  tags: string[];
  accent: Accent;
  featured?: boolean;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    "slug": "building-an-ai-meeting-assistant",
    "title": "Building an AI Meeting Assistant That Actually Follows Through",
    "excerpt": "Most meeting tools stop at a transcript. I wanted one that wrote role-aware summaries, tracked action items, and nudged people by email until things got done. Here is how I built OneVoice.",
    "date": "2026-05-20",
    "readMins": 9,
    "tags": [
      "AI",
      "Full-Stack",
      "FastAPI"
    ],
    "accent": "violet",
    "featured": true,
    "body": [
      {
        "type": "p",
        "text": "Every team I have worked with runs into the same quiet failure. A meeting happens, sensible decisions get made, and within a day half of them have evaporated. The recording, if one exists, sits in a folder nobody reopens. I built OneVoice, the AI Meeting Wizard, because I wanted the opposite of that: an assistant that does not simply capture what was said, but makes sure something actually happens once everyone logs off."
      },
      {
        "type": "h2",
        "text": "Transcription was never the hard part"
      },
      {
        "type": "p",
        "text": "It is tempting to think the value of a meeting tool lives in the transcript. Speech-to-text is a commodity now; you can get a serviceable transcript from any number of APIs. The problem is that a wall of text is not a record anyone uses. Nobody scrolls through ninety minutes of dialogue to find the one sentence where they agreed to send a contract. The hard part, and the part worth building, is turning that raw stream into something each person can act on in under a minute."
      },
      {
        "type": "p",
        "text": "So I set the product a simple test: if someone misses the meeting entirely, can OneVoice tell them exactly what they need to know and do, without reading a single line of transcript? Almost every design decision came from trying to answer yes."
      },
      {
        "type": "h2",
        "text": "How the pieces fit together"
      },
      {
        "type": "p",
        "text": "OneVoice is a fairly conventional full-stack application with an AI pipeline bolted into the middle. I kept the moving parts deliberately boring so the interesting work could go into the prompts and the follow-up logic."
      },
      {
        "type": "ul",
        "items": [
          "A JavaScript front end where users upload or stream a discussion and review the generated outputs.",
          "A FastAPI back end in Python that orchestrates transcription, summarization, and the reminder engine.",
          "Firebase for authentication and as the data store for meetings, summaries, and action-item state.",
          "Render for deployment, which kept the infrastructure story simple while I iterated."
        ]
      },
      {
        "type": "p",
        "text": "FastAPI earned its place here. The AI work is naturally asynchronous and I/O-bound, waiting on transcription, then on a language model, then on email delivery, and FastAPI's async model let me keep those stages responsive without reaching for heavier infrastructure."
      },
      {
        "type": "h2",
        "text": "Summaries that know who is reading"
      },
      {
        "type": "p",
        "text": "The feature I am proudest of is role-based summaries. A single neutral summary is a compromise that serves nobody especially well. The engineer wants the technical decisions and the tickets that fell out of them; the project lead wants risks, owners, and dates; the client wants outcomes and next steps in plain language. So instead of generating one summary, OneVoice produces several views of the same meeting, each shaped for a role."
      },
      {
        "type": "p",
        "text": "In practice that meant designing prompts that take the transcript plus a role and return a summary written for that perspective, the same facts with different emphasis and vocabulary. The interesting early failure was the model inventing detail to fill a role it had little material for. I learned to constrain it hard: summarize only what was actually said, and state plainly when the meeting did not cover something rather than papering over the gap."
      },
      {
        "type": "h2",
        "text": "From discussion to action items"
      },
      {
        "type": "p",
        "text": "A summary tells you what happened. Action items are where a meeting tool either earns its keep or becomes decoration. OneVoice extracts commitments, who agreed to do what, and stores each as a tracked item with an owner and a status, not just a bullet in a document."
      },
      {
        "type": "p",
        "text": "Getting this reliable was less about clever modeling and more about structure. I asked the model to return action items in a strict, predictable shape, validated that shape on the back end, and rejected anything that did not fit rather than trusting free-form output. Treating the model like an unreliable junior teammate, useful and fast and occasionally confidently wrong, shaped almost every decision that followed."
      },
      {
        "type": "h2",
        "text": "Closing the loop with email"
      },
      {
        "type": "p",
        "text": "This is the part most tools skip, and it is the reason I built the thing. Capturing an action item changes nothing if it sits in an app nobody opens. OneVoice sends both automated and manual email reminders, and crucially, it embeds the current status of each item directly in the message so people can see where things stand at a glance, without clicking through to anything."
      },
      {
        "type": "p",
        "text": "The constraint I cared about was respect for attention. Reminders that fire too often get filtered out and trained into noise. So the cadence is deliberate, the manual nudge exists for when a human knows the moment is right, and every message is built to be useful on its own rather than to demand a click."
      },
      {
        "type": "h2",
        "text": "What I would do differently"
      },
      {
        "type": "p",
        "text": "If I rebuilt OneVoice today, I would invest earlier in evaluation. For too long I judged summary quality by reading outputs and trusting my gut, which does not scale and quietly hides regressions. A small, honest test set, real transcripts paired with a human-checked notion of what a good summary contains, would have let me change prompts with confidence instead of crossed fingers."
      },
      {
        "type": "p",
        "text": "I would also push more of the trust-building into the interface. People are reasonably skeptical of AI-generated notes, and the cure is transparency: let them trace any claim in a summary back to the moment in the transcript where it was said. Make the model show its work, and adoption stops being a leap of faith."
      },
      {
        "type": "quote",
        "text": "I stopped treating the language model as a brain and started treating it as a fast, eager teammate who needs structure, limits, and a way to be checked. Everything got more reliable after that."
      },
      {
        "type": "p",
        "text": "OneVoice is still evolving, but the core lesson has held: the value was never in transcribing the meeting. It was in everything that happens after it ends."
      }
    ]
  },
  {
    "slug": "a-risk-dashboard-that-explains-itself",
    "title": "A Risk Dashboard That Explains Itself",
    "excerpt": "Charts answer 'what'. Executives ask 'so what'. For my retail-banking risk dashboard I embedded a real-time AI analyst that reads the live metrics on screen and writes the insight a human otherwise would.",
    "date": "2026-04-30",
    "readMins": 8,
    "tags": [
      "Data",
      "React",
      "AI"
    ],
    "accent": "cyan",
    "featured": true,
    "body": [
      {
        "type": "p",
        "text": "A good dashboard answers the question 'what is happening'. The trouble is that the people looking at it are usually asking a harder one: 'so what, and what should I do about it'. I built my retail-banking risk dashboard to close that gap, to take a clean view of credit risk and revenue and add the layer most dashboards leave to a human analyst: the interpretation."
      },
      {
        "type": "h2",
        "text": "Where dashboards usually stop"
      },
      {
        "type": "p",
        "text": "Most analytics work ends at the chart. You wrangle the data, choose a sensible visualization, and ship a screen full of bars and lines. It looks rigorous, and for someone fluent in the numbers it genuinely is useful. But hand the same screen to a busy executive and you have quietly outsourced the hardest step, turning the pattern into a decision, to the person with the least time to do it."
      },
      {
        "type": "p",
        "text": "I wanted the dashboard to carry more of that weight. Not to replace judgment, but to offer the first draft of an insight the way a sharp analyst sitting beside you might: default risk is creeping up in this segment while revenue holds, so margins are thinning exactly where you can least afford it."
      },
      {
        "type": "h2",
        "text": "The stack"
      },
      {
        "type": "p",
        "text": "The application itself is deliberately lightweight and fast."
      },
      {
        "type": "ul",
        "items": [
          "React with Vite for a quick, responsive front end.",
          "Tailwind CSS for a dense, bank-grade interface that stays legible under a lot of information.",
          "Recharts for the visualizations, which kept charting declarative and easy to wire to live state.",
          "Groq running Llama 3.3 as the reasoning layer behind the AI analyst."
        ]
      },
      {
        "type": "p",
        "text": "Vite mattered more than it sounds. A risk dashboard lives or dies on how quickly you can read it, and a snappy build with instant interactions is part of that feeling of trust. Sluggishness reads as unreliability even when the numbers are perfect."
      },
      {
        "type": "h2",
        "text": "An analyst that reads the screen"
      },
      {
        "type": "p",
        "text": "The core idea is simple to describe and was fiddly to get right: the AI analyst does not run on stale, pre-baked data. It reads the same live metrics the charts are rendering and generates its commentary from those exact numbers. When the data on screen changes, so does the interpretation."
      },
      {
        "type": "p",
        "text": "To make that work I treated the chart state as the single source of truth and fed a structured snapshot of it to the model, the metrics, the segments, the direction of travel, then asked for an executive-level reading. Keeping the model anchored to the real on-screen figures, rather than letting it free-associate, was the difference between a feature people trusted and a party trick."
      },
      {
        "type": "h2",
        "text": "Prompting for executives, not for me"
      },
      {
        "type": "p",
        "text": "Writing the prompt was an exercise in restraint. My instinct as a builder is to ask for completeness; an executive wants the opposite. I tuned the analyst to lead with the implication, keep it to a few sentences, name the segment and the direction clearly, and avoid hedging itself into uselessness. A paragraph that says risk may or may not be rising depending on various factors is worse than no paragraph at all."
      },
      {
        "type": "p",
        "text": "I also made it say when the data did not support a strong conclusion. An analyst who only ever sounds confident is one you stop believing. Letting the model occasionally say nothing here looks alarming this period made the times it did raise a flag land much harder."
      },
      {
        "type": "h2",
        "text": "Trust is a design problem"
      },
      {
        "type": "p",
        "text": "The recurring theme across this project was that the technical work was the smaller half. The bigger challenge was making people comfortable acting on a sentence a model wrote. That is a design problem as much as an engineering one: ground every statement in visible numbers, keep the tone calm and specific, and never let the insight drift away from what the user can see for themselves."
      },
      {
        "type": "quote",
        "text": "The chart shows you the number. The analyst tells you why it matters. Most dashboards ship the first and quietly hope someone is around to do the second."
      },
      {
        "type": "p",
        "text": "Building this changed how I think about data work in general. The visualization is necessary, but it is not the deliverable. The deliverable is a decision made well, and anything that shortens the distance between a chart and that decision, including a careful and honest AI analyst, is worth building."
      }
    ]
  },
  {
    "slug": "developer-to-data-analyst",
    "title": "From Building Software to Analyzing Data: What Carried Over",
    "excerpt": "I recently moved from writing software to a data-analyst role. Far more transferred than I expected, and the gaps that remained were not the technical ones I had braced for.",
    "date": "2026-06-02",
    "readMins": 7,
    "tags": [
      "Career",
      "Data",
      "Reflection"
    ],
    "accent": "pink",
    "featured": false,
    "body": [
      {
        "type": "p",
        "text": "I recently made a move I had been circling for a while: from building software to a data-analyst role. I expected a hard reset, a new stack, new tools, a humbling stretch of feeling like a beginner again. Some of that was real. But far more of my old work carried over than I had braced for, and the parts that did not were rarely the technical ones."
      },
      {
        "type": "h2",
        "text": "What transferred more than I expected"
      },
      {
        "type": "p",
        "text": "The habits of engineering turned out to be most of the job."
      },
      {
        "type": "ul",
        "items": [
          "Thinking in systems. Tracing why a number is wrong is not so different from tracing why a function returns the wrong value; the instinct to follow data through a pipeline and distrust every hop is the same.",
          "Version control and reproducibility. Treating analysis like code, committed, reviewable, re-runnable, is still rare enough on the data side that it felt like a small superpower.",
          "SQL. I had written plenty as a developer; as an analyst it became my native language rather than an occasional errand.",
          "Debugging as a temperament. Data cleaning is debugging in a different coat: the same patient, suspicious, one-hypothesis-at-a-time work."
        ]
      },
      {
        "type": "p",
        "text": "More than any single skill, what transferred was a posture: assume the first answer is wrong, make the smallest change that would prove it, and keep a tight loop between question and evidence."
      },
      {
        "type": "h2",
        "text": "What was genuinely new"
      },
      {
        "type": "p",
        "text": "The gaps were not where I expected. I had braced for the tooling and found it familiar. What actually stretched me was thinking statistically and communicating uncertainty."
      },
      {
        "type": "p",
        "text": "As a developer, code is mostly deterministic; it works or it does not, and you can usually prove which. Data offers no such comfort. A result can be real or it can be noise, and much of the craft is telling the difference honestly: sample sizes, confidence, the line between a pattern and a coincidence. Learning to sit with 'this is probably true' instead of demanding 'this is true' was the real adjustment."
      },
      {
        "type": "p",
        "text": "The other new muscle was narrative. A passing test speaks for itself; an analysis does not. The same finding can change a decision or be ignored entirely depending on how it is framed, what it is compared against, and whether the person hearing it trusts where it came from. I had underrated how much of an analyst's value lives in that last mile."
      },
      {
        "type": "h2",
        "text": "How each side made the other better"
      },
      {
        "type": "p",
        "text": "The real surprise was how much the two halves reinforced each other. Building products first made me a more practical analyst: I think about how an insight will actually be used, shipped, and maintained, not just whether it is correct inside a notebook. And analyzing data has made me a more careful builder, more skeptical of my own metrics, more interested in whether a feature truly moved the thing it was meant to move."
      },
      {
        "type": "p",
        "text": "It also closed a loop I had felt for years. So many of the products I built generated data that someone else interpreted. Sitting on the other side of that handoff, I finally see how much context gets lost in it, and how much better both roles get when one person can hold both ends."
      },
      {
        "type": "h2",
        "text": "If you are thinking about the same move"
      },
      {
        "type": "p",
        "text": "My honest advice is to stop drawing a hard line between the two. The fear is that you are starting over; the reality is that you are repurposing most of what you already know and adding a layer of statistical honesty and storytelling on top. Lean on your engineering instincts, reproducibility, systems thinking, debugging, because plenty of data work is crying out for exactly that discipline."
      },
      {
        "type": "quote",
        "text": "I thought I was switching careers. It felt more like discovering the other half of one I had already been doing."
      },
      {
        "type": "p",
        "text": "I am still early on this path, and there is a great deal left to learn. But the thing I worried about most, that none of my old work would count, turned out to be the opposite of true."
      }
    ]
  },
  {
    "slug": "approaching-a-new-dataset",
    "title": "How I Approach a New Dataset: From Raw File to a Decision",
    "excerpt": "A messy CSV lands in your inbox and someone wants 'the numbers' by Friday. Here is the repeatable workflow I use to get from a raw file to a conclusion I'd actually stake a decision on.",
    "date": "2026-06-08",
    "readMins": 11,
    "tags": [
      "Data",
      "Analytics",
      "Methodology"
    ],
    "accent": "blue",
    "featured": false,
    "body": [
      {
        "type": "p",
        "text": "It usually starts the same way. A spreadsheet lands in my inbox, the column names are a mix of cryptic abbreviations and outright lies, and the message attached says something like 'can you pull the numbers on this by Friday?'. No schema, no definitions, and a question vague enough to mean five different things. Over time I have stopped treating each of these as a one-off scramble and started running the same workflow every time. Here is what that looks like, from raw file to a conclusion I would happily put my name on."
      },
      {
        "type": "h2",
        "text": "Start with the question, not the data"
      },
      {
        "type": "p",
        "text": "The strongest temptation, and one I still have to resist, is to open the file and start poking. It feels productive. It almost never is. Before I load a single row I try to pin down what decision this analysis is meant to inform, because the same dataset answers 'are we losing customers?' and 'which customers are we losing?' very differently, and only one of them is usually what the person actually needs."
      },
      {
        "type": "p",
        "text": "So I ask, even if I have to ask on their behalf: what would change depending on the answer? If nothing would change, the analysis is trivia, and it is worth saying so kindly before spending two days on it. Framing the question tightly up front saves more time than any tool or shortcut I know."
      },
      {
        "type": "h2",
        "text": "Profile before you analyze"
      },
      {
        "type": "p",
        "text": "Once I know what I am looking for, the first contact with the data is not analysis, it is reconnaissance. I want to understand the shape and the health of the dataset before I trust a single number that comes out of it."
      },
      {
        "type": "ul",
        "items": [
          "The shape: how many rows and columns, and is that even close to what I expected?",
          "Types: is a date stored as a date or as text, is a number actually numeric or secretly a string with stray commas?",
          "Missing values: which columns have nulls, how many, and is the missingness random or suspiciously patterned?",
          "Ranges and outliers: minimums, maximums, and anything physically impossible like a negative age or a future signup date.",
          "Duplicates and cardinality: are the 'unique' identifiers actually unique, and do categorical columns have the handful of values I expect or two hundred messy variants?"
        ]
      },
      {
        "type": "p",
        "text": "None of this is glamorous and all of it is load-bearing. Most wrong conclusions I have seen, including a few of my own, trace back to a number that was quietly broken at this stage and never questioned."
      },
      {
        "type": "h2",
        "text": "Cleaning is where the truth hides"
      },
      {
        "type": "p",
        "text": "Data cleaning has a reputation as the boring part, the chores you do before the real work. I have come to believe the opposite: cleaning is the real work, because the decisions you make here silently shape every result that follows. How you handle a missing value, whether you drop a row or impute it, how you collapse 'NY', 'New York', and 'new york ' into one category, all of it is analysis wearing overalls."
      },
      {
        "type": "p",
        "text": "My rule is to make every cleaning decision explicit and reversible. I never edit the source file. I write the transformations as code so the path from raw to clean is documented, reviewable, and re-runnable when the data refreshes next month. If I cannot explain why a row disappeared, that is a bug, not a tidy-up."
      },
      {
        "type": "h2",
        "text": "Analysis in small, testable steps"
      },
      {
        "type": "p",
        "text": "With clean data, the analysis itself is often less dramatic than people expect. I work in small steps and check each one before building on it, the same way I would write code. Compute a number, then sanity-check it against something I already believe to be true. If the totals do not reconcile with a figure someone trusts, I stop and find out why before going a step further."
      },
      {
        "type": "p",
        "text": "I also try to answer the question the simplest way that could possibly work before reaching for anything fancy. A clear group-by and a couple of well-chosen comparisons settle most questions. Sophisticated methods are worth it when the simple version genuinely is not enough, not as a default flex."
      },
      {
        "type": "h2",
        "text": "Validate like you are trying to prove yourself wrong"
      },
      {
        "type": "p",
        "text": "This is the habit I would most want to pass on. Once I have a result I like, I deliberately try to break it. A finding that survives a real attempt to disprove it is worth far more than one I merely hoped was true."
      },
      {
        "type": "ul",
        "items": [
          "Do the parts sum to the whole, and do my segment numbers reconcile with the overall total?",
          "Would the conclusion survive a slightly different cut of the data, or does it hinge on one fragile choice?",
          "Is the effect large enough and the sample big enough to be real, or am I reading meaning into noise?",
          "Could a simpler explanation, a data artifact, a seasonal pattern, a reporting lag, account for what I am seeing?"
        ]
      },
      {
        "type": "p",
        "text": "If a result only holds under one specific framing, that is not an insight, it is a coincidence I got attached to."
      },
      {
        "type": "h2",
        "text": "The deliverable is a decision, not a chart"
      },
      {
        "type": "p",
        "text": "Finally, I try to remember what the work is actually for. A folder of charts is not a deliverable; a clearer decision is. So I lead with the answer to the original question in plain language, show the one or two visuals that genuinely support it, and stay honest about what the data cannot tell us. The caveats are not hedging, they are part of being trustworthy."
      },
      {
        "type": "p",
        "text": "I have learned that how a finding is framed matters almost as much as whether it is correct. The same true result can be acted on or ignored depending on whether the person hearing it understands what it means for the choice in front of them."
      },
      {
        "type": "quote",
        "text": "The goal was never the analysis. It was a decision made with a little more clarity and a little less guesswork than before."
      },
      {
        "type": "p",
        "text": "None of this requires exotic tools. It is mostly discipline: frame the question, distrust the data until it earns your trust, make every step explicit, and try hard to prove yourself wrong before you let anyone else rely on the answer. Do that consistently and the messy Friday CSV stops being a scramble and starts being a process."
      }
    ]
  }
];


export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const featuredPosts = posts.filter((p) => p.featured);

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
