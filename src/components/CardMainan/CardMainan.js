import './CardMainan.css';

export default function CardMainan({
  foto,
  nama,
  status,
  detail,
  rusak
}) {
  return (
    <div className={`card-mainan ${rusak && 'rusak'}`}>
      <img src={foto} />
      <h1>{nama}</h1>
      <p>{detail}</p>
      <p class={`normal-status ${rusak && 'rusak-status'}`}>{status}</p>
    </div>
  );
}
