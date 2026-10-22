
# Plano de Testes

## Objetivo

Verificar o funcionamento da aplicação, validando as entradas de valor inicial, aporte mensal e período, suas respectivas validações, a obtenção da taxa Selic por meio da API do Banco Central, o cálculo da simulação, os resultados financeiros, a exibição do gráfico e o funcionamento das principais funcionalidades da aplicação, incluindo os botões "Calcular" e "Limpar Tudo" e a alteração do tema Light/Dark.

## Escopo

1. **Entradas e validações**

   Serão testados os campos de valor inicial, aporte mensal e período, incluindo suas respectivas validações.

2. **Integração com a API**

   Será testada a integração da aplicação com a API do Banco Central para obtenção da taxa Selic utilizada na simulação.

3. **Cálculo da simulação**

   Será testado o processamento da simulação considerando os valores informados, a taxa Selic e o período selecionado.

4. **Resultados**

   Serão validados os resultados apresentados pela aplicação: Total Acumulado, Total Investido e Total em Juros.

5. **Gráfico**

   Será avaliada a exibição do gráfico da evolução da simulação e dos dados apresentados nele.

6. **Funcionalidades da interface**

   Serão testadas as principais funcionalidades da interface, incluindo os botões "Calcular" e "Limpar Tudo" e a alteração do tema Light/Dark.

## Fora do Escopo

- Segurança.
- Performance.
- Compatibilidade com todos os navegadores.
- Acessibilidade.

## Funcionalidades a serem testadas

- Campos de entrada: valor inicial, aporte mensal e período.
- Botões "Calcular" e "Limpar Tudo".
- Alteração do tema Light/Dark.
- Exibição do gráfico da evolução da simulação, com as linhas Total Acumulado e Total Investido.
- Exibição dos resultados Total Acumulado, Total Investido e Total em Juros.

## Tipos de testes

- Testes funcionais.
- Testes de integração.
- Testes de API.

## Estratégia

1. Executar cenários positivos.
2. Executar cenários negativos.
3. Identificar comportamentos inesperados.
4. Reproduzir ou confirmar o problema observado.
5. Registrar o bug, quando confirmado.
6. Anexar evidências relevantes.
7. Encaminhar o problema para correção.
8. Realizar o reteste após a correção.
9. Realizar testes de regressão nas funcionalidades impactadas pelas correções.

## Riscos

- Integração com a API.
- Aplicação da taxa Selic.
- Valores acima do permitido.
- Fallback da taxa Selic.
- Estado visual do tema.

## Critérios de entrada

- A aplicação deve estar disponível e carregada para a execução dos testes.

## Critérios de saída

- Todos os cenários positivos e negativos planejados devem ter seus resultados registrados.
- Todos os bugs identificados devem ser registrados e, após a correção, retestados.
- Deve ser realizada a regressão das funcionalidades impactadas pelas correções realizadas.

## Ambiente e ferramentas

- Google Chrome, versão 154.0.8037.98.
- Visual Studio Code, versão 1.140.0.
- Insomnia.

## Evidências

- Capturas de tela.
- Vídeos, quando aplicável.
