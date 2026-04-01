'use client'
import { useState } from 'react'
import styles from './page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import BMIScale from '@/components/BMIScale/BMIScale'
import { useQuizStore } from '@/lib/quiz-store'
import { calcBMI, getBMICategory } from '@/lib/bmi-utils'
import { useLangStore, type LangCode } from '@/lib/lang-store'
import { localizeBrandValue } from '@/lib/brand'

const PLANS = [
  { id: '28d', discount: '83%', total: '€8.80', origTotal: '€51.67', perDay: '€0.31' },
  { id: '12w', discount: '75%', total: '€18.08', origTotal: '€72.34', perDay: '€0.21' },
  { id: '24w', discount: '70%', total: '€27.17', origTotal: '€90.58', perDay: '€0.16' },
] as const

type Copy = {
  plans: { name: string; desc: string; badge: string | null }[]
  pageTitle: string
  pageSub: string
  discount: (v: string) => string
  perDay: (v: string) => string
  moneyBackRow: string
  cta: string
  consentPrefix: string
  terms: string
  privacy: string
  refund: string
  consentBody: (today: string, renew: string) => string
  yourResults: string
  primaryGoal: string
  fitnessLevel: string
  sleepQuality: string
  fitnessAge: string
  fitnessAgeValue: (years: number) => string
  workoutTitle: string
  workoutBadge: string
  waterTitle: string
  waterBadge: string
  readyHeading: string
  bulletTitle: string
  bullets: string[]
  whatYouGet: string
  features: { title: string; desc: string }[]
  socialText: string
  socialSub: string
  socialCta: string
  storiesHeading: string
  stories: { name: string; text: string }[]
  personalHeading: (name: string) => string
  guaranteeTitle: string
  guaranteeBody: string
  footer: string
  goalLabels: Record<string, string>
  sleepLabels: Record<string, string>
  fitnessLabels: Record<string, string>
  bmi: Record<'Normal' | 'Underweight' | 'Overweight' | 'Obese', { title: string; text: (bmi: string) => string }>
}

const EN: Copy = {
  plans: [
    { name: '28-day plan', desc: 'Good for getting started', badge: null },
    { name: '12-week plan', desc: 'Best for building a routine', badge: 'Most popular' },
    { name: '24-week plan', desc: 'Best for long-term results', badge: 'Best value' },
  ],
  pageTitle: 'Choose your plan with TAICHI COACH',
  pageSub: 'Simple, guided, and made for real life.',
  discount: (v) => `with ${v} discount`,
  perDay: (v) => `≈ ${v} per day`,
  moneyBackRow: '30-day money-back guarantee — Try it with no risk. If it is not right for you, you can get your money back.',
  cta: 'Get my Tai Chi Coach',
  consentPrefix: 'By continuing, you agree to our',
  terms: 'Terms of Use',
  privacy: 'Privacy Policy',
  refund: 'Refund Policy',
  consentBody: (today, renew) => `This is a subscription that renews automatically. You will be charged ${today} today. After the plan period ends, your plan will renew at ${renew}, unless you cancel. You can cancel anytime at least 48 hours before renewal by contacting support email:`,
  yourResults: 'Your results',
  primaryGoal: 'PRIMARY GOAL',
  fitnessLevel: 'FITNESS LEVEL',
  sleepQuality: 'SLEEP QUALITY',
  fitnessAge: 'FITNESS AGE',
  fitnessAgeValue: (years) => `${years} years older than your actual age`,
  workoutTitle: 'Personalized Tai Chi Indoor Walking plan',
  workoutBadge: 'RECOMMENDED WORKOUT DURATION',
  waterTitle: 'Water Intake',
  waterBadge: 'RECOMMENDED DAILY WATER INTAKE',
  readyHeading: 'Your plan with TAICHI COACH is ready!',
  bulletTitle: 'With TAICHI COACH, you can:',
  bullets: ['Build confidence', 'Boost your energy', 'Relax and reduce stress', 'Support your body over time'],
  whatYouGet: 'What you get with TAICHI COACH',
  features: [
    { title: 'A personalized movement system', desc: 'Your plan is built around your body, your energy, and your daily life — not a generic routine.' },
    { title: 'Simple daily direction', desc: 'You always know what to do today, without thinking or planning.' },
    { title: 'Adaptive guidance that follows you', desc: 'Your plan adjusts as you go — based on your progress, your energy, and your consistency.' },
    { title: 'Support when you need it most', desc: 'If you feel stuck, tired, or miss a day — your plan helps you get back on track.' },
  ],
  socialText: 'Millions of people have already tried simple daily movement routines',
  socialSub: 'And many have seen real progress over time.',
  socialCta: 'Get started now',
  storiesHeading: 'Real stories from people using TAICHI COACH',
  stories: [
    { name: 'Anna K., 47', text: 'I was not sure this would work for me. I thought I would try it for a short time, but I kept going. After a few weeks, I felt lighter and more active. In 2 months, I lost 6 kg and feel much better in my body.' },
    { name: 'Sophie R., 42', text: 'I needed something simple I could do at home. The plan was easy, and I did not feel overwhelmed. After some time, my back pain improved, and daily tasks became easier. I feel stronger and more in control now.' },
    { name: 'Carla M., 48', text: 'I always struggled with my stomach area. The routine was simple, so I stayed consistent. After a few weeks, I started to see changes and feel more comfortable in my body. Now I feel much more confident.' },
  ],
  personalHeading: (name) => `${name ? `${name}, build` : 'Build'} real results at your own pace`,
  guaranteeTitle: '28-Day Money-Back Guarantee',
  guaranteeBody: 'Try TAICHI COACH with no risk. If it is not the right fit for you, you can request a refund within 28 days. Please check our Refund Policy for full details.',
  footer: '© 2026 TAICHI COACH. All rights reserved.',
  goalLabels: {
    'lose-weight': 'Lose weight',
    'heart-health': 'Improve heart health',
    'firm-toned': 'Get more toned',
    'lower-bio-age': 'Feel younger & energized',
  },
  sleepLabels: {
    'less-than-5': 'Poor', '<5': 'Poor', '5-6': 'Needs improvement', '7-8': 'Good', '8-9': 'Good', '9+': 'Could be better',
  },
  fitnessLabels: {
    sedentary: 'Low', 'lightly-active': 'Low', light: 'Low', moderate: 'Medium', intermediate: 'Medium', active: 'High', 'very-active': 'High', advanced: 'High',
  },
  bmi: {
    Normal: { title: 'Good starting point', text: (b) => `Your BMI is ${b}, which is in a normal range. You are on the right track. Your plan will be adjusted to fit your needs and help you keep your progress.` },
    Underweight: { title: 'Good starting point', text: (b) => `Your BMI is ${b}, which is below the usual range. Your plan will focus on building strength and balanced nutrition.` },
    Overweight: { title: 'A good point to make a change', text: (b) => `Your BMI is ${b}. With the right routine, you can improve how your body feels. We will guide you step by step with a plan that fits your daily life.` },
    Obese: { title: 'A good time to take care of your body', text: (b) => `Your BMI is ${b}. With the right plan, you can improve how your body feels and moves. We will guide you with small, simple steps that fit your daily life.` },
  },
}

function localize(base: Copy, overrides: Partial<Copy>): Copy {
  return {
    ...base,
    ...overrides,
    plans: overrides.plans ?? base.plans,
    features: overrides.features ?? base.features,
    stories: overrides.stories ?? base.stories,
    goalLabels: overrides.goalLabels ?? base.goalLabels,
    sleepLabels: overrides.sleepLabels ?? base.sleepLabels,
    fitnessLabels: overrides.fitnessLabels ?? base.fitnessLabels,
    bmi: overrides.bmi ?? base.bmi,
  }
}

