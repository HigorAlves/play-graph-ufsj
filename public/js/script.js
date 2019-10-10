let path;

let vertices = [];
let verticesLayer = new Layer();
let edgesLayer = new Layer();
let mstLayer = new Layer();

function onMouseDown(event) {
  verticesLayer.activate();
  path = new Path();
  path.strokeColor = 'white';

  let circle = new Path.Circle({
    center: event.point,
    radius: 7
  });

  circle.strokeColor = 'black';
  circle.fillColor = 'white';

  vertices.push(new Vertex(event.point.x, event.point.y));
}

$('#btn-compute').click(function() {
  let algo = $('#select-algo option:selected').val();

  if (typeof algo == 'undefined' || !algo) {
    return;
  }

  if (vertices.length == 0) {
    return;
  }

  $('#btn-compute').attr('disabled', true);
  $('#btn-reset').attr('disabled', true);

  if (algo == PRIM) {
    primsAlgorithm(vertices, function(mst) {
      if (!mst || typeof mst == 'undefined') {
        return;
      }
      mstLayer.activate();
      mstLayer.removeChildren();
      drawEdges(mst, 0);
    });
  } else if (algo == KRUSKAL) {
    kruskalsAlgorithm(vertices, function(mst) {
      if (!mst || typeof mst == 'undefined') {
        return;
      }
      mstLayer.activate();
      mstLayer.removeChildren();
      drawEdges(mst, 0);
    });
  }
});

function drawEdges(mst, i) {
  if (i >= mst.length) {
    $('#btn-compute').attr('disabled', false);
    $('#btn-reset').attr('disabled', false);
    return;
  }

  setTimeout(function() {
    let edge = mst[i];
    let a = new Point(edge.a.x, edge.a.y);
    let b = new Point(edge.b.x, edge.b.y);
    let mstPath = new Path.Line(a, b);
    mstPath.strokeColor = '#98FB98';
    mstPath.strokeWidth = 3;

    drawEdges(mst, i + 1);
  }, 50);
}

$('#btn-reset').click(function() {
  verticesLayer.removeChildren();
  mstLayer.removeChildren();
  paper.view.draw();
  vertices = [];
  edges = [];
});

function primsAlgorithm(vertices, callback) {
  let mst = [];
  let mstVertices = [];

  for (let i = 0; i < vertices.length; i++) {
    let current = vertices[i];
    for (let j = 0; j < vertices.length; j++) {
      if (j == i) {
        continue;
      }
      current.addToAdj(new Edge(current, vertices[j]));
    }
  }

  mstVertices.push(vertices[0]);

  while (mstVertices.length != vertices.length) {
    let minEdge = false;
    let minEdgeWeight = Number.MAX_VALUE;

    for (let i = 0; i < mstVertices.length; i++) {
      for (let j = 0; j < mstVertices[i].adj.length; j++) {
        let edge = mstVertices[i].adj[j];
        let vertex = edge.b;

        if (edge.weight() < minEdgeWeight) {
          if (includesVertex(mstVertices, vertex)) {
            continue;
          }

          minEdge = edge;
          minEdgeWeight = edge.weight();
        }
      }
    }

    mstVertices.push(minEdge.b);
    mst.push(minEdge);
  }

  callback(mst);
  return;
}

function kruskalsAlgorithm(vertices, callback) {
  let mst = [];
  let mstVertices = [];
  let edges = [];

  for (let i = 0; i < vertices.length; i++) {
    let current = vertices[i];
    for (let j = 0; j < vertices.length; j++) {
      if (j == i) {
        continue;
      }
      edges.push(new Edge(current, vertices[j]));
    }
  }

  let uf = new UnionFind(vertices.length);

  edges.sort(function(a, b) {
    if (a.weight() < b.weight()) {
      return -1;
    } else if (a.weight() > b.weight()) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < edges.length; i += 1) {
    if (mst.length == vertices.length - 1) {
      break;
    }

    let edge = edges[i];
    let ia = getVertexIndex(vertices, edge.a);
    let ib = getVertexIndex(vertices, edge.b);
    let incA = includesVertex(mstVertices, edge.a);
    let incB = includesVertex(mstVertices, edge.b);

    if (
      !includesEdge(mst, edge) &&
      (!incA || !incB) &&
      uf.find(ia) != uf.find(ib)
    ) {
      mst.push(edge);

      if (!incA) {
        mstVertices.push(edge.a);
      } else {
        mstVertices.push(edge.b);
      }

      uf.union(ia, ib);
    }
  }

  callback(mst);
}

function includesVertex(vertices, vertex) {
  for (let i = 0; i < vertices.length; i++) {
    if (vertices[i].equals(vertex)) {
      return true;
    }
  }
  return false;
}

function includesEdge(edges, edge) {
  for (let i = 0; i < edges.length; i++) {
    if (edges[i].contains(edge.a) && edges[i].contains(edge.b)) {
      return true;
    }
  }
  return false;
}

function getVertexIndex(vertices, vertex) {
  for (let i = 0; i < vertices.length; i++) {
    if (vertices[i].equals(vertex)) {
      return i;
    }
  }
  return -1;
}
