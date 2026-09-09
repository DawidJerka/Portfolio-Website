const express = require("express");
const path = require("path");

const db = require("./database/database");

const app = express();
const PORT = process.env.PORT || 3000;


// =========================
// EXPRESS CONFIGURATION
// =========================

app.set("view engine", "ejs");
app.set(
    "views",
    path.join(
        __dirname,
        "views"
    )
);

app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
);

app.use(
    express.json()
);


// =========================
// FORMAT PROJECT
// =========================

function formatProject(
    project,
    language
) {

    const english =
        language === "en";


    return {

        id:
            project.id,


        title:
            english
                ? project.title_en ||
                    project.title
                : project.title,


        slug:
            project.slug,


        type:
            project.type,


        description:
            english
                ? project.description_en ||
                    project.description
                : project.description,


        full_description:
            english
                ? project.full_description_en ||
                    project.full_description
                : project.full_description,


        github_url:
            project.github_url,


        demo_url:
            project.demo_url,


        media_url:
            project.media_url,


        technologies:
            project.technologies
                ? project.technologies
                    .split(",")
                    .map(
                        item =>
                            item.trim()
                    )
                : []
    };
}


// =========================
// MAIN PAGE
// =========================

app.get(
    "/",
    (req, res) => {

        res.render(
            "index"
        );
    }
);


// =========================
// API - ALL PROJECTS
// =========================

app.get(
    "/api/projects",
    (req, res) => {

        const language =
            req.query.lang === "en"
                ? "en"
                : "pl";


        const sql = `
            SELECT
                p.id,

                p.title,
                p.title_en,

                p.slug,

                p.type,

                p.description,
                p.description_en,

                p.full_description,
                p.full_description_en,

                p.github_url,
                p.demo_url,
                p.media_url,

                (
                    SELECT GROUP_CONCAT(name)

                    FROM (
                        SELECT
                            t.name AS name

                        FROM project_technologies pt2

                        JOIN technologies t
                            ON t.id = pt2.technology_id

                        WHERE
                            pt2.project_id = p.id

                        ORDER BY
                            pt2.position ASC
                    )
                ) AS technologies

            FROM projects p

            ORDER BY

                CASE

                    WHEN p.slug =
                        'survivors3d'
                    THEN 0

                    ELSE 1

                END,

                p.id ASC
        `;


        db.all(
            sql,
            [],
            (
                err,
                projects
            ) => {

                if (err) {

                    console.error(
                        "Błąd podczas pobierania projektów:",
                        err
                    );


                    return res
                        .status(500)
                        .json({
                            error:
                                "Błąd bazy danych."
                        });
                }


                const result =
                    projects.map(
                        project =>
                            formatProject(
                                project,
                                language
                            )
                    );


                res.json(
                    result
                );
            }
        );
    }
);


// =========================
// API - SINGLE PROJECT
// =========================

app.get(
    "/api/projects/:slug",
    (req, res) => {

        const { slug } =
            req.params;


        const language =
            req.query.lang === "en"
                ? "en"
                : "pl";


        const sql = `
            SELECT
                p.id,

                p.title,
                p.title_en,

                p.slug,

                p.type,

                p.description,
                p.description_en,

                p.full_description,
                p.full_description_en,

                p.github_url,
                p.demo_url,
                p.media_url,

                (
                    SELECT GROUP_CONCAT(name)

                    FROM (
                        SELECT
                            t.name AS name

                        FROM project_technologies pt2

                        JOIN technologies t
                            ON t.id = pt2.technology_id

                        WHERE
                            pt2.project_id = p.id

                        ORDER BY
                            pt2.position ASC
                    )
                ) AS technologies

            FROM projects p

            WHERE
                p.slug = ?
        `;


        db.get(
            sql,
            [slug],
            (
                err,
                project
            ) => {

                if (err) {

                    console.error(
                        "Błąd podczas pobierania projektu:",
                        err
                    );


                    return res
                        .status(500)
                        .json({
                            error:
                                "Błąd bazy danych."
                        });
                }


                if (!project) {

                    return res
                        .status(404)
                        .json({
                            error:
                                "Projekt nie został znaleziony."
                        });
                }


                const result =
                    formatProject(
                        project,
                        language
                    );


                res.json(
                    result
                );
            }
        );
    }
);


// =========================
// START SERVER
// =========================

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Portfolio działa na porcie ${PORT}`
        );
    }
);