const COPY: Record<LangCode, Copy> = {
  en: EN,
  lt: localize(EN, {
    plans: [
      { name: '28 dienų planas', desc: 'Tinka pradžiai', badge: null },
      { name: '12 savaičių planas', desc: 'Geriausia rutinai kurti', badge: 'Populiariausias' },
      { name: '24 savaičių planas', desc: 'Geriausia ilgalaikiams rezultatams', badge: 'Geriausia vertė' },
    ],
    pageTitle: 'Pasirinkite savo planą su TAICHI COACH',
    pageSub: 'Paprasta, aišku ir pritaikyta tikram gyvenimui.',
    discount: (v) => `su ${v} nuolaida`,
    perDay: (v) => `≈ ${v} per dieną`,
    moneyBackRow: '30 dienų pinigų grąžinimo garantija, išbandykite be rizikos. Jei planas jums netiks, galėsite susigrąžinti pinigus.',
    cta: 'Gauti mano Tai Chi Coach',
    consentPrefix: 'Tęsdami sutinkate su mūsų',
    terms: 'Naudojimo sąlygomis',
    privacy: 'Privatumo politika',
    refund: 'Pinigų grąžinimo politika',
    consentBody: (today, renew) => `Tai automatiškai atnaujinama prenumerata. Šiandien bus nuskaičiuota ${today}. Pasibaigus laikotarpiui, prenumerata bus atnaujinta už ${renew}, jei jos neatšauksite. Atsisakyti galite bet kada, likus bent 48 valandoms iki atnaujinimo, parašę el. paštu:`,
    yourResults: 'Jūsų rezultatai',
    primaryGoal: 'PAGRINDINIS TIKSLAS',
    fitnessLevel: 'AKTYVUMO LYGIS',
    sleepQuality: 'MIEGO KOKYBĖ',
    fitnessAge: 'FIZINIS AMŽIUS',
    fitnessAgeValue: (years) => `${years} metais vyresnis nei jūsų tikrasis amžius`,
    workoutTitle: 'Asmeninis Tai Chi ėjimo namuose planas',
    workoutBadge: 'REKOMENDUOJAMA TRENIRUOTĖS TRUKMĖ',
    waterTitle: 'Vandens kiekis',
    waterBadge: 'REKOMENDUOJAMAS DIENOS VANDENS KIEKIS',
    readyHeading: 'Jūsų planas su TAICHI COACH jau paruoštas!',
    bulletTitle: 'Su TAICHI COACH galite:',
    bullets: ['Sustiprinti pasitikėjimą', 'Turėti daugiau energijos', 'Atsipalaiduoti ir mažinti stresą', 'Palaikyti kūną ilgainiui'],
    whatYouGet: 'Ką gaunate su TAICHI COACH',
    socialText: 'Milijonai žmonių jau išbandė paprastas kasdienio judėjimo rutinas',
    socialSub: 'Ir daugelis jų laikui bėgant pamatė tikrą pažangą.',
    socialCta: 'Pradėti dabar',
    storiesHeading: 'Tikros istorijos žmonių, kurie naudoja TAICHI COACH',
    personalHeading: (name) => `${name ? `${name}, kurkite` : 'Kurkite'} tikrus rezultatus savo tempu`,
    guaranteeTitle: '28 dienų pinigų grąžinimo garantija',
    guaranteeBody: 'Išbandykite TAICHI COACH be rizikos. Jei planas jums netiks, per 28 dienas galėsite prašyti pinigų grąžinimo. Daugiau informacijos rasite pinigų grąžinimo politikoje.',
    footer: '© 2026 TAICHI COACH. Visos teisės saugomos.',
    goalLabels: { 'lose-weight': 'Numesti svorio', 'heart-health': 'Pagerinti širdies sveikatą', 'firm-toned': 'Tapti stangresniam', 'lower-bio-age': 'Jaustis jaunesniam ir energingesniam' },
  }),
  lv: localize(EN, {
    plans: [
      { name: '28 dienu plāns', desc: 'Labs sākumam', badge: null },
      { name: '12 nedēļu plāns', desc: 'Vislabākais ieraduma veidošanai', badge: 'Populārākais' },
      { name: '24 nedēļu plāns', desc: 'Vislabākais ilgtermiņa rezultātiem', badge: 'Labākā vērtība' },
    ],
    pageTitle: 'Izvēlieties savu plānu ar TAICHI COACH',
    pageSub: 'Vienkārši, saprotami un piemēroti īstai ikdienai.',
    discount: (v) => `ar ${v} atlaidi`,
    perDay: (v) => `≈ ${v} dienā`,
    moneyBackRow: '30 dienu naudas atgriešanas garantija, izmēģiniet bez riska. Ja tas nav jums piemērots, varēsiet saņemt naudu atpakaļ.',
    cta: 'Saņemt manu Tai Chi Coach',
    consentPrefix: 'Turpinot, jūs piekrītat mūsu',
    terms: 'Lietošanas noteikumiem',
    privacy: 'Privātuma politikai',
    refund: 'Atmaksas politikai',
    consentBody: (today, renew) => `Šis ir abonements ar automātisku atjaunošanu. Šodien jums tiks piemērots maksājums ${today}. Pēc plāna perioda beigām abonements tiks atjaunots par ${renew}, ja to neatcelsiet. To varat atcelt jebkurā laikā, vismaz 48 stundas pirms atjaunošanas, rakstot uz:`,
    yourResults: 'Jūsu rezultāti',
    primaryGoal: 'GALVENAIS MĒRĶIS',
    fitnessLevel: 'AKTIVITĀTES LĪMENIS',
    sleepQuality: 'MIEGA KVALITĀTE',
    fitnessAge: 'FIZISKĀIS VECUMS',
    fitnessAgeValue: (years) => `${years} gadus vecāks par jūsu īsto vecumu`,
    workoutTitle: 'Personalizēts Tai Chi pastaigu telpās plāns',
    workoutBadge: 'IETEICAMAIS TRENIŅA ILGUMS',
    waterTitle: 'Ūdens uzņemšana',
    waterBadge: 'IETEICAMAIS DIENAS ŪDENS DAUDZUMS',
    readyHeading: 'Jūsu plāns ar TAICHI COACH ir gatavs!',
    bulletTitle: 'Ar TAICHI COACH jūs varat:',
    bullets: ['Vairot pārliecību par sevi', 'Iegūt vairāk enerģijas', 'Atslābināties un mazināt stresu', 'Atbalstīt savu ķermeni ilgtermiņā'],
    whatYouGet: 'Ko saņemat ar TAICHI COACH',
    features: [
      { title: 'Personalizēta kustību sistēma', desc: 'Jūsu plāns tiek veidots pēc jūsu ķermeņa, enerģijas un ikdienas ritma, nevis pēc vispārīgas shēmas.' },
      { title: 'Skaidrs dienas virziens', desc: 'Jūs vienmēr zināt, ko darīt šodien, bez liekas plānošanas.' },
      { title: 'Vadība, kas pielāgojas jums', desc: 'Plāns pielāgojas jūsu progresam, enerģijai un regularitātei.' },
      { title: 'Atbalsts brīdī, kad tas vajadzīgs visvairāk', desc: 'Ja iestrēgstat, nogurstat vai izlaižat dienu, plāns palīdz atgriezties ritmā.' },
    ],
    socialText: 'Miljoniem cilvēku jau ir izmēģinājuši vienkāršas ikdienas kustību rutīnas',
    socialSub: 'Un daudzi no viņiem laika gaitā redzēja īstu progresu.',
    socialCta: 'Sākt tagad',
    storiesHeading: 'Īsti stāsti no cilvēkiem, kuri lieto TAICHI COACH',
    personalHeading: (name) => `${name ? `${name}, veidojiet` : 'Veidojiet'} īstus rezultātus savā tempā`,
    guaranteeTitle: '28 dienu naudas atgriešanas garantija',
    guaranteeBody: 'Izmēģiniet TAICHI COACH bez riska. Ja tas jums nebūs piemērots, 28 dienu laikā varēsiet pieprasīt atmaksu. Plašāka informācija pieejama atmaksas politikā.',
    footer: '© 2026 TAICHI COACH. Visas tiesības aizsargātas.',
    goalLabels: { 'lose-weight': 'Samazināt svaru', 'heart-health': 'Uzlabot sirds veselību', 'firm-toned': 'Kļūt tvirtākam', 'lower-bio-age': 'Justies jaunākam un enerģiskākam' },
  }),
  ro: localize(EN, {
    plans: [
      { name: 'Plan pe 28 de zile', desc: 'Bun pentru început', badge: null },
      { name: 'Plan pe 12 săptămâni', desc: 'Cel mai bun pentru a crea o rutină', badge: 'Cel mai popular' },
      { name: 'Plan pe 24 de săptămâni', desc: 'Cel mai bun pentru rezultate pe termen lung', badge: 'Cea mai bună valoare' },
    ],
    pageTitle: 'Alegeți planul dumneavoastră cu TAICHI COACH',
    pageSub: 'Simplu, ghidat și potrivit vieții reale.',
    discount: (v) => `cu reducere de ${v}`,
    perDay: (v) => `≈ ${v} pe zi`,
    moneyBackRow: 'Garanție de returnare a banilor timp de 30 de zile, încercați fără risc. Dacă nu este potrivit pentru dumneavoastră, puteți primi banii înapoi.',
    cta: 'Vreau Tai Chi Coach-ul meu',
    consentPrefix: 'Continuând, sunteți de acord cu',
    terms: 'Termenii de utilizare',
    privacy: 'Politica de confidențialitate',
    refund: 'Politica de rambursare',
    consentBody: (today, renew) => `Acesta este un abonament cu reînnoire automată. Astăzi vi se va percepe ${today}. După încheierea perioadei, abonamentul se va reînnoi la ${renew}, dacă nu îl anulați. Îl puteți anula oricând, cu cel puțin 48 de ore înainte de reînnoire, scriind la:`,
    yourResults: 'Rezultatele dumneavoastră',
    primaryGoal: 'OBIECTIV PRINCIPAL',
    fitnessLevel: 'NIVEL DE ACTIVITATE',
    sleepQuality: 'CALITATEA SOMNULUI',
    fitnessAge: 'VÂRSTA FIZICĂ',
    fitnessAgeValue: (years) => `cu ${years} ani peste vârsta reală`,
    workoutTitle: 'Plan personalizat de mers Tai Chi în interior',
    workoutBadge: 'DURATA RECOMANDATĂ A ANTRENAMENTULUI',
    waterTitle: 'Aportul de apă',
    waterBadge: 'APORT ZILNIC RECOMANDAT DE APĂ',
    readyHeading: 'Planul dumneavoastră cu TAICHI COACH este gata!',
    bulletTitle: 'Cu TAICHI COACH puteți:',
    bullets: ['Să vă creșteți încrederea', 'Să aveți mai multă energie', 'Să vă relaxați și să reduceți stresul', 'Să vă susțineți corpul în timp'],
    whatYouGet: 'Ce primiți cu TAICHI COACH',
    features: [
      { title: 'Un sistem de mișcare personalizat', desc: 'Planul este construit în jurul corpului, energiei și vieții dumneavoastră de zi cu zi, nu în jurul unei rutine generice.' },
      { title: 'Direcție clară în fiecare zi', desc: 'Știți mereu ce aveți de făcut astăzi, fără să vă gândiți prea mult sau să planificați în exces.' },
      { title: 'Ghidare care se adaptează pe parcurs', desc: 'Planul se ajustează în funcție de progres, energie și consecvență.' },
      { title: 'Sprijin atunci când aveți cea mai mare nevoie', desc: 'Dacă vă simțiți blocați, obosiți sau ratați o zi, planul vă ajută să reveniți pe traseu.' },
    ],
    socialText: 'Milioane de persoane au încercat deja rutine simple de mișcare zilnică',
    socialSub: 'Iar multe dintre ele au văzut progres real în timp.',
    socialCta: 'Începeți acum',
    storiesHeading: 'Povești reale de la persoane care folosesc TAICHI COACH',
    personalHeading: (name) => `${name ? `${name}, construiți` : 'Construiți'} rezultate reale în ritmul dumneavoastră`,
    guaranteeTitle: 'Garanție de returnare a banilor în 28 de zile',
    guaranteeBody: 'Încercați TAICHI COACH fără risc. Dacă nu este potrivit pentru dumneavoastră, puteți cere rambursarea în 28 de zile. Consultați politica de rambursare pentru detalii complete.',
    footer: '© 2026 TAICHI COACH. Toate drepturile rezervate.',
    goalLabels: { 'lose-weight': 'Să slăbesc', 'heart-health': 'Să îmbunătățesc sănătatea inimii', 'firm-toned': 'Să fiu mai tonifiat', 'lower-bio-age': 'Să mă simt mai tânăr și mai energic' },
  }),
  cz: localize(EN, {
    plans: [
      { name: '28denní plán', desc: 'Skvělé na začátek', badge: null },
      { name: '12týdenní plán', desc: 'Nejlepší pro vytvoření rutiny', badge: 'Nejoblíbenější' },
      { name: '24týdenní plán', desc: 'Nejlepší pro dlouhodobé výsledky', badge: 'Nejlepší hodnota' },
    ],
    pageTitle: 'Vyberte si svůj plán s TAICHI COACH',
    pageSub: 'Jednoduché, vedené a vytvořené pro běžný život.',
    discount: (v) => `se slevou ${v}`,
    perDay: (v) => `≈ ${v} za den`,
    moneyBackRow: '30denní záruka vrácení peněz, vyzkoušejte bez rizika. Pokud vám to nebude vyhovovat, můžete získat peníze zpět.',
    cta: 'Chci svůj Tai Chi Coach',
    consentPrefix: 'Pokračováním souhlasíte s našimi',
    terms: 'Podmínkami použití',
    privacy: 'Zásadami ochrany osobních údajů',
    refund: 'Zásadami vrácení peněz',
    consentBody: (today, renew) => `Jedná se o předplatné s automatickým obnovením. Dnes vám bude účtováno ${today}. Po skončení období se plán obnoví za ${renew}, pokud ho nezrušíte. Zrušit ho můžete kdykoli, nejpozději 48 hodin před obnovením, na e-mailu:`,
    yourResults: 'Vaše výsledky',
    primaryGoal: 'HLAVNÍ CÍL',
    fitnessLevel: 'ÚROVEŇ KONDICE',
    sleepQuality: 'KVALITA SPÁNKU',
    fitnessAge: 'KONDIČNÍ VĚK',
    fitnessAgeValue: (years) => `o ${years} let více než váš skutečný věk`,
    workoutTitle: 'Personalizovaný plán Tai Chi chůze doma',
    workoutBadge: 'DOPORUČENÁ DÉLKA CVIČENÍ',
    waterTitle: 'Příjem vody',
    waterBadge: 'DOPORUČENÝ DENNÍ PŘÍJEM VODY',
    readyHeading: 'Váš plán s TAICHI COACH je připraven!',
    bulletTitle: 'S TAICHI COACH můžete:',
    bullets: ['Budovat větší jistotu', 'Mít více energie', 'Uvolnit se a snížit stres', 'Dlouhodobě podporovat své tělo'],
    whatYouGet: 'Co získáte s TAICHI COACH',
    features: [
      { title: 'Personalizovaný pohybový systém', desc: 'Váš plán je postavený podle vašeho těla, energie a běžného dne, ne podle obecné rutiny.' },
      { title: 'Jasný denní směr', desc: 'Vždy víte, co máte dnes dělat, bez zbytečného přemýšlení a plánování.' },
      { title: 'Vedení, které se přizpůsobuje', desc: 'Plán se upravuje podle vašeho pokroku, energie a pravidelnosti.' },
      { title: 'Podpora ve chvíli, kdy je nejvíce potřeba', desc: 'Když se zaseknete, jste unavení nebo vynecháte den, plán vám pomůže vrátit se zpět.' },
    ],
    socialText: 'Miliony lidí už vyzkoušely jednoduché každodenní pohybové rutiny',
    socialSub: 'A mnozí z nich časem viděli skutečný pokrok.',
    socialCta: 'Začít hned',
    storiesHeading: 'Skutečné příběhy lidí, kteří používají TAICHI COACH',
    personalHeading: (name) => `${name ? `${name}, budujte` : 'Budujte'} skutečné výsledky vlastním tempem`,
    guaranteeTitle: '28denní záruka vrácení peněz',
    guaranteeBody: 'Vyzkoušejte TAICHI COACH bez rizika. Pokud vám nebude vyhovovat, můžete do 28 dnů požádat o vrácení peněz. Podrobnosti najdete v zásadách vrácení peněz.',
    footer: '© 2026 TAICHI COACH. Všechna práva vyhrazena.',
    goalLabels: { 'lose-weight': 'Zhubnout', 'heart-health': 'Zlepšit zdraví srdce', 'firm-toned': 'Více zpevnit postavu', 'lower-bio-age': 'Cítit se mladší a plný energie' },
    sleepLabels: { 'less-than-5': 'Špatná', '<5': 'Špatná', '5-6': 'Je potřeba zlepšit', '7-8': 'Dobrá', '8-9': 'Dobrá', '9+': 'Mohla by být lepší' },
    fitnessLabels: { sedentary: 'Nízká', 'lightly-active': 'Nízká', light: 'Nízká', moderate: 'Střední', intermediate: 'Střední', active: 'Vysoká', 'very-active': 'Vysoká', advanced: 'Vysoká' },
    stories: [
      { name: 'Anna K., 47', text: 'Nejdřív jsem si nebyla jistá, jestli to bude pro mě. Chtěla jsem to zkusit jen na chvíli, ale vydržela jsem. Po pár týdnech jsem se cítila lehčí a aktivnější. Za 2 měsíce jsem zhubla 6 kg a cítím se ve svém těle mnohem lépe.' },
      { name: 'Sophie R., 42', text: 'Potřebovala jsem něco jednoduchého, co zvládnu doma. Plán byl snadný a necítila jsem se zahlceně. Po nějaké době se zlepšila bolest zad a běžné činnosti byly snazší. Teď se cítím silnější a jistější.' },
      { name: 'Carla M., 48', text: 'Vždycky jsem bojovala s oblastí břicha. Rutina byla jednoduchá, takže jsem vydržela pravidelně pokračovat. Po pár týdnech jsem začala vidět změny a cítila se ve svém těle pohodlněji. Dnes mám mnohem větší sebejistotu.' },
    ],
  }),
  dk: localize(EN, {
    plans: [
      { name: '28-dages plan', desc: 'God til at komme i gang', badge: null },
      { name: '12-ugers plan', desc: 'Bedst til at opbygge en rutine', badge: 'Mest populær' },
      { name: '24-ugers plan', desc: 'Bedst til langsigtede resultater', badge: 'Bedste værdi' },
    ],
    pageTitle: 'Vælg jeres plan med TAICHI COACH',
    pageSub: 'Enkelt, guidet og skabt til hverdagen.',
    discount: (v) => `med ${v} rabat`,
    perDay: (v) => `≈ ${v} pr. dag`,
    moneyBackRow: '30 dages pengene-tilbage-garanti, prøv uden risiko. Hvis det ikke passer til jer, kan I få pengene tilbage.',
    cta: 'Få min Tai Chi Coach',
    consentPrefix: 'Når I fortsætter, accepterer I vores',
    terms: 'Brugsvilkår',
    privacy: 'Privatlivspolitik',
    refund: 'Refusionspolitik',
    consentBody: (today, renew) => `Dette er et abonnement med automatisk fornyelse. I dag bliver der trukket ${today}. Når perioden slutter, fornyes planen til ${renew}, medmindre I opsiger den. I kan opsige når som helst senest 48 timer før fornyelse via:`,
    yourResults: 'Jeres resultater',
    primaryGoal: 'PRIMÆRT MÅL',
    fitnessLevel: 'FITNESSNIVEAU',
    sleepQuality: 'SØVNKVALITET',
    fitnessAge: 'FITNESSALDER',
    fitnessAgeValue: (years) => `${years} år ældre end jeres faktiske alder`,
    workoutTitle: 'Personlig Tai Chi indendørs gangplan',
    workoutBadge: 'ANBEFALET TRÆNINGSVARIGHED',
    waterTitle: 'Vandindtag',
    waterBadge: 'ANBEFALET DAGLIGT VANDINDTAG',
    readyHeading: 'Jeres plan med TAICHI COACH er klar!',
    bulletTitle: 'Med TAICHI COACH kan I:',
    bullets: ['Styrke jeres selvtillid', 'Få mere energi', 'Slappe af og reducere stress', 'Støtte kroppen over tid'],
    whatYouGet: 'Det får I med TAICHI COACH',
  }),
  gr: localize(EN, {
    plans: [
      { name: 'Πλάνο 28 ημερών', desc: 'Καλό για να ξεκινήσετε', badge: null },
      { name: 'Πλάνο 12 εβδομάδων', desc: 'Ιδανικό για να χτίσετε ρουτίνα', badge: 'Δημοφιλέστερο' },
      { name: 'Πλάνο 24 εβδομάδων', desc: 'Ιδανικό για μακροπρόθεσμα αποτελέσματα', badge: 'Καλύτερη αξία' },
    ],
    pageTitle: 'Επιλέξτε το πλάνο σας με το TAICHI COACH',
    pageSub: 'Απλό, καθοδηγούμενο και φτιαγμένο για την πραγματική ζωή.',
    discount: (v) => `με έκπτωση ${v}`,
    perDay: (v) => `≈ ${v} την ημέρα`,
    moneyBackRow: 'Εγγύηση επιστροφής χρημάτων 30 ημερών, δοκιμάστε χωρίς ρίσκο. Αν δεν είναι το κατάλληλο για εσάς, μπορείτε να πάρετε τα χρήματά σας πίσω.',
    cta: 'Αποκτήστε το Tai Chi Coach μου',
    consentPrefix: 'Συνεχίζοντας, αποδέχεστε τους',
    terms: 'Όρους χρήσης',
    privacy: 'Πολιτική απορρήτου',
    refund: 'Πολιτική επιστροφής χρημάτων',
    consentBody: (today, renew) => `Πρόκειται για συνδρομή με αυτόματη ανανέωση. Σήμερα θα χρεωθείτε ${today}. Μετά το τέλος της περιόδου, το πλάνο θα ανανεωθεί στα ${renew}, εκτός αν το ακυρώσετε. Μπορείτε να το ακυρώσετε οποιαδήποτε στιγμή, τουλάχιστον 48 ώρες πριν από την ανανέωση, στο:`,
    yourResults: 'Τα αποτελέσματά σας',
    primaryGoal: 'ΒΑΣΙΚΟΣ ΣΤΟΧΟΣ',
    fitnessLevel: 'ΕΠΙΠΕΔΟ ΦΥΣΙΚΗΣ ΚΑΤΑΣΤΑΣΗΣ',
    sleepQuality: 'ΠΟΙΟΤΗΤΑ ΥΠΝΟΥ',
    fitnessAge: 'ΗΛΙΚΙΑ ΦΥΣΙΚΗΣ ΚΑΤΑΣΤΑΣΗΣ',
    fitnessAgeValue: (years) => `${years} χρόνια μεγαλύτερη από την πραγματική σας ηλικία`,
    workoutTitle: 'Εξατομικευμένο πρόγραμμα Tai Chi περπατήματος στο σπίτι',
    workoutBadge: 'ΠΡΟΤΕΙΝΟΜΕΝΗ ΔΙΑΡΚΕΙΑ ΑΣΚΗΣΗΣ',
    waterTitle: 'Πρόσληψη νερού',
    waterBadge: 'ΠΡΟΤΕΙΝΟΜΕΝΗ ΗΜΕΡΗΣΙΑ ΠΟΣΟΤΗΤΑ ΝΕΡΟΥ',
    readyHeading: 'Το πλάνο σας με το TAICHI COACH είναι έτοιμο!',
    bulletTitle: 'Με το TAICHI COACH μπορείτε να:',
    bullets: ['Χτίσετε μεγαλύτερη αυτοπεποίθηση', 'Έχετε περισσότερη ενέργεια', 'Χαλαρώσετε και να μειώσετε το στρες', 'Υποστηρίξετε το σώμα σας μακροπρόθεσμα'],
    whatYouGet: 'Τι αποκτάτε με το TAICHI COACH',
  }),
  hu: localize(EN, {
    plans: [
      { name: '28 napos terv', desc: 'Jó kezdéshez', badge: null },
      { name: '12 hetes terv', desc: 'A legjobb a rutin kialakításához', badge: 'Legnépszerűbb' },
      { name: '24 hetes terv', desc: 'A legjobb hosszú távú eredményekhez', badge: 'Legjobb ár-érték' },
    ],
    pageTitle: 'Válasszák ki a tervüket a TAICHI COACH segítségével',
    pageSub: 'Egyszerű, vezetett és a valódi élethez igazított.',
    discount: (v) => `${v} kedvezménnyel`,
    perDay: (v) => `≈ ${v} naponta`,
    moneyBackRow: '30 napos pénzvisszafizetési garancia, próbálják ki kockázat nélkül. Ha nem Önöknek való, visszakaphatják a pénzüket.',
    cta: 'Kérem a Tai Chi Coach tervemet',
    consentPrefix: 'A folytatással elfogadják a',
    terms: 'Felhasználási feltételeket',
    privacy: 'Adatvédelmi szabályzatot',
    refund: 'Visszatérítési szabályzatot',
    consentBody: (today, renew) => `Ez egy automatikusan megújuló előfizetés. Ma ${today} kerül levonásra. Az időszak végén a csomag ${renew} áron megújul, ha nem mondják le. Bármikor lemondható, legalább 48 órával a megújulás előtt, ezen az e-mail-címen:`,
    yourResults: 'Az Önök eredményei',
    primaryGoal: 'ELSŐDLEGES CÉL',
    fitnessLevel: 'FITNESS SZINT',
    sleepQuality: 'ALVÁS MINŐSÉGE',
    fitnessAge: 'FITNESS KOR',
    fitnessAgeValue: (years) => `${years} évvel idősebb a valós életkornál`,
    workoutTitle: 'Személyre szabott Tai Chi otthoni séta terv',
    workoutBadge: 'AJÁNLOTT EDZÉSIDŐ',
    waterTitle: 'Vízbevitel',
    waterBadge: 'AJÁNLOTT NAPI VÍZBEVITEL',
    readyHeading: 'A TAICHI COACH tervük elkészült!',
    bulletTitle: 'A TAICHI COACH segítségével:',
    bullets: ['Növelhetik az önbizalmukat', 'Több energiát nyerhetnek', 'Ellazulhatnak és csökkenthetik a stresszt', 'Hosszú távon támogathatják a testüket'],
    whatYouGet: 'Mit kapnak a TAICHI COACH-csal',
  }),
  hr: localize(EN, {
    plans: [
      { name: 'Plan za 28 dana', desc: 'Dobar za početak', badge: null },
      { name: 'Plan za 12 tjedana', desc: 'Najbolji za stvaranje rutine', badge: 'Najpopularniji' },
      { name: 'Plan za 24 tjedna', desc: 'Najbolji za dugoročne rezultate', badge: 'Najbolja vrijednost' },
    ],
    pageTitle: 'Odaberite svoj plan uz TAICHI COACH',
    pageSub: 'Jednostavno, vođeno i prilagođeno stvarnom životu.',
    discount: (v) => `uz popust od ${v}`,
    perDay: (v) => `≈ ${v} dnevno`,
    moneyBackRow: '30-dnevno jamstvo povrata novca, isprobajte bez rizika. Ako vam ne odgovara, možete dobiti novac natrag.',
    cta: 'Preuzmi svoj Tai Chi Coach',
    consentPrefix: 'Nastavkom prihvaćate naše',
    terms: 'Uvjete korištenja',
    privacy: 'Pravila privatnosti',
    refund: 'Pravila povrata novca',
    consentBody: (today, renew) => `Ovo je pretplata s automatskim obnavljanjem. Danas će vam se naplatiti ${today}. Nakon završetka razdoblja plan će se obnoviti po cijeni od ${renew}, osim ako ga ne otkažete. Otkazati ga možete bilo kada, najmanje 48 sati prije obnove, na adresi:`,
    yourResults: 'Vaši rezultati',
    primaryGoal: 'GLAVNI CILJ',
    fitnessLevel: 'RAZINA KONDICIJE',
    sleepQuality: 'KVALITETA SNA',
    fitnessAge: 'KONDICIJSKA DOB',
    fitnessAgeValue: (years) => `${years} godina više od vaše stvarne dobi`,
    workoutTitle: 'Personalizirani Tai Chi plan hodanja u zatvorenom',
    workoutBadge: 'PREPORUČENO TRAJANJE VJEŽBANJA',
    waterTitle: 'Unos vode',
    waterBadge: 'PREPORUČENI DNEVNI UNOS VODE',
    readyHeading: 'Vaš plan uz TAICHI COACH je spreman!',
    bulletTitle: 'Uz TAICHI COACH možete:',
    bullets: ['Izgraditi više samopouzdanja', 'Imati više energije', 'Opustiti se i smanjiti stres', 'Dugoročno podupirati svoje tijelo'],
    whatYouGet: 'Što dobivate uz TAICHI COACH',
  }),
  il: localize(EN, {
    plans: [
      { name: 'תוכנית ל-28 יום', desc: 'טובה להתחלה', badge: null },
      { name: 'תוכנית ל-12 שבועות', desc: 'הכי טובה לבניית שגרה', badge: 'הכי פופולרית' },
      { name: 'תוכנית ל-24 שבועות', desc: 'הכי טובה לתוצאות ארוכות טווח', badge: 'התמורה הטובה ביותר' },
    ],
    pageTitle: 'בחרו את התוכנית שלכם עם TAICHI COACH',
    pageSub: 'פשוט, מונחה ומתאים לחיים האמיתיים.',
    discount: (v) => `עם הנחה של ${v}`,
    perDay: (v) => `≈ ${v} ליום`,
    moneyBackRow: 'אחריות להחזר כספי ל-30 יום, נסו בלי סיכון. אם זה לא מתאים לכם, תוכלו לקבל את כספכם בחזרה.',
    cta: 'קבלו את Tai Chi Coach שלי',
    consentPrefix: 'בהמשך אתם מסכימים ל',
    terms: 'תנאי השימוש',
    privacy: 'מדיניות הפרטיות',
    refund: 'מדיניות ההחזרים',
    consentBody: (today, renew) => `זהו מנוי עם חידוש אוטומטי. היום תחויבו ב-${today}. לאחר סיום התקופה, המנוי יתחדש במחיר ${renew}, אלא אם תבטלו. ניתן לבטל בכל עת, לפחות 48 שעות לפני החידוש, בכתובת:`,
    yourResults: 'התוצאות שלכם',
    primaryGoal: 'מטרה עיקרית',
    fitnessLevel: 'רמת כושר',
    sleepQuality: 'איכות השינה',
    fitnessAge: 'גיל כושר',
    fitnessAgeValue: (years) => `${years} שנים יותר מהגיל האמיתי שלכם`,
    workoutTitle: 'תוכנית הליכת Tai Chi אישית לבית',
    workoutBadge: 'משך אימון מומלץ',
    waterTitle: 'צריכת מים',
    waterBadge: 'כמות מים יומית מומלצת',
    readyHeading: 'התוכנית שלכם עם TAICHI COACH מוכנה!',
    bulletTitle: 'עם TAICHI COACH תוכלו:',
    bullets: ['לחזק את הביטחון העצמי', 'להרגיש יותר אנרגיה', 'להירגע ולהפחית מתח', 'לתמוך בגוף שלכם לאורך זמן'],
    whatYouGet: 'מה מקבלים עם TAICHI COACH',
  }),
  jp: localize(EN, {
    plans: [
      { name: '28日プラン', desc: '始めやすいプラン', badge: null },
      { name: '12週間プラン', desc: '習慣づくりに最適', badge: '一番人気' },
      { name: '24週間プラン', desc: '長期的な結果に最適', badge: '最もお得' },
    ],
    pageTitle: 'TAICHI COACHであなたのプランを選びましょう',
    pageSub: 'シンプルで、わかりやすく、毎日に取り入れやすい内容です。',
    discount: (v) => `${v}オフ`,
    perDay: (v) => `1日あたり約${v}`,
    moneyBackRow: '30日間返金保証。リスクなくお試しいただけます。合わないと感じた場合は返金を申請できます。',
    cta: 'Tai Chi Coachを始める',
    consentPrefix: '続行すると、以下に同意したことになります',
    terms: '利用規約',
    privacy: 'プライバシーポリシー',
    refund: '返金ポリシー',
    consentBody: (today, renew) => `これは自動更新のサブスクリプションです。本日 ${today} が請求されます。期間終了後は、解約しない限り ${renew} で自動更新されます。更新の48時間前までであれば、いつでも次のメールアドレスから解約できます:`,
    yourResults: 'あなたの結果',
    primaryGoal: '主な目標',
    fitnessLevel: '運動レベル',
    sleepQuality: '睡眠の質',
    fitnessAge: '体力年齢',
    fitnessAgeValue: (years) => `実年齢より ${years} 歳高い状態`,
    workoutTitle: 'あなた専用のTai Chi室内ウォーキングプラン',
    workoutBadge: 'おすすめの運動時間',
    waterTitle: '水分摂取量',
    waterBadge: '推奨される1日の水分量',
    readyHeading: 'あなたのTAICHI COACHプランができました！',
    bulletTitle: 'TAICHI COACHでできること:',
    bullets: ['自信を育てる', 'エネルギーを高める', 'リラックスしてストレスを減らす', '体を長く支える'],
    whatYouGet: 'TAICHI COACHで得られること',
  }),
  ru: localize(EN, {
    plans: [
      { name: 'План на 28 дней', desc: 'Хорошо подходит для старта', badge: null },
      { name: 'План на 12 недель', desc: 'Лучший вариант для выработки привычки', badge: 'Самый популярный' },
      { name: 'План на 24 недели', desc: 'Лучший вариант для долгосрочных результатов', badge: 'Лучшая выгода' },
    ],
    pageTitle: 'Выберите свой план с TAICHI COACH',
    pageSub: 'Просто, понятно и удобно для реальной жизни.',
    discount: (v) => `со скидкой ${v}`,
    perDay: (v) => `≈ ${v} в день`,
    moneyBackRow: 'Гарантия возврата денег в течение 30 дней. Попробуйте без риска. Если вам не подойдёт, вы сможете вернуть деньги.',
    cta: 'Получить мой Tai Chi Coach',
    consentPrefix: 'Продолжая, вы соглашаетесь с нашими',
    terms: 'Условиями использования',
    privacy: 'Политикой конфиденциальности',
    refund: 'Политикой возврата средств',
    consentBody: (today, renew) => `Это подписка с автоматическим продлением. Сегодня с вас будет списано ${today}. После окончания периода план автоматически продлится за ${renew}, если вы его не отмените. Отменить можно в любой момент, минимум за 48 часов до продления, написав на:`,
    yourResults: 'Ваши результаты',
    primaryGoal: 'ГЛАВНАЯ ЦЕЛЬ',
    fitnessLevel: 'УРОВЕНЬ ФИЗИЧЕСКОЙ ФОРМЫ',
    sleepQuality: 'КАЧЕСТВО СНА',
    fitnessAge: 'ФИТНЕС-ВОЗРАСТ',
    fitnessAgeValue: (years) => `на ${years} лет старше вашего реального возраста`,
    workoutTitle: 'Персональный план домашней ходьбы Tai Chi',
    workoutBadge: 'РЕКОМЕНДУЕМАЯ ДЛИТЕЛЬНОСТЬ ТРЕНИРОВКИ',
    waterTitle: 'Потребление воды',
    waterBadge: 'РЕКОМЕНДУЕМОЕ ЕЖЕДНЕВНОЕ ПОТРЕБЛЕНИЕ ВОДЫ',
    readyHeading: 'Ваш план с TAICHI COACH готов!',
    bulletTitle: 'С TAICHI COACH вы можете:',
    bullets: ['Укрепить уверенность в себе', 'Получить больше энергии', 'Расслабиться и снизить стресс', 'Поддерживать своё тело в долгосрочной перспективе'],
    whatYouGet: 'Что вы получаете с TAICHI COACH',
  }),
  sk: localize(EN, {
    plans: [
      { name: '28-dňový plán', desc: 'Skvelý na začiatok', badge: null },
      { name: '12-týždňový plán', desc: 'Najlepší na vytvorenie rutiny', badge: 'Najobľúbenejší' },
      { name: '24-týždňový plán', desc: 'Najlepší na dlhodobé výsledky', badge: 'Najlepšia hodnota' },
    ],
    pageTitle: 'Vyberte si svoj plán s TAICHI COACH',
    pageSub: 'Jednoduché, vedené a vhodné do reálneho života.',
    discount: (v) => `so zľavou ${v}`,
    perDay: (v) => `≈ ${v} za deň`,
    moneyBackRow: '30-dňová garancia vrátenia peňazí, vyskúšajte bez rizika. Ak vám to nebude vyhovovať, môžete získať peniaze späť.',
    cta: 'Chcem svoj Tai Chi Coach',
    consentPrefix: 'Pokračovaním súhlasíte s našimi',
    terms: 'Podmienkami používania',
    privacy: 'Zásadami ochrany súkromia',
    refund: 'Zásadami vrátenia peňazí',
    consentBody: (today, renew) => `Ide o predplatné s automatickým obnovením. Dnes vám bude účtované ${today}. Po skončení obdobia sa plán obnoví za ${renew}, ak ho nezrušíte. Zrušiť ho môžete kedykoľvek, najneskôr 48 hodín pred obnovením, na e-maile:`,
    yourResults: 'Vaše výsledky',
    primaryGoal: 'HLAVNÝ CIEĽ',
    fitnessLevel: 'ÚROVEŇ KONDÍCIE',
    sleepQuality: 'KVALITA SPÁNKU',
    fitnessAge: 'FITNES VEK',
    fitnessAgeValue: (years) => `o ${years} rokov viac než váš skutočný vek`,
    workoutTitle: 'Personalizovaný plán Tai Chi chôdze doma',
    workoutBadge: 'ODPORÚČANÁ DĹŽKA CVIČENIA',
    waterTitle: 'Príjem vody',
    waterBadge: 'ODPORÚČANÝ DENNÝ PRÍJEM VODY',
    readyHeading: 'Váš plán s TAICHI COACH je pripravený!',
    bulletTitle: 'S TAICHI COACH môžete:',
    bullets: ['Budovať väčšie sebavedomie', 'Získať viac energie', 'Uvoľniť sa a znížiť stres', 'Dlhodobo podporovať svoje telo'],
    whatYouGet: 'Čo získate s TAICHI COACH',
  }),
  tw: localize(EN, {
    plans: [
      { name: '28 天計畫', desc: '很適合作為開始', badge: null },
      { name: '12 週計畫', desc: '最適合建立穩定習慣', badge: '最受歡迎' },
      { name: '24 週計畫', desc: '最適合長期成果', badge: '最佳價值' },
    ],
    pageTitle: '選擇您的 TAICHI COACH 計畫',
    pageSub: '簡單、清楚，而且適合真實生活節奏。',
    discount: (v) => `${v} 折扣`,
    perDay: (v) => `≈ 每天 ${v}`,
    moneyBackRow: '30 天退款保證，放心試用沒有風險。如果不適合您，您可以申請退款。',
    cta: '開始我的 Tai Chi Coach',
    consentPrefix: '繼續即表示您同意我們的',
    terms: '使用條款',
    privacy: '隱私權政策',
    refund: '退款政策',
    consentBody: (today, renew) => `這是一項自動續訂的訂閱服務。今天將收取 ${today}。方案期滿後，若您未取消，將以 ${renew} 自動續訂。您可於續訂前至少 48 小時隨時透過以下信箱取消:`,
    yourResults: '您的結果',
    primaryGoal: '主要目標',
    fitnessLevel: '體能程度',
    sleepQuality: '睡眠品質',
    fitnessAge: '體能年齡',
    fitnessAgeValue: (years) => `比您的實際年齡大 ${years} 歲`,
    workoutTitle: '個人化 Tai Chi 室內步行計畫',
    workoutBadge: '建議運動時間',
    waterTitle: '飲水量',
    waterBadge: '建議每日飲水量',
    readyHeading: '您的 TAICHI COACH 計畫已準備完成！',
    bulletTitle: '使用 TAICHI COACH，您可以:',
    bullets: ['建立更多自信', '提升活力', '放鬆並減少壓力', '長期照顧您的身體'],
    whatYouGet: '使用 TAICHI COACH 可獲得的內容',
  }),
}

