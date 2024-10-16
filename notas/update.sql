UPDATE resumen_promts SET apikeys = "KEY_OPENAI_CAB_GEN_ENTREVISTA" WHERE GenreID IN (3,17,34,35);
UPDATE titulo_promts SET apikeys = "KEY_OPENAI_CAB_GEN_ENTREVISTA" WHERE GenreID IN (3,17,34,35);
UPDATE titulo_resumen_prompts SET apikeys = "KEY_OPENAI_CAB_GEN_ENTREVISTA" WHERE GenreID IN (3,17,34,35);

UPDATE resumen_promts SET apikeys = "KEY_OPENAI_CAB" WHERE GenreID IN (1,14,15,28,29,49,59,55,65,73,74,117,118,56,66);
UPDATE titulo_promts SET apikeys = "KEY_OPENAI_CAB" WHERE GenreID IN (1,14,15,28,29,49,59,55,65,73,74,117,118,56,66);
UPDATE titulo_resumen_prompts SET apikeys = "KEY_OPENAI_CAB" WHERE GenreID IN (1,14,15,28,29,49,59,55,65,73,74,117,118,56,66);


UPDATE resumen_promts SET apikeys = "KEY_OPENAI_CAB_GEN_OPINION" WHERE GenreID IN (36,37);
UPDATE titulo_promts SET apikeys = "KEY_OPENAI_CAB_GEN_OPINION" WHERE GenreID IN (36,37);
UPDATE titulo_resumen_prompts SET apikeys = "KEY_OPENAI_CAB_GEN_OPINION" WHERE GenreID IN (36,37);


UPDATE resumen_promts SET apikeys = "KEY_OPENAI_CAB_TEASER" WHERE GenreID IN (67,68,76,77,40,41);
UPDATE titulo_promts SET apikeys = "KEY_OPENAI_CAB_TEASER" WHERE GenreID IN (67,68,76,77,40,41);
UPDATE titulo_resumen_prompts SET apikeys = "KEY_OPENAI_CAB_TEASER" WHERE GenreID IN (67,68,76,77,40,41);

* Generos faltantes
- Titulares de periodicos (resumen gpt4o mini)
- Conferencia (resumen con gpt4o mini)