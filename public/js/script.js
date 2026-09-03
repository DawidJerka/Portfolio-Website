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

function renderTechnologies(
    technologies
) {

    if (!Array.isArray(technologies)) {

        return "";

    }


    return technologies
        .map(technology => {

            return `

                <span>

                    ${escapeHtml(
                        technology
                    )}

                </span>

            `;

        })
        .join("");

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


// =========================
// ESCAPE HTML
// =========================

function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// =========================
// START
// =========================

loadProjects();