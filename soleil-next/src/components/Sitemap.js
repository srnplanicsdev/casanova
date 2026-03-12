export default function Sitemap({address, height}) {
    const mapSrc = (() => {
        const encodedAddress = encodeURIComponent(address)
        return `https://www.google.com/maps?q=${encodedAddress}&output=embed`
    })()
    return (
        <section className="w-full bg-white">
    <div className="w-full" style={{ height }}>
      <iframe className="w-full h-full border-0" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  </section>
    );
}