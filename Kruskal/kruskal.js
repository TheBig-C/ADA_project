
function Edge(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
}

function find(parent, i) {
    if (parent[i] === i) {
        return i;
    }
    return parent[i] = find(parent, parent[i]);
}

function union(parent, rank, x, y) {
    let xRoot = find(parent, x);
    let yRoot = find(parent, y);

    if (rank[xRoot] < rank[yRoot]) {
        parent[xRoot] = yRoot;
    } else if (rank[xRoot] > rank[yRoot]) {
        parent[yRoot] = xRoot;
    } else {
        parent[yRoot] = xRoot;
        rank[xRoot]++;
    }
}

function kruskalMST(vertices, edges) {
    let result = [];
    let i = 0;
    let e = 0;
    edges.sort((a, b) => a.weight - b.weight);
    let parent = {};
    let rank = {};

    vertices.forEach(vertex => {
        parent[vertex] = vertex;
        rank[vertex] = 0;
    });

    while (e < vertices.length - 1 && i < edges.length) {
        let nextEdge = edges[i++];
        let x = find(parent, nextEdge.from);
        let y = find(parent, nextEdge.to);

        if (x !== y) {
            result.push(nextEdge);
            union(parent, rank, x, y);
            e++;
        }
    }

    return result;
}

function kruskalMSTMax(vertices, edges) {
    let result = [];
    let i = 0;
    let e = 0;
    edges.sort((a, b) => b.weight - a.weight);
    let parent = {};
    let rank = {};

    vertices.forEach(vertex => {
        parent[vertex] = vertex;
        rank[vertex] = 0;
    });

    while (e < vertices.length - 1 && i < edges.length) {
        let nextEdge = edges[i++];
        let x = find(parent, nextEdge.from);
        let y = find(parent, nextEdge.to);

        if (x !== y) {
            result.push(nextEdge);
            union(parent, rank, x, y);
            e++;
        }
    }

    return result;
}