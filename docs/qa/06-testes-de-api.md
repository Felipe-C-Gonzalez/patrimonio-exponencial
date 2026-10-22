## Testes de API

### CT-36 — Consulta da taxa Selic
Acessei o site Patrimônio Exponencial e verifiquei se a taxa Selic era exibida. Conferi o JSON pelo DevTools e confirmei que o valor correspondia ao apresentado na tela. Também realizei uma requisição pelo Insomnia, que retornou o status `200 OK` e os dados em JSON.

**Resultado:** Aprovado.

### CT-37 — Mensagem informativa da Selic
Verifiquei se a mensagem informativa abaixo do campo da taxa Selic era exibida corretamente no site.

**Resultado:** Aprovado.

### CT-38 — Falha na consulta da API
No DevTools do navegador, desativei a requisição à API para simular uma falha na consulta da taxa Selic. Com a requisição desativada, o sistema exibiu o valor de fallback de `10,75` no campo da Selic.

**Resultado:** Aprovado. 