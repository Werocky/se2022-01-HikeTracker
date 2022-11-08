function HikeList(props) {

  return (
    <>
      {props.hikes.map((hike) => (
        <HikeElement key={hike.k} hike={hike.v} />
      ))}
    </>
  );
}

function HikeElement(props) {
  console.log("HEY")
  return (
    <p>{props.hike}</p>
  );
}

export default HikeList;