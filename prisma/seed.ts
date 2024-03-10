import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      title: 'Atomowe nawyki',
      author: 'James Clear',
      description:
        'Czym są nawyki i jaka jest ich siła? Czy wyzbywając się złych i wzmacniając te dobre, jesteśmy w stanie być szczęśliwsi? Zobacz, jak do kwestii przyzwyczajeń podszedł James Clear w książce pod tytułem „Atomowe nawyki. Drobne zmiany, niezwykłe efekty.',
      rating: 4.7,
      price: 10,
      image: 'atomowe-nawyki.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      title: 'Bezsilna',
      author: 'Lauren Roberts',
      description:
        'W królestwie Ilyii Zwyczajni skazani są na banicję lub śmierć. Ich niedobitki ściga Kai, brat następcy tronu, od dziecka szkolony na Egzekutora. W czasie jednej z takich akcji z nieoczekiwanej opresji ratuje go Paedyn, bezdomna dziewczyna bez mocy. W ten sposób ze środowiska ulicznych złodziejaszków Paedyn trafia na organizowany przez króla Turniej, w którym biorą udział wybitni Elitarni. W trakcie morderczych rozgrywek trudnością okaże się nie tylko, jak przeżyć, lecz także – jak odnaleźć się w relacji z księciem. I z jego bratem, budzącym w niej emocje, wobec których czuje się bezsilna…',
      rating: 4.8,
      price: 15,
      image: 'bezsilna.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      description:
        'Dwudziestoletnia Violet Sorrengail miała trafić do Kwadrantu Skrybów i wieść spokojne życie pośród książek i historii. A teraz głównodowodząca, znana również jako jej bezkompromisowa matka, nakazała Violet dołączyć do setek kandydatów pragnących zostać elitą Navarry – jeźdźców smoków.',
      rating: 4.6,
      price: 12,
      image: 'fourth-wing.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17263',
      title: 'Gdzie śpiewają raki',
      author: 'Delia Owens',
      description:
        'Pogłoski o Dziewczynie z Bagien latami krążyły po Barkley Cove, sennym miasteczku u wybrzeży Karoliny Północnej. Dlatego pod koniec 1969 roku, gdy na  mokradłach znaleziono ciało przystojnego Chase’a Andrewsa, miejscowi zwrócili się przeciwko Kyi Clark, zwanej Dziewczyną z Bagien.',
      rating: 4.8,
      price: 16,
      image: 'raki.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17264',
      title: 'Haunting Adeline',
      author: 'H.D Carlton',
      description:
        'Manipulatorka. Potrafię manipulować emocjami każdego, kto mi na to pozwoli. Potrafię sprawić, żeby cierpiał, płakał lub się śmiał. Ale moje słowa nie wpływają na niego… Szczególnie kiedy błagam go, żeby odszedł. Jednak on zawsze tam jest. Czeka, patrzy, obserwuje. A ja nie mogę odwrócić wzroku, nie potrafię. Zwłaszcza gdy chcę, żeby podszedł bliżej.',
      rating: 4.3,
      price: 14,
      image: 'adeline.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17265',
      title: 'Iron Flame',
      author: 'Rebecca Yarros',
      description:
        'Dwudziestoletnia Violet Sorrengail miała trafić do Kwadrantu Skrybów i wieść spokojne życie pośród książek i historii. A teraz głównodowodząca, znana również jako jej bezkompromisowa matka, nakazała Violet dołączyć do setek kandydatów pragnących zostać elitą Navarry – jeźdźców smoków.',
      rating: 4.7,
      price: 11,
      image: 'iron-flames.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17266',
      title: 'Lekcje chemii',
      author: 'Bonnie Garmus',
      description:
        'Elizabeth Zott jest chemiczką i kobietą daleką od przeciętności. Byłaby zresztą gotowa jako pierwsza wytknąć rozmówcy, że coś takiego jak „przeciętna kobieta” nie istnieje. Ale jest połowa lat 50. i jej koledzy z całkowicie męskoosobowego zespołu naukowców w Instytucie Badawczym Hastings prezentują bardzo nienaukowe podejście do kwestii równouprawnienia płci. Wszyscy z wyjątkiem jednego: to Calvin Evans, nominowany do Nagrody Nobla i słynący z pamiętliwości samotny geniusz, który zakochuje w umyśle Elizabeth. Co skutkuje autentyczną chemią.',
      rating: 4.2,
      price: 14,
      image: 'lekcje-chemii.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17268',
      title: 'Nie mylić z miłością',
      author: 'Katarzyna Nosowska',
      description:
        'Nie mylić z miłością" – Najbardziej osobiste i najbardziej intymne teksty uwielbianej artystki. Katarzyna Nosowska powraca z najnowszą książką! Niczym najlepsza przyjaciółka, najwierniejszy partner z głębi swego przepastnego serca wysyła do nas najważniejsze przesłanie. Zaglądając w siebie, przemierzając kolejne życiowe odcinki, odsłaniając osobiste historie, dociera do tego, co najważniejsze – do sedna Miłości.',
      rating: 4.0,
      price: 16,
      image: 'nie-mylic.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17269',
      title: 'Schronisko, które przetrwało',
      author: 'Sławek Gortych',
      description:
        'Nazista uciekający przed sprawiedliwością. Kobieta próbująca przywrócić honor swojej rodzinie. Tajemniczy włamywacze szukający śladów przeszłości. Co ich łączy? Schronisko.',
      rating: 4.4,
      price: 13,
      image: 'schronisko.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17270',
      title: 'Tak działa mózg',
      author: 'Joanna Podgórska',
      description:
        'Trudno odnaleźć twór bardziej złożony od ludzkiego mózgu. I paradoksalnie –twór najmniej poznany. Jesteśmy całkowicie zależni od tej nieco ponadkilogramowej galaretki w naszej głowie. Nastroje, pragnienia, emocje, świadomość, zdolności intelektualne – za to wszystko odpowiada mózg i jego określone struktury, wraz z powstającym w układzie nerwowym szeregiem neuroprzekaźników i zmianami zachodzącymi w biochemicznej zupie.',
      rating: 4.7,
      price: 12,
      image: 'mozg.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17272',
      title: 'Uwięziona',
      author: 'B.A Paris',
      description:
        'Przekłady na 40 języków. Ponad 3,5 miliona sprzedanych egzemplarzy „Za zamkniętymi drzwiami”. Jest ciemno. Nie wiesz, gdzie jesteś. Słyszysz zbliżające się kroki. A potem… krzyki swojego męża.',
      rating: 4.6,
      price: 14,
      image: 'uwieziona.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17274',
      title: 'Za granicą',
      author: 'Wojciech Chmielarz',
      description:
        'Upalne lato, bezkres chorwackiego nieba, beztroska, plaża i morze, tak wygląda raj, do którego przyjeżdżają na wakacje Daria z Markiem. Mieli mieć czas tylko dla siebie i syna, ale na miejscu poznają Szwedów: Johana i jego dużo młodszą seksowną żonę Verę. W dodatku Marek dostaje nagłą lukratywną propozycję zawodową i pogrąża się w pracy. W tym czasie Daria zbliża się do nowo poznanych ludzi. I z dnia na dzień jest nimi coraz bardziej zafascynowana. Pewnego wieczoru zostaje zaproszona do nich na kolację. Późnej atmosfera szybko staje się duszna od niewypowiedzianych pragnień, pożądania, zazdrości i poczucia odrzucenia. Chorwackie słońce rozpala zmysły i doprowadza ludzi do szaleństwa. Które z nich ulegnie mu jako pierwsze?  Jedno jest pewne – nie wszyscy wrócą do domu. Nie wszyscy przeżyją. To pierwsze i ostatnie takie lato w ich życiu. W którym momencie fascynacja drugą osobą zamienia się w obsesję? Jak daleko można się posunąć, żeby zdobyć to, czego się pragnie? Czy pożądanie może smakować zemstą? Opowieść o opętaniu i odrzuceniu, o tym, że nasze pragnienia mogą zniszczyć życie, a to, co wydaje się spełnieniem marzeń, szybko może stać się przekleństwem.',
      rating: 4.5,
      price: 11,
      image: 'za-granica.jpg',
    },
  ];
}

async function seed() {
  await db.product.deleteMany();

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
