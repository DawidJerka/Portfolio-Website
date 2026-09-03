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
                "Projekt i implementacja gry typu Grand Strategy z wykorzystaniem silnika Godot.",

            full_description:
                "Gra typu Grand Strategy przygotowywana jako praca dyplomowa. Projekt obejmuje zaprojektowanie mechanik rozgrywki, systemów świata gry oraz ich implementację z wykorzystaniem silnika Godot i języka GDScript.",

            github_url: "",

            demo_url: "",

            media_url: ""
        },


        {
            title: "Pokémon Safari Zone AI",

            slug: "pokemon-safari-zone-ai",

            type: "Artificial Intelligence",

            description:
                "Środowisko do eksperymentów z uczeniem ze wzmocnieniem.",

            full_description:
                "Projekt środowiska inspirowanego Pokémon Safari Zone, wykorzystany do eksperymentowania z algorytmami Reinforcement Learning oraz biblioteką Gymnasium.",

            github_url: "",

            demo_url: "",

            media_url: ""
        },


        {
            title: "Space Invaders AI",

            slug: "space-invaders-ai",

            type: "Artificial Intelligence",

            description:
                "Środowisko Space Invaders wykorzystane do eksperymentów z Multi-Agent Reinforcement Learning.",

            full_description:
                "Projekt skupiający się na wykorzystaniu środowiska inspirowanego grą Space Invaders do eksperymentowania z uczeniem ze wzmocnieniem wielu agentów.",

            github_url: "",

            demo_url: "",

            media_url: ""
        },


        {
            title: "Journey of the Prairie King",

            slug: "journey-of-the-prairie-king",

            type: "Game Development",

            description:
                "Implementacja gry inspirowanej klasycznym arcade game.",

            full_description:
                "Projekt gry wykonany z wykorzystaniem silnika Unity i języka C#. Skupiał się na implementacji mechaniki rozgrywki oraz podstawowych systemów charakterystycznych dla gier arcade.",

            github_url: "",

            demo_url: "",

            media_url: ""
        },


        {
            title: "Pong / Flappy Bird",

            slug: "pong-flappy-bird",

            type: "Game Development",

            description:
                "Proste projekty gier wykonane w Unity jako ćwiczenie podstaw game developmentu.",

            full_description:
                "Zbiór niewielkich projektów wykonanych w Unity i C#, pozwalających przećwiczyć podstawowe mechaniki rozgrywki, obsługę obiektów oraz logikę gry.",

            github_url: "",

            demo_url: "",

            media_url: ""
        },


        {
            title: "Analiza rynku samochodów używanych",

            slug: "analiza-rynku-samochodow",

            type: "Data Science",

            description:
                "Analiza zależności pomiędzy parametrami samochodów a ich cenami na rynku wtórnym.",

            full_description:
                "Projekt analizy danych dotyczących rynku samochodów używanych. Dane zostały pozyskane z serwisu Otomoto, a następnie poddane czyszczeniu, analizie statystycznej i wizualizacji. Analizowane były między innymi cena, przebieg, pojemność silnika, moc oraz rok produkcji.",

            github_url: "",

            demo_url: "",

            media_url: ""
        },


        {
            title: "Fifteen Puzzle",

            slug: "fifteen-puzzle",

            type: "Android",

            description:
                "Gra logiczna na Androida z obsługą wyników i ustawień użytkownika.",

            full_description:
                "Aplikacja mobilna będąca implementacją klasycznej gry Fifteen Puzzle. Projekt obejmuje logikę rozgrywki, ekran wyników oraz zapisywanie ustawień użytkownika.",

            github_url: "",

            demo_url: "",

            media_url: ""
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
        "OOP"
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
            "GDScript"
        ],

        "pokemon-safari-zone-ai": [
            "Python",
            "Gymnasium",
            "Reinforcement Learning"
        ],

        "space-invaders-ai": [
            "Python",
            "Gymnasium",
            "Multi-Agent RL"
        ],

        "journey-of-the-prairie-king": [
            "Unity",
            "C#"
        ],

        "pong-flappy-bird": [
            "Unity",
            "C#"
        ],

        "analiza-rynku-samochodow": [
            "Python",
            "Pandas"
        ],

        "fifteen-puzzle": [
            "Java",
            "Android"
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