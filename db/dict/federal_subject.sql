DROP TABLE IF EXISTS dict_federal_subject CASCADE;
CREATE TABLE dict_federal_subject (
    id   char(2) PRIMARY KEY,
    name varchar(100) NOT NULL
);

COMMENT ON TABLE  dict_federal_subject      IS 'Справочник федеральных субъектов';
COMMENT ON COLUMN dict_federal_subject.id   IS 'Код федерального субъекта';
COMMENT ON COLUMN dict_federal_subject.name IS 'Наименование федерального субъекта';

DROP INDEX IF EXISTS dict_federal_subject_name_btree_idx;
CREATE INDEX dict_federal_subject_name_btree_idx ON dict_federal_subjectg(name);
COMMENT ON INDEX dict_federal_subject_name_btree_idx IS 'Индекс для сортировки наименованию в таблице субъектов РФ';

DROP INDEX IF EXISTS dict_federal_subject_name_gin_idx;
CREATE INDEX dict_federal_subject_name_gin_idx On dict_federal_subject USING gin (normalize_string(name) gin_trgm_ops);
COMMENT ON INDEX dict_federal_subject_name_gin_idx IS 'Индекс для поиска по вхождению подстроки в наименование в таблице субъектов РФ';

\copy dict_federal_subject(id,name) FROM './dict//import/federal_subject.txt' WITH (DELIMITER '|', FORMAT 'csv', HEADER, NULL 'NULL');