// =========================
// ELEMENTS
// =========================

const projectsGrid = document.getElementById("projects-grid");
const projectsLoading = document.getElementById("projects-loading");
const projectsError = document.getElementById("projects-error");

const projectModal = document.getElementById("project-modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalBody = document.getElementById("modal-body");


// =========================
// LOAD PROJECTS
// =========================

async function loadProjects() {

    try {

        const response = await fetch("/api/projects");

        if (!response.ok) {
            throw new Error("Nie udało się pobrać projektów.");
        }


        const projects = await response.json();


        projectsLoading.hidden = true;


        renderProjects(projects);


    } catch (error) {

        console.error(
            "Błąd podczas pobierania projektów:",
            error
        );


        projectsLoading.hidden = true;
        projectsError.hidden = false;

    }

}


// =========================
// RENDER PROJECTS
// =========================

function renderProjects(projects) {

    projectsGrid.innerHTML = "";


    if (projects.length === 0) {

        projectsGrid.innerHTML = `
            <div class="projects-state">
                Brak projektów.
            </div>
        `;

        return;
    }


    projects.forEach((project, index) => {

        const article =
            document.createElement("article");


        article.className = "project-card";


        // Pierwszy projekt jest wyróżniony

        if (index === 0) {

            article.classList.add("featured");

        }


        article.innerHTML = `

            ${renderMedia(project)}


            <div class="project-top">

                <span class="project-number">

                    ${String(index + 1).padStart(2, "0")}

                </span>


                <span class="project-type">

                    ${escapeHtml(
                        project.type || ""
                    )}

                </span>

            </div>


            <div class="project-content">


                <h3>

                    ${escapeHtml(
                        project.title || ""
                    )}

                </h3>


                <p>

                    ${escapeHtml(
                        project.description || ""
                    )}

                </p>


                <div class="tags">

                    ${renderTechnologies(
                        project.technologies
                    )}

                </div>


                <button
                    class="project-more"
                    type="button"
                    data-slug="${escapeHtml(
                        project.slug || ""
                    )}"
                >

                    Zobacz projekt →

                </button>


            </div>

        `;


        projectsGrid.appendChild(article);

    });


    // =========================
    // PROJECT BUTTONS
    // =========================

    const buttons =
        document.querySelectorAll(
            ".project-more"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const slug =
                    button.dataset.slug;


                openProject(slug);

            }
        );

    });

}


// =========================
// RENDER MEDIA
// =========================

function renderMedia(project) {

    if (!project.media_url) {

        return "";

    }


    const mediaUrl =
        project.media_url.toLowerCase();


    const isVideo =
        mediaUrl.endsWith(".mp4") ||
        mediaUrl.endsWith(".webm") ||
        mediaUrl.endsWith(".ogg") ||
        mediaUrl.endsWith(".mov");


    if (isVideo) {

        return `

            <div class="project-image">

                <video
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                >

                    <source
                        src="${escapeHtml(
                            project.media_url
                        )}"
                    >

                    Twoja przeglądarka
                    nie obsługuje
                    odtwarzania wideo.

                </video>

            </div>

        `;

    }


    return `

        <div class="project-image">

            <img
                src="${escapeHtml(
                    project.media_url
                )}"
                alt="${escapeHtml(
                    project.title || ""
                )}"
                loading="lazy"
            >

        </div>

    `;

}


// =========================
// RENDER TECHNOLOGIES
// =========================

