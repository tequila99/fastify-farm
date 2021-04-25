DROP TABLE IF EXISTS dict_unit CASCADE;

CREATE TABLE dict_unit (
    id           char(3) PRIMARY KEY,
    name         varchar(10) NOT NULL,
    eng_name     varchar(10),
    full_name    varchar(50),
    dict_type_unit_id bigint references dict_type_unit(id)
);

COMMENT ON TABLE  dict_unit              IS 'Справочник стандартных единиц измерения';
COMMENT ON COLUMN dict_unit.id           IS 'Уникальный код стандартной единицы измерения';
COMMENT ON COLUMN dict_unit.name         IS 'Сокращенное наименование единицы измерения';
COMMENT ON COLUMN dict_unit.eng_name     IS 'Сокращенное наименование единицы измерения на английском языке';
COMMENT ON COLUMN dict_unit.full_name    IS 'Полное наименование единицы измерения';
COMMENT ON COLUMN dict_unit.dict_type_unit_id IS 'Ссылка на элемент справочника типов единиц измерений';

DROP INDEX IF EXISTS dict_unit_name_btree_idx;
CREATE INDEX dict_unit_name_btree_idx ON dict_unit(name);
COMMENT ON INDEX dict_unit_name_btree_idx IS 'Индекс для сортировки по наименования в таблице стандартных единиц измерения';

DROP INDEX IF EXISTS dict_unit_full_name_gin_idx;
CREATE INDEX dict_unit_full_name_gin_idx ON dict_unit USING gin (normalize_string(full_name) gin_trgm_ops);
COMMENT ON INDEX dict_unit_full_name_gin_idx IS 'Индекс для поиска подстроки в полном наименовании в таблице стандартных единиц измерения';

\copy dict_unit(id,full_name,name,eng_name,dict_type_unit_id) FROM './dict/import/units.txt' WITH (DELIMITER '|', FORMAT 'csv', HEADER, NULL 'NULL');