const express = require("express");
const path = require("path");

const db = require("./database/database");

const app = express();
const PORT = process.env.PORT || 3000;


// =========================
// EXPRESS CONFIGURATION
// =========================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


// =========================
// MAIN PAGE
// =========================

app.get("/", (req, res) => {
    res.render("index");
});


// =========================
// API - ALL PROJECTS
// =========================

app.get("/api/projects", (req, res) => {

    const sql = `
        SELECT
            p.id,
            p.title,
            p.slug,
            p.type,
            p.description,
            p.full_description,
            p.github_url,
            p.demo_url,
            p.media_url,
            GROUP_CONCAT(t.name) AS technologies
        FROM projects p

        LEFT JOIN project_technologies pt
            ON p.id = pt.project_id

        LEFT JOIN technologies t
            ON pt.technology_id = t.id

        GROUP BY p.id

        ORDER BY
            CASE
                WHEN p.slug = 'survivors3d' THEN 0
                ELSE 1
            END,
            p.id DESC
    `;


    db.all(sql, [], (err, projects) => {

        if (err) {

            console.error(
                "Błąd podczas pobierania projektów:",
                err
            );

            return res.status(500).json({
                error: "Błąd bazy danych."
            });
        }


        const result = projects.map(project => ({

            ...project,

            technologies: project.technologies
                ? project.technologies
                    .split(",")
                    .map(item => item.trim())
                : []

        }));


        res.json(result);
    });
});


// =========================
// API - SINGLE PROJECT
// =========================

app.get("/api/projects/:slug", (req, res) => {

    const { slug } = req.params;


    const sql = `
        SELECT
            p.id,
            p.title,
            p.slug,
            p.type,
            p.description,
            p.full_description,
            p.github_url,
            p.demo_url,
            p.media_url,
            GROUP_CONCAT(t.name) AS technologies
        FROM projects p

        LEFT JOIN project_technologies pt
            ON p.id = pt.project_id

        LEFT JOIN technologies t
            ON pt.technology_id = t.id

        WHERE p.slug = ?

        GROUP BY p.id
    `;


    db.get(sql, [slug], (err, project) => {

        if (err) {

            console.error(
                "Błąd podczas pobierania projektu:",
                err
            );

            return res.status(500).json({
                error: "Błąd bazy danych."
            });
        }


        if (!project) {

            return res.status(404).json({
                error: "Projekt nie został znaleziony."
            });
        }


        project.technologies =
            project.technologies
                ? project.technologies
                    .split(",")
                    .map(item => item.trim())
                : [];


        res.json(project);
    });
});


// =========================
// START SERVER
// =========================

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio działa na porcie ${PORT}`);
});