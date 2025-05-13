import './cardUser.css';

type CarduserProps = {
  user: string;
  length?: number;
  onClick: () => void;
};

export default function CardUser({ user, length, onClick }: CarduserProps) {
  return (
    <div className="cardUser" onClick={onClick}>
      <h2 className="cardUserTitle">{user}</h2>
      <h4>{length}</h4>
    </div>
  );
};
