import type { LangCode } from './lang-store'
import { QUIZ_STEPS } from './quiz-data'
import type { QuizStep } from './quiz-data'

export const LANGUAGES: { code: LangCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English',   flag: '🇬🇧' },
  { code: 'pl', label: 'Polski',    flag: '🇵🇱' },
  { code: 'de', label: 'Deutsch',   flag: '🇩🇪' },
  { code: 'es', label: 'Español',   flag: '🇪🇸' },
  { code: 'fr', label: 'Français',  flag: '🇫🇷' },
  { code: 'it', label: 'Italiano',  flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ru', label: 'Русский',   flag: '🇷🇺' },
]

// ─── INTRO PAGE ──────────────────────────────────────────────────────────────

export interface IntroTranslations {
  badge_quiz: string; badge_tag: string; headline: string
  age_group_label: string; age_question: string; img_alt: string; lang_button_aria: string
  consent_prefix: string; consent_tos: string; consent_cookie: string
  consent_privacy: string; consent_comma: string; consent_and: string
  age_18_29: string; age_30_39: string; age_40_49: string; age_50_plus: string
}

const intro: Record<LangCode, IntroTranslations> = {
  en: { badge_quiz:'1-minute quiz', badge_tag:'Find Your Personal Tai Chi Indoor Walking Plan', headline:'TAICHI COACH creates a simple, personalized indoor walking plan for weight loss', age_group_label:'Select your age range', age_question:'Which age group are you in?', img_alt:'Woman in green athletic wear standing full body', lang_button_aria:'Language: English', consent_prefix:'By continuing, you agree to our', consent_tos:'Terms of Service', consent_cookie:'Cookie Policy', consent_privacy:'Privacy Policy', consent_comma:',', consent_and:'and', age_18_29:'18–29', age_30_39:'30–39', age_40_49:'40–49', age_50_plus:'50+' },
  pl: { badge_quiz:'Quiz 1-minutowy', badge_tag:'Znajdź swój osobisty plan chodzenia Tai Chi w domu', headline:'TAICHI COACH tworzy prosty, spersonalizowany plan chodzenia w domu dla odchudzania', age_group_label:'Wybierz swój przedział wiekowy', age_question:'Do której grupy wiekowej należysz?', img_alt:'Kobieta w zielonej odzieży sportowej', lang_button_aria:'Język: Polski', consent_prefix:'Kontynuując, akceptujesz nasze', consent_tos:'Warunki korzystania', consent_cookie:'Politykę cookies', consent_privacy:'Politykę prywatności', consent_comma:',', consent_and:'i', age_18_29:'18–29', age_30_39:'30–39', age_40_49:'40–49', age_50_plus:'50+' },
  de: { badge_quiz:'1-Minuten-Quiz', badge_tag:'Finde deinen persönlichen Tai-Chi-Gehplan', headline:'TAICHI COACH erstellt einen personalisierten Gehplan zur Gewichtsreduktion', age_group_label:'Wähle deine Altersgruppe', age_question:'Zu welcher Altersgruppe gehörst du?', img_alt:'Frau in grüner Sportkleidung', lang_button_aria:'Sprache: Deutsch', consent_prefix:'Durch Fortfahren stimmst du unseren', consent_tos:'Nutzungsbedingungen', consent_cookie:'Cookie-Richtlinie', consent_privacy:'Datenschutzrichtlinie', consent_comma:',', consent_and:'und', age_18_29:'18–29', age_30_39:'30–39', age_40_49:'40–49', age_50_plus:'50+' },
  es: { badge_quiz:'Quiz de 1 minuto', badge_tag:'Encuentra tu plan personal de caminata Tai Chi', headline:'TAICHI COACH crea un plan de caminata personalizado para perder peso', age_group_label:'Selecciona tu rango de edad', age_question:'¿A qué grupo de edad perteneces?', img_alt:'Mujer con ropa deportiva verde', lang_button_aria:'Idioma: Español', consent_prefix:'Al continuar, aceptas nuestros', consent_tos:'Términos de servicio', consent_cookie:'Política de cookies', consent_privacy:'Política de privacidad', consent_comma:',', consent_and:'y', age_18_29:'18–29', age_30_39:'30–39', age_40_49:'40–49', age_50_plus:'50+' },
  fr: { badge_quiz:'Quiz de 1 minute', badge_tag:'Trouvez votre plan Tai Chi personnalisé', headline:'TAICHI COACH crée un plan de marche personnalisé pour perdre du poids', age_group_label:"Sélectionnez votre tranche d'âge", age_question:'À quel groupe d\'âge appartenez-vous ?', img_alt:'Femme en tenue de sport verte', lang_button_aria:'Langue : Français', consent_prefix:'En continuant, vous acceptez nos', consent_tos:"Conditions d'utilisation", consent_cookie:'Politique de cookies', consent_privacy:'Politique de confidentialité', consent_comma:',', consent_and:'et', age_18_29:'18–29', age_30_39:'30–39', age_40_49:'40–49', age_50_plus:'50+' },
  it: { badge_quiz:'Quiz di 1 minuto', badge_tag:'Trova il tuo piano Tai Chi personalizzato', headline:'TAICHI COACH crea un piano di camminata personalizzato per perdere peso', age_group_label:"Seleziona la tua fascia d'età", age_question:'A quale fascia d\'età appartieni?', img_alt:'Donna in abbigliamento sportivo verde', lang_button_aria:'Lingua: Italiano', consent_prefix:'Continuando, accetti i nostri', consent_tos:'Termini di servizio', consent_cookie:'Informativa sui cookie', consent_privacy:'Informativa sulla privacy', consent_comma:',', consent_and:'e', age_18_29:'18–29', age_30_39:'30–39', age_40_49:'40–49', age_50_plus:'50+' },
  pt: { badge_quiz:'Quiz de 1 minuto', badge_tag:'Encontre seu plano Tai Chi personalizado', headline:'TAICHI COACH cria um plano de caminhada personalizado para perda de peso', age_group_label:'Selecione sua faixa etária', age_question:'A qual faixa etária você pertence?', img_alt:'Mulher com roupa esportiva verde', lang_button_aria:'Idioma: Português', consent_prefix:'Ao continuar, você concorda com nossos', consent_tos:'Termos de serviço', consent_cookie:'Política de cookies', consent_privacy:'Política de privacidade', consent_comma:',', consent_and:'e', age_18_29:'18–29', age_30_39:'30–39', age_40_49:'40–49', age_50_plus:'50+' },
  ru: { badge_quiz:'Тест — 1 минута', badge_tag:'Найдите свой план ходьбы Тай Чи', headline:'TAICHI COACH создаёт персональный план ходьбы для похудения', age_group_label:'Выберите свою возрастную группу', age_question:'К какой возрастной группе вы относитесь?', img_alt:'Женщина в зелёной спортивной одежде', lang_button_aria:'Язык: Русский', consent_prefix:'Продолжая, вы соглашаетесь с нашими', consent_tos:'Условиями использования', consent_cookie:'Политикой cookies', consent_privacy:'Политикой конфиденциальности', consent_comma:',', consent_and:'и', age_18_29:'18–29', age_30_39:'30–39', age_40_49:'40–49', age_50_plus:'50+' },
}
export function useIntroT(lang: LangCode): IntroTranslations { return intro[lang] ?? intro.en }

// ─── UI (header, footer) ──────────────────────────────────────────────────────

export interface UITranslations {
  continue: string; skip: string; go_back: string; quiz_progress: string
}
const ui: Record<LangCode, UITranslations> = {
  en: { continue:'Continue', skip:'Skip this question', go_back:'Go back', quiz_progress:'Quiz progress' },
  pl: { continue:'Kontynuuj', skip:'Pomiń to pytanie', go_back:'Wróć', quiz_progress:'Postęp quizu' },
  de: { continue:'Weiter', skip:'Frage überspringen', go_back:'Zurück', quiz_progress:'Quiz-Fortschritt' },
  es: { continue:'Continuar', skip:'Omitir esta pregunta', go_back:'Volver', quiz_progress:'Progreso del quiz' },
  fr: { continue:'Continuer', skip:'Passer cette question', go_back:'Retour', quiz_progress:'Progression du quiz' },
  it: { continue:'Continua', skip:'Salta questa domanda', go_back:'Torna indietro', quiz_progress:'Avanzamento quiz' },
  pt: { continue:'Continuar', skip:'Pular esta pergunta', go_back:'Voltar', quiz_progress:'Progresso do quiz' },
  ru: { continue:'Продолжить', skip:'Пропустить вопрос', go_back:'Назад', quiz_progress:'Прогресс теста' },
}
export function useUITranslations(lang: LangCode): UITranslations { return ui[lang] ?? ui.en }

// ─── STEP PAGE INLINE STRINGS ────────────────────────────────────────────────

export interface StepPageTranslations {
  error_range: (min: number | string, max: number | string, unit: string) => string
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
  goal_too_low: string; goal_a_lot: string; goal_moderate: string; goal_small: string
  consent_text: string; consent_privacy_link: string
  char_count: (n: number) => string
}
const stepPage: Record<LangCode, StepPageTranslations> = {
  en: {
    error_range: (mn,mx,u) => `Please enter a value between ${mn} and ${mx} ${u}`.trim(),
    bmi_checking: 'Checking your BMI. This helps us build a plan that is right for your body.',
    bmi_underweight: (b) => 'Your BMI is ' + b + ', which is below the usual range',
    bmi_underweight_body: 'You may benefit from building strength and balanced nutrition.',
    bmi_normal: (b) => 'Your BMI is ' + b + ', which is in a healthy range',
    bmi_normal_body: 'You are on the right track. Keep going with your routine.',
    bmi_overweight: (b) => 'Your BMI is ' + b + ', which is considered to be overweight',
    bmi_overweight_body: 'Your weight requires more of your attention. We will use your index to tailor a weight loss program, fitting your needs and goals.',
    bmi_obese: (b) => 'Your BMI is ' + b + ', which is considered to be obese',
    bmi_obese_body: 'Your weight is risky for your health. We will use your index to create the weight loss program fitting your needs.',
    goal_placeholder: 'Enter your goal weight to see your personalized guidance',
    goal_weight_too_high: 'Your goal weight must be lower than your current weight.',
    goal_too_low: '👉 Your goal may be too low for your body. A healthy BMI is usually between 18.5 and 24.9. Please choose a goal that supports your health and feels realistic.',
    goal_a_lot: "👉 You have a big goal and that's okay. We will help you take it step by step, in a safe and steady way.",
    goal_moderate: '👉 This is a good and realistic goal. Small, steady progress can improve your health and how you feel.',
    goal_small: '👉 You are already close to your goal. Even small changes can improve your energy and daily comfort.',
    consent_text: 'I give permission to use my health data to create a personalized plan.',
    consent_privacy_link: 'Privacy Policy',
    char_count: (n) => `${n}/20`,
  },
  pl: {
    error_range: (mn,mx,u) => `Podaj wartość między ${mn} a ${mx} ${u}`.trim(),
    bmi_checking: 'Obliczamy Twoje BMI. To pomaga nam stworzyć plan odpowiedni dla Twojego ciała.',
    bmi_underweight: (b) => 'Twoje BMI wynosi ' + b + ', co jest poniżej typowego zakresu',
    bmi_underweight_body: 'Możesz skorzystać na budowaniu siły i zbilansowanym odżywianiu.',
    bmi_normal: (b) => 'Twoje BMI wynosi ' + b + ', co mieści się w zdrowym zakresie',
    bmi_normal_body: 'Jesteś na dobrej drodze. Kontynuuj swój rytm.',
    bmi_overweight: (b) => 'Twoje BMI wynosi ' + b + ', co uznawane jest za nadwagę',
    bmi_overweight_body: 'Twoja waga wymaga większej uwagi. Użyjemy Twojego wskaźnika, aby dopasować program odchudzania do Twoich potrzeb i celów.',
    bmi_obese: (b) => 'Twoje BMI wynosi ' + b + ', co uznawane jest za otyłość',
    bmi_obese_body: 'Twoja waga stanowi ryzyko dla zdrowia. Użyjemy Twojego wskaźnika, aby stworzyć program odchudzania dopasowany do Twoich potrzeb.',
    goal_placeholder: 'Podaj wagę docelową, aby zobaczyć spersonalizowane wskazówki',
    goal_weight_too_high: 'Waga docelowa musi być niższa niż aktualna waga.',
    goal_too_low: '👉 Twój cel może być za niski dla Twojego ciała. Zdrowe BMI mieści się zazwyczaj między 18,5 a 24,9. Wybierz cel, który jest zdrowy i realistyczny.',
    goal_a_lot: '👉 Masz ambitny cel — to w porządku. Pomożemy Ci realizować go krok po kroku, bezpiecznie i stabilnie.',
    goal_moderate: '👉 To dobry i realistyczny cel. Małe, systematyczne postępy poprawią Twoje zdrowie i samopoczucie.',
    goal_small: '👉 Jesteś już blisko swojego celu. Nawet małe zmiany mogą poprawić Twoją energię i codzienny komfort.',
    consent_text: 'Wyrażam zgodę na użycie moich danych zdrowotnych w celu stworzenia spersonalizowanego planu.',
    consent_privacy_link: 'Polityka prywatności',
    char_count: (n) => `${n}/20`,
  },
  de: {
    error_range: (mn,mx,u) => `Bitte einen Wert zwischen ${mn} und ${mx} ${u} eingeben`.trim(),
    bmi_checking: 'Wir berechnen deinen BMI. Das hilft uns, den richtigen Plan für dich zu erstellen.',
    bmi_underweight: (b) => 'Dein BMI beträgt ' + b + ', was unter dem üblichen Bereich liegt',
    bmi_underweight_body: 'Du kannst von Kraftaufbau und ausgewogener Ernährung profitieren.',
    bmi_normal: (b) => 'Dein BMI beträgt ' + b + ', was im gesunden Bereich liegt',
    bmi_normal_body: 'Du bist auf dem richtigen Weg. Bleib dabei.',
    bmi_overweight: (b) => 'Dein BMI beträgt ' + b + ', was als Übergewicht gilt',
    bmi_overweight_body: 'Dein Gewicht erfordert mehr Aufmerksamkeit. Wir nutzen deinen Index, um ein Abnehmprogramm zu erstellen, das zu deinen Bedürfnissen und Zielen passt.',
    bmi_obese: (b) => 'Dein BMI beträgt ' + b + ', was als Adipositas gilt',
    bmi_obese_body: 'Dein Gewicht ist ein Risiko für deine Gesundheit. Wir nutzen deinen Index, um ein Abnehmprogramm zu erstellen, das zu deinen Bedürfnissen passt.',
    goal_placeholder: 'Gib dein Zielgewicht ein, um personalisierte Hinweise zu erhalten',
    goal_weight_too_high: 'Dein Zielgewicht muss niedriger sein als dein aktuelles Gewicht.',
    goal_too_low: '👉 Dein Ziel könnte zu niedrig für deinen Körper sein. Ein gesunder BMI liegt zwischen 18,5 und 24,9.',
    goal_a_lot: '👉 Du hast ein großes Ziel – das ist in Ordnung. Wir helfen dir, es Schritt für Schritt zu erreichen.',
    goal_moderate: '👉 Das ist ein gutes und realistisches Ziel. Stetiger Fortschritt verbessert deine Gesundheit.',
    goal_small: '👉 Du bist bereits nah an deinem Ziel. Selbst kleine Änderungen verbessern deine Energie.',
    consent_text: 'Ich erlaube die Nutzung meiner Gesundheitsdaten zur Erstellung eines personalisierten Plans.',
    consent_privacy_link: 'Datenschutzrichtlinie',
    char_count: (n) => `${n}/20`,
  },
  es: {
    error_range: (mn,mx,u) => `Por favor ingresa un valor entre ${mn} y ${mx} ${u}`.trim(),
    bmi_checking: 'Calculando tu IMC. Esto nos ayuda a crear el plan adecuado para tu cuerpo.',
    bmi_underweight: (b) => 'Tu IMC es ' + b + ', que está por debajo del rango habitual',
    bmi_underweight_body: 'Puede beneficiarte desarrollar fuerza y llevar una nutrición equilibrada.',
    bmi_normal: (b) => 'Tu IMC es ' + b + ', que se encuentra en un rango saludable',
    bmi_normal_body: 'Vas por buen camino. Sigue con tu rutina.',
    bmi_overweight: (b) => 'Tu IMC es ' + b + ', lo que se considera sobrepeso',
    bmi_overweight_body: 'Tu peso requiere más atención. Usaremos tu índice para diseñar un programa de pérdida de peso adaptado a tus necesidades y objetivos.',
    bmi_obese: (b) => 'Tu IMC es ' + b + ', lo que se considera obesidad',
    bmi_obese_body: 'Tu peso representa un riesgo para tu salud. Usaremos tu índice para crear el programa de pérdida de peso que se ajuste a tus necesidades.',
    goal_placeholder: 'Ingresa tu peso objetivo para ver tu guía personalizada',
    goal_weight_too_high: 'Tu peso objetivo debe ser menor que tu peso actual.',
    goal_too_low: '👉 Tu objetivo puede ser demasiado bajo para tu cuerpo. Un IMC saludable está entre 18,5 y 24,9.',
    goal_a_lot: '👉 Tienes una meta grande y eso está bien. Te ayudaremos a alcanzarla paso a paso.',
    goal_moderate: '👉 Este es un objetivo bueno y realista. El progreso constante mejora tu salud.',
    goal_small: '👉 Ya estás cerca de tu objetivo. Pequeños cambios pueden mejorar tu energía.',
    consent_text: 'Doy permiso para usar mis datos de salud para crear un plan personalizado.',
    consent_privacy_link: 'Política de privacidad',
    char_count: (n) => `${n}/20`,
  },
  fr: {
    error_range: (mn,mx,u) => `Veuillez entrer une valeur entre ${mn} et ${mx} ${u}`.trim(),
    bmi_checking: 'Calcul de votre IMC en cours. Cela nous aide à créer le bon plan pour votre corps.',
    bmi_underweight: (b) => 'Votre IMC est ' + b + ', ce qui est en dessous de la plage habituelle',
    bmi_underweight_body: 'Vous pourriez bénéficier d\'un renforcement musculaire et d\'une nutrition équilibrée.',
    bmi_normal: (b) => 'Votre IMC est ' + b + ', ce qui est dans une plage saine',
    bmi_normal_body: 'Vous êtes sur la bonne voie. Continuez avec votre routine.',
    bmi_overweight: (b) => 'Votre IMC est ' + b + ', ce qui est considéré comme un surpoids',
    bmi_overweight_body: 'Votre poids nécessite plus d\'attention. Nous utiliserons votre indice pour adapter un programme de perte de poids à vos besoins et objectifs.',
    bmi_obese: (b) => 'Votre IMC est ' + b + ', ce qui est considéré comme de l\'obésité',
    bmi_obese_body: 'Votre poids représente un risque pour votre santé. Nous utiliserons votre indice pour créer le programme de perte de poids adapté à vos besoins.',
    goal_placeholder: 'Entrez votre poids cible pour voir vos conseils personnalisés',
    goal_weight_too_high: 'Votre poids cible doit être inférieur à votre poids actuel.',
    goal_too_low: '👉 Votre objectif est peut-être trop bas pour votre corps. Un IMC sain se situe généralement entre 18,5 et 24,9.',
    goal_a_lot: "👉 Vous avez un grand objectif et c'est normal. Nous vous aiderons à l'atteindre étape par étape.",
    goal_moderate: '👉 C\'est un bon objectif réaliste. Des progrès constants améliorent votre santé.',
    goal_small: '👉 Vous êtes déjà proche de votre objectif. Même de petits changements améliorent votre énergie.',
    consent_text: "J'autorise l'utilisation de mes données de santé pour créer un plan personnalisé.",
    consent_privacy_link: 'Politique de confidentialité',
    char_count: (n) => `${n}/20`,
  },
  it: {
    error_range: (mn,mx,u) => `Inserisci un valore tra ${mn} e ${mx} ${u}`.trim(),
    bmi_checking: 'Calcolo del tuo BMI in corso. Ci aiuta a creare il piano giusto per il tuo corpo.',
    bmi_underweight: (b) => 'Il tuo BMI è ' + b + ', che è al di sotto del range abituale',
    bmi_underweight_body: 'Potresti beneficiare di esercizi di rafforzamento e di una nutrizione equilibrata.',
    bmi_normal: (b) => 'Il tuo BMI è ' + b + ', che rientra nel range sano',
    bmi_normal_body: 'Sei sulla strada giusta. Continua con la tua routine.',
    bmi_overweight: (b) => 'Il tuo BMI è ' + b + ', che è considerato sovrappeso',
    bmi_overweight_body: 'Il tuo peso richiede maggiore attenzione. Useremo il tuo indice per personalizzare un programma di perdita di peso adatto alle tue esigenze e ai tuoi obiettivi.',
    bmi_obese: (b) => 'Il tuo BMI è ' + b + ', che è considerato obesità',
    bmi_obese_body: 'Il tuo peso è un rischio per la tua salute. Useremo il tuo indice per creare il programma di perdita di peso adatto alle tue esigenze.',
    goal_placeholder: 'Inserisci il tuo peso obiettivo per vedere la guida personalizzata',
    goal_weight_too_high: 'Il tuo peso obiettivo deve essere inferiore al tuo peso attuale.',
    goal_too_low: '👉 Il tuo obiettivo potrebbe essere troppo basso per il tuo corpo. Un BMI sano è solitamente tra 18,5 e 24,9.',
    goal_a_lot: "👉 Hai un grande obiettivo ed è normale. Ti aiuteremo a raggiungerlo passo dopo passo.",
    goal_moderate: '👉 Questo è un obiettivo buono e realistico. Progressi costanti migliorano la tua salute.',
    goal_small: '👉 Sei già vicino al tuo obiettivo. Anche piccoli cambiamenti migliorano la tua energia.',
    consent_text: 'Autorizzo l\'uso dei miei dati sanitari per creare un piano personalizzato.',
    consent_privacy_link: 'Informativa sulla privacy',
    char_count: (n) => `${n}/20`,
  },
  pt: {
    error_range: (mn,mx,u) => `Por favor, insira um valor entre ${mn} e ${mx} ${u}`.trim(),
    bmi_checking: 'Calculando seu IMC. Isso nos ajuda a criar o plano certo para o seu corpo.',
    bmi_underweight: (b) => 'Seu IMC é ' + b + ', que está abaixo do intervalo habitual',
    bmi_underweight_body: 'Você pode se beneficiar de exercícios de fortalecimento e de uma nutrição equilibrada.',
    bmi_normal: (b) => 'Seu IMC é ' + b + ', que está em um intervalo saudável',
    bmi_normal_body: 'Você está no caminho certo. Continue com sua rotina.',
    bmi_overweight: (b) => 'Seu IMC é ' + b + ', o que é considerado sobrepeso',
    bmi_overweight_body: 'Seu peso requer mais atenção. Usaremos seu índice para personalizar um programa de perda de peso adaptado às suas necessidades e objetivos.',
    bmi_obese: (b) => 'Seu IMC é ' + b + ', o que é considerado obesidade',
    bmi_obese_body: 'Seu peso representa um risco para a sua saúde. Usaremos seu índice para criar o programa de perda de peso adequado às suas necessidades.',
    goal_placeholder: 'Insira seu peso alvo para ver sua orientação personalizada',
    goal_weight_too_high: 'O seu peso alvo deve ser inferior ao seu peso atual.',
    goal_too_low: '👉 Seu objetivo pode ser muito baixo para o seu corpo. Um IMC saudável está geralmente entre 18,5 e 24,9.',
    goal_a_lot: '👉 Você tem uma grande meta e está tudo bem. Vamos ajudá-lo a alcançá-la passo a passo.',
    goal_moderate: '👉 Este é um objetivo bom e realista. Progresso constante melhora sua saúde.',
    goal_small: '👉 Você já está perto do seu objetivo. Pequenas mudanças podem melhorar sua energia.',
    consent_text: 'Dou permissão para usar meus dados de saúde para criar um plano personalizado.',
    consent_privacy_link: 'Política de privacidade',
    char_count: (n) => `${n}/20`,
  },
  ru: {
    error_range: (mn,mx,u) => `Введите значение от ${mn} до ${mx} ${u}`.trim(),
    bmi_checking: 'Рассчитываем ваш ИМТ. Это помогает нам создать правильный план для вашего тела.',
    bmi_underweight: (b) => 'Ваш ИМТ — ' + b + ', что ниже обычного диапазона',
    bmi_underweight_body: 'Вам может помочь укрепление мышц и сбалансированное питание.',
    bmi_normal: (b) => 'Ваш ИМТ — ' + b + ', что соответствует здоровому диапазону',
    bmi_normal_body: 'Вы на правильном пути. Продолжайте в том же духе.',
    bmi_overweight: (b) => 'Ваш ИМТ — ' + b + ', что считается избыточным весом',
    bmi_overweight_body: 'Ваш вес требует большего внимания. Мы используем ваш индекс, чтобы подобрать программу похудения, соответствующую вашим потребностям и целям.',
    bmi_obese: (b) => 'Ваш ИМТ — ' + b + ', что считается ожирением',
    bmi_obese_body: 'Ваш вес представляет риск для здоровья. Мы используем ваш индекс, чтобы создать программу похудения, подходящую вашим потребностям.',
    goal_placeholder: 'Введите целевой вес, чтобы увидеть персональные рекомендации',
    goal_weight_too_high: 'Целевой вес должен быть меньше текущего веса.',
    goal_too_low: '👉 Ваша цель может быть слишком низкой для вашего тела. Здоровый ИМТ обычно от 18,5 до 24,9.',
    goal_a_lot: '👉 У вас большая цель — это нормально. Мы поможем вам достичь её шаг за шагом.',
    goal_moderate: '👉 Это хорошая и реалистичная цель. Постепенный прогресс улучшит ваше здоровье.',
    goal_small: '👉 Вы уже близко к цели. Даже небольшие изменения улучшат вашу энергию.',
    consent_text: 'Я разрешаю использование моих данных о здоровье для создания персонального плана.',
    consent_privacy_link: 'Политика конфиденциальности',
    char_count: (n) => `${n}/20`,
  },
}
export function useStepPageT(lang: LangCode): StepPageTranslations { return stepPage[lang] ?? stepPage.en }

// ─── RESULT PAGE ──────────────────────────────────────────────────────────────

export interface ResultTranslations {
  header_label: string; headline: string; subtitle: string
  guide_text: string; cta: string
}
const result: Record<LangCode, ResultTranslations> = {
  en: { header_label:'Your Plan', headline:'Your personal plan is ready', subtitle:"You're moving in the right direction.", guide_text:'We will guide you step by step so you can stay consistent and see progress.', cta:'Get My Plan' },
  pl: { header_label:'Twój Plan', headline:'Twój osobisty plan jest gotowy', subtitle:'Zmierzasz we właściwym kierunku.', guide_text:'Przeprowadzimy Cię krok po kroku, abyś mógł/mogła być konsekwentny/a i widzieć postępy.', cta:'Pobierz mój plan' },
  de: { header_label:'Dein Plan', headline:'Dein persönlicher Plan ist fertig', subtitle:'Du bist auf dem richtigen Weg.', guide_text:'Wir begleiten dich Schritt für Schritt, damit du konsequent bleibst und Fortschritte siehst.', cta:'Meinen Plan holen' },
  es: { header_label:'Tu Plan', headline:'Tu plan personal está listo', subtitle:'Estás avanzando en la dirección correcta.', guide_text:'Te guiaremos paso a paso para que puedas mantenerte constante y ver el progreso.', cta:'Obtener mi plan' },
  fr: { header_label:'Votre Plan', headline:'Votre plan personnel est prêt', subtitle:'Vous allez dans la bonne direction.', guide_text:'Nous vous guiderons étape par étape pour rester constant(e) et voir des progrès.', cta:'Obtenir mon plan' },
  it: { header_label:'Il tuo Piano', headline:'Il tuo piano personale è pronto', subtitle:'Stai andando nella giusta direzione.', guide_text:'Ti guideremo passo dopo passo per restare costante e vedere i progressi.', cta:'Ottieni il mio piano' },
  pt: { header_label:'Seu Plano', headline:'Seu plano pessoal está pronto', subtitle:'Você está indo na direção certa.', guide_text:'Vamos guiá-lo passo a passo para que possa manter a consistência e ver o progresso.', cta:'Obter meu plano' },
  ru: { header_label:'Ваш план', headline:'Ваш личный план готов', subtitle:'Вы движетесь в правильном направлении.', guide_text:'Мы проведём вас шаг за шагом, чтобы вы оставались последовательны и видели прогресс.', cta:'Получить мой план' },
}
export function useResultT(lang: LangCode): ResultTranslations { return result[lang] ?? result.en }

// ─── RESULTS-28 PAGE ─────────────────────────────────────────────────────────

export interface Results28Translations {
  header_label: string; your_weight: string; now: string; after_4_weeks: string
  week: (n: number) => string; chart_note: string; headline: string
}
const results28: Record<LangCode, Results28Translations> = {
  en: { header_label:'Your Plan', your_weight:'Your weight', now:'Now', after_4_weeks:'After 4 weeks', week:(n)=>`Week ${n}`, chart_note:'This chart is for illustrative purposes only', headline:'Get visible results in only 28 days!' },
  pl: { header_label:'Twój Plan', your_weight:'Twoja waga', now:'Teraz', after_4_weeks:'Po 4 tygodniach', week:(n)=>`Tydzień ${n}`, chart_note:'Ten wykres ma charakter wyłącznie ilustracyjny', headline:'Osiągnij widoczne rezultaty w zaledwie 28 dni!' },
  de: { header_label:'Dein Plan', your_weight:'Dein Gewicht', now:'Jetzt', after_4_weeks:'Nach 4 Wochen', week:(n)=>`Woche ${n}`, chart_note:'Diese Grafik dient nur zur Veranschaulichung', headline:'Sichtbare Ergebnisse in nur 28 Tagen!' },
  es: { header_label:'Tu Plan', your_weight:'Tu peso', now:'Ahora', after_4_weeks:'Después de 4 semanas', week:(n)=>`Semana ${n}`, chart_note:'Este gráfico es solo ilustrativo', headline:'¡Obtén resultados visibles en solo 28 días!' },
  fr: { header_label:'Votre Plan', your_weight:'Votre poids', now:'Maintenant', after_4_weeks:'Après 4 semaines', week:(n)=>`Semaine ${n}`, chart_note:"Ce graphique est uniquement à titre illustratif", headline:'Obtenez des résultats visibles en seulement 28 jours !' },
  it: { header_label:'Il tuo Piano', your_weight:'Il tuo peso', now:'Adesso', after_4_weeks:'Dopo 4 settimane', week:(n)=>`Settimana ${n}`, chart_note:'Questo grafico è solo a scopo illustrativo', headline:'Ottieni risultati visibili in soli 28 giorni!' },
  pt: { header_label:'Seu Plano', your_weight:'Seu peso', now:'Agora', after_4_weeks:'Após 4 semanas', week:(n)=>`Semana ${n}`, chart_note:'Este gráfico é apenas ilustrativo', headline:'Obtenha resultados visíveis em apenas 28 dias!' },
  ru: { header_label:'Ваш план', your_weight:'Ваш вес', now:'Сейчас', after_4_weeks:'Через 4 недели', week:(n)=>`Неделя ${n}`, chart_note:'График носит исключительно иллюстративный характер', headline:'Видимые результаты всего за 28 дней!' },
}
export function useResults28T(lang: LangCode): Results28Translations { return results28[lang] ?? results28.en }

// ─── WELLNESS PAGE ────────────────────────────────────────────────────────────

export interface WellnessTranslations {
  header_label: string; headline: string
  lifestyle_label: string; eater_label: string; motivation_label: string
  img_alt: string; warning_title: string; warning_desc: string
  bmi_normal_msg: string
  bmi_overweight_msg: string
  bmi_obese_msg: string
  lifestyle: Record<string, string>
  eater: { balanced: string; sweet: string; salty: string; emotional: string }
  motivation: { high: string; moderate: string; low: string }
}
const wellness: Record<LangCode, WellnessTranslations> = {
  en: { header_label:'Wellness Profile', headline:'Here is your personal profile', lifestyle_label:'Lifestyle', eater_label:'Type of Eater', motivation_label:'Fitness Motivation', img_alt:'Person in athletic wear', warning_title:'Risks for an unhealthy BMI', warning_desc:'Your weight is risky for your health. We will use your index to create the weight loss program fitting your needs.', bmi_normal_msg:'Your BMI is in a healthy range. Keep maintaining your good habits.', bmi_overweight_msg:'Your BMI shows your weight is above the usual range. Our plan will help you improve step by step.', bmi_obese_msg:'Your BMI shows your weight is higher than recommended. We will guide you with a safe, personalized plan.', lifestyle:{'on-feet':'Active','active':'Moderately active','sitting':'Mostly sedentary','advanced':'Very active','intermediate':'Moderately active','beginner':'Light'}, eater:{balanced:'Balanced',sweet:'Sweet tooth',salty:'Salty snacker',emotional:'Emotional eater'}, motivation:{high:'High',moderate:'Moderate',low:'Low'} },
  pl: { header_label:'Profil zdrowotny', headline:'Oto Twój osobisty profil', lifestyle_label:'Styl życia', eater_label:'Typ jedzącego', motivation_label:'Motywacja do ćwiczeń', img_alt:'Osoba w stroju sportowym', warning_title:'Ryzyko związane z niezdrowym BMI', warning_desc:'Twoja waga stanowi ryzyko dla zdrowia. Użyjemy Twojego wskaźnika, aby stworzyć program odchudzania dopasowany do Twoich potrzeb.', bmi_normal_msg:'Twoje BMI mieści się w zdrowym zakresie. Dbaj o swoje dobre nawyki.', bmi_overweight_msg:'Twoje BMI wskazuje, że Twoja waga jest powyżej typowego zakresu. Nasz plan pomoże Ci poprawiać się krok po kroku.', bmi_obese_msg:'Twoje BMI wskazuje, że Twoja waga jest wyższa niż zalecana. Przeprowadzimy Cię przez bezpieczny, spersonalizowany plan.', lifestyle:{'on-feet':'Aktywny/a','active':'Umiarkowanie aktywny/a','sitting':'Głównie siedzący/a','advanced':'Bardzo aktywny/a','intermediate':'Umiarkowanie aktywny/a','beginner':'Lekki/a'}, eater:{balanced:'Zrównoważony/a',sweet:'Słodkolubny/a',salty:'Miłośnik/czka soli',emotional:'Emocjonalny/a jedzący/a'}, motivation:{high:'Wysoka',moderate:'Umiarkowana',low:'Niska'} },
  de: { header_label:'Wellness-Profil', headline:'Hier ist dein persönliches Profil', lifestyle_label:'Lebensstil', eater_label:'Esstyp', motivation_label:'Fitness-Motivation', img_alt:'Person in Sportkleidung', warning_title:'Risiken eines ungesunden BMI', warning_desc:'Dein Gewicht ist ein Gesundheitsrisiko. Wir nutzen deinen Index, um ein passendes Abnehmprogramm zu erstellen.', bmi_normal_msg:'Dein BMI liegt im gesunden Bereich. Behalte deine guten Gewohnheiten bei.', bmi_overweight_msg:'Dein BMI zeigt, dass dein Gewicht über dem üblichen Bereich liegt. Unser Plan hilft dir, dich Schritt für Schritt zu verbessern.', bmi_obese_msg:'Dein BMI zeigt, dass dein Gewicht höher als empfohlen ist. Wir begleiten dich mit einem sicheren, personalisierten Plan.', lifestyle:{'on-feet':'Aktiv','active':'Mäßig aktiv','sitting':'Überwiegend sitzend','advanced':'Sehr aktiv','intermediate':'Mäßig aktiv','beginner':'Leicht aktiv'}, eater:{balanced:'Ausgewogen',sweet:'Naschkatze',salty:'Salzliebhaber',emotional:'Emotionsesser'}, motivation:{high:'Hoch',moderate:'Mittel',low:'Niedrig'} },
  es: { header_label:'Perfil de bienestar', headline:'Aquí está tu perfil personal', lifestyle_label:'Estilo de vida', eater_label:'Tipo de comedor', motivation_label:'Motivación fitness', img_alt:'Persona con ropa deportiva', warning_title:'Riesgos de un IMC poco saludable', warning_desc:'Tu peso representa un riesgo para tu salud. Usaremos tu índice para crear el programa de pérdida de peso adecuado.', bmi_normal_msg:'Tu IMC está en un rango saludable. Sigue manteniendo tus buenos hábitos.', bmi_overweight_msg:'Tu IMC indica que tu peso está por encima del rango habitual. Nuestro plan te ayudará a mejorar paso a paso.', bmi_obese_msg:'Tu IMC indica que tu peso es superior al recomendado. Te guiaremos con un plan seguro y personalizado.', lifestyle:{'on-feet':'Activo','active':'Moderadamente activo','sitting':'Mayormente sedentario','advanced':'Muy activo','intermediate':'Moderadamente activo','beginner':'Ligero'}, eater:{balanced:'Equilibrado',sweet:'Goloso',salty:'Amante de lo salado',emotional:'Comedor emocional'}, motivation:{high:'Alta',moderate:'Moderada',low:'Baja'} },
  fr: { header_label:'Profil bien-être', headline:'Voici votre profil personnel', lifestyle_label:'Style de vie', eater_label:'Type de mangeur', motivation_label:'Motivation fitness', img_alt:'Personne en tenue sportive', warning_title:'Risques d\'un IMC malsain', warning_desc:'Votre poids représente un risque pour votre santé. Nous utiliserons votre indice pour créer un programme de perte de poids adapté.', bmi_normal_msg:'Votre IMC est dans une plage saine. Continuez à entretenir vos bonnes habitudes.', bmi_overweight_msg:'Votre IMC indique que votre poids est au-dessus de la plage habituelle. Notre plan vous aidera à vous améliorer étape par étape.', bmi_obese_msg:'Votre IMC indique que votre poids est plus élevé que recommandé. Nous vous guiderons avec un plan sûr et personnalisé.', lifestyle:{'on-feet':'Actif','active':'Modérément actif','sitting':'Principalement sédentaire','advanced':'Très actif','intermediate':'Modérément actif','beginner':'Léger'}, eater:{balanced:'Équilibré',sweet:'Bec sucré',salty:'Amateur de sel',emotional:'Mangeur émotionnel'}, motivation:{high:'Élevée',moderate:'Modérée',low:'Faible'} },
  it: { header_label:'Profilo benessere', headline:'Ecco il tuo profilo personale', lifestyle_label:'Stile di vita', eater_label:'Tipo di mangiatore', motivation_label:'Motivazione fitness', img_alt:'Persona in abbigliamento sportivo', warning_title:'Rischi di un BMI non sano', warning_desc:'Il tuo peso rappresenta un rischio per la tua salute. Useremo il tuo indice per creare un programma di perdita di peso adatto.', bmi_normal_msg:'Il tuo BMI è nel range sano. Continua a mantenere le tue buone abitudini.', bmi_overweight_msg:'Il tuo BMI indica che il tuo peso è sopra il range abituale. Il nostro piano ti aiuterà a migliorare passo dopo passo.', bmi_obese_msg:'Il tuo BMI indica che il tuo peso è più alto del raccomandato. Ti guideremo con un piano sicuro e personalizzato.', lifestyle:{'on-feet':'Attivo','active':'Moderatamente attivo','sitting':'Principalmente sedentario','advanced':'Molto attivo','intermediate':'Moderatamente attivo','beginner':'Leggero'}, eater:{balanced:'Equilibrato',sweet:'Goloso',salty:'Amante del salato',emotional:'Mangiatore emotivo'}, motivation:{high:'Alta',moderate:'Moderata',low:'Bassa'} },
  pt: { header_label:'Perfil de bem-estar', headline:'Aqui está o seu perfil pessoal', lifestyle_label:'Estilo de vida', eater_label:'Tipo de comedor', motivation_label:'Motivação fitness', img_alt:'Pessoa com roupa esportiva', warning_title:'Riscos de um IMC não saudável', warning_desc:'Seu peso representa um risco para a sua saúde. Usaremos seu índice para criar um programa de perda de peso adequado.', bmi_normal_msg:'Seu IMC está em um intervalo saudável. Continue mantendo seus bons hábitos.', bmi_overweight_msg:'Seu IMC indica que seu peso está acima do intervalo habitual. Nosso plano vai ajudá-lo a melhorar passo a passo.', bmi_obese_msg:'Seu IMC indica que seu peso está acima do recomendado. Vamos guiá-lo com um plano seguro e personalizado.', lifestyle:{'on-feet':'Ativo','active':'Moderadamente ativo','sitting':'Principalmente sedentário','advanced':'Muito ativo','intermediate':'Moderadamente ativo','beginner':'Leve'}, eater:{balanced:'Equilibrado',sweet:'Guloso',salty:'Amante do salgado',emotional:'Comedor emocional'}, motivation:{high:'Alta',moderate:'Moderada',low:'Baixa'} },
  ru: { header_label:'Профиль здоровья', headline:'Вот ваш личный профиль', lifestyle_label:'Образ жизни', eater_label:'Тип питания', motivation_label:'Мотивация к фитнесу', img_alt:'Человек в спортивной одежде', warning_title:'Риски нездорового ИМТ', warning_desc:'Ваш вес представляет риск для здоровья. Мы используем ваш индекс для создания подходящей программы похудения.', bmi_normal_msg:'Ваш ИМТ в здоровом диапазоне. Продолжайте придерживаться своих хороших привычек.', bmi_overweight_msg:'Ваш ИМТ показывает, что ваш вес выше обычного диапазона. Наш план поможет вам улучшить результат шаг за шагом.', bmi_obese_msg:'Ваш ИМТ показывает, что ваш вес выше рекомендованного. Мы проведём вас через безопасный персональный план.', lifestyle:{'on-feet':'Активный','active':'Умеренно активный','sitting':'Преимущественно сидячий','advanced':'Очень активный','intermediate':'Умеренно активный','beginner':'Слабоактивный'}, eater:{balanced:'Сбалансированный',sweet:'Сладкоежка',salty:'Любитель солёного',emotional:'Эмоциональный едок'}, motivation:{high:'Высокая',moderate:'Умеренная',low:'Низкая'} },
}
export function useWellnessT(lang: LangCode): WellnessTranslations { return wellness[lang] ?? wellness.en }

// ─── LOADING PAGES ────────────────────────────────────────────────────────────

export interface LoadingTranslations { header_label: string; title: string }
const loading: Record<LangCode, LoadingTranslations> = {
  en: { header_label:'Creating plan', title:'Creating your personalised Tai Chi Indoor Walking workout plan' },
  pl: { header_label:'Tworzenie planu', title:'Tworzymy Twój spersonalizowany plan treningowy Tai Chi Indoor Walking' },
  de: { header_label:'Plan wird erstellt', title:'Wir erstellen deinen personalisierten Tai Chi Indoor Walking Trainingsplan' },
  es: { header_label:'Creando plan', title:'Creando tu plan de entrenamiento personalizado de Caminata Tai Chi' },
  fr: { header_label:'Création du plan', title:'Création de votre programme d\'entraînement Tai Chi Indoor Walking personnalisé' },
  it: { header_label:'Creazione piano', title:'Stiamo creando il tuo piano di allenamento personalizzato Tai Chi Indoor Walking' },
  pt: { header_label:'Criando plano', title:'Criando seu plano de treino personalizado de Caminhada Tai Chi' },
  ru: { header_label:'Создание плана', title:'Создаём ваш персональный план тренировок Tai Chi Indoor Walking' },
}
export function useLoadingT(lang: LangCode): LoadingTranslations { return loading[lang] ?? loading.en }

// ─── EMAIL PAGE ───────────────────────────────────────────────────────────────

export interface EmailTranslations {
  header_label: string; headline: string; email_label: string; placeholder: string
  clear_aria: string; privacy_note: string; privacy_link: string
}
const email: Record<LangCode, EmailTranslations> = {
  en: { header_label:'Almost done', headline:'Enter your email to get your Personal Tai Chi Indoor Walking Workout Plan', email_label:'Your email address', placeholder:'your@email.com', clear_aria:'Clear email', privacy_note:'Please check our {link} to understand how we use your data', privacy_link:'Privacy Policy' },
  pl: { header_label:'Prawie gotowe', headline:'Podaj swój adres e-mail, aby otrzymać spersonalizowany plan treningowy Tai Chi Indoor Walking', email_label:'Twój adres e-mail', placeholder:'twoj@email.com', clear_aria:'Wyczyść e-mail', privacy_note:'Zapoznaj się z naszą {link}, aby dowiedzieć się, jak używamy Twoich danych', privacy_link:'Polityką prywatności' },
  de: { header_label:'Fast fertig', headline:'Gib deine E-Mail ein, um deinen persönlichen Tai Chi Indoor Walking Trainingsplan zu erhalten', email_label:'Deine E-Mail-Adresse', placeholder:'deine@email.com', clear_aria:'E-Mail löschen', privacy_note:'Bitte lese unsere {link}, um zu verstehen, wie wir deine Daten verwenden', privacy_link:'Datenschutzrichtlinie' },
  es: { header_label:'Casi listo', headline:'Ingresa tu correo para obtener tu plan personal de Caminata Tai Chi', email_label:'Tu dirección de correo electrónico', placeholder:'tu@email.com', clear_aria:'Limpiar correo', privacy_note:'Consulta nuestra {link} para entender cómo usamos tus datos', privacy_link:'Política de privacidad' },
  fr: { header_label:'Presque terminé', headline:'Entrez votre e-mail pour obtenir votre programme Tai Chi Indoor Walking personnalisé', email_label:'Votre adresse e-mail', placeholder:'votre@email.com', clear_aria:'Effacer l\'e-mail', privacy_note:'Consultez notre {link} pour comprendre comment nous utilisons vos données', privacy_link:'Politique de confidentialité' },
  it: { header_label:'Quasi fatto', headline:'Inserisci la tua email per ricevere il tuo piano Tai Chi Indoor Walking personalizzato', email_label:'Il tuo indirizzo email', placeholder:'tua@email.com', clear_aria:'Cancella email', privacy_note:'Consulta la nostra {link} per capire come utilizziamo i tuoi dati', privacy_link:'Informativa sulla privacy' },
  pt: { header_label:'Quase pronto', headline:'Insira seu e-mail para receber seu plano Tai Chi Indoor Walking personalizado', email_label:'Seu endereço de e-mail', placeholder:'seu@email.com', clear_aria:'Limpar e-mail', privacy_note:'Consulte nossa {link} para entender como usamos seus dados', privacy_link:'Política de privacidade' },
  ru: { header_label:'Почти готово', headline:'Введите email, чтобы получить ваш персональный план Tai Chi Indoor Walking', email_label:'Ваш адрес электронной почты', placeholder:'ваш@email.com', clear_aria:'Очистить email', privacy_note:'Ознакомьтесь с нашей {link}, чтобы узнать, как мы используем ваши данные', privacy_link:'Политикой конфиденциальности' },
}
export function useEmailT(lang: LangCode): EmailTranslations { return email[lang] ?? email.en }

// ─── QUIZ STEP TRANSLATIONS ───────────────────────────────────────────────────

type QuizStepT = {
  question?: string; subtitle?: string; hint?: string
  buttonLabel?: string; placeholder?: string
  options?: Record<string, string>
  interstitial?: { headline?: string; body?: string; note?: string }
}

const quizSteps: Record<LangCode, Record<number, QuizStepT>> = {
  en: {},
  pl: {
    1: { interstitial: { headline:'Ponad 21 milionów ludzi wybrało już prostszy sposób na ruch' } },
    2: { interstitial: { headline:'Witamy w TAICHI COACH', body:"Jesteś tutaj, aby rozpocząć prostą rutynę chodzenia w domu — bez wychodzenia z domu. Poznajmy Twoje cele i potrzeby, aby stworzyć odpowiedni plan dla Ciebie." } },
    3: { question:'Jakie są Twoje główne cele?', subtitle:'Możesz wybrać więcej niż jeden', options:{'lose-weight':'Schudnąć','heart-health':'Poprawić zdrowie serca','firm-toned':'Uzyskać bardziej wysportowaną sylwetkę','lower-bio-age':'Czuć się młodziej i mieć więcej energii'} },
    4: { interstitial: { headline:'Świetny start — jesteś na dobrej drodze.', body:'Dzięki TAICHI COACH otrzymasz spersonalizowane wskazówki, które dostosowują się do Ciebie, abyś zawsze wiedział/a co zrobić dalej.', note:'Wyniki będą się różnić w zależności od regularności i indywidualnych czynników.' } },
    5: { question:'Jak opisałbyś/opisałabyś swoje ciało teraz?', options:{'mid-sized':'Gdzieś pośrodku','heavier':'Trochę cięższe niż chcę','overweight':'Znacznie cięższe niż chcę'} },
    6: { question:'Jak chciałbyś/chciałabyś się czuć w swoim ciele?', options:{'thin':'Lżejszy/a i bardziej komfortowy/a','toned':'Bardziej wysportowany/a i silniejszy/a','curvy':'Zrównoważony/a i pewny/a swojego kształtu'} },
    7: { question:'Które partie ciała chciałbyś/chciałabyś poprawić?', subtitle:'Możesz wybrać więcej niż jeden', options:{'arms':'Ramiona','abs':'Brzuch','booty':'Biodra i pośladki','legs':'Nogi'} },
    8: { question:'Kiedy ostatnio byłeś/byłaś w najlepszej formie?', options:{'less-1yr':'Mniej niż rok temu','1-2yr':'1–2 lata temu','over-3yr':'Ponad 3 lata temu','never':'Nigdy tak się nie czułem/czułam'} },
    9: { interstitial: { headline:'Świetnie sobie radzisz!', body:'Wiele osób martwi się, że nie jest wystarczająco dobra. Rozumiemy to i weźmiemy to pod uwagę, tworząc Twój plan.' } },
    10: { question:'Jak aktywny/a jesteś teraz?', options:{'advanced':'Bardzo aktywny/a','intermediate':'Umiarkowanie aktywny/a','beginner':'Dopiero zaczynam'} },
    11: { question:'Jak elastyczne jest Twoje ciało?', options:{'very-flexible':'Bardzo elastyczne','some-flexible':'Trochę elastyczne','not-flexible':'Nieelastyczne','unsure-flexible':'Nie jestem pewien/pewna'} },
    12: { question:'Jak często ćwiczysz?', options:{'daily':'Prawie codziennie','weekly':'Kilka razy w tygodniu','monthly':'Kilka razy w miesiącu'} },
    13: { question:'Jak się czujesz po wejściu na schody?', options:{'breathless':'Jestem bez tchu','winded':'Jestem trochę zmęczony/a, ale ok','fine':'Czuję się dobrze po jednym piętrze','easy':'Łatwo wchodzę na kilka pięter'} },
    14: { question:'Jak regularnie chodzisz na spacery?', options:{'daily':'Prawie codziennie','weekly':'Kilka razy w tygodniu','monthly':'Rzadko (około raz w miesiącu)'} },
    15: { question:'Czy masz jakieś bóle lub dolegliwości?', subtitle:'Możesz wybrać więcej niż jeden', options:{'back':'Ból pleców','knees':'Ból kolan','elbows':'Ból łokci','none':'Brak problemów'} },
    16: { question:'Jak wygląda Twój codzienny harmonogram?', options:{'9to5':'Mam stały harmonogram dzienny','nights':'Pracuję na nocną zmianę','flexible':'Moje godziny są elastyczne','retired':'Jestem na emeryturze'} },
    17: { question:'Jak zazwyczaj wygląda Twój dzień?', options:{'on-feet':'Dużo się ruszam w ciągu dnia','active':'Czasem się ruszam w przerwach','sitting':'Przez większość dnia siedzę'} },
    18: { question:'Ile śpisz w nocy?', options:{'less-5':'Mniej niż 5 godzin','5-6':'5–6 godzin','7-8':'7–8 godzin','over-9':'Ponad 8 godzin'} },
    19: { question:'Ile wody pijesz każdego dnia?', options:{'less-2':'Około 1–2 szklanki','2-6':'Około 3–5 szklanek','6-8':'6 lub więcej szklanek','over-8':'Głównie piję kawę lub herbatę'} },
    20: { question:'Czy masz nawyki, które chciałbyś/chciałabyś zmienić?', subtitle:'Możesz wybrać więcej niż jeden', options:{'sleep':'Nie śpię wystarczająco','sugar':'Jem za dużo cukru','soda':'Piję dużo napojów gazowanych','salty':'Jem dużo słonych potraw','snacker':'Jem późno w nocy','none':'Żaden z tych'} },
    21: { question:'Czy jakieś zmiany życiowe wpłynęły na Twoją wagę?', subtitle:'Możesz wybrać więcej niż jeden', options:{'marriage':'Związek lub małżeństwo','work':'Praca lub codzienna rutyna','stress':'Stres lub zdrowie emocjonalne','pregnancy':'Ciąża','meds':'Leki lub hormony','none':'Żaden z tych'} },
    22: { interstitial: { headline:'Małe zmiany mogą zrobić wielką różnicę', body:'Wiele osób przybiera na wadze po zmianach życiowych. Nie jesteś sam/a. Poprowadzimy Cię i wesprzemy w Twojej drodze.' } },
    23: { question:'Podaj swój wzrost', placeholder:'np. 168' },
    24: { question:'Podaj swoją aktualną wagę', placeholder:'np. 75' },
    25: { question:'Jaką wagę chciałbyś/chciałabyś osiągnąć?', placeholder:'np. 64' },
    26: { question:'Ile masz lat?', placeholder:'np. 35', hint:'Używamy tego, aby Twój plan był bardziej osobisty.', buttonLabel:'Dalej' },
    27: { question:'Podaj swoje imię', placeholder:'Twoje imię' },
    28: { interstitial: { headline:'Spersonalizowane chodzenie w domu z TAICHI COACH', body:'TAICHI COACH łączy delikatne chodzenie w domu z prostymi ruchami opartymi na Tai Chi. Twój plan jest dostosowany do Twojego ciała, Twoich potrzeb i Twojego codziennego życia.' } },
    29: { question:'Czy masz jakieś nadchodzące wydarzenie, które motywuje Cię do schudnięcia?', options:{'vacation':'Wakacje lub podróż','sporting-event':'Aktywność sportowa','beach-trip':'Wyjazd na plażę','wedding':'Ślub','family-occasion':'Wydarzenie rodzinne','reunion':'Spotkanie ze znajomymi','none':'Brak specjalnych planów'} },
    30: { question:'Kiedy jest Twoje wydarzenie?', subtitle:'Pomaga nam to stworzyć plan dopasowany do Twojego harmonogramu. Twoje informacje są prywatne.' },
  },
  de: {
    1: { interstitial: { headline:'Über 21 Millionen Menschen haben sich bereits für einen einfacheren Weg zu bewegen entschieden' } },
    2: { interstitial: { headline:'Willkommen bei TAICHI COACH', body:'Du bist hier, um eine einfache Indoor-Gehroutine zu starten. Lass uns mehr über deine Ziele erfahren, um den richtigen Plan für dich zu erstellen.' } },
    3: { question:'Was sind deine Hauptziele?', subtitle:'Du kannst mehr als eines auswählen', options:{'lose-weight':'Gewicht verlieren','heart-health':'Herzgesundheit verbessern','firm-toned':'Mehr Tonus bekommen','lower-bio-age':'Jünger fühlen und mehr Energie haben'} },
    4: { interstitial: { headline:'Toller Start – du bist auf dem richtigen Weg.', body:'Mit TAICHI COACH erhältst du einen geführten, personalisierten Ansatz, der sich an dich anpasst.', note:'Ergebnisse können je nach Konsequenz und individuellen Faktoren variieren.' } },
    5: { question:'Wie würdest du deinen Körper jetzt beschreiben?', options:{'mid-sized':'In der Mitte','heavier':'Etwas schwerer als ich möchte','overweight':'Viel schwerer als ich möchte'} },
    6: { question:'Wie möchtest du dich in deinem Körper fühlen?', options:{'thin':'Leichter und komfortabler','toned':'Straffer und etwas stärker','curvy':'Ausgeglichen und selbstbewusst'} },
    7: { question:'Welche Körperbereiche möchtest du verbessern?', subtitle:'Du kannst mehr als eines auswählen', options:{'arms':'Arme','abs':'Bauch','booty':'Hüften & Gesäß','legs':'Beine'} },
    8: { question:'Wann warst du zuletzt in deiner besten Form?', options:{'less-1yr':'Vor weniger als 1 Jahr','1-2yr':'Vor 1–2 Jahren','over-3yr':'Vor mehr als 3 Jahren','never':'Ich habe das nie so gefühlt'} },
    9: { interstitial: { headline:'Du machst das großartig!', body:'Viele Menschen machen sich Sorgen, dass sie nicht gut genug sind. Wir verstehen das und werden es berücksichtigen.' } },
    10: { question:'Wie aktiv bist du gerade?', options:{'advanced':'Sehr aktiv','intermediate':'Mäßig aktiv','beginner':'Gerade erst anfangen'} },
    11: { question:'Wie flexibel ist dein Körper?', options:{'very-flexible':'Sehr flexibel','some-flexible':'Etwas flexibel','not-flexible':'Nicht flexibel','unsure-flexible':'Ich bin nicht sicher'} },
    12: { question:'Wie oft trainierst du?', options:{'daily':'Fast jeden Tag','weekly':'Ein paar Mal pro Woche','monthly':'Ein paar Mal pro Monat'} },
    13: { question:'Wie fühlst du dich nach dem Treppensteigen?', options:{'breathless':'Ich bin außer Atem','winded':'Ich bin etwas müde, aber ok','fine':'Ich fühle mich nach einer Etage gut','easy':'Ich kann problemlos mehrere Etagen steigen'} },
    14: { question:'Wie regelmäßig gehst du spazieren?', options:{'daily':'Fast jeden Tag','weekly':'Ein paar Mal pro Woche','monthly':'Selten (ca. einmal im Monat)'} },
    15: { question:'Hast du Schmerzen oder Beschwerden?', subtitle:'Du kannst mehr als eines auswählen', options:{'back':'Rückenschmerzen','knees':'Knieschmerzen','elbows':'Ellenbogenschmerzen','none':'Keine Probleme'} },
    16: { question:'Wie sieht dein Tagesplan aus?', options:{'9to5':'Ich habe einen festen Tagesplan','nights':'Ich arbeite Nachtschichten','flexible':'Meine Zeiten sind flexibel','retired':'Ich bin im Ruhestand'} },
    17: { question:'Wie sieht dein Alltag normalerweise aus?', options:{'on-feet':'Ich bewege mich viel','active':'Ich bewege mich manchmal in Pausen','sitting':'Ich sitze den größten Teil des Tages'} },
    18: { question:'Wie lange schläfst du nachts?', options:{'less-5':'Unter 5 Stunden','5-6':'5–6 Stunden','7-8':'7–8 Stunden','over-9':'Über 8 Stunden'} },
    19: { question:'Wie viel Wasser trinkst du täglich?', options:{'less-2':'Ca. 1–2 Gläser','2-6':'Ca. 3–5 Gläser','6-8':'6 oder mehr Gläser','over-8':'Ich trinke hauptsächlich Kaffee oder Tee'} },
    20: { question:'Hast du Gewohnheiten, die du verbessern möchtest?', subtitle:'Du kannst mehr als eines auswählen', options:{'sleep':'Ich schlafe nicht genug','sugar':'Ich esse zu viel Zucker','soda':'Ich trinke viel Soda','salty':'Ich esse viel Salziges','snacker':'Ich esse spät nachts','none':'Keines davon'} },
    21: { question:'Haben Lebensveränderungen dein Gewicht beeinflusst?', subtitle:'Du kannst mehr als eines auswählen', options:{'marriage':'Beziehung oder Ehe','work':'Arbeit oder Alltag','stress':'Stress oder emotionale Gesundheit','pregnancy':'Schwangerschaft','meds':'Medikamente oder Hormone','none':'Keines davon'} },
    22: { interstitial: { headline:'Kleine Veränderungen können einen großen Unterschied machen', body:'Viele Menschen nehmen nach Lebensveränderungen zu. Du bist nicht allein. Wir begleiten dich.' } },
    23: { question:'Gib deine Größe ein', placeholder:'z.B. 168' },
    24: { question:'Gib dein aktuelles Gewicht ein', placeholder:'z.B. 75' },
    25: { question:'Welches Gewicht möchtest du erreichen?', placeholder:'z.B. 64' },
    26: { question:'Wie alt bist du?', placeholder:'z.B. 35', hint:'Wir nutzen dies, um deinen Plan persönlicher zu gestalten.', buttonLabel:'Weiter' },
    27: { question:'Gib deinen Namen ein', placeholder:'Dein Name' },
    28: { interstitial: { headline:'Personalisiertes Indoor-Gehen mit TAICHI COACH', body:'TAICHI COACH kombiniert sanftes Gehen zu Hause mit einfachen Tai Chi-Bewegungen. Dein Plan ist auf deinen Körper zugeschnitten.' } },
    29: { question:'Hast du ein bevorstehendes Ereignis, das dich motiviert abzunehmen?', options:{'vacation':'Urlaub oder Reise','sporting-event':'Sportliche Aktivität','beach-trip':'Strandurlaub','wedding':'Hochzeit','family-occasion':'Familienevent','reunion':'Treffen mit Freunden','none':'Keine besonderen Pläne'} },
    30: { question:'Wann ist dein Ereignis?', subtitle:'Das hilft uns, einen Plan zu erstellen, der zu deinem Zeitplan passt.' },
  },
  es: {
    1: { interstitial: { headline:'Más de 21 millones de personas ya eligieron una forma más sencilla de moverse' } },
    2: { interstitial: { headline:'Bienvenido a TAICHI COACH', body:'Estás aquí para comenzar una rutina sencilla de caminata en casa. Aprendamos más sobre tus objetivos para crear el plan adecuado.' } },
    3: { question:'¿Cuáles son tus objetivos principales?', subtitle:'Puedes elegir más de uno', options:{'lose-weight':'Perder peso','heart-health':'Mejorar la salud del corazón','firm-toned':'Tonificarme más','lower-bio-age':'Sentirme más joven y con más energía'} },
    4: { interstitial: { headline:'¡Buen comienzo — vas por buen camino!', body:'Con TAICHI COACH obtendrás un enfoque guiado y personalizado que se adapta a ti.', note:'Los resultados variarán según tu constancia y factores individuales.' } },
    5: { question:'¿Cómo describirías tu cuerpo ahora?', options:{'mid-sized':'En el medio','heavier':'Un poco más pesado de lo que quiero','overweight':'Mucho más pesado de lo que quiero'} },
    6: { question:'¿Cómo te gustaría sentirte en tu cuerpo?', options:{'thin':'Más ligero y cómodo','toned':'Más tonificado y algo más fuerte','curvy':'Equilibrado y seguro de mi figura'} },
    7: { question:'¿Qué partes de tu cuerpo te gustaría mejorar?', subtitle:'Puedes elegir más de uno', options:{'arms':'Brazos','abs':'Abdomen','booty':'Caderas y glúteos','legs':'Piernas'} },
    8: { question:'¿Cuándo fue la última vez que estuviste en tu mejor forma?', options:{'less-1yr':'Hace menos de 1 año','1-2yr':'Hace 1–2 años','over-3yr':'Hace más de 3 años','never':'Nunca me he sentido así'} },
    9: { interstitial: { headline:'¡Lo estás haciendo genial!', body:'Muchas personas se preocupan por no ser suficientemente buenas. Lo entendemos y lo tendremos en cuenta.' } },
    10: { question:'¿Qué tan activo eres ahora?', options:{'advanced':'Muy activo','intermediate':'Algo activo','beginner':'Recién empezando'} },
    11: { question:'¿Qué tan flexible es tu cuerpo?', options:{'very-flexible':'Muy flexible','some-flexible':'Algo flexible','not-flexible':'No flexible','unsure-flexible':'No estoy seguro/a'} },
    12: { question:'¿Con qué frecuencia haces ejercicio?', options:{'daily':'Casi todos los días','weekly':'Varias veces por semana','monthly':'Varias veces al mes'} },
    13: { question:'¿Cómo te sientes después de subir escaleras?', options:{'breathless':'Me quedo sin aliento','winded':'Me canso un poco, pero bien','fine':'Me siento bien después de un piso','easy':'Puedo subir varios pisos fácilmente'} },
    14: { question:'¿Con qué regularidad caminas?', options:{'daily':'Casi todos los días','weekly':'Varias veces a la semana','monthly':'Raramente (una vez al mes)'} },
    15: { question:'¿Tienes algún dolor o malestar?', subtitle:'Puedes elegir más de uno', options:{'back':'Dolor de espalda','knees':'Dolor de rodillas','elbows':'Dolor de codos','none':'Sin problemas'} },
    16: { question:'¿Cómo es tu horario diario?', options:{'9to5':'Tengo un horario fijo diurno','nights':'Trabajo turnos nocturnos','flexible':'Mi horario es flexible','retired':'Estoy jubilado'} },
    17: { question:'¿Cómo suele ser tu día?', options:{'on-feet':'Me muevo mucho durante el día','active':'Me muevo a veces en los descansos','sitting':'Estoy sentado la mayor parte del día'} },
    18: { question:'¿Cuánto duermes por la noche?', options:{'less-5':'Menos de 5 horas','5-6':'5–6 horas','7-8':'7–8 horas','over-9':'Más de 8 horas'} },
    19: { question:'¿Cuánta agua bebes al día?', options:{'less-2':'Unas 1–2 vasos','2-6':'Unos 3–5 vasos','6-8':'6 o más vasos','over-8':'Principalmente bebo café o té'} },
    20: { question:'¿Tienes hábitos que quieras mejorar?', subtitle:'Puedes elegir más de uno', options:{'sleep':'No duermo suficiente','sugar':'Como demasiado azúcar','soda':'Bebo mucha soda','salty':'Como mucha comida salada','snacker':'Como tarde en la noche','none':'Ninguno de estos'} },
    21: { question:'¿Algún cambio de vida ha afectado tu peso?', subtitle:'Puedes elegir más de uno', options:{'marriage':'Relación o matrimonio','work':'Trabajo o rutina diaria','stress':'Estrés o salud emocional','pregnancy':'Embarazo','meds':'Medicamentos u hormonas','none':'Ninguno de estos'} },
    22: { interstitial: { headline:'Los pequeños cambios pueden hacer una gran diferencia', body:'Muchas personas aumentan de peso tras cambios de vida. No estás solo. Te guiaremos y apoyaremos.' } },
    23: { question:'Ingresa tu altura', placeholder:'ej. 168' },
    24: { question:'Dinos tu peso actual', placeholder:'ej. 75' },
    25: { question:'¿Qué peso te gustaría alcanzar?', placeholder:'ej. 64' },
    26: { question:'¿Cuántos años tienes?', placeholder:'ej. 35', hint:'Usamos esto para hacer tu plan más personal.', buttonLabel:'Siguiente' },
    27: { question:'Ingresa tu nombre', placeholder:'Tu nombre' },
    28: { interstitial: { headline:'Caminata interior personalizada con TAICHI COACH', body:'TAICHI COACH combina caminar suavemente en casa con movimientos simples de Tai Chi. Tu plan está personalizado para ti.' } },
    29: { question:'¿Tienes algún evento próximo que te motive a perder peso?', options:{'vacation':'Vacaciones o viaje','sporting-event':'Actividad deportiva','beach-trip':'Viaje a la playa','wedding':'Boda','family-occasion':'Evento familiar','reunion':'Reunión con amigos','none':'Sin planes especiales'} },
    30: { question:'¿Cuándo es tu evento?', subtitle:'Esto nos ayuda a crear un plan que se ajuste a tu cronograma. Tu información es privada.' },
  },
  fr: {
    1: { interstitial: { headline:"Plus de 21 millions de personnes ont déjà choisi une façon plus simple de bouger" } },
    2: { interstitial: { headline:'Bienvenue chez TAICHI COACH', body:"Vous êtes ici pour commencer une routine de marche simple à la maison. Apprenons-en plus sur vos objectifs pour créer le bon plan." } },
    3: { question:'Quels sont vos objectifs principaux ?', subtitle:'Vous pouvez en choisir plusieurs', options:{'lose-weight':'Perdre du poids','heart-health':'Améliorer la santé cardiaque','firm-toned':'Tonifier mon corps','lower-bio-age':'Me sentir plus jeune et énergique'} },
    4: { interstitial: { headline:'Super départ — vous êtes sur la bonne voie !', body:'Avec TAICHI COACH, vous aurez une approche guidée et personnalisée qui s\'adapte à vous.', note:'Les résultats varieront selon votre régularité et vos facteurs individuels.' } },
    5: { question:'Comment décririez-vous votre corps maintenant ?', options:{'mid-sized':'Dans la moyenne','heavier':'Un peu plus lourd que je veux','overweight':'Beaucoup plus lourd que je veux'} },
    6: { question:'Comment aimeriez-vous vous sentir dans votre corps ?', options:{'thin':'Plus léger et à l\'aise','toned':'Plus tonique et un peu plus fort','curvy':'Équilibré et confiant dans ma silhouette'} },
    7: { question:'Quelles parties de votre corps souhaitez-vous améliorer ?', subtitle:'Vous pouvez en choisir plusieurs', options:{'arms':'Bras','abs':'Abdominaux','booty':'Hanches et fessiers','legs':'Jambes'} },
    8: { question:'Quand vous êtes-vous senti(e) en meilleure forme ?', options:{'less-1yr':'Il y a moins d\'1 an','1-2yr':'Il y a 1–2 ans','over-3yr':'Il y a plus de 3 ans','never':'Je ne me suis jamais senti(e) ainsi'} },
    9: { interstitial: { headline:'Vous vous en sortez très bien !', body:'Beaucoup de gens craignent de ne pas être assez bons. Nous comprenons cela et en tiendrons compte.' } },
    10: { question:'Êtes-vous actif/active en ce moment ?', options:{'advanced':'Très actif','intermediate':'Modérément actif','beginner':'Je commence tout juste'} },
    11: { question:'Votre corps est-il flexible ?', options:{'very-flexible':'Très flexible','some-flexible':'Assez flexible','not-flexible':'Pas flexible','unsure-flexible':'Je ne suis pas sûr(e)'} },
    12: { question:'À quelle fréquence faites-vous de l\'exercice ?', options:{'daily':'Presque tous les jours','weekly':'Quelques fois par semaine','monthly':'Quelques fois par mois'} },
    13: { question:'Comment vous sentez-vous après avoir monté des escaliers ?', options:{'breathless':'Je suis essoufflé(e)','winded':'Je suis un peu fatigué(e), mais ça va','fine':'Je me sens bien après un étage','easy':'Je peux monter plusieurs étages facilement'} },
    14: { question:'À quelle fréquence marchez-vous ?', options:{'daily':'Presque tous les jours','weekly':'Quelques fois par semaine','monthly':'Rarement (environ une fois par mois)'} },
    15: { question:'Avez-vous des douleurs ou des gênes ?', subtitle:'Vous pouvez en choisir plusieurs', options:{'back':'Douleur dorsale','knees':'Douleur aux genoux','elbows':'Douleur aux coudes','none':'Aucun problème'} },
    16: { question:'À quoi ressemble votre emploi du temps quotidien ?', options:{'9to5':'J\'ai un horaire fixe en journée','nights':'Je travaille de nuit','flexible':'Mes horaires sont flexibles','retired':'Je suis retraité(e)'} },
    17: { question:'À quoi ressemble votre journée habituellement ?', options:{'on-feet':'Je bouge beaucoup','active':'Je bouge parfois pendant les pauses','sitting':'Je suis assis(e) la majeure partie de la journée'} },
    18: { question:'Combien d\'heures dormez-vous la nuit ?', options:{'less-5':'Moins de 5 heures','5-6':'5–6 heures','7-8':'7–8 heures','over-9':'Plus de 8 heures'} },
    19: { question:'Combien d\'eau buvez-vous par jour ?', options:{'less-2':'Environ 1–2 verres','2-6':'Environ 3–5 verres','6-8':'6 verres ou plus','over-8':'Je bois surtout du café ou du thé'} },
    20: { question:'Avez-vous des habitudes que vous souhaitez améliorer ?', subtitle:'Vous pouvez en choisir plusieurs', options:{'sleep':'Je ne dors pas assez','sugar':'Je mange trop de sucre','soda':'Je bois beaucoup de sodas','salty':'Je mange beaucoup de salé','snacker':'Je mange tard le soir','none':'Aucune de ces réponses'} },
    21: { question:'Des changements de vie ont-ils affecté votre poids ?', subtitle:'Vous pouvez en choisir plusieurs', options:{'marriage':'Relation ou mariage','work':'Travail ou routine quotidienne','stress':'Stress ou santé émotionnelle','pregnancy':'Grossesse','meds':'Médicaments ou hormones','none':'Aucune de ces réponses'} },
    22: { interstitial: { headline:'Les petits changements peuvent faire une grande différence', body:'Beaucoup de gens prennent du poids après des changements de vie. Vous n\'êtes pas seul(e). Nous vous guiderons.' } },
    23: { question:'Entrez votre taille', placeholder:'ex. 168' },
    24: { question:'Dites-nous votre poids actuel', placeholder:'ex. 75' },
    25: { question:'Quel poids souhaitez-vous atteindre ?', placeholder:'ex. 64' },
    26: { question:'Quel est votre âge ?', placeholder:'ex. 35', hint:'Nous utilisons ceci pour personnaliser votre plan.', buttonLabel:'Suivant' },
    27: { question:'Entrez votre prénom', placeholder:'Votre prénom' },
    28: { interstitial: { headline:'Marche intérieure personnalisée avec TAICHI COACH', body:'TAICHI COACH combine la marche douce à la maison avec de simples mouvements Tai Chi. Votre plan est adapté à vous.' } },
    29: { question:'Avez-vous un événement à venir qui vous motive à perdre du poids ?', options:{'vacation':'Vacances ou voyage','sporting-event':'Activité sportive','beach-trip':'Voyage à la plage','wedding':'Mariage','family-occasion':'Événement familial','reunion':'Retrouvailles','none':'Pas de plans spéciaux'} },
    30: { question:'Quand est votre événement ?', subtitle:'Cela nous aide à créer un plan adapté à votre calendrier. Vos informations sont privées.' },
  },
  it: {
    1: { interstitial: { headline:'Oltre 21 milioni di persone hanno già scelto un modo più semplice di muoversi' } },
    2: { interstitial: { headline:'Benvenuto in TAICHI COACH', body:'Sei qui per iniziare una semplice routine di camminata in casa. Scopriamo i tuoi obiettivi per creare il piano giusto per te.' } },
    3: { question:'Quali sono i tuoi obiettivi principali?', subtitle:'Puoi sceglierne più di uno', options:{'lose-weight':'Perdere peso','heart-health':'Migliorare la salute del cuore','firm-toned':'Tonificarmi di più','lower-bio-age':'Sentirmi più giovane ed energico'} },
    4: { interstitial: { headline:'Ottimo inizio — sei sulla strada giusta!', body:'Con TAICHI COACH avrai un approccio guidato e personalizzato che si adatta a te.', note:'I risultati varieranno in base alla tua costanza e ai fattori individuali.' } },
    5: { question:'Come descriveresti il tuo corpo adesso?', options:{'mid-sized':'Nel mezzo','heavier':'Un po\' più pesante di quanto voglio','overweight':'Molto più pesante di quanto voglio'} },
    6: { question:'Come vorresti sentirti nel tuo corpo?', options:{'thin':'Più leggero e a mio agio','toned':'Più tonico e un po\' più forte','curvy':'Equilibrato e sicuro della mia forma'} },
    7: { question:'Quali parti del corpo vorresti migliorare?', subtitle:'Puoi sceglierne più di uno', options:{'arms':'Braccia','abs':'Addome','booty':'Fianchi e glutei','legs':'Gambe'} },
    8: { question:'Quando ti sei sentito/a in forma per l\'ultima volta?', options:{'less-1yr':'Meno di 1 anno fa','1-2yr':'1–2 anni fa','over-3yr':'Più di 3 anni fa','never':'Non mi sono mai sentito/a così'} },
    9: { interstitial: { headline:'Stai andando alla grande!', body:'Molte persone temono di non essere abbastanza brave. Lo capiamo e lo terremo in considerazione.' } },
    10: { question:'Quanto sei attivo/a adesso?', options:{'advanced':'Molto attivo','intermediate':'Moderatamente attivo','beginner':'Sto solo iniziando'} },
    11: { question:'Quanto è flessibile il tuo corpo?', options:{'very-flexible':'Molto flessibile','some-flexible':'Abbastanza flessibile','not-flexible':'Non flessibile','unsure-flexible':'Non sono sicuro/a'} },
    12: { question:'Quanto spesso ti alleni?', options:{'daily':'Quasi ogni giorno','weekly':'Qualche volta a settimana','monthly':'Qualche volta al mese'} },
    13: { question:'Come ti senti dopo aver salito le scale?', options:{'breathless':'Mi manca il fiato','winded':'Sono un po\' stanco, ma ok','fine':'Mi sento bene dopo un piano','easy':'Posso salire più piani facilmente'} },
    14: { question:'Con quale regolarità cammini?', options:{'daily':'Quasi ogni giorno','weekly':'Qualche volta a settimana','monthly':'Raramente (circa una volta al mese)'} },
    15: { question:'Hai dolori o fastidi?', subtitle:'Puoi sceglierne più di uno', options:{'back':'Mal di schiena','knees':'Dolore alle ginocchia','elbows':'Dolore ai gomiti','none':'Nessun problema'} },
    16: { question:'Com\'è il tuo programma quotidiano?', options:{'9to5':'Ho un orario fisso diurno','nights':'Lavoro di notte','flexible':'I miei orari sono flessibili','retired':'Sono in pensione'} },
    17: { question:'Come si svolge di solito la tua giornata?', options:{'on-feet':'Mi muovo molto durante il giorno','active':'Mi muovo a volte nelle pause','sitting':'Sono seduto/a la maggior parte del giorno'} },
    18: { question:'Quante ore dormi di notte?', options:{'less-5':'Meno di 5 ore','5-6':'5–6 ore','7-8':'7–8 ore','over-9':'Più di 8 ore'} },
    19: { question:'Quanta acqua bevi ogni giorno?', options:{'less-2':'Circa 1–2 bicchieri','2-6':'Circa 3–5 bicchieri','6-8':'6 o più bicchieri','over-8':'Bevo principalmente caffè o tè'} },
    20: { question:'Hai abitudini che vorresti migliorare?', subtitle:'Puoi sceglierne più di uno', options:{'sleep':'Non dormo abbastanza','sugar':'Mangio troppo zucchero','soda':'Bevo molta soda','salty':'Mangio molti cibi salati','snacker':'Mangio tardi di notte','none':'Nessuna di queste'} },
    21: { question:'I cambiamenti di vita hanno influenzato il tuo peso?', subtitle:'Puoi sceglierne più di uno', options:{'marriage':'Relazione o matrimonio','work':'Lavoro o routine quotidiana','stress':'Stress o salute emotiva','pregnancy':'Gravidanza','meds':'Farmaci o ormoni','none':'Nessuna di queste'} },
    22: { interstitial: { headline:'Piccoli cambiamenti possono fare una grande differenza', body:'Molte persone prendono peso dopo cambiamenti di vita. Non sei solo/a. Ti guideremo.' } },
    23: { question:'Inserisci la tua altezza', placeholder:'es. 168' },
    24: { question:'Dicci il tuo peso attuale', placeholder:'es. 75' },
    25: { question:'Che peso vorresti raggiungere?', placeholder:'es. 64' },
    26: { question:'Quanti anni hai?', placeholder:'es. 35', hint:'Lo usiamo per rendere il tuo piano più personale.', buttonLabel:'Avanti' },
    27: { question:'Inserisci il tuo nome', placeholder:'Il tuo nome' },
    28: { interstitial: { headline:'Camminata indoor personalizzata con TAICHI COACH', body:'TAICHI COACH combina la camminata dolce a casa con semplici movimenti Tai Chi. Il tuo piano è personalizzato per te.' } },
    29: { question:'Hai un evento imminente che ti motiva a perdere peso?', options:{'vacation':'Vacanza o viaggio','sporting-event':'Attività sportiva','beach-trip':'Viaggio in spiaggia','wedding':'Matrimonio','family-occasion':'Evento familiare','reunion':'Riunione con amici','none':'Nessun piano speciale'} },
    30: { question:'Quando è il tuo evento?', subtitle:'Questo ci aiuta a creare un piano adatto ai tuoi tempi. Le tue informazioni sono private.' },
  },
  pt: {
    1: { interstitial: { headline:'Mais de 21 milhões de pessoas já escolheram uma forma mais simples de se mover' } },
    2: { interstitial: { headline:'Bem-vindo ao TAICHI COACH', body:'Você está aqui para começar uma rotina simples de caminhada em casa. Vamos aprender sobre seus objetivos para criar o plano certo.' } },
    3: { question:'Quais são seus principais objetivos?', subtitle:'Você pode escolher mais de um', options:{'lose-weight':'Perder peso','heart-health':'Melhorar a saúde do coração','firm-toned':'Tonificar mais','lower-bio-age':'Sentir-me mais jovem e energizado'} },
    4: { interstitial: { headline:'Ótimo começo — você está no caminho certo!', body:'Com o TAICHI COACH, você terá uma abordagem guiada e personalizada que se adapta a você.', note:'Os resultados variarão conforme sua consistência e fatores individuais.' } },
    5: { question:'Como você descreveria seu corpo agora?', options:{'mid-sized':'No meio','heavier':'Um pouco mais pesado do que quero','overweight':'Muito mais pesado do que quero'} },
    6: { question:'Como você gostaria de se sentir no seu corpo?', options:{'thin':'Mais leve e confortável','toned':'Mais tonificado e um pouco mais forte','curvy':'Equilibrado e confiante com minha forma'} },
    7: { question:'Quais partes do seu corpo você gostaria de melhorar?', subtitle:'Você pode escolher mais de um', options:{'arms':'Braços','abs':'Abdômen','booty':'Quadris e glúteos','legs':'Pernas'} },
    8: { question:'Quando foi a última vez que você estava em melhor forma?', options:{'less-1yr':'Há menos de 1 ano','1-2yr':'Há 1–2 anos','over-3yr':'Há mais de 3 anos','never':'Nunca me senti assim'} },
    9: { interstitial: { headline:'Você está indo muito bem!', body:'Muitas pessoas se preocupam em não ser boas o suficiente. Entendemos isso e levaremos em conta.' } },
    10: { question:'Quão ativo você está agora?', options:{'advanced':'Muito ativo','intermediate':'Moderadamente ativo','beginner':'Apenas começando'} },
    11: { question:'Quão flexível é o seu corpo?', options:{'very-flexible':'Muito flexível','some-flexible':'Alguma flexibilidade','not-flexible':'Não flexível','unsure-flexible':'Não tenho certeza'} },
    12: { question:'Com que frequência você se exercita?', options:{'daily':'Quase todos os dias','weekly':'Algumas vezes por semana','monthly':'Algumas vezes por mês'} },
    13: { question:'Como você se sente depois de subir escadas?', options:{'breathless':'Fico sem fôlego','winded':'Fico um pouco cansado, mas ok','fine':'Me sinto bem após um lance','easy':'Consigo subir vários lances facilmente'} },
    14: { question:'Com que regularidade você caminha?', options:{'daily':'Quase todos os dias','weekly':'Algumas vezes por semana','monthly':'Raramente (cerca de uma vez por mês)'} },
    15: { question:'Você tem alguma dor ou desconforto?', subtitle:'Você pode escolher mais de um', options:{'back':'Dor nas costas','knees':'Dor nos joelhos','elbows':'Dor nos cotovelos','none':'Sem problemas'} },
    16: { question:'Como é sua rotina diária?', options:{'9to5':'Tenho um horário fixo diurno','nights':'Trabalho em turnos noturnos','flexible':'Meu horário é flexível','retired':'Estou aposentado'} },
    17: { question:'Como costuma ser seu dia?', options:{'on-feet':'Me movo muito durante o dia','active':'Me movo às vezes nos intervalos','sitting':'Fico sentado a maior parte do dia'} },
    18: { question:'Quantas horas você dorme por noite?', options:{'less-5':'Menos de 5 horas','5-6':'5–6 horas','7-8':'7–8 horas','over-9':'Mais de 8 horas'} },
    19: { question:'Quanta água você bebe por dia?', options:{'less-2':'Cerca de 1–2 copos','2-6':'Cerca de 3–5 copos','6-8':'6 ou mais copos','over-8':'Bebo principalmente café ou chá'} },
    20: { question:'Você tem hábitos que gostaria de melhorar?', subtitle:'Você pode escolher mais de um', options:{'sleep':'Não durmo o suficiente','sugar':'Como muito açúcar','soda':'Bevo muita soda','salty':'Como muita comida salgada','snacker':'Como tarde da noite','none':'Nenhum destes'} },
    21: { question:'Alguma mudança de vida afetou seu peso?', subtitle:'Você pode escolher mais de um', options:{'marriage':'Relacionamento ou casamento','work':'Trabalho ou rotina diária','stress':'Estresse ou saúde emocional','pregnancy':'Gravidez','meds':'Medicamentos ou hormônios','none':'Nenhum destes'} },
    22: { interstitial: { headline:'Pequenas mudanças podem fazer uma grande diferença', body:'Muitas pessoas ganham peso após mudanças de vida. Você não está sozinho. Vamos guiá-lo.' } },
    23: { question:'Insira sua altura', placeholder:'ex. 168' },
    24: { question:'Diga-nos seu peso atual', placeholder:'ex. 75' },
    25: { question:'Que peso você gostaria de alcançar?', placeholder:'ex. 64' },
    26: { question:'Qual é a sua idade?', placeholder:'ex. 35', hint:'Usamos isso para tornar seu plano mais pessoal.', buttonLabel:'Próximo' },
    27: { question:'Insira seu nome', placeholder:'Seu nome' },
    28: { interstitial: { headline:'Caminhada indoor personalizada com TAICHI COACH', body:'TAICHI COACH combina caminhada suave em casa com movimentos simples de Tai Chi. Seu plano é personalizado para você.' } },
    29: { question:'Você tem algum evento próximo que te motiva a perder peso?', options:{'vacation':'Férias ou viagem','sporting-event':'Atividade esportiva','beach-trip':'Viagem à praia','wedding':'Casamento','family-occasion':'Evento familiar','reunion':'Reencontro com amigos','none':'Sem planos especiais'} },
    30: { question:'Quando é o seu evento?', subtitle:'Isso nos ajuda a criar um plano adequado ao seu cronograma. Suas informações são privadas.' },
  },
  ru: {
    1: { interstitial: { headline:'Более 21 миллиона человек уже выбрали более простой способ двигаться' } },
    2: { interstitial: { headline:'Добро пожаловать в TAICHI COACH', body:'Вы здесь, чтобы начать простую домашнюю программу ходьбы. Давайте узнаем о ваших целях, чтобы создать подходящий план.' } },
    3: { question:'Каковы ваши основные цели?', subtitle:'Можно выбрать несколько', options:{'lose-weight':'Похудеть','heart-health':'Улучшить здоровье сердца','firm-toned':'Стать более подтянутым','lower-bio-age':'Чувствовать себя моложе и энергичнее'} },
    4: { interstitial: { headline:'Отличное начало — вы на правильном пути!', body:'С TAICHI COACH вы получите персональный подход, который адаптируется к вам.', note:'Результаты будут варьироваться в зависимости от регулярности и индивидуальных факторов.' } },
    5: { question:'Как бы вы описали своё тело сейчас?', options:{'mid-sized':'Среднее','heavier':'Немного тяжелее, чем хочу','overweight':'Значительно тяжелее, чем хочу'} },
    6: { question:'Как вы хотите чувствовать себя в своём теле?', options:{'thin':'Легче и комфортнее','toned':'Более подтянутым и немного сильнее','curvy':'Сбалансированным и уверенным'} },
    7: { question:'Какие части тела вы хотите улучшить?', subtitle:'Можно выбрать несколько', options:{'arms':'Руки','abs':'Живот','booty':'Бёдра и ягодицы','legs':'Ноги'} },
    8: { question:'Когда вы последний раз были в лучшей форме?', options:{'less-1yr':'Менее 1 года назад','1-2yr':'1–2 года назад','over-3yr':'Более 3 лет назад','never':'Никогда не чувствовал(а) себя так'} },
    9: { interstitial: { headline:'Вы справляетесь отлично!', body:'Многие беспокоятся о том, что недостаточно хороши. Мы понимаем это и учтём при создании вашего плана.' } },
    10: { question:'Насколько вы активны прямо сейчас?', options:{'advanced':'Очень активный','intermediate':'Умеренно активный','beginner':'Только начинаю'} },
    11: { question:'Насколько гибкое ваше тело?', options:{'very-flexible':'Очень гибкое','some-flexible':'Немного гибкое','not-flexible':'Негибкое','unsure-flexible':'Не уверен(а)'} },
    12: { question:'Как часто вы занимаетесь спортом?', options:{'daily':'Почти каждый день','weekly':'Несколько раз в неделю','monthly':'Несколько раз в месяц'} },
    13: { question:'Как вы себя чувствуете после подъёма по лестнице?', options:{'breathless':'Задыхаюсь','winded':'Немного устаю, но нормально','fine':'Чувствую себя хорошо после одного пролёта','easy':'Легко поднимаюсь на несколько пролётов'} },
    14: { question:'Как часто вы ходите на прогулки?', options:{'daily':'Почти каждый день','weekly':'Несколько раз в неделю','monthly':'Редко (примерно раз в месяц)'} },
    15: { question:'Есть ли у вас боли или дискомфорт?', subtitle:'Можно выбрать несколько', options:{'back':'Боль в спине','knees':'Боль в коленях','elbows':'Боль в локтях','none':'Нет проблем'} },
    16: { question:'Как выглядит ваш ежедневный распорядок?', options:{'9to5':'У меня фиксированный дневной график','nights':'Я работаю в ночную смену','flexible':'Мой график гибкий','retired':'Я на пенсии'} },
    17: { question:'Как обычно проходит ваш день?', options:{'on-feet':'Я много двигаюсь в течение дня','active':'Иногда двигаюсь во время перерывов','sitting':'Большую часть дня сижу'} },
    18: { question:'Сколько часов вы спите ночью?', options:{'less-5':'Менее 5 часов','5-6':'5–6 часов','7-8':'7–8 часов','over-9':'Более 8 часов'} },
    19: { question:'Сколько воды вы пьёте в день?', options:{'less-2':'Около 1–2 стаканов','2-6':'Около 3–5 стаканов','6-8':'6 и более стаканов','over-8':'В основном пью кофе или чай'} },
    20: { question:'Есть ли у вас привычки, которые вы хотите улучшить?', subtitle:'Можно выбрать несколько', options:{'sleep':'Я сплю недостаточно','sugar':'Я ем много сахара','soda':'Я пью много газировки','salty':'Я ем много солёного','snacker':'Я ем поздно ночью','none':'Ничего из перечисленного'} },
    21: { question:'Повлияли ли изменения в жизни на ваш вес?', subtitle:'Можно выбрать несколько', options:{'marriage':'Отношения или брак','work':'Работа или ежедневная рутина','stress':'Стресс или эмоциональное здоровье','pregnancy':'Беременность','meds':'Лекарства или гормоны','none':'Ничего из перечисленного'} },
    22: { interstitial: { headline:'Небольшие изменения могут иметь большое значение', body:'Многие набирают вес после жизненных перемен. Вы не одни. Мы проведём вас и поддержим.' } },
    23: { question:'Введите ваш рост', placeholder:'например, 168' },
    24: { question:'Укажите ваш текущий вес', placeholder:'например, 75' },
    25: { question:'Какой вес вы хотите достичь?', placeholder:'например, 64' },
    26: { question:'Сколько вам лет?', placeholder:'например, 35', hint:'Мы используем это, чтобы сделать ваш план более личным.', buttonLabel:'Далее' },
    27: { question:'Введите ваше имя', placeholder:'Ваше имя' },
    28: { interstitial: { headline:'Персональная ходьба в помещении с TAICHI COACH', body:'TAICHI COACH сочетает мягкую ходьбу дома с простыми движениями Тай Чи. Ваш план адаптирован именно для вас.' } },
    29: { question:'Есть ли у вас предстоящее событие, которое мотивирует вас похудеть?', options:{'vacation':'Отпуск или путешествие','sporting-event':'Спортивное мероприятие','beach-trip':'Поездка на пляж','wedding':'Свадьба','family-occasion':'Семейное событие','reunion':'Встреча с друзьями','none':'Нет особых планов'} },
    30: { question:'Когда ваше событие?', subtitle:'Это помогает нам создать план, подходящий к вашему расписанию. Ваша информация конфиденциальна.' },
  },
}

export function getTranslatedSteps(lang: LangCode): QuizStep[] {
  const overrides = quizSteps[lang]
  if (!overrides || Object.keys(overrides).length === 0) return QUIZ_STEPS
  return QUIZ_STEPS.map((step) => {
    const o = overrides[step.step]
    if (!o) return step
    return {
      ...step,
      ...(o.question    && { question: o.question }),
      ...(o.subtitle    && { subtitle: o.subtitle }),
      ...(o.hint        && { hint: o.hint }),
      ...(o.buttonLabel && { buttonLabel: o.buttonLabel }),
      ...(o.placeholder && { placeholder: o.placeholder }),
      ...(o.options && step.options && {
        options: step.options.map((opt) => ({
          ...opt,
          label: o.options![opt.id] ?? opt.label,
        })),
      }),
      ...(o.interstitial && step.interstitial && {
        interstitial: { ...step.interstitial, ...o.interstitial },
      }),
    }
  })
}