function renderTechnologies() {

    skillsMap.sectors.forEach(
        sector => {

            const count =
                sector.technologies.length;


            /*
                Technologie są rozłożone na dwóch
                naprzemiennych pierścieniach.

                0 → bliższy
                1 → dalszy
                2 → bliższy
                3 → dalszy
                itd.
            */

            const innerRadius = 225;
            const outerRadius = 285;


            /*
                Szerokość łuku sektora.

                Przy większej liczbie technologii
                zwiększamy trochę zakres kątowy.
            */

            const spread =
                Math.min(
                    62,
                    34 + count * 2
                );


            const startAngle =
                sector.angle - spread;


            const step =
                count > 1
                    ? (spread * 2) /
                      (count - 1)
                    : 0;


            sector.technologies.forEach(
                (
                    technology,
                    index
                ) => {

                    const angle =
                        startAngle +
                        step * index;


                    /*
                        Naprzemienny promień
                    */

                    const radius =
                        index % 2 === 0
                            ? innerRadius
                            : outerRadius;


                    const point =
                        polarToCartesian(
                            skillsMap.center.x,
                            skillsMap.center.y,
                            radius,
                            angle
                        );


                    /*
                        Punkt, od którego zaczyna się
                        połączenie.

                        Dla wewnętrznego pierścienia
                        zaczynamy bliżej sektora.

                        Dla zewnętrznego odpowiednio dalej.
                    */

                    const sectorPoint =
                        polarToCartesian(
                            skillsMap.center.x,
                            skillsMap.center.y,
                            165,
                            sector.midAngle
                        );


                    /*
                        SEKTOR → TECHNOLOGIA
                    */

                    const connection =
                        createSvgElement(
                            "line",
                            {
                                x1:
                                    connectionStart.x,

                                y1:
                                    connectionStart.y,

                                x2:
                                    point.x,

                                y2:
                                    point.y,

                                class:
                                    "skills-map-connection " +
                                    "skills-technology-connection",

                                "data-sector":
                                    sector.id,

                                "data-technology":
                                    technology
                            }
                        );


                    skillsMap.connections.appendChild(
                        connection
                    );


                    /*
                        TECHNOLOGY GROUP
                    */

                    const group =
                        createSvgElement(
                            "g",
                            {

                                class:
                                    "skills-map-technology",

                                "data-sector":
                                    sector.id,

                                "data-technology":
                                    technology
                            }
                        );


                    /*
                        PUNKT
                    */

                    const dot =
                        createSvgElement(
                            "circle",
                            {

                                cx:
                                    point.x,

                                cy:
                                    point.y,

                                r: 5,

                                class:
                                    "skills-technology-dot"
                            }
                        );


                    group.appendChild(dot);


                    /*
                        LABEL
                    */

                    const labelOffset =
    index % 2 === 0
        ? 13
        : 17;


const text =
    createSvgElement(
        "text",
        {
            x: point.x,

            y:
                point.y -
                labelOffset,

            class:
                "skills-technology-label",

            "text-anchor":
                "middle"
        }
    );


                    text.textContent =
                        technology;


                    group.appendChild(text);


                    /*
                        HIT AREA

                        Trochę większy obszar niż sama kropka,
                        żeby łatwiej było trafić kursorem.
                    */

                    const hitArea =
                        createSvgElement(
                            "circle",
                            {

                                cx:
                                    point.x,

                                cy:
                                    point.y,

                                r: 25,

                                class:
                                    "skills-technology-hit"
                            }
                        );


                    group.appendChild(
                        hitArea
                    );


                    /*
                        HOVER TECHNOLOGII
                    */

                    group.addEventListener(
                        "mouseenter",
                        () => {

                            activateTechnology(
                                technology,
                                sector.id,
                                point
                            );
                        }
                    );


                    group.addEventListener(
                        "mouseleave",
                        () => {

                            clearActiveMap();
                        }
                    );


                    skillsMap.technologies.appendChild(
                        group
                    );
                }
            );
        }
    );
}


// =========================
// OPEN PROJECT
// =========================

async function openProject(slug) {

    projectModal.hidden = false;


    document.body.classList.add(
        "modal-open"
    );


    // Zapamiętujemy szerokość scrollbar'a,
    // żeby strona nie "skakała"

    document.body.style.paddingRight =
        `${window.innerWidth -
            document.documentElement.clientWidth}px`;


    // =========================
    // LOADING STATE
    // =========================

    modalBody.innerHTML = `

        <div class="projects-state">

            Ładowanie projektu...

        </div>

    `;


    try {

        const response = await fetch(

            `/api/projects/${encodeURIComponent(
                slug
            )}`

        );


        if (!response.ok) {

            throw new Error(
                "Nie udało się pobrać projektu."
            );

        }


        const project =
            await response.json();


        renderProject(project);


    } catch (error) {

        console.error(
            "Błąd podczas pobierania projektu:",
            error
        );


        modalBody.innerHTML = `

            <div class="projects-state">

                Nie udało się
                pobrać projektu.

            </div>

        `;

    }

}


// =========================
// RENDER PROJECT DETAILS
// =========================

