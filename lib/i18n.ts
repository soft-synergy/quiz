import type { LangCode } from './lang-store'
import { QUIZ_STEPS } from './quiz-data'
import type { QuizStep } from './quiz-data'

export const LANGUAGES: { code: LangCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'lt', label: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lv', label: 'Latviešu', flag: '🇱🇻' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'cz', label: 'Čeština', flag: '🇨🇿' },
  { code: 'dk', label: 'Dansk', flag: '🇩🇰' },
  { code: 'gr', label: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { code: 'hr', label: 'Hrvatski', flag: '🇭🇷' },
  { code: 'il', label: 'עברית', flag: '🇮🇱' },
  { code: 'jp', label: '日本語', flag: '🇯🇵' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'sk', label: 'Slovenčina', flag: '🇸🇰' },
  { code: 'tw', label: '繁體中文', flag: '🇹🇼' },
]

interface IntroTranslations {
  badge_quiz: string
  badge_tag: string
  headline: string
  age_group_label: string
  age_question: string
  img_alt: string
  lang_button_aria: string
  consent_prefix: string
  consent_tos: string
  consent_cookie: string
  consent_privacy: string
  consent_comma: string
  consent_and: string
  consent_error: string
  age_18_29: string
  age_30_39: string
  age_40_49: string
  age_50_plus: string
}

export interface UITranslations {
  continue: string
  skip: string
  go_back: string
  quiz_progress: string
}

export interface StepPageTranslations {
  error_range: (min: number, max: number, unit: string) => string
  bmi_checking: string
  bmi_underweight: (bmi: string) => string
  bmi_underweight_body: string
  bmi_normal: (bmi: string) => string
  bmi_normal_body: string
  bmi_overweight: (bmi: string) => string
  bmi_overweight_body: string
  bmi_obese: (bmi: string) => string
  bmi_obese_body: string
  goal_placeholder: string
  goal_weight_too_high: string
  goal_too_low: string
  goal_a_lot: string
  goal_moderate: string
  goal_small: string
  consent_text: string
  consent_privacy_link: string
  char_count: (n: number) => string
}

export interface ResultTranslations {
  header_label: string
  headline: string
  subtitle: string
  guide_text: string
  goal_line: (weight: number, date: string) => string
  cta: string
}

export interface Results28Translations {
  header_label: string
  your_weight: string
  now: string
  after_4_weeks: string
  week: (n: number) => string
  chart_note: string
  headline: string
}

export interface WellnessTranslations {
  header_label: string
  headline: string
  lifestyle_label: string
  eater_label: string
  motivation_label: string
  img_alt: string
  warning_title: string
  warning_desc: string
  bmi_normal_msg: string
  bmi_overweight_msg: string
  bmi_obese_msg: string
  lifestyle: Record<string, string>
  eater: { balanced: string; sweet: string; salty: string; emotional: string }
  motivation: { high: string; moderate: string; low: string }
}

export interface LoadingTranslations {
  header_label: string
  title: string
}

export interface EmailTranslations {
  header_label: string
  headline: string
  email_label: string
  placeholder: string
  clear_aria: string
  privacy_note: string
  privacy_link: string
}

interface QuizStepT {
  question?: string
  subtitle?: string
  placeholder?: string
  hintTitle?: string
  hint?: string
  buttonLabel?: string
  options?: Record<string, string>
  interstitial?: { headline?: string; body?: string; note?: string }
}

const intro: Record<LangCode, IntroTranslations> = {
  en: { badge_quiz:'1-minute quiz', badge_tag:'Find Your Personal Tai Chi Indoor Walking Plan', headline:'TAICHI COACH creates a simple, personalized indoor walking plan for weight loss', age_group_label:'Select your age range', age_question:'Which age group are you in?', img_alt:'Woman in green athletic wear standing full body', lang_button_aria:'Language: English', consent_prefix:'By continuing, you agree to our', consent_tos:'Terms of Service', consent_cookie:'Cookie Policy', consent_privacy:'Privacy Policy', consent_comma:',', consent_and:'and', consent_error:'Please accept the terms before continuing.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  lt: { badge_quiz:'1 minutės testas', badge_tag:'Atraskite savo asmeninį Tai Chi ėjimo namuose planą', headline:'TAICHI COACH sukuria paprastą, asmeniškai jums pritaikytą ėjimo namuose planą svorio mažinimui', age_group_label:'Pasirinkite savo amžiaus grupę', age_question:'Kuriai amžiaus grupei priklausote?', img_alt:'Moteris su žalia sportine apranga, visu ūgiu', lang_button_aria:'Kalba: lietuvių', consent_prefix:'Tęsdami sutinkate su mūsų', consent_tos:'Paslaugų teikimo sąlygomis', consent_cookie:'Slapukų politika', consent_privacy:'Privatumo politika', consent_comma:',', consent_and:'ir', consent_error:'Prieš tęsdami sutikite su sąlygomis.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  lv: { badge_quiz:'1 minūtes tests', badge_tag:'Atrodiet savu personīgo Tai Chi pastaigu telpās plānu', headline:'TAICHI COACH izveido vienkāršu, personalizētu pastaigu telpās plānu svara samazināšanai', age_group_label:'Izvēlieties savu vecuma grupu', age_question:'Kurā vecuma grupā jūs esat?', img_alt:'Sieviete zaļā sporta apģērbā pilnā augumā', lang_button_aria:'Valoda: latviešu', consent_prefix:'Turpinot, jūs piekrītat mūsu', consent_tos:'Pakalpojumu noteikumiem', consent_cookie:'Sīkdatņu politikai', consent_privacy:'Privātuma politikai', consent_comma:',', consent_and:'un', consent_error:'Pirms turpināt, lūdzu, apstipriniet noteikumus.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  ro: { badge_quiz:'Test de 1 minut', badge_tag:'Descoperiți planul dumneavoastră personal de mers Tai Chi în interior', headline:'TAICHI COACH creează un plan simplu, personalizat de mers în interior pentru slăbire', age_group_label:'Selectați grupa de vârstă', age_question:'Din ce grupă de vârstă faceți parte?', img_alt:'Femeie în echipament sportiv verde, văzută complet', lang_button_aria:'Limbă: română', consent_prefix:'Continuând, sunteți de acord cu', consent_tos:'Termenii de utilizare', consent_cookie:'Politica privind cookie-urile', consent_privacy:'Politica de confidențialitate', consent_comma:',', consent_and:'și', consent_error:'Vă rugăm să acceptați termenii înainte de a continua.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  cz: { badge_quiz:'1minutový kvíz', badge_tag:'Najděte svůj osobní plán Tai Chi chůze doma', headline:'TAICHI COACH vytváří jednoduchý, osobní plán domácí chůze pro hubnutí', age_group_label:'Vyberte svou věkovou skupinu', age_question:'Do které věkové skupiny patříte?', img_alt:'Žena v zeleném sportovním oblečení, celá postava', lang_button_aria:'Jazyk: čeština', consent_prefix:'Pokračováním souhlasíte s našimi', consent_tos:'Podmínkami služby', consent_cookie:'Zásadami používání cookies', consent_privacy:'Zásadami ochrany osobních údajů', consent_comma:',', consent_and:'a', consent_error:'Před pokračováním prosím přijměte podmínky.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  dk: { badge_quiz:'1 minuts quiz', badge_tag:'Find jeres personlige Tai Chi gåplan til indendørs brug', headline:'TAICHI COACH skaber en enkel, personlig indendørs gåplan til vægttab', age_group_label:'Vælg jeres aldersgruppe', age_question:'Hvilken aldersgruppe er I i?', img_alt:'Kvinde i grønt sportstøj i hel figur', lang_button_aria:'Sprog: dansk', consent_prefix:'Når I fortsætter, accepterer I vores', consent_tos:'Servicevilkår', consent_cookie:'Cookiepolitik', consent_privacy:'Privatlivspolitik', consent_comma:',', consent_and:'og', consent_error:'Accepter venligst vilkårene, før I fortsætter.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  gr: { badge_quiz:'Κουίζ 1 λεπτού', badge_tag:'Βρείτε το προσωπικό σας πρόγραμμα Tai Chi για περπάτημα στο σπίτι', headline:'Το TAICHI COACH δημιουργεί ένα απλό, εξατομικευμένο πρόγραμμα περπατήματος στο σπίτι για απώλεια βάρους', age_group_label:'Επιλέξτε την ηλικιακή σας ομάδα', age_question:'Σε ποια ηλικιακή ομάδα ανήκετε;', img_alt:'Γυναίκα με πράσινα αθλητικά ρούχα, ολόσωμη', lang_button_aria:'Γλώσσα: ελληνικά', consent_prefix:'Συνεχίζοντας, συμφωνείτε με τους', consent_tos:'Όρους χρήσης', consent_cookie:'Πολιτική cookies', consent_privacy:'Πολιτική απορρήτου', consent_comma:',', consent_and:'και', consent_error:'Παρακαλούμε αποδεχτείτε τους όρους πριν συνεχίσετε.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  hu: { badge_quiz:'1 perces kvíz', badge_tag:'Találják meg saját Tai Chi otthoni sétatervüket', headline:'A TAICHI COACH egyszerű, személyre szabott otthoni sétatervet készít a fogyáshoz', age_group_label:'Válasszák ki a korcsoportjukat', age_question:'Melyik korcsoportba tartoznak?', img_alt:'Nő zöld sportruhában, teljes alakos kép', lang_button_aria:'Nyelv: magyar', consent_prefix:'A folytatással elfogadják a', consent_tos:'Felhasználási feltételeket', consent_cookie:'Cookie szabályzatot', consent_privacy:'Adatvédelmi szabályzatot', consent_comma:',', consent_and:'és', consent_error:'A folytatás előtt kérjük, fogadják el a feltételeket.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  hr: { badge_quiz:'Kviz od 1 minute', badge_tag:'Pronađite svoj osobni Tai Chi plan hodanja kod kuće', headline:'TAICHI COACH stvara jednostavan, personaliziran plan hodanja kod kuće za mršavljenje', age_group_label:'Odaberite svoju dobnu skupinu', age_question:'Kojoj dobnoj skupini pripadate?', img_alt:'Žena u zelenoj sportskoj odjeći, cijelo tijelo', lang_button_aria:'Jezik: hrvatski', consent_prefix:'Nastavkom prihvaćate naše', consent_tos:'Uvjeti korištenja', consent_cookie:'Pravila o kolačićima', consent_privacy:'Pravila privatnosti', consent_comma:',', consent_and:'i', consent_error:'Prije nastavka prihvatite uvjete.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  il: { badge_quiz:'חידון של דקה', badge_tag:'מצאו את תוכנית הליכת הטאי צ׳י האישית שלכם לבית', headline:'TAICHI COACH יוצר תוכנית הליכה ביתית פשוטה ומותאמת אישית לירידה במשקל', age_group_label:'בחרו את קבוצת הגיל שלכם', age_question:'לאיזו קבוצת גיל אתם שייכים?', img_alt:'אישה בלבוש ספורט ירוק, תמונת גוף מלאה', lang_button_aria:'שפה: עברית', consent_prefix:'בהמשך אתם מסכימים ל', consent_tos:'תנאי השירות', consent_cookie:'מדיניות העוגיות', consent_privacy:'מדיניות הפרטיות', consent_comma:',', consent_and:'ו', consent_error:'אנא אשרו את התנאים לפני ההמשך.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  jp: { badge_quiz:'1分クイズ', badge_tag:'あなた専用のTai Chi室内ウォーキングプランを見つけましょう', headline:'TAICHI COACHは、減量のためのシンプルでパーソナルな室内ウォーキングプランを作成します', age_group_label:'年齢層を選択してください', age_question:'どの年齢層に当てはまりますか？', img_alt:'緑のスポーツウェアを着た全身の女性', lang_button_aria:'言語: 日本語', consent_prefix:'続行すると、以下に同意したことになります', consent_tos:'利用規約', consent_cookie:'Cookieポリシー', consent_privacy:'プライバシーポリシー', consent_comma:'、', consent_and:'および', consent_error:'続行する前に利用規約に同意してください。', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  ru: { badge_quiz:'Тест за 1 минуту', badge_tag:'Найдите свой персональный план домашней ходьбы Тай Чи', headline:'TAICHI COACH создаёт простой, персональный план домашней ходьбы для снижения веса', age_group_label:'Выберите свою возрастную группу', age_question:'К какой возрастной группе вы относитесь?', img_alt:'Женщина в зелёной спортивной одежде, в полный рост', lang_button_aria:'Язык: русский', consent_prefix:'Продолжая, вы соглашаетесь с нашими', consent_tos:'Условиями использования', consent_cookie:'Политикой cookies', consent_privacy:'Политикой конфиденциальности', consent_comma:',', consent_and:'и', consent_error:'Перед продолжением примите условия.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  sk: { badge_quiz:'1-minútový kvíz', badge_tag:'Nájdite svoj osobný plán Tai Chi chôdze doma', headline:'TAICHI COACH vytvára jednoduchý, personalizovaný plán chôdze doma na chudnutie', age_group_label:'Vyberte svoju vekovú skupinu', age_question:'Do ktorej vekovej skupiny patríte?', img_alt:'Žena v zelenom športovom oblečení, celá postava', lang_button_aria:'Jazyk: slovenčina', consent_prefix:'Pokračovaním súhlasíte s našimi', consent_tos:'Podmienkami služby', consent_cookie:'Zásadami používania cookies', consent_privacy:'Zásadami ochrany súkromia', consent_comma:',', consent_and:'a', consent_error:'Pred pokračovaním prijmite podmienky.', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
  tw: { badge_quiz:'1 分鐘測驗', badge_tag:'找到專屬於您的 Tai Chi 室內步行計畫', headline:'TAICHI COACH 為您打造簡單且個人化的室內步行減重計畫', age_group_label:'請選擇您的年齡區間', age_question:'您屬於哪個年齡層？', img_alt:'穿著綠色運動服的女性全身照', lang_button_aria:'語言：繁體中文', consent_prefix:'繼續即表示您同意我們的', consent_tos:'服務條款', consent_cookie:'Cookie 政策', consent_privacy:'隱私權政策', consent_comma:'、', consent_and:'及', consent_error:'繼續前請先接受條款。', age_18_29:'18-29', age_30_39:'30-39', age_40_49:'40-49', age_50_plus:'50+' },
}

const ui: Record<LangCode, UITranslations> = {
  en: { continue:'Continue', skip:'Skip this question', go_back:'Go back', quiz_progress:'Quiz progress' },
  lt: { continue:'Tęsti', skip:'Praleisti šį klausimą', go_back:'Grįžti', quiz_progress:'Testo eiga' },
  lv: { continue:'Turpināt', skip:'Izlaist šo jautājumu', go_back:'Atpakaļ', quiz_progress:'Testa progress' },
  ro: { continue:'Continuați', skip:'Săriți peste această întrebare', go_back:'Înapoi', quiz_progress:'Progresul testului' },
  cz: { continue:'Pokračovat', skip:'Přeskočit tuto otázku', go_back:'Zpět', quiz_progress:'Průběh kvízu' },
  dk: { continue:'Fortsæt', skip:'Spring dette spørgsmål over', go_back:'Tilbage', quiz_progress:'Quizforløb' },
  gr: { continue:'Συνέχεια', skip:'Παράλειψη αυτής της ερώτησης', go_back:'Πίσω', quiz_progress:'Πρόοδος κουίζ' },
  hu: { continue:'Tovább', skip:'Kérdés kihagyása', go_back:'Vissza', quiz_progress:'Kvíz előrehaladása' },
  hr: { continue:'Nastavi', skip:'Preskoči ovo pitanje', go_back:'Natrag', quiz_progress:'Napredak kviza' },
  il: { continue:'המשך', skip:'דלגו על השאלה הזו', go_back:'חזרה', quiz_progress:'התקדמות השאלון' },
  jp: { continue:'続ける', skip:'この質問をスキップ', go_back:'戻る', quiz_progress:'クイズの進行状況' },
  ru: { continue:'Продолжить', skip:'Пропустить этот вопрос', go_back:'Назад', quiz_progress:'Прогресс теста' },
  sk: { continue:'Pokračovať', skip:'Preskočiť túto otázku', go_back:'Späť', quiz_progress:'Priebeh kvízu' },
  tw: { continue:'繼續', skip:'跳過此題', go_back:'返回', quiz_progress:'測驗進度' },
}

const stepPage: Record<LangCode, StepPageTranslations> = {
  en: { error_range:(mn,mx,u)=>`Please enter a value between ${mn} and ${mx} ${u}`.trim(), bmi_checking:'Calculating your BMI. This helps us create the right plan for your body.', bmi_underweight:(b)=>`Your BMI is ${b}, which is below the usual range`, bmi_underweight_body:'You may benefit from gentle strength work and balanced nutrition.', bmi_normal:(b)=>`Your BMI is ${b}, which is in a healthy range`, bmi_normal_body:'You are on the right track. Keep going with your routine.', bmi_overweight:(b)=>`Your BMI is ${b}, which is considered overweight`, bmi_overweight_body:'Your weight needs more attention. We will use your score to tailor a plan to your needs and goals.', bmi_obese:(b)=>`Your BMI is ${b}, which is considered obesity`, bmi_obese_body:'Your weight may affect your health. We will use your score to build a plan that fits your needs.', goal_placeholder:'Enter your goal weight to see your personalized guidance', goal_weight_too_high:'Your goal weight must be lower than your current weight.', goal_too_low:'Your goal may be too low for your body. A healthy BMI usually falls between 18.5 and 24.9.', goal_a_lot:'That is a big goal, and that is okay. We will help you reach it step by step.', goal_moderate:'This is a realistic goal. Steady progress can improve your health.', goal_small:'You are already close to your goal. Small changes can still make a real difference.', consent_text:'I allow my health data to be used to create a personalized plan.', consent_privacy_link:'Privacy Policy', char_count:(n)=>`${n}/20` },
  lt: { error_range:(mn,mx,u)=>`Įveskite reikšmę nuo ${mn} iki ${mx} ${u}`.trim(), bmi_checking:'Skaičiuojame jūsų KMI. Tai padeda sukurti jūsų kūnui tinkamą planą.', bmi_underweight:(b)=>`Jūsų KMI yra ${b}, tai yra žemiau įprastos ribos`, bmi_underweight_body:'Jums gali būti naudingi švelnūs stiprinimo pratimai ir subalansuota mityba.', bmi_normal:(b)=>`Jūsų KMI yra ${b}, tai yra sveika riba`, bmi_normal_body:'Judate gera kryptimi. Tęskite savo rutiną.', bmi_overweight:(b)=>`Jūsų KMI yra ${b}, tai laikoma antsvoriu`, bmi_overweight_body:'Jūsų svoriui reikia daugiau dėmesio. Pritaikysime planą pagal jūsų poreikius ir tikslus.', bmi_obese:(b)=>`Jūsų KMI yra ${b}, tai laikoma nutukimu`, bmi_obese_body:'Jūsų svoris gali turėti įtakos sveikatai. Sukursime jums tinkamą planą.', goal_placeholder:'Įveskite tikslinį svorį, kad pamatytumėte asmenines rekomendacijas', goal_weight_too_high:'Tikslinis svoris turi būti mažesnis už dabartinį.', goal_too_low:'Jūsų tikslas gali būti per žemas jūsų kūnui. Sveikas KMI paprastai yra nuo 18,5 iki 24,9.', goal_a_lot:'Tai didelis tikslas, ir tai visiškai normalu. Padėsime jį pasiekti žingsnis po žingsnio.', goal_moderate:'Tai realus tikslas. Nuoseklus progresas gali pagerinti jūsų sveikatą.', goal_small:'Jūs jau arti savo tikslo. Net maži pokyčiai gali daug pakeisti.', consent_text:'Sutinku, kad mano sveikatos duomenys būtų naudojami asmeniniam planui sukurti.', consent_privacy_link:'Privatumo politika', char_count:(n)=>`${n}/20` },
  lv: { error_range:(mn,mx,u)=>`Lūdzu, ievadiet vērtību no ${mn} līdz ${mx} ${u}`.trim(), bmi_checking:'Aprēķinām jūsu ĶMI. Tas palīdz izveidot jūsu ķermenim piemērotu plānu.', bmi_underweight:(b)=>`Jūsu ĶMI ir ${b}, tas ir zem ierastā diapazona`, bmi_underweight_body:'Jums var palīdzēt saudzīgi spēka vingrinājumi un sabalansēts uzturs.', bmi_normal:(b)=>`Jūsu ĶMI ir ${b}, tas ir veselīgā diapazonā`, bmi_normal_body:'Jūs virzāties pareizajā virzienā. Turpiniet iesākto.', bmi_overweight:(b)=>`Jūsu ĶMI ir ${b}, tas tiek uzskatīts par lieko svaru`, bmi_overweight_body:'Jūsu svaram nepieciešama lielāka uzmanība. Plānu pielāgosim jūsu vajadzībām un mērķiem.', bmi_obese:(b)=>`Jūsu ĶMI ir ${b}, tas tiek uzskatīts par aptaukošanos`, bmi_obese_body:'Jūsu svars var ietekmēt veselību. Izveidosim jums piemērotu plānu.', goal_placeholder:'Ievadiet savu mērķa svaru, lai redzētu personalizētus ieteikumus', goal_weight_too_high:'Mērķa svaram jābūt mazākam par pašreizējo svaru.', goal_too_low:'Jūsu mērķis var būt pārāk zems jūsu ķermenim. Veselīgs ĶMI parasti ir no 18,5 līdz 24,9.', goal_a_lot:'Tas ir liels mērķis, un tas ir pilnīgi normāli. Mēs palīdzēsim to sasniegt soli pa solim.', goal_moderate:'Tas ir reālistisks mērķis. Vienmērīgs progress var uzlabot veselību.', goal_small:'Jūs jau esat tuvu savam mērķim. Arī nelielas pārmaiņas var dot labu rezultātu.', consent_text:'Es piekrītu, ka mani veselības dati tiek izmantoti personalizēta plāna izveidei.', consent_privacy_link:'Privātuma politika', char_count:(n)=>`${n}/20` },
  ro: { error_range:(mn,mx,u)=>`Vă rugăm să introduceți o valoare între ${mn} și ${mx} ${u}`.trim(), bmi_checking:'Calculăm IMC-ul dumneavoastră. Acest lucru ne ajută să creăm planul potrivit pentru corpul dumneavoastră.', bmi_underweight:(b)=>`IMC-ul dumneavoastră este ${b}, ceea ce este sub intervalul obișnuit`, bmi_underweight_body:'Ați putea beneficia de exerciții ușoare de tonifiere și de o alimentație echilibrată.', bmi_normal:(b)=>`IMC-ul dumneavoastră este ${b}, ceea ce se află într-un interval sănătos`, bmi_normal_body:'Mergeți într-o direcție bună. Continuați cu rutina dumneavoastră.', bmi_overweight:(b)=>`IMC-ul dumneavoastră este ${b}, ceea ce este considerat supraponderal`, bmi_overweight_body:'Greutatea dumneavoastră are nevoie de mai multă atenție. Vom adapta planul la nevoile și obiectivele dumneavoastră.', bmi_obese:(b)=>`IMC-ul dumneavoastră este ${b}, ceea ce este considerat obezitate`, bmi_obese_body:'Greutatea dumneavoastră vă poate afecta sănătatea. Vom crea un plan potrivit pentru dumneavoastră.', goal_placeholder:'Introduceți greutatea dorită pentru a vedea recomandările personalizate', goal_weight_too_high:'Greutatea dorită trebuie să fie mai mică decât greutatea actuală.', goal_too_low:'Obiectivul dumneavoastră poate fi prea mic pentru corpul dumneavoastră. Un IMC sănătos este, de obicei, între 18,5 și 24,9.', goal_a_lot:'Acesta este un obiectiv mare, și este în regulă. Vă vom ajuta să îl atingeți pas cu pas.', goal_moderate:'Acesta este un obiectiv realist. Progresul constant vă poate îmbunătăți sănătatea.', goal_small:'Sunteți deja aproape de obiectiv. Chiar și schimbările mici pot conta.', consent_text:'Permit utilizarea datelor mele de sănătate pentru a crea un plan personalizat.', consent_privacy_link:'Politica de confidențialitate', char_count:(n)=>`${n}/20` },
  cz: { error_range:(mn,mx,u)=>`Zadejte hodnotu mezi ${mn} a ${mx} ${u}`.trim(), bmi_checking:'Počítáme vaše BMI. Díky tomu můžeme vytvořit plán vhodný pro vaše tělo.', bmi_underweight:(b)=>`Vaše BMI je ${b}, což je pod běžným rozmezím`, bmi_underweight_body:'Může vám prospět jemné posilování a vyvážená strava.', bmi_normal:(b)=>`Vaše BMI je ${b}, což je ve zdravém rozmezí`, bmi_normal_body:'Jdete správným směrem. Pokračujte ve své rutině.', bmi_overweight:(b)=>`Vaše BMI je ${b}, což se považuje za nadváhu`, bmi_overweight_body:'Vaše váha potřebuje více pozornosti. Přizpůsobíme plán vašim potřebám a cílům.', bmi_obese:(b)=>`Vaše BMI je ${b}, což se považuje za obezitu`, bmi_obese_body:'Vaše váha může ovlivňovat zdraví. Vytvoříme plán, který vám bude sedět.', goal_placeholder:'Zadejte svou cílovou váhu a zobrazí se osobní doporučení', goal_weight_too_high:'Cílová váha musí být nižší než vaše současná váha.', goal_too_low:'Váš cíl může být pro vaše tělo příliš nízký. Zdravé BMI se obvykle pohybuje mezi 18,5 a 24,9.', goal_a_lot:'To je velký cíl, a to je v pořádku. Pomůžeme vám ho zvládnout krok za krokem.', goal_moderate:'Tohle je realistický cíl. Pravidelný pokrok může zlepšit vaše zdraví.', goal_small:'Ke svému cíli už máte blízko. I malé změny mohou přinést velký rozdíl.', consent_text:'Souhlasím s použitím svých zdravotních údajů k vytvoření osobního plánu.', consent_privacy_link:'Zásady ochrany osobních údajů', char_count:(n)=>`${n}/20` },
  dk: { error_range:(mn,mx,u)=>`Indtast en værdi mellem ${mn} og ${mx} ${u}`.trim(), bmi_checking:'Vi beregner jeres BMI. Det hjælper os med at skabe den rigtige plan til kroppen.', bmi_underweight:(b)=>`Jeres BMI er ${b}, hvilket ligger under det normale interval`, bmi_underweight_body:'Blid styrketræning og en balanceret kost kan være en fordel.', bmi_normal:(b)=>`Jeres BMI er ${b}, hvilket ligger i et sundt interval`, bmi_normal_body:'I er på rette vej. Fortsæt med jeres rutine.', bmi_overweight:(b)=>`Jeres BMI er ${b}, hvilket betragtes som overvægt`, bmi_overweight_body:'Jeres vægt kræver lidt mere opmærksomhed. Vi tilpasser planen til jeres behov og mål.', bmi_obese:(b)=>`Jeres BMI er ${b}, hvilket betragtes som fedme`, bmi_obese_body:'Jeres vægt kan påvirke helbredet. Vi bygger en plan, der passer til jeres behov.', goal_placeholder:'Indtast jeres målvægt for at se personlig vejledning', goal_weight_too_high:'Målvægten skal være lavere end den nuværende vægt.', goal_too_low:'Målet kan være for lavt for kroppen. Et sundt BMI ligger normalt mellem 18,5 og 24,9.', goal_a_lot:'Det er et stort mål, og det er helt okay. Vi hjælper jer trin for trin.', goal_moderate:'Det er et realistisk mål. Stabil fremgang kan forbedre helbredet.', goal_small:'I er allerede tæt på målet. Små ændringer kan stadig gøre en tydelig forskel.', consent_text:'Jeg giver samtykke til, at mine sundhedsdata bruges til at lave en personlig plan.', consent_privacy_link:'Privatlivspolitik', char_count:(n)=>`${n}/20` },
  gr: { error_range:(mn,mx,u)=>`Παρακαλώ εισάγετε τιμή από ${mn} έως ${mx} ${u}`.trim(), bmi_checking:'Υπολογίζουμε τον ΔΜΣ σας. Αυτό μας βοηθά να δημιουργήσουμε το σωστό πλάνο για το σώμα σας.', bmi_underweight:(b)=>`Ο ΔΜΣ σας είναι ${b}, κάτι που βρίσκεται κάτω από το συνηθισμένο εύρος`, bmi_underweight_body:'Ίσως σας βοηθήσουν ήπιες ασκήσεις ενδυνάμωσης και ισορροπημένη διατροφή.', bmi_normal:(b)=>`Ο ΔΜΣ σας είναι ${b}, κάτι που βρίσκεται σε υγιές εύρος`, bmi_normal_body:'Κινείστε προς τη σωστή κατεύθυνση. Συνεχίστε τη ρουτίνα σας.', bmi_overweight:(b)=>`Ο ΔΜΣ σας είναι ${b}, κάτι που θεωρείται υπέρβαρο`, bmi_overweight_body:'Το βάρος σας χρειάζεται περισσότερη προσοχή. Θα προσαρμόσουμε το πλάνο στις ανάγκες και τους στόχους σας.', bmi_obese:(b)=>`Ο ΔΜΣ σας είναι ${b}, κάτι που θεωρείται παχυσαρκία`, bmi_obese_body:'Το βάρος σας μπορεί να επηρεάζει την υγεία σας. Θα δημιουργήσουμε ένα πλάνο που σας ταιριάζει.', goal_placeholder:'Εισάγετε το βάρος στόχο σας για να δείτε εξατομικευμένη καθοδήγηση', goal_weight_too_high:'Το βάρος στόχος πρέπει να είναι χαμηλότερο από το τωρινό σας βάρος.', goal_too_low:'Ο στόχος σας ίσως είναι πολύ χαμηλός για το σώμα σας. Ένας υγιής ΔΜΣ συνήθως κυμαίνεται από 18,5 έως 24,9.', goal_a_lot:'Αυτός είναι ένας μεγάλος στόχος, και είναι απολύτως εντάξει. Θα σας βοηθήσουμε βήμα βήμα.', goal_moderate:'Αυτός είναι ένας ρεαλιστικός στόχος. Η σταθερή πρόοδος μπορεί να βελτιώσει την υγεία σας.', goal_small:'Είστε ήδη κοντά στον στόχο σας. Ακόμα και μικρές αλλαγές μπορούν να κάνουν διαφορά.', consent_text:'Επιτρέπω τη χρήση των δεδομένων υγείας μου για τη δημιουργία εξατομικευμένου πλάνου.', consent_privacy_link:'Πολιτική απορρήτου', char_count:(n)=>`${n}/20` },
  hu: { error_range:(mn,mx,u)=>`Adjon meg egy értéket ${mn} és ${mx} ${u} között`.trim(), bmi_checking:'Számoljuk a BMI-jét. Ez segít a testének megfelelő terv kialakításában.', bmi_underweight:(b)=>`Az Ön BMI-je ${b}, ami az átlagos tartomány alatt van`, bmi_underweight_body:'A kíméletes erősítő mozgás és a kiegyensúlyozott táplálkozás hasznos lehet.', bmi_normal:(b)=>`Az Ön BMI-je ${b}, ami egészséges tartományban van`, bmi_normal_body:'Jó irányba halad. Érdemes folytatni a kialakított rutint.', bmi_overweight:(b)=>`Az Ön BMI-je ${b}, ami túlsúlynak számít`, bmi_overweight_body:'A testsúlya több figyelmet igényel. A tervet az igényeihez és céljaihoz igazítjuk.', bmi_obese:(b)=>`Az Ön BMI-je ${b}, ami elhízásnak számít`, bmi_obese_body:'A testsúlya hatással lehet az egészségére. Olyan tervet készítünk, amely jól illik Önhöz.', goal_placeholder:'Adja meg a céltestsúlyát a személyre szabott útmutatáshoz', goal_weight_too_high:'A céltestsúlynak alacsonyabbnak kell lennie a jelenlegi testsúlynál.', goal_too_low:'Lehet, hogy ez a cél túl alacsony a testének. Az egészséges BMI általában 18,5 és 24,9 között van.', goal_a_lot:'Ez nagy cél, és ez teljesen rendben van. Lépésről lépésre segítünk elérni.', goal_moderate:'Ez reális cél. Az egyenletes haladás sokat javíthat az egészségen.', goal_small:'Már most is közel van a céljához. A kisebb változtatások is sokat számíthatnak.', consent_text:'Hozzájárulok, hogy egészségügyi adataimat személyre szabott terv készítéséhez használják fel.', consent_privacy_link:'Adatvédelmi szabályzat', char_count:(n)=>`${n}/20` },
  hr: { error_range:(mn,mx,u)=>`Unesite vrijednost između ${mn} i ${mx} ${u}`.trim(), bmi_checking:'Izračunavamo vaš BMI. To nam pomaže da izradimo plan koji odgovara vašem tijelu.', bmi_underweight:(b)=>`Vaš BMI je ${b}, što je ispod uobičajenog raspona`, bmi_underweight_body:'Mogli bi vam koristiti blagi treninzi snage i uravnotežena prehrana.', bmi_normal:(b)=>`Vaš BMI je ${b}, što je u zdravom rasponu`, bmi_normal_body:'Idete u dobrom smjeru. Nastavite sa svojom rutinom.', bmi_overweight:(b)=>`Vaš BMI je ${b}, što se smatra prekomjernom težinom`, bmi_overweight_body:'Vaša težina traži više pažnje. Plan ćemo prilagoditi vašim potrebama i ciljevima.', bmi_obese:(b)=>`Vaš BMI je ${b}, što se smatra pretilošću`, bmi_obese_body:'Vaša težina može utjecati na zdravlje. Izradit ćemo plan koji vam odgovara.', goal_placeholder:'Unesite ciljanu težinu kako biste vidjeli personalizirane smjernice', goal_weight_too_high:'Ciljana težina mora biti manja od vaše trenutačne težine.', goal_too_low:'Vaš cilj možda je prenizak za vaše tijelo. Zdrav BMI obično je između 18,5 i 24,9.', goal_a_lot:'To je velik cilj, i to je sasvim u redu. Pomoći ćemo vam da ga ostvarite korak po korak.', goal_moderate:'To je realan cilj. Stalan napredak može poboljšati vaše zdravlje.', goal_small:'Već ste blizu svog cilja. I male promjene mogu napraviti veliku razliku.', consent_text:'Dajem dopuštenje za korištenje mojih zdravstvenih podataka radi izrade personaliziranog plana.', consent_privacy_link:'Pravila privatnosti', char_count:(n)=>`${n}/20` },
  il: { error_range:(mn,mx,u)=>`נא להזין ערך בין ${mn} ל-${mx} ${u}`.trim(), bmi_checking:'אנחנו מחשבים את ה-BMI שלכם. זה עוזר לנו לבנות תוכנית שמתאימה לגוף שלכם.', bmi_underweight:(b)=>`ה-BMI שלכם הוא ${b}, והוא נמוך מהטווח המקובל`, bmi_underweight_body:'ייתכן שפעילות חיזוק עדינה ותזונה מאוזנת יועילו לכם.', bmi_normal:(b)=>`ה-BMI שלכם הוא ${b}, והוא בטווח בריא`, bmi_normal_body:'אתם בכיוון הנכון. המשיכו בשגרה שלכם.', bmi_overweight:(b)=>`ה-BMI שלכם הוא ${b}, והוא נחשב לעודף משקל`, bmi_overweight_body:'המשקל שלכם דורש יותר תשומת לב. נתאים את התוכנית לצרכים ולמטרות שלכם.', bmi_obese:(b)=>`ה-BMI שלכם הוא ${b}, והוא נחשב להשמנה`, bmi_obese_body:'המשקל שלכם עלול להשפיע על הבריאות. נבנה תוכנית שמתאימה לכם.', goal_placeholder:'הזינו את משקל היעד כדי לראות הכוונה אישית', goal_weight_too_high:'משקל היעד חייב להיות נמוך מהמשקל הנוכחי.', goal_too_low:'ייתכן שהיעד נמוך מדי עבור הגוף שלכם. BMI בריא נמצא בדרך כלל בין 18.5 ל-24.9.', goal_a_lot:'זה יעד גדול, וזה לגמרי בסדר. נעזור לכם להגיע אליו צעד אחר צעד.', goal_moderate:'זה יעד מציאותי. התקדמות עקבית יכולה לשפר את הבריאות שלכם.', goal_small:'אתם כבר קרובים ליעד. גם שינויים קטנים יכולים לעשות הבדל גדול.', consent_text:'אני מאשר שימוש בנתוני הבריאות שלי לצורך יצירת תוכנית אישית.', consent_privacy_link:'מדיניות הפרטיות', char_count:(n)=>`${n}/20` },
  jp: { error_range:(mn,mx,u)=>`${mn}〜${mx} ${u} の範囲で入力してください`.trim(), bmi_checking:'BMIを計算しています。体に合ったプランを作るために役立ちます。', bmi_underweight:(b)=>`あなたのBMIは ${b} で、一般的な範囲より低めです`, bmi_underweight_body:'やさしい筋力づくりとバランスのよい食事が役立つ可能性があります。', bmi_normal:(b)=>`あなたのBMIは ${b} で、健康的な範囲にあります`, bmi_normal_body:'よい方向に進んでいます。この調子で続けましょう。', bmi_overweight:(b)=>`あなたのBMIは ${b} で、過体重にあたります`, bmi_overweight_body:'体重には少し丁寧なケアが必要です。あなたの体と目標に合わせてプランを調整します。', bmi_obese:(b)=>`あなたのBMIは ${b} で、肥満にあたります`, bmi_obese_body:'体重が健康に影響する可能性があります。あなたに合った計画を作成します。', goal_placeholder:'目標体重を入力すると、あなた向けのガイダンスが表示されます', goal_weight_too_high:'目標体重は現在の体重より低く設定してください。', goal_too_low:'その目標は体に対して低すぎる可能性があります。健康的なBMIは通常18.5〜24.9です。', goal_a_lot:'大きな目標でも大丈夫です。一歩ずつ達成できるようにサポートします。', goal_moderate:'現実的な目標です。着実な前進が健康改善につながります。', goal_small:'目標までもう少しです。小さな変化でも十分に意味があります。', consent_text:'個別プラン作成のために、健康データを利用することに同意します。', consent_privacy_link:'プライバシーポリシー', char_count:(n)=>`${n}/20` },
  ru: { error_range:(mn,mx,u)=>`Введите значение от ${mn} до ${mx} ${u}`.trim(), bmi_checking:'Рассчитываем ваш ИМТ. Это помогает нам подобрать план, который подходит вашему телу.', bmi_underweight:(b)=>`Ваш ИМТ — ${b}, это ниже обычного диапазона`, bmi_underweight_body:'Вам могут подойти мягкие силовые упражнения и сбалансированное питание.', bmi_normal:(b)=>`Ваш ИМТ — ${b}, это здоровый диапазон`, bmi_normal_body:'Вы движетесь в правильном направлении. Продолжайте в том же темпе.', bmi_overweight:(b)=>`Ваш ИМТ — ${b}, это считается избыточным весом`, bmi_overweight_body:'Вашему весу нужно больше внимания. Мы адаптируем план под ваши цели и потребности.', bmi_obese:(b)=>`Ваш ИМТ — ${b}, это считается ожирением`, bmi_obese_body:'Ваш вес может влиять на здоровье. Мы создадим план, который подойдёт именно вам.', goal_placeholder:'Введите целевой вес, чтобы увидеть персональные рекомендации', goal_weight_too_high:'Целевой вес должен быть ниже текущего.', goal_too_low:'Ваша цель может быть слишком низкой для вашего тела. Здоровый ИМТ обычно находится в диапазоне от 18,5 до 24,9.', goal_a_lot:'Это большая цель, и это нормально. Мы поможем вам дойти до неё шаг за шагом.', goal_moderate:'Это реалистичная цель. Последовательный прогресс может улучшить ваше здоровье.', goal_small:'Вы уже близко к своей цели. Даже небольшие изменения могут дать заметный результат.', consent_text:'Я разрешаю использовать мои данные о здоровье для создания персонального плана.', consent_privacy_link:'Политика конфиденциальности', char_count:(n)=>`${n}/20` },
  sk: { error_range:(mn,mx,u)=>`Zadajte hodnotu od ${mn} do ${mx} ${u}`.trim(), bmi_checking:'Počítame vaše BMI. Pomáha nám to vytvoriť plán vhodný pre vaše telo.', bmi_underweight:(b)=>`Vaše BMI je ${b}, čo je pod bežným rozmedzím`, bmi_underweight_body:'Môže vám prospieť jemné posilňovanie a vyvážená strava.', bmi_normal:(b)=>`Vaše BMI je ${b}, čo je v zdravom rozmedzí`, bmi_normal_body:'Idete správnym smerom. Pokračujte vo svojej rutine.', bmi_overweight:(b)=>`Vaše BMI je ${b}, čo sa považuje za nadváhu`, bmi_overweight_body:'Vaša hmotnosť si vyžaduje viac pozornosti. Plán prispôsobíme vašim potrebám a cieľom.', bmi_obese:(b)=>`Vaše BMI je ${b}, čo sa považuje za obezitu`, bmi_obese_body:'Vaša hmotnosť môže ovplyvňovať zdravie. Vytvoríme plán, ktorý vám sadne.', goal_placeholder:'Zadajte svoju cieľovú hmotnosť a zobrazí sa osobné odporúčanie', goal_weight_too_high:'Cieľová hmotnosť musí byť nižšia ako vaša aktuálna hmotnosť.', goal_too_low:'Váš cieľ môže byť pre vaše telo príliš nízky. Zdravé BMI sa zvyčajne pohybuje medzi 18,5 a 24,9.', goal_a_lot:'To je veľký cieľ, a to je v poriadku. Pomôžeme vám ho dosiahnuť krok za krokom.', goal_moderate:'To je realistický cieľ. Stabilný pokrok môže zlepšiť vaše zdravie.', goal_small:'K svojmu cieľu už máte blízko. Aj malé zmeny môžu priniesť rozdiel.', consent_text:'Súhlasím s použitím svojich zdravotných údajov na vytvorenie personalizovaného plánu.', consent_privacy_link:'Zásady ochrany súkromia', char_count:(n)=>`${n}/20` },
  tw: { error_range:(mn,mx,u)=>`請輸入介於 ${mn} 到 ${mx} ${u} 之間的數值`.trim(), bmi_checking:'正在計算您的 BMI，這能幫助我們建立更適合您身體狀況的計畫。', bmi_underweight:(b)=>`您的 BMI 為 ${b}，低於一般常見範圍`, bmi_underweight_body:'溫和的肌力訓練與均衡飲食可能會對您有幫助。', bmi_normal:(b)=>`您的 BMI 為 ${b}，落在健康範圍內`, bmi_normal_body:'您正朝著正確方向前進，請持續保持。', bmi_overweight:(b)=>`您的 BMI 為 ${b}，屬於過重範圍`, bmi_overweight_body:'您的體重需要更多關注。我們會依照您的需求與目標調整計畫。', bmi_obese:(b)=>`您的 BMI 為 ${b}，屬於肥胖範圍`, bmi_obese_body:'您的體重可能會影響健康。我們會為您建立合適的計畫。', goal_placeholder:'輸入目標體重，即可查看個人化建議', goal_weight_too_high:'目標體重必須低於目前體重。', goal_too_low:'這個目標對您的身體來說可能過低。健康 BMI 通常介於 18.5 到 24.9 之間。', goal_a_lot:'這是一個很大的目標，但完全沒有問題，我們會一步一步陪您達成。', goal_moderate:'這是一個很實際的目標，穩定進步有助於改善健康。', goal_small:'您已經很接近目標了，即使是小小的改變也能帶來明顯差異。', consent_text:'我同意使用我的健康資料來建立個人化計畫。', consent_privacy_link:'隱私權政策', char_count:(n)=>`${n}/20` },
}

const result: Record<LangCode, ResultTranslations> = {
  en: { header_label:'Your Plan', headline:'Your personal plan is ready', subtitle:'You are moving in the right direction.', guide_text:'We will guide you step by step so you can stay consistent and see progress.', goal_line:(w,d)=>`${w} lbs by ${d}`, cta:'Get My Plan' },
  lt: { header_label:'Jūsų planas', headline:'Jūsų asmeninis planas paruoštas', subtitle:'Judate teisinga kryptimi.', guide_text:'Vesime jus žingsnis po žingsnio, kad galėtumėte išlikti nuoseklūs ir matyti pažangą.', goal_line:(w,d)=>`${w} svar. iki ${d}`, cta:'Gauti mano planą' },
  lv: { header_label:'Jūsu plāns', headline:'Jūsu personīgais plāns ir gatavs', subtitle:'Jūs virzāties pareizajā virzienā.', guide_text:'Mēs vadīsim jūs soli pa solim, lai jūs varētu saglabāt regularitāti un redzēt progresu.', goal_line:(w,d)=>`${w} lb līdz ${d}`, cta:'Saņemt manu plānu' },
  ro: { header_label:'Planul dumneavoastră', headline:'Planul personal este gata', subtitle:'Mergeți în direcția potrivită.', guide_text:'Vă vom ghida pas cu pas, ca să rămâneți consecvenți și să vedeți progresul.', goal_line:(w,d)=>`${w} lbs până la ${d}`, cta:'Vreau planul meu' },
  cz: { header_label:'Váš plán', headline:'Váš osobní plán je připraven', subtitle:'Jdete správným směrem.', guide_text:'Povedeme vás krok za krokem, abyste vydrželi a viděli pokrok.', goal_line:(w,d)=>`${w} lb do ${d}`, cta:'Získat můj plán' },
  dk: { header_label:'Jeres plan', headline:'Jeres personlige plan er klar', subtitle:'I bevæger jer i den rigtige retning.', guide_text:'Vi guider jer trin for trin, så I kan holde fast og se fremgang.', goal_line:(w,d)=>`${w} lbs inden ${d}`, cta:'Få min plan' },
  gr: { header_label:'Το πλάνο σας', headline:'Το προσωπικό σας πλάνο είναι έτοιμο', subtitle:'Κινείστε προς τη σωστή κατεύθυνση.', guide_text:'Θα σας καθοδηγήσουμε βήμα βήμα, ώστε να παραμείνετε σταθεροί και να βλέπετε πρόοδο.', goal_line:(w,d)=>`${w} λίβρες έως ${d}`, cta:'Αποκτήστε το πλάνο μου' },
  hu: { header_label:'Az Ön terve', headline:'Elkészült a személyre szabott terve', subtitle:'Jó irányba halad.', guide_text:'Lépésről lépésre segítünk, hogy kitartson és lássa a fejlődést.', goal_line:(w,d)=>`${w} font ${d} időpontra`, cta:'Kérem a tervemet' },
  hr: { header_label:'Vaš plan', headline:'Vaš osobni plan je spreman', subtitle:'Krećete se u pravom smjeru.', guide_text:'Vodit ćemo vas korak po korak kako biste ostali dosljedni i vidjeli napredak.', goal_line:(w,d)=>`${w} lbs do ${d}`, cta:'Preuzmi moj plan' },
  il: { header_label:'התוכנית שלכם', headline:'התוכנית האישית שלכם מוכנה', subtitle:'אתם נעים בכיוון הנכון.', guide_text:'נלווה אתכם צעד אחר צעד כדי שתוכלו להתמיד ולראות התקדמות.', goal_line:(w,d)=>`${w} ליברות עד ${d}`, cta:'קבלו את התוכנית שלי' },
  jp: { header_label:'あなたのプラン', headline:'あなた専用のプランが完成しました', subtitle:'順調に前へ進んでいます。', guide_text:'続けやすく、変化を実感できるように、私たちが一歩ずつご案内します。', goal_line:(w,d)=>`${d} までに ${w} lbs`, cta:'プランを見る' },
  ru: { header_label:'Ваш план', headline:'Ваш персональный план готов', subtitle:'Вы движетесь в правильном направлении.', guide_text:'Мы будем вести вас шаг за шагом, чтобы вам было легче сохранять регулярность и видеть результат.', goal_line:(w,d)=>`${w} фунтов к ${d}`, cta:'Получить мой план' },
  sk: { header_label:'Váš plán', headline:'Váš osobný plán je pripravený', subtitle:'Idete správnym smerom.', guide_text:'Budeme vás viesť krok za krokom, aby ste vydržali a videli pokrok.', goal_line:(w,d)=>`${w} lb do ${d}`, cta:'Získať môj plán' },
  tw: { header_label:'您的計畫', headline:'您的個人化計畫已準備完成', subtitle:'您正朝著正確方向前進。', guide_text:'我們會一步一步引導您，幫助您持續下去並看見進展。', goal_line:(w,d)=>`${d} 前達到 ${w} 磅`, cta:'查看我的計畫' },
}

const results28: Record<LangCode, Results28Translations> = {
  en: { header_label:'Your Plan', your_weight:'Your weight', now:'Now', after_4_weeks:'After 4 weeks', week:(n)=>`Week ${n}`, chart_note:'This chart is for illustrative purposes only', headline:'Get visible results in only 28 days!' },
  lt: { header_label:'Jūsų planas', your_weight:'Jūsų svoris', now:'Dabar', after_4_weeks:'Po 4 savaičių', week:(n)=>`${n} savaitė`, chart_note:'Ši diagrama skirta tik iliustracijai', headline:'Pamatykite matomus rezultatus vos per 28 dienas!' },
  lv: { header_label:'Jūsu plāns', your_weight:'Jūsu svars', now:'Tagad', after_4_weeks:'Pēc 4 nedēļām', week:(n)=>`${n}. nedēļa`, chart_note:'Šī diagramma ir tikai ilustratīva', headline:'Redzami rezultāti jau 28 dienās!' },
  ro: { header_label:'Planul dumneavoastră', your_weight:'Greutatea dumneavoastră', now:'Acum', after_4_weeks:'După 4 săptămâni', week:(n)=>`Săptămâna ${n}`, chart_note:'Acest grafic are doar rol ilustrativ', headline:'Obțineți rezultate vizibile în doar 28 de zile!' },
  cz: { header_label:'Váš plán', your_weight:'Vaše váha', now:'Teď', after_4_weeks:'Za 4 týdny', week:(n)=>`${n}. týden`, chart_note:'Tento graf je pouze ilustrativní', headline:'Viditelné výsledky už za 28 dní!' },
  dk: { header_label:'Jeres plan', your_weight:'Jeres vægt', now:'Nu', after_4_weeks:'Efter 4 uger', week:(n)=>`Uge ${n}`, chart_note:'Denne graf er kun vejledende', headline:'Få synlige resultater på kun 28 dage!' },
  gr: { header_label:'Το πλάνο σας', your_weight:'Το βάρος σας', now:'Τώρα', after_4_weeks:'Μετά από 4 εβδομάδες', week:(n)=>`Εβδομάδα ${n}`, chart_note:'Αυτό το γράφημα είναι μόνο ενδεικτικό', headline:'Δείτε ορατά αποτελέσματα σε μόλις 28 ημέρες!' },
  hu: { header_label:'Az Ön terve', your_weight:'Az Ön súlya', now:'Most', after_4_weeks:'4 hét múlva', week:(n)=>`${n}. hét`, chart_note:'Ez a grafikon csak szemléltető jellegű', headline:'Látható eredmények már 28 nap alatt!' },
  hr: { header_label:'Vaš plan', your_weight:'Vaša težina', now:'Sada', after_4_weeks:'Nakon 4 tjedna', week:(n)=>`${n}. tjedan`, chart_note:'Ovaj graf služi samo kao ilustracija', headline:'Vidljivi rezultati u samo 28 dana!' },
  il: { header_label:'התוכנית שלכם', your_weight:'המשקל שלכם', now:'עכשיו', after_4_weeks:'אחרי 4 שבועות', week:(n)=>`שבוע ${n}`, chart_note:'התרשים הזה מיועד להמחשה בלבד', headline:'תוצאות נראות לעין כבר בתוך 28 ימים!' },
  jp: { header_label:'あなたのプラン', your_weight:'現在の体重', now:'今', after_4_weeks:'4週間後', week:(n)=>`${n}週目`, chart_note:'このグラフはイメージです', headline:'たった28日で目に見える変化を目指しましょう！' },
  ru: { header_label:'Ваш план', your_weight:'Ваш вес', now:'Сейчас', after_4_weeks:'Через 4 недели', week:(n)=>`${n}-я неделя`, chart_note:'Этот график приведён только для наглядности', headline:'Заметные результаты всего за 28 дней!' },
  sk: { header_label:'Váš plán', your_weight:'Vaša hmotnosť', now:'Teraz', after_4_weeks:'Po 4 týždňoch', week:(n)=>`${n}. týždeň`, chart_note:'Tento graf má len ilustračný charakter', headline:'Viditeľné výsledky už za 28 dní!' },
  tw: { header_label:'您的計畫', your_weight:'您的體重', now:'現在', after_4_weeks:'4 週後', week:(n)=>`第 ${n} 週`, chart_note:'此圖表僅供示意參考', headline:'只要 28 天，就能看見明顯變化！' },
}

const wellness: Record<LangCode, WellnessTranslations> = {
  en: { header_label:'Wellness Profile', headline:'Here is your personal profile', lifestyle_label:'Lifestyle', eater_label:'Type of Eater', motivation_label:'Fitness Motivation', img_alt:'Person in athletic wear', warning_title:'Risks for an unhealthy BMI', warning_desc:'Your weight is risky for your health.', bmi_normal_msg:'Your BMI is in a healthy range. Keep maintaining your good habits.', bmi_overweight_msg:'Your BMI is above the usual range. Our plan will help you improve step by step.', bmi_obese_msg:'Your BMI is higher than recommended. We will guide you with a safe, personalized plan.', lifestyle:{'on-feet':'Active','active':'Moderately active','sitting':'Mostly sedentary','advanced':'Very active','intermediate':'Moderately active','beginner':'Light'}, eater:{balanced:'Balanced',sweet:'Sweet tooth',salty:'Salty snacker',emotional:'Emotional eater'}, motivation:{high:'High',moderate:'Moderate',low:'Low'} },
  lt: { header_label:'Savijautos profilis', headline:'Štai jūsų asmeninis profilis', lifestyle_label:'Gyvenimo būdas', eater_label:'Mitybos tipas', motivation_label:'Motyvacija', img_alt:'Žmogus su sportine apranga', warning_title:'Nesveiko KMI rizikos', warning_desc:'Jūsų svoris gali kelti riziką sveikatai.', bmi_normal_msg:'Jūsų KMI yra sveikame diapazone. Išlaikykite gerus įpročius.', bmi_overweight_msg:'Jūsų KMI viršija įprastą ribą. Mūsų planas padės judėti pirmyn žingsnis po žingsnio.', bmi_obese_msg:'Jūsų KMI yra aukštesnis nei rekomenduojama. Jus lydėsime saugiu, asmenišku planu.', lifestyle:{'on-feet':'Aktyvus','active':'Vidutiniškai aktyvus','sitting':'Daugiausia sėdimas','advanced':'Labai aktyvus','intermediate':'Vidutiniškai aktyvus','beginner':'Lengvas'}, eater:{balanced:'Subalansuotas',sweet:'Mėgstantis saldumynus',salty:'Mėgstantis sūrų maistą',emotional:'Valgantis dėl emocijų'}, motivation:{high:'Aukšta',moderate:'Vidutinė',low:'Žema'} },
  lv: { header_label:'Labsajūtas profils', headline:'Lūk, jūsu personīgais profils', lifestyle_label:'Dzīvesveids', eater_label:'Ēšanas tips', motivation_label:'Motivācija', img_alt:'Persona sporta apģērbā', warning_title:'Neveselīga ĶMI riski', warning_desc:'Jūsu svars var radīt risku veselībai.', bmi_normal_msg:'Jūsu ĶMI ir veselīgā diapazonā. Saglabājiet savus labos ieradumus.', bmi_overweight_msg:'Jūsu ĶMI ir virs ierastā diapazona. Mūsu plāns palīdzēs uzlaboties soli pa solim.', bmi_obese_msg:'Jūsu ĶMI ir augstāks nekā ieteikts. Mēs jūs vadīsim ar drošu, personalizētu plānu.', lifestyle:{'on-feet':'Aktīvs','active':'Vidēji aktīvs','sitting':'Pārsvarā sēdošs','advanced':'Ļoti aktīvs','intermediate':'Vidēji aktīvs','beginner':'Viegls'}, eater:{balanced:'Sabalansēts',sweet:'Saldummīlis',salty:'Sāļo uzkodu cienītājs',emotional:'Emocionāls ēdājs'}, motivation:{high:'Augsta',moderate:'Vidēja',low:'Zema'} },
  ro: { header_label:'Profil de bunăstare', headline:'Iată profilul dumneavoastră personal', lifestyle_label:'Stil de viață', eater_label:'Tip de alimentație', motivation_label:'Motivație', img_alt:'Persoană în echipament sportiv', warning_title:'Riscurile unui IMC nesănătos', warning_desc:'Greutatea dumneavoastră poate reprezenta un risc pentru sănătate.', bmi_normal_msg:'IMC-ul dumneavoastră este într-un interval sănătos. Păstrați-vă obiceiurile bune.', bmi_overweight_msg:'IMC-ul dumneavoastră este peste intervalul obișnuit. Planul nostru vă va ajuta pas cu pas.', bmi_obese_msg:'IMC-ul dumneavoastră este mai mare decât recomandat. Vă vom ghida cu un plan sigur și personalizat.', lifestyle:{'on-feet':'Activ','active':'Moderat activ','sitting':'Mai mult sedentar','advanced':'Foarte activ','intermediate':'Moderat activ','beginner':'Ușor'}, eater:{balanced:'Echilibrat',sweet:'Pofticios de dulce',salty:'Amator de gustări sărate',emotional:'Mănânc emoțional'}, motivation:{high:'Ridicată',moderate:'Moderată',low:'Scăzută'} },
  cz: { header_label:'Profil pohody', headline:'Toto je váš osobní profil', lifestyle_label:'Životní styl', eater_label:'Stravovací typ', motivation_label:'Motivace', img_alt:'Osoba ve sportovním oblečení', warning_title:'Rizika nezdravého BMI', warning_desc:'Vaše váha může představovat zdravotní riziko.', bmi_normal_msg:'Vaše BMI je ve zdravém rozmezí. Udržujte si dobré návyky.', bmi_overweight_msg:'Vaše BMI je nad běžným rozmezím. Náš plán vám pomůže zlepšovat se krok za krokem.', bmi_obese_msg:'Vaše BMI je vyšší, než se doporučuje. Provedeme vás bezpečným a osobním plánem.', lifestyle:{'on-feet':'Aktivní','active':'Středně aktivní','sitting':'Převážně sedavý','advanced':'Velmi aktivní','intermediate':'Středně aktivní','beginner':'Lehký'}, eater:{balanced:'Vyvážený',sweet:'Milovník sladkého',salty:'Milovník slaného',emotional:'Jím podle emocí'}, motivation:{high:'Vysoká',moderate:'Střední',low:'Nízká'} },
  dk: { header_label:'Trivselsprofil', headline:'Her er jeres personlige profil', lifestyle_label:'Livsstil', eater_label:'Spisevaner', motivation_label:'Motivation', img_alt:'Person i sportstøj', warning_title:'Risici ved et usundt BMI', warning_desc:'Jeres vægt kan udgøre en risiko for helbredet.', bmi_normal_msg:'Jeres BMI ligger i et sundt interval. Bevar de gode vaner.', bmi_overweight_msg:'Jeres BMI ligger over det normale interval. Vores plan hjælper jer frem trin for trin.', bmi_obese_msg:'Jeres BMI er højere end anbefalet. Vi guider jer med en sikker, personlig plan.', lifestyle:{'on-feet':'Aktiv','active':'Moderat aktiv','sitting':'Mest stillesiddende','advanced':'Meget aktiv','intermediate':'Moderat aktiv','beginner':'Let'}, eater:{balanced:'Balanceret',sweet:'Slikmund',salty:'Elsker salte snacks',emotional:'Følelsesstyret spiser'}, motivation:{high:'Høj',moderate:'Mellem',low:'Lav'} },
  gr: { header_label:'Προφίλ ευεξίας', headline:'Αυτό είναι το προσωπικό σας προφίλ', lifestyle_label:'Τρόπος ζωής', eater_label:'Τύπος διατροφής', motivation_label:'Κίνητρο', img_alt:'Άτομο με αθλητικά ρούχα', warning_title:'Κίνδυνοι από μη υγιή ΔΜΣ', warning_desc:'Το βάρος σας μπορεί να αποτελεί κίνδυνο για την υγεία.', bmi_normal_msg:'Ο ΔΜΣ σας βρίσκεται σε υγιές εύρος. Συνεχίστε τις καλές σας συνήθειες.', bmi_overweight_msg:'Ο ΔΜΣ σας είναι πάνω από το συνηθισμένο εύρος. Το πλάνο μας θα σας βοηθήσει βήμα βήμα.', bmi_obese_msg:'Ο ΔΜΣ σας είναι υψηλότερος από το προτεινόμενο. Θα σας καθοδηγήσουμε με ένα ασφαλές, προσωπικό πλάνο.', lifestyle:{'on-feet':'Δραστήριος','active':'Μέτρια δραστήριος','sitting':'Κυρίως καθιστικός','advanced':'Πολύ δραστήριος','intermediate':'Μέτρια δραστήριος','beginner':'Ήπιος'}, eater:{balanced:'Ισορροπημένος',sweet:'Λάτρης των γλυκών',salty:'Λάτρης των αλμυρών σνακ',emotional:'Τρώω συναισθηματικά'}, motivation:{high:'Υψηλό',moderate:'Μέτριο',low:'Χαμηλό'} },
  hu: { header_label:'Jólléti profil', headline:'Íme az Ön személyes profilja', lifestyle_label:'Életmód', eater_label:'Táplálkozási típus', motivation_label:'Motiváció', img_alt:'Sportos öltözetű személy', warning_title:'Az egészségtelen BMI kockázatai', warning_desc:'A testsúly egészségügyi kockázatot jelenthet.', bmi_normal_msg:'A BMI-je egészséges tartományban van. Tartsa meg a jó szokásait.', bmi_overweight_msg:'A BMI-je a szokásos tartomány felett van. A tervünk lépésről lépésre segít.', bmi_obese_msg:'A BMI-je magasabb az ajánlottnál. Biztonságos, személyre szabott tervvel támogatjuk.', lifestyle:{'on-feet':'Aktív','active':'Közepesen aktív','sitting':'Többnyire ülő','advanced':'Nagyon aktív','intermediate':'Közepesen aktív','beginner':'Könnyű'}, eater:{balanced:'Kiegyensúlyozott',sweet:'Édesszájú',salty:'Sós nasi kedvelő',emotional:'Érzelmi evő'}, motivation:{high:'Magas',moderate:'Közepes',low:'Alacsony'} },
  hr: { header_label:'Profil dobrobiti', headline:'Ovo je vaš osobni profil', lifestyle_label:'Način života', eater_label:'Tip prehrane', motivation_label:'Motivacija', img_alt:'Osoba u sportskoj odjeći', warning_title:'Rizici nezdravog BMI-ja', warning_desc:'Vaša težina može predstavljati rizik za zdravlje.', bmi_normal_msg:'Vaš BMI je u zdravom rasponu. Zadržite dobre navike.', bmi_overweight_msg:'Vaš BMI je iznad uobičajenog raspona. Naš plan pomoći će vam korak po korak.', bmi_obese_msg:'Vaš BMI je viši od preporučenog. Vodit ćemo vas sigurnim, personaliziranim planom.', lifestyle:{'on-feet':'Aktivan','active':'Umjereno aktivan','sitting':'Uglavnom sjedilački','advanced':'Vrlo aktivan','intermediate':'Umjereno aktivan','beginner':'Lagano'}, eater:{balanced:'Uravnotežen',sweet:'Ljubitelj slatkoga',salty:'Ljubitelj slanih grickalica',emotional:'Jedem pod utjecajem emocija'}, motivation:{high:'Visoka',moderate:'Srednja',low:'Niska'} },
  il: { header_label:'פרופיל בריאות', headline:'זה הפרופיל האישי שלכם', lifestyle_label:'אורח חיים', eater_label:'דפוס אכילה', motivation_label:'מוטיבציה', img_alt:'אדם בלבוש ספורטיבי', warning_title:'סיכונים של BMI לא תקין', warning_desc:'המשקל שלכם עלול להוות סיכון בריאותי.', bmi_normal_msg:'ה-BMI שלכם בטווח בריא. המשיכו לשמור על ההרגלים הטובים.', bmi_overweight_msg:'ה-BMI שלכם מעל הטווח המקובל. התוכנית שלנו תעזור לכם להשתפר צעד אחר צעד.', bmi_obese_msg:'ה-BMI שלכם גבוה מהמומלץ. נלווה אתכם עם תוכנית בטוחה ואישית.', lifestyle:{'on-feet':'פעילים','active':'פעילים במידה בינונית','sitting':'יושבים רוב הזמן','advanced':'פעילים מאוד','intermediate':'פעילים במידה בינונית','beginner':'קל'}, eater:{balanced:'מאוזנים',sweet:'חובבי מתוק',salty:'אוהבי מלוח',emotional:'אוכלים רגשית'}, motivation:{high:'גבוהה',moderate:'בינונית',low:'נמוכה'} },
  jp: { header_label:'ウェルネスプロフィール', headline:'こちらがあなたのプロフィールです', lifestyle_label:'ライフスタイル', eater_label:'食のタイプ', motivation_label:'モチベーション', img_alt:'スポーツウェアを着た人物', warning_title:'不健康なBMIのリスク', warning_desc:'体重が健康リスクにつながる可能性があります。', bmi_normal_msg:'BMIは健康的な範囲です。今の良い習慣を続けましょう。', bmi_overweight_msg:'BMIは一般的な範囲より高めです。私たちのプランで少しずつ整えていきましょう。', bmi_obese_msg:'BMIは推奨より高めです。安全であなたに合ったプランでサポートします。', lifestyle:{'on-feet':'活動的','active':'やや活動的','sitting':'座っている時間が長い','advanced':'とても活動的','intermediate':'やや活動的','beginner':'軽め'}, eater:{balanced:'バランス型',sweet:'甘い物好き',salty:'しょっぱい物好き',emotional:'気分で食べがち'}, motivation:{high:'高い',moderate:'普通',low:'低い'} },
  ru: { header_label:'Профиль самочувствия', headline:'Вот ваш персональный профиль', lifestyle_label:'Образ жизни', eater_label:'Пищевые привычки', motivation_label:'Мотивация', img_alt:'Человек в спортивной одежде', warning_title:'Риски нездорового ИМТ', warning_desc:'Ваш вес может создавать риск для здоровья.', bmi_normal_msg:'Ваш ИМТ находится в здоровом диапазоне. Сохраняйте свои хорошие привычки.', bmi_overweight_msg:'Ваш ИМТ выше обычного диапазона. Наш план поможет вам двигаться вперёд шаг за шагом.', bmi_obese_msg:'Ваш ИМТ выше рекомендуемого. Мы проведём вас с помощью безопасного и персонального плана.', lifestyle:{'on-feet':'Активный','active':'Умеренно активный','sitting':'Преимущественно сидячий','advanced':'Очень активный','intermediate':'Умеренно активный','beginner':'Лёгкий'}, eater:{balanced:'Сбалансированный',sweet:'Любит сладкое',salty:'Любит солёные снеки',emotional:'Ест на эмоциях'}, motivation:{high:'Высокая',moderate:'Средняя',low:'Низкая'} },
  sk: { header_label:'Profil pohody', headline:'Toto je váš osobný profil', lifestyle_label:'Životný štýl', eater_label:'Typ stravovania', motivation_label:'Motivácia', img_alt:'Osoba v športovom oblečení', warning_title:'Riziká nezdravého BMI', warning_desc:'Vaša hmotnosť môže predstavovať zdravotné riziko.', bmi_normal_msg:'Vaše BMI je v zdravom rozmedzí. Zachovajte si dobré návyky.', bmi_overweight_msg:'Vaše BMI je nad bežným rozmedzím. Náš plán vám pomôže zlepšovať sa krok po kroku.', bmi_obese_msg:'Vaše BMI je vyššie, než sa odporúča. Povedieme vás bezpečným a osobným plánom.', lifestyle:{'on-feet':'Aktívny','active':'Stredne aktívny','sitting':'Prevažne sedavý','advanced':'Veľmi aktívny','intermediate':'Stredne aktívny','beginner':'Ľahký'}, eater:{balanced:'Vyvážený',sweet:'Milovník sladkého',salty:'Milovník slaného',emotional:'Jedáva podľa emócií'}, motivation:{high:'Vysoká',moderate:'Stredná',low:'Nízka'} },
  tw: { header_label:'健康概況', headline:'這是您的個人化概況', lifestyle_label:'生活型態', eater_label:'飲食類型', motivation_label:'動力程度', img_alt:'穿著運動服的人物', warning_title:'不健康 BMI 的風險', warning_desc:'您的體重可能對健康造成風險。', bmi_normal_msg:'您的 BMI 落在健康範圍內，請持續保持良好習慣。', bmi_overweight_msg:'您的 BMI 高於一般範圍，我們的計畫會一步一步幫助您改善。', bmi_obese_msg:'您的 BMI 高於建議範圍，我們會以安全且個人化的方式引導您。', lifestyle:{'on-feet':'活躍','active':'中等活躍','sitting':'大多久坐','advanced':'非常活躍','intermediate':'中等活躍','beginner':'輕度'}, eater:{balanced:'均衡型',sweet:'愛吃甜食',salty:'愛吃鹹食',emotional:'情緒型進食'}, motivation:{high:'高',moderate:'中',low:'低'} },
}

const loading: Record<LangCode, LoadingTranslations> = {
  en: { header_label:'Your Plan', title:'Creating your personalized plan...' },
  lt: { header_label:'Jūsų planas', title:'Kuriame jūsų asmeninį planą...' },
  lv: { header_label:'Jūsu plāns', title:'Veidojam jūsu personalizēto plānu...' },
  ro: { header_label:'Planul dumneavoastră', title:'Creăm planul dumneavoastră personalizat...' },
  cz: { header_label:'Váš plán', title:'Vytváříme váš osobní plán...' },
  dk: { header_label:'Jeres plan', title:'Vi opretter jeres personlige plan...' },
  gr: { header_label:'Το πλάνο σας', title:'Δημιουργούμε το προσωπικό σας πλάνο...' },
  hu: { header_label:'Az Ön terve', title:'Készítjük a személyre szabott tervét...' },
  hr: { header_label:'Vaš plan', title:'Izrađujemo vaš personalizirani plan...' },
  il: { header_label:'התוכנית שלכם', title:'אנחנו מכינים את התוכנית האישית שלכם...' },
  jp: { header_label:'あなたのプラン', title:'あなた専用のプランを作成しています...' },
  ru: { header_label:'Ваш план', title:'Мы создаём ваш персональный план...' },
  sk: { header_label:'Váš plán', title:'Pripravujeme váš personalizovaný plán...' },
  tw: { header_label:'您的計畫', title:'正在建立您的個人化計畫...' },
}

const email: Record<LangCode, EmailTranslations> = {
  en: { header_label:'Your Plan', headline:'Where should we send your plan?', email_label:'Email address', placeholder:'Enter your email', clear_aria:'Clear email', privacy_note:'We respect your privacy. Read our {link}.', privacy_link:'Privacy Policy' },
  lt: { header_label:'Jūsų planas', headline:'Kur turėtume atsiųsti jūsų planą?', email_label:'El. pašto adresas', placeholder:'Įveskite savo el. paštą', clear_aria:'Išvalyti el. paštą', privacy_note:'Mes gerbiame jūsų privatumą. Perskaitykite mūsų {link}.', privacy_link:'Privatumo politiką' },
  lv: { header_label:'Jūsu plāns', headline:'Uz kuru e-pastu nosūtīt jūsu plānu?', email_label:'E-pasta adrese', placeholder:'Ievadiet savu e-pastu', clear_aria:'Notīrīt e-pastu', privacy_note:'Mēs cienām jūsu privātumu. Izlasiet mūsu {link}.', privacy_link:'Privātuma politiku' },
  ro: { header_label:'Planul dumneavoastră', headline:'Unde să trimitem planul?', email_label:'Adresă de e-mail', placeholder:'Introduceți adresa de e-mail', clear_aria:'Ștergeți e-mailul', privacy_note:'Respectăm confidențialitatea dumneavoastră. Citiți {link}.', privacy_link:'Politica de confidențialitate' },
  cz: { header_label:'Váš plán', headline:'Kam máme poslat váš plán?', email_label:'E-mailová adresa', placeholder:'Zadejte svůj e-mail', clear_aria:'Vymazat e-mail', privacy_note:'Vaše soukromí respektujeme. Přečtěte si naše {link}.', privacy_link:'zásady ochrany osobních údajů' },
  dk: { header_label:'Jeres plan', headline:'Hvor skal vi sende jeres plan hen?', email_label:'E-mailadresse', placeholder:'Indtast jeres e-mail', clear_aria:'Ryd e-mail', privacy_note:'Vi respekterer jeres privatliv. Læs vores {link}.', privacy_link:'privatlivspolitik' },
  gr: { header_label:'Το πλάνο σας', headline:'Πού να στείλουμε το πλάνο σας;', email_label:'Διεύθυνση email', placeholder:'Εισάγετε το email σας', clear_aria:'Καθαρισμός email', privacy_note:'Σεβόμαστε το απόρρητό σας. Διαβάστε την {link}.', privacy_link:'πολιτική απορρήτου' },
  hu: { header_label:'Az Ön terve', headline:'Hová küldjük a tervét?', email_label:'E-mail-cím', placeholder:'Adja meg az e-mail-címét', clear_aria:'E-mail törlése', privacy_note:'Tiszteletben tartjuk a magánéletét. Olvassa el az {link}.', privacy_link:'adatvédelmi szabályzatot' },
  hr: { header_label:'Vaš plan', headline:'Na koju adresu da pošaljemo vaš plan?', email_label:'E-mail adresa', placeholder:'Unesite svoju e-mail adresu', clear_aria:'Očisti e-mail', privacy_note:'Poštujemo vašu privatnost. Pročitajte naša {link}.', privacy_link:'pravila privatnosti' },
  il: { header_label:'התוכנית שלכם', headline:'לאן נשלח את התוכנית שלכם?', email_label:'כתובת אימייל', placeholder:'הזינו את כתובת האימייל שלכם', clear_aria:'נקה אימייל', privacy_note:'אנחנו מכבדים את הפרטיות שלכם. קראו את {link}.', privacy_link:'מדיניות הפרטיות' },
  jp: { header_label:'あなたのプラン', headline:'プランの送信先を教えてください', email_label:'メールアドレス', placeholder:'メールアドレスを入力', clear_aria:'メールを消去', privacy_note:'お客様のプライバシーを大切にしています。{link}をご確認ください。', privacy_link:'プライバシーポリシー' },
  ru: { header_label:'Ваш план', headline:'Куда отправить ваш план?', email_label:'Электронная почта', placeholder:'Введите ваш e-mail', clear_aria:'Очистить e-mail', privacy_note:'Мы уважаем вашу конфиденциальность. Ознакомьтесь с нашей {link}.', privacy_link:'политикой конфиденциальности' },
  sk: { header_label:'Váš plán', headline:'Kam vám máme poslať váš plán?', email_label:'E-mailová adresa', placeholder:'Zadajte svoj e-mail', clear_aria:'Vymazať e-mail', privacy_note:'Vaše súkromie rešpektujeme. Prečítajte si naše {link}.', privacy_link:'zásady ochrany súkromia' },
  tw: { header_label:'您的計畫', headline:'要將您的計畫寄到哪裡？', email_label:'電子郵件地址', placeholder:'請輸入您的電子郵件', clear_aria:'清除電子郵件', privacy_note:'我們重視您的隱私，請閱讀我們的 {link}。', privacy_link:'隱私權政策' },
}

const quizSteps: Record<LangCode, Record<number, QuizStepT>> = {
  en: {},
  lt: {
    1:{ interstitial:{ headline:'Daugiau nei 21 milijonas žmonių jau pasirinko paprastesnį būdą judėti' } },
    2:{ interstitial:{ headline:'Sveiki atvykę į TAICHI COACH', body:'Jūs čia tam, kad pradėtumėte paprastą ėjimo namuose rutiną. Sužinokime daugiau apie jūsų tikslus ir poreikius, kad galėtume sukurti jums tinkamą planą.' } },
    3:{ question:'Kokie yra pagrindiniai jūsų tikslai?', subtitle:'Galite pasirinkti daugiau nei vieną', options:{'lose-weight':'Numesti svorio','heart-health':'Pagerinti širdies sveikatą','firm-toned':'Tapti stangresniam','lower-bio-age':'Jaustis jaunesniam ir energingesniam'} },
    4:{ interstitial:{ headline:'Puiki pradžia, jūs jau pakeliui.', body:'Su TAICHI COACH gausite aiškų, asmeniškai pritaikytą planą, kuris prisitaiko prie jūsų, kad visada žinotumėte, ką daryti toliau.', note:'Rezultatai priklauso nuo nuoseklumo ir individualių veiksnių.' } },
    5:{ question:'Kaip dabar apibūdintumėte savo kūną?', options:{'mid-sized':'Per vidurį','heavier':'Šiek tiek sunkesnis, nei norėčiau','overweight':'Gerokai sunkesnis, nei norėčiau'} },
    6:{ question:'Kaip norėtumėte jaustis savo kūne?', options:{'thin':'Lengvesnis ir patogiau','toned':'Stangresnis ir šiek tiek stipresnis','curvy':'Subalansuotai ir pasitikėdamas savimi'} },
    7:{ question:'Kurias kūno vietas norėtumėte pagerinti?', subtitle:'Galite pasirinkti daugiau nei vieną', options:{'arms':'Rankos','abs':'Pilvas','booty':'Klubai ir sėdmenys','legs':'Kojos'} },
    8:{ question:'Kada paskutinį kartą jautėtės geriausios formos?', options:{'less-1yr':'Mažiau nei prieš 1 metus','1-2yr':'Prieš 1–2 metus','over-3yr':'Daugiau nei prieš 3 metus','never':'Niekada taip nesijaučiau'} },
    9:{ interstitial:{ headline:'Jums puikiai sekasi!', body:'Daugelis žmonių nerimauja, kad nėra pakankamai geri. Mes tai suprantame ir į tai atsižvelgsime kurdami jūsų planą.' } },
    10:{ question:'Kiek aktyvūs esate šiuo metu?', options:{'advanced':'Labai aktyvus','intermediate':'Šiek tiek aktyvus','beginner':'Tik pradedu'} },
    11:{ question:'Koks yra jūsų kūno lankstumas?', options:{'very-flexible':'Gana lankstus','some-flexible':'Šiek tiek lankstus','not-flexible':'Nelabai lankstus','unsure-flexible':'Nesu tikras'} },
    12:{ question:'Kaip dažnai sportuojate?', options:{'daily':'Beveik kasdien','weekly':'Kelis kartus per savaitę','monthly':'Kelis kartus per mėnesį'} },
    13:{ question:'Kaip jaučiatės užlipę laiptais?', options:{'breathless':'Pristinga oro','winded':'Šiek tiek pavargstu, bet viskas gerai','fine':'Po vieno aukšto jaučiuosi gerai','easy':'Lengvai užlipu kelis aukštus'} },
    14:{ question:'Kaip reguliariai vaikštote?', options:{'daily':'Beveik kasdien','weekly':'Kelis kartus per savaitę','monthly':'Retai, maždaug kartą per mėnesį'} },
    15:{ question:'Ar jaučiate skausmą ar diskomfortą kūne?', subtitle:'Galite pasirinkti daugiau nei vieną', options:{'back':'Nugaros skausmas','knees':'Kelių skausmas','elbows':'Alkūnių skausmas','none':'Problemų nėra'} },
    16:{ question:'Kaip atrodo jūsų kasdienis grafikas?', options:{'9to5':'Turiu pastovų dienos grafiką','nights':'Dirbu naktinėmis pamainomis','flexible':'Mano valandos lanksčios','retired':'Esu pensijoje'} },
    17:{ question:'Kaip paprastai atrodo jūsų diena?', options:{'on-feet':'Daug judu dienos metu','active':'Kartais pajudu per pertraukas','sitting':'Didžiąją dienos dalį sėdžiu'} },
    18:{ question:'Kiek miegate naktį?', options:{'less-5':'Mažiau nei 5 valandas','5-6':'5–6 valandas','7-8':'7–8 valandas','over-9':'Daugiau nei 8 valandas'} },
    19:{ question:'Kiek vandens išgeriate per dieną?', options:{'less-2':'Apie 1–2 stiklines','2-6':'Apie 3–5 stiklines','6-8':'6 ar daugiau stiklinių','over-8':'Daugiausia geriu kavą ar arbatą'} },
    20:{ question:'Ar turite įpročių, kuriuos norėtumėte pakeisti?', subtitle:'Galite pasirinkti daugiau nei vieną', options:{'sleep':'Per mažai miegu','sugar':'Valgau per daug cukraus','soda':'Geriu daug saldžių gėrimų','salty':'Valgau daug sūraus maisto','snacker':'Valgau vėlai vakare','none':'Nė vieno iš šių'} },
    21:{ question:'Ar gyvenimo pokyčiai paveikė jūsų svorį?', subtitle:'Galite pasirinkti daugiau nei vieną', options:{'marriage':'Santykiai ar santuoka','work':'Darbas ar kasdienė rutina','stress':'Stresas ar emocinė savijauta','pregnancy':'Nėštumas','meds':'Vaistai ar hormonai','none':'Nė vieno iš šių'} },
    22:{ interstitial:{ headline:'Maži pokyčiai gali duoti didelį rezultatą', body:'Daugelis žmonių priauga svorio po gyvenimo pokyčių. Jūs nesate vieni. Mes jus lydėsime ir palaikysime šiame kelyje.' } },
    23:{ question:'Įveskite savo ūgį', placeholder:'pvz. 168', hintTitle:'Skaičiuojame jūsų kūno masės indeksą', hint:'KMI plačiai naudojamas kaip rizikos veiksnys, vertinant įvairių sveikatos sutrikimų tikimybę.' },
    24:{ question:'Pasakykite savo dabartinį svorį', placeholder:'pvz. 165' },
    25:{ question:'Kokį svorį norėtumėte pasiekti?', placeholder:'pvz. 140' },
    26:{ question:'Koks jūsų amžius?', placeholder:'pvz. 35', hint:'Tai padeda planą padaryti dar asmeniškesnį.', buttonLabel:'Toliau' },
    27:{ question:'Įveskite savo vardą', placeholder:'Jūsų vardas' },
    28:{ interstitial:{ headline:'Asmeniškai pritaikytas ėjimas namuose su TAICHI COACH', body:'TAICHI COACH sujungia švelnų ėjimą namuose su paprastais Tai Chi judesiais. Jūsų planas pritaikomas jūsų kūnui, poreikiams ir kasdieniam ritmui, kad galėtumėte judėti saugiai ir nuosekliai.' } },
    29:{ question:'Ar turite artėjantį įvykį, kuris motyvuoja mesti svorį?', options:{'vacation':'Atostogos ar kelionė','sporting-event':'Sporto veikla','beach-trip':'Kelionė prie jūros','wedding':'Vestuvės','family-occasion':'Šeimos šventė','reunion':'Susitikimas su žmonėmis','none':'Jokių ypatingų planų'} },
    30:{ question:'Kada vyks jūsų įvykis?', subtitle:'Tai padeda sukurti planą, kuris atitinka jūsų laiką ir tikslus. Jūsų informacija yra privati.' },
  },
  lv: {
    1:{ interstitial:{ headline:'Jau vairāk nekā 21 miljons cilvēku ir izvēlējušies vienkāršāku veidu, kā kustēties' } },
    2:{ interstitial:{ headline:'Laipni lūdzam TAICHI COACH', body:'Jūs esat šeit, lai sāktu vienkāršu pastaigu telpās rutīnu, ko var darīt mājās. Uzzināsim vairāk par jūsu mērķiem un vajadzībām, lai izveidotu jums piemērotu plānu.' } },
    3:{ question:'Kādi ir jūsu galvenie mērķi?', subtitle:'Varat izvēlēties vairāk nekā vienu', options:{'lose-weight':'Samazināt svaru','heart-health':'Uzlabot sirds veselību','firm-toned':'Kļūt tvirtākam','lower-bio-age':'Justies jaunākam un enerģiskākam'} },
    4:{ interstitial:{ headline:'Lielisks sākums, jūs jau esat ceļā.', body:'Ar TAICHI COACH jūs saņemsiet skaidru, personalizētu pieeju, kas pielāgojas jums, lai vienmēr zinātu, ko darīt tālāk.', note:'Rezultāti būs atkarīgi no regularitātes un individuāliem faktoriem.' } },
    5:{ question:'Kā jūs raksturotu savu ķermeni šobrīd?', options:{'mid-sized':'Kaut kur pa vidu','heavier':'Nedaudz smagāks, nekā vēlētos','overweight':'Daudz smagāks, nekā vēlētos'} },
    6:{ question:'Kā jūs vēlētos justies savā ķermenī?', options:{'thin':'Vieglāk un ērtāk','toned':'Tvirtāk un mazliet stiprāk','curvy':'Līdzsvaroti un pārliecināti'} },
    7:{ question:'Kuras ķermeņa zonas vēlaties uzlabot?', subtitle:'Varat izvēlēties vairāk nekā vienu', options:{'arms':'Rokas','abs':'Vēders','booty':'Gurni un sēža','legs':'Kājas'} },
    8:{ question:'Kad pēdējo reizi jutāties savā labākajā formā?', options:{'less-1yr':'Mazāk nekā pirms gada','1-2yr':'Pirms 1–2 gadiem','over-3yr':'Pirms vairāk nekā 3 gadiem','never':'Nekad tā neesmu juties'} },
    9:{ interstitial:{ headline:'Jums klājas lieliski!', body:'Daudzi uztraucas, ka nav pietiekami labi. Mēs to saprotam un ņemsim vērā, veidojot jūsu plānu.' } },
    10:{ question:'Cik aktīvi jūs esat šobrīd?', options:{'advanced':'Ļoti aktīvs','intermediate':'Nedaudz aktīvs','beginner':'Tikko sāku'} },
    11:{ question:'Cik lokans ir jūsu ķermenis?', options:{'very-flexible':'Ļoti lokans','some-flexible':'Nedaudz lokans','not-flexible':'Ne pārāk lokans','unsure-flexible':'Neesmu drošs'} },
    12:{ question:'Cik bieži jūs vingrojat?', options:{'daily':'Gandrīz katru dienu','weekly':'Dažas reizes nedēļā','monthly':'Dažas reizes mēnesī'} },
    13:{ question:'Kā jūtaties pēc kāpšanas pa kāpnēm?', options:{'breathless':'Man trūkst elpas','winded':'Esmu nedaudz noguris, bet viss ir labi','fine':'Pēc viena stāva jūtos labi','easy':'Varu viegli uzkāpt vairākus stāvus'} },
    14:{ question:'Cik regulāri ejat pastaigās?', options:{'daily':'Gandrīz katru dienu','weekly':'Dažas reizes nedēļā','monthly':'Reti, apmēram reizi mēnesī'} },
    15:{ question:'Vai jums ir sāpes vai diskomforts ķermenī?', subtitle:'Varat izvēlēties vairāk nekā vienu', options:{'back':'Muguras sāpes','knees':'Ceļu sāpes','elbows':'Elkoņu sāpes','none':'Nav problēmu'} },
    16:{ question:'Kā izskatās jūsu ikdienas grafiks?', options:{'9to5':'Man ir fiksēts dienas grafiks','nights':'Strādāju nakts maiņās','flexible':'Mans darba laiks ir elastīgs','retired':'Esmu pensijā'} },
    17:{ question:'Kāda parasti ir jūsu diena?', options:{'on-feet':'Dienas laikā daudz kustos','active':'Reizēm kustos pārtraukumos','sitting':'Lielāko dienas daļu sēžu'} },
    18:{ question:'Cik ilgi jūs guļat naktī?', options:{'less-5':'Mazāk par 5 stundām','5-6':'5–6 stundas','7-8':'7–8 stundas','over-9':'Vairāk par 8 stundām'} },
    19:{ question:'Cik daudz ūdens izdzerat dienā?', options:{'less-2':'Apmēram 1–2 glāzes','2-6':'Apmēram 3–5 glāzes','6-8':'6 vai vairāk glāzes','over-8':'Pārsvarā dzeru kafiju vai tēju'} },
    20:{ question:'Vai jums ir ieradumi, kurus gribētu uzlabot?', subtitle:'Varat izvēlēties vairāk nekā vienu', options:{'sleep':'Es nepietiekami guļu','sugar':'Ēdu pārāk daudz cukura','soda':'Dzeru daudz saldinātu dzērienu','salty':'Ēdu daudz sāļa ēdiena','snacker':'Ēdu vēlu vakarā','none':'Neviens no šiem'} },
    21:{ question:'Vai dzīves pārmaiņas ir ietekmējušas jūsu svaru?', subtitle:'Varat izvēlēties vairāk nekā vienu', options:{'marriage':'Attiecības vai laulība','work':'Darbs vai ikdienas rutīna','stress':'Stress vai emocionālā veselība','pregnancy':'Grūtniecība','meds':'Zāles vai hormoni','none':'Neviens no šiem'} },
    22:{ interstitial:{ headline:'Nelielas pārmaiņas var dot lielu rezultātu', body:'Daudzi cilvēki pieņemas svarā pēc dzīves pārmaiņām. Jūs neesat vieni. Mēs jūs vadīsim un atbalstīsim.' } },
    23:{ question:'Ievadiet savu augumu', placeholder:'piem. 168', hintTitle:'Aprēķinām jūsu ķermeņa masas indeksu', hint:'ĶMI bieži izmanto kā riska rādītāju dažādu veselības problēmu attīstībai vai izplatībai.' },
    24:{ question:'Pastāstiet savu pašreizējo svaru', placeholder:'piem. 165' },
    25:{ question:'Kādu svaru vēlaties sasniegt?', placeholder:'piem. 140' },
    26:{ question:'Cik jums ir gadu?', placeholder:'piem. 35', hint:'Tas palīdz padarīt plānu personiskāku.', buttonLabel:'Tālāk' },
    27:{ question:'Ievadiet savu vārdu', placeholder:'Jūsu vārds' },
    28:{ interstitial:{ headline:'Personalizētas pastaigas telpās ar TAICHI COACH', body:'TAICHI COACH apvieno saudzīgas pastaigas mājās ar vienkāršām Tai Chi kustībām. Jūsu plāns tiek pielāgots jūsu ķermenim, vajadzībām un ikdienai, lai jūs varētu kustēties droši un regulāri.' } },
    29:{ question:'Vai jums ir gaidāms notikums, kas motivē samazināt svaru?', options:{'vacation':'Brīvdienas vai ceļojums','sporting-event':'Sporta aktivitāte','beach-trip':'Brauciens uz pludmali','wedding':'Kāzas','family-occasion':'Ģimenes pasākums','reunion':'Tikšanās ar cilvēkiem','none':'Nav īpašu plānu'} },
    30:{ question:'Kad notiks jūsu pasākums?', subtitle:'Tas palīdz izveidot plānu, kas atbilst jūsu laikam un mērķiem. Jūsu informācija ir privāta.' },
  },
  ro: {
    1:{ interstitial:{ headline:'Peste 21 de milioane de persoane au ales deja o cale mai simplă de a se mișca' } },
    2:{ interstitial:{ headline:'Bine ați venit la TAICHI COACH', body:'Sunteți aici pentru a începe o rutină simplă de mers în interior, pe care o puteți face acasă. Haideți să aflăm mai multe despre obiectivele și nevoile dumneavoastră, ca să creăm planul potrivit.' } },
    3:{ question:'Care sunt obiectivele dumneavoastră principale?', subtitle:'Puteți alege mai multe variante', options:{'lose-weight':'Să slăbesc','heart-health':'Să îmbunătățesc sănătatea inimii','firm-toned':'Să fiu mai tonifiat','lower-bio-age':'Să mă simt mai tânăr și mai energic'} },
    4:{ interstitial:{ headline:'Un început excelent, sunteți pe drumul cel bun.', body:'Cu TAICHI COACH veți primi o abordare ghidată și personalizată, adaptată dumneavoastră, astfel încât să știți mereu ce urmează.', note:'Rezultatele variază în funcție de consecvență și de factorii individuali.' } },
    5:{ question:'Cum ați descrie corpul dumneavoastră acum?', options:{'mid-sized':'Undeva la mijloc','heavier':'Puțin mai greu decât mi-aș dori','overweight':'Mult mai greu decât mi-aș dori'} },
    6:{ question:'Cum ați vrea să vă simțiți în corpul dumneavoastră?', options:{'thin':'Mai ușor și mai confortabil','toned':'Mai tonifiat și puțin mai puternic','curvy':'Echilibrat și încrezător'} },
    7:{ question:'Ce părți ale corpului ați vrea să îmbunătățiți?', subtitle:'Puteți alege mai multe variante', options:{'arms':'Brațe','abs':'Abdomen','booty':'Șolduri și fesieri','legs':'Picioare'} },
    8:{ question:'Când v-ați simțit ultima dată în cea mai bună formă?', options:{'less-1yr':'Cu mai puțin de 1 an în urmă','1-2yr':'Cu 1–2 ani în urmă','over-3yr':'Cu mai mult de 3 ani în urmă','never':'Nu m-am simțit niciodată așa'} },
    9:{ interstitial:{ headline:'Vă descurcați foarte bine!', body:'Mulți oameni se tem că nu sunt suficient de buni. Înțelegem acest lucru și îl vom lua în calcul când vă creăm planul.' } },
    10:{ question:'Cât de activ sunteți acum?', options:{'advanced':'Foarte activ','intermediate':'Destul de activ','beginner':'Abia încep'} },
    11:{ question:'Cât de flexibil este corpul dumneavoastră?', options:{'very-flexible':'Foarte flexibil','some-flexible':'Puțin flexibil','not-flexible':'Nu prea flexibil','unsure-flexible':'Nu sunt sigur'} },
    12:{ question:'Cât de des faceți mișcare?', options:{'daily':'Aproape în fiecare zi','weekly':'De câteva ori pe săptămână','monthly':'De câteva ori pe lună'} },
    13:{ question:'Cum vă simțiți după ce urcați scările?', options:{'breathless':'Rămân fără aer','winded':'Obosesc puțin, dar e în regulă','fine':'Mă simt bine după un etaj','easy':'Pot urca ușor mai multe etaje'} },
    14:{ question:'Cât de regulat mergeți la plimbare?', options:{'daily':'Aproape în fiecare zi','weekly':'De câteva ori pe săptămână','monthly':'Rar, cam o dată pe lună'} },
    15:{ question:'Aveți dureri sau disconfort în corp?', subtitle:'Puteți alege mai multe variante', options:{'back':'Dureri de spate','knees':'Dureri de genunchi','elbows':'Dureri de coate','none':'Nicio problemă'} },
    16:{ question:'Cum arată programul dumneavoastră zilnic?', options:{'9to5':'Am un program fix de zi','nights':'Lucrez în ture de noapte','flexible':'Programul meu este flexibil','retired':'Sunt pensionar'} },
    17:{ question:'Cum arată, de obicei, ziua dumneavoastră?', options:{'on-feet':'Mă mișc mult în timpul zilei','active':'Mă mișc uneori în pauze','sitting':'Stau jos cea mai mare parte a zilei'} },
    18:{ question:'Cât dormiți noaptea?', options:{'less-5':'Sub 5 ore','5-6':'5–6 ore','7-8':'7–8 ore','over-9':'Peste 8 ore'} },
    19:{ question:'Câtă apă beți pe zi?', options:{'less-2':'Cam 1–2 pahare','2-6':'Cam 3–5 pahare','6-8':'6 sau mai multe pahare','over-8':'Beau mai ales cafea sau ceai'} },
    20:{ question:'Aveți obiceiuri pe care ați vrea să le îmbunătățiți?', subtitle:'Puteți alege mai multe variante', options:{'sleep':'Nu dorm suficient','sugar':'Mănânc prea mult zahăr','soda':'Beau multe băuturi carbogazoase','salty':'Mănânc multe alimente sărate','snacker':'Mănânc târziu noaptea','none':'Niciuna dintre acestea'} },
    21:{ question:'V-au afectat schimbările de viață greutatea?', subtitle:'Puteți alege mai multe variante', options:{'marriage':'Relație sau căsătorie','work':'Muncă sau rutină zilnică încărcată','stress':'Stres sau sănătate emoțională','pregnancy':'Sarcină','meds':'Medicamente sau hormoni','none':'Niciuna dintre acestea'} },
    22:{ interstitial:{ headline:'Schimbările mici pot face o diferență mare', body:'Mulți oameni iau în greutate după schimbări importante în viață. Nu sunteți singuri. Vă vom ghida și susține pe parcurs.' } },
    23:{ question:'Introduceți înălțimea', placeholder:'ex. 168', hintTitle:'Calculăm indicele de masă corporală', hint:'IMC-ul este folosit pe scară largă ca factor de risc pentru apariția sau frecvența mai multor probleme de sănătate.' },
    24:{ question:'Spuneți-ne greutatea actuală', placeholder:'ex. 165' },
    25:{ question:'Ce greutate ați dori să atingeți?', placeholder:'ex. 140' },
    26:{ question:'Ce vârstă aveți?', placeholder:'ex. 35', hint:'Folosim această informație pentru a face planul mai personal.', buttonLabel:'Înainte' },
    27:{ question:'Introduceți prenumele dumneavoastră', placeholder:'Prenumele dumneavoastră' },
    28:{ interstitial:{ headline:'Mers în interior personalizat cu TAICHI COACH', body:'TAICHI COACH combină mersul blând acasă cu mișcări simple inspirate din Tai Chi. Planul dumneavoastră este adaptat corpului, nevoilor și ritmului de zi cu zi, astfel încât să vă mișcați în siguranță și constant.' } },
    29:{ question:'Aveți un eveniment apropiat care vă motivează să slăbiți?', options:{'vacation':'Vacanță sau călătorie','sporting-event':'Activitate sportivă','beach-trip':'Excursie la plajă','wedding':'Nuntă','family-occasion':'Eveniment de familie','reunion':'Reîntâlnire cu oameni cunoscuți','none':'Niciun plan special'} },
    30:{ question:'Când are loc evenimentul?', subtitle:'Acest lucru ne ajută să creăm un plan care se potrivește cu timpul și obiectivele dumneavoastră. Informațiile rămân private.' },
  },
  cz: {
    1:{ interstitial:{ headline:'Více než 21 milionů lidí už si vybralo jednodušší způsob pohybu' } },
    2:{ interstitial:{ headline:'Vítejte v TAICHI COACH', body:'Jste tu proto, abyste začali s jednoduchou domácí chůzí, kterou zvládnete bez odchodu z domu. Pojďme zjistit více o vašich cílech a potřebách, abychom pro vás vytvořili správný plán.' } },
    3:{ question:'Jaké jsou vaše hlavní cíle?', subtitle:'Můžete vybrat více možností', options:{'lose-weight':'Zhubnout','heart-health':'Zlepšit zdraví srdce','firm-toned':'Více zpevnit postavu','lower-bio-age':'Cítit se mladší a mít více energie'} },
    4:{ interstitial:{ headline:'Skvělý začátek, jste na dobré cestě.', body:'S TAICHI COACH získáte vedený a osobní přístup, který se přizpůsobí vám, takže budete vždy vědět, co dělat dál.', note:'Výsledky se liší podle pravidelnosti a individuálních faktorů.' } },
    5:{ question:'Jak byste teď popsali své tělo?', options:{'mid-sized':'Něco mezi','heavier':'O něco těžší, než bych chtěl','overweight':'Mnohem těžší, než bych chtěl'} },
    6:{ question:'Jak byste se chtěli ve svém těle cítit?', options:{'thin':'Lehčí a pohodlněji','toned':'Pevnější a trochu silnější','curvy':'Vyrovnaně a sebejistě'} },
    7:{ question:'Které části těla byste chtěli zlepšit?', subtitle:'Můžete vybrat více možností', options:{'arms':'Paže','abs':'Břicho','booty':'Boky a hýždě','legs':'Nohy'} },
    8:{ question:'Kdy jste se naposledy cítili ve své nejlepší formě?', options:{'less-1yr':'Před méně než 1 rokem','1-2yr':'Před 1–2 lety','over-3yr':'Před více než 3 lety','never':'Nikdy jsem se tak necítil'} },
    9:{ interstitial:{ headline:'Jde vám to skvěle!', body:'Mnoho lidí se bojí, že nejsou dost dobří. Chápeme to a při vytváření vašeho plánu s tím budeme počítat.' } },
    10:{ question:'Jak aktivní jste právě teď?', options:{'advanced':'Velmi aktivní','intermediate':'Docela aktivní','beginner':'Teprve začínám'} },
    11:{ question:'Jak pružné je vaše tělo?', options:{'very-flexible':'Velmi pružné','some-flexible':'Trochu pružné','not-flexible':'Moc pružné není','unsure-flexible':'Nejsem si jistý'} },
    12:{ question:'Jak často cvičíte?', options:{'daily':'Téměř každý den','weekly':'Několikrát týdně','monthly':'Několikrát měsíčně'} },
    13:{ question:'Jak se cítíte po chůzi do schodů?', options:{'breathless':'Dochází mi dech','winded':'Jsem trochu unavený, ale v pohodě','fine':'Po jednom patře se cítím dobře','easy':'Snadno vyjdu několik pater'} },
    14:{ question:'Jak pravidelně chodíte na procházky?', options:{'daily':'Téměř každý den','weekly':'Několikrát týdně','monthly':'Zřídka, asi jednou měsíčně'} },
    15:{ question:'Máte nějakou bolest nebo nepohodlí v těle?', subtitle:'Můžete vybrat více možností', options:{'back':'Bolest zad','knees':'Bolest kolen','elbows':'Bolest loktů','none':'Bez potíží'} },
    16:{ question:'Jak vypadá váš denní rozvrh?', options:{'9to5':'Mám pevný denní režim','nights':'Pracuji na noční směny','flexible':'Mám flexibilní hodiny','retired':'Jsem v důchodu'} },
    17:{ question:'Jak obvykle vypadá váš den?', options:{'on-feet':'Přes den se hodně hýbu','active':'Někdy se hýbu během přestávek','sitting':'Většinu dne sedím'} },
    18:{ question:'Jak dlouho v noci spíte?', options:{'less-5':'Méně než 5 hodin','5-6':'5–6 hodin','7-8':'7–8 hodin','over-9':'Více než 8 hodin'} },
    19:{ question:'Kolik vody denně vypijete?', options:{'less-2':'Asi 1–2 sklenice','2-6':'Asi 3–5 sklenic','6-8':'6 a více sklenic','over-8':'Piju hlavně kávu nebo čaj'} },
    20:{ question:'Máte nějaké návyky, které chcete zlepšit?', subtitle:'Můžete vybrat více možností', options:{'sleep':'Málo spím','sugar':'Jím příliš mnoho cukru','soda':'Piju hodně limonád','salty':'Jím hodně slaného','snacker':'Jím pozdě večer','none':'Nic z toho'} },
    21:{ question:'Ovlivnily změny v životě vaši váhu?', subtitle:'Můžete vybrat více možností', options:{'marriage':'Vztah nebo manželství','work':'Práce nebo každodenní rutina','stress':'Stres nebo emoční zdraví','pregnancy':'Těhotenství','meds':'Léky nebo hormony','none':'Nic z toho'} },
    22:{ interstitial:{ headline:'Malé změny mohou přinést velký rozdíl', body:'Mnoho lidí po životních změnách přibere. Nejste v tom sami. Budeme vás vést a podporovat.' } },
    23:{ question:'Zadejte svou výšku', placeholder:'např. 168', hintTitle:'Počítáme váš index tělesné hmotnosti', hint:'BMI se běžně používá jako ukazatel rizika vzniku nebo výskytu různých zdravotních obtíží.' },
    24:{ question:'Řekněte nám svou aktuální váhu', placeholder:'např. 165' },
    25:{ question:'Jaké váhy byste chtěli dosáhnout?', placeholder:'např. 140' },
    26:{ question:'Kolik je vám let?', placeholder:'např. 35', hint:'Používáme to, aby byl plán více osobní.', buttonLabel:'Další' },
    27:{ question:'Zadejte své jméno', placeholder:'Vaše jméno' },
    28:{ interstitial:{ headline:'Osobní domácí chůze s TAICHI COACH', body:'TAICHI COACH kombinuje jemnou domácí chůzi s jednoduchými pohyby inspirovanými Tai Chi. Váš plán je přizpůsoben vašemu tělu, potřebám i běžnému dni, abyste se mohli hýbat bezpečně a pravidelně.' } },
    29:{ question:'Máte nějakou blížící se událost, která vás motivuje zhubnout?', options:{'vacation':'Dovolená nebo výlet','sporting-event':'Sportovní aktivita','beach-trip':'Výlet k moři','wedding':'Svatba','family-occasion':'Rodinná akce','reunion':'Setkání s lidmi','none':'Žádné zvláštní plány'} },
    30:{ question:'Kdy se vaše událost koná?', subtitle:'To nám pomůže vytvořit plán, který sedí vašemu času i cílům. Vaše informace zůstávají soukromé.' },
  },
  dk: {
    1:{ interstitial:{ headline:'Mere end 21 millioner mennesker har allerede valgt en nemmere måde at bevæge sig på' } },
    2:{ interstitial:{ headline:'Velkommen til TAICHI COACH', body:'I er her for at starte en enkel indendørs gå-rutine, som kan klares derhjemme. Lad os lære mere om jeres mål og behov, så vi kan skabe den rigtige plan.' } },
    3:{ question:'Hvad er jeres vigtigste mål?', subtitle:'I kan vælge mere end ét', options:{'lose-weight':'Tabe sig','heart-health':'Forbedre hjertesundheden','firm-toned':'Blive mere tonet','lower-bio-age':'Føle sig yngre og mere energisk'} },
    4:{ interstitial:{ headline:'Fantastisk start, I er godt på vej.', body:'Med TAICHI COACH får I en guidet, personlig tilgang, som tilpasser sig jer, så I altid ved, hvad næste skridt er.', note:'Resultater varierer afhængigt af regelmæssighed og individuelle forhold.' } },
    5:{ question:'Hvordan vil I beskrive kroppen lige nu?', options:{'mid-sized':'Midt imellem','heavier':'Lidt tungere, end jeg ønsker','overweight':'Meget tungere, end jeg ønsker'} },
    6:{ question:'Hvordan vil I gerne have det i kroppen?', options:{'thin':'Lettere og mere tilpas','toned':'Mere tonet og lidt stærkere','curvy':'I balance og med større selvtillid'} },
    7:{ question:'Hvilke områder af kroppen vil I gerne forbedre?', subtitle:'I kan vælge mere end ét', options:{'arms':'Arme','abs':'Mave','booty':'Hofter og baller','legs':'Ben'} },
    8:{ question:'Hvornår havde I sidst følelsen af at være i jeres bedste form?', options:{'less-1yr':'For mindre end 1 år siden','1-2yr':'For 1–2 år siden','over-3yr':'For mere end 3 år siden','never':'Jeg har aldrig haft den følelse'} },
    9:{ interstitial:{ headline:'Det går rigtig godt!', body:'Mange er bange for ikke at være gode nok. Det forstår vi, og det tager vi hensyn til, når vi skaber jeres plan.' } },
    10:{ question:'Hvor aktive er I lige nu?', options:{'advanced':'Meget aktiv','intermediate':'Nogenlunde aktiv','beginner':'Jeg er lige begyndt'} },
    11:{ question:'Hvor smidig er kroppen?', options:{'very-flexible':'Meget smidig','some-flexible':'Lidt smidig','not-flexible':'Ikke særlig smidig','unsure-flexible':'Det er jeg ikke sikker på'} },
    12:{ question:'Hvor ofte træner I?', options:{'daily':'Næsten hver dag','weekly':'Et par gange om ugen','monthly':'Et par gange om måneden'} },
    13:{ question:'Hvordan har I det efter at have gået op ad trapper?', options:{'breathless':'Jeg bliver forpustet','winded':'Jeg bliver lidt træt, men det går','fine':'Jeg har det fint efter én etage','easy':'Jeg kan let gå flere etager op'} },
    14:{ question:'Hvor regelmæssigt går I ture?', options:{'daily':'Næsten hver dag','weekly':'Et par gange om ugen','monthly':'Sjældent, cirka én gang om måneden'} },
    15:{ question:'Har I smerter eller ubehag i kroppen?', subtitle:'I kan vælge mere end ét', options:{'back':'Rygsmerter','knees':'Knæsmerter','elbows':'Albuesmerter','none':'Ingen problemer'} },
    16:{ question:'Hvordan ser jeres daglige skema ud?', options:{'9to5':'Jeg har en fast dagsrytme','nights':'Jeg arbejder nattevagter','flexible':'Mine timer er fleksible','retired':'Jeg er pensioneret'} },
    17:{ question:'Hvordan ser jeres dag normalt ud?', options:{'on-feet':'Jeg bevæger mig meget i løbet af dagen','active':'Jeg bevæger mig nogle gange i pauserne','sitting':'Jeg sidder det meste af dagen'} },
    18:{ question:'Hvor længe sover I om natten?', options:{'less-5':'Under 5 timer','5-6':'5–6 timer','7-8':'7–8 timer','over-9':'Over 8 timer'} },
    19:{ question:'Hvor meget vand drikker I hver dag?', options:{'less-2':'Omkring 1–2 glas','2-6':'Omkring 3–5 glas','6-8':'6 eller flere glas','over-8':'Jeg drikker mest kaffe eller te'} },
    20:{ question:'Har I vaner, som I gerne vil forbedre?', subtitle:'I kan vælge mere end ét', options:{'sleep':'Jeg sover ikke nok','sugar':'Jeg spiser for meget sukker','soda':'Jeg drikker meget sodavand','salty':'Jeg spiser meget salt mad','snacker':'Jeg spiser sent om aftenen','none':'Ingen af disse'} },
    21:{ question:'Har livsændringer påvirket jeres vægt?', subtitle:'I kan vælge mere end ét', options:{'marriage':'Forhold eller ægteskab','work':'Travlt arbejde eller daglig rutine','stress':'Stress eller følelsesmæssig trivsel','pregnancy':'Graviditet','meds':'Medicin eller hormoner','none':'Ingen af disse'} },
    22:{ interstitial:{ headline:'Små ændringer kan gøre en stor forskel', body:'Mange tager på efter ændringer i livet. I står ikke alene. Vi guider og støtter jer hele vejen.' } },
    23:{ question:'Indtast jeres højde', placeholder:'f.eks. 168', hintTitle:'Vi beregner jeres kropsmasseindeks', hint:'BMI bruges ofte som en risikofaktor for udvikling eller forekomst af flere helbredsproblemer.' },
    24:{ question:'Fortæl os jeres nuværende vægt', placeholder:'f.eks. 165' },
    25:{ question:'Hvilken vægt vil I gerne nå?', placeholder:'f.eks. 140' },
    26:{ question:'Hvor gamle er I?', placeholder:'f.eks. 35', hint:'Vi bruger det til at gøre planen mere personlig.', buttonLabel:'Næste' },
    27:{ question:'Indtast jeres navn', placeholder:'Jeres navn' },
    28:{ interstitial:{ headline:'Personlig indendørs gang med TAICHI COACH', body:'TAICHI COACH kombinerer blid gang derhjemme med enkle Tai Chi-inspirerede bevægelser. Planen tilpasses jeres krop, behov og hverdag, så I kan bevæge jer sikkert og holde fast i rutinen.' } },
    29:{ question:'Har I en kommende begivenhed, som motiverer jer til at tabe jer?', options:{'vacation':'Ferie eller rejse','sporting-event':'Sportsaktivitet','beach-trip':'Tur til stranden','wedding':'Bryllup','family-occasion':'Familiebegivenhed','reunion':'Møde med mennesker','none':'Ingen særlige planer'} },
    30:{ question:'Hvornår er jeres begivenhed?', subtitle:'Det hjælper os med at skabe en plan, der passer til jeres tidsramme og mål. Jeres oplysninger holdes private.' },
  },
  gr: {
    1:{ interstitial:{ headline:'Περισσότεροι από 21 εκατομμύρια άνθρωποι έχουν ήδη επιλέξει έναν πιο απλό τρόπο να κινούνται' } },
    2:{ interstitial:{ headline:'Καλώς ήρθατε στο TAICHI COACH', body:'Είστε εδώ για να ξεκινήσετε μια απλή ρουτίνα περπατήματος στο σπίτι. Ας μάθουμε περισσότερα για τους στόχους και τις ανάγκες σας, ώστε να δημιουργήσουμε το σωστό πλάνο για εσάς.' } },
    3:{ question:'Ποιοι είναι οι βασικοί σας στόχοι;', subtitle:'Μπορείτε να επιλέξετε περισσότερες από μία επιλογές', options:{'lose-weight':'Να χάσω βάρος','heart-health':'Να βελτιώσω την υγεία της καρδιάς','firm-toned':'Να αποκτήσω πιο σφιχτό σώμα','lower-bio-age':'Να νιώθω νεότερος και με περισσότερη ενέργεια'} },
    4:{ interstitial:{ headline:'Εξαιρετική αρχή, είστε ήδη στον σωστό δρόμο.', body:'Με το TAICHI COACH θα έχετε μια καθοδηγούμενη, προσωπική προσέγγιση που προσαρμόζεται σε εσάς, ώστε να ξέρετε πάντα ποιο είναι το επόμενο βήμα.', note:'Τα αποτελέσματα διαφέρουν ανάλογα με τη συνέπεια και τους προσωπικούς παράγοντες.' } },
    5:{ question:'Πώς θα περιγράφατε το σώμα σας αυτή τη στιγμή;', options:{'mid-sized':'Κάπου στη μέση','heavier':'Λίγο πιο βαρύ απ’ όσο θα ήθελα','overweight':'Πολύ πιο βαρύ απ’ όσο θα ήθελα'} },
    6:{ question:'Πώς θα θέλατε να νιώθετε μέσα στο σώμα σας;', options:{'thin':'Πιο ελαφρύς και άνετος','toned':'Πιο σφιχτός και λίγο πιο δυνατός','curvy':'Ισορροπημένος και με αυτοπεποίθηση'} },
    7:{ question:'Ποια σημεία του σώματος θέλετε να βελτιώσετε;', subtitle:'Μπορείτε να επιλέξετε περισσότερες από μία επιλογές', options:{'arms':'Χέρια','abs':'Κοιλιά','booty':'Γοφοί και γλουτοί','legs':'Πόδια'} },
    8:{ question:'Πότε νιώσατε τελευταία φορά στην καλύτερη φόρμα σας;', options:{'less-1yr':'Πριν από λιγότερο από 1 χρόνο','1-2yr':'Πριν από 1–2 χρόνια','over-3yr':'Πριν από περισσότερα από 3 χρόνια','never':'Δεν έχω νιώσει ποτέ έτσι'} },
    9:{ interstitial:{ headline:'Τα πάτε πολύ καλά!', body:'Πολλοί άνθρωποι ανησυχούν ότι δεν είναι αρκετά καλοί. Το καταλαβαίνουμε και θα το λάβουμε υπόψη στο πλάνο σας.' } },
    10:{ question:'Πόσο δραστήριοι είστε αυτή τη στιγμή;', options:{'advanced':'Πολύ δραστήριος','intermediate':'Αρκετά δραστήριος','beginner':'Μόλις ξεκινώ'} },
    11:{ question:'Πόσο ευλύγιστο είναι το σώμα σας;', options:{'very-flexible':'Πολύ ευλύγιστο','some-flexible':'Λίγο ευλύγιστο','not-flexible':'Όχι πολύ ευλύγιστο','unsure-flexible':'Δεν είμαι σίγουρος'} },
    12:{ question:'Πόσο συχνά γυμνάζεστε;', options:{'daily':'Σχεδόν κάθε μέρα','weekly':'Μερικές φορές την εβδομάδα','monthly':'Μερικές φορές τον μήνα'} },
    13:{ question:'Πώς αισθάνεστε αφού ανεβείτε σκάλες;', options:{'breathless':'Μου κόβεται η ανάσα','winded':'Κουράζομαι λίγο, αλλά είμαι καλά','fine':'Νιώθω καλά μετά από έναν όροφο','easy':'Ανεβαίνω εύκολα αρκετούς ορόφους'} },
    14:{ question:'Πόσο τακτικά βγαίνετε για περπάτημα;', options:{'daily':'Σχεδόν κάθε μέρα','weekly':'Μερικές φορές την εβδομάδα','monthly':'Σπάνια, περίπου μία φορά τον μήνα'} },
    15:{ question:'Έχετε πόνους ή ενοχλήσεις στο σώμα;', subtitle:'Μπορείτε να επιλέξετε περισσότερες από μία επιλογές', options:{'back':'Πόνος στη μέση','knees':'Πόνος στα γόνατα','elbows':'Πόνος στους αγκώνες','none':'Κανένα πρόβλημα'} },
    16:{ question:'Πώς είναι το καθημερινό σας πρόγραμμα;', options:{'9to5':'Έχω σταθερό ημερήσιο πρόγραμμα','nights':'Εργάζομαι νυχτερινές βάρδιες','flexible':'Οι ώρες μου είναι ευέλικτες','retired':'Είμαι συνταξιούχος'} },
    17:{ question:'Πώς μοιάζει συνήθως η μέρα σας;', options:{'on-feet':'Κινούμαι πολύ μέσα στη μέρα','active':'Κινούμαι μερικές φορές στα διαλείμματα','sitting':'Κάθομαι το μεγαλύτερο μέρος της ημέρας'} },
    18:{ question:'Πόσες ώρες κοιμάστε τη νύχτα;', options:{'less-5':'Λιγότερο από 5 ώρες','5-6':'5–6 ώρες','7-8':'7–8 ώρες','over-9':'Περισσότερες από 8 ώρες'} },
    19:{ question:'Πόσο νερό πίνετε κάθε μέρα;', options:{'less-2':'Περίπου 1–2 ποτήρια','2-6':'Περίπου 3–5 ποτήρια','6-8':'6 ή περισσότερα ποτήρια','over-8':'Πίνω κυρίως καφέ ή τσάι'} },
    20:{ question:'Έχετε συνήθειες που θέλετε να βελτιώσετε;', subtitle:'Μπορείτε να επιλέξετε περισσότερες από μία επιλογές', options:{'sleep':'Δεν κοιμάμαι αρκετά','sugar':'Τρώω πολύ ζάχαρη','soda':'Πίνω πολλά αναψυκτικά','salty':'Τρώω πολύ αλμυρό φαγητό','snacker':'Τρώω αργά το βράδυ','none':'Κανένα από αυτά'} },
    21:{ question:'Έχουν επηρεάσει αλλαγές στη ζωή το βάρος σας;', subtitle:'Μπορείτε να επιλέξετε περισσότερες από μία επιλογές', options:{'marriage':'Σχέση ή γάμος','work':'Δουλειά ή καθημερινή ρουτίνα','stress':'Άγχος ή συναισθηματική υγεία','pregnancy':'Εγκυμοσύνη','meds':'Φάρμακα ή ορμόνες','none':'Κανένα από αυτά'} },
    22:{ interstitial:{ headline:'Οι μικρές αλλαγές μπορούν να φέρουν μεγάλη διαφορά', body:'Πολλοί άνθρωποι παίρνουν βάρος μετά από αλλαγές στη ζωή τους. Δεν είστε μόνοι. Θα σας καθοδηγήσουμε και θα σας στηρίξουμε.' } },
    23:{ question:'Εισάγετε το ύψος σας', placeholder:'π.χ. 168', hintTitle:'Υπολογίζουμε τον δείκτη μάζας σώματος', hint:'Ο ΔΜΣ χρησιμοποιείται ευρέως ως παράγοντας κινδύνου για την εμφάνιση ή την παρουσία πολλών προβλημάτων υγείας.' },
    24:{ question:'Πείτε μας το τωρινό σας βάρος', placeholder:'π.χ. 165' },
    25:{ question:'Ποιο βάρος θα θέλατε να φτάσετε;', placeholder:'π.χ. 140' },
    26:{ question:'Ποια είναι η ηλικία σας;', placeholder:'π.χ. 35', hint:'Χρησιμοποιούμε αυτή την πληροφορία για να κάνουμε το πλάνο πιο προσωπικό.', buttonLabel:'Επόμενο' },
    27:{ question:'Εισάγετε το όνομά σας', placeholder:'Το όνομά σας' },
    28:{ interstitial:{ headline:'Εξατομικευμένο περπάτημα στο σπίτι με το TAICHI COACH', body:'Το TAICHI COACH συνδυάζει ήπιο περπάτημα στο σπίτι με απλές κινήσεις εμπνευσμένες από το Tai Chi. Το πλάνο προσαρμόζεται στο σώμα σας, στις ανάγκες σας και στην καθημερινότητά σας, ώστε να κινείστε με ασφάλεια και συνέπεια.' } },
    29:{ question:'Έχετε κάποιο επερχόμενο γεγονός που σας δίνει κίνητρο να χάσετε βάρος;', options:{'vacation':'Διακοπές ή ταξίδι','sporting-event':'Αθλητική δραστηριότητα','beach-trip':'Εκδρομή στην παραλία','wedding':'Γάμος','family-occasion':'Οικογενειακή εκδήλωση','reunion':'Συνάντηση με ανθρώπους','none':'Κανένα ιδιαίτερο σχέδιο'} },
    30:{ question:'Πότε είναι το γεγονός σας;', subtitle:'Αυτό μας βοηθά να δημιουργήσουμε ένα πλάνο που ταιριάζει στο χρονοδιάγραμμα και στους στόχους σας. Οι πληροφορίες σας παραμένουν ιδιωτικές.' },
  },
  hu: {
    1:{ interstitial:{ headline:'Több mint 21 millió ember választott már egyszerűbb utat a mozgáshoz' } },
    2:{ interstitial:{ headline:'Üdvözli a TAICHI COACH', body:'Azért vannak itt, hogy elindítsanak egy egyszerű, otthon is végezhető sétarutint. Nézzük meg közelebbről a céljaikat és az igényeiket, hogy a megfelelő tervet készíthessük el.' } },
    3:{ question:'Mik a legfontosabb céljaik?', subtitle:'Többet is kiválaszthatnak', options:{'lose-weight':'Fogyni szeretnék','heart-health':'Javítani szeretném a szív egészségét','firm-toned':'Feszesebb szeretnék lenni','lower-bio-age':'Fiatalosabbnak és energikusabbnak szeretném érezni magam'} },
    4:{ interstitial:{ headline:'Remek kezdés, jó úton haladnak.', body:'A TAICHI COACH irányított, személyre szabott megközelítést ad, amely Önökhöz igazodik, így mindig tudni fogják, mi következik.', note:'Az eredmények a rendszerességtől és az egyéni tényezőktől függnek.' } },
    5:{ question:'Hogyan írnák le most a testüket?', options:{'mid-sized':'Valahol középen','heavier':'Kicsit nehezebb, mint szeretném','overweight':'Sokkal nehezebb, mint szeretném'} },
    6:{ question:'Hogyan szeretnék érezni magukat a testükben?', options:{'thin':'Könnyebbnek és kényelmesebbnek','toned':'Feszesebbnek és kicsit erősebbnek','curvy':'Kiegyensúlyozottnak és magabiztosnak'} },
    7:{ question:'Mely testrészeken szeretnének javítani?', subtitle:'Többet is kiválaszthatnak', options:{'arms':'Karok','abs':'Has','booty':'Csípő és farizom','legs':'Lábak'} },
    8:{ question:'Mikor érezték magukat utoljára a legjobb formában?', options:{'less-1yr':'Kevesebb mint 1 éve','1-2yr':'1–2 éve','over-3yr':'Több mint 3 éve','never':'Soha nem éreztem még így magam'} },
    9:{ interstitial:{ headline:'Nagyon jól haladnak!', body:'Sokan aggódnak amiatt, hogy nem elég jók. Ezt megértjük, és figyelembe vesszük a terv kialakításakor.' } },
    10:{ question:'Mennyire aktívak most?', options:{'advanced':'Nagyon aktív','intermediate':'Közepesen aktív','beginner':'Még csak most kezdem'} },
    11:{ question:'Mennyire rugalmas a testük?', options:{'very-flexible':'Nagyon rugalmas','some-flexible':'Kicsit rugalmas','not-flexible':'Nem túl rugalmas','unsure-flexible':'Nem vagyok benne biztos'} },
    12:{ question:'Milyen gyakran mozognak?', options:{'daily':'Szinte minden nap','weekly':'Hetente néhányszor','monthly':'Havonta néhányszor'} },
    13:{ question:'Hogyan érzik magukat lépcsőzés után?', options:{'breathless':'Kifulladok','winded':'Kicsit elfáradok, de rendben vagyok','fine':'Egy emelet után jól érzem magam','easy':'Könnyen felmegyek több emeletet is'} },
    14:{ question:'Milyen rendszeresen mennek sétálni?', options:{'daily':'Szinte minden nap','weekly':'Hetente néhányszor','monthly':'Ritkán, körülbelül havonta egyszer'} },
    15:{ question:'Van fájdalmuk vagy kellemetlenségük a testükben?', subtitle:'Többet is kiválaszthatnak', options:{'back':'Hátfájás','knees':'Térdfájás','elbows':'Könyökfájás','none':'Nincs panasz'} },
    16:{ question:'Milyen a napi időbeosztásuk?', options:{'9to5':'Fix nappali beosztásom van','nights':'Éjszakai műszakban dolgozom','flexible':'Rugalmas az időbeosztásom','retired':'Nyugdíjas vagyok'} },
    17:{ question:'Milyen általában a napjuk?', options:{'on-feet':'Sokat mozgok napközben','active':'A szünetekben időnként mozgok','sitting':'A nap nagy részében ülök'} },
    18:{ question:'Mennyit alszanak éjszaka?', options:{'less-5':'Kevesebb mint 5 órát','5-6':'5–6 órát','7-8':'7–8 órát','over-9':'Több mint 8 órát'} },
    19:{ question:'Mennyi vizet isznak egy nap?', options:{'less-2':'Kb. 1–2 pohárral','2-6':'Kb. 3–5 pohárral','6-8':'6 vagy több pohárral','over-8':'Leginkább kávét vagy teát iszom'} },
    20:{ question:'Van olyan szokásuk, amin szeretnének javítani?', subtitle:'Többet is kiválaszthatnak', options:{'sleep':'Nem alszom eleget','sugar':'Túl sok cukrot eszem','soda':'Sok üdítőt iszom','salty':'Sok sós ételt eszem','snacker':'Késő este eszem','none':'Ezek közül egyik sem'} },
    21:{ question:'Befolyásolták élethelyzeti változások a testsúlyukat?', subtitle:'Többet is kiválaszthatnak', options:{'marriage':'Kapcsolat vagy házasság','work':'Munka vagy zsúfolt napi rutin','stress':'Stressz vagy lelki egészség','pregnancy':'Terhesség','meds':'Gyógyszerek vagy hormonok','none':'Ezek közül egyik sem'} },
    22:{ interstitial:{ headline:'A kis változások is nagy eredményt hozhatnak', body:'Sokan élethelyzeti változások után szednek fel plusz súlyt. Nincsenek egyedül. Végig kísérjük és támogatjuk Önöket.' } },
    23:{ question:'Adják meg a magasságukat', placeholder:'pl. 168', hintTitle:'Kiszámítjuk a testtömegindexet', hint:'A BMI-t széles körben használják több egészségügyi probléma kialakulásának vagy előfordulásának kockázati tényezőjeként.' },
    24:{ question:'Adják meg a jelenlegi súlyukat', placeholder:'pl. 165' },
    25:{ question:'Milyen súlyt szeretnének elérni?', placeholder:'pl. 140' },
    26:{ question:'Hány évesek?', placeholder:'pl. 35', hint:'Ezt azért használjuk, hogy még személyesebb legyen a terv.', buttonLabel:'Tovább' },
    27:{ question:'Adják meg a nevüket', placeholder:'Az Ön neve' },
    28:{ interstitial:{ headline:'Személyre szabott otthoni séta a TAICHI COACH segítségével', body:'A TAICHI COACH az otthoni, kíméletes sétát egyszerű Tai Chi ihletésű mozdulatokkal ötvözi. A terv a testükhöz, az igényeikhez és a mindennapjaikhoz igazodik, hogy biztonságosan és következetesen tudjanak haladni.' } },
    29:{ question:'Van közelgő esemény, ami motiválja Önöket a fogyásra?', options:{'vacation':'Nyaralás vagy utazás','sporting-event':'Sportesemény vagy mozgásprogram','beach-trip':'Tengerparti utazás','wedding':'Esküvő','family-occasion':'Családi esemény','reunion':'Találkozás emberekkel','none':'Nincs különleges terv'} },
    30:{ question:'Mikor lesz az esemény?', subtitle:'Ez segít olyan tervet készíteni, amely illik az időkeretükhöz és a céljaikhoz. Az adataik bizalmasak maradnak.' },
  },
  hr: {
    1:{ interstitial:{ headline:'Više od 21 milijun ljudi već je odabralo jednostavniji način kretanja' } },
    2:{ interstitial:{ headline:'Dobrodošli u TAICHI COACH', body:'Ovdje ste kako biste započeli jednostavnu rutinu hodanja kod kuće. Upoznajmo vaše ciljeve i potrebe kako bismo izradili plan koji vam stvarno odgovara.' } },
    3:{ question:'Koji su vaši glavni ciljevi?', subtitle:'Možete odabrati više odgovora', options:{'lose-weight':'Smršavjeti','heart-health':'Poboljšati zdravlje srca','firm-toned':'Postati zategnutiji','lower-bio-age':'Osjećati se mlađe i imati više energije'} },
    4:{ interstitial:{ headline:'Odličan početak, na pravom ste putu.', body:'Uz TAICHI COACH dobit ćete vođeni, personalizirani pristup koji se prilagođava vama, tako da uvijek znate što je sljedeći korak.', note:'Rezultati ovise o vašoj dosljednosti i individualnim čimbenicima.' } },
    5:{ question:'Kako biste sada opisali svoje tijelo?', options:{'mid-sized':'Negdje u sredini','heavier':'Malo teže nego što bih želio','overweight':'Puno teže nego što bih želio'} },
    6:{ question:'Kako biste se željeli osjećati u svom tijelu?', options:{'thin':'Lakše i ugodnije','toned':'Zategnutije i malo snažnije','curvy':'Uravnoteženo i samouvjereno'} },
    7:{ question:'Koje dijelove tijela želite poboljšati?', subtitle:'Možete odabrati više odgovora', options:{'arms':'Ruke','abs':'Trbuh','booty':'Bokovi i stražnjica','legs':'Noge'} },
    8:{ question:'Kada ste se zadnji put osjećali u najboljoj formi?', options:{'less-1yr':'Prije manje od 1 godine','1-2yr':'Prije 1–2 godine','over-3yr':'Prije više od 3 godine','never':'Nikada se nisam tako osjećao'} },
    9:{ interstitial:{ headline:'Odlično vam ide!', body:'Mnogi se brinu da nisu dovoljno dobri. To razumijemo i uzet ćemo to u obzir pri izradi vašeg plana.' } },
    10:{ question:'Koliko ste trenutno aktivni?', options:{'advanced':'Vrlo aktivan','intermediate':'Djelomično aktivan','beginner':'Tek počinjem'} },
    11:{ question:'Koliko je vaše tijelo fleksibilno?', options:{'very-flexible':'Vrlo fleksibilno','some-flexible':'Malo fleksibilno','not-flexible':'Nije baš fleksibilno','unsure-flexible':'Nisam siguran'} },
    12:{ question:'Koliko često vježbate?', options:{'daily':'Gotovo svaki dan','weekly':'Nekoliko puta tjedno','monthly':'Nekoliko puta mjesečno'} },
    13:{ question:'Kako se osjećate nakon penjanja uz stepenice?', options:{'breathless':'Ostajem bez daha','winded':'Malo se umorim, ali dobro sam','fine':'Dobro se osjećam nakon jednog kata','easy':'Lako se popnem nekoliko katova'} },
    14:{ question:'Koliko redovito idete u šetnju?', options:{'daily':'Gotovo svaki dan','weekly':'Nekoliko puta tjedno','monthly':'Rijetko, otprilike jednom mjesečno'} },
    15:{ question:'Imate li bol ili nelagodu u tijelu?', subtitle:'Možete odabrati više odgovora', options:{'back':'Bol u leđima','knees':'Bol u koljenima','elbows':'Bol u laktovima','none':'Bez tegoba'} },
    16:{ question:'Kako izgleda vaš dnevni raspored?', options:{'9to5':'Imam stalan dnevni raspored','nights':'Radim noćne smjene','flexible':'Moje radno vrijeme je fleksibilno','retired':'U mirovini sam'} },
    17:{ question:'Kako obično izgleda vaš dan?', options:{'on-feet':'Puno se krećem tijekom dana','active':'Ponekad se krećem tijekom pauza','sitting':'Veći dio dana sjedim'} },
    18:{ question:'Koliko dugo spavate noću?', options:{'less-5':'Manje od 5 sati','5-6':'5–6 sati','7-8':'7–8 sati','over-9':'Više od 8 sati'} },
    19:{ question:'Koliko vode popijete svaki dan?', options:{'less-2':'Oko 1–2 čaše','2-6':'Oko 3–5 čaša','6-8':'6 ili više čaša','over-8':'Uglavnom pijem kavu ili čaj'} },
    20:{ question:'Imate li navike koje biste željeli poboljšati?', subtitle:'Možete odabrati više odgovora', options:{'sleep':'Ne spavam dovoljno','sugar':'Jedem previše šećera','soda':'Pijem puno gaziranih pića','salty':'Jedem puno slane hrane','snacker':'Jedem kasno navečer','none':'Ništa od navedenog'} },
    21:{ question:'Jesu li životne promjene utjecale na vašu težinu?', subtitle:'Možete odabrati više odgovora', options:{'marriage':'Veza ili brak','work':'Posao ili svakodnevna rutina','stress':'Stres ili emocionalno zdravlje','pregnancy':'Trudnoća','meds':'Lijekovi ili hormoni','none':'Ništa od navedenog'} },
    22:{ interstitial:{ headline:'Male promjene mogu donijeti veliku razliku', body:'Mnogi ljudi dobiju na težini nakon životnih promjena. Niste sami. Vodit ćemo vas i pružiti vam podršku.' } },
    23:{ question:'Unesite svoju visinu', placeholder:'npr. 168', hintTitle:'Izračunavamo vaš indeks tjelesne mase', hint:'BMI se široko koristi kao pokazatelj rizika za razvoj ili prisutnost raznih zdravstvenih problema.' },
    24:{ question:'Recite nam svoju trenutačnu težinu', placeholder:'npr. 165' },
    25:{ question:'Koju težinu želite postići?', placeholder:'npr. 140' },
    26:{ question:'Koliko imate godina?', placeholder:'npr. 35', hint:'To koristimo kako bismo plan učinili osobnijim.', buttonLabel:'Dalje' },
    27:{ question:'Unesite svoje ime', placeholder:'Vaše ime' },
    28:{ interstitial:{ headline:'Personalizirano hodanje u zatvorenom uz TAICHI COACH', body:'TAICHI COACH spaja lagano hodanje kod kuće s jednostavnim pokretima inspiriranima Tai Chijem. Vaš plan prilagođen je vašem tijelu, potrebama i svakodnevici kako biste se mogli kretati sigurno i dosljedno.' } },
    29:{ question:'Imate li nadolazeći događaj koji vas motivira da smršavite?', options:{'vacation':'Odmor ili putovanje','sporting-event':'Sportska aktivnost','beach-trip':'Put na plažu','wedding':'Vjenčanje','family-occasion':'Obiteljski događaj','reunion':'Susret s ljudima','none':'Nema posebnih planova'} },
    30:{ question:'Kada je vaš događaj?', subtitle:'To nam pomaže da izradimo plan koji odgovara vašem vremenu i ciljevima. Vaši podaci ostaju privatni.' },
  },
  il: {
    1:{ interstitial:{ headline:'יותר מ-21 מיליון אנשים כבר בחרו בדרך פשוטה יותר לזוז' } },
    2:{ interstitial:{ headline:'ברוכים הבאים ל-TAICHI COACH', body:'אתם כאן כדי להתחיל שגרת הליכה פשוטה בבית, בלי צורך לצאת החוצה. בואו נבין טוב יותר את המטרות והצרכים שלכם, כדי שנוכל לבנות את התוכנית הנכונה.' } },
    3:{ question:'מהן המטרות העיקריות שלכם?', subtitle:'אפשר לבחור יותר מאפשרות אחת', options:{'lose-weight':'לרדת במשקל','heart-health':'לשפר את בריאות הלב','firm-toned':'להרגיש יותר מחוטבים','lower-bio-age':'להרגיש צעירים ואנרגטיים יותר'} },
    4:{ interstitial:{ headline:'התחלה מצוינת, אתם בדרך הנכונה.', body:'עם TAICHI COACH תקבלו גישה מונחית ואישית שמתאימה את עצמה אליכם, כך שתמיד תדעו מה הצעד הבא.', note:'התוצאות משתנות בהתאם לעקביות ולגורמים אישיים.' } },
    5:{ question:'איך הייתם מתארים את הגוף שלכם כרגע?', options:{'mid-sized':'איפשהו באמצע','heavier':'קצת יותר כבד ממה שהייתי רוצה','overweight':'הרבה יותר כבד ממה שהייתי רוצה'} },
    6:{ question:'איך הייתם רוצים להרגיש בתוך הגוף שלכם?', options:{'thin':'קלילים ונוחים יותר','toned':'יותר מחוטבים וקצת יותר חזקים','curvy':'מאוזנים ובטוחים בעצמכם'} },
    7:{ question:'אילו אזורים בגוף הייתם רוצים לשפר?', subtitle:'אפשר לבחור יותר מאפשרות אחת', options:{'arms':'זרועות','abs':'בטן','booty':'ירכיים וישבן','legs':'רגליים'} },
    8:{ question:'מתי בפעם האחרונה הרגשתם בשיא הכושר שלכם?', options:{'less-1yr':'לפני פחות משנה','1-2yr':'לפני שנה עד שנתיים','over-3yr':'לפני יותר משלוש שנים','never':'מעולם לא הרגשתי כך'} },
    9:{ interstitial:{ headline:'אתם עושים עבודה נהדרת!', body:'הרבה אנשים חוששים שהם לא מספיק טובים. אנחנו מבינים את זה, וניקח זאת בחשבון כשנבנה את התוכנית שלכם.' } },
    10:{ question:'עד כמה אתם פעילים עכשיו?', options:{'advanced':'מאוד פעילים','intermediate':'די פעילים','beginner':'רק מתחילים'} },
    11:{ question:'עד כמה הגוף שלכם גמיש?', options:{'very-flexible':'גמיש מאוד','some-flexible':'קצת גמיש','not-flexible':'לא כל כך גמיש','unsure-flexible':'אני לא בטוח'} },
    12:{ question:'באיזו תדירות אתם מתאמנים?', options:{'daily':'כמעט כל יום','weekly':'כמה פעמים בשבוע','monthly':'כמה פעמים בחודש'} },
    13:{ question:'איך אתם מרגישים אחרי עלייה במדרגות?', options:{'breathless':'נגמר לי האוויר','winded':'אני מתעייף קצת, אבל בסדר','fine':'אני מרגיש טוב אחרי קומה אחת','easy':'אני עולה בקלות כמה קומות'} },
    14:{ question:'באיזו תדירות אתם יוצאים להליכה?', options:{'daily':'כמעט כל יום','weekly':'כמה פעמים בשבוע','monthly':'לעיתים רחוקות, בערך פעם בחודש'} },
    15:{ question:'האם יש לכם כאב או אי נוחות בגוף?', subtitle:'אפשר לבחור יותר מאפשרות אחת', options:{'back':'כאבי גב','knees':'כאבי ברכיים','elbows':'כאבי מרפקים','none':'אין בעיות'} },
    16:{ question:'איך נראה סדר היום שלכם?', options:{'9to5':'יש לי שגרת יום קבועה','nights':'אני עובד במשמרות לילה','flexible':'השעות שלי גמישות','retired':'אני בפנסיה'} },
    17:{ question:'איך בדרך כלל נראה היום שלכם?', options:{'on-feet':'אני זז הרבה במהלך היום','active':'אני זז לפעמים בהפסקות','sitting':'אני יושב רוב היום'} },
    18:{ question:'כמה שעות אתם ישנים בלילה?', options:{'less-5':'פחות מ-5 שעות','5-6':'5–6 שעות','7-8':'7–8 שעות','over-9':'יותר מ-8 שעות'} },
    19:{ question:'כמה מים אתם שותים ביום?', options:{'less-2':'בערך 1–2 כוסות','2-6':'בערך 3–5 כוסות','6-8':'6 כוסות או יותר','over-8':'אני שותה בעיקר קפה או תה'} },
    20:{ question:'האם יש לכם הרגלים שתרצו לשפר?', subtitle:'אפשר לבחור יותר מאפשרות אחת', options:{'sleep':'אני לא ישן מספיק','sugar':'אני אוכל יותר מדי סוכר','soda':'אני שותה הרבה משקאות מוגזים','salty':'אני אוכל הרבה מאכלים מלוחים','snacker':'אני אוכל מאוחר בלילה','none':'אף אחד מאלה'} },
    21:{ question:'האם שינויים בחיים השפיעו על המשקל שלכם?', subtitle:'אפשר לבחור יותר מאפשרות אחת', options:{'marriage':'זוגיות או נישואים','work':'עבודה או שגרת יום עמוסה','stress':'לחץ או בריאות רגשית','pregnancy':'היריון','meds':'תרופות או הורמונים','none':'אף אחד מאלה'} },
    22:{ interstitial:{ headline:'שינויים קטנים יכולים ליצור הבדל גדול', body:'הרבה אנשים עולים במשקל אחרי שינויים בחיים. אתם לא לבד. נלווה אתכם ונתמוך בכם לאורך הדרך.' } },
    23:{ question:'הזינו את הגובה שלכם', placeholder:'למשל 168', hintTitle:'אנחנו מחשבים את מדד מסת הגוף שלכם', hint:'BMI משמש לעיתים קרובות כמדד סיכון להתפתחות או לשכיחות של בעיות בריאות שונות.' },
    24:{ question:'ספרו לנו מה המשקל הנוכחי שלכם', placeholder:'למשל 165' },
    25:{ question:'לאיזה משקל הייתם רוצים להגיע?', placeholder:'למשל 140' },
    26:{ question:'מה הגיל שלכם?', placeholder:'למשל 35', hint:'אנחנו משתמשים בזה כדי להפוך את התוכנית לאישית יותר.', buttonLabel:'הבא' },
    27:{ question:'הזינו את שמכם', placeholder:'השם שלכם' },
    28:{ interstitial:{ headline:'הליכה ביתית מותאמת אישית עם TAICHI COACH', body:'TAICHI COACH משלב הליכה עדינה בבית עם תנועות פשוטות בהשראת טאי צ׳י. התוכנית מותאמת לגוף שלכם, לצרכים שלכם ולשגרת היום, כך שתוכלו לזוז בבטחה ובהתמדה.' } },
    29:{ question:'האם יש אירוע קרוב שמניע אתכם לרדת במשקל?', options:{'vacation':'חופשה או נסיעה','sporting-event':'פעילות ספורטיבית','beach-trip':'נסיעה לים','wedding':'חתונה','family-occasion':'אירוע משפחתי','reunion':'מפגש עם אנשים','none':'אין תוכניות מיוחדות'} },
    30:{ question:'מתי האירוע שלכם?', subtitle:'זה עוזר לנו לבנות תוכנית שמתאימה ללוח הזמנים ולמטרות שלכם. המידע שלכם נשאר פרטי.' },
  },
  jp: {
    1:{ interstitial:{ headline:'すでに2,100万人以上が、もっとシンプルな動き方を選んでいます' } },
    2:{ interstitial:{ headline:'TAICHI COACHへようこそ', body:'ご自宅で無理なく続けられる、シンプルな室内ウォーキング習慣を始めるために来ていただきました。目標やお悩みを知ることで、あなたに合ったプランを作成できます。' } },
    3:{ question:'主な目標は何ですか？', subtitle:'複数選択できます', options:{'lose-weight':'体重を減らしたい','heart-health':'心臓の健康を整えたい','firm-toned':'もっと引き締めたい','lower-bio-age':'若々しく元気に感じたい'} },
    4:{ interstitial:{ headline:'とても良いスタートです。このまま進みましょう。', body:'TAICHI COACHでは、あなたに合わせて調整されるガイド付きのプランで、次に何をすればよいか迷わず進めます。', note:'結果には継続度や個人差があります。' } },
    5:{ question:'今の体の印象をどう感じますか？', options:{'mid-sized':'中間くらい','heavier':'理想より少し重い','overweight':'理想よりかなり重い'} },
    6:{ question:'自分の体をどんなふうに感じたいですか？', options:{'thin':'もっと軽く、楽に感じたい','toned':'もう少し引き締めて強くなりたい','curvy':'バランスよく、自信を持ちたい'} },
    7:{ question:'どの部分を改善したいですか？', subtitle:'複数選択できます', options:{'arms':'腕','abs':'お腹','booty':'腰まわりとヒップ','legs':'脚'} },
    8:{ question:'最後に「自分のベストな状態」だと感じたのはいつですか？', options:{'less-1yr':'1年未満前','1-2yr':'1〜2年前','over-3yr':'3年以上前','never':'そう感じたことがない'} },
    9:{ interstitial:{ headline:'順調です！', body:'自分は十分ではないかもしれない、と不安になる方は多いです。その気持ちも含めて、あなたに合うプランを考えていきます。' } },
    10:{ question:'今の活動量はどのくらいですか？', options:{'advanced':'とても活動的','intermediate':'やや活動的','beginner':'始めたばかり'} },
    11:{ question:'体の柔軟性はどのくらいですか？', options:{'very-flexible':'かなり柔らかい','some-flexible':'少し柔らかい','not-flexible':'あまり柔らかくない','unsure-flexible':'よくわからない'} },
    12:{ question:'どのくらいの頻度で運動しますか？', options:{'daily':'ほぼ毎日','weekly':'週に数回','monthly':'月に数回'} },
    13:{ question:'階段を上った後、どのように感じますか？', options:{'breathless':'息が上がる','winded':'少し疲れるが問題ない','fine':'1フロア程度なら平気','easy':'数フロアでも楽に上がれる'} },
    14:{ question:'どのくらい定期的に歩いていますか？', options:{'daily':'ほぼ毎日','weekly':'週に数回','monthly':'まれに、月に1回程度'} },
    15:{ question:'体に痛みや不快感はありますか？', subtitle:'複数選択できます', options:{'back':'腰・背中の痛み','knees':'膝の痛み','elbows':'ひじの痛み','none':'特にない'} },
    16:{ question:'普段の生活スケジュールはどのような感じですか？', options:{'9to5':'日中はほぼ決まったスケジュール','nights':'夜勤がある','flexible':'時間は比較的自由','retired':'退職している'} },
    17:{ question:'普段の1日はどのような過ごし方ですか？', options:{'on-feet':'日中よく動く','active':'休憩時間に少し動くことがある','sitting':'ほとんど座って過ごす'} },
    18:{ question:'夜はどのくらい眠っていますか？', options:{'less-5':'5時間未満','5-6':'5〜6時間','7-8':'7〜8時間','over-9':'8時間以上'} },
    19:{ question:'1日にどのくらい水を飲みますか？', options:{'less-2':'コップ1〜2杯程度','2-6':'コップ3〜5杯程度','6-8':'6杯以上','over-8':'主にコーヒーやお茶を飲む'} },
    20:{ question:'改善したい習慣はありますか？', subtitle:'複数選択できます', options:{'sleep':'睡眠が足りない','sugar':'糖分をとりすぎる','soda':'炭酸飲料をよく飲む','salty':'塩分の多いものをよく食べる','snacker':'夜遅くに食べる','none':'特にない'} },
    21:{ question:'生活の変化が体重に影響しましたか？', subtitle:'複数選択できます', options:{'marriage':'交際・結婚','work':'仕事や毎日の忙しさ','stress':'ストレスや心の不調','pregnancy':'妊娠','meds':'薬やホルモンの影響','none':'特にない'} },
    22:{ interstitial:{ headline:'小さな変化でも大きな違いにつながります', body:'人生の変化をきっかけに体重が増える方は少なくありません。あなたは一人ではありません。私たちがしっかり寄り添います。' } },
    23:{ question:'身長を入力してください', placeholder:'例 168', hintTitle:'BMIを計算しています', hint:'BMIは、さまざまな健康上の問題のリスクを判断する目安として広く使われています。' },
    24:{ question:'現在の体重を教えてください', placeholder:'例 165' },
    25:{ question:'目標体重はどのくらいですか？', placeholder:'例 140' },
    26:{ question:'年齢を教えてください', placeholder:'例 35', hint:'よりあなたに合ったプランにするために使用します。', buttonLabel:'次へ' },
    27:{ question:'お名前を入力してください', placeholder:'お名前' },
    28:{ interstitial:{ headline:'TAICHI COACHで始める、あなた専用の室内ウォーキング', body:'TAICHI COACHは、自宅でのやさしいウォーキングとシンプルなTai Chiの動きを組み合わせています。体や生活に合わせて調整されるので、安全に、無理なく、続けやすくなります。' } },
    29:{ question:'体重を減らしたいと思うきっかけになる、近い予定はありますか？', options:{'vacation':'旅行や休暇','sporting-event':'スポーツの予定','beach-trip':'海やプールへのお出かけ','wedding':'結婚式','family-occasion':'家族のイベント','reunion':'人と会う予定','none':'特に予定はない'} },
    30:{ question:'その予定はいつですか？', subtitle:'予定の時期がわかると、目標に合ったプランを組みやすくなります。入力内容は外部に共有されません。' },
  },
  ru: {
    1:{ interstitial:{ headline:'Более 21 миллиона человек уже выбрали более простой способ двигаться' } },
    2:{ interstitial:{ headline:'Добро пожаловать в TAICHI COACH', body:'Вы здесь, чтобы начать простую домашнюю программу ходьбы, которую можно выполнять не выходя из дома. Давайте узнаем больше о ваших целях и потребностях, чтобы составить подходящий план.' } },
    3:{ question:'Каковы ваши главные цели?', subtitle:'Можно выбрать несколько вариантов', options:{'lose-weight':'Снизить вес','heart-health':'Улучшить здоровье сердца','firm-toned':'Стать более подтянутым','lower-bio-age':'Чувствовать себя моложе и энергичнее'} },
    4:{ interstitial:{ headline:'Отличное начало, вы на верном пути.', body:'С TAICHI COACH вы получите понятный и персональный подход, который подстраивается под вас, чтобы вы всегда знали, что делать дальше.', note:'Результаты зависят от вашей регулярности и индивидуальных факторов.' } },
    5:{ question:'Как бы вы описали своё тело сейчас?', options:{'mid-sized':'Где-то посередине','heavier':'Немного тяжелее, чем мне хотелось бы','overweight':'Гораздо тяжелее, чем мне хотелось бы'} },
    6:{ question:'Как вы хотели бы чувствовать себя в своём теле?', options:{'thin':'Легче и комфортнее','toned':'Более подтянутым и немного сильнее','curvy':'Сбалансированно и уверенно'} },
    7:{ question:'Какие зоны тела вы хотите улучшить?', subtitle:'Можно выбрать несколько вариантов', options:{'arms':'Руки','abs':'Живот','booty':'Бёдра и ягодицы','legs':'Ноги'} },
    8:{ question:'Когда вы в последний раз чувствовали себя в лучшей форме?', options:{'less-1yr':'Меньше года назад','1-2yr':'1–2 года назад','over-3yr':'Более 3 лет назад','never':'Я никогда так не чувствовал(а)'} },
    9:{ interstitial:{ headline:'У вас отлично получается!', body:'Многие переживают, что они недостаточно хороши. Мы это понимаем и учтём при создании вашего плана.' } },
    10:{ question:'Насколько вы активны сейчас?', options:{'advanced':'Очень активен','intermediate':'Довольно активен','beginner':'Только начинаю'} },
    11:{ question:'Насколько гибкое ваше тело?', options:{'very-flexible':'Очень гибкое','some-flexible':'Немного гибкое','not-flexible':'Не очень гибкое','unsure-flexible':'Я не уверен(а)'} },
    12:{ question:'Как часто вы занимаетесь спортом?', options:{'daily':'Почти каждый день','weekly':'Несколько раз в неделю','monthly':'Несколько раз в месяц'} },
    13:{ question:'Как вы себя чувствуете после подъёма по лестнице?', options:{'breathless':'Мне не хватает воздуха','winded':'Немного устаю, но в целом нормально','fine':'После одного пролёта чувствую себя хорошо','easy':'Легко поднимаюсь на несколько пролётов'} },
    14:{ question:'Как регулярно вы ходите пешком?', options:{'daily':'Почти каждый день','weekly':'Несколько раз в неделю','monthly':'Редко, примерно раз в месяц'} },
    15:{ question:'Есть ли у вас боли или дискомфорт в теле?', subtitle:'Можно выбрать несколько вариантов', options:{'back':'Боль в спине','knees':'Боль в коленях','elbows':'Боль в локтях','none':'Проблем нет'} },
    16:{ question:'Как выглядит ваш обычный день?', options:{'9to5':'У меня фиксированный дневной график','nights':'Я работаю в ночные смены','flexible':'У меня гибкий график','retired':'Я на пенсии'} },
    17:{ question:'Как обычно проходит ваш день?', options:{'on-feet':'Я много двигаюсь в течение дня','active':'Иногда двигаюсь в перерывах','sitting':'Большую часть дня сижу'} },
    18:{ question:'Сколько вы спите ночью?', options:{'less-5':'Меньше 5 часов','5-6':'5–6 часов','7-8':'7–8 часов','over-9':'Более 8 часов'} },
    19:{ question:'Сколько воды вы пьёте за день?', options:{'less-2':'Около 1–2 стаканов','2-6':'Около 3–5 стаканов','6-8':'6 и более стаканов','over-8':'В основном я пью кофе или чай'} },
    20:{ question:'Есть ли у вас привычки, которые вы хотите изменить?', subtitle:'Можно выбрать несколько вариантов', options:{'sleep':'Я мало сплю','sugar':'Я ем слишком много сладкого','soda':'Я пью много сладкой газировки','salty':'Я ем много солёного','snacker':'Я ем поздно вечером','none':'Ничего из этого'} },
    21:{ question:'Повлияли ли жизненные изменения на ваш вес?', subtitle:'Можно выбрать несколько вариантов', options:{'marriage':'Отношения или брак','work':'Работа или напряжённая рутина','stress':'Стресс или эмоциональное здоровье','pregnancy':'Беременность','meds':'Лекарства или гормоны','none':'Ничего из этого'} },
    22:{ interstitial:{ headline:'Небольшие изменения могут дать большой результат', body:'Многие набирают вес после перемен в жизни. Вы не одни. Мы будем рядом, чтобы направлять и поддерживать вас.' } },
    23:{ question:'Введите свой рост', placeholder:'например, 168', hintTitle:'Рассчитываем ваш индекс массы тела', hint:'ИМТ широко используется как показатель риска развития или наличия различных проблем со здоровьем.' },
    24:{ question:'Укажите ваш текущий вес', placeholder:'например, 165' },
    25:{ question:'Какого веса вы хотите достичь?', placeholder:'например, 140' },
    26:{ question:'Сколько вам лет?', placeholder:'например, 35', hint:'Это помогает сделать ваш план более персональным.', buttonLabel:'Далее' },
    27:{ question:'Введите ваше имя', placeholder:'Ваше имя' },
    28:{ interstitial:{ headline:'Персональная ходьба дома с TAICHI COACH', body:'TAICHI COACH сочетает мягкую домашнюю ходьбу с простыми движениями на основе Тай Чи. Ваш план учитывает ваше тело, ваши потребности и ваш ритм жизни, чтобы вы могли двигаться безопасно и регулярно.' } },
    29:{ question:'Есть ли у вас предстоящее событие, которое мотивирует вас похудеть?', options:{'vacation':'Отпуск или поездка','sporting-event':'Спортивное событие','beach-trip':'Поездка на пляж','wedding':'Свадьба','family-occasion':'Семейное событие','reunion':'Встреча с людьми','none':'Никаких особых планов'} },
    30:{ question:'Когда состоится это событие?', subtitle:'Это поможет нам составить план, который подойдёт под ваши сроки и цели. Ваша информация останется конфиденциальной.' },
  },
  sk: {
    1:{ interstitial:{ headline:'Viac ako 21 miliónov ľudí si už vybralo jednoduchší spôsob pohybu' } },
    2:{ interstitial:{ headline:'Vitajte v TAICHI COACH', body:'Ste tu preto, aby ste začali jednoduchú domácu rutinu chôdze, ktorú zvládnete bez odchodu z domu. Poďme sa pozrieť na vaše ciele a potreby, aby sme vytvorili správny plán.' } },
    3:{ question:'Aké sú vaše hlavné ciele?', subtitle:'Môžete si vybrať viac možností', options:{'lose-weight':'Schudnúť','heart-health':'Zlepšiť zdravie srdca','firm-toned':'Byť viac spevnený','lower-bio-age':'Cítiť sa mladšie a mať viac energie'} },
    4:{ interstitial:{ headline:'Skvelý začiatok, ste na dobrej ceste.', body:'S TAICHI COACH získate vedený a osobný prístup, ktorý sa prispôsobí vám, aby ste vždy vedeli, čo urobiť ďalej.', note:'Výsledky sa líšia podľa pravidelnosti a individuálnych faktorov.' } },
    5:{ question:'Ako by ste opísali svoje telo teraz?', options:{'mid-sized':'Niekde uprostred','heavier':'Trochu ťažšie, než by som chcel','overweight':'Oveľa ťažšie, než by som chcel'} },
    6:{ question:'Ako by ste sa chceli cítiť vo svojom tele?', options:{'thin':'Ľahšie a pohodlnejšie','toned':'Pevnejšie a trochu silnejšie','curvy':'Vyvážene a sebavedomo'} },
    7:{ question:'Ktoré časti tela chcete zlepšiť?', subtitle:'Môžete si vybrať viac možností', options:{'arms':'Ruky','abs':'Brucho','booty':'Boky a zadok','legs':'Nohy'} },
    8:{ question:'Kedy ste sa naposledy cítili vo svojej najlepšej forme?', options:{'less-1yr':'Pred menej ako 1 rokom','1-2yr':'Pred 1–2 rokmi','over-3yr':'Pred viac ako 3 rokmi','never':'Nikdy som sa tak necítil'} },
    9:{ interstitial:{ headline:'Darí sa vám skvele!', body:'Mnohí ľudia sa obávajú, že nie sú dosť dobrí. Rozumieme tomu a zohľadníme to pri tvorbe vášho plánu.' } },
    10:{ question:'Akí ste teraz aktívni?', options:{'advanced':'Veľmi aktívny','intermediate':'Dosť aktívny','beginner':'Len začínam'} },
    11:{ question:'Aké pružné je vaše telo?', options:{'very-flexible':'Veľmi pružné','some-flexible':'Trochu pružné','not-flexible':'Nie príliš pružné','unsure-flexible':'Nie som si istý'} },
    12:{ question:'Ako často cvičíte?', options:{'daily':'Takmer každý deň','weekly':'Niekoľkokrát za týždeň','monthly':'Niekoľkokrát za mesiac'} },
    13:{ question:'Ako sa cítite po výstupe po schodoch?', options:{'breathless':'Zadýcham sa','winded':'Trochu sa unavím, ale som v poriadku','fine':'Po jednom poschodí sa cítim dobre','easy':'Ľahko vyjdem viac poschodí'} },
    14:{ question:'Ako pravidelne chodíte na prechádzky?', options:{'daily':'Takmer každý deň','weekly':'Niekoľkokrát za týždeň','monthly':'Zriedka, asi raz za mesiac'} },
    15:{ question:'Máte bolesť alebo nepohodlie v tele?', subtitle:'Môžete si vybrať viac možností', options:{'back':'Bolesť chrbta','knees':'Bolesť kolien','elbows':'Bolesť lakťov','none':'Žiadne problémy'} },
    16:{ question:'Ako vyzerá váš denný rozvrh?', options:{'9to5':'Mám pevný denný režim','nights':'Pracujem na nočné zmeny','flexible':'Mám flexibilný rozvrh','retired':'Som na dôchodku'} },
    17:{ question:'Ako zvyčajne vyzerá váš deň?', options:{'on-feet':'Počas dňa sa veľa hýbem','active':'Niekedy sa hýbem počas prestávok','sitting':'Väčšinu dňa sedím'} },
    18:{ question:'Koľko spíte v noci?', options:{'less-5':'Menej ako 5 hodín','5-6':'5–6 hodín','7-8':'7–8 hodín','over-9':'Viac ako 8 hodín'} },
    19:{ question:'Koľko vody vypijete za deň?', options:{'less-2':'Približne 1–2 poháre','2-6':'Približne 3–5 pohárov','6-8':'6 a viac pohárov','over-8':'Väčšinou pijem kávu alebo čaj'} },
    20:{ question:'Máte návyky, ktoré chcete zlepšiť?', subtitle:'Môžete si vybrať viac možností', options:{'sleep':'Málo spím','sugar':'Jem príliš veľa cukru','soda':'Pijem veľa sladených nápojov','salty':'Jem veľa slaného jedla','snacker':'Jem neskoro večer','none':'Nič z toho'} },
    21:{ question:'Ovplyvnili zmeny v živote vašu hmotnosť?', subtitle:'Môžete si vybrať viac možností', options:{'marriage':'Vzťah alebo manželstvo','work':'Práca alebo každodenná rutina','stress':'Stres alebo emocionálne zdravie','pregnancy':'Tehotenstvo','meds':'Lieky alebo hormóny','none':'Nič z toho'} },
    22:{ interstitial:{ headline:'Malé zmeny môžu priniesť veľký rozdiel', body:'Mnohí ľudia po životných zmenách priberú. Nie ste v tom sami. Budeme vás viesť a podporovať.' } },
    23:{ question:'Zadajte svoju výšku', placeholder:'napr. 168', hintTitle:'Počítame váš index telesnej hmotnosti', hint:'BMI sa bežne používa ako ukazovateľ rizika vzniku alebo výskytu viacerých zdravotných problémov.' },
    24:{ question:'Povedzte nám svoju aktuálnu hmotnosť', placeholder:'napr. 165' },
    25:{ question:'Akú hmotnosť chcete dosiahnuť?', placeholder:'napr. 140' },
    26:{ question:'Koľko máte rokov?', placeholder:'napr. 35', hint:'Používame to na to, aby bol plán osobnejší.', buttonLabel:'Ďalej' },
    27:{ question:'Zadajte svoje meno', placeholder:'Vaše meno' },
    28:{ interstitial:{ headline:'Personalizovaná domáca chôdza s TAICHI COACH', body:'TAICHI COACH spája jemnú domácu chôdzu s jednoduchými pohybmi inšpirovanými Tai Chi. Váš plán sa prispôsobuje vášmu telu, potrebám aj každodennému rytmu, aby ste sa mohli hýbať bezpečne a pravidelne.' } },
    29:{ question:'Máte blížiacu sa udalosť, ktorá vás motivuje schudnúť?', options:{'vacation':'Dovolenka alebo výlet','sporting-event':'Športová aktivita','beach-trip':'Výlet k moru','wedding':'Svadba','family-occasion':'Rodinná udalosť','reunion':'Stretnutie s ľuďmi','none':'Žiadne špeciálne plány'} },
    30:{ question:'Kedy je vaša udalosť?', subtitle:'Pomáha nám to vytvoriť plán, ktorý sedí vášmu času aj cieľom. Vaše údaje zostanú súkromné.' },
  },
  tw: {
    1:{ interstitial:{ headline:'已有超過 2,100 萬人選擇更簡單的方式開始動起來' } },
    2:{ interstitial:{ headline:'歡迎來到 TAICHI COACH', body:'您來到這裡，是為了開始一套簡單、在家就能進行的室內步行習慣。讓我們先了解您的目標與需求，好為您建立真正適合的計畫。' } },
    3:{ question:'您的主要目標是什麼？', subtitle:'可複選', options:{'lose-weight':'減重','heart-health':'改善心臟健康','firm-toned':'讓身形更緊實','lower-bio-age':'感覺更年輕、更有精神'} },
    4:{ interstitial:{ headline:'很好的開始，您已經走在正確的路上。', body:'透過 TAICHI COACH，您將獲得一套會依照您狀況調整的個人化引導方式，讓您清楚知道下一步該做什麼。', note:'結果會依個人狀況與持續程度而有所不同。' } },
    5:{ question:'您會如何形容現在的身體狀態？', options:{'mid-sized':'大致剛好','heavier':'比理想中稍微重一些','overweight':'比理想中重很多'} },
    6:{ question:'您希望自己在身體裡感覺如何？', options:{'thin':'更輕盈、更舒服','toned':'更緊實，也更有力量一些','curvy':'更平衡、更有自信'} },
    7:{ question:'您想改善哪些身體部位？', subtitle:'可複選', options:{'arms':'手臂','abs':'腹部','booty':'臀部與髖部','legs':'腿部'} },
    8:{ question:'您上一次覺得自己狀態最好，是什麼時候？', options:{'less-1yr':'不到 1 年前','1-2yr':'1–2 年前','over-3yr':'3 年前以上','never':'我從未有過那種感覺'} },
    9:{ interstitial:{ headline:'您做得很好！', body:'很多人都會擔心自己做得不夠好。我們理解這種感受，也會在為您制定計畫時將它納入考量。' } },
    10:{ question:'您現在的活動量如何？', options:{'advanced':'非常活躍','intermediate':'有一些活動量','beginner':'剛開始而已'} },
    11:{ question:'您的身體柔軟度如何？', options:{'very-flexible':'相當柔軟','some-flexible':'有一點柔軟','not-flexible':'不太柔軟','unsure-flexible':'我不太確定'} },
    12:{ question:'您多久運動一次？', options:{'daily':'幾乎每天','weekly':'每週幾次','monthly':'每月幾次'} },
    13:{ question:'走樓梯後，您的感覺如何？', options:{'breathless':'會喘不過氣','winded':'會有點累，但還可以','fine':'走完一層樓還不錯','easy':'走好幾層樓也很輕鬆'} },
    14:{ question:'您平常多久散步一次？', options:{'daily':'幾乎每天','weekly':'每週幾次','monthly':'很少，大約一個月一次'} },
    15:{ question:'您的身體有疼痛或不適嗎？', subtitle:'可複選', options:{'back':'背痛','knees':'膝蓋痛','elbows':'手肘痛','none':'沒有問題'} },
    16:{ question:'您的日常作息大概是什麼樣子？', options:{'9to5':'我有固定白天作息','nights':'我上夜班','flexible':'我的時間很彈性','retired':'我已退休'} },
    17:{ question:'您平常的一天通常是怎麼過的？', options:{'on-feet':'白天會走動很多','active':'休息時偶爾會動一動','sitting':'大部分時間都坐著'} },
    18:{ question:'您晚上通常睡多久？', options:{'less-5':'少於 5 小時','5-6':'5–6 小時','7-8':'7–8 小時','over-9':'超過 8 小時'} },
    19:{ question:'您每天喝多少水？', options:{'less-2':'大約 1–2 杯','2-6':'大約 3–5 杯','6-8':'6 杯或更多','over-8':'我大多喝咖啡或茶'} },
    20:{ question:'您有想改善的生活習慣嗎？', subtitle:'可複選', options:{'sleep':'睡眠不足','sugar':'吃太多糖','soda':'喝很多含糖汽水','salty':'吃很多重鹹食物','snacker':'晚上很晚還會吃東西','none':'以上都沒有'} },
    21:{ question:'生活上的改變是否影響了您的體重？', subtitle:'可複選', options:{'marriage':'感情或婚姻','work':'工作或日常生活忙碌','stress':'壓力或情緒健康','pregnancy':'懷孕','meds':'藥物或荷爾蒙','none':'以上都沒有'} },
    22:{ interstitial:{ headline:'小小改變，也能帶來大不同', body:'很多人在經歷人生變化後會增加體重。您並不孤單，我們會一路陪著您，提供引導與支持。' } },
    23:{ question:'請輸入您的身高', placeholder:'例如 168', hintTitle:'正在計算您的身體質量指數', hint:'BMI 常被用來作為多種健康問題發展或盛行風險的參考指標。' },
    24:{ question:'請告訴我們您目前的體重', placeholder:'例如 165' },
    25:{ question:'您希望達到多少體重？', placeholder:'例如 140' },
    26:{ question:'您的年齡是？', placeholder:'例如 35', hint:'我們會用這項資訊讓您的計畫更貼近個人狀況。', buttonLabel:'下一步' },
    27:{ question:'請輸入您的名字', placeholder:'您的名字' },
    28:{ interstitial:{ headline:'使用 TAICHI COACH 的個人化室內步行', body:'TAICHI COACH 結合在家即可進行的溫和步行與簡單的 Tai Chi 動作。您的計畫會依照身體狀況、需求與日常生活節奏調整，讓您能安心且持續地動起來。' } },
    29:{ question:'是否有即將到來的活動，讓您更想減重？', options:{'vacation':'假期或旅行','sporting-event':'運動相關活動','beach-trip':'去海邊的行程','wedding':'婚禮','family-occasion':'家庭活動','reunion':'與人見面的聚會','none':'沒有特別安排'} },
    30:{ question:'那個活動是什麼時候？', subtitle:'這能幫助我們設計更符合您時間安排與目標的計畫。您的資訊會受到保護，不會外洩。' },
  },
}

export function useIntroT(lang: LangCode): IntroTranslations { return intro[lang] ?? intro.en }
export function useUITranslations(lang: LangCode): UITranslations { return ui[lang] ?? ui.en }
export function useStepPageT(lang: LangCode): StepPageTranslations { return stepPage[lang] ?? stepPage.en }
export function useResultT(lang: LangCode): ResultTranslations { return result[lang] ?? result.en }
export function useResults28T(lang: LangCode): Results28Translations { return results28[lang] ?? results28.en }
export function useWellnessT(lang: LangCode): WellnessTranslations { return wellness[lang] ?? wellness.en }
export function useLoadingT(lang: LangCode): LoadingTranslations { return loading[lang] ?? loading.en }
export function useEmailT(lang: LangCode): EmailTranslations { return email[lang] ?? email.en }

export function getTranslatedSteps(lang: LangCode): QuizStep[] {
  const overrides = quizSteps[lang]
  if (!overrides || Object.keys(overrides).length === 0) return QUIZ_STEPS
  return QUIZ_STEPS.map((step) => {
    const o = overrides[step.step]
    if (!o) return step
    return {
      ...step,
      ...(o.question && { question: o.question }),
      ...(o.subtitle && { subtitle: o.subtitle }),
      ...(o.placeholder && { placeholder: o.placeholder }),
      ...(o.hintTitle && { hintTitle: o.hintTitle }),
      ...(o.hint && { hint: o.hint }),
      ...(o.buttonLabel && { buttonLabel: o.buttonLabel }),
      ...(o.options && step.options && {
        options: step.options.map((opt) => ({ ...opt, label: o.options?.[opt.id] ?? opt.label })),
      }),
      ...(o.interstitial && step.interstitial && {
        interstitial: { ...step.interstitial, ...o.interstitial },
      }),
    }
  })
}
