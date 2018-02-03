-- name: get
SELECT 
  project.*,
  department.acronym AS departmentAcronym,
  department.name AS departmentName,
  project_type.name AS projectTypeName,
  project_excercise.name AS projectExcerciseName
FROM project
  LEFT JOIN department ON project.department_id = department.id
  LEFT JOIN project_type ON project.project_type_id = project_type.id
  LEFT JOIN project_excercise ON project.project_excercise_id = project_excercise.id
  :*personId{INNER JOIN project_person ON project.id = project_person.project_id AND project_person.person_id = *}
  :*isLiked{INNER JOIN project_like ON project.id = project_like.project_id AND project_like.user_id = *}
WHERE
  1=1
  :*departmentId{AND department_id = *}
  :*projectTypeId{AND project_type_id = *}
:*orderBy{ORDER BY *!}

-- name: fetch
SELECT
  project.*,
  department.acronym AS departmentAcronym,
  department.name AS departmentName,
  project_type.name AS projectTypeName,
  project_excercise.name AS projectExcerciseName
FROM project 
  LEFT JOIN department ON project.department_id = department.id
  LEFT JOIN project_type ON project.project_type_id = project_type.id
  LEFT JOIN project_excercise ON project.project_excercise_id = project_excercise.id
WHERE project.id = :id OR project.slug = :id

-- name: create
INSERT INTO project (name, slug, project_type_id, project_excercise_id, department_id, state, year, synopsis, description)
  VALUES :$project{name, slug, project_type_id, project_excercise_id, department_id, state, year, synopsis, description}

-- name: update
UPDATE project SET :@project WHERE id = :id

-- name: remove
DELETE FROM project WHERE id IN :ids
