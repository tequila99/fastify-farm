DROP TABLE IF EXISTS dict_type_unit CASCADE;

CREATE TABLE dict_type_unit (
    id   bigint PRIMARY KEY,
    name varchar(25) NOT NULL
);

COMMENT ON TABLE  dict_type_unit      IS 'Справочник типов единиц измерения';
COMMENT ON COLUMN dict_type_unit.id   IS 'Уникальный идентификатор типа единицы измерения';
COMMENT ON COLUMN dict_type_unit.name IS 'Наименование типа единицы измерения';

DROP INDEX IF EXISTS dict_type_unit_name_gin_idx;
CREATE INDEX dict_type_unit_name_gin_idx ON dict_type_unit USING gin (normalize_string(name) gin_trgm_ops);
COMMENT ON INDEX dict_type_unit_name_gin_idx IS 'Индекс для поиска подстроки наименования в справочнике типов единиц измерения';

DROP INDEX IF EXISTS dict_type_unit_name_btree_idx;
CREATE INDEX dict_type_unit_name_btree_idx ON dict_type_unit (name);
COMMENT ON INDEX dict_type_unit_name_btree_idx IS 'Индекс для поиска по полному совпадению наименований в таблице типов единиц измерения';

INSERT INTO dict_type_unit (id,name) VALUES (1,'Единица массы');
INSERT INTO dict_type_unit (id,name) VALUES (2,'Единица объема');
INSERT INTO dict_type_unit (id,name) VALUES (3,'Единица длины');
INSERT INTO dict_type_unit (id,name) VALUES (4,'Единица времени');
INSERT INTO dict_type_unit (id,name) VALUES (5,'Единица площади');
INSERT INTO dict_type_unit (id,name) VALUES (6,'Техническая единица');
INSERT INTO dict_type_unit (id,name) VALUES (7,'Экономическая единица');