function PricingBlock({ copy, selected, onSelect, consent, onConsent, selectedPlan, lang }: { copy: Copy; selected: string; onSelect: (id: string) => void; consent: boolean; onConsent: () => void; selectedPlan: (typeof PLANS)[number]; lang: LangCode }) {
  const checkoutUrl = `https://www.taichiwalkingcoach.com/${lang}-tcwalk-checkout-${selected}`
  const [showError, setShowError] = useState(false)

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!consent) {
      e.preventDefault()
      setShowError(true)
      setTimeout(() => setShowError(false), 600)
    }
  }

  return (
    <div className={styles.pricingBlock}>
      {PLANS.map((plan, idx) => {
        const localized = copy.plans[idx]
        return (
          <div key={plan.id}>
            {localized.badge && (
              <div className={styles.planBadgeWrap}>
                <span className={styles.planBadge}>{localized.badge.toUpperCase()}</span>
              </div>
            )}
            <button
              type="button"
              className={`${styles.planCard} ${selected === plan.id ? styles.planCardSelected : ''}`}
              onClick={() => onSelect(plan.id)}
              aria-pressed={selected === plan.id}
            >
              <div className={styles.planRadio}>
                {selected === plan.id && (
                  <svg viewBox="0 0 10 10" width="8" height="8"><circle cx="5" cy="5" r="3" fill="white" /></svg>
                )}
              </div>
              <div className={styles.planInfo}>
                <div className={styles.planNameRow}>
                  <span className={styles.planName}>{localized.name}</span>
                  <span className={styles.planDiscount}>{copy.discount(plan.discount)}</span>
                </div>
                <p className={styles.planDesc}>{localized.desc}</p>
                <div className={styles.planPrices}>
                  <span className={styles.planTotal}>{plan.total}</span>
                  <span className={styles.planOrig}>{plan.origTotal}</span>
                  <span className={styles.planPerDay}>{copy.perDay(plan.perDay)}</span>
                </div>
              </div>
            </button>
          </div>
        )
      })}

      <div className={styles.moneyBackRow}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        <span><strong>{copy.moneyBackRow}</strong></span>
      </div>

      <a
        className={styles.ctaBtn}
        href={checkoutUrl}
        onClick={handleCtaClick}
        aria-disabled={!consent}
      >{copy.cta}</a>

      <div
        className={`${styles.consentRow} ${showError ? styles.consentRowError : ''}`}
        onClick={() => { onConsent(); setShowError(false) }}
        role="checkbox"
        aria-checked={consent}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onConsent(); setShowError(false) } }}
      >
        <div className={`${styles.consentCheck} ${consent ? styles.consentChecked : ''} ${showError ? styles.consentCheckError : ''}`} aria-hidden="true">
          {consent && (
            <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
              <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className={styles.consentText}>
          {copy.consentPrefix}{' '}
          <a href="https://www.taichiwalkingcoach.com/en-tcwalk-terms-of-services" onClick={(e) => e.stopPropagation()}>{copy.terms}</a>,{' '}
          <a href="https://www.taichiwalkingcoach.com/en-tcwalk-privacy-policy" onClick={(e) => e.stopPropagation()}>{copy.privacy}</a>, and{' '}
          <a href="https://www.taichiwalkingcoach.com/en-tcwalk-money-back-guarantee" onClick={(e) => e.stopPropagation()}>{copy.refund}</a>.{' '}
          {copy.consentBody(selectedPlan.total, selectedPlan.origTotal)}{' '}
          <a href="mailto:hello@taichiwalkingcoach.app" onClick={(e) => e.stopPropagation()}>hello@taichiwalkingcoach.app</a>
        </span>
      </div>
      {showError && <p className={styles.consentErrorMsg}>Please accept the terms to continue.</p>}
    </div>
  )
}

export default function PaywallPage() {
  const { answers, _hydrated } = useQuizStore()
  const lang = useLangStore((s) => s.lang)
  const copy = localizeBrandValue(COPY[lang] ?? EN, lang)
  const [selected, setSelected] = useState<string>('12w')
  const [consent, setConsent] = useState(false)

  if (!_hydrated) return null

  const name = typeof answers[27] === 'string' ? answers[27].trim() : ''
  const heightCm = Number(answers[23]) || 165
  const weightLbs = Number(answers[24]) || 180
  const sleepKey = typeof answers[18] === 'string' ? answers[18] : '5-6'
  const activityKey = typeof answers[10] === 'string' ? answers[10] : 'intermediate'
  const rawGoals = Array.isArray(answers[3]) ? (answers[3] as string[]) : answers[3] ? [answers[3] as string] : []

  const bmi = calcBMI(weightLbs, heightCm)
  const bmiCat = getBMICategory(bmi)
  const waterL = (weightLbs * 0.453592 * 0.033).toFixed(1)
  const waterCups = Math.min(9, Math.max(1, Math.round(Number(waterL) / 0.25)))

  const fitnessAgeYears = (() => {
    let y = 0
    if (bmiCat === 'Obese') y += 8
    else if (bmiCat === 'Overweight') y += 4
    else if (bmiCat === 'Underweight') y += 2
    if (['sedentary', 'lightly-active', 'light'].includes(activityKey)) y += 4
    else if (['moderate', 'intermediate'].includes(activityKey)) y += 1
    if (['less-than-5', '<5', '5-6'].includes(sleepKey)) y += 2
    return Math.max(2, y)
  })()

  const selectedPlan = PLANS.find((p) => p.id === selected) ?? PLANS[1]
  const primaryGoal = rawGoals.length > 0 ? (copy.goalLabels[rawGoals[0]] ?? rawGoals[0]) : copy.goalLabels['lose-weight']
  const fitnessLevel = copy.fitnessLabels[activityKey] ?? copy.fitnessLabels.intermediate
  const sleepQuality = copy.sleepLabels[sleepKey] ?? copy.sleepLabels['5-6']
  const bmiContent = copy.bmi[bmiCat]

  return (
    <>
      <QuizHeader showBack={false} hideProgress />
      <main className={styles.main}>
        <div className={styles.content}>

          <h1 className={styles.pageTitle}>{copy.pageTitle}</h1>
          <p className={styles.pageSub}>{copy.pageSub}</p>

          <PricingBlock
            copy={copy}
            selected={selected}
            onSelect={setSelected}
            consent={consent}
            onConsent={() => setConsent((v) => !v)}
            selectedPlan={selectedPlan}
            lang={lang}
          />

          <div className={styles.block}>
            <h2 className={styles.heading}>{copy.yourResults}</h2>

            <BMIScale bmi={bmi} />

            <div className={`${styles.bmiCard} ${styles[`bmiCard${bmiCat}`]}`}>
              <div className={styles.bmiCardText}>
                <p className={styles.bmiCardTitle}>{bmiContent.title}</p>
                <p className={styles.bmiCardBody}>{bmiContent.text(bmi.toFixed(1))}</p>
              </div>
              <img
                src="/images/Quiz - 2026-03-19T133642.519.png"
                alt=""
                aria-hidden="true"
                className={styles.bmiCardImg}
              />
            </div>

            <div className={styles.resultStatsList}>
              {[
                { icon: '🎯', label: copy.primaryGoal, value: primaryGoal },
                { icon: '💪', label: copy.fitnessLevel, value: fitnessLevel },
                { icon: '😴', label: copy.sleepQuality, value: sleepQuality },
                { icon: '🧑', label: copy.fitnessAge, value: copy.fitnessAgeValue(fitnessAgeYears) },
              ].map((s) => (
                <div key={s.label} className={styles.resultStatCard}>
                  <div className={styles.resultStatIcon}>{s.icon}</div>
                  <div>
                    <p className={styles.resultStatLabel}>{s.label}</p>
                    <p className={styles.resultStatValue}>{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.statInfoCard}>
            <div className={styles.statInfoCardHeader}>
              <div className={styles.statInfoIcon}>🕐</div>
              <p className={styles.statInfoTitle}>{copy.workoutTitle}</p>
            </div>
            <div className={styles.statInfoCardFooter}>
              <span className={styles.statInfoNum}>7 <span className={styles.statInfoUnit}>min</span></span>
              <span className={styles.statInfoBadge}>{copy.workoutBadge}</span>
            </div>
          </div>

          <div className={styles.statInfoCard}>
            <div className={styles.statInfoCardHeader}>
              <div className={styles.statInfoIcon}>💧</div>
              <p className={styles.statInfoTitle}>{copy.waterTitle}</p>
            </div>
            <div className={styles.waterGlasses} aria-hidden="true">
              {Array.from({ length: waterCups }, (_, i) => (
                <svg key={i} className={styles.waterGlass} viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4 L4 36 Q4 38 6 38 L26 38 Q28 38 28 36 L26 4 Z" fill="#c8dff0" stroke="#8ab4d4" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M6 4 L26 4" stroke="#8ab4d4" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 18 Q8 15 16 17 Q24 19 27 16" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                </svg>
              ))}
            </div>
            <div className={styles.statInfoCardFooter}>
              <span className={styles.statInfoNum}>{waterL}</span>
              <span className={styles.statInfoBadge}>{copy.waterBadge}</span>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>{copy.readyHeading}</h2>
            <div className={styles.bulletCard}>
              <p className={styles.bulletTitle}>{copy.bulletTitle}</p>
              <ul className={styles.bulletList}>
                {copy.bullets.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>{copy.whatYouGet}</h2>

            {copy.features.map((f, i) => (
              <div key={f.title} className={styles.featureRow}>
                <img src={['/images/A personalized movement system.png', '/images/Simple daily direction.png', '/images/Adaptive guidance that follows you.png', '/images/Support when you need it most.png'][i]} alt="" aria-hidden="true" className={styles.featureImg} />
                <div>
                  <p className={styles.featureTitle}>{f.title}</p>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.socialBlock}>
            <p className={styles.socialText}>{copy.socialText}</p>
            <p className={styles.socialSub}>{copy.socialSub}</p>
            <button className={styles.ctaBtn} type="button">{copy.socialCta}</button>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>{copy.storiesHeading}</h2>

            {copy.stories.map((r, i) => (
              <div key={r.name} className={styles.reviewCard}>
                <div className={styles.reviewTop}>
                  <div className={styles.reviewer}>
                    <div className={styles.reviewAvatar}>
                      <img src={['/images/stories1.png', '/images/stories2.png', '/images/stories3.png'][i]} alt={r.name} />
                    </div>
                    <div>
                      <p className={styles.reviewName}>{r.name}</p>
                      <span className={styles.reviewStars}>⭐⭐⭐⭐⭐</span>
                    </div>
                  </div>
                </div>
                <p className={styles.reviewText}>
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>
            ))}
          </div>

          <div className={styles.personalHeading}>
            <h2 className={styles.pageTitleAlt}>{copy.personalHeading(name)}</h2>
          </div>

          <PricingBlock
            copy={copy}
            selected={selected}
            onSelect={setSelected}
            consent={consent}
            onConsent={() => setConsent((v) => !v)}
            selectedPlan={selectedPlan}
            lang={lang}
          />

          <div className={styles.guaranteeBlock}>
            <img src="/images/quarantee.png" alt="" aria-hidden="true" className={styles.guaranteeImg} />
            <h2 className={styles.guaranteeTitle}>{copy.guaranteeTitle}</h2>
            <p className={styles.guaranteeBody}>{copy.guaranteeBody}</p>
            <div className={styles.guaranteeLinks}>
              <a href="https://www.taichiwalkingcoach.com/en-tcwalk-terms-of-services">{copy.terms}</a>
              <span>|</span>
              <a href="https://www.taichiwalkingcoach.com/en-tcwalk-privacy-policy">{copy.privacy}</a>
              <span>|</span>
              <a href="https://www.taichiwalkingcoach.com/en-tcwalk-money-back-guarantee">{copy.refund}</a>
            </div>
          </div>

          <footer className={styles.footer}>
            <p className={styles.footerCopy}>{copy.footer}</p>
          </footer>

        </div>
      </main>
    </>
  )
}
