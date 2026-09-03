export default function PreviewPage() {
  return (
    <div style={{ padding: '20px', background: 'white', color: 'black' }}>
      <h1>Extracted Images</h1>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
        <div key={i} style={{ marginBottom: '40px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
          <h2>Image {i}</h2>
          <img src={`/timeline/extracted-${i}.jpg`} style={{ maxWidth: '600px', display: 'block' }} />
        </div>
      ))}
    </div>
  );
}
