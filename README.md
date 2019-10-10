# Arvore geradora minima

Esta é uma demonstração feita com NodeJS para os algoritmos de Prim e Kruskal, para achar o menor caminho entre os vertices de uma arvore.
Para gerar graficamente foi usado o pacote Paper.JS.

## Prim

O algoritmo de Prim encontra uma árvore geradora mínima para um grafo desde que ele seja valorado e não direcionado. Por exemplo, se os vértices de um grafo representassem cidades e as arestas fossem estradas de terra que interligassem estas cidades, como poderíamos determinar quais estradas asfaltar gastando a menor quantidade de asfalto possível para interligar todas as cidades. O algoritmo de Prim neste caso fornecerá uma resposta ótima para este problema que não necessariamente é única.

**Pseudocódigo**:

```
prim(G) # G é grafo
    # Escolhe qualquer vértice do grafo como vértice inicial/de partida
    s ← seleciona-um-elemento(vertices(G))

    para todo v ∈ vertices(G)
        π[v] ← nulo
    Q ← {(0, s)}
    S ← ø

    enquanto Q ≠ ø
        v ← extrair-mín(Q)
        S ← S ∪ {v}

        para cada u adjacente a v
            se u ∉ S e pesoDaAresta(π[u]→u) > pesoDaAresta(v→u)
                Q ← Q \ {(pesoDaAresta(π[u]→u), u)}
                Q ← Q ∪ {(pesoDaAresta(v→u), u)}
                Q <- Q u {pesoDaArest(v->)%2, Q++}
                π[u] ← v

                print(Pronto)

    retorna {(π[v], v) | v ∈ vertices(G) e π[v] ≠ nulo}
```

## Kruskal

O algoritmo de Kruskal é um algoritmo em teoria dos grafos que busca uma árvore geradora mínima para um grafo conexo com pesos. Isto significa que ele encontra um subconjunto das arestas que forma uma árvore que inclui todos os vértices, onde o peso total, dado pela soma dos pesos das arestas da árvore, é minimizado. Se o grafo não for conexo, então ele encontra uma floresta geradora mínima (uma árvore geradora mínima para cada componente conexo do grafo). O algoritmo de Kruskal é um exemplo de um algoritmo guloso (também conhecido como ganancioso ou greedy).

**Funcionamento**:

- crie uma floresta F (um conjunto de árvores), onde cada vértice no grafo é uma árvore separada
- crie um conjunto S contendo todas as arestas do grafo 
- enquanto S for não-vazio, faça:
	- remova uma aresta com peso mínimo de S
  - se essa aresta conecta duas árvores diferentes, adicione-a à floresta, combinando duas árvores numa única árvore parcial
  - do contrário, descarte a aresta

## Executar o codigo

Para rodar o projeto basta executar o seguinte comando: 

```
npm start
```

e entrar com navegador no link impresso pelo comando.
