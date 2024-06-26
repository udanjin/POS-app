const { useEffect, useState } = require("react");

const useSnap = () => {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const midtransClientKey = "SB-Mid-client-m29V-N8gnK3zv2dc";
    const script = document.createElement("script");
    script.src = midtransUrl;

    script.setAttribute("data-client-key", midtransClientKey);

    script.onload = () => {
      setSnap(window.snap);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token, embedId, action) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result) {
          console.log("success", result);
          action.onSuccess(result);
        },
        onPending: function (result) {
          console.log("pending", result);
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        }
      });
    };
  };

  return { snapEmbed };
};

export default useSnap;