function renderProject(project) {


    // =========================
    // GITHUB
    // =========================

    let githubButton = "";


    if (project.github_url) {

        githubButton = `

            <a
                href="${escapeHtml(
                    project.github_url
                )}"
                class="button button-primary"
                target="_blank"
                rel="noopener noreferrer"
            >

                GitHub ↗

            </a>

        `;

    }


    // =========================
    // DEMO
    // =========================

    let demoButton = "";


    if (project.demo_url) {

        demoButton = `

            <a
                href="${escapeHtml(
                    project.demo_url
                )}"
                class="button button-secondary"
                target="_blank"
                rel="noopener noreferrer"
            >

                Demo ↗

            </a>

        `;

    }


    // =========================
    // MODAL HTML
    // =========================

    modalBody.innerHTML = `

        ${renderModalMedia(project)}


        <span class="project-type">

            ${escapeHtml(
                project.type || ""
            )}

        </span>


        <h2
            class="modal-title"
            id="modal-project-title"
        >

            ${escapeHtml(
                project.title || ""
            )}

        </h2>


        <p class="modal-description">

            ${escapeHtml(
                project.description || ""
            )}

        </p>


        <div class="modal-divider"></div>


        <div class="modal-layout">


            <!-- DESCRIPTION -->

            <div>


                <h3>
                    O projekcie
                </h3>


                <p class="modal-text">

                    ${escapeHtml(
                        project.full_description || ""
                    )}

                </p>


            </div>


            <!-- TECHNOLOGIES -->

            <aside>


                <h3>
                    Technologie
                </h3>


                <div class="tags">

                    ${renderTechnologies(
                        project.technologies
                    )}

                </div>


                <div class="modal-actions">

                    ${githubButton}

                    ${demoButton}

                </div>


            </aside>


        </div>

    `;

}


// =========================
// RENDER MODAL MEDIA
// =========================

function renderModalMedia(project) {

    if (!project.media_url) {

        return "";

    }


    const mediaUrl =
        project.media_url.toLowerCase();


    const isVideo =
        mediaUrl.endsWith(".mp4") ||
        mediaUrl.endsWith(".webm") ||
        mediaUrl.endsWith(".ogg") ||
        mediaUrl.endsWith(".mov");


    if (isVideo) {

        return `

            <div class="modal-project-image">

                <video
                    autoplay
                    muted
                    loop
                    playsinline
                >

                    <source
                        src="${escapeHtml(
                            project.media_url
                        )}"
                    >

                    Twoja przeglądarka
                    nie obsługuje
                    odtwarzania wideo.

                </video>

            </div>

        `;

    }


    return `

        <div class="modal-project-image">

            <img
                src="${escapeHtml(
                    project.media_url
                )}"
                alt="${escapeHtml(
                    project.title || ""
                )}"
            >

        </div>

    `;

}


// =========================
// CLOSE MODAL
// =========================

function closeProject() {

    projectModal.hidden = true;


    document.body.classList.remove(
        "modal-open"
    );


    document.body.style.paddingRight = "";


    // Zatrzymujemy ewentualny film
    // po zamknięciu modala.

    modalBody
        .querySelectorAll("video")
        .forEach(video => {

            video.pause();

        });

}


// =========================
// EVENT LISTENERS
// =========================

modalClose.addEventListener(
    "click",
    closeProject
);


modalOverlay.addEventListener(
    "click",
    closeProject
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !projectModal.hidden
        ) {

            closeProject();

        }

    }
);


const skillsMap = {
    svg: null,
    connections: null,
    sectorsElement: null,
    technologies: null,
    projects: null,
    details: null,

    projectsData: [],

    center: {
        x: 500,
        y: 380
    },

    sectors: [
        {
            id: "game",
            name: "GAME DEVELOPMENT",
            technologies: [
                "Unity",
                "C#",
                "Godot",
                "GDScript",
                "OOP",
                "ScriptableObjects",
                "Pathfinding"
            ]
        },
        {
            id: "data",
            name: "DATA & AI",
            technologies: [
                "Python",
                "Pandas",
                "Data Analysis",
                "Machine Learning",
                "scikit-learn",
                "Random Forest",
                "Gymnasium",
                "Reinforcement Learning",
                "DQN",
                "PPO",
                "YOLO",
                "Computer Vision"
            ]
        },
        {
            id: "web",
            name: "WEB DEVELOPMENT",
            technologies: [
                "JavaScript",
                "HTML",
                "CSS",
                "Node.js",
                "Express",
                "EJS",
                "SQL",
                "SQLite",
                "REST API"
            ]
        },
        {
            id: "mobile",
            name: "MOBILE",
            technologies: [
                "Java",
                "Android",
                "Android Studio",
                "TensorFlow Lite",
                "Audio Playback",
                "Playlist Management"
            ]
        }
    ]
};


/* =========================================================
   BASIC SVG HELPERS
   ========================================================= */

function polarToCartesian(
    cx,
    cy,
    radius,
    angle
) {
    const radians =
        (angle - 90) *
        Math.PI /
        180;

    return {
        x:
            cx +
            radius *
            Math.cos(radians),

        y:
            cy +
            radius *
            Math.sin(radians)
    };
}


function createSvgElement(
    tag,
    attributes = {}
) {
    const element =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            tag
        );

    Object.entries(attributes)
        .forEach(
            ([key, value]) => {
                element.setAttribute(
                    key,
                    value
                );
            }
        );

    return element;
}


/* =========================================================
   DETERMINISTIC RANDOM
   =========================================================
   
   Zamiast Math.random() używamy prostego generatora
   pseudolosowego. Dzięki temu mapa wygląda losowo,
   ale po odświeżeniu układ pozostaje taki sam.
   ========================================================= */

function seededRandom(seed) {
    let value = seed;

    return function () {
        value =
            (
                value *
                9301 +
                49297
            ) %
            233280;

        return value / 233280;
    };
}


/* =========================================================
   SECTOR GEOMETRY
   ========================================================= */

function calculateSectorGeometry() {

    const totalTechnologies =
        skillsMap.sectors.reduce(
            (sum, sector) =>
                sum +
                sector.technologies.length,
            0
        );

    /*
        Mała przerwa pomiędzy sektorami.

        Dzięki temu sektory nie zlewają się
        ze sobą wizualnie.
    */
    const sectorGap = 6;

    const totalGap =
        sectorGap *
        skillsMap.sectors.length;

    const availableAngle =
        360 -
        totalGap;

    /*
        Zaczynamy od góry.
    */
    let currentAngle = -90;

    skillsMap.sectors.forEach(
        sector => {

            const percentage =
                sector.technologies.length /
                totalTechnologies;

            const angleSize =
                availableAngle *
                percentage;

            sector.startAngle =
                currentAngle;

            sector.endAngle =
                currentAngle +
                angleSize;

            sector.midAngle =
                currentAngle +
                angleSize / 2;

            sector.percentage =
                percentage * 100;

            currentAngle =
                sector.endAngle +
                sectorGap;
        }
    );
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

async function initSkillsMap() {

    skillsMap.svg =
        document.getElementById(
            "skills-map-svg"
        );

    if (!skillsMap.svg) {
        return;
    }

    skillsMap.connections =
        document.getElementById(
            "skills-map-connections"
        );

    skillsMap.sectorsElement =
        document.getElementById(
            "skills-map-sectors"
        );

    skillsMap.technologies =
        document.getElementById(
            "skills-map-technologies"
        );

    skillsMap.projects =
        document.getElementById(
            "skills-map-projects"
        );

    skillsMap.details =
        document.getElementById(
            "skills-map-details"
        );

    await loadSkillsProjects();

    calculateSectorGeometry();

    renderSkillsMap();

    setupSkillsMapEvents();
}


/* =========================================================
   PROJECT DATA
   ========================================================= */

async function loadSkillsProjects() {

    try {

        const response =
            await fetch(
                "/api/projects"
            );

        if (!response.ok) {
            throw new Error(
                "Nie udało się pobrać projektów."
            );
        }

        skillsMap.projectsData =
            await response.json();

    } catch (error) {

        console.error(
            "Skills map:",
            error
        );

        skillsMap.projectsData = [];
    }
}


/* =========================================================
   FIND PROJECTS FOR TECHNOLOGY
   ========================================================= */

function getProjectsForTechnology(
    technology
) {

    const normalized =
        technology
            .trim()
            .toLowerCase();

    return skillsMap.projectsData
        .filter(
            project => {

                if (
                    !Array.isArray(
                        project.technologies
                    )
                ) {
                    return false;
                }

                return project.technologies.some(
                    tech =>
                        tech
                            .trim()
                            .toLowerCase() ===
                        normalized
                );
            }
        );
}


/* =========================================================
   RENDER MAP
   ========================================================= */

function renderSkillsMap() {

    skillsMap.connections.innerHTML =
        "";

    skillsMap.sectorsElement.innerHTML =
        "";

    skillsMap.technologies.innerHTML =
        "";

    skillsMap.projects.innerHTML =
        "";

    renderSectors();
    renderSectorConnections();
    renderTechnologies();
}


/* =========================================================
   CENTER → SECTOR CONNECTIONS
   ========================================================= */

function renderSectorConnections() {

    skillsMap.sectors.forEach(
        sector => {

            const point =
                sector.point ||
                polarToCartesian(
                    skillsMap.center.x,
                    skillsMap.center.y,
                    165,
                    sector.midAngle
                );


            const line =
                createSvgElement(
                    "line",
                    {
                        x1:
                            skillsMap.center.x,

                        y1:
                            skillsMap.center.y,

                        x2:
                            point.x,

                        y2:
                            point.y,

                        class:
                            "skills-map-connection " +
                            "skills-sector-connection",

                        "data-sector":
                            sector.id
                    }
                );


            skillsMap.connections
                .appendChild(line);
        }
    );
}


/* =========================================================
   RENDER SECTORS
   ========================================================= */

function renderSectors() {

    skillsMap.sectors.forEach(
        sector => {

            /*
                Pozycję sektora wyliczamy tylko raz
                i zapisujemy w obiekcie sektora.
            */
            const point =
                polarToCartesian(
                    skillsMap.center.x,
                    skillsMap.center.y,
                    165,
                    sector.midAngle
                );

            sector.point = point;


            const group =
                createSvgElement(
                    "g",
                    {
                        class:
                            "skills-map-sector",

                        "data-sector":
                            sector.id
                    }
                );


            /*
                Kółko kategorii
            */
            const dot =
                createSvgElement(
                    "circle",
                    {
                        cx:
                            point.x,

                        cy:
                            point.y,

                        r: 7,

                        class:
                            "skills-sector-dot"
                    }
                );

            group.appendChild(dot);


            /*
                Nazwa kategorii
            */
            const text =
                createSvgElement(
                    "text",
                    {
                        x:
                            point.x,

                        y:
                            point.y - 24,

                        class:
                            "skills-sector-label",

                        "text-anchor":
                            "middle"
                    }
                );

            text.textContent =
                sector.name;

            group.appendChild(text);


            /*
                Obszar hover
            */
            const hitArea =
                createSvgElement(
                    "circle",
                    {
                        cx:
                            point.x,

                        cy:
                            point.y,

                        r: 65,

                        class:
                            "skills-sector-hit"
                    }
                );

            group.appendChild(hitArea);


            group.addEventListener(
                "mouseenter",
                () => {
                    activateSector(
                        sector.id
                    );
                }
            );

            group.addEventListener(
                "mouseleave",
                () => {
                    clearActiveMap();
                }
            );


            skillsMap.sectorsElement
                .appendChild(group);
        }
    );
}


/* =========================================================
   TECHNOLOGY POSITION GENERATION
   ========================================================= */

function generateTechnologyPositions(
    sector
) {

    const positions = [];

    /*
        Większy obszar na technologie.

        Technologie mogą być rozmieszczane
        od 200 do 335 px od centrum.
    */
    const innerRadius = 205;
    const outerRadius = 335;

    /*
        Minimalny odstęp pomiędzy punktami.
    */
    const minDistance = 52;


    const sectorClearance = 95;

    /*
        Stabilny generator losowy.
    */
    const sectorSeeds = {
        game: 173,
        data: 421,
        web: 739,
        mobile: 913
    };

    const random =
        seededRandom(
            sectorSeeds[sector.id] || 123
        );


    for (
        let i = 0;
        i < sector.technologies.length;
        i++
    ) {

        let position = null;


        /*
            Więcej prób = większa szansa,
            że znajdziemy dobrze oddalone miejsce.
        */
        for (
            let attempt = 0;
            attempt < 500;
            attempt++
        ) {

            const angle =
                sector.startAngle +
                random() *
                (
                    sector.endAngle -
                    sector.startAngle
                );


            const radius =
                innerRadius +
                random() *
                (
                    outerRadius -
                    innerRadius
                );


            const point =
                polarToCartesian(
                    skillsMap.center.x,
                    skillsMap.center.y,
                    radius,
                    angle
                );


            /*
                Sprawdzamy odległość
                od wszystkich wcześniejszych punktów.
            */
            const distanceFromSector =
                Math.sqrt(
                    (point.x - sector.point.x) ** 2 +
                    (point.y - sector.point.y) ** 2
                );

            const farEnoughFromSector =
                distanceFromSector >= sectorClearance;

            const farEnoughFromTechnologies =
                positions.every(existing => {
                    const dx = point.x - existing.x;
                    const dy = point.y - existing.y;

                    const distance =
                        Math.sqrt(dx * dx + dy * dy);

                    return distance >= minDistance;
                });

            const valid =
                farEnoughFromSector &&
                farEnoughFromTechnologies;


            if (valid) {

                position =
                    point;

                break;
            }
        }


        /*
            Awaryjna pozycja, gdyby nie udało się
            znaleźć odpowiedniego miejsca.
        */
        if (!position) {

            const fallbackAngle =
                sector.startAngle +
                (
                    sector.endAngle -
                    sector.startAngle
                ) *
                (
                    i /
                    Math.max(
                        1,
                        sector.technologies.length
                    )
                );


            const fallbackRadius =
                innerRadius +
                (
                    outerRadius -
                    innerRadius
                ) *
                0.5;


            position =
                polarToCartesian(
                    skillsMap.center.x,
                    skillsMap.center.y,
                    fallbackRadius,
                    fallbackAngle
                );
        }


        positions.push(
            position
        );
    }


    return positions;
}


/* =========================================================
   RENDER TECHNOLOGIES
   ========================================================= */

function renderTechnologies() {

    skillsMap.sectors.forEach(
        sector => {

            const positions =
                generateTechnologyPositions(
                    sector
                );


            sector.technologies.forEach(
                (
                    technology,
                    index
                ) => {

                    const point =
                        positions[index];


                    /*
                        WAŻNE:

                        Linia zaczyna się dokładnie
                        w środku kółka kategorii.

                        Nie wyliczamy tego punktu ponownie.
                        Korzystamy z sector.point,
                        który został utworzony w renderSectors().
                    */
                    const connection =
                        createSvgElement(
                            "line",
                            {
                                x1:
                                    sector.point.x,

                                y1:
                                    sector.point.y,

                                x2:
                                    point.x,

                                y2:
                                    point.y,

                                class:
                                    "skills-map-connection " +
                                    "skills-technology-connection",

                                "data-sector":
                                    sector.id,

                                "data-technology":
                                    technology
                            }
                        );


                    skillsMap.connections
                        .appendChild(
                            connection
                        );


                    /*
                        Grupa technologii
                    */
                    const group =
                        createSvgElement(
                            "g",
                            {
                                class:
                                    "skills-map-technology",

                                "data-sector":
                                    sector.id,

                                "data-technology":
                                    technology
                            }
                        );


                    /*
                        Punkt technologii
                    */
                    const dot =
                        createSvgElement(
                            "circle",
                            {
                                cx:
                                    point.x,

                                cy:
                                    point.y,

                                r: 5,

                                class:
                                    "skills-technology-dot"
                            }
                        );

                    group.appendChild(dot);


                    /*
                        Nazwa technologii
                    */
                    const text =
                        createSvgElement(
                            "text",
                            {
                                x:
                                    point.x,

                                y:
                                    point.y - 13,

                                class:
                                    "skills-technology-label",

                                "text-anchor":
                                    "middle"
                            }
                        );

                    text.textContent =
                        technology;

                    group.appendChild(text);


                    /*
                        Obszar hover
                    */
                    const hitArea =
                        createSvgElement(
                            "circle",
                            {
                                cx:
                                    point.x,

                                cy:
                                    point.y,

                                r: 25,

                                class:
                                    "skills-technology-hit"
                            }
                        );

                    group.appendChild(
                        hitArea
                    );


                    group.addEventListener(
                        "mouseenter",
                        () => {

                            activateTechnology(
                                technology,
                                sector.id,
                                point
                            );
                        }
                    );


                    skillsMap.technologies
                        .appendChild(
                            group
                        );
                }
            );
        }
    );
}


// =========================================================
// SECTOR HOVER
// =========================================================

function activateSector(sectorId) {

    clearActiveMap(false);


    skillsMap.svg.classList.add(
        "sector-active"
    );


    // =====================================================
    // SECTORS
    // =====================================================

    document
        .querySelectorAll(
            ".skills-map-sector"
        )
        .forEach(
            sector => {

                const active =
                    sector.dataset.sector ===
                    sectorId;


                sector.classList.toggle(
                    "active",
                    active
                );


                sector.classList.toggle(
                    "dimmed",
                    !active
                );
            }
        );


    // =====================================================
    // TECHNOLOGIES
    // =====================================================

    document
        .querySelectorAll(
            ".skills-map-technology"
        )
        .forEach(
            technology => {

                const sameSector =
                    technology.dataset.sector ===
                    sectorId;


                /*
                    Technologie aktywnego sektora
                    pozostają normalnie widoczne.

                    Technologie pozostałych sektorów
                    zostają lekko wygaszone.
                */

                technology.classList.toggle(
                    "sector-active",
                    sameSector
                );


                technology.classList.toggle(
                    "dimmed",
                    !sameSector
                );
            }
        );


    // =====================================================
    // CONNECTIONS
    // =====================================================

    document
        .querySelectorAll(
            ".skills-map-connection"
        )
        .forEach(
            connection => {

                const sameSector =
                    connection.dataset.sector ===
                    sectorId;


                connection.classList.toggle(
                    "sector-active",
                    sameSector
                );


                connection.classList.toggle(
                    "dimmed",
                    !sameSector
                );
            }
        );


    // =====================================================
    // PROJECTS
    // =====================================================

    skillsMap.projects.innerHTML =
        "";


    // =====================================================
    // DETAILS
    // =====================================================

    skillsMap.details.innerHTML = `
        <div class="skills-details-placeholder">

            <span class="skills-details-line"></span>

            <span>
                Najedź na technologię
            </span>

        </div>
    `;
}


/* =========================================================
   TECHNOLOGY HOVER
   ========================================================= */

function activateTechnology(
    technology,
    sectorId,
    point
) {

    clearActiveMap(false);


    skillsMap.svg.classList.add(
        "technology-active"
    );


    /*
        Sektory
    */
    document
        .querySelectorAll(
            ".skills-map-sector"
        )
        .forEach(
            sector => {

                const active =
                    sector.dataset.sector ===
                    sectorId;

                sector.classList.toggle(
                    "active",
                    active
                );

                sector.classList.toggle(
                    "dimmed",
                    !active
                );
            }
        );


    /*
        Technologie
    */
    document
        .querySelectorAll(
            ".skills-map-technology"
        )
        .forEach(
            node => {

                const active =
                    node.dataset.technology ===
                    technology;

                const sameSector =
                    node.dataset.sector ===
                    sectorId;


                node.classList.toggle(
                    "active",
                    active
                );

                node.classList.toggle(
                    "sector-active",
                    sameSector
                );

                node.classList.toggle(
                    "dimmed",
                    !active &&
                    !sameSector
                );
            }
        );


    /*
        Połączenia technologii
    */
    document
        .querySelectorAll(
            ".skills-map-connection"
        )
        .forEach(
            connection => {

                const activeTechnology =
                    connection.dataset.technology ===
                    technology;

                const sameSector =
                    connection.dataset.sector ===
                    sectorId;


                connection.classList.toggle(
                    "active",
                    activeTechnology
                );

                connection.classList.toggle(
                    "sector-active",
                    sameSector
                );

                connection.classList.toggle(
                    "dimmed",
                    !activeTechnology &&
                    !sameSector
                );
            }
        );


    /*
        Połączenie centrum → sektor
    */
    document
        .querySelectorAll(
            ".skills-sector-connection"
        )
        .forEach(
            connection => {

                const active =
                    connection.dataset.sector ===
                    sectorId;

                connection.classList.toggle(
                    "active",
                    active
                );

                connection.classList.toggle(
                    "dimmed",
                    !active
                );
            }
        );


    renderTechnologyProjects(
        technology,
        point
    );


    showTechnologyDetails(
        technology,
        sectorId
    );
}


/* =========================================================
   PROJECTS CONNECTED TO TECHNOLOGY
   ========================================================= */

function generateProjectPositions(technologyPoint, projects) {
    const positions = [];

    const minTechnologyDistance = 45;
    const maxTechnologyDistance = 100;
    const minProjectDistance = 65;

    const dx =
        technologyPoint.x - skillsMap.center.x;

    const dy =
        technologyPoint.y - skillsMap.center.y;

    /*
      Kierunek od środka mapy przez technologię.
    */
    const baseAngle = Math.atan2(dy, dx);

    const random = seededRandom(
        Math.round(
            technologyPoint.x * 13 +
            technologyPoint.y * 7
        )
    );

    projects.forEach(() => {
        let position = null;

        for (let attempt = 0; attempt < 500; attempt++) {

            /*
              Projekty pozostają w kierunku,
              z którego przyszła technologia.
              
              ±35° daje trochę naturalnego rozrzutu,
              ale nie pozwala projektom uciekać na boki.
            */
            const angle =
                baseAngle +
                (random() - 0.5) *
                (70 * Math.PI / 180);

            const radius =
                minTechnologyDistance +
                random() *
                (
                    maxTechnologyDistance -
                    minTechnologyDistance
                );

            const point = {
                x:
                    technologyPoint.x +
                    Math.cos(angle) * radius,

                y:
                    technologyPoint.y +
                    Math.sin(angle) * radius
            };

            /*
              Projekt musi znajdować się w SVG.
            */
            const insideCanvas =
                point.x >= 50 &&
                point.x <= 950 &&
                point.y >= 50 &&
                point.y <= 710;

            if (!insideCanvas) {
                continue;
            }

            /*
              Minimalna odległość od technologii.
            */
            const technologyDx =
                point.x - technologyPoint.x;

            const technologyDy =
                point.y - technologyPoint.y;

            const distanceFromTechnology =
                Math.sqrt(
                    technologyDx * technologyDx +
                    technologyDy * technologyDy
                );

            if (
                distanceFromTechnology <
                minTechnologyDistance
            ) {
                continue;
            }

            /*
              Minimalna odległość od innych projektów.
            */
            const farEnoughFromProjects =
                positions.every(existing => {
                    const projectDx =
                        point.x - existing.x;

                    const projectDy =
                        point.y - existing.y;

                    const distance =
                        Math.sqrt(
                            projectDx * projectDx +
                            projectDy * projectDy
                        );

                    return (
                        distance >=
                        minProjectDistance
                    );
                });

            if (!farEnoughFromProjects) {
                continue;
            }

            position = point;
            break;
        }

        /*
          Awaryjna pozycja dokładnie w głównym kierunku.
        */
        if (!position) {
            position = {
                x:
                    technologyPoint.x +
                    Math.cos(baseAngle) *
                    minTechnologyDistance,

                y:
                    technologyPoint.y +
                    Math.sin(baseAngle) *
                    minTechnologyDistance
            };
        }

        positions.push(position);
    });

    return positions;
}

function renderTechnologyProjects(
    technology,
    technologyPoint
) {

    skillsMap.projects.innerHTML =
        "";


    const projects =
        getProjectsForTechnology(
            technology
        );


    if (!projects.length) {
        return;
    }


    /*
        Kierunek od centrum
        do technologii.
    */
    const projectPositions =
        generateProjectPositions(
            technologyPoint,
            projects
        );

    projects.forEach((project, index) => {
        const projectPoint =
            projectPositions[index];

        // reszta bez zmian...


            /*
                Linia technologia → projekt
            */
            const connection =
                createSvgElement(
                    "line",
                    {
                        x1:
                            technologyPoint.x,

                        y1:
                            technologyPoint.y,

                        x2:
                            projectPoint.x,

                        y2:
                            projectPoint.y,

                        class:
                            "skills-map-connection " +
                            "skills-project-connection " +
                            "active"
                    }
                );


            skillsMap.connections
                .appendChild(
                    connection
                );


            /*
                Projekt
            */
            const group =
                createSvgElement(
                    "g",
                    {
                        class:
                            "skills-map-project active"
                    }
                );


            const dot =
                createSvgElement(
                    "circle",
                    {
                        cx:
                            projectPoint.x,

                        cy:
                            projectPoint.y,

                        r: 4,

                        class:
                            "skills-project-dot"
                    }
                );


            group.appendChild(
                dot
            );


            const text =
                createSvgElement(
                    "text",
                    {
                        x:
                            projectPoint.x,

                        y:
                            projectPoint.y - 12,

                        class:
                            "skills-project-label",

                        "text-anchor":
                            "middle"
                    }
                );


            text.textContent =
                project.title;


            group.appendChild(
                text
            );


            skillsMap.projects
                .appendChild(
                    group
                );
        }
    );
}


/* =========================================================
   TECHNOLOGY DETAILS
   ========================================================= */

function showTechnologyDetails(
    technology,
    sectorId
) {

    const projects =
        getProjectsForTechnology(
            technology
        );


    const sector =
        skillsMap.sectors.find(
            item =>
                item.id ===
                sectorId
        );


    let projectText;


    if (
        projects.length ===
        0
    ) {

        projectText =
            "Brak powiązanych projektów";

    } else if (
        projects.length ===
        1
    ) {

        projectText =
            "1 powiązany projekt";

    } else {

        projectText =
            `${projects.length} powiązane projekty`;
    }


    skillsMap.details.innerHTML = `
        <div class="skills-details-content">

            <span class="skills-details-category">
                ${escapeHtml(
                    sector?.name || ""
                )}
            </span>

            <strong class="skills-details-title">
                ${escapeHtml(
                    technology
                )}
            </strong>

            <span class="skills-details-projects">
                ${projectText}
            </span>

        </div>
    `;
}


/* =========================================================
   CLEAR ACTIVE STATE
   ========================================================= */

function clearActiveMap(
    clearProjects = true
) {

    skillsMap.svg.classList.remove(
        "technology-active",
        "sector-active"
    );


    document
        .querySelectorAll(
            ".skills-map-sector, " +
            ".skills-map-technology, " +
            ".skills-map-connection"
        )
        .forEach(
            element => {

                element.classList.remove(
                    "active",
                    "sector-active",
                    "dimmed"
                );
            }
        );


    if (clearProjects) {

        /*
            Usuwamy projekty pokazane
            po najechaniu na technologię.
        */
        skillsMap.projects.innerHTML =
            "";


        /*
            Usuwamy również dynamiczne
            linie łączące technologię
            z projektami.

            Nie możemy wyczyścić całego
            skillsMap.connections, ponieważ
            znajdują się tam również stałe
            połączenia centrum → sektor
            oraz sektor → technologia.
        */
        skillsMap.connections
            .querySelectorAll(
                ".skills-project-connection"
            )
            .forEach(
                connection => {
                    connection.remove();
                }
            );
    }


    skillsMap.details.innerHTML = `
        <div class="skills-details-placeholder">

            <span class="skills-details-line"></span>

            <span>
                Najedź na technologię
            </span>

        </div>
    `;
}


/* =========================================================
   HTML ESCAPING
   ========================================================= */

function escapeHtml(
    value
) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}


/* =========================================================
   MAP EVENTS
   ========================================================= */

function setupSkillsMapEvents() {

    skillsMap.svg.addEventListener(
        "mouseleave",
        () => {
            clearActiveMap();
        }
    );
}


/* =========================================================
   START
   ========================================================= */

initSkillsMap();

// =========================
// START
// =========================

loadProjects();