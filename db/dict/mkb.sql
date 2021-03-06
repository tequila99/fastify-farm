-- Таблица международного классфикатора болезней МКБ-10
-- 

DROP TABLE IF EXISTS dict_mkb CASCADE;

CREATE TABLE dict_mkb (
    id        bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    kod       varchar(8) NOT NULL UNIQUE,
    name      varchar(220) NOT NULL,    
    parent_id bigint references dict_mkb(id),
    add_data  jsonb
);

COMMENT ON TABLE  dict_mkb           IS 'Справочник международного классификатора болезней';
COMMENT ON COLUMN dict_mkb.id        IS 'Уникальный идентификатор спарвочника МКБ';
COMMENT ON COLUMN dict_mkb.kod       IS 'Код болезни по МКБ';
COMMENT ON COLUMN dict_mkb.name      IS 'Наименование болезни по МКБ';
COMMENT ON COLUMN dict_mkb.parent_id IS 'Ссылка на элемент-родитель в справочнике МКБ';
COMMENT ON COLUMN dict_mkb.add_data  IS 'Дополнительная неструктурированная информация в формате JSON';


DROP INDEX IF EXISTS dict_mkb_kod_btree_idx;
CREATE INDEX dict_mkb_kod_btree_idx ON dict_mkb (upper(kod));
COMMENT ON INDEX dict_mkb_kod_btree_idx IS 'Индекс для поиска по коду болезни в таблице международный классификатор болезней';

DROP INDEX IF EXISTS dict_mkb_name_btree_idx;
CREATE INDEX dict_mkb_name_btree_idx ON dict_mkb(normalize_string(name));
COMMENT ON INDEX dict_mkb_name_btree_idx IS 'Индекс для поиска по полному совпадению наименования болезни в таблице международный классификатор болезней';

DROP INDEX IF EXISTS dict_mkb_name_gin_idx;
CREATE INDEX dict_mkb_name_gin_idx ON dict_mkb USING gin (normalize_string(kod || name) gin_trgm_ops);
COMMENT ON INDEX dict_mkb_name_gin_idx IS 'Индекс для поиска по вхождению подстроки в наименование болезни в таблице международный классификатор болезней';

\copy dict_mkb(id,kod,name,parent_id) FROM './dict/import/mkb10.txt' WITH (DELIMITER '|', FORMAT 'csv', HEADER, NULL 'NULL');