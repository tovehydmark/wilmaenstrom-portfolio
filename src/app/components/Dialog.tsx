function Dialog({ message, onDialog }) {
  return (
    <div className="dialog-container" onClick={() => onDialog(false)}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <h3>{message}</h3>
        <div className="dialog-box-button-positioning">
          <button className="confirm-delete" onClick={() => onDialog(true)}>
            Yes
          </button>
          <button className="regret-delete" onClick={() => onDialog(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;
