import { Link } from "react-router-dom";

interface Props {
  id: string;
  painting_src: string;
}

// used in PaintingContainer to allow clicking on the image for a redirect
export default function Painting({ painting_src, id }: Props) {
  return (
    <Link to={`/painting/${id}`}>
      <img className="painting" src={painting_src} />
    </Link>
  );
}
