export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-filter"
      style={{ filter: "url(#diamonds-grain)" }}
    />
  );
}
