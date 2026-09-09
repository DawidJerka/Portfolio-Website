// =========================
// ELEMENTS
// =========================

const projectsGrid = document.getElementById("projects-grid");
const projectsLoading = document.getElementById("projects-loading");
const projectsError = document.getElementById("projects-error");
const projectFilters = document.getElementById("project-filters");

const projectModal = document.getElementById("project-modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalBody = document.getElementById("modal-body");


// =========================
// PROJECT FILTER CONFIG
// =========================

let allProjects = [];
let activeProjectFilter = "all";

const featuredProjectByFilter = {
    all: "survivors3d",
    game: "survivors3d",
    data: "car-price-prediction",
    web: "portfolio",
    mobile: "car-brand-classification"
};

// =========================
// FIT PROJECT CARD TECHNOLOGIES
// ========================

function fitProjectCardTechnologies() {

    const containers =
        document.querySelectorAll(
            ".project-card-tags"
        );

    containers.forEach(container => {

        // Usuń poprzedni licznik +N
        container
            .querySelectorAll(".tag-more")
            .forEach(element => element.remove());

        const tags = [
            ...container.querySelectorAll(".tag")
        ];

        // Najpierw pokaż wszystkie
        tags.forEach(tag => {
            tag.style.display = "";
        });

        if (
            container.scrollWidth <=
            container.clientWidth
        ) {
            return;
        }

        const moreTag =
            document.createElement("span");

        moreTag.className =
            "tag tag-more";

        container.appendChild(moreTag);

        let hiddenCount = 0;

        // Chowamy od końca, czyli
        // najmniej ważne technologie
        for (
            let i = tags.length - 1;
            i >= 0;
            i--
        ) {

            tags[i].style.display = "none";

            hiddenCount++;

            moreTag.textContent =
                `+${hiddenCount}`;

            if (
                container.scrollWidth <=
                container.clientWidth
            ) {
                break;
            }
        }
    });
}


// =========================
// LOAD PROJECTS
// =========================

async function loadProjects() {

    try {

        const response = await fetch("/api/projects");

        if (!response.ok) {
            throw new Error("Nie udało się pobrać projektów.");
        }

        allProjects = await response.json();

        projectsLoading.hidden = true;

        if (projectFilters) {
            projectFilters.hidden = false;
        }

        renderProjectsForFilter(activeProjectFilter);

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
// PROJECT FILTERING
// =========================

function projectMatchesFilter(project, filter) {

    if (filter === "all") {
        return true;
    }

    const type = String(project.type || "")
        .trim()
        .toLowerCase();

    const technologies = Array.isArray(project.technologies)
        ? project.technologies
            .join(" ")
            .toLowerCase()
        : "";

    const searchable = `${type} ${technologies}`;

    if (filter === "game") {
        return (
            type.includes("game development") ||
            searchable.includes("unity") ||
            searchable.includes("godot")
        );
    }

    if (filter === "data") {
        return (
            type.includes("data science") ||
            type.includes("machine learning") ||
            type.includes("reinforcement learning") ||
            searchable.includes("data analysis") ||
            searchable.includes("pandas") ||
            searchable.includes("scikit-learn") ||
            searchable.includes("computer vision") ||
            searchable.includes("yolo")
        );
    }

    if (filter === "web") {
        return (
            type.includes("web development") ||
            searchable.includes("node.js") ||
            searchable.includes("express") ||
            searchable.includes("ejs") ||
            searchable.includes("rest api")
        );
    }

    if (filter === "mobile") {
        return (
            type.includes("android") ||
            type.includes("mobile") ||
            searchable.includes("android studio")
        );
    }

    return false;
}


function renderProjectsForFilter(filter) {

    const filteredProjects = allProjects.filter(
        project => projectMatchesFilter(project, filter)
    );

    const preferredFeaturedSlug =
        featuredProjectByFilter[filter];

    const featuredProject =
        filteredProjects.find(
            project =>
                project.slug === preferredFeaturedSlug
        ) || filteredProjects[0];

    const orderedProjects = featuredProject
        ? [
            featuredProject,
            ...filteredProjects.filter(
                project =>
                    project.slug !== featuredProject.slug
            )
        ]
        : [];

    renderProjects(
        orderedProjects,
        featuredProject?.slug || null
    );
}


function setProjectFilter(filter) {

    if (!Object.prototype.hasOwnProperty.call(
        featuredProjectByFilter,
        filter
    )) {
        return;
    }

    activeProjectFilter = filter;

    if (projectFilters) {
        projectFilters
            .querySelectorAll(".project-filter")
            .forEach(button => {

                const isActive =
                    button.dataset.filter === filter;

                button.classList.toggle(
                    "active",
                    isActive
                );

                button.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });
    }

    renderProjectsForFilter(filter);
}


function setupProjectFilters() {

    if (!projectFilters) {
        return;
    }

    projectFilters.addEventListener(
        "click",
        event => {

            const button = event.target.closest(
                ".project-filter"
            );

            if (!button) {
                return;
            }

            setProjectFilter(
                button.dataset.filter
            );
        }
    );
}


// =========================
// RENDER PROJECTS
// =========================

function renderProjects(projects, featuredSlug = null) {

    projectsGrid.innerHTML = "";

    if (projects.length === 0) {

        projectsGrid.innerHTML = `
            <div class="projects-state projects-state-grid">
                Brak projektów w tej kategorii.
            </div>
        `;

        return;
    }

    projects.forEach((project, index) => {

        const article =
            document.createElement("article");

        article.className = "project-card";

        if (project.slug === featuredSlug) {
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

                <div class="tags project-card-tags">
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
        projectsGrid.querySelectorAll(
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

    requestAnimationFrame(() => {
        fitProjectCardTechnologies();
    });
}


// =========================
// RENDER PROJECT TECHNOLOGY TAGS
// =========================

function renderTechnologies(technologies) {

    if (!Array.isArray(technologies)) {
        return "";
    }

    return technologies
        .map(technology => `
            <span class="tag">
                ${escapeHtml(technology)}
            </span>
        `)
        .join("");
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


// =========================================================
// SKILLS MAP
// =========================================================

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


// =========================================================
// BASIC SVG HELPERS
// =========================================================

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


// =========================================================
// DETERMINISTIC RANDOM
// =========================================================

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


// =========================================================
// SECTOR GEOMETRY
// =========================================================

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


// =========================================================
// INITIALIZATION
// =========================================================

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


// =========================================================
// PROJECT DATA
// =========================================================

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


// =========================================================
// FIND PROJECTS FOR TECHNOLOGY
// =========================================================

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


// =========================================================
// RENDER MAP
// =========================================================

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

    /*
        UWAGA:

        To jest renderowanie technologii
        na mapie, dlatego używamy
        renderMapTechnologies(), a nie
        renderTechnologies(), które służy
        do tagów projektów.
    */

    renderMapTechnologies();
}


// =========================================================
// CENTER → SECTOR CONNECTIONS
// =========================================================

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


// =========================================================
// RENDER SECTORS
// =========================================================

function renderSectors() {

    skillsMap.sectors.forEach(
        sector => {

            /*
                Pozycję sektora wyliczamy tylko raz.
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


// =========================================================
// TECHNOLOGY POSITION GENERATION
// =========================================================

function generateTechnologyPositions(
    sector
) {

    const positions = [];


    /*
        Technologie mogą być rozmieszczane
        od 205 do 335 px od centrum.
    */

    const innerRadius = 205;
    const outerRadius = 335;


    /*
        Minimalny odstęp pomiędzy technologiami.
    */

    const minDistance = 52;


    /*
        Minimalna odległość od nazwy sektora.
    */

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
            Szukamy odpowiedniej pozycji.
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
                Odległość od punktu sektora.
            */

            const distanceFromSector =
                Math.sqrt(
                    (point.x - sector.point.x) ** 2 +
                    (point.y - sector.point.y) ** 2
                );


            const farEnoughFromSector =
                distanceFromSector >=
                sectorClearance;


            /*
                Odległość od innych technologii.
            */

            const farEnoughFromTechnologies =
                positions.every(existing => {

                    const dx =
                        point.x -
                        existing.x;

                    const dy =
                        point.y -
                        existing.y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );

                    return (
                        distance >=
                        minDistance
                    );
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
            Awaryjna pozycja.
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


// =========================================================
// RENDER TECHNOLOGIES ON MAP
// =========================================================

function renderMapTechnologies() {

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
                        Linia zaczyna się dokładnie
                        w środku kółka kategorii.
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


                    group.appendChild(
                        dot
                    );


                    /*
                        Nazwa technologii
                    */

                    const labelOffset =
                        index % 2 === 0
                            ? 13
                            : 17;


                    const text =
                        createSvgElement(
                            "text",
                            {

                                x:
                                    point.x,

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


                    group.appendChild(
                        text
                    );


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

function activateSector(
    sectorId
) {

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


// =========================================================
// TECHNOLOGY HOVER
// =========================================================

function activateTechnology(
    technology,
    sectorId,
    point
) {

    clearActiveMap(false);


    skillsMap.svg.classList.add(
        "technology-active"
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


    // =====================================================
    // TECHNOLOGY CONNECTIONS
    // =====================================================

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


    // =====================================================
    // CENTER → SECTOR
    // =====================================================

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


    // =====================================================
    // PROJECTS
    // =====================================================

    renderTechnologyProjects(
        technology,
        point
    );


    // =====================================================
    // DETAILS
    // =====================================================

    showTechnologyDetails(
        technology,
        sectorId
    );
}


// =========================================================
// PROJECT POSITIONS
// =========================================================

function generateProjectPositions(
    technologyPoint,
    projects
) {

    const positions = [];


    const minTechnologyDistance = 45;

    const maxTechnologyDistance = 100;

    const minProjectDistance = 65;


    const dx =
        technologyPoint.x -
        skillsMap.center.x;


    const dy =
        technologyPoint.y -
        skillsMap.center.y;


    /*
        Kierunek od środka
        przez technologię.
    */

    const baseAngle =
        Math.atan2(
            dy,
            dx
        );


    const random =
        seededRandom(
            Math.round(
                technologyPoint.x * 13 +
                technologyPoint.y * 7
            )
        );


    projects.forEach(() => {

        let position = null;


        for (
            let attempt = 0;
            attempt < 500;
            attempt++
        ) {

            /*
                Projekty pozostają w kierunku,
                z którego przyszła technologia.

                ±35°.
            */

            const angle =
                baseAngle +
                (
                    random() -
                    0.5
                ) *
                (
                    70 *
                    Math.PI /
                    180
                );


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
                    Math.cos(angle) *
                    radius,

                y:
                    technologyPoint.y +
                    Math.sin(angle) *
                    radius
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
                point.x -
                technologyPoint.x;


            const technologyDy =
                point.y -
                technologyPoint.y;


            const distanceFromTechnology =
                Math.sqrt(
                    technologyDx *
                    technologyDx +
                    technologyDy *
                    technologyDy
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
                positions.every(
                    existing => {

                        const projectDx =
                            point.x -
                            existing.x;


                        const projectDy =
                            point.y -
                            existing.y;


                        const distance =
                            Math.sqrt(
                                projectDx *
                                projectDx +
                                projectDy *
                                projectDy
                            );


                        return (
                            distance >=
                            minProjectDistance
                        );
                    }
                );


            if (!farEnoughFromProjects) {
                continue;
            }


            position =
                point;

            break;
        }


        /*
            Awaryjna pozycja.
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


        positions.push(
            position
        );
    });


    return positions;
}


// =========================================================
// RENDER TECHNOLOGY PROJECTS
// =========================================================

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


    const projectPositions =
        generateProjectPositions(
            technologyPoint,
            projects
        );


    projects.forEach(
        (
            project,
            index
        ) => {

            const projectPoint =
                projectPositions[index];


            // =====================================================
            // TECHNOLOGY → PROJECT CONNECTION
            // =====================================================

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


            // =====================================================
            // PROJECT
            // =====================================================

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


// =========================================================
// TECHNOLOGY DETAILS
// =========================================================

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


// =========================================================
// CLEAR ACTIVE STATE
// =========================================================

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
            Usuwamy dynamiczne linie
            technologia → projekt.

            Nie czyścimy całego connections.
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


// =========================================================
// HTML ESCAPING
// =========================================================

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


// =========================================================
// MAP EVENTS
// =========================================================

function setupSkillsMapEvents() {

    skillsMap.svg.addEventListener(
        "mouseleave",
        () => {

            clearActiveMap();
        }
    );
}


// =========================================================
// START SKILLS MAP
// =========================================================

initSkillsMap();


// =========================================================
// START PROJECTS
// =========================================================

setupProjectFilters();
loadProjects();

/* =========================
   CODE CARD — TYPEWRITING
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const codeContent = document.querySelector(".code-content");

    if (!codeContent) return;

    // Usuń ręcznie wpisany kursor z HTML
    const oldCursor = codeContent.querySelector(".code-cursor");
    if (oldCursor) {
        oldCursor.remove();
    }

    // Pobierz wszystkie linie kodu
    const lines = [...codeContent.querySelectorAll("p")];

    // Przygotuj kursor
    const cursor = document.createElement("span");
    cursor.className = "typewriter-cursor";
    cursor.textContent = "_";

    // Przygotowanie jednej linii:
    // - usuwa przypadkowe białe znaki z wnętrza spanów
    // - zachowuje potrzebne spacje między elementami
    // - usuwa spacje przed przecinkami, średnikami itd.
    function prepareLine(line) {
        const temp = document.createElement("div");
        temp.innerHTML = line.innerHTML;

        // Czyścimy zawartość kolorowanych spanów
        temp.querySelectorAll(".code-purple, .code-green").forEach((element) => {
            element.textContent = element.textContent
                .replace(/\s+/g, " ")
                .trim();
        });

        // Normalizacja whitespace'u
        let html = temp.innerHTML
            .replace(/\s+/g, " ")
            .replace(/\s+([,;:}\]])/g, "$1")
            .replace(/([([{])\s+/g, "$1")
            .trim();

        temp.innerHTML = html;

        return [...temp.childNodes].map((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return {
                    type: "text",
                    text: node.textContent
                };
            }

            return {
                type: "element",
                element: node.cloneNode(true)
            };
        });
    }

    // Zapamiętaj zawartość wszystkich linii
    const preparedLines = lines.map((line) => prepareLine(line));

    // Wyczyść wszystkie linie
    lines.forEach((line) => {
        line.innerHTML = "";
    });

    // Funkcja opóźnienia
    const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    // Dodawanie pojedynczego znaku
    async function typeTextNode(line, text) {
        const textNode = document.createTextNode("");
        line.appendChild(textNode);

        for (const char of text) {
            textNode.textContent += char;

            // Kursor zawsze na końcu aktualnie wpisywanego tekstu
            line.appendChild(cursor);

            // Spacje pojawiają się praktycznie bez pauzy
            if (char === " ") {
                await sleep(3);
            } else {
                await sleep(18);
            }
        }
    }

    // Wpisywanie elementu, np. kolorowanego spana
    async function typeElement(line, element) {
        const newElement = element.cloneNode(false);
        newElement.textContent = "";

        line.appendChild(newElement);

        const text = element.textContent;

        for (const char of text) {
            newElement.textContent += char;

            // Kursor za aktualnie wpisywanym spanem
            line.appendChild(cursor);

            if (char === " ") {
                await sleep(3);
            } else {
                await sleep(18);
            }
        }
    }

    // Główna animacja
    async function typeCode() {
        // Kursor na początku pierwszej linii
        lines[0].appendChild(cursor);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Przenieś kursor na aktualną linię
            line.appendChild(cursor);

            for (const node of preparedLines[i]) {
                if (node.type === "text") {
                    await typeTextNode(line, node.text);
                } else {
                    await typeElement(line, node.element);
                }
            }

            // Mała pauza przed następną linią
            if (i < lines.length - 1) {
                await sleep(80);
            }
        }

        // Kursor zostaje na końcu ostatniej linii
        lines[lines.length - 1].appendChild(cursor);
    }

    typeCode();
});

let technologyResizeFrame;

window.addEventListener("resize", () => {

    cancelAnimationFrame(
        technologyResizeFrame
    );

    technologyResizeFrame =
        requestAnimationFrame(() => {
            fitProjectCardTechnologies();
        });
});