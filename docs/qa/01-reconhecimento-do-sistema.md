
# Reconhecimento do Sistema

## 1. Identificação da Aplicação

### Aplicação

Patrimônio Exponencial

### Objetivo

Simulador de investimentos que utiliza uma taxa Selic obtida por meio da API do Banco Central.

## 2. Objetivo do Reconhecimento

Realizar o reconhecimento inicial da aplicação, identificando o fluxo principal, as entradas, as saídas, as funcionalidades, as regras de validação, as integrações, os comportamentos observados, os riscos e os pontos que precisam ser esclarecidos antes da elaboração dos casos de teste.

## 3. Fluxo principal

1. Informar o valor inicial.
2. Informar o aporte mensal.
3. A aplicação carrega e exibe a taxa Selic obtida por meio da API do Banco Central.
4. Informar o período da simulação.
5. Acionar o botão "Calcular".
6. A aplicação realiza o cálculo da simulação.
7. Os resultados são apresentados e o gráfico é exibido.

## 4. Entradas

- Valor inicial.
- Aporte mensal.
- Período.

## 5. Saídas observadas

- Total acumulado.
- Total investido.
- Total em juros.
- Gráfico da evolução da simulação.

## 6. Funcionalidades observadas

- Botão "Limpar Tudo".
- Tema Light/Dark.
- Menu "Início" e "Sobre".
- Tooltips nos campos.
- Links para LinkedIn e GitHub no rodapé.

## 7. Regras e Comportamentos

### 7.1 - Valor inicial

- O campo é obrigatório.
- O valor informado deve ser maior que zero.
- Valores iguais a zero ou negativos exibem a mensagem: "Por favor, preencha todos os campos com valores maiores que zero."
- O campo aceita valores decimais.
- O valor máximo permitido é de R$ 1 bilhão.
- Valores acima desse limite exibem a mensagem: "O valor inicial não pode passar de 1 Bilhão."
- O campo utiliza `input type="number"`, `inputmode="decimal"` e `step="0.01"`.
- Não foi identificado um limite mínimo positivo específico além da exigência de um valor maior que zero.

### 7.2 - Aporte

- O campo é obrigatório.
- O valor informado deve ser maior que zero.
- Valores iguais a zero ou negativos exibem a mensagem: "Por favor, preencha todos os campos com valores maiores que zero."
- O campo aceita valores decimais.
- O valor máximo permitido é de R$ 1 bilhão.
- Valores acima desse limite exibem a mensagem: "O aporte mensal ultrapassa o limite permitido."
- O campo utiliza `input type="number"`, `inputmode="decimal"` e `step="0.01"`.
- Não foi identificado um limite mínimo positivo específico além da exigência de um valor maior que zero.

### 7.3 - Período

- O campo é obrigatório.
- O valor informado deve ser maior que zero.
- Valores iguais a zero ou negativos exibem a mensagem: "Por favor, preencha todos os campos com valores maiores que zero."
- O campo não aceita valores decimais.
- O valor máximo permitido é de 600 meses (50 anos).
- Valores acima desse limite exibem a mensagem: "O período máximo permitido é de 50 anos (600 meses)."
- O campo utiliza `input type="number"` e `inputmode="decimal"`.
- Não foi identificado um limite mínimo positivo específico além da exigência de um valor maior que zero.
- Ao informar um valor decimal, foi observada a mensagem nativa de validação do navegador. A conformidade desse comportamento com o resultado esperado não foi confirmada.

### 7.4 - Taxa Selic

- O valor é carregado por meio da API do Banco Central.
- O valor é exibido ao carregar a aplicação.
- O campo utiliza `input type="number"`, o atributo `readonly` e o estilo `cursor: not-allowed`.
- O campo não pode ser editado pelo usuário.
- Em caso de erro ao obter a taxa, a aplicação utiliza `10.75` como valor de fallback.

### 7.5 - Cálculo

- A taxa Selic participa da determinação da taxa mensal utilizada na simulação.
- O período determina a quantidade de iterações mensais.
- O aporte é adicionado ao saldo durante cada iteração.
- O saldo final é utilizado para determinar os juros.
- Total em juros = saldo final - total investido.

### 7.6 - Gráfico

- Tipo: linha.
- Eixo X: meses da simulação.
- Eixo Y: valores monetários em BRL.
- Legendas do gráfico: Total Acumulado e Total Investido.
- O gráfico apresenta os dados por mês.
- Não há uma linha específica para Total em Juros no gráfico.

### 7.7 - Limpar Tudo

- Ao clicar no botão "Limpar Tudo", os campos de valor inicial, aporte e período são limpos.
- O campo da taxa Selic não é limpo.
- Quando os resultados e o gráfico estão exibidos, ao clicar em "Limpar Tudo", ambos são ocultados.
- As mensagens de erro são limpas ao clicar em "Limpar Tudo".
- O tema permanece selecionado após clicar em "Limpar Tudo".

### 7.8 - Tema Light/Dark

- O tema padrão é Light.
- O indicador visual do tema não aparece ativo inicialmente.
- Ao selecionar Light ou Dark, o indicador visual acompanha o tema selecionado e recebe fundo verde.
- Ao recarregar a página, o tema anteriormente escolhido permanece selecionado.

## 8. Integração com API

A aplicação utiliza a API do Banco Central para obter a taxa Selic.

### Comportamento identificado

- A aplicação consulta o último registro disponível da série utilizada.
- O campo `valor` da resposta é utilizado.
- O valor recebido é convertido para `Number`.
- Em caso de erro na requisição ou resposta inválida, a aplicação utiliza `10.75` como valor de fallback.
- Não é apresentada uma indicação ao usuário quando o fallback é utilizado.

## 9. Riscos

### Risco 01 - Integração com a API

Uma resposta inesperada da API pode impedir a obtenção ou a interpretação correta da taxa utilizada no cálculo, afetando o resultado da simulação.

### Risco 02 - Aplicação da taxa

A utilização incorreta da taxa Selic no cálculo pode gerar resultados financeiros incorretos.

### Risco 03 - Valores acima do permitido

O tratamento incorreto de valores acima dos limites permitidos pode resultar na utilização de dados inválidos no cálculo.

### Risco 04 - Fallback da taxa Selic

A utilização incorreta do valor de fallback pode resultar em um cálculo com uma taxa diferente da esperada.

### Risco 05 - Estado visual do tema

O estado do tema após o carregamento pode gerar inconsistência entre o estado funcional e sua representação visual na interface.

## 10. Pontos em aberto

- Não está confirmado se a persistência do tema após recarregar a página é um comportamento esperado ou um requisito da aplicação.
- Não está confirmado se o indicador visual do tema selecionado deveria permanecer ativo após o carregamento ou recarregamento da página.
- Não está confirmado se o usuário deveria receber uma indicação visual quando o fallback da taxa Selic é utilizado.
- Não está confirmado se o botão "Calcular" deve ser bloqueado durante uma requisição.
- Não foi confirmado se a validação nativa do navegador para valores decimais no campo Período corresponde ao comportamento esperado.

## 11. Evidências

As evidências do reconhecimento e da execução dos testes estão armazenadas no diretório `evidencias/`, conforme os registros disponíveis.

- Telas da aplicação.
- Mensagens de validação.
- Comportamento do tema.
- Gráfico.
- Resultado da simulação.
- Respostas da API, quando aplicável.
