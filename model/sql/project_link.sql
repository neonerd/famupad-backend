-- name: get
SELECT * FROM project_link

-- name: populate_project
SELECT
  *
FROM project_link
WHERE
  project_link.project_id = :project_id
ORDER BY
  project_link.name

-- name: fetch
SELECT * FROM project_link WHERE id = :id

-- name: create
INSERT INTO project_link (url, name, note, project_id) VALUES :$project_link{url, name, note, project_id}

-- name: update
UPDATE project_link SET :@project_link{url, name, note, project_id} WHERE id = :id

-- name: remove
DELETE FROM project_link WHERE id IN :ids
