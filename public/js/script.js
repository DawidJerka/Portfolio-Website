// =========================================================
// LANGUAGE / I18N
// =========================================================

const translations = {
    pl: {
        "meta.title": "Dawid Jerka — Portfolio",
        "meta.description": "Portfolio Dawida Jerki — game development, programowanie, analiza danych i projekty informatyczne.",

        "language.label": "Wybór języka",

        "nav.about": "O mnie",
        "nav.projects": "Projekty",
        "nav.skills": "Umiejętności",
        "nav.experience": "Doświadczenie",
        "nav.contact": "Kontakt",

        "hero.eyebrow": "Absolwent informatyki stosowanej",
        "hero.title": `Cześć,<br>jestem <span>Dawid.</span>`,
        "hero.subtitle": "Tworzę gry, programuję i rozwijam własne projekty.",
        "hero.description": "Jestem absolwentem informatyki stosowanej ze specjalizacją Data Science. Interesuję się przede wszystkim tworzeniem gier, programowaniem oraz wykorzystaniem technologii do rozwiązywania ciekawych problemów.",
        "hero.projects": "Zobacz projekty",
        "hero.about": "Poznaj mnie",

        "about.title": "O mnie",
        "about.heading": `Łączę <span class="accent-text">techniczne</span> i <span class="accent-text">kreatywne</span> podejście.`,
        "about.p1": "Ukończyłem Politechnikę Bydgoską na kierunku informatyka stosowana, ze specjalizacją Data Science. To właśnie na studiach i przy własnych projektach rozwijałem swoje umiejętności programistyczne.",
        "about.p2": "Najbardziej interesuje mnie programowanie i game development. Lubię wymyślać, budować i sprawdzać, jak z pomysłu zrobić coś, co faktycznie działa.",
        "about.p3": "Przez wiele lat pracowałem też w branży kreatywnej jako instruktor tańca. Dzięki temu nauczyłem się patrzeć na problemy nieszablonowo i szukać różnych sposobów na ich rozwiązanie.",

        "education.title": "Edukacja",
        "education.studies": "Studia",
        "education.degree": "Informatyka stosowana — specjalizacja Data Science",
        "education.thesisLabel": "Temat pracy dyplomowej:",
        "education.thesis": "„Projekt i implementacja gry z gatunku Grand Strategy na silniku Godot”",
        "education.activity": "Działalność studencka",
        "education.club": "Studenckie Koło Naukowe Twórców Gier",
        "education.clubDescription": "Udział w działalności koła związanej z tworzeniem gier i rozwijaniem umiejętności programistycznych.",

        "projects.title": "Projekty",
        "projects.intro": "Najważniejszą częścią mojego portfolio są projekty — od gier i sztucznej inteligencji po analizę danych i aplikacje.",
        "projects.loading": "Ładowanie projektów...",
        "projects.error": "Nie udało się pobrać projektów.",
        "projects.empty": "Brak projektów w tej kategorii.",
        "projects.more": "Zobacz projekt →",
        "projects.loadingOne": "Ładowanie projektu...",
        "projects.errorOne": "Nie udało się pobrać projektu.",
        "projects.about": "O projekcie",
        "projects.technologies": "Technologie",
        "projects.filtersLabel": "Filtruj projekty",
        "projects.filters.all": "WSZYSTKIE",
        "projects.filters.game": "GAME DEV",
        "projects.filters.data": "DATA & AI",
        "projects.filters.web": "WEB",
        "projects.filters.mobile": "MOBILE",

        "skills.title": "Umiejętności",
        "skills.hint": "Najedź na technologię, aby zobaczyć powiązane projekty",
        "skills.hover": "Najedź na technologię",
        "skills.noProjects": "Brak powiązanych projektów",
        "skills.oneProject": "1 powiązany projekt",
        "skills.manyProjects": count =>
            `${count} powiązane projekty`,

        "experience.title": "Doświadczenie zawodowe",
        "experience.present2025": "2025 — obecnie",
        "experience.selfEmployed": "Działalność własna",
        "experience.danceInstructor": "Instruktor tańca",
        "experience.selfP1": "Prowadzę indywidualne i grupowe zajęcia taneczne oraz przygotowuję uczestników do występów i turniejów.",
        "experience.selfP2": "Samodzielnie zajmuję się organizacją grafiku, komunikacją z klientami oraz rozwojem działalności.",
        "experience.present2021": "2021 — obecnie",
        "experience.education": "Edukacja",
        "experience.mathTutor": "Korepetytor matematyki",
        "experience.mathDescription": "Prowadzę zajęcia indywidualne i grupowe, diagnozuję trudności uczniów oraz dostosowuję metody pracy do ich potrzeb.",
        "experience.danceSchool": "Szkoła Tańca TEMPO",
        "experience.tempoDescription": "Prowadziłem zajęcia indywidualne i grupowe oraz przygotowywałem tancerzy do występów i zawodów.",
        "experience.customerAdvisor": "Doradca klienta / pracownik magazynu",
        "experience.bluDescription": "Doradzałem klientom przy wyborze produktów oraz wspierałem bieżące funkcjonowanie magazynu.",

        "languages.title": "Języki",
        "languages.polish": "Polski",
        "languages.native": "Ojczysty",
        "languages.english": "Angielski",

        "contact.eyebrow": "07 / KONTAKT",
        "contact.title": "Porozmawiajmy.",
        "contact.description": "Szukam możliwości dalszego rozwoju w branży IT, szczególnie w obszarze programowania i game developmentu.",
        "contact.location": "Bydgoszcz, Polska",

        "media.unsupported": "Twoja przeglądarka nie obsługuje odtwarzania wideo.",
        "modal.close": "Zamknij"
    },

    en: {
        "meta.title": "Dawid Jerka — Portfolio",
        "meta.description": "Dawid Jerka's portfolio — game development, programming, data analysis and software projects.",

        "language.label": "Language selection",

        "nav.about": "About",
        "nav.projects": "Projects",
        "nav.skills": "Skills",
        "nav.experience": "Experience",
        "nav.contact": "Contact",

        "hero.eyebrow": "Applied Computer Science Graduate",
        "hero.title": `Hi,<br>I'm <span>Dawid.</span>`,
        "hero.subtitle": "I build games, write software and develop my own projects.",
        "hero.description": "I am an Applied Computer Science graduate specializing in Data Science. I am particularly interested in game development, programming and using technology to solve interesting problems.",
        "hero.projects": "View projects",
        "hero.about": "About me",

        "about.title": "About me",
        "about.heading": `I combine a <span class="accent-text">technical</span> and <span class="accent-text">creative</span> approach.`,
        "about.p1": "I graduated in Applied Computer Science with a specialization in Data Science from Bydgoszcz University of Science and Technology. During my studies and through my own projects, I developed my programming skills.",
        "about.p2": "I am particularly interested in programming and game development. I enjoy coming up with ideas, building them and figuring out how to turn them into something that actually works.",
        "about.p3": "For many years, I also worked in a creative field as a dance instructor. This taught me to approach problems from different perspectives and look for unconventional solutions.",

        "education.title": "Education",
        "education.studies": "University",
        "education.degree": "Applied Computer Science — Data Science specialization",
        "education.thesisLabel": "Bachelor's thesis:",
        "education.thesis": "“Design and implementation of a Grand Strategy game using the Godot engine”",
        "education.activity": "Student activity",
        "education.club": "Student Game Development Club",
        "education.clubDescription": "Participation in a student organization focused on game development and improving programming skills.",

        "projects.title": "Projects",
        "projects.intro": "Projects are the most important part of my portfolio — ranging from games and artificial intelligence to data analysis and applications.",
        "projects.loading": "Loading projects...",
        "projects.error": "Unable to load projects.",
        "projects.empty": "No projects in this category.",
        "projects.more": "View project →",
        "projects.loadingOne": "Loading project...",
        "projects.errorOne": "Unable to load project.",
        "projects.about": "About the project",
        "projects.technologies": "Technologies",
        "projects.filtersLabel": "Filter projects",
        "projects.filters.all": "ALL",
        "projects.filters.game": "GAME DEV",
        "projects.filters.data": "DATA & AI",
        "projects.filters.web": "WEB",
        "projects.filters.mobile": "MOBILE",

        "skills.title": "Skills",
        "skills.hint": "Hover over a technology to see related projects",
        "skills.hover": "Hover over a technology",
        "skills.noProjects": "No related projects",
        "skills.oneProject": "1 related project",
        "skills.manyProjects": count =>
            `${count} related projects`,

        "experience.title": "Professional experience",
        "experience.present2025": "2025 — present",
        "experience.selfEmployed": "Self-employed",
        "experience.danceInstructor": "Dance Instructor",
        "experience.selfP1": "I teach individual and group dance classes and prepare participants for performances and competitions.",
        "experience.selfP2": "I independently manage scheduling, client communication and business development.",
        "experience.present2021": "2021 — present",
        "experience.education": "Education",
        "experience.mathTutor": "Mathematics Tutor",
        "experience.mathDescription": "I teach individual and group lessons, identify students' difficulties and adapt teaching methods to their needs.",
        "experience.danceSchool": "TEMPO Dance School",
        "experience.tempoDescription": "I taught individual and group dance classes and prepared dancers for performances and competitions.",
        "experience.customerAdvisor": "Customer Advisor / Warehouse Associate",
        "experience.bluDescription": "I advised customers on product selection and supported day-to-day warehouse operations.",

        "languages.title": "Languages",
        "languages.polish": "Polish",
        "languages.native": "Native",
        "languages.english": "English",

        "contact.eyebrow": "07 / CONTACT",
        "contact.title": "Let's talk.",
        "contact.description": "I am looking for opportunities to continue developing my career in IT, particularly in programming and game development.",
        "contact.location": "Bydgoszcz, Poland",

        "media.unsupported": "Your browser does not support video playback.",
        "modal.close": "Close"
    }
};


const urlParams =
    new URLSearchParams(
        window.location.search
    );

const languageFromUrl =
    urlParams.get("lang");

let currentLanguage =
    languageFromUrl === "en" ||
        languageFromUrl === "pl"
        ? languageFromUrl
        : localStorage.getItem(
            "portfolio-language"
        ) === "en"
            ? "en"
            : "pl";


function t(key, ...args) {

    const value =
        translations[currentLanguage]?.[key] ??
        translations.pl?.[key] ??
        key;

    return typeof value === "function"
        ? value(...args)
        : value;
}


function applyTranslations() {

    document.documentElement.lang =
        currentLanguage;

    document.title =
        t("meta.title");


    const metaDescription =
        document.querySelector(
            'meta[name="description"]'
        );

    if (metaDescription) {

        metaDescription.content =
            t("meta.description");
    }


    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(element => {

            element.textContent =
                t(
                    element.dataset.i18n
                );
        });


    document
        .querySelectorAll(
            "[data-i18n-html]"
        )
        .forEach(element => {

            element.innerHTML =
                t(
                    element.dataset.i18nHtml
                );
        });


    document
        .querySelectorAll(
            "[data-i18n-aria-label]"
        )
        .forEach(element => {

            element.setAttribute(
                "aria-label",
                t(
                    element.dataset
                        .i18nAriaLabel
                )
            );
        });


    document
        .querySelectorAll(
            "[data-language]"
        )
        .forEach(button => {

            const isActive =
                button.dataset.language ===
                currentLanguage;

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


async function setLanguage(language) {

    if (
        language !== "pl" &&
        language !== "en"
    ) {
        return;
    }


    if (
        language === currentLanguage
    ) {
        return;
    }


    currentLanguage =
        language;


    localStorage.setItem(
        "portfolio-language",
        currentLanguage
    );

    const url =
        new URL(
            window.location.href
        );

    if (currentLanguage === "en") {

        url.searchParams.set(
            "lang",
            "en"
        );

    } else {

        url.searchParams.delete(
            "lang"
        );
    }

    window.history.replaceState(
        {},
        "",
        url
    );

    // =========================
    // STATIC TRANSLATIONS
    // =========================

    applyTranslations();


    // =========================
    // CLOSE OPEN MODAL
    // =========================

    if (
        projectModal &&
        !projectModal.hidden
    ) {

        closeProject();
    }


    // =========================
    // RELOAD PROJECTS
    // =========================

    await loadProjects();


    // =========================
    // RELOAD SKILLS MAP DATA
    // =========================

    if (
        typeof skillsMap !== "undefined" &&
        skillsMap.svg
    ) {

        await loadSkillsProjects();

        renderSkillsMap();

        clearActiveMap();
    }
}


function setupLanguageSwitch() {

    document
        .querySelectorAll(
            "[data-language]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    setLanguage(
                        button.dataset.language
                    );
                }
            );
        });
}


// =========================================================
// ELEMENTS
// =========================================================

const projectsGrid =
    document.getElementById(
        "projects-grid"
    );

const projectsLoading =
    document.getElementById(
        "projects-loading"
    );

const projectsError =
    document.getElementById(
        "projects-error"
    );

const projectFilters =
    document.getElementById(
        "project-filters"
    );


const projectModal =
    document.getElementById(
        "project-modal"
    );

const modalOverlay =
    document.getElementById(
        "modal-overlay"
    );

const modalClose =
    document.getElementById(
        "modal-close"
    );

const modalBody =
    document.getElementById(
        "modal-body"
    );


// =========================================================
// PROJECT FILTERS
// =========================================================

let allProjects = [];

let activeProjectFilter =
    "all";


const validProjectFilters =
    new Set([
        "all",
        "game",
        "data",
        "web",
        "mobile"
    ]);


function projectMatchesFilter(
    project,
    filter
) {

    if (filter === "all") {
        return true;
    }


    const type =
        String(
            project.type || ""
        )
            .trim()
            .toLowerCase();


    const technologies =
        Array.isArray(
            project.technologies
        )
            ? project.technologies
                .join(" ")
                .toLowerCase()
            : "";


    const searchable =
        `${type} ${technologies}`;


    if (filter === "game") {

        return (
            type.includes(
                "game development"
            ) ||
            searchable.includes(
                "unity"
            ) ||
            searchable.includes(
                "godot"
            )
        );
    }


    if (filter === "data") {

        return (
            type.includes(
                "data science"
            ) ||
            type.includes(
                "machine learning"
            ) ||
            type.includes(
                "reinforcement learning"
            ) ||
            searchable.includes(
                "data analysis"
            ) ||
            searchable.includes(
                "pandas"
            ) ||
            searchable.includes(
                "scikit-learn"
            ) ||
            searchable.includes(
                "computer vision"
            ) ||
            searchable.includes(
                "yolo"
            )
        );
    }


    if (filter === "web") {

        return (
            type.includes(
                "web development"
            ) ||
            searchable.includes(
                "node.js"
            ) ||
            searchable.includes(
                "express"
            ) ||
            searchable.includes(
                "ejs"
            ) ||
            searchable.includes(
                "rest api"
            )
        );
    }


    if (filter === "mobile") {

        return (
            type.includes(
                "android"
            ) ||
            type.includes(
                "mobile"
            ) ||
            searchable.includes(
                "android studio"
            )
        );
    }


    return false;
}


function renderProjectsForFilter(
    filter
) {

    const filteredProjects =
        allProjects.filter(
            project =>
                projectMatchesFilter(
                    project,
                    filter
                )
        );


    /*
        Featured występuje wyłącznie
        w widoku ALL.
    */

    const featuredSlug =
        filter === "all"
            ? "survivors3d"
            : null;


    renderProjects(
        filteredProjects,
        featuredSlug
    );
}


function setProjectFilter(
    filter
) {

    if (
        !validProjectFilters.has(
            filter
        )
    ) {
        return;
    }


    activeProjectFilter =
        filter;


    if (projectFilters) {

        projectFilters
            .querySelectorAll(
                ".project-filter"
            )
            .forEach(button => {

                const isActive =
                    button.dataset.filter ===
                    filter;


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


    renderProjectsForFilter(
        filter
    );
}


function setupProjectFilters() {

    if (!projectFilters) {
        return;
    }


    projectFilters.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
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


// =========================================================
// LOAD PROJECTS
// =========================================================

async function loadProjects() {

    try {

        const response =
            await fetch(
                `/api/projects?lang=${currentLanguage}`
            );


        if (!response.ok) {

            throw new Error(
                t("projects.error")
            );
        }


        allProjects =
            await response.json();


        projectsLoading.hidden =
            true;

        projectsError.hidden =
            true;


        if (projectFilters) {

            projectFilters.hidden =
                false;
        }


        renderProjectsForFilter(
            activeProjectFilter
        );

    } catch (error) {

        console.error(
            "Błąd podczas pobierania projektów:",
            error
        );


        projectsLoading.hidden =
            true;

        projectsError.hidden =
            false;

        projectsError.textContent =
            t("projects.error");
    }
}


// =========================================================
// RENDER PROJECTS
// =========================================================

function renderProjects(
    projects,
    featuredSlug = null
) {

    projectsGrid.innerHTML =
        "";


    if (
        projects.length === 0
    ) {

        projectsGrid.innerHTML = `

            <div
                class="projects-state projects-state-grid"
            >
                ${t("projects.empty")}
            </div>

        `;

        return;
    }


    projects.forEach(
        (
            project,
            index
        ) => {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "project-card";


            if (
                featuredSlug &&
                project.slug ===
                featuredSlug
            ) {

                article.classList.add(
                    "featured"
                );
            }


            article.innerHTML = `

                ${renderMedia(project)}

                <div class="project-top">

                    <span class="project-number">

                        ${String(
                index + 1
            ).padStart(
                2,
                "0"
            )}

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


                    <div
                        class="tags project-card-tags"
                    >

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

                        ${t(
                "projects.more"
            )}

                    </button>

                </div>
            `;


            projectsGrid.appendChild(
                article
            );
        }
    );


    setupProjectButtons();


    requestAnimationFrame(
        () => {

            fitProjectCardTechnologies();
        }
    );
}


function setupProjectButtons() {

    projectsGrid
        .querySelectorAll(
            ".project-more"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openProject(
                        button.dataset.slug
                    );
                }
            );
        });
}


// =========================================================
// PROJECT TECHNOLOGY TAGS
// =========================================================

function renderTechnologies(
    technologies
) {

    if (
        !Array.isArray(
            technologies
        )
    ) {

        return "";
    }


    return technologies
        .map(
            technology => `

                <span class="tag">

                    ${escapeHtml(
                technology
            )}

                </span>

            `
        )
        .join("");
}


function fitProjectCardTechnologies() {

    const containers =
        document.querySelectorAll(
            ".project-card-tags"
        );


    containers.forEach(
        container => {

            container
                .querySelectorAll(
                    ".tag-more"
                )
                .forEach(
                    element => {

                        element.remove();
                    }
                );


            const tags = [
                ...container
                    .querySelectorAll(
                        ".tag:not(.tag-more)"
                    )
            ];


            tags.forEach(
                tag => {

                    tag.style.display =
                        "";
                }
            );


            if (
                container.scrollWidth <=
                container.clientWidth
            ) {

                return;
            }


            const moreTag =
                document.createElement(
                    "span"
                );


            moreTag.className =
                "tag tag-more";


            container.appendChild(
                moreTag
            );


            let hiddenCount = 0;


            for (
                let index =
                    tags.length - 1;
                index >= 0;
                index--
            ) {

                tags[
                    index
                ].style.display =
                    "none";


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
        }
    );
}


let technologyResizeFrame;


window.addEventListener(
    "resize",
    () => {

        cancelAnimationFrame(
            technologyResizeFrame
        );


        technologyResizeFrame =
            requestAnimationFrame(
                () => {

                    fitProjectCardTechnologies();
                }
            );
    }
);


// =========================================================
// PROJECT MEDIA
// =========================================================

function renderMedia(
    project
) {

    if (!project.media_url) {
        return "";
    }


    const mediaUrl =
        project.media_url
            .toLowerCase();


    const isVideo =
        mediaUrl.endsWith(
            ".mp4"
        ) ||
        mediaUrl.endsWith(
            ".webm"
        ) ||
        mediaUrl.endsWith(
            ".ogg"
        ) ||
        mediaUrl.endsWith(
            ".mov"
        );


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

                    ${t(
            "media.unsupported"
        )}

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


// =========================================================
// OPEN PROJECT
// =========================================================

async function openProject(
    slug
) {

    projectModal.hidden =
        false;


    document.body
        .classList.add(
            "modal-open"
        );


    document.body.style
        .paddingRight =
        `${window.innerWidth -
        document.documentElement
            .clientWidth
        }px`;


    modalBody.innerHTML = `

        <div class="projects-state">

            ${t(
        "projects.loadingOne"
    )}

        </div>

    `;


    try {

        const response =
            await fetch(
                `/api/projects/${encodeURIComponent(slug)
                }?lang=${currentLanguage}`
            );


        if (!response.ok) {

            throw new Error(
                t(
                    "projects.errorOne"
                )
            );
        }


        const project =
            await response.json();


        renderProject(
            project
        );

    } catch (error) {

        console.error(
            "Błąd podczas pobierania projektu:",
            error
        );


        modalBody.innerHTML = `

            <div class="projects-state">

                ${t(
            "projects.errorOne"
        )}

            </div>

        `;
    }
}


// =========================================================
// RENDER PROJECT DETAILS
// =========================================================

function renderProject(
    project
) {

    let githubButton =
        "";


    if (
        project.github_url
    ) {

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


    let demoButton =
        "";


    if (
        project.demo_url
    ) {

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


    modalBody.innerHTML = `

        ${renderModalMedia(
        project
    )}


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


        <div
            class="modal-divider"
        ></div>


        <div class="modal-layout">

            <div>

                <h3>

                    ${t(
        "projects.about"
    )}

                </h3>


                <p class="modal-text">

                    ${escapeHtml(
        project.full_description ||
        ""
    )}

                </p>

            </div>


            <aside>

                <h3>

                    ${t(
        "projects.technologies"
    )}

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


// =========================================================
// RENDER MODAL MEDIA
// =========================================================

function renderModalMedia(
    project
) {

    if (
        !project.media_url
    ) {

        return "";
    }


    const mediaUrl =
        project.media_url
            .toLowerCase();


    const isVideo =
        mediaUrl.endsWith(
            ".mp4"
        ) ||
        mediaUrl.endsWith(
            ".webm"
        ) ||
        mediaUrl.endsWith(
            ".ogg"
        ) ||
        mediaUrl.endsWith(
            ".mov"
        );


    if (isVideo) {

        return `

            <div
                class="modal-project-image"
            >

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

                    ${t(
            "media.unsupported"
        )}

                </video>

            </div>

        `;
    }


    return `

        <div
            class="modal-project-image"
        >

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


// =========================================================
// CLOSE PROJECT
// =========================================================

function closeProject() {

    projectModal.hidden =
        true;


    document.body
        .classList.remove(
            "modal-open"
        );


    document.body.style
        .paddingRight =
        "";


    modalBody
        .querySelectorAll(
            "video"
        )
        .forEach(
            video => {

                video.pause();
            }
        );
}


// =========================================================
// MODAL EVENTS
// =========================================================

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProject
    );
}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeProject
    );
}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            projectModal &&
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
            id:
                "game",

            name:
                "GAME DEVELOPMENT",

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
            id:
                "data",

            name:
                "DATA & AI",

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
            id:
                "web",

            name:
                "WEB DEVELOPMENT",

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
            id:
                "mobile",

            name:
                "MOBILE",

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
        (
            angle - 90
        ) *
        Math.PI /
        180;


    return {

        x:
            cx +
            radius *
            Math.cos(
                radians
            ),

        y:
            cy +
            radius *
            Math.sin(
                radians
            )
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


    Object.entries(
        attributes
    )
        .forEach(
            (
                [key, value]
            ) => {

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

function seededRandom(
    seed
) {

    let value =
        seed;


    return function () {

        value =
            (
                value *
                9301 +
                49297
            ) %
            233280;


        return (
            value /
            233280
        );
    };
}


// =========================================================
// SECTOR GEOMETRY
// =========================================================

function calculateSectorGeometry() {

    const totalTechnologies =
        skillsMap.sectors
            .reduce(
                (
                    sum,
                    sector
                ) =>

                    sum +
                    sector
                        .technologies
                        .length,

                0
            );


    const sectorGap =
        6;


    const totalGap =
        sectorGap *
        skillsMap
            .sectors
            .length;


    const availableAngle =
        360 -
        totalGap;


    let currentAngle =
        -90;


    skillsMap.sectors
        .forEach(
            sector => {

                const percentage =
                    sector
                        .technologies
                        .length /
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
                    angleSize /
                    2;


                sector.percentage =
                    percentage *
                    100;


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
                `/api/projects?lang=${currentLanguage}`
            );


        if (!response.ok) {

            throw new Error(
                t(
                    "projects.error"
                )
            );
        }


        skillsMap.projectsData =
            await response.json();

    } catch (error) {

        console.error(
            "Skills map:",
            error
        );


        skillsMap.projectsData =
            [];
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


    return skillsMap
        .projectsData
        .filter(
            project => {

                if (
                    !Array.isArray(
                        project.technologies
                    )
                ) {

                    return false;
                }


                return project
                    .technologies
                    .some(
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

    skillsMap.connections
        .innerHTML =
        "";


    skillsMap.sectorsElement
        .innerHTML =
        "";


    skillsMap.technologies
        .innerHTML =
        "";


    skillsMap.projects
        .innerHTML =
        "";


    renderSectors();


    renderSectorConnections();


    renderMapTechnologies();
}


// =========================================================
// CENTER → SECTOR CONNECTIONS
// =========================================================

function renderSectorConnections() {

    skillsMap.sectors
        .forEach(
            sector => {

                const point =
                    sector.point ||
                    polarToCartesian(
                        skillsMap
                            .center.x,
                        skillsMap
                            .center.y,
                        165,
                        sector
                            .midAngle
                    );


                const line =
                    createSvgElement(
                        "line",
                        {

                            x1:
                                skillsMap
                                    .center.x,

                            y1:
                                skillsMap
                                    .center.y,

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


                skillsMap
                    .connections
                    .appendChild(
                        line
                    );
            }
        );
}


// =========================================================
// RENDER SECTORS
// =========================================================

function renderSectors() {

    skillsMap.sectors
        .forEach(
            sector => {

                const point =
                    polarToCartesian(
                        skillsMap
                            .center.x,
                        skillsMap
                            .center.y,
                        165,
                        sector
                            .midAngle
                    );


                sector.point =
                    point;


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


                const dot =
                    createSvgElement(
                        "circle",
                        {

                            cx:
                                point.x,

                            cy:
                                point.y,

                            r:
                                7,

                            class:
                                "skills-sector-dot"
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
                                point.x,

                            y:
                                point.y -
                                24,

                            class:
                                "skills-sector-label",

                            "text-anchor":
                                "middle"
                        }
                    );


                text.textContent =
                    sector.name;


                group.appendChild(
                    text
                );


                const hitArea =
                    createSvgElement(
                        "circle",
                        {

                            cx:
                                point.x,

                            cy:
                                point.y,

                            r:
                                65,

                            class:
                                "skills-sector-hit"
                        }
                    );


                group.appendChild(
                    hitArea
                );


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


                skillsMap
                    .sectorsElement
                    .appendChild(
                        group
                    );
            }
        );
}


// =========================================================
// TECHNOLOGY POSITION GENERATION
// =========================================================

function generateTechnologyPositions(
    sector
) {

    const positions =
        [];


    const innerRadius =
        205;


    const outerRadius =
        335;


    const minDistance =
        52;


    const sectorClearance =
        95;


    const sectorSeeds = {

        game:
            173,

        data:
            421,

        web:
            739,

        mobile:
            913
    };


    const random =
        seededRandom(

            sectorSeeds[
            sector.id
            ] ||
            123
        );


    for (
        let i = 0;
        i <
        sector.technologies.length;
        i++
    ) {

        let position =
            null;


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
                    skillsMap
                        .center.x,
                    skillsMap
                        .center.y,
                    radius,
                    angle
                );


            const distanceFromSector =
                Math.sqrt(

                    (
                        point.x -
                        sector.point.x
                    ) ** 2 +

                    (
                        point.y -
                        sector.point.y
                    ) ** 2
                );


            const farEnoughFromSector =
                distanceFromSector >=
                sectorClearance;


            const farEnoughFromTechnologies =
                positions.every(
                    existing => {

                        const dx =
                            point.x -
                            existing.x;


                        const dy =
                            point.y -
                            existing.y;


                        const distance =
                            Math.sqrt(

                                dx *
                                dx +

                                dy *
                                dy
                            );


                        return (
                            distance >=
                            minDistance
                        );
                    }
                );


            const valid =
                farEnoughFromSector &&
                farEnoughFromTechnologies;


            if (valid) {

                position =
                    point;

                break;
            }
        }


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
                        sector
                            .technologies
                            .length
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
                    skillsMap
                        .center.x,
                    skillsMap
                        .center.y,
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

    skillsMap.sectors
        .forEach(
            sector => {

                const positions =
                    generateTechnologyPositions(
                        sector
                    );


                sector.technologies
                    .forEach(
                        (
                            technology,
                            index
                        ) => {

                            const point =
                                positions[
                                index
                                ];


                            const connection =
                                createSvgElement(
                                    "line",
                                    {

                                        x1:
                                            sector
                                                .point.x,

                                        y1:
                                            sector
                                                .point.y,

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


                            skillsMap
                                .connections
                                .appendChild(
                                    connection
                                );


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


                            const dot =
                                createSvgElement(
                                    "circle",
                                    {

                                        cx:
                                            point.x,

                                        cy:
                                            point.y,

                                        r:
                                            5,

                                        class:
                                            "skills-technology-dot"
                                    }
                                );


                            group.appendChild(
                                dot
                            );


                            const labelOffset =
                                index %
                                    2 === 0
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


                            const hitArea =
                                createSvgElement(
                                    "circle",
                                    {

                                        cx:
                                            point.x,

                                        cy:
                                            point.y,

                                        r:
                                            25,

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


                            group.addEventListener(
                                "mouseleave",
                                () => {

                                    clearActiveMap();
                                }
                            );


                            skillsMap
                                .technologies
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

    clearActiveMap(
        false
    );


    skillsMap.svg
        .classList.add(
            "sector-active"
        );


    document
        .querySelectorAll(
            ".skills-map-sector"
        )
        .forEach(
            sector => {

                const active =
                    sector.dataset
                        .sector ===
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


    document
        .querySelectorAll(
            ".skills-map-technology"
        )
        .forEach(
            technology => {

                const sameSector =
                    technology.dataset
                        .sector ===
                    sectorId;


                technology
                    .classList
                    .toggle(
                        "sector-active",
                        sameSector
                    );


                technology
                    .classList
                    .toggle(
                        "dimmed",
                        !sameSector
                    );
            }
        );


    document
        .querySelectorAll(
            ".skills-map-connection"
        )
        .forEach(
            connection => {

                const sameSector =
                    connection.dataset
                        .sector ===
                    sectorId;


                connection
                    .classList
                    .toggle(
                        "sector-active",
                        sameSector
                    );


                connection
                    .classList
                    .toggle(
                        "dimmed",
                        !sameSector
                    );
            }
        );


    skillsMap.projects
        .innerHTML =
        "";


    skillsMap.details
        .innerHTML = `

            <div
                class="skills-details-placeholder"
            >

                <span
                    class="skills-details-line"
                ></span>

                <span>

                    ${t(
            "skills.hover"
        )}

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

    clearActiveMap(
        false
    );


    skillsMap.svg
        .classList.add(
            "technology-active"
        );


    document
        .querySelectorAll(
            ".skills-map-sector"
        )
        .forEach(
            sector => {

                const active =
                    sector.dataset
                        .sector ===
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


    document
        .querySelectorAll(
            ".skills-map-technology"
        )
        .forEach(
            node => {

                const active =
                    node.dataset
                        .technology ===
                    technology;


                const sameSector =
                    node.dataset
                        .sector ===
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


    document
        .querySelectorAll(
            ".skills-map-connection"
        )
        .forEach(
            connection => {

                const activeTechnology =
                    connection.dataset
                        .technology ===
                    technology;


                const sameSector =
                    connection.dataset
                        .sector ===
                    sectorId;


                connection
                    .classList
                    .toggle(
                        "active",
                        activeTechnology
                    );


                connection
                    .classList
                    .toggle(
                        "sector-active",
                        sameSector
                    );


                connection
                    .classList
                    .toggle(
                        "dimmed",
                        !activeTechnology &&
                        !sameSector
                    );
            }
        );


    document
        .querySelectorAll(
            ".skills-sector-connection"
        )
        .forEach(
            connection => {

                const active =
                    connection.dataset
                        .sector ===
                    sectorId;


                connection
                    .classList
                    .toggle(
                        "active",
                        active
                    );


                connection
                    .classList
                    .toggle(
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


// =========================================================
// PROJECT POSITIONS
// =========================================================

function generateProjectPositions(
    technologyPoint,
    projects
) {

    const positions =
        [];


    const minTechnologyDistance =
        45;


    const maxTechnologyDistance =
        100;


    const minProjectDistance =
        65;


    const dx =
        technologyPoint.x -
        skillsMap
            .center.x;


    const dy =
        technologyPoint.y -
        skillsMap
            .center.y;


    const baseAngle =
        Math.atan2(
            dy,
            dx
        );


    const random =
        seededRandom(
            Math.round(

                technologyPoint.x *
                13 +

                technologyPoint.y *
                7
            )
        );


    projects.forEach(
        () => {

            let position =
                null;


            for (
                let attempt = 0;
                attempt < 500;
                attempt++
            ) {

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
                        Math.cos(
                            angle
                        ) *
                        radius,

                    y:
                        technologyPoint.y +
                        Math.sin(
                            angle
                        ) *
                        radius
                };


                const insideCanvas =
                    point.x >= 50 &&
                    point.x <= 950 &&
                    point.y >= 50 &&
                    point.y <= 710;


                if (!insideCanvas) {

                    continue;
                }


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


                if (
                    !farEnoughFromProjects
                ) {

                    continue;
                }


                position =
                    point;


                break;
            }


            if (!position) {

                position = {

                    x:
                        technologyPoint.x +
                        Math.cos(
                            baseAngle
                        ) *
                        minTechnologyDistance,

                    y:
                        technologyPoint.y +
                        Math.sin(
                            baseAngle
                        ) *
                        minTechnologyDistance
                };
            }


            positions.push(
                position
            );
        }
    );


    return positions;
}


// =========================================================
// RENDER TECHNOLOGY PROJECTS
// =========================================================

function renderTechnologyProjects(
    technology,
    technologyPoint
) {

    skillsMap.projects
        .innerHTML =
        "";


    const projects =
        getProjectsForTechnology(
            technology
        );


    if (
        !projects.length
    ) {

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
                projectPositions[
                index
                ];


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

                        r:
                            4,

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
                            projectPoint.y -
                            12,

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
        skillsMap.sectors
            .find(
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
            t(
                "skills.noProjects"
            );

    } else if (
        projects.length ===
        1
    ) {

        projectText =
            t(
                "skills.oneProject"
            );

    } else {

        projectText =
            t(
                "skills.manyProjects",
                projects.length
            );
    }


    skillsMap.details
        .innerHTML = `

            <div
                class="skills-details-content"
            >

                <span
                    class="skills-details-category"
                >

                    ${escapeHtml(
            sector?.name || ""
        )}

                </span>


                <strong
                    class="skills-details-title"
                >

                    ${escapeHtml(
            technology
        )}

                </strong>


                <span
                    class="skills-details-projects"
                >

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

    skillsMap.svg
        .classList.remove(
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

                element
                    .classList
                    .remove(
                        "active",
                        "sector-active",
                        "dimmed"
                    );
            }
        );


    if (clearProjects) {

        skillsMap.projects
            .innerHTML =
            "";


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


    skillsMap.details
        .innerHTML = `

            <div
                class="skills-details-placeholder"
            >

                <span
                    class="skills-details-line"
                ></span>


                <span>

                    ${t(
            "skills.hover"
        )}

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

    return String(
        value
    )
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

    skillsMap.svg
        .addEventListener(
            "mouseleave",
            () => {

                clearActiveMap();
            }
        );
}


// =========================================================
// START
// =========================================================

setupLanguageSwitch();

setupProjectFilters();

applyTranslations();

initSkillsMap();

loadProjects();


// =========================================================
// CODE CARD — TYPEWRITING
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const codeContent =
            document.querySelector(
                ".code-content"
            );


        if (!codeContent) {
            return;
        }


        const oldCursor =
            codeContent.querySelector(
                ".code-cursor"
            );


        if (oldCursor) {

            oldCursor.remove();
        }


        const lines = [
            ...codeContent.querySelectorAll(
                "p"
            )
        ];


        const cursor =
            document.createElement(
                "span"
            );


        cursor.className =
            "typewriter-cursor";


        cursor.textContent =
            "_";


        function prepareLine(
            line
        ) {

            const temp =
                document.createElement(
                    "div"
                );


            temp.innerHTML =
                line.innerHTML;


            temp
                .querySelectorAll(
                    ".code-purple, .code-green"
                )
                .forEach(
                    element => {

                        element.textContent =
                            element
                                .textContent
                                .replace(
                                    /\s+/g,
                                    " "
                                )
                                .trim();
                    }
                );


            let html =
                temp
                    .innerHTML
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .replace(
                        /\s+([,;:}\]])/g,
                        "$1"
                    )
                    .replace(
                        /([([{])\s+/g,
                        "$1"
                    )
                    .trim();


            temp.innerHTML =
                html;


            return [
                ...temp.childNodes
            ]
                .map(
                    node => {

                        if (
                            node.nodeType ===
                            Node.TEXT_NODE
                        ) {

                            return {

                                type:
                                    "text",

                                text:
                                    node.textContent
                            };
                        }


                        return {

                            type:
                                "element",

                            element:
                                node.cloneNode(
                                    true
                                )
                        };
                    }
                );
        }


        const preparedLines =
            lines.map(
                line =>
                    prepareLine(
                        line
                    )
            );


        lines.forEach(
            line => {

                line.innerHTML =
                    "";
            }
        );


        const sleep =
            ms =>
                new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            ms
                        )
                );


        async function typeTextNode(
            line,
            text
        ) {

            const textNode =
                document.createTextNode(
                    ""
                );


            line.appendChild(
                textNode
            );


            for (
                const char
                of text
            ) {

                textNode.textContent +=
                    char;


                line.appendChild(
                    cursor
                );


                if (
                    char === " "
                ) {

                    await sleep(
                        3
                    );

                } else {

                    await sleep(
                        18
                    );
                }
            }
        }


        async function typeElement(
            line,
            element
        ) {

            const newElement =
                element.cloneNode(
                    false
                );


            newElement.textContent =
                "";


            line.appendChild(
                newElement
            );


            const text =
                element.textContent;


            for (
                const char
                of text
            ) {

                newElement.textContent +=
                    char;


                line.appendChild(
                    cursor
                );


                if (
                    char === " "
                ) {

                    await sleep(
                        3
                    );

                } else {

                    await sleep(
                        18
                    );
                }
            }
        }


        async function typeCode() {

            lines[
                0
            ].appendChild(
                cursor
            );


            for (
                let i = 0;
                i < lines.length;
                i++
            ) {

                const line =
                    lines[i];


                line.appendChild(
                    cursor
                );


                for (
                    const node
                    of preparedLines[i]
                ) {

                    if (
                        node.type ===
                        "text"
                    ) {

                        await typeTextNode(
                            line,
                            node.text
                        );

                    } else {

                        await typeElement(
                            line,
                            node.element
                        );
                    }
                }


                if (
                    i <
                    lines.length - 1
                ) {

                    await sleep(
                        80
                    );
                }
            }


            lines[
                lines.length - 1
            ].appendChild(
                cursor
            );
        }


        typeCode();
    }
);