const db = require("./database/database");

db.serialize(() => {

    db.run(`DROP TABLE IF EXISTS project_technologies`);

    db.run(`DROP TABLE IF EXISTS technologies`);

    db.run(`DROP TABLE IF EXISTS projects`);

    // =====================================================
    // TABLE: PROJECTS
    // =====================================================

    db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            title TEXT NOT NULL,
            title_en TEXT,

            slug TEXT NOT NULL UNIQUE,
            type TEXT,

            description TEXT,
            description_en TEXT,

            full_description TEXT,
            full_description_en TEXT,

            github_url TEXT,
            demo_url TEXT,
            media_url TEXT,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);


    // =====================================================
    // TABLE: TECHNOLOGIES
    // =====================================================

    db.run(`
        CREATE TABLE IF NOT EXISTS technologies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        )
    `);


    // =====================================================
    // TABLE: PROJECT_TECHNOLOGIES
    // =====================================================

    db.run(`
        CREATE TABLE IF NOT EXISTS project_technologies (
            project_id INTEGER NOT NULL,
            technology_id INTEGER NOT NULL,
            position INTEGER NOT NULL,

            PRIMARY KEY (project_id, technology_id),

            FOREIGN KEY (project_id)
                REFERENCES projects(id)
                ON DELETE CASCADE,

            FOREIGN KEY (technology_id)
                REFERENCES technologies(id)
                ON DELETE CASCADE
        )
    `);


    // =====================================================
    // PROJECTS
    // =====================================================

    const projects = [
        {
            title: "Survivors 3D",
            title_en: "Survivors 3D",

            slug: "survivors3d",

            type: "Game Development",

            description:
                "3D sci-fi survivor-like rozwijany w Unity 6, z automatyczną walką, systemem rozwoju postaci, modularnymi broniami oraz skalującym się poziomem trudności.",

            description_en:
                "A 3D sci-fi survivor-like developed in Unity 6, featuring automatic combat, character progression, modular weapons and dynamically scaling difficulty.",

            full_description:
                "Survivors 3D to stylizowana gra akcji typu survivor-like rozwijana w Unity 6 jako projekt portfolio. Gracz steruje robotem poruszającym się po futurystycznej arenie, na której z każdą kolejną minutą pojawia się coraz więcej przeciwników. Walka odbywa się automatycznie, natomiast zadaniem gracza jest odpowiednie pozycjonowanie postaci, unikanie przeciwników, zbieranie doświadczenia oraz dobieranie ulepszeń pozwalających przetrwać rosnącą presję.\n\nProjekt posiada kompletną podstawową pętlę rozgrywki. Pokonani przeciwnicy pozostawiają kryształy doświadczenia, które po zbliżeniu przyciągane są do gracza. Po zdobyciu odpowiedniej liczby punktów doświadczenia gra zostaje zatrzymana, a gracz wybiera jedną z losowo wygenerowanych opcji rozwoju. Możliwe jest zdobywanie nowych broni i przedmiotów pasywnych oraz ulepszanie już posiadanych elementów wyposażenia. System uwzględnia między innymi maksymalne poziomy przedmiotów oraz limity dostępnych slotów.",

            full_description_en:
                "Survivors 3D is a stylized survivor-like action game developed in Unity 6 as a portfolio project. The player controls a robotic character inside a futuristic arena where increasingly difficult waves of enemies approach from every direction. Combat is mostly automatic, while the player focuses on positioning, avoiding enemies, collecting experience and selecting upgrades that help survive the increasing pressure.\n\nThe project features a complete core gameplay loop. Defeated enemies drop experience gems that are attracted toward the player when entering the pickup radius. After gaining enough experience, the game pauses and presents randomly generated upgrade options. The player can acquire new weapons and passive items or upgrade those already owned. The system also handles maximum item levels and category slot limits.",

            github_url:
                "https://github.com/DawidJerka/Survivors3D",

            demo_url: "",

            media_url:
                "/images/survivors3d.mp4"
        },
        {
            title: "Grand Strategy Game",
            title_en: "Grand Strategy Game",

            slug: "grand-strategy-game",

            type: "Game Development",

            description:
                "Funkcjonalny prototyp gry typu Grand Strategy stworzony w Godot, łączący symulację państw, gospodarkę, dyplomację, wojsko i rozbudowany interfejs użytkownika.",

            description_en:
                "A functional Grand Strategy prototype built in Godot, combining country simulation, economy, diplomacy, military systems and an extensive user interface.",

            full_description:
                "Grand Strategy Game to funkcjonalny prototyp gry strategicznej osadzonej w Europie w 1385 roku, przygotowany w silniku Godot w ramach pracy dyplomowej. Projekt skupia się na stworzeniu działającej symulacji świata, w której państwa zarządzają swoimi prowincjami, gospodarką, armiami i relacjami z innymi państwami.\n\nMapa świata została podzielona na państwa i prowincje, których geometria jest generowana na podstawie przygotowanych danych. Prowincje przechowują między innymi informacje o właścicielu, populacji i dobrach handlowych, a ich sąsiedztwo jest reprezentowane jako graf wykorzystywany między innymi do wyznaczania tras ruchu wojsk.\n\nJednym z głównych elementów projektu jest system gospodarczy obejmujący produkcję i konsumpcję dóbr, nadwyżki i deficyty, globalny rynek oraz dynamiczne ceny zależne od podaży i popytu. Państwa posiadają również skarbiec, populację i manpower, a poziom mobilizacji wpływa na dostępne zasoby oraz produkcję.\n\nSystem dyplomacji pozwala między innymi wypowiadać wojny, zawierać rozejmy, poprawiać relacje oraz przyznawać i uzyskiwać Military Access. Wojna i prawa przemarszu wpływają na możliwość przemieszczania wojsk. Możliwe jest również zawieranie sojuszy, jednak na obecnym etapie nie mają one jeszcze dalszego wpływu na pozostałe mechaniki gry.\n\nSystem wojskowy obejmuje tworzenie armii, zarządzanie jednostkami, przemieszczanie wojsk pomiędzy prowincjami oraz grupowanie wielu armii znajdujących się w tej samej prowincji. Do wyznaczania tras pomiędzy prowincjami wykorzystano algorytm BFS, a dostępność terytorium jest sprawdzana na podstawie właściciela, relacji dyplomatycznych i praw przemarszu.\n\nProjekt posiada rozbudowany interfejs użytkownika obejmujący między innymi HUD, Outliner oraz osobne panele prowincji, armii, gospodarki, dyplomacji i technologii. Logika symulacji została oddzielona od warstwy interfejsu, a model domenowy obejmuje między innymi Country, Province, Army i Unit. W projekcie wykorzystano również Autoloady, GameState, GameRules, serwisy oraz sygnały do komunikacji pomiędzy komponentami.\n\nWażnym elementem prac była również optymalizacja systemu mapy. Początkowo kontury prowincji były przetwarzane poprzez analizę mapy piksel po pikselu. Ostatecznie rozwiązanie zostało zastąpione precomputingiem konturów i przechowywaniem gotowych wielokątów prowincji w formacie JSON, ograniczając koszt inicjalizacji świata.\n\nProjekt zawiera również przygotowaną architekturę systemu AI opartego na akcjach AiAction oraz system technologii z drzewkiem rozwoju. Są to jednak elementy znajdujące się na wcześniejszym etapie implementacji i nie wpływają jeszcze w pełni na przebieg rozgrywki.",

            full_description_en:
                "Grand Strategy Game is a functional strategy game prototype set in Europe in 1385, developed in Godot as part of my bachelor's thesis. The project focuses on creating a working world simulation in which countries manage their provinces, economies, armies and relations with other states.\n\nThe world map is divided into countries and provinces whose geometry is generated from prepared data. Provinces store information such as ownership, population and trade goods, while their adjacency is represented as a graph used for tasks such as calculating army movement routes.\n\nOne of the main systems is the economy, which includes production and consumption of goods, surpluses and shortages, a global market and dynamic prices based on supply and demand. Countries also maintain a treasury, population and manpower, while the level of mobilization affects available resources and production.\n\nThe diplomacy system allows countries to declare wars, establish truces, improve relations and grant or obtain Military Access. Wars and access rights affect the ability of armies to move through territory. Alliances can also be created, although at the current stage they do not yet have a wider impact on other gameplay systems.\n\nThe military system includes creating armies, managing units, moving armies between provinces and grouping multiple armies located in the same province. The BFS algorithm is used to determine routes between provinces, while territory accessibility is evaluated based on ownership, diplomatic relations and military access rights.\n\nThe project includes an extensive user interface featuring a HUD, Outliner and separate panels for provinces, armies, economy, diplomacy and technologies. Simulation logic is separated from the UI layer, while the domain model includes entities such as Country, Province, Army and Unit. The project also uses Autoloads, GameState, GameRules, services and signals for communication between components.\n\nMap system optimization was also an important part of the project. Initially, province borders were processed by analyzing the map pixel by pixel. This solution was later replaced with precomputed province outlines stored as polygons in JSON format, significantly reducing world initialization cost.\n\nThe project also contains an architecture for an AI system based on AiAction objects and a technology system with a development tree. These components are still at an earlier stage of implementation and do not yet fully affect gameplay.",

            github_url: "",
            demo_url: "",

            media_url:
                "/images/grand_strategy.png"
        },
        {
            title: "Safari Zone",
            title_en: "Safari Zone",

            slug: "safari-zone",

            type:
                "Reinforcement Learning / Game Development",

            description:
                "Środowisko Reinforcement Learning inspirowane Pokémon Safari Zone oraz trening agentów DQN i PPO do podejmowania decyzji w warunkach niepewności.",

            description_en:
                "A Reinforcement Learning environment inspired by Pokémon Safari Zone, used to train DQN and PPO agents to make decisions under uncertainty.",

            full_description:
                "Safari Zone to projekt polegający na zaprojektowaniu i implementacji własnego środowiska do uczenia ze wzmocnieniem z wykorzystaniem biblioteki Gymnasium. Środowisko odwzorowuje mechanikę Safari Zone, w której agent dysponuje ograniczoną liczbą Safari Ball i musi podejmować decyzje wpływające na szanse złapania lub ucieczki Pokémona.\n\nAgent może wykonywać trzy rodzaje akcji: Catch, Rock oraz Bait. Rzucenie Safari Ball pozwala podjąć próbę złapania Pokémona, kamień zwiększa szansę na złapanie, ale również ryzyko ucieczki, natomiast przynęta zmniejsza ryzyko ucieczki kosztem mniejszej szansy na złapanie. Akcje zostały zdefiniowane jako enum i stanowią przestrzeń działań środowiska.\n\nŚrodowisko uwzględnia różne typy Pokémonów posiadających odmienne parametry, między innymi bazową szansę złapania, szansę ucieczki, poziom oraz wpływ przynęty i kamienia. Poziom konkretnego Pokémona jest losowany w określonym zakresie, dzięki czemu kolejne epizody mogą różnić się poziomem trudności.\n\nStan obserwowany przez agenta obejmuje między innymi liczbę dostępnych Safari Ball, liczbę wykorzystanych tur, typ i poziom aktualnego Pokémona oraz liczbę użytych przynęt i kamieni. Środowisko zostało zaimplementowane zgodnie z API Gymnasium i posiada własną logikę resetowania, wykonywania kolejnych kroków, obliczania nagrody oraz renderowania stanu gry.\n\nIstotnym elementem projektu było zaprojektowanie funkcji nagrody. Udane złapanie Pokémona jest nagradzane wysoką dodatnią nagrodą, ucieczka Pokémona wiąże się z wysoką karą, a poszczególne akcje pośrednie otrzymują mniejsze wartości nagrody. Takie podejście ma zachęcać agenta do gospodarowania ograniczonymi zasobami i poszukiwania skutecznej strategii zamiast wykonywania przypadkowych akcji.\n\nNa przygotowanym środowisku przeprowadzono trening agentów wykorzystującego algorytmy DQN i PPO z biblioteki Stable-Baselines3. Model został trenowany przez 1 000 000 kroków, a następnie oceniony na 100 niezależnych epizodach. Wyniki treningu i ewaluacji były zbierane i wizualizowane za pomocą biblioteki Plotly.\n\nProjekt obejmował również przygotowanie prostego interfejsu wizualizującego przebieg epizodu oraz obsługę zasobów graficznych, takich jak tło i sprite'y Pokémonów.\n\nProjekt pozwolił mi przećwiczyć projektowanie środowisk dla Reinforcement Learning, definiowanie przestrzeni akcji i obserwacji, projektowanie funkcji nagrody oraz wykorzystanie gotowych algorytmów uczenia ze wzmocnieniem do treningu i oceny agenta.",

            full_description_en:
                "Safari Zone is a project focused on designing and implementing a custom Reinforcement Learning environment using Gymnasium. The environment recreates the mechanics of the Safari Zone, where an agent has a limited number of Safari Balls and must make decisions that affect the probability of catching a Pokémon or causing it to escape.\n\nThe agent can perform three actions: Catch, Rock and Bait. Throwing a Safari Ball attempts to catch the Pokémon, using a rock increases the catch probability but also increases the risk of escape, while bait reduces the escape probability at the cost of lowering the chance of catching it. The actions are defined as an enum and form the environment's action space.\n\nThe environment contains different Pokémon types with different parameters, including base catch probability, escape probability, level and the effects of bait and rocks. Each Pokémon's level is randomly selected from a defined range, which allows individual episodes to differ in difficulty.\n\nThe state observed by the agent includes the number of remaining Safari Balls, the number of turns used, the type and level of the current Pokémon and the number of bait and rock actions performed. The environment follows the Gymnasium API and implements its own reset, step, reward calculation and rendering logic.\n\nAn important part of the project was designing the reward function. Successfully catching a Pokémon produces a high positive reward, while allowing it to escape results in a significant penalty. Intermediate actions receive smaller reward values. This encourages the agent to manage limited resources and search for an effective strategy rather than performing random actions.\n\nDQN and PPO agents from Stable-Baselines3 were trained in the environment. The model was trained for 1,000,000 steps and then evaluated across 100 independent episodes. Training and evaluation results were collected and visualized using Plotly.\n\nThe project also included a simple interface for visualizing episode progress and handling graphical assets such as backgrounds and Pokémon sprites.\n\nThe project gave me practical experience in designing Reinforcement Learning environments, defining action and observation spaces, designing reward functions and using existing reinforcement learning algorithms to train and evaluate agents.",

            github_url:
                "https://github.com/DawidJerka/Safari_Zone",

            demo_url: "",

            media_url:
                "/images/safari_zone.png"
        },
        {
            title:
                "Predykcja cen samochodów",

            title_en:
                "Car Price Prediction",

            slug:
                "car-price-prediction",

            type:
                "Data Science",

            description:
                "Analiza danych samochodów używanych zebranych z internetu oraz przygotowanie modelu do predykcji ich cen.",

            description_en:
                "Analysis of used car data collected from the web and development of a model for predicting vehicle prices.",

            full_description:
                "Projekt obejmował cały proces pracy z danymi dotyczącymi rynku samochodów używanych — od pozyskania danych z internetu, przez ich czyszczenie i analizę, aż po przygotowanie modelu predykcyjnego.\n\nDane zostały zebrane poprzez scraping ofert samochodów z internetu, a następnie połączone i przygotowane do dalszej analizy. Zbiór zawierał między innymi informacje o marce, modelu, typie nadwozia, roku produkcji, przebiegu, pojemności silnika, rodzaju paliwa, skrzyni biegów, mocy oraz cenie.\n\nW ramach eksploracyjnej analizy danych badałem rozkłady poszczególnych zmiennych oraz zależności pomiędzy parametrami samochodów. Analiza obejmowała między innymi macierz korelacji oraz porównanie średnich cen w zależności od marki i innych cech pojazdu.\n\nKolejnym etapem było przygotowanie modelu pozwalającego na estymację ceny samochodu na podstawie jego parametrów. Wyniki predykcji zostały porównane z rzeczywistymi wartościami, a jakość modelu oceniona między innymi poprzez analizę błędów predykcji.\n\nProjekt pozwolił mi przejść przez pełny proces pracy z danymi — od surowych danych pozyskanych z internetu, przez ich przygotowanie i analizę, po wykorzystanie ich do stworzenia rozwiązania predykcyjnego.",

            full_description_en:
                "The project covered the entire data workflow for the used car market — from collecting data from the web, through cleaning and analysis, to building a predictive model.\n\nThe data was collected by scraping online car listings and then merged and prepared for further analysis. The dataset included information such as brand, model, body type, production year, mileage, engine capacity, fuel type, transmission, engine power and price.\n\nDuring exploratory data analysis, I examined variable distributions and relationships between vehicle parameters. The analysis included a correlation matrix as well as comparisons of average prices depending on brand and other vehicle characteristics.\n\nThe next stage involved building a model capable of estimating a vehicle's price based on its parameters. Predictions were compared with actual prices, and model quality was evaluated using prediction error analysis.\n\nThe project allowed me to work through the complete data analysis process — from raw data collected from the web, through preparation and exploration, to using the data to build a predictive solution.",

            github_url:
                "https://github.com/DawidJerka/Car_prices",

            demo_url: "",

            media_url:
                "/images/car_price_prediction.png"
        },
        {
            title: "Iris Classifier",
            title_en: "Iris Classifier",

            slug: "iris-classifier",

            type:
                "Machine Learning / Web Development",

            description:
                "Klasyfikator gatunków irysów wykorzystujący model Random Forest wytrenowany w Pythonie i uruchamiany bezpośrednio w przeglądarce.",

            description_en:
                "An iris species classifier using a Random Forest model trained in Python and executed directly in the browser.",

            full_description:
                "Projekt przedstawia prostą aplikację wykorzystującą uczenie maszynowe do klasyfikacji gatunków irysów — Setosa, Versicolor oraz Virginica.\n\nModel Random Forest został wytrenowany w Pythonie z wykorzystaniem biblioteki scikit-learn na klasycznym zbiorze danych Iris. Do klasyfikacji wykorzystywane są cztery cechy kwiatu: długość i szerokość działki kielicha oraz długość i szerokość płatka.\n\nWytrenowany model został następnie wyeksportowany do postaci JavaScript, dzięki czemu predykcja może być wykonywana bezpośrednio po stronie klienta. Aplikacja nie wymaga backendu ani połączenia z serwerem podczas korzystania z klasyfikatora.\n\nInterfejs aplikacji został przygotowany w HTML i JavaScript. Użytkownik wprowadza parametry kwiatu w formularzu, a następnie otrzymuje przewidywany gatunek irysa na podstawie wyniku modelu.\n\nProjekt pokazuje podstawowy proces wykorzystania modelu Machine Learning w aplikacji webowej — od wytrenowania modelu w Pythonie, przez jego eksport do JavaScript, aż po wykonanie predykcji w przeglądarce.",

            full_description_en:
                "The project is a simple application that uses machine learning to classify iris species — Setosa, Versicolor and Virginica.\n\nA Random Forest model was trained in Python using scikit-learn and the classic Iris dataset. Four flower features are used for classification: sepal length, sepal width, petal length and petal width.\n\nThe trained model was then exported to JavaScript, allowing predictions to be performed directly on the client side. The application does not require a backend or server connection when using the classifier.\n\nThe application's interface was built with HTML and JavaScript. The user enters flower parameters into a form and receives the predicted iris species based on the model's output.\n\nThe project demonstrates the basic process of integrating a Machine Learning model into a web application — from training the model in Python, through exporting it to JavaScript, to performing predictions directly in the browser.",

            github_url:
                "https://github.com/DawidJerka/IrisApp",

            demo_url: "",

            media_url:
                "/images/iris_classifier.png"
        },
        {
            title:
                "Car Brand Classification",

            title_en:
                "Car Brand Classification",

            slug:
                "car-brand-classification",

            type:
                "Machine Learning / Android",

            description:
                "System wykorzystujący model YOLOv8n do detekcji logotypów samochodów oraz aplikacja Android umożliwiająca rozpoznawanie marek na nagraniach wideo.",

            description_en:
                "A system using YOLOv8n for car logo detection together with an Android application for recognizing car brands in video recordings.",

            full_description:
                "Projekt realizowany w trzyosobowym zespole, którego celem było stworzenie systemu rozpoznawania marek samochodów na podstawie obrazu i nagrań wideo.\n\nPoczątkowo wykorzystaliśmy model MobileNet do klasyfikacji marek, jednak niezadowalające wyniki doprowadziły do zmiany podejścia na detekcję logotypów. Na przygotowanym zbiorze danych wytrenowaliśmy model YOLOv8n, przeprowadzając eksperymenty z liczbą klas, augmentacją danych oraz hiperparametrami. Finalnie wybraliśmy model trenowany na zredukowanym zbiorze klas z zastosowaną augmentacją.\n\nProjekt obejmował również analizę wyjaśnialności modelu z wykorzystaniem EigenCam oraz ocenę śladu energetycznego treningu przy użyciu CodeCarbon.\n\nMoim głównym wkładem było podejmowanie decyzji technicznych, wybór datasetu oraz przygotowanie części związanej z wdrożeniem modelu. Przekonwertowałem wytrenowany model YOLOv8n do formatu TensorFlow Lite (TFLite) i zintegrowałem go z aplikacją Android.\n\nAplikacja pozwala wybrać nagranie wideo, a następnie analizuje jego kolejne klatki bezpośrednio na urządzeniu. Wykryte logotypy są oznaczane bounding boxami wraz z nazwą rozpoznanej marki. Użytkownik może również regulować częstotliwość analizowania klatek, dostosowując działanie aplikacji do możliwości urządzenia.\n\nProjekt pozwolił zdobyć praktyczne doświadczenie w całym procesie tworzenia rozwiązania ML — od przygotowania danych i eksperymentów z modelami, przez analizę ich działania, aż po wdrożenie modelu w aplikacji mobilnej.",

            full_description_en:
                "This project was developed by a three-person team with the goal of creating a system for recognizing car brands from images and video recordings.\n\nInitially, we used MobileNet for brand classification, but unsatisfactory results led us to change the approach to logo detection. We trained a YOLOv8n model on a prepared dataset and experimented with the number of classes, data augmentation and hyperparameters. The final solution used a model trained on a reduced set of classes with data augmentation.\n\nThe project also included model explainability analysis using EigenCam and evaluation of the energy footprint of training using CodeCarbon.\n\nMy main contribution involved technical decision-making, dataset selection and preparing the model deployment stage. I converted the trained YOLOv8n model to TensorFlow Lite (TFLite) and integrated it into an Android application.\n\nThe application allows the user to select a video recording and analyzes successive frames directly on the device. Detected logos are displayed using bounding boxes together with the recognized brand name. The user can also adjust how frequently frames are analyzed, allowing performance to be adapted to the capabilities of the device.\n\nThe project provided practical experience with the complete ML solution lifecycle — from preparing data and experimenting with models, through analyzing their behavior, to deploying a trained model in a mobile application.",

            github_url:
                "https://github.com/DawidJerka/WTUM-Klasyfikacja_samochodow",

            demo_url: "",

            media_url:
                "/images/car_brand_classification.png"
        },
        {
            title:
                "Stamina Dance Music Player",

            title_en:
                "Stamina Dance Music Player",

            slug:
                "stamina-dance-music-player",

            type:
                "Android",

            description:
                "Aplikacja mobilna do przygotowywania i odtwarzania muzyki do treningów typu stamina odwzorowujących przebieg turnieju tańca towarzyskiego.",

            description_en:
                "A mobile application for preparing and playing music for stamina training sessions designed to simulate the structure of a ballroom dance competition.",

            full_description:
                "Stamina Dance Music Player to aplikacja na Androida przeznaczona do przygotowywania treningów typu stamina dla tancerzy tańca towarzyskiego. Program pozwala skonfigurować przebieg całej sesji treningowej w sposób odpowiadający rzeczywistemu turniejowi tanecznemu.\n\nUżytkownik może wybrać pomiędzy tańcami standardowymi i latynoamerykańskimi, a następnie zdecydować, które z pięciu tańców mają zostać uwzględnione w treningu. Dla każdego tańca można ustawić indywidualną długość oraz tempo odtwarzania, a także czas przerw pomiędzy kolejnymi tańcami. Dostępna jest również możliwość zastosowania jednej długości i tempa dla wszystkich wybranych tańców.\n\nNa podstawie wybranych ustawień aplikacja losowo dobiera utwory oznaczone odpowiednimi tagami i tworzy playlistę odpowiadającą kolejności tańców podczas turnieju. Odtwarzanie rozpoczyna się od intro, następnie wykonywany jest pierwszy taniec, przerwa, kolejny taniec i następna przerwa, aż do zakończenia całej sesji.\n\nAplikacja posiada panel sterowania odtwarzaniem umożliwiający uruchamianie i pauzowanie muzyki, zatrzymywanie odtwarzania, przechodzenie do następnego tańca oraz cofanie do poprzedniego. Długość trwania i tempo utworów można wygodnie konfigurować za pomocą pickerów.\n\nIntegralną częścią aplikacji jest Playlist Manager, który umożliwia zarządzanie biblioteką utworów. Użytkownik może dodawać utwory do aplikacji oraz przypisywać im odpowiednie tagi odpowiadające poszczególnym tańcom. Dzięki temu program może automatycznie wybierać odpowiednią muzykę podczas tworzenia treningu.\n\nProjekt łączy tworzenie aplikacji mobilnej na Androida, obsługę odtwarzania muzyki, zarządzanie playlistą oraz rozbudowaną logikę sterującą przebiegiem treningu. Aplikacja została zaprojektowana jako praktyczne narzędzie wykorzystywane podczas przygotowań do turniejów tańca towarzyskiego.",

            full_description_en:
                "Stamina Dance Music Player is an Android application designed for preparing stamina training sessions for ballroom dancers. The application allows the entire training session to be configured in a way that reflects the structure of a real dance competition.\n\nThe user can choose between Standard and Latin dances and then select which of the five dances should be included in the session. Each dance can have its own duration and playback tempo as well as a configurable break before the next dance. The application also provides an option to apply the same duration and tempo to all selected dances.\n\nBased on these settings, the application randomly selects tracks with the appropriate tags and creates a playlist matching the order of dances used during a competition. Playback begins with an intro, followed by the first dance, a break, the next dance and another break until the entire session is completed.\n\nThe application includes playback controls for starting and pausing music, stopping playback, moving to the next dance and returning to the previous one. Track duration and tempo can be conveniently configured using pickers.\n\nAn integral part of the application is the Playlist Manager, which allows users to manage their music library. Tracks can be added to the application and assigned tags corresponding to specific dances. This allows the program to automatically select appropriate music when generating a training session.\n\nThe project combines Android application development, audio playback, playlist management and more complex logic controlling the structure of a training session. The application was designed as a practical tool for preparation for ballroom dance competitions.",

            github_url:
                "https://github.com/DawidJerka/StaminaDanceMusicPlayer",

            demo_url: "",

            media_url:
                "/images/staminadancemusicplayer.png"
        },
        {
            title: "Portfolio",
            title_en: "Portfolio",

            slug: "portfolio",

            type:
                "Web Development",

            description:
                "Responsywna strona portfolio z dynamicznym systemem prezentacji projektów opartym na Node.js, Express i bazie SQLite.",

            description_en:
                "A responsive portfolio website with a dynamic project presentation system built with Node.js, Express and SQLite.",

            full_description:
                "Portfolio to własna aplikacja webowa służąca do prezentowania moich projektów, umiejętności, doświadczenia i wykształcenia.\n\nAplikacja została zbudowana w oparciu o Node.js i Express. Główna strona wykorzystuje silnik szablonów EJS, natomiast dane dotyczące projektów są przechowywane w relacyjnej bazie SQLite.\n\nIstotną częścią projektu jest dynamiczny system prezentacji projektów. Frontend pobiera dane z REST API za pomocą fetch() i na ich podstawie generuje karty projektów. Dla każdego projektu dostępny jest również widok szczegółów wyświetlany w modalu, zawierający opis, technologie, multimedia oraz odnośniki do GitHub i wersji demonstracyjnej.\n\nBaza danych została zaprojektowana z wykorzystaniem relacji wiele-do-wielu pomiędzy projektami i technologiami. Informacje o technologiach są pobierane za pomocą zapytań SQL z wykorzystaniem JOIN oraz GROUP_CONCAT, a następnie przetwarzane po stronie serwera do postaci wykorzystywanej przez frontend.\n\nBackend udostępnia endpointy REST API do pobierania listy wszystkich projektów oraz szczegółów pojedynczego projektu na podstawie jego sluga. Obsługuje również odpowiedzi błędów, w tym sytuację, gdy wskazany projekt nie istnieje.\n\nFrontend został przygotowany w HTML, CSS i JavaScript. JavaScript odpowiada między innymi za komunikację z API, dynamiczne generowanie elementów interfejsu, obsługę modala, wyświetlanie zdjęć i materiałów wideo oraz obsługę stanów ładowania i błędów.\n\nProjekt pozwolił mi połączyć tworzenie backendu, projektowanie REST API, pracę z relacyjną bazą danych oraz budowę dynamicznego interfejsu webowego w jednej aplikacji.",

            full_description_en:
                "Portfolio is a custom web application designed to present my projects, skills, professional experience and education.\n\nThe application was built with Node.js and Express. The main page uses the EJS template engine, while project data is stored in a relational SQLite database.\n\nAn important part of the project is its dynamic project presentation system. The frontend retrieves data from a REST API using fetch() and generates project cards based on the returned data. Each project also has a detailed modal view containing its description, technologies, media and links to GitHub or a demo version.\n\nThe database uses a many-to-many relationship between projects and technologies. Technology data is retrieved using SQL queries and then processed on the server into a structure used by the frontend.\n\nThe backend provides REST API endpoints for retrieving all projects as well as the details of an individual project based on its slug. It also handles error responses, including cases where the requested project does not exist.\n\nThe frontend was built with HTML, CSS and JavaScript. JavaScript handles communication with the API, dynamic interface generation, modal behavior, image and video presentation, filtering and loading or error states.\n\nThe project allowed me to combine backend development, REST API design, relational database development and a dynamic web interface within a single application.",

            github_url:
                "https://github.com/DawidJerka/Portfolio-Website",

            demo_url: "",

            media_url:
                "/images/portfolio.png"
        }


    ];


    // =====================================================
    // INSERT PROJECTS
    // =====================================================

    const projectStatement = db.prepare(`
    INSERT OR IGNORE INTO projects (
        title,
        title_en,
        slug,
        type,
        description,
        description_en,
        full_description,
        full_description_en,
        github_url,
        demo_url,
        media_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);


    projects.forEach(project => {

        projectStatement.run(
            project.title,
            project.title_en,
            project.slug,
            project.type,
            project.description,
            project.description_en,
            project.full_description,
            project.full_description_en,
            project.github_url,
            project.demo_url,
            project.media_url
        );

    });


    projectStatement.finalize();


    // =====================================================
    // TECHNOLOGIES
    // =====================================================

    const technologies = [
        // Game Development
        "Unity",
        "C#",
        "ScriptableObjects",
        "OOP",
        "Godot",
        "GDScript",
        "Simulation",
        "Pathfinding",
        "Data-Driven Design",
        "Rigidbody Physics",
        "URP",
        "Audio Pooling",
        "Particle System",

        // Data Science
        "Python",
        "Pandas",
        "Web Scraping",
        "Data Analysis",
        "Machine Learning",
        "scikit-learn",
        "Random Forest",
        "Gymnasium",
        "Stable-Baselines3",
        "PPO",
        "DQN",
        "Reinforcement Learning",
        "YOLO",
        "TensorFlow Lite",
        "Computer Vision",

        // Web Development
        "JavaScript",
        "HTML",
        "CSS",
        "Node.js",
        "Express",
        "EJS",
        "SQLite",
        "SQL",
        "REST API",

        // Android
        "Java",
        "Android",
        "Android Studio",
        "Audio Playback",
        "Playlist Management"
    ];


    const technologyStatement = db.prepare(`
        INSERT OR IGNORE INTO technologies (name)
        VALUES (?)
    `);


    technologies.forEach(technology => {
        technologyStatement.run(technology);
    });


    technologyStatement.finalize();


    // =====================================================
    // PROJECT ↔ TECHNOLOGY RELATIONS
    // =====================================================

    const relations = {
        "survivors3d": [
            "Unity",
            "C#",
            "ScriptableObjects",
            "Data-Driven Design",
            "OOP",
            "Rigidbody Physics",
            "URP",
            "Audio Pooling",
            "Particle System"
        ],
        "safari-zone": [
            "Python",
            "Gymnasium",
            "Stable-Baselines3",
            "PPO",
            "DQN",
            "Reinforcement Learning"
        ],
        "grand-strategy-game": [
            "Godot",
            "GDScript",
            "Simulation",
            "Pathfinding",
            "OOP"
        ],
        "car-price-prediction": [
            "Python",
            "Pandas",
            "Web Scraping",
            "Data Analysis",
            "Machine Learning"
        ],
        "iris-classifier": [
            "Python",
            "scikit-learn",
            "Random Forest",
            "JavaScript",
            "HTML",
            "Machine Learning"
        ],
        "car-brand-classification": [
            "Python",
            "YOLO",
            "TensorFlow Lite",
            "Machine Learning",
            "Computer Vision",
            "Java",
            "Android",
            "Android Studio"
        ],
        "stamina-dance-music-player": [
            "Java",
            "Android",
            "Android Studio",
            "Audio Playback",
            "Playlist Management"
        ],
        "portfolio": [
            "JavaScript",
            "HTML",
            "CSS",
            "Node.js",
            "Express",
            "EJS",
            "SQLite",
            "SQL",
            "REST API"
        ],

    };


    // =====================================================
    // CREATE RELATIONS
    // =====================================================

    const relationStatement = db.prepare(`
        INSERT OR IGNORE INTO project_technologies (
            project_id,
            technology_id,
            position
        )
        SELECT
            p.id,
            t.id,
            ?
        FROM projects p, technologies t
        WHERE p.slug = ?
            AND t.name = ?
    `);


    Object.entries(relations).forEach(
        ([slug, projectTechnologies]) => {

            projectTechnologies.forEach(
                (technology, index) => {

                    relationStatement.run(
                        index,
                        slug,
                        technology
                    );
                }
            );

        }
    );


    relationStatement.finalize();


    console.log("Baza danych została przygotowana.");
});


db.close();