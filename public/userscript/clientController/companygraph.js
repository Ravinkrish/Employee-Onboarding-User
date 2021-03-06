userapp.controller("companygraphController", function($scope,clientService) {
    var treeData ={
        "name": "Top Level",
        "parent": "null",
        "children": [
            {
                "name": "Level 2: A",
                "parent": "Top Level",
                "children": [
                    {
                        "name": "Son of A",
                        "parent": "Level 2: A"
                    },
                    {
                        "name": "Daughter of A",
                        "parent": "Level 2: A"
                    }
                ],

            },
            {
                "name": "Level 2: B",
                "parent": "Top Level",
                "children": [
                    {
                        "name": "Son of A",
                        "parent": "Level 2: A"
                    },
                    {
                        "name": "Daughter of A",
                        "parent": "Level 2: A"
                    }
                ]
            }
        ]
    }
    $scope.companytreestructure=function()
    {
        clientService.getAllClientLevelHead().then(function(res){
            $scope.treeobj=res.data;
            console.log("treeobj");
            console.log( $scope.treeobj);

        })

    }


    function buildVerticalTree(treeData, treeContainerDom) {

     var margin = {top: 20, right: 120, bottom: 20, left: 120},
     width = 960 - margin.right - margin.left,
     height = 500 - margin.top - margin.bottom;


     var i = 0;

     var tree = d3.layout.tree()
     .size([height, width]);

     var diagonal = d3.svg.diagonal()
     .projection(function(d) { return [d.y, d.x]; });

     var svg = d3.select(treeContainerDom).append("svg")
     .attr("width", width + margin.right + margin.left)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
     var root = treeData;

     update(root);

     function update(source) {

     // Compute the new tree layout.
     var nodes = tree.nodes(root).reverse(),
     links = tree.links(nodes);

     // Normalize for fixed-depth.
     nodes.forEach(function (d) { d.y = d.depth * 180; });

     // Declare the nodesâ€¦
     var node = svg.selectAll("g.node")
     .data(nodes, function(d) { return d.id || (d.id = ++i); });

     // Enter the nodes.
     var nodeEnter = node.enter().append("g")
     .attr("class", "node")
     .attr("transform", function(d) {
     return "translate(" + d.y + "," + d.x + ")"; });

     nodeEnter.append("circle")
     .attr("r", 10)
     .style("fill", "#fff");

     nodeEnter.append("text")
     .attr("x", function(d) {
     return d.children || d._children ? -13 : 13; })
     .attr("dy", ".35em")
     .attr("text-anchor", function(d) {
     return d.children || d._children ? "end" : "start"; })
     .text(function(d) { return d.name; })
     .style("fill-opacity", 1);

     // Declare the linksâ€¦
     var link = svg.selectAll("path.link")
     .data(links, function(d) { return d.target.id; });

     // Enter the links.
     link.enter().insert("path", "g")
     .attr("class", "link")
     .attr("d", diagonal);



     }

     };

    buildVerticalTree(treeData, "#tree");

    $scope.companytreestructure();
})

