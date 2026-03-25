{currentTicket && (
  <div
    style={{
      position: "fixed",
      top: "120px",
      left: "120px",
      width: "220px",
      height: "280px",
      background: "yellow",
      border: "6px solid red",
      zIndex: 999999,
      pointerEvents: "auto",
    }}
  >
    <button
      onClick={onTicketClick}
      type="button"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "white",
        border: "4px solid blue",
      }}
    >
      <img
        src={currentTicket.image}
        alt={currentTicket.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        draggable={false}
      />
    </button>
  </div>
)}
