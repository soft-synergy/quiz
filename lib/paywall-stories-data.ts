import type { LangCode } from '@/lib/lang-store'
import { REVIEW_PHOTOS } from '@/lib/reviews-data'

export type PaywallStory = {
  photo: string
  name: string
  text: string
  stars: number
}

export const PAYWALL_STORIES: Record<LangCode, PaywallStory[]> = {
  en: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna K., 47", text: "I wasn’t sure this would work for me. I thought I would try it for a short time… but I kept going.\n\nAfter a few weeks, I felt lighter and more active.\n\nIn 2 months, I lost 6 kg and feel much better in my body.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Sophie R., 42", text: "I needed something simple I could do at home. The plan was easy, and I didn’t feel overwhelmed.\n\nAfter some time, my back pain improved, and daily tasks became easier. I feel stronger and more in control now.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Carla M., 48", text: "I always struggled with my stomach area. The routine was simple, so I stayed consistent.\n\nAfter a few weeks, I started to see changes and feel more comfortable in my body. Now I feel much more confident.", stars: 5 }
  ],
  lt: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Rasa Petrauskienė", text: "Nuoširdžiai dėkoju tam, kas sukūrė šią programą. Ji padeda man grįžti į formą, o jei tęsiu visą mėnesį, tikrai numesiu svorio ir sumažinsiu pilvo apimtį.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Mantas Kazlauskas", text: "Gydytojas rekomendavo mažo krūvio judėjimą, ir šis planas pasirodė idealus. Tai Chi dalys ramina, o ėjimas namuose duoda būtent tiek krūvio, kiek reikia.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "Inga Vaitkutė", text: "Naudoju jau tris savaites ir jau numečiau beveik 2 kilogramus. Įvairovė neleidžia nuobodžiauti, o labiausiai patinka tai, kad viską galiu daryti svetainėje.", stars: 5 }
  ],
  lv: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Ilze Kalniņa", text: "Liels paldies tam, kurš šo izveidoja. Šī programma palīdz man atgūt formu, un, ja turpināšu, es tiešām varēšu nomest lieko svaru.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Andris Bērziņš", text: "Ārsts ieteica saudzīgas aktivitātes, un šis plāns ir tieši laikā. Tai Chi daļas nomierina, bet pastaigas telpās dod pietiekamu slodzi.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "Marta Liepiņa", text: "Lietoju jau trīs nedēļas un svars jau ir samazinājies. Daudzveidība uztur interesi, un man patīk, ka visu varu darīt mājās.", stars: 5 }
  ],
  ro: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Andreea Ionescu", text: "Îi mulțumesc sincer persoanei care a creat asta. Mă ajută să revin în formă și simt că, dacă continui, voi slăbi în mod real.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Radu Marin", text: "Medicul mi-a recomandat mișcare cu impact redus, iar acest plan este exact ce aveam nevoie. Partea de Tai Chi calmează, iar mersul în interior oferă efortul potrivit.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "Cristina Dumitru", text: "Folosesc programul de trei săptămâni și deja am dat jos aproape 2 kilograme. Îmi place că nu mă plictisesc și că pot face totul din sufragerie.", stars: 5 }
  ],
  cz: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Jana Nováková", text: "Opravdu děkuji tomu, kdo tohle vytvořil. Pomáhá mi to dostat se zpět do formy a mám pocit, že když vydržím, skutečně zhubnu.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Tomáš Král", text: "Lékař mi doporučil pohyb s nízkou zátěží a tenhle plán je přesně ono. Tai Chi části uklidňují a domácí chůze dává přesně takovou zátěž, jakou potřebuji.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "Lucie Procházková", text: "Používám to tři týdny a už jsem šla s váhou dolů. Díky různorodosti mě to nepřestává bavit a oceňuji, že vše zvládnu doma.", stars: 5 }
  ],
  dk: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Mette Jensen", text: "Jeg er virkelig taknemmelig for den, der har lavet det her. Det hjælper mig tilbage i form, og jeg kan mærke, at det virker, hvis jeg holder fast.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Henrik Larsen", text: "Min læge anbefalede skånsom motion, og denne plan passer perfekt. Tai Chi-delen giver ro, og den indendørs gang giver lige præcis nok puls.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "Camilla Sørensen", text: "Jeg har brugt det i tre uger og kan allerede mærke forskel. Variationen gør det spændende, og jeg elsker, at jeg kan gøre det hele hjemme i stuen.", stars: 5 }
  ],
  gr: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Ελένη Παπαδοπούλου", text: "Ειλικρινά ευχαριστώ όποιον δημιούργησε αυτή την εφαρμογή. Με βοηθά να ξαναβρώ τη φόρμα μου και νιώθω ότι, αν συνεχίσω, θα δω πραγματική διαφορά.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Νίκος Δημητρίου", text: "Ο γιατρός μου πρότεινε άσκηση χαμηλής έντασης και αυτό το πλάνο είναι ιδανικό. Τα μέρη με Tai Chi χαλαρώνουν και το περπάτημα στο σπίτι είναι όσο πρέπει.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "Σοφία Κωνσταντίνου", text: "Το χρησιμοποιώ εδώ και τρεις εβδομάδες και ήδη βλέπω αποτέλεσμα. Η ποικιλία κρατά το ενδιαφέρον μου και μου αρέσει που όλα γίνονται από το σπίτι.", stars: 5 }
  ],
  hu: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Kovács Andrea", text: "Nagyon hálás vagyok annak, aki ezt létrehozta. Segít visszanyerni a formámat, és érzem, hogy ha kitartok, valóban lesz eredménye.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Tóth Gábor", text: "Az orvosom kímélő mozgást javasolt, és ez a terv tökéletesnek bizonyult. A Tai Chi részek megnyugtatnak, a benti séta pedig pont elég terhelést ad.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "Szabó Katalin", text: "Három hete használom, és már most érzem a különbséget. A változatosság miatt nem unalmas, és nagyon szeretem, hogy mindent elvégezhetek otthon.", stars: 5 }
  ],
  hr: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Marija Kovačević", text: "Stvarno sam zahvalna osobi koja je ovo osmislila. Pomaže mi da se vratim u formu i osjećam da uz redovitost mogu napraviti veliku promjenu.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Marko Babić", text: "Liječnik mi je preporučio vježbanje s malim opterećenjem i ovaj plan mi savršeno odgovara. Tai Chi dijelovi smiruju, a hodanje u kući daje taman dovoljno aktivnosti.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "Ana Radić", text: "Koristim ovo već tri tjedna i već osjećam pomak. Raznolikost održava motivaciju, a posebno mi odgovara što sve mogu odraditi kod kuće.", stars: 5 }
  ],
  il: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "יעל כהן", text: "אני ממש מודה למי שיצר את זה. זה עוזר לי לחזור לכושר, ואני מרגישה שאם אתמיד, באמת אראה שינוי.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "אורי פרידמן", text: "הרופא שלי המליץ על פעילות עדינה, והתוכנית הזו ממש מתאימה. קטעי ה-Tai Chi מרגיעים, וההליכה בבית נותנת בדיוק את המאמץ הנכון.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "שירה אברהם", text: "אני משתמשת בזה כבר שלושה שבועות וכבר מרגישה שינוי. יש מספיק גיוון כדי שלא ישעמם, והכי טוב שאפשר לעשות הכול מהסלון.", stars: 5 }
  ],
  jp: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "高橋 真理子", text: "これを作ってくれた人に本当に感謝しています。無理なく体を動かせて、続ければきちんと変われそうだと感じています。", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "山本 恒一", text: "医師に負担の少ない運動を勧められて、このプランを始めました。Tai Chiの動きは気持ちが落ち着き、室内ウォーキングも自分にちょうどいい強さです。", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "中村 由美", text: "使い始めて3週間ですが、もう体の感覚が変わってきました。内容に変化があるので飽きにくく、家で全部できるのが本当に助かります。", stars: 5 }
  ],
  ru: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Елена Смирнова", text: "Хочу сказать большое спасибо тому, кто это придумал. Программа помогает мне возвращаться в форму, и я чувствую, что при регулярности результат точно будет.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Алексей Волков", text: "Врач рекомендовал мне щадящую нагрузку, и этот план подошёл идеально. Части с Тай Чи успокаивают, а ходьба дома даёт именно ту активность, которая нужна.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "Марина Орлова", text: "Пользуюсь уже три недели и уже вижу сдвиг. Мне нравится, что программа не надоедает, а все упражнения можно делать прямо дома.", stars: 5 }
  ],
  sk: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Jana Kováčová", text: "Naozaj ďakujem tomu, kto toto vytvoril. Pomáha mi dostať sa späť do formy a mám pocit, že keď vydržím, výsledky sa určite dostavia.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "Martin Horváth", text: "Lekár mi odporučil pohyb s nízkou záťažou a tento plán je presne to, čo som potreboval. Tai Chi časti upokojujú a domáca chôdza dáva primeranú záťaž.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "Lucia Šimková", text: "Používam to už tri týždne a už teraz cítim rozdiel. Vďaka pestrosti ma to baví a najviac oceňujem, že všetko zvládnem doma.", stars: 5 }
  ],
  tw: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "林雅婷", text: "真的很想謝謝做出這套內容的人。它讓我比較容易重新動起來，我也感覺只要持續下去，真的會看到改變。", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=53", name: "張志豪", text: "醫師建議我做低衝擊運動，這個計畫真的很適合。Tai Chi 的段落很放鬆，室內步行的強度也剛剛好。", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=32", name: "黃美玲", text: "用了三週之後，我已經明顯感覺到變化。內容不單調，而且最棒的是全部都能在家完成。", stars: 5 }
  ]
}
