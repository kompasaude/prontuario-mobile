> O prazo para envio está encerrado. Agradecemos a todos que participaram!

# Teste Front-End AssinaSaúde

Bem-vindo ao teste técnico para se juntar ao time incrível de front-ends da AssinaSaúde!

O desafio de hoje é construir um prontuário eletrônico de saúde simplificado.

> Também conhecido como software ou aplicativo de saúde, trata-se de um sistema que permite aos profissionais médicos inserir de forma rápida e eficiente muitas informações sobre novos pacientes. - [meuconsultorio.com](https://www.meuconsultorio.com/blog/o-que-e-prontuario-eletronico/)

Na Assina Saúde, somos apaixonados por sistemas rápidos e experiências incríveis de saúde.
Para o seu teste, escolhemos essa tarefa pois esse é um típico desafio que você encontrará trabalhando conosco.

Nós sinceramente esperamos que você se divirta com esse desafio e talvez até aprenda algo novo! Happy coding!

### Seu desafio

A tarefa de hoje é implementar 3 telas que interagem com uma API Rest.

> Nós **fortemente** preferimos que você use React, mas caso não seja possível, considere utilizar frameworks semelhantes como Vue ou Angular.

#### Listagem (Vazia)

![Listagem (Vazia)](/images/prontuario-vazio.png?raw=true "Listagem (Vazia)")

Ao abrir o sistema, o usuário pode pressionar o botão "Adicionar novo prontuário" para ir para a próxima tela.

#### Cadastro de Prontuário

![Cadastro de Prontuário](/images/prontuario-anamnese.png?raw=true "Cadastro de Prontuário")

Na tela de cadastro, o usuário tem 3 campos para preencher, de acordo com as seguintes especificações:

- Queixa principal: o usuário seleciona **apenas um** de uma listagem de queixas disponíveis na API através do endpoint [/queixas](#queixas). Campo obrigatório!
- Doenças Adulto: o usuário seleciona **um ou mais** de uma listagem de queixas disponíveis na API através do endpoint [/doencas](#doencas).
Os itens selecionados ficam visíveis próximo ao campo, e o usuário pode clicar neles para removê-los. Campo opcional!
- Histórico da Moléstia: o usuário digita um texto que deve ter no mínimo 10 caracteres e no máximo 1000. Campo obrigatório!

Ao clicar em "Salvar", o sistema deve enviar uma requisição para [/prontuario](#prontuario), salvar o retorno, e retornar para a tela de listagem.

#### Listagem (Preenchida)

![Listagem (Preenchida)](/images/prontuario-preenchido.png?raw=true "Listagem (Preenchida)")

Na listagem preenchida, o usuário pode visualizar todos os prontuários que já cadastrou, junto da data e horário de cadastro.

### Especificações da API

O código fonte da API está disponível nesse repositório, e a hospedamos no Heroku.

> A API limita 100 requisições por IP a cada 15 minutos. Se você encontrar problemas, tente clonar o projeto e rodar no seu próprio computador. É só rodar `npm install`, seguido de `npm start`.

URL da API: `https://assina-prontuario.herokuapp.com`

`GET /`: retorna o status do servidor (p. ex: `{ok: true}`) 

##### queixas
`GET /queixas`: retorna a lista de queixas disponíveis.

Exemplo de resposta: 
```
{
    ok: true,
    data: [{
        label: "Dor de cabeça",
        id: 1
    }, {
       label: "Dor nas costas",
       id: 2
   }]
}
```

##### doencas
`GET /doencas`: retorna a lista de doenças disponíveis.

Exemplo de resposta: 
```
{
    ok: true,
    data: [{
        label: "Diabetes",
        id: 1
    }, {
       label: "Câncer",
       id: 2
   }]
}
```

##### prontuario
`POST /prontuario`: cadastra um novo prontuário.

Exemplo de requisição:
```
{
    queixa: 1,
    doencas: [1, 2],
    historico: "forte dor de cabeça há uma semana"
}
```

Exemplo de resposta: 
```
{
    ok: true,
    data: {
        _id: "KaVLUFd6GlyY4wr4",
        queixa: {
            label: "Dor de cabeça",
            value: 1
        },
        doencas: [{
            label: "Diabetes",
            value: 1
        }, {
            label: "Câncer",
            value: 2
        }],
        historico: "forte dor de cabeça há uma semana"
    }
}
```

### Enviando o seu projeto

1. Faça o upload do código para o Github
2. Envie o link do repositório para feliciano@assinasaude.com.br, com instruções de como rodar o projeto e quaisquer outras informações que você achar importante mencionar.
Por exemplo:

> Para rodar o projeto, executar npm install e npm start. Não pude concluir a parte X, mas com mais tempo eu a implementaria usando a biblioteca Y.

3. Tudo pronto! Agora entraremos em contato assim que avaliarmos a sua submissão.

### Critérios de Avaliação

1. **Corretude**: o seu código deve ser correto, isso é, ele deve fazer tudo que o desafio te propôs.
Não vamos testar cada caso especial, mas casos que podem ser razoavelmente esperados durante o uso normal do sistema não devem ter bugs triviais.

2. **Design / Usabilidade**: O design de cada solução deve ser no mínimo funcional e obedecer aos padrões estabelecidos nas screenshots acima.

3. **Performance**: As suas soluções não devem travar o navegador por nenhum período de tempo sob situações de uso normal.

4. **Qualidade do código**: O seu código deve respeitar algumas regras básicas de qualidade como de-duplicação e deve evitar o máximo de mau cheiros de código possível.
Sua submissão também se destaca se você utilizar uma ferramenta como o ESLint para manter o estilo consistente em todos os arquivos.

### Critérios opcionais:

Você só precisa se preocupar com esses critérios se tiver tempo extra, mas você definitivamente vai se destacar!

1. **Responsividade**: Vamos testar prioritariamente em dispositivos móveis, mas se você garantir que o seu layout fique agradável no desktop, mais pontos pra você!

2. **Testes Unitários**: [Código sem testes é código quebrado por design](https://jacobian.org/2009/apr/15/django-apps-with-buildout/). Se você escrever testes para os casos mais básicos de uso, com certeza terá bastante destaque!

3. **Histórico de commits**: Não estamos preocupados com o horário de cada commit, mas gostaríamos que seus commits seguissem uma ordem lógica e tivessem mensagens descritivas de cada alteração que ocorreu.

4. **Tratamento de erros**: Tratar o que acontece quando a API está indisponível ou a internet do usuário caiu é parte importantíssima para usabilidade. Pontos extras se exibir uma mensagem amigável quando ocorrerem erros na comunicação com a API.

5. **Animações**: Adoramos utilizar animações para tornar a experiência mais agradável e responsiva. Se você utilizar transações de tela e microanimações, vamos mostrar seu projeto pra todo mundo no escritório.

6. **Sua criatividade**: Sinta-se encorajado para adicionar quaisquer outras features que você quiser, contanto que você as mencione quando enviar seu projeto (para que possamos procurar por elas!).

### Problemas ou dúvidas?

[Abra uma nova issue](/issues)!
