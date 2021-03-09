import React, { useState } from "react";
function TabsComponent({ text, active, action, index, count }) {
  return (
    <div className="tab-root">
      <div
        className={active ? "tab-text active" : "tab-text"}
        onClick={() => action(index)}
      >
        {text} {count !== undefined && <span>({count})</span>}
      </div>
    </div>
  );
}

export default TabsComponent;
