-- name: get
SELECT * FROM project_like

-- name: fetch
SELECT * FROM project_like WHERE id = :id

-- name: create
INSERT INTO project_like (project_id, user_id, createdAt) VALUES :$project_like{project_id, user_id, createdAt}

-- name: update
UPDATE project_like SET :@project_like{project_id, user_id, createdAt} WHERE id = :id

-- name: remove
DELETE FROM project_like WHERE id IN :ids

-- name: populate_projects_by_user
SELECT * FROM project_like
  WHERE
    project_id IN :project_ids
    AND
    user_id = :user_id