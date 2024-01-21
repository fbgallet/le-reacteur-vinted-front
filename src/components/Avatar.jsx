const Avatar = ({ id, username, avatar, size }) => {
  return (
    <div className={"avatar " + size}>
      {avatar && <img src={avatar} alt="avatar" />}
      <span>{username}</span>
    </div>
  );
};

export default Avatar;
