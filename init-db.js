const db = require("./database/database");

db.serialize(() => {

    // =====================================================
    // TABLE: PROJECTS
    // =====================================================

    db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            type TEXT,
            description TEXT,
            full_description TEXT,
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

            slug: "survivors3d",

            type: "Game Development",

            description:
                "3D sci-fi survivor game rozwijany w Unity 6.",

            full_description:
                "Projekt gry typu survivor rozwijany w silniku Unity 6. Skupia się na projektowaniu modularnych systemów gameplayowych, między innymi systemu broni, przeciwników, progresji postaci oraz zarządzania danymi.",

            github_url: "https://github.com/DawidJerka/Survivors3D",

            demo_url: "",

            media_url: "/images/survivors3d.mp4"
        },
        {
            title: "Grand Strategy Game",

            slug: "grand-strategy-game",

            type: "Game Development",

            description:
                "Funkcjonalny prototyp gry typu Grand Strategy stworzony w Godot, łączący symulację państw, gospodarkę, dyplomację, wojsko i rozbudowany interfejs użytkownika.",

            full_description:
                "Grand Strategy Game to funkcjonalny prototyp gry strategicznej osadzonej w Europie w 1385 roku, przygotowany w silniku Godot w ramach pracy dyplomowej. Projekt skupia się na stworzeniu działającej symulacji świata, w której państwa zarządzają swoimi prowincjami, gospodarką, armiami i relacjami z innymi państwami.\n\nMapa świata została podzielona na państwa i prowincje, których geometria jest generowana na podstawie przygotowanych danych. Prowincje przechowują między innymi informacje o właścicielu, populacji i dobrach handlowych, a ich sąsiedztwo jest reprezentowane jako graf wykorzystywany między innymi do wyznaczania tras ruchu wojsk.\n\nJednym z głównych elementów projektu jest system gospodarczy obejmujący produkcję i konsumpcję dóbr, nadwyżki i deficyty, globalny rynek oraz dynamiczne ceny zależne od podaży i popytu. Państwa posiadają również skarbiec, populację i manpower, a poziom mobilizacji wpływa na dostępne zasoby oraz produkcję.\n\nSystem dyplomacji pozwala między innymi wypowiadać wojny, zawierać rozejmy, poprawiać relacje oraz przyznawać i uzyskiwać Military Access. Wojna i prawa przemarszu wpływają na możliwość przemieszczania wojsk. Możliwe jest również zawieranie sojuszy, jednak na obecnym etapie nie mają one jeszcze dalszego wpływu na pozostałe mechaniki gry.\n\nSystem wojskowy obejmuje tworzenie armii, zarządzanie jednostkami, przemieszczanie wojsk pomiędzy prowincjami oraz grupowanie wielu armii znajdujących się w tej samej prowincji. Do wyznaczania tras pomiędzy prowincjami wykorzystano algorytm BFS, a dostępność terytorium jest sprawdzana na podstawie właściciela, relacji dyplomatycznych i praw przemarszu.\n\nProjekt posiada rozbudowany interfejs użytkownika obejmujący między innymi HUD, Outliner oraz osobne panele prowincji, armii, gospodarki, dyplomacji i technologii. Logika symulacji została oddzielona od warstwy interfejsu, a model domenowy obejmuje między innymi Country, Province, Army i Unit. W projekcie wykorzystano również Autoloady, GameState, GameRules, serwisy oraz sygnały do komunikacji pomiędzy komponentami.\n\nWażnym elementem prac była również optymalizacja systemu mapy. Początkowo kontury prowincji były przetwarzane poprzez analizę mapy piksel po pikselu. Ostatecznie rozwiązanie zostało zastąpione precomputingiem konturów i przechowywaniem gotowych wielokątów prowincji w formacie JSON, ograniczając koszt inicjalizacji świata.\n\nProjekt zawiera również przygotowaną architekturę systemu AI opartego na akcjach AiAction oraz system technologii z drzewkiem rozwoju. Są to jednak elementy znajdujące się na wcześniejszym etapie implementacji i nie wpływają jeszcze w pełni na przebieg rozgrywki.",

            github_url: "",

            demo_url: "",

            media_url: "/images/grand_strategy.png"
        }


    ];


    // =====================================================
    // INSERT PROJECTS
    // =====================================================

    const projectStatement = db.prepare(`
        INSERT OR IGNORE INTO projects (
            title,
            slug,
            type,
            description,
            full_description,
            github_url,
            demo_url,
            media_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);


    projects.forEach(project => {

        projectStatement.run(
            project.title,
            project.slug,
            project.type,
            project.description,
            project.full_description,
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
        "Godot",
        "GDScript",
        "Unity",
        "C#",
        "C++",
        "Python",
        "Pandas",
        "Gymnasium",
        "Reinforcement Learning",
        "Multi-Agent RL",
        "Java",
        "Android",
        "JavaScript",
        "Node.js",
        "Express",
        "EJS",
        "SQLite",
        "SQL",
        "HTML",
        "CSS",
        "Git",
        "Docker",
        "ScriptableObjects",
        "OOP",
        "Simulation",
        "Pathfinding"
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
            "OOP"
        ],

        "grand-strategy-game": [
            "Godot",
            "GDScript",
            "Simulation",
            "Pathfinding",
            "OOP"
        ]
    };


    // =====================================================
    // CREATE RELATIONS
    // =====================================================

    const relationStatement = db.prepare(`
        INSERT OR IGNORE INTO project_technologies (
            project_id,
            technology_id
        )
        SELECT
            p.id,
            t.id
        FROM projects p
        CROSS JOIN technologies t
        WHERE p.slug = ?
        AND t.name = ?
    `);


    Object.entries(relations).forEach(
        ([slug, projectTechnologies]) => {

            projectTechnologies.forEach(
                technology => {

                    relationStatement.run(
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