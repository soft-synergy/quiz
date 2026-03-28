export type QuestionType =
  | 'single'
  | 'multi'
  | 'input-number'
  | 'input-text'
  | 'input-date'
  | 'interstitial'
  | 'target-zones'

export interface InterstitialContent {
  images: string[]
  headline: string
  body: string
  note?: string
  circular?: boolean
  fullWidthTop?: boolean
}

export interface QuizOption {
  id: string
  label: string
  image?: string
  emoji?: string
  zoneTop?: string
  zoneLeft?: string
}

export interface QuizStep {
  step: number
  question: string
  subtitle?: string
  type: QuestionType
  options?: QuizOption[]
  unit?: string
  units?: string[]
  placeholder?: string
  hint?: string
  hintTitle?: string
  showBMICard?: boolean
  showGoalCard?: boolean
  skippable?: boolean
  requiresConsent?: boolean
  buttonLabel?: string
  validation?: { min: number; max: number }
  interstitial?: InterstitialContent
}

// ─── ANSWER INDICES (30-step order) ──────────────────────────────
// step 3  → primary goals (multi)
// step 5  → physical build
// step 6  → dream body
// step 7  → target zones
// step 8  → best shape ago
// step 10 → activity level
// step 11 → flexibility (NEW)
// step 12 → exercise frequency
// step 13 → stairs feeling
// step 14 → walk frequency
// step 15 → struggles (multi)
// step 16 → workload
// step 17 → typical day
// step 18 → sleep duration
// step 19 → water intake
// step 20 → bad habits (multi)
// step 21 → life events (multi)
// step 23 → height (cm canonical)  ← HEIGHT_STEP
// step 24 → weight (lbs canonical) ← WEIGHT_STEP
// step 25 → goal weight (lbs canonical)
// step 26 → age (years)
// step 27 → name (text)

