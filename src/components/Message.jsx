import { useState, useEffect } from "react";
import PropTypes from "prop-types";
function Message({ message, className = "alert" }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Après 5 secondes, le message sera masqué
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3500);

    // Nettoyer le timeout si le composant est démonté avant l'expiration du délai
    return () => clearTimeout(timeout);
  }, []);

  // Si le message n'est pas visible, ne pas le rendre
  if (!visible) return null;
  return <p className={className}>{message}</p>;
}
Message.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Message;
