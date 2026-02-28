import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { networkNodes, networkLinks } from "@/data/mockData";

export default function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = 300;

    const simulation = d3
      .forceSimulation(networkNodes as any)
      .force("link", d3.forceLink(networkLinks as any).id((d: any) => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const g = svg.append("g");

    const link = g
      .selectAll("line")
      .data(networkLinks)
      .join("line")
      .attr("stroke", (d) => (d.suspicious ? "hsl(0, 72%, 55%)" : "hsl(222, 30%, 25%)"))
      .attr("stroke-width", (d) => (d.suspicious ? 2 : 1))
      .attr("stroke-dasharray", (d) => (d.suspicious ? "6,3" : "none"))
      .attr("opacity", 0.7);

    const node = g
      .selectAll("circle")
      .data(networkNodes)
      .join("circle")
      .attr("r", (d) => (d.type === "merchant" ? 12 : 8))
      .attr("fill", (d) =>
        d.flagged ? "hsl(0, 72%, 55%)" : d.type === "merchant" ? "hsl(262, 80%, 60%)" : "hsl(187, 85%, 53%)"
      )
      .attr("stroke", "hsl(222, 41%, 10%)")
      .attr("stroke-width", 2)
      .style("filter", (d) =>
        d.flagged ? "drop-shadow(0 0 6px hsl(0, 72%, 55%))" : "drop-shadow(0 0 4px hsl(187, 85%, 53%))"
      )
      .call(
        d3.drag<any, any>()
          .on("start", (e, d: any) => {
            if (!e.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on("drag", (e, d: any) => { d.fx = e.x; d.fy = e.y; })
          .on("end", (e, d: any) => {
            if (!e.active) simulation.alphaTarget(0);
            d.fx = null; d.fy = null;
          })
      );

    const labels = g
      .selectAll("text")
      .data(networkNodes)
      .join("text")
      .text((d) => d.label)
      .attr("fill", "hsl(215, 20%, 55%)")
      .attr("font-size", "9px")
      .attr("text-anchor", "middle")
      .attr("dy", -14);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
      labels.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
    });

    return () => { simulation.stop(); };
  }, []);

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Fraud Ring Detection</h3>
      <svg ref={svgRef} className="w-full h-72" />
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Account
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Merchant
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive" /> Flagged
        </span>
      </div>
    </div>
  );
}
