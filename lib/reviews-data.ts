import type { LangCode } from '@/lib/lang-store'

export type Review = { photo: string; name: string; text: string; stars: number }

export const REVIEW_PHOTOS = [
  'https://i.pravatar.cc/96?img=47',
  'https://i.pravatar.cc/96?img=44',
  'https://i.pravatar.cc/96?img=53',
  'https://i.pravatar.cc/96?img=32',
  'https://i.pravatar.cc/96?img=56',
]

export const REVIEWS: Record<LangCode, Review[]> = {
  en: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "I wanted something simple I could do at home. TAICHI COACH helped me stay consistent. After a few weeks, I felt less stiff, more active, and better in my body.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "I had stopped trusting myself to stick with exercise. TAICHI COACH felt simple and easy to follow at home. Now I move more, feel lighter, and have more energy.", stars: 5 }
  ],
  lt: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "Norėjau kažko paprasto, ką galėčiau daryti namuose. TAICHI COACH padėjo man išlikti nuosekliai. Po kelių savaičių jaučiausi ne tokia sustingusi, aktyvesnė ir geriau jaučiausi savo kūne.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "Buvau nustojusi tikėti, kad galiu laikytis judėjimo plano. TAICHI COACH buvo paprastas ir lengvai sekamas namuose. Dabar daugiau judu, jaučiuosi lengviau ir turiu daugiau energijos.", stars: 5 }
  ],
  lv: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "Es vēlējos kaut ko vienkāršu, ko varētu darīt mājās. TAICHI COACH palīdzēja man saglabāt regularitāti. Pēc dažām nedēļām jutos mazāk stīva, aktīvāka un labāk savā ķermenī.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "Es biju pārstājusi ticēt, ka varēšu pieturēties pie kustību rutīnas. TAICHI COACH bija vienkāršs un viegli izpildāms mājās. Tagad kustos vairāk, jūtos vieglāk un man ir vairāk enerģijas.", stars: 5 }
  ],
  ro: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "Îmi doream ceva simplu, pe care să îl pot face acasă. TAICHI COACH m-a ajutat să rămân consecventă. După câteva săptămâni m-am simțit mai puțin înțepenită, mai activă și mai bine în corpul meu.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "Încetasem să mai am încredere că mă pot ține de mișcare. TAICHI COACH a fost simplu și ușor de urmat acasă. Acum mă mișc mai mult, mă simt mai ușoară și am mai multă energie.", stars: 5 }
  ],
  cz: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "Chtěla jsem něco jednoduchého, co můžu dělat doma. TAICHI COACH mi pomohl vydržet. Po několika týdnech jsem se cítila méně ztuhlá, aktivnější a lépe ve svém těle.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "Přestala jsem věřit, že u cvičení vydržím. TAICHI COACH byl doma jednoduchý a snadno se dodržoval. Teď se víc hýbu, cítím se lehčí a mám víc energie.", stars: 5 }
  ],
  dk: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "Jeg ville have noget enkelt, som jeg kunne lave derhjemme. TAICHI COACH hjalp mig med at holde fast. Efter nogle uger følte jeg mig mindre stiv, mere aktiv og bedre tilpas i min krop.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "Jeg havde mistet troen på, at jeg kunne holde fast i motion. TAICHI COACH var enkelt og nemt at følge derhjemme. Nu bevæger jeg mig mere, føler mig lettere og har mere energi.", stars: 5 }
  ],
  gr: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "Ήθελα κάτι απλό που να μπορώ να κάνω στο σπίτι. Το TAICHI COACH με βοήθησε να είμαι σταθερή. Μετά από λίγες εβδομάδες ένιωθα λιγότερη δυσκαμψία, περισσότερη ενέργεια και καλύτερα μέσα στο σώμα μου.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "Είχα σταματήσει να εμπιστεύομαι ότι μπορώ να μείνω συνεπής με την άσκηση. Το TAICHI COACH ήταν απλό και εύκολο να το ακολουθώ στο σπίτι. Τώρα κινούμαι περισσότερο, νιώθω πιο ανάλαφρη και έχω περισσότερη ενέργεια.", stars: 5 }
  ],
  hu: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "Valami egyszerűt szerettem volna, amit otthon is meg tudok csinálni. A TAICHI COACH segített kitartani. Néhány hét után kevésbé éreztem magam merevnek, aktívabb lettem, és jobban éreztem magam a testemben.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "Már nem hittem, hogy képes vagyok kitartani a mozgás mellett. A TAICHI COACH egyszerű volt, és könnyű volt otthon követni. Most többet mozgok, könnyebbnek érzem magam, és több energiám van.", stars: 5 }
  ],
  hr: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "Željela sam nešto jednostavno što mogu raditi kod kuće. TAICHI COACH mi je pomogao da ostanem dosljedna. Nakon nekoliko tjedana osjećala sam se manje ukočeno, aktivnije i bolje u svom tijelu.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "Prestala sam vjerovati da mogu ostati dosljedna vježbanju. TAICHI COACH bio je jednostavan i lagan za pratiti kod kuće. Sada se više krećem, osjećam se lakše i imam više energije.", stars: 5 }
  ],
  il: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "רציתי משהו פשוט שאוכל לעשות בבית. TAICHI COACH עזר לי להתמיד. אחרי כמה שבועות הרגשתי פחות נוקשה, יותר פעילה והרבה יותר טוב בתוך הגוף שלי.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "הפסקתי להאמין שאצליח להתמיד בפעילות גופנית. TAICHI COACH היה פשוט וקל למעקב בבית. עכשיו אני זזה יותר, מרגישה קלילה יותר ויש לי יותר אנרגיה.", stars: 5 }
  ],
  jp: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "家でできるシンプルなものを探していました。TAICHI COACHのおかげで続けやすくなりました。数週間後には体のこわばりが減って、より活動的になり、自分の体が前より心地よく感じられました。", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "運動を続けられる自信をなくしていました。TAICHI COACHはシンプルで、自宅でも無理なく続けられました。今では以前よりよく動けて、体も軽く感じられ、エネルギーも増えました。", stars: 5 }
  ],
  ru: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "Мне хотелось чего-то простого, что можно делать дома. TAICHI COACH помог мне сохранять регулярность. Через несколько недель я почувствовала меньше скованности, стала активнее и лучше чувствовать себя в своём теле.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "Я перестала верить, что смогу придерживаться тренировок. TAICHI COACH оказался простым и удобным для дома. Теперь я больше двигаюсь, чувствую лёгкость и у меня стало больше энергии.", stars: 5 }
  ],
  sk: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "Chcela som niečo jednoduché, čo môžem robiť doma. TAICHI COACH mi pomohol zostať dôsledná. Po pár týždňoch som sa cítila menej stuhnuto, bola som aktívnejšia a vo svojom tele som sa cítila lepšie.", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "Prestala som veriť, že dokážem pri cvičení vydržať. TAICHI COACH bol jednoduchý a ľahko sa dal doma dodržiavať. Teraz sa viac hýbem, cítim sa ľahšie a mám viac energie.", stars: 5 }
  ],
  tw: [
    { photo: "https://i.pravatar.cc/96?img=47", name: "Anna Miller", text: "我想要的是一個可以在家做、又很簡單的方法。TAICHI COACH 幫助我維持規律。幾週之後，我覺得身體沒那麼僵硬了，也更有活動力，整體感受更好了。", stars: 5 },
    { photo: "https://i.pravatar.cc/96?img=44", name: "Laura Bennett", text: "我一度不再相信自己能持續運動。TAICHI COACH 很簡單，在家也很容易跟著做。現在我活動更多，覺得身體更輕盈，也更有精神。", stars: 5 }
  ]
}