export const QUIZ_STEPS: QuizStep[] = [
  // ─── STEP 1: Community interstitial ──────────────────────────────
  {
    step: 1,
    question: 'Over 21 million people have already chosen a simpler way to move',
    type: 'interstitial',
    interstitial: {
      images: ['/images/Quiz - 2026-03-18T165703.172.png'],
      headline: 'Over 21 million people have already chosen a simpler way to move',
      body: '',
    },
  },

  // ─── STEP 2: Welcome interstitial ────────────────────────────────
  {
    step: 2,
    question: 'Welcome to TAICHI COACH',
    type: 'interstitial',
    interstitial: {
      images: ['/images/Quiz - 2026-03-18T165714.462.png'],
      headline: 'Welcome to TAICHI COACH',
      body: "You're here to start a simple indoor walking routine you can do without leaving home. Let's learn more about your goals and your needs, so we can create the right plan for you.",
    },
  },

  // ─── STEP 3: Primary goal (multi) ────────────────────────────────
  {
    step: 3,
    question: 'What are your main goals?',
    subtitle: 'You can choose more than one',
    type: 'multi',
    options: [
      { id: 'lose-weight',   label: 'Lose weight',                     image: '/images/reason1.png' },
      { id: 'heart-health',  label: 'Improve heart health',            image: '/images/reason2.png' },
      { id: 'firm-toned',    label: 'Get more toned',                  image: '/images/reason3.png' },
      { id: 'lower-bio-age', label: 'Feel younger and more energized', image: '/images/reason4.png' },
    ],
  },

  // ─── STEP 4: First step interstitial ─────────────────────────────
  {
    step: 4,
    question: "Great start — you're on your way.",
    type: 'interstitial',
    interstitial: {
      images: ['/images/change.png'],
      headline: "Great start — you're on your way.",
      body: "With TAICHI COACH, you'll get a guided, personalized approach that adapts to you, so you always know what to do next, without overthinking it.",
      note: 'Results will vary based on your consistency and individual factors.',
    },
  },

  // ─── STEP 5: Physical build ───────────────────────────────────────
  {
    step: 5,
    question: 'How would you describe your body now?',
    type: 'single',
    options: [
      { id: 'mid-sized',  label: 'In the middle',            image: '/images/build-1.png' },
      { id: 'heavier',    label: 'A bit heavier than I want', image: '/images/build-2.png' },
      { id: 'overweight', label: 'Much heavier than I want',  image: '/images/build-3.png' },
    ],
  },

  // ─── STEP 6: Dream body ───────────────────────────────────────────
  {
    step: 6,
    question: 'How would you like to feel in your body?',
    type: 'single',
    options: [
      { id: 'thin',  label: 'Lighter and more comfortable',       image: '/images/dream-1.png' },
      { id: 'toned', label: 'More toned and a bit stronger',      image: '/images/dream-2.png' },
      { id: 'curvy', label: 'Balanced and confident in my shape', image: '/images/dream-3.png' },
    ],
  },

  // ─── STEP 7: Target zones ─────────────────────────────────────────
  {
    step: 7,
    question: 'Which parts of your body would you like to improve?',
    subtitle: 'You can choose more than one',
    type: 'target-zones',
    options: [
      { id: 'arms',  label: 'Arms',          zoneTop: '28%', zoneLeft: '33%' },
      { id: 'abs',   label: 'Abs',           zoneTop: '35%', zoneLeft: '45%' },
      { id: 'booty', label: 'Hips & glutes', zoneTop: '46%', zoneLeft: '35%' },
      { id: 'legs',  label: 'Legs',          zoneTop: '60%', zoneLeft: '40%' },
    ],
  },

  // ─── STEP 8: Best shape ago ───────────────────────────────────────
  {
    step: 8,
    question: 'When did you last feel in your best shape?',
    type: 'single',
    options: [
      { id: 'less-1yr', label: 'Less than 1 year ago',      emoji: '🤔' },
      { id: '1-2yr',    label: '1–2 years ago',              emoji: '😄' },
      { id: 'over-3yr', label: 'More than 3 years ago',     emoji: '😢' },
      { id: 'never',    label: 'I have never felt that way', emoji: '✗'  },
    ],
  },

  // ─── STEP 9: You're doing great interstitial ──────────────────────
  {
    step: 9,
    question: "You're doing great!",
    type: 'interstitial',
    interstitial: {
      images: ['/images/amazing.png'],
      headline: "You're doing great!",
      body: 'Many people worry that they are not good enough. We understand this, and we will keep it in mind when we create your plan, so you can feel more confident as you go.',
    },
  },

  // ─── STEP 10: Activity level ──────────────────────────────────────
  {
    step: 10,
    question: 'How active are you right now?',
    type: 'single',
    options: [
      { id: 'advanced',     label: 'Very active',     emoji: '😎' },
      { id: 'intermediate', label: 'Somewhat active', emoji: '🤔' },
      { id: 'beginner',     label: 'Just starting',   emoji: '🙋' },
    ],
  },

  // ─── STEP 11: Flexibility (NEW) ───────────────────────────────────
  {
    step: 11,
    question: 'How flexible is your body?',
    type: 'single',
    options: [
      { id: 'very-flexible',   label: 'Quite flexible',    emoji: '🤸' },
      { id: 'some-flexible',   label: 'A little flexible', emoji: '🙂' },
      { id: 'not-flexible',    label: 'Not very flexible', emoji: '😬' },
      { id: 'unsure-flexible', label: "I'm not sure",      emoji: '🤔' },
    ],
  },

  // ─── STEP 12: Exercise frequency ─────────────────────────────────
  {
    step: 12,
    question: 'How often do you exercise?',
    type: 'single',
    options: [
      { id: 'daily',   label: 'Almost every day',      image: '/images/exercise-1.png' },
      { id: 'weekly',  label: 'A few times per week',  image: '/images/exercise-2.png' },
      { id: 'monthly', label: 'A few times per month', image: '/images/exercise-3.png' },
    ],
  },

  // ─── STEP 13: Stairs feeling ──────────────────────────────────────
  {
    step: 13,
    question: 'How do you feel after walking up stairs?',
    type: 'single',
    options: [
      { id: 'breathless', label: 'I feel out of breath',              emoji: '🤦‍♀️' },
      { id: 'winded',     label: 'I feel a bit tired, but okay',      emoji: '🥲' },
      { id: 'fine',       label: 'I feel fine after one flight',       emoji: '👌' },
      { id: 'easy',       label: 'I can easily climb several flights', emoji: '💪' },
    ],
  },

  // ─── STEP 14: Walk frequency ──────────────────────────────────────
  {
    step: 14,
    question: 'How regularly do you go walking?',
    type: 'single',
    options: [
      { id: 'daily',   label: 'Nearly every day',             emoji: '💪' },
      { id: 'weekly',  label: 'A few times during the week',  emoji: '👍' },
      { id: 'monthly', label: 'Rarely (around once a month)', emoji: '👌' },
    ],
  },

  // ─── STEP 15: Struggles (multi, images) ──────────────────────────
  {
    step: 15,
    question: 'Do you have any pain or discomfort in your body?',
    subtitle: 'You can choose more than one',
    type: 'multi',
    options: [
      { id: 'back',   label: 'Back pain',   image: '/images/quiz-96.png' },
      { id: 'knees',  label: 'Knee pain',   image: '/images/quiz-95.png' },
      { id: 'elbows', label: 'Elbow pain',  image: '/images/quiz-94.png' },
      { id: 'none',   label: 'No problems', image: '/images/quiz-93.png' },
    ],
  },

  // ─── STEP 16: Workload ────────────────────────────────────────────
  {
    step: 16,
    question: 'What does your daily schedule look like?',
    type: 'single',
    options: [
      { id: '9to5',     label: 'I have a fixed daytime schedule', emoji: '☀️' },
      { id: 'nights',   label: 'I work night shifts',              emoji: '🌙' },
      { id: 'flexible', label: 'My hours are flexible',            emoji: '🙂' },
      { id: 'retired',  label: 'I am retired',                     emoji: '🌴' },
    ],
  },

  // ─── STEP 17: Typical day ─────────────────────────────────────────
  {
    step: 17,
    question: 'What does your day usually look like?',
    type: 'single',
    options: [
      { id: 'on-feet', label: 'I move a lot during the day',    emoji: '🏃‍♀️' },
      { id: 'active',  label: 'I move sometimes during breaks', emoji: '✌️' },
      { id: 'sitting', label: 'I sit most of the day',          emoji: '🧑‍💻' },
    ],
  },

  // ─── STEP 18: Sleep ───────────────────────────────────────────────
  {
    step: 18,
    question: 'How long do you sleep at night?',
    type: 'single',
    options: [
      { id: 'less-5', label: 'Under 5 hours', emoji: '😩' },
      { id: '5-6',    label: '5–6 hours',     emoji: '😴' },
      { id: '7-8',    label: '7–8 hours',     emoji: '😊' },
      { id: 'over-9', label: 'Over 8 hours',  emoji: '🛌' },
    ],
  },

  // ─── STEP 19: Water intake ────────────────────────────────────────
  {
    step: 19,
    question: 'How much water do you drink each day?',
    type: 'single',
    options: [
      { id: 'less-2', label: 'About 1–2 glasses',            emoji: '🥵' },
      { id: '2-6',    label: 'Around 3–5 glasses',           emoji: '💧' },
      { id: '6-8',    label: '6 or more glasses',            emoji: '😊' },
      { id: 'over-8', label: 'I mostly drink coffee or tea', emoji: '💦' },
    ],
  },

  // ─── STEP 20: Bad habits (multi) ─────────────────────────────────
  {
    step: 20,
    question: 'Do you have any habits you want to improve?',
    subtitle: 'You can choose more than one',
    type: 'multi',
    options: [
      { id: 'sleep',   label: "I don't sleep enough",      emoji: '😴' },
      { id: 'sugar',   label: 'I eat too much sugar',      emoji: '🍬' },
      { id: 'soda',    label: 'I drink a lot of soda',     emoji: '🥤' },
      { id: 'salty',   label: 'I eat a lot of salty food', emoji: '🧂' },
      { id: 'snacker', label: 'I eat late at night',       emoji: '🌙' },
      { id: 'none',    label: 'None of these',             emoji: '✖' },
    ],
  },

  // ─── STEP 21: Life events (multi) ────────────────────────────────
  {
    step: 21,
    question: 'Have any life changes affected your weight?',
    subtitle: 'You can choose more than one',
    type: 'multi',
    options: [
      { id: 'marriage',  label: 'Relationship or marriage',   emoji: '💑' },
      { id: 'work',      label: 'Busy work or daily routine', emoji: '💼' },
      { id: 'stress',    label: 'Stress or emotional health', emoji: '🤯' },
      { id: 'pregnancy', label: 'Pregnancy',                  emoji: '🤰' },
      { id: 'meds',      label: 'Medication or hormones',     emoji: '💊' },
      { id: 'none',      label: 'None of these',              emoji: '✖' },
    ],
  },

  // ─── STEP 22: Habits interstitial (circular) ─────────────────────
  {
    step: 22,
    question: 'Small changes can make a big difference',
    type: 'interstitial',
    interstitial: {
      images: ['/images/habits.png'],
      headline: 'Small changes can make a big difference',
      body: 'Many people gain weight after life changes. You are not alone. We will guide you and support you on your journey.',
      circular: true,
    },
  },

  // ─── STEP 23: Height (canonical: cm) — HEIGHT_STEP ───────────────
  {
    step: 23,
    question: 'Enter your height',
    type: 'input-number',
    units: ['cm', 'in'],
    placeholder: 'e.g. 168',
    hintTitle: 'Calculating your body mass index',
    hint: 'BMI is widely used as a risk factor for the development or prevalence of several health issues.',
    requiresConsent: true,
    validation: { min: 100, max: 250 },
  },

  // ─── STEP 24: Current weight (canonical: lbs) — WEIGHT_STEP ──────
  {
    step: 24,
    question: 'Tell us your current weight',
    type: 'input-number',
    units: ['lbs', 'kg'],
    placeholder: 'e.g. 165',
    showBMICard: true,
    validation: { min: 50, max: 700 },
  },

  // ─── STEP 25: Goal weight (canonical: lbs) ───────────────────────
  {
    step: 25,
    question: 'What weight would you like to reach?',
    type: 'input-number',
    units: ['lbs', 'kg'],
    placeholder: 'e.g. 140',
    showGoalCard: true,
    validation: { min: 50, max: 700 },
  },

  // ─── STEP 26: Age ─────────────────────────────────────────────────
  {
    step: 26,
    question: 'What is your age?',
    type: 'input-number',
    unit: 'years',
    placeholder: 'e.g. 35',
    hint: 'We use this to make your plan more personal.',
    buttonLabel: 'Next',
    validation: { min: 10, max: 110 },
  },

  // ─── STEP 27: Name ────────────────────────────────────────────────
  {
    step: 27,
    question: 'Enter your name',
    type: 'input-text',
    placeholder: 'Your name',
  },

  // ─── STEP 28: Walking heart interstitial ─────────────────────────
  {
    step: 28,
    question: 'Personalized indoor walking with TAICHI COACH',
    type: 'interstitial',
    interstitial: {
      images: ['/images/Quiz (91).png'],
      headline: 'Personalized indoor walking with TAICHI COACH',
      body: 'TAICHI COACH combines gentle walking at home with simple Tai Chi-based movement. Your plan is personalized to fit your body, your needs, and your daily life — so you can move safely, stay consistent, and feel better over time.',
    },
  },

  // ─── STEP 29: Special occasion ───────────────────────────────────
  {
    step: 29,
    question: 'Do you have any upcoming event that motivates you to lose weight?',
    type: 'single',
    options: [
      { id: 'vacation',        label: 'Holiday or trip',          emoji: '😊' },
      { id: 'sporting-event',  label: 'Sports activity',          emoji: '🏅' },
      { id: 'beach-trip',      label: 'Trip to the beach',        emoji: '👙' },
      { id: 'wedding',         label: 'Wedding',                  emoji: '🍾' },
      { id: 'family-occasion', label: 'Family event',             emoji: '👨‍👩‍👧‍👦' },
      { id: 'reunion',         label: 'Meeting people (reunion)', emoji: '👊' },
      { id: 'none',            label: 'No special plans',         emoji: '✗' },
    ],
  },

  // ─── STEP 30: Event date (skippable) ─────────────────────────────
  {
    step: 30,
    question: 'When is your event?',
    subtitle: 'This helps us create a plan that fits your timeline and goals. Your information is private and will not be shared.',
    type: 'input-date',
    skippable: true,
  },
]

// After step QUIZ_PHASE1_END the quiz pauses for loading-screen → wellness
// After TOTAL_STEPS the quiz goes straight to result
export const QUIZ_PHASE1_END = 27
export const TOTAL_STEPS = QUIZ_STEPS.length
