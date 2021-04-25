CREATE OR REPLACE FUNCTION normalize_string(in_string text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
    RETURN replace(upper(trim(in_string)),'Ё','Е');
END;
$$;

COMMENT ON FUNCTION normalize_string(text) IS 'Функция для приведения любой строки к нормализованному виду - верхний регистр, хамена Ё на Е